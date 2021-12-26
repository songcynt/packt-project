const { models } = require('../../sequelize');
var contactDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateContact: updateContact
}

function findAll() {
    return models.contact.findAll();
}

function findById(id) {
    return models.contact.findByPk(id);
}

function deleteById(id) {
    return models.contact.destroy({ where: { id: id } });
}

function create(contact) {
    return models.contact.create(contact);
}

function updateContact(contact, id) {
    return models.contact.update(contact, { where: { id: id } });
}
module.exports = contactDao;