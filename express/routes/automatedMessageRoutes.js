const express = require('express');
const router = express.Router();
const automatedMessageController = require('../controllers/automatedMessageController');
const { makeHandlerAwareOfAsyncErrors } = require('../helpers');

router.post('/', makeHandlerAwareOfAsyncErrors(automatedMessageController.addAutomatedMessage));
router.get('/', makeHandlerAwareOfAsyncErrors(automatedMessageController.findAutomatedMessages));
router.get('/:id', makeHandlerAwareOfAsyncErrors(automatedMessageController.findAutomatedMessageById));
router.put('/:id', makeHandlerAwareOfAsyncErrors(automatedMessageController.updateAutomatedMessage));
router.delete('/:id', makeHandlerAwareOfAsyncErrors(automatedMessageController.deleteById));

module.exports = router;