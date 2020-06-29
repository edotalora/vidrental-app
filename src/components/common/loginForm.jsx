import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import authService, { login } from "./../../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  //create ref object
  // use props to define users element value.
  // username = React.createRef();
  //     ref={this.username} removed
  //common error, state is not complete.Element not controlled
  //null and undefined cannot be used as controlled element values
  //also include errors property on the state
  componentDidMount() {
    //this.username.current.focus();
    //can also use autoFocus property
  }
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };
  //define Joi schema
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // then call server
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      //this.props.history.push("/");
      //force a full reload of the page
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    console.log("submitted");
    //get dom element input value ex
    //document.getElementById("username").value;
    //dont work like this
    //use ref object
  };

  render() {
    //application doesn`t need to be remounted at this point
    if (authService.getCurrentUser()) return <Redirect to="/"></Redirect>;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
