import React, { Component } from "react";
import { logout } from "../services/authService";
class Logout extends Component {
  state = {};
  //cdm shortcut
  componentDidMount() {
    logout();

    //redirect user to the homepage
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
