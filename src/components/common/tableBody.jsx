import React, { Component } from "react";
import _ from "lodash"; //underscore js library upgrade
//rows
//columns

class TableBody extends Component {
  state = {};
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    else return _.get(item, column.path);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              {columns.map((column) => {
                return (
                  <td key={this.createKey(item, column)}>
                    {this.renderCell(item, column)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
