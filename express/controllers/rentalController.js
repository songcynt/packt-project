const rentalDao = require('../dao/rentalDao');
const userDao = require('../dao/userDao');
const { getIdParam } = require('../helpers');
var rentalController = {
	addRental: addRental,
	findRentals: findRentals,
	findRentalById: findRentalById,
	updateRental: updateRental,
	deleteById: deleteById,
	returnRentalsByPhoneNumber: returnRentalsByPhoneNumber,
    startRentalsByPhoneNumber: startRentalsByPhoneNumber,
}

async function addRental(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		if (req.body.id) {
			res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
		} else {
			const rental = await rentalDao.create(req.body);
			res.status(201).json(rental);
		}
	}
}

async function findRentalById(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action");
		return;
	}
	const id = getIdParam(req);
	const rental = await rentalDao.findById(id);
	if (rental) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function deleteById(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);
		await rentalDao.deleteById(id);
		res.status(200).end();
	}
}

async function updateRental(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);

		// We only accept an UPDATE request if the `:id` param matches the body `id`
		if (req.body.id === id) {
			await rentalDao.updateRental(req.body, id);
			res.status(200).end();
		} else {
			res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
		}
	}
}

async function findRentals(req, res) {
	if (!req.user.isAdmin) {
		const rentals = await rentalDao.findAll({ userId: req.user.id });
		res.status(200).json(rentals);
	} else {
		filters = {};
		if (req.query.orderDate) {
			orderDate = Date.parse(req.query.orderDate);
			if (orderDate) {
				filters.orderDate = new Date(orderDate);
			}
		}
		if (req.query.startDate) {
			startDate = Date.parse(req.query.startDate);
			if (startDate) {
				filters.startDate = new Date(startDate);
			}
		}
		if (req.query.expiryDate) {
			expiryDate = Date.parse(req.query.expiryDate);
			if (expiryDate) {
				filters.expiryDate = new Date(expiryDate);
			}
		}
		console.log(req.query);

		const rentals = await rentalDao.findAll(filters);
		res.status(200).json(rentals);
	}
}

async function returnRentalsByPhoneNumber(req, res) {
    const phoneNumber = req.body.phoneNumber;
    if (!req.user.isAdmin) {
        res.status(403).send("No permissions for this action");
        return;
    }
    const user = await userDao.findByPhoneNumber(phoneNumber);
    if (user) {
        const rentals = await rentalDao.returnRentalsByUserId(user.id, req.body.count, req.body.returnedDate)
        res.status(200).json(rentals);
    } else {
        res.status(404).send('404 - Not found');
    }
}

async function startRentalsByPhoneNumber(req, res) {
    const phoneNumber = req.body.phoneNumber;
    if (!req.user.isAdmin) {
        res.status(403).send("No permissions for this action");
        return;
    }
    const user = await userDao.findByPhoneNumber(phoneNumber);
    if (user) {
        const rentals = await rentalDao.startRentalsByUserId(user.id, req.body.count, req.body.startDate);
		res.status(200).json(rentals);
    } else {
        res.status(404).send('404 - Not found');
    }
}

module.exports = rentalController;