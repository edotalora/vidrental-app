import React, { Component } from "react";
class Input extends Component {
  state = {};

  //value inchange and type deleted
  //using rest and spread operator

  render() {
    const { name, label, error, ...rest } = this.props;
    return (
      <div className="form-group">
        <label for={name}>{label}</label>
        <input
          autoFocus
          {...rest}
          name={name}
          id={name}
          className="form-control"
        ></input>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
