import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Movie from "./components/movie";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/common/loginForm";
import Register from "./components/register";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    //this is the second method of the mount phase.
    //pass user object to movies component to be able to hide elements
    //we haver touse render attribute instead of component to be able to pass the user data
    //also protecting the route movie/:id
    return (
      <main className="container">
        <ToastContainer></ToastContainer>
        <NavBar user={user}></NavBar>
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/movies/new"
              component={MovieForm}
            ></ProtectedRoute>
            <Route
              path="/movies"
              render={(props) => (
                <Movie {...props} user={this.state.user}></Movie>
              )}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/register" component={Register}></Route>
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
