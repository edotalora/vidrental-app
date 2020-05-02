import React, { Component } from "react";
import Like from "./common/like";
class MoviesTable extends Component {
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
    const { movies, onDelete, onLike } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={() => this.raiseSort("title")}>
              Title
            </th>
            <th scope="col" onClick={() => this.raiseSort("genre.name")}>
              Genre
            </th>
            <th scope="col" onClick={() => this.raiseSort("numberInStock")}>
              Stock
            </th>
            <th scope="col" onClick={() => this.raiseSort("dailyRentalRate")}>
              Rate
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {movies.map((movie) => {
          return (
            <tbody key={movie._id}>
              <tr key={movie._id}>
                <td scope="row">{movie.title}</td>
                <td scope="row">{movie.genre.name}</td>
                <td scope="row">{movie.numberInStock}</td>
                <td scope="row">{movie.dailyRentalRate}</td>
                <td scope="row">
                  <Like
                    liked={movie.liked}
                    onClicked={() => onLike(movie)}
                  ></Like>
                </td>
                <td scope="row">
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => onDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

export default MoviesTable;
