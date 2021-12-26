const userDao = require("../dao/userDao");
const { getIdParam } = require("../helpers");
var userController = {
  addUser: addUser,
  findUsers: findUsers,
  findUserById: findUserById,
  findUserByPhoneNumber: findUserByPhoneNumber,
  updateUser: updateUser,
  deleteById: deleteById,
  findRentalsByUserId: findRentalsByUserId,
};

async function addUser(req, res) {
  if (!req.user.isAdmin) {
    res.status(403).send("No permissions for this action");
  } else {
    if (req.body.id) {
      res
        .status(400)
        .send(
          `Bad request: ID should not be provided, since it is determined automatically by the database.`
        );
    } else {
      const user = await userDao.create(req.body);
      res.status(201).json(user);
    }
  }
}

async function findUserById(req, res) {
  const id = getIdParam(req);
  if (!req.user.isAdmin && id != req.user.id) {
    res.status(403).send("No permissions for this action");
    return;
  }
  const user = await userDao.findById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function findUserByPhoneNumber(req, res) {
  const phoneNumber = req.body.phoneNumber;
  if (!req.user.isAdmin && phoneNumber != req.user.phoneNumber) {
    res.status(403).send("No permissions for this action");
    return;
  }
  const user = await userDao.findByPhoneNumber(phoneNumber);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function deleteById(req, res) {
  if (!req.user.isAdmin) {
    res.status(403).send("No permissions for this action");
  } else {
    const id = getIdParam(req);
    await userDao.deleteById(id);
    res.status(200).end();
  }
}

async function updateUser(req, res) {
  if (!req.user.isAdmin) {
    // If not user, remove ability to update credentials and permissions
    delete req.body["password"];
    delete req.body["phoneNumber"];
    delete req.body["isMember"];
    delete req.body["isAdmin"];
  }

  const id = getIdParam(req);

  // We only accept an UPDATE request if the `:id` param matches the body `id`
  if (req.body.id === id) {
    await userDao.updateUser(req.body, id);
    res.status(200).end();
  } else {
    res
      .status(400)
      .send(
        `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
      );
  }
}

async function findUsers(req, res) {
  if (!req.user.isAdmin) {
    req.params.id = req.user.id;
    await findUserById(req, res);
  } else {
    const users = await userDao.findAll();
    res.status(200).json(users);
  }
}

async function findRentalsByUserId(req, res) {
  const id = getIdParam(req);
  if (!req.user.isAdmin && id != req.user.id) {
    res.status(403).send("No permissions for this action");
    return;
  }
  const user = await userDao.findById(id);
  if (user) {
    const rentals = await user.getRentals();
    res.status(200).json(rentals);
  } else {
    res.status(404).send("404 - Not found");
  }
}

module.exports = userController;
