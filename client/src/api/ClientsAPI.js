import axios from "axios";

import * as config from "./Config";

export const getClients = () => {
  const options = {
    url: `${config.URL}/clients`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /clients API
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

export const getClientById = (clientid = "") => {
  const options = {
    url: `${config.URL}/clients/${clientid}`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /clients API
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

export const createNewClient = (data) => {
  const options = {
    url: `${config.URL}/clients`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      name: data.name,
      dateJoined: data.dateJoined,
      email: data.email,
      phoneNumber: data.phoneNumber,
      primaryContactId: data.primaryContactId,
      secondaryContactId: data.secondaryContactId,
    },
  };

  // call /clients API
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

export const deleteClientById = (clientid) => {
  const options = {
    url: `${config.URL}/clients/${clientid}`,
    method: "DELETE",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /clients API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};

export const editClientById = (clientId, data) => {
  const options = {
    url: `${config.URL}/clients/${clientId}`,
    method: "PUT",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: clientId,
      name: data.name,
      dateJoined: data.dateJoined,
      email: data.email,
      phoneNumber: data.phoneNumber,
      primaryContactId: data.primaryContactId,
      secondaryContactId: data.secondaryContactId,
    },
  };

  // call /clients API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};
