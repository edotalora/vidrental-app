import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Movie from "./components/movie";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

ReactDOM.render(
  <React.Fragment>
    <Movie></Movie>
  </React.Fragment>,
  document.getElementById("root")
);
