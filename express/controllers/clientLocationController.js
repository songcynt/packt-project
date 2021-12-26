const clientLocationDao = require('../dao/clientLocationDao');
const { getIdParam } = require('../helpers');
var clientLocationController = {
	addClientLocation: addClientLocation,
	findClientLocations: findClientLocations,
	findClientLocationById: findClientLocationById,
	updateClientLocation: updateClientLocation,
	deleteById: deleteById
}

async function addClientLocation(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		if (req.body.id) {
			res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
		} else {
			const client = await clientLocationDao.create(req.body);
			res.status(201).json(client);
		}
	}
}

async function findClientLocationById(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);
		const user = await clientLocationDao.findById(id);
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
		await clientLocationDao.deleteById(id);
		res.status(200).end();
	}
}

async function updateClientLocation(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);

		// We only accept an UPDATE request if the `:id` param matches the body `id`
		if (req.body.id === id) {
			await clientLocationDao.updateClientLocation(req.body, id);
			res.status(200).end();
		} else {
			res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
		}
	}
}

async function findClientLocations(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const users = await clientLocationDao.findAll();
		res.status(200).json(users);
	}
}

module.exports = clientLocationController;