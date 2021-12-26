const express = require('express');
const router = express.Router();
const clientLocationController = require('../controllers/clientLocationController');
const { makeHandlerAwareOfAsyncErrors } = require('../helpers');

router.post('/', makeHandlerAwareOfAsyncErrors(clientLocationController.addClientLocation));
router.get('/', makeHandlerAwareOfAsyncErrors(clientLocationController.findClientLocations));
router.get('/:id', makeHandlerAwareOfAsyncErrors(clientLocationController.findClientLocationById));
router.put('/:id', makeHandlerAwareOfAsyncErrors(clientLocationController.updateClientLocation));
router.delete('/:id', makeHandlerAwareOfAsyncErrors(clientLocationController.deleteById));

module.exports = router;