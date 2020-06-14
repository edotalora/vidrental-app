import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import logger from "./services/logService";

logger.init();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
