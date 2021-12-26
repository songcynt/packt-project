const { models } = require('../../sequelize');
var automatedMessageDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateAutomatedMessage: updateAutomatedMessage
}

function findAll() {
    return models.automatedMessage.findAll();
}

function findById(id) {
    return models.automatedMessage.findByPk(id);
}

function deleteById(id) {
    return models.automatedMessage.destroy({ where: { id: id } });
}

function create(client) {
    return models.automatedMessage.create(client);
}

function updateAutomatedMessage(client, id) {
    return models.automatedMessage.update(client, { where: { id: id } });
}

module.exports = automatedMessageDao;