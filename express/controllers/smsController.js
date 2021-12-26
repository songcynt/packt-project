const smsDao = require('../dao/smsDao');
const sms = require('../../sms/sms');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { isValidPhoneNumber } = require('../../sms/sms');

var smsController = {
    sendCustomSMS: sendCustomSMS,
    sendTimeSMS: sendTimeSMS,
    sendLateSMS: sendLateSMS,
    validatePhoneNumber: validatePhoneNumber
}

async function sendCustomSMS(req, res) {
    const targetPhoneNumber = req.body.targetPhoneNumber; // Target phone number
    const msgBody = req.body.msgBody;                     // Message to send
    if (!targetPhoneNumber) {
        // No target phone number was specified.
        res.status(400).send("Bad request: no phone number provided!")
    } else if (!msgBody || msgBody.trim() == '') {
        // The message to send is blank.
        res.status(400).send("Bad request: blank message!")
    } else {
        sms.sendMsg(msgBody, targetPhoneNumber);
        res.status(200).end();
    }
}

async function sendTimeSMS(req, res) {
    // NOTE: Internal use only. Should not be triggered by any user.
    const targetPhoneNumber = req.body.targetPhoneNumber; // Target phone number
    const daysLeft = req.body.daysLeft;                   // Days left until rental expiry
    const addExt = req.body.addExt;
    const plural = daysLeft > 1 ? 's' : '';
    msgBody = `Hello user, there are ${daysLeft} day${plural} left to return your Packt.`
    if (addExt) msgBody.concat(`Need an extension? You can request one here: https://forms.gle/n5aTnNbL6gTgHM3B7`);
    sms.sendMsg(msgBody, targetPhoneNumber);
    res.status(200).end();
}

async function sendLateSMS(req, res) {
    // NOTE: Internal use only. Should not be triggered by any user.
    const targetPhoneNumber = req.body.targetPhoneNumber; // Target phone number
    const daysOver = req.body.daysOver;                   // Days since rental expiry
    const plural = daysOver > 1 ? 's' : '';
    msgBody = `Hello user, how are you doing? Your Packt return is ${daysOver} day${plural} overdue.`
    sms.sendMsg(msgBody, targetPhoneNumber);
    res.status(200).end();
}

async function validatePhoneNumber(req, res) {
    const targetPhoneNumber = req.body.targetPhoneNumber; // Target phone number
    const isValid = await sms.isValidPhoneNumber(targetPhoneNumber);
    if (isValid == false) res.status(404).end();
    else res.status(200).end();
}

module.exports = smsController;