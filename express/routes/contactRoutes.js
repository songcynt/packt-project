const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { makeHandlerAwareOfAsyncErrors } = require('../helpers');

router.post('/', makeHandlerAwareOfAsyncErrors(contactController.addContact));
router.get('/', makeHandlerAwareOfAsyncErrors(contactController.findContacts));
router.get('/:id', makeHandlerAwareOfAsyncErrors(contactController.findContactById));
router.put('/:id', makeHandlerAwareOfAsyncErrors(contactController.updateContact));
router.delete('/:id', makeHandlerAwareOfAsyncErrors(contactController.deleteById));

module.exports = router;