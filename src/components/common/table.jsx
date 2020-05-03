import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
  state = {};
  render() {
    const { columns, sortColumn, onSort, data } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        ></TableHeader>
        <TableBody columns={columns} data={data}></TableBody>
      </table>
    );
  }
}

export default Table;
