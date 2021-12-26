import axios from "axios";

import * as config from "./Config";

export const getClientLocations = () => {
  const options = {
    url: `${config.URL}/clientLocations`,
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

export const getClientLocationById = (locationid = "") => {
  const options = {
    url: `${config.URL}/clientLocations/${locationid}`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /clientLocations API
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

// default order starts now and expires in 28 days
export const createNewClientLocation = (data) => {
  const options = {
    url: `${config.URL}/clientLocations`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      address: data.address,
      email: data.email,
      phoneNumber: data.phoneNumber,
      isPrimaryLocation: data.isPrimaryLocation,
      clientId: data.clientId,
    },
  };

  // call /clientLocations API
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

export const deleteClientLocationById = (locationid) => {
  const options = {
    url: `${config.URL}/clientLocations/${locationid}`,
    method: "DELETE",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /clientLocations API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};

export const editClientLocationById = (locationid, data) => {
  const options = {
    url: `${config.URL}/clientLocations/${locationid}`,
    method: "PUT",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: locationid,
      address: data.address,
      email: data.email,
      phoneNumber: data.phoneNumber,
      isPrimaryLocation: data.isPrimaryLocation,
      clientId: data.clientId,
    },
  };

  // call /clientLocations API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};
