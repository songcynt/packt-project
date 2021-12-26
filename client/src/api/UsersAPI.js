import axios from "axios";

import * as config from "./Config";

export const getUsers = () => {
  const options = {
    url: `${config.URL}/users`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /users API
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

export const getUserById = (userid = "") => {
  const options = {
    url: `${config.URL}/users/${userid}`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /users
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

export const getUserByPhone = (phoneNumber) => {
  const options = {
    url: `${config.URL}/users/phoneNumber`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      phoneNumber: phoneNumber,
    },
  };

  // call /users
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

export const createNewUser = (data) => {
  const options = {
    url: `${config.URL}/users`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      phoneNumber: data.phoneNumber,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      dateJoined: data.dateJoined,
      isMember: data.isMember,
      isAdmin: data.isAdmin,
    },
  };

  // call /users API
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

export const deleteUserById = (userid) => {
  const options = {
    url: `${config.URL}/users/${userid}`,
    method: "DELETE",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /users
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};

export const getUserRentalsById = (userid) => {
  const options = {
    url: `${config.URL}/users/${userid}/rentals`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /users
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

// NOTE from Lucas: the userid should be parsed as an int.
export const editUserById = (userid, data) => {
  const options = {
    url: `${config.URL}/users/${userid}`,
    method: "PUT",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: userid,
      phoneNumber: data.phoneNumber,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      dateJoined: data.dateJoined,
      isMember: data.isMember,
      isAdmin: data.isAdmin,
    },
  };

  // call /users API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};
