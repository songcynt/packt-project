const clientDao = require('../dao/clientDao');
const clientLocationDao = require('../dao/clientLocationDao');
const { getIdParam } = require('../helpers');
var clientController = {
	addClient: addClient,
	findClients: findClients,
	findClientById: findClientById,
	updateClient: updateClient,
	deleteById: deleteById,
	findLocationsByClientId: findLocationsByClientId
}

async function addClient(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		if (req.body.id) {
			res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
		} else {
			const client = await clientDao.create(req.body);
			res.status(201).json(client);
		}
	}
}

async function findClientById(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);
		const user = await clientDao.findById(id);
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
		await clientDao.deleteById(id);
		res.status(200).end();
	}
}

async function updateClient(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const id = getIdParam(req);

		// We only accept an UPDATE request if the `:id` param matches the body `id`
		if (req.body.id === id) {
			await clientDao.updateClient(req.body, id);
			res.status(200).end();
		} else {
			res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
		}
	}
}

async function findClients(req, res) {
	if (!req.user.isAdmin) {
		res.status(403).send("No permissions for this action")
	} else {
		const users = await clientDao.findAll();
		res.status(200).json(users);
	}
}

async function findLocationsByClientId(req, res) {
    const id = getIdParam(req);
    if (!req.user.isAdmin && id != req.user.id) {
        res.status(403).send("No permissions for this action");
        return;
    }
    const client = await clientDao.findById(id);
    if (client) {
		const locations = await client.getClientLocations();
        res.status(200).json(locations);
    } else {
        res.status(404).send('404 - Not found');
    }
}

module.exports = clientController;