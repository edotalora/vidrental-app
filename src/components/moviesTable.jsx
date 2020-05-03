import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
class MoviesTable extends Component {
  //columns doesn`t have to be in the stae because is not going to chnage.
  //content is a function to be able to pass parameters
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => {
        return (
          <Like
            liked={movie.liked}
            onClicked={() => this.props.onLike(movie)}
          ></Like>
        );
      },
    },
    {
      key: "delete",
      content: (movie) => {
        return (
          <button
            className="btn btn-danger btn-sm m-2"
            onClick={() => this.props.onDelete(movie)}
          >
            Delete
          </button>
        );
      },
    },
  ];
  state = {};
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
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      ></Table>
    );
  }
}
export default MoviesTable;
