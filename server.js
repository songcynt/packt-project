// const app = require('./express/app');
const dotenv = require('dotenv');
const cron = require('node-cron');
dotenv.config();

const sequelize = require('./sequelize');
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const cookieParser = require("cookie-parser");
const automatedMessageSender = require('./sms/automatedMessageSender');

const fileUpload = require('express-fileupload');

// Connect to database
console.log(`Checking database connection...`);
try {
    sequelize.authenticate();
    console.log('Database connection OK!');
} catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
}

app.use(fileUpload({createParentPath: true}));
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))
app.use("/", require("./express/app"))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 4000;
console.log(`Starting server on port ${PORT}...`);
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Express server started on port ${PORT}.`);
    });
}).catch(err => console.log("Error: " + err));


// Schedule daily message query
const interval = "0 0 10 * * *" // default: "0 0 10 * * *" -> every 10th hour of every day
cron.schedule(interval, function() { 
    automatedMessageSender.sender();
});