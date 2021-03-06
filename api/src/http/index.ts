import { AxiosError, AxiosResponse } from "axios";
import { CallAPIType, ServiceResponse, Error } from "./index.d";

import axios from "axios";

export const callAPI: Function = ({
  url,
  method = "GET",
  data,
  headers
}: CallAPIType): Promise<Error | ServiceResponse> => {
  const updatedHeaders = {
    ...headers,
    authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN_BEARER}`
  };
  return axios({
    url: `${process.env.TWITTER_API_URL}${url}`,
    method,
    data,
    headers: updatedHeaders
  })
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
