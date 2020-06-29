import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import auth from "../services/authService";
//Imposrt all functions from a module
//Import * as userService instead of {register}
class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    name: Joi.string().required(),
  };
  doSubmit = async () => {
    // then call server
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //this.props.history.push("/");
      //force a full reload of the page
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
