import { AxiosError, AxiosResponse, Method } from "axios";

const axios = require("axios");

export interface CallAPIType {
  url: string;
  method?: Method;
  data?: any;
}

interface ServiceResponse {}

interface Error {
  code: string;
  data: string | ServiceResponse;
}
const callAPI: Function = ({
  url,
  method = "GET",
  data
}: CallAPIType): Promise<Error | ServiceResponse> => {
  return axios({ url, method, data })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return Promise.reject({
          code: `${error.response.status}`,
          data: error.response.data
        } as Error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return Promise.reject({
          code: "NO_RESPONSE",
          data: error.message
        } as Error);
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject({
          code: "UNKNOWN",
          data: error.message
        } as Error);
      }
    });
};

module.exports = { callAPI };
