const { models } = require("../../sequelize");
var rentalDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateRental: updateRental,
  startRentalsByUserId: startRentalsByUserId,
  returnRentalsByUserId: returnRentalsByUserId,
};

function findAll(filters) {
  // Assumptions: filters form a valid WHERE clause
  if (filters) {
    return models.rental.findAll({ where: filters });
  }
  return models.rental.findAll();
}

function findById(id) {
  return models.rental.findByPk(id);
}

function deleteById(id) {
  return models.rental.destroy({ where: { id: id } });
}

function create(rental) {
  return models.rental.create(rental);
}

function updateRental(rental, id) {
  return models.rental.update(rental, { where: { id: id } });
}

async function returnRentalsByUserId(userId, count, returnDate) {
  const rentals = await models.rental.findAll({
    order: [["orderDate"]],
    limit: count,
    where: {
      userId: userId,
      returnedDate: null,
    },
  });
  for (const rental of rentals) {
    rental.set({
      returnDate: returnDate,
      status: "PendingCompletion",
    });
    rental.save();
  }
  return rentals;
}

async function startRentalsByUserId(userId, count, startDate) {
  const rentals = await models.rental.findAll({
    order: [["orderDate"]],
    limit: count,
    where: {
      userId: userId,
      startDate: null,
    },
  });
  for (const rental of rentals) {
    rental.set({
      startDate: startDate,
      status: "Released",
    });
    rental.save();
  }
  return rentals;
}

module.exports = rentalDao;
