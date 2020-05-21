import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    //validate Joi schema defined
    //abort early false, to log all error
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    //path property is the name of the input element
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;

    /**
     * console.log(result);
    const errors = {};
    const { account } = this.state;
    if (account.uname = "Username is required";
    if (account.psername.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
     * 
     */
  };
  validateProperty = ({ name, value }) => {
    //create object of the specific field
    const fieldObject = { [name]: value };
    const fieldSchema = { [name]: this.schema[name] };
    //no abort only one error is enough
    //const options = {
    //  abortEarly: false,
    //};
    console.log("name", name);
    console.log("value", value);
    console.log("fieldObject", fieldObject);
    console.log("fieldSchema", fieldSchema);

    const { error } = Joi.validate(fieldObject, fieldSchema);

    //if (!error) return null;
    //return error.details[0].message;
    return error ? error.details[0].message : null;

    /**
     if (input.name === "username") {
       if (input.value.trim() === "") return "username is required";
     }
     if (input.name === "password") {
       if (input.value.trim() === "") return "password is required";
     }
     */
    //re implement validation using Joi
  };
  handleSubmit = (e) => {
    e.preventDefault(); //prevent form submission and full reload

    //include validation method call
    const errors = this.validate();

    //and the update the state
    //if errors object is null set it to an empty object
    this.setState({ errors: errors || {} });

    //avoid calling the server if there are errors
    if (errors) return;

    this.doSubmit();

    //const username = this.username.current.value;
    //console.log("username", this.username);
  };
  //clone state object
  //destructuring e.currentTarget
  //null is considered falsy
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    //validate only current input element
    console.log("inputHandleChangeValue", input);
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      ></Input>
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      ></Select>
    );
  }
}

export default Form;
