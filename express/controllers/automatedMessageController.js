const automatedMessageDao = require('../dao/automatedMessageDao');
const { getIdParam } = require('../helpers');
var automatedMessageController = {
	addAutomatedMessage: addAutomatedMessage,
	findAutomatedMessages: findAutomatedMessages,
	findAutomatedMessageById: findAutomatedMessageById,
	updateAutomatedMessage: updateAutomatedMessage,
	deleteById: deleteById
}

async function addAutomatedMessage(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		if (req.body.id) {
			res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
		} else {
			const client = await automatedMessageDao.create(req.body);
			res.status(201).json(client);
		}
	}
}

async function findAutomatedMessageById(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);
		const user = await automatedMessageDao.findById(id);
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
		await automatedMessageDao.deleteById(id);
		res.status(200).end();
	}
}

async function updateAutomatedMessage(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);

		// We only accept an UPDATE request if the `:id` param matches the body `id`
		if (req.body.id === id) {
			await automatedMessageDao.updateAutomatedMessage(req.body, id);
			res.status(200).end();
		} else {
			res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
		}
	}
}

async function findAutomatedMessages(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const users = await automatedMessageDao.findAll();
		res.status(200).json(users);
	}
}

module.exports = automatedMessageController;