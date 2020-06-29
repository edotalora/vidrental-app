import axios from "axios";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/browser";
import logger from "./logService";
//define axios interceptors, instead of succes pass null
//first interceptor is called then catch block
//sentry, logging as a service provider
//include token header
//bidirectional dependenccy to my auth service

axios.interceptors.response.use(null, (error) => {
  //only if it is an unexpected error
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    return Promise.reject(error);
  }
  console.log("logging the eror", error);
  toast("an unexpected ocurred");
  logger.log(error);
});

export function setJwt(jwtvalue) {
  axios.defaults.headers.common["x-auth-token"] = jwtvalue;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
