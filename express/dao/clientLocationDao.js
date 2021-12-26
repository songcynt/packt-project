const { models } = require('../../sequelize');
var clientLocationDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateClientLocation: updateClientLocation
}

function findAll() {
    return models.clientLocation.findAll();
}

function findById(id) {
    return models.clientLocation.findByPk(id);
}

function deleteById(id) {
    return models.clientLocation.destroy({ where: { id: id } });
}

function create(client) {
    return models.clientLocation.create(client);
}

function updateClientLocation(client, id) {
    return models.clientLocation.update(client, { where: { id: id } });
}

module.exports = clientLocationDao;