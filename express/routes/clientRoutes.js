const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { makeHandlerAwareOfAsyncErrors } = require('../helpers');

router.post('/', makeHandlerAwareOfAsyncErrors(clientController.addClient));
router.get('/', makeHandlerAwareOfAsyncErrors(clientController.findClients));
router.get('/:id', makeHandlerAwareOfAsyncErrors(clientController.findClientById));
router.put('/:id', makeHandlerAwareOfAsyncErrors(clientController.updateClient));
router.delete('/:id', makeHandlerAwareOfAsyncErrors(clientController.deleteById));

router.get('/:id/locations', makeHandlerAwareOfAsyncErrors(clientController.findLocationsByClientId));

module.exports = router;