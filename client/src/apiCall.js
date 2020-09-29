import axios from "axios";

export const callAPI = ({ url, method = "GET", data, headers }) => {
  return axios({
    url: `http://localhost:7777${url}`,
    method,
    data,
    headers
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return Promise.reject({
          code: `${error.response.status}`,
          data: error.response.data
        });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return Promise.reject({
          code: "NO_RESPONSE",
          data: error.message
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject({
          code: "UNKNOWN",
          data: error.message
        });
      }
    });
};
