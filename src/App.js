import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Movie from "./components/movie";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";

class App extends Component {
  render() {
    //this is the second method of the mount phase.
    return (
      <main className="container">
        <NavBar></NavBar>
        <div className="content">
          <Switch>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movie}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
