const contactDao = require('../dao/contactDao');
const { getIdParam } = require('../helpers');
var contactController = {
	addContact: addContact,
	findContacts: findContacts,
	findContactById: findContactById,
	updateContact: updateContact,
	deleteById: deleteById
}

async function addContact(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		if (req.body.id) {
			res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
		} else {
			const contact = await contactDao.create(req.body);
			res.status(201).json(contact);
		}
	}
}

async function findContactById(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);
		const user = await contactDao.findById(id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).send('404 - Not found');
		}
	}
}

async function deleteById(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);
		await contactDao.deleteById(id);
		res.status(200).end();
	}
}

async function updateContact(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);

		// We only accept an UPDATE request if the `:id` param matches the body `id`
		if (req.body.id === id) {
			await contactDao.updateContact(req.body, id);
			res.status(200).end();
		} else {
			res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
		}
	}
}

async function findContacts(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const users = await contactDao.findAll();
		res.status(200).json(users);
	}
}

module.exports = contactController;