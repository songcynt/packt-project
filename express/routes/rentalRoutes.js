const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const { makeHandlerAwareOfAsyncErrors } = require('../helpers');

router.post('/', makeHandlerAwareOfAsyncErrors(rentalController.addRental));
router.get('/', makeHandlerAwareOfAsyncErrors(rentalController.findRentals));
router.get('/:id', makeHandlerAwareOfAsyncErrors(rentalController.findRentalById));
router.put('/:id', makeHandlerAwareOfAsyncErrors(rentalController.updateRental));
router.delete('/:id', makeHandlerAwareOfAsyncErrors(rentalController.deleteById));

router.patch('/return', makeHandlerAwareOfAsyncErrors(rentalController.returnRentalsByPhoneNumber));
router.patch('/start', makeHandlerAwareOfAsyncErrors(rentalController.startRentalsByPhoneNumber));

module.exports = router;