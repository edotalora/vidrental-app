import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Movie from "./components/movie";

class App extends Component {
  render() {
    //this is the second method of the mount phase.
    return (
      <main className="container">
        <Movie></Movie>
      </main>
    );
  }
}

export default App;
