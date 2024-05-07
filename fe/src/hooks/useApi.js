import axios from "axios";
import { useState } from "react";
import { showNotiMessage } from "@/mixins";

const accessToken = JSON.parse(localStorage.getItem("user"))?.token;

const configAxios = {
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? `Bearer ${accessToken}` : undefined, // Include token if available
    },
};

const axiosGetData = axios.create(configAxios);

export const useApi = (endpointUrl) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const get = (query = "", customEndpoint = "") => {
    setLoading(true);

    axiosGetData
      .get((customEndpoint ? customEndpoint : endpointUrl) + query)
      .then((response) => setData(response.data))
      // .catch((error) => showNotiMessage('error', error))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const post = (payload, customEndpoint = "") => {
    setLoading(true);

    axiosGetData
      .post(customEndpoint ? customEndpoint : endpointUrl, payload)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      // .catch((error) => showNotiMessage("error", error))
      .finally(() => setLoading(false));
  };

  const put = (payload, customEndpoint = "") => {
    setLoading(true);

    axiosGetData
      .put(customEndpoint ? customEndpoint : endpointUrl, payload)
      .then((response) => setData(response.data))
      .catch((error) => showNotiMessage("error", error))
      .finally(() => setLoading(false));
  };

  const patch = (payload, customEndpoint = "") => {
    setLoading(true);

    axiosGetData
      .patch(customEndpoint ? customEndpoint : endpointUrl, payload)
      .then((response) => setData(response.data))
      .catch((error) => showNotiMessage("error", error))
      .finally(() => setLoading(false));
  };

  const del = (payload, customEndpoint = "") => {
    setLoading(true);

    axiosGetData
      .delete(customEndpoint ? customEndpoint : endpointUrl, payload)
      .then((response) => setData(response.data))
      .catch((error) => showNotiMessage("error", error))
      .finally(() => setLoading(false));
  };

  return {
    loading,
    data,
    error,
    del,
    get,
    patch,
    post,
    put,
  };
};
