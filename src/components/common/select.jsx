import React, { Component } from "react";
class Select extends Component {
  render() {
    const { name, label, error, options, ...rest } = this.props;

    return (
      <div class="form-group">
        <label for={name}>{label}</label>
        <select {...rest} name={name} className="form-control" id={name}>
          {options.map((opt) => {
            return (
              <option key={opt._id} value={opt._id}>
                {opt.name}
              </option>
            );
          })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;
