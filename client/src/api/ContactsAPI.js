import axios from "axios";

import * as config from "./Config";

export const getContacts = () => {
  const options = {
    url: `${config.URL}/contacts`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /contacts API
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

export const getContactById = (contactid = "") => {
  const options = {
    url: `${config.URL}/contacts/${contactid}`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /contacts API
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

export const createNewContact = (
  data
) => {
  const options = {
    url: `${config.URL}/contacts`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
    },
  };

  // call /contacts API
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

export const deleteContactById = (contactid) => {
  const options = {
    url: `${config.URL}/contacts/${contactid}`,
    method: "DELETE",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /contacts API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};

export const editContactById = (contactid, data) => {
  const options = {
    url: `${config.URL}/contacts/${contactid}`,
    method: "PUT",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: contactid,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
    },
  };

  // call /contacts API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};
