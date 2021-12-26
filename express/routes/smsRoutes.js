const express = require('express');
const router = express.Router();
const smsController = require('../controllers/smsController');
const { makeHandlerAwareOfAsyncErrors } = require('../helpers');

router.post('/sendCustom', makeHandlerAwareOfAsyncErrors(smsController.sendCustomSMS));
router.post('/sendTime', makeHandlerAwareOfAsyncErrors(smsController.sendTimeSMS));
router.post('/sendLate', makeHandlerAwareOfAsyncErrors(smsController.sendLateSMS));
router.get('/validatePhoneNumber', makeHandlerAwareOfAsyncErrors(smsController.validatePhoneNumber));

module.exports = router;