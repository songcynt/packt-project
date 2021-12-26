import axios from "axios";

import * as config from "./Config";

export const sendCustom = (
  targetPhoneNumber = "6475620426",
  msgBody = "test message for smsapi"
) => {
  // for custom message body, parameters "targetPhoneNumber" and "msgBody"
  const options = {
    url: `${config.URL}/sms/sendCustom`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      targetPhoneNumber: targetPhoneNumber,
      msgBody: msgBody,
    },
  };

  return axios(options)
    .then((response) => {
      return {
        data: response.data,
      };
    })
    .catch((error) => {
      return error;
    });
};

export const sendTime = (targetPhoneNumber = "6475620426", daysLeft = "1") => {
  // for reminder of days left until bag return deadline, parameters "targetPhoneNumber" and "daysLeft"
  const options = {
    url: `${config.URL}/sms/sendTime`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      targetPhoneNumber: targetPhoneNumber,
      daysLeft: daysLeft,
    },
  };

  return axios(options)
    .then((response) => {
      return {
        data: response.data,
      };
    })
    .catch((error) => {
      return error;
    });
};


export const sendLate = (targetPhoneNumber = "6475620426", daysOver = "0") => {
  // for reminder of days overdue bag return deadline, parameters "targetPhoneNumber" and "daysOver"
  const options = {
    url: `${config.URL}/sms/sendLate`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      targetPhoneNumber: targetPhoneNumber,
      daysOver: daysOver,
    },
  };

  return axios(options)
    .then((response) => {
      return {
        data: response.data,
      };
    })
    .catch((error) => {
      return error;
    });
};
