import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
class MoviesTable extends Component {
  //columns doesn`t have to be in the stae because is not going to chnage.
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
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
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        ></TableHeader>
        <tbody>
          {movies.map((movie) => {
            return (
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
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
