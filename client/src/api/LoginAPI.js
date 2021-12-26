import axios from "axios";
import Cookies from "js-cookie";

import * as config from "./Config";

export const login = (phoneNumber = "6475620426", password = "123456789") => {
  const options = {
    url: `${config.URL}/login`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: {
      phoneNumber: phoneNumber,
      password: password,
    },
  };

  // call /login and return data
  return axios(options)
    .then((response) => {
      console.log(response);
      return {
        data: response.data,
      };
    })
    .catch((error) => {
      return error;
    });
};

export const authenticateAccessToken = () => {
  const options = {
    url: `${config.URL}/authenticate`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /authenticate and return data
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

export const register = (
  phoneNumber = "6475620426",
  password = "123456789"
) => {
  const options = {
    url: `${config.URL}/register`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      phoneNumber: phoneNumber,
      password: password,
    },
  };

  // call /register and return data
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

export const logout = () => {
  const options = {
    url: `${config.URL}/logout`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return axios(options);
};
