const { models } = require('../../sequelize');
var clientDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateClient: updateClient
}

function findAll() {
    return models.client.findAll();
}

function findById(id) {
    return models.client.findByPk(id);
}

function deleteById(id) {
    return models.client.destroy({ where: { id: id } });
}

function create(client) {
    return models.client.create(client);
}

function updateClient(client, id) {
    return models.client.update(client, { where: { id: id } });
}
module.exports = clientDao;