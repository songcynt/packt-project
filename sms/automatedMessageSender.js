const automatedMessageDao = require('../express/dao/automatedMessageDao');
const rentalDao = require('../express/dao/rentalDao');
const userDao = require('../express/dao/userDao');
const sms = require('./sms');
const moment = require('moment');
moment.suppressDeprecationWarnings = true;
const { Op } = require("sequelize");
const fillTemplate = require('es6-dynamic-template');


var automatedMessageSender = {
    sender: sender
}


async function getRentalsByRule(rule) {
    var date = moment();
    if (rule["dateThresholdType"] == "Before") date.add(rule["dateThreshold"], 'days');
    else date.subtract(rule["dateThreshold"], 'days');
    date = date.format("MM/DD/YYYY");

    if (rule["eventType"] == "Order") {
        var dateFilter = {
            orderDate: date
        };
    } else if (rule["eventType"] == "Start") {
        var dateFilter = {
            startDate: date
        };
    } else {
        var dateFilter = {
            [Op.and]: [
                {
                    [Op.or]: [
                        { extensionExpiryDate: date },
                        {
                            [Op.and]: [
                                { extensionExpiryDate: null },
                                { expiryDate: date }
                            ]
                        }
                    ]
                },
                {
                    [Op.or]: [
                        { status: "Released" },
                        { status: "Overdue" }
                    ]
                }
            ]
        };
    }

    return rentalDao.findAll(dateFilter);
}

async function sender() {
    const rules = await automatedMessageDao.findAll(); // query rules
    await Promise.all(rules.map(async (rule) => {
        const rentals = await getRentalsByRule(rule);
        await Promise.all(rentals.map(async (rental) => {
            const userInfo = await userDao.findById(rental["userId"]);
            const targetPhoneNumber = userInfo["phoneNumber"];
            sms.sendMsg(fillTemplate(rule["message"], Object.assign({}, userInfo["dataValues"], rental["dataValues"])), targetPhoneNumber);
        }));
    }));
}

module.exports = automatedMessageSender;