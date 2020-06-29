import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import logger from "./services/logService";

logger.init();

//this variable is replaced with the actual valiue in build time.
//use npm run build for production
//npm i -g serve -> -g means global
//expor env variable proxy HTTP_PROXY in case firewall issues
console.log("SUPERMAN", process.env.REACT_APP_NAME);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
