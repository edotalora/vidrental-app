import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "./../services/authService";
class MoviesTable extends Component {
  //columns doesn`t have to be in the stae because is not going to chnage.
  //content is a function to be able to pass parameters
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
      },
    },
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
  ];
  deleteColumn = {
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
  };
  constructor() {
    //super must be added if we call a custom constructor.
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
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
    /**
     * My solution 
     if (!auth.getCurrentUser()) {
       this.columns = this.columns.filter((col) => {
         return col.key !== "delete";
       });
     }
     */

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
