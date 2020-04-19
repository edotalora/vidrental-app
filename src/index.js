import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Movie from "./components/movie";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

//ReactDOM.render(<Counters />, document.getElementById("root"));
// multiple components in sync
//ReactDOM.render(<App></App>, document.getElementById("root"));
ReactDOM.render(<Movie></Movie>, document.getElementById("root"));
