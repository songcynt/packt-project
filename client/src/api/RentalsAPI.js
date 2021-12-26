import axios from "axios";

import * as config from "./Config";

export const getRentals = () => {
  const options = {
    url: `${config.URL}/rentals`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /rentals API
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

export const getRentalById = (rentalid = "") => {
  const options = {
    url: `${config.URL}/rentals/${rentalid}`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /rentals API
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
export const createNewRental = (data) => {
  const options = {
    url: `${config.URL}/rentals`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      orderDate: data.orderDate,
      startDate: data.startDate,
      expiryDate: data.expiryDate,
      extensionExpiryDate: data.extensionExpiryDate,
      returnedDate: data.returnedDate,
      deliveryMethod: data.deliveryMethod,
      returnMethod: data.returnMethod,
      status: data.status,
      userId: data.userId,
    },
  };

  console.log(options.data);
  // call /rentals API
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

export const deleteRentalById = (rentalid) => {
  const options = {
    url: `${config.URL}/rentals/${rentalid}`,
    method: "DELETE",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /rentals API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};

export const editRentalById = (rentalId, data) => {
  const options = {
    url: `${config.URL}/rentals/${rentalId}`,
    method: "PUT",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: rentalId,
      orderDate: data.orderDate == "" ? null : data.orderDate,
      startDate: data.startDate == "" ? null : data.startDate,
      expiryDate: data.expiryDate == "" ? null : data.expiryDate,
      extensionExpiryDate: data.extensionExpiryDate == "" ? null : data.extensionExpiryDate,
      returnedDate: data.returnedDate == "" ? null : data.returnedDate,
      deliveryMethod: data.deliveryMethod,
      returnMethod: data.returnMethod,
      status: data.status,
      userId: data.userId,
    },
  };
  console.log(data);
  // call /rentals API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};
