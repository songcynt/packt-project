const dotenv = require('dotenv');
dotenv.config();


var sms = {
  sendMsg: sendMsg,
  isValidPhoneNumber: isValidPhoneNumber
}


// Twilio Credential Constants
const accountSid = process.env.SMS_ACCOUNT_SID;
const authToken = process.env.SMS_ACCOUNT_AUTHTOKEN;
const hostPhoneNumber = process.env.SMS_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);


function sendMsg(msgBody, targetPhoneNumber) {
  // Sends a message containing msgBody to targetPhoneNumber.
  client.messages
    .create({
      body: msgBody,
      from: hostPhoneNumber,
      to: targetPhoneNumber
    })
    .then(message => console.log(message.sid));
}


async function isValidPhoneNumber(targetPhoneNumber) {
  // Checks if targetPhoneNumber is a valid phone number in Canada.
  // NOTE: Does not check if number can receive SMS!
  try {
    const result = await client.lookups.v1.phoneNumbers(targetPhoneNumber).fetch();
    return result.countryCode == 'CA';
  } catch (error) {
    return false;
  }
}


module.exports = sms;
