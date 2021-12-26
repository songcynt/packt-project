const express = require('express');
const router = express.Router();
const userRoutes = require('./routes/userRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const clientRoutes = require('./routes/clientRoutes');
const clientLocationRoutes = require('./routes/clientLocationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const smsRoutes = require('./routes/smsRoutes');
const automatedMessageRoutes = require('./routes/automatedMessageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { makeHandlerAwareOfAsyncErrors, verifyToken } = require('./helpers');
const authenticationController = require('./controllers/authenticationController');

router.post('/register', makeHandlerAwareOfAsyncErrors(authenticationController.register));
router.post('/login', makeHandlerAwareOfAsyncErrors(authenticationController.login));
router.post('/logout', makeHandlerAwareOfAsyncErrors(authenticationController.logout));
router.get('/authenticate', makeHandlerAwareOfAsyncErrors(authenticationController.authenticate));

router.use('/users', verifyToken, userRoutes);
router.use('/rentals', verifyToken, rentalRoutes);
router.use('/clients', verifyToken, clientRoutes);
router.use('/clientLocations', verifyToken, clientLocationRoutes);
router.use('/contacts', verifyToken, contactRoutes);
router.use('/sms', verifyToken, smsRoutes);
router.use('/automatedMessages', verifyToken, automatedMessageRoutes);
router.use('/upload', verifyToken, uploadRoutes);

module.exports = router;