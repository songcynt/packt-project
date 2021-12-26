import axios from "axios";

import * as config from "./Config";

export const getAutomatedMessages = () => {
  const options = {
    url: `${config.URL}/automatedMessages`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /automatedMessages API
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

export const getAutomatedMessageById = (messageid = "") => {
  const options = {
    url: `${config.URL}/automatedMessages/${messageid}`,
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /automatedMessages API
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

export const createNewAutomatedMessage = (data) => {
  const options = {
    url: `${config.URL}/automatedMessages`,
    method: "POST",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      message: data.message,
      eventType: data.eventType,
      dateThresholdType: data.dateThresholdType,
      dateThreshold: data.dateThreshold,
    },
  };

  // call /automatedMessages API
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

export const deleteAutomatedMessageById = (messageid) => {
  const options = {
    url: `${config.URL}/automatedMessages/${messageid}`,
    method: "DELETE",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // call /automatedMessages API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};

export const editAutomatedMessageById = (
  messageid = Number.parseInt(10, 10),
  data
) => {
  const options = {
    url: `${config.URL}/automatedMessages/${messageid}`,
    method: "PUT",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: messageid,
      message: data.message,
      eventType: data.eventType,
      dateThresholdType: data.dateThresholdType,
      dateThreshold: data.dateThreshold,
    },
  };

  // call /automatedMessages API
  return axios(options)
    .then((response) => {
      return { success: response.status == 200 };
    })
    .catch((error) => {
      return error;
    });
};
