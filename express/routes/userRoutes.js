const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { makeHandlerAwareOfAsyncErrors } = require('../helpers');

router.post('/', makeHandlerAwareOfAsyncErrors(userController.addUser));
router.get('/', makeHandlerAwareOfAsyncErrors(userController.findUsers));
// Below is a POST because GET requests do not support request bodies
// We use POST instead, as we do not want to send phone numbers in URL params
router.post('/phoneNumber', makeHandlerAwareOfAsyncErrors(userController.findUserByPhoneNumber));
router.get('/:id', makeHandlerAwareOfAsyncErrors(userController.findUserById));
router.put('/:id', makeHandlerAwareOfAsyncErrors(userController.updateUser));
router.delete('/:id', makeHandlerAwareOfAsyncErrors(userController.deleteById));

router.get('/:id/rentals', makeHandlerAwareOfAsyncErrors(userController.findRentalsByUserId));


module.exports = router;