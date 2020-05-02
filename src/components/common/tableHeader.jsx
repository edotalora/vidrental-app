import React, { Component } from "react";

//table header interface needs to face columns : array
//sort Column
//and onSort

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortCol = { ...this.props.sortColumn };
    if (sortCol.path === path) {
      sortCol.order = sortCol.order === "asc" ? "desc" : "asc";
    } else {
      sortCol.path = path;
      sortCol.order = "asc";
    }
    this.props.onSort(sortCol);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => {
            return (
              <th
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
