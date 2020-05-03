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
  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    else return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => {
            return (
              <th
                className="clickable"
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label}
                {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
