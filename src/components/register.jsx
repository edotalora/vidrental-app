import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
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
  doSubmit = () => {
    // then call server
    console.log("submitted");
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
