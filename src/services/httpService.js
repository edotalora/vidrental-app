import axios from "axios";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/browser";
import logger from "./logService";
//define axios interceptors, instead of succes pass null
//first interceptor is called then catch block
//sentry, logging as a service provider
axios.interceptors.response.use(null, (error) => {
  //only if it is an unexpected error
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status > 500
  ) {
    return Promise.reject();
  }
  console.log("logging the eror", error);
  toast("an unexpected ocurred");
  logger.log(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
