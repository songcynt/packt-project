const { models } = require('../../sequelize');
var userDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    findByPhoneNumber: findByPhoneNumber,
    deleteById: deleteById,
    updateUser: updateUser,
}

function findAll() {
    return models.user.findAll();
}

function findById(id) {
    return models.user.findByPk(id);
}

function findByPhoneNumber(phoneNumber) {
    return models.user.findOne({ where: { phoneNumber: phoneNumber } });
}

function deleteById(id) {
    return models.user.destroy({ where: { id: id } });
}

function create(user) {
    return models.user.create(user);
}

function updateUser(user, id) {
    return models.user.update(user, { where: { id: id } });
}

module.exports = userDao;