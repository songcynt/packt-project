const userDao = require('../dao/userDao');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

var authenticationController = {
    register: register,
    login: login,
    logout: logout,
    authenticate: authenticate,
}

async function register(req, res) {
    try {
        // Get user input
        const { phoneNumber, password } = req.body;

        // Validate user input
        if (!(phoneNumber && password)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await userDao.findByPhoneNumber(phoneNumber);

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await userDao.create({
            phoneNumber: phoneNumber,
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { id: user.id, phoneNumber, isAdmin: user.isAdmin },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}

async function login(req, res) {

    // Our login logic starts here
    try {
        // Get user input
        const { phoneNumber, password } = req.body;

        // Validate user input
        if (!(phoneNumber && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await userDao.findByPhoneNumber(phoneNumber);

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { id: user.id, phoneNumber, isAdmin: user.isAdmin },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // user.setDataValue("token", token);
            res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}

async function logout(req, res) {
    const token = req.cookies.token;
    if (token) {
        res.clearCookie('token');
    }
    res.status(200).send();
}

async function authenticate(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).send("No token was provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const phoneNumber = decoded.phoneNumber;
        const user = await userDao.findByPhoneNumber(phoneNumber);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = authenticationController;