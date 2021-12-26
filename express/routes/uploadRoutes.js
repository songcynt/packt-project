const express = require('express');
const router = express.Router();
const { makeHandlerAwareOfAsyncErrors } = require('../helpers');
const uploadController = require('../controllers/uploadController');

router.post('/', makeHandlerAwareOfAsyncErrors(uploadController.uploadTrackingData));

module.exports = router;