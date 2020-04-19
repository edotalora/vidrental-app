import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
  state = { movies: getMovies() };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  //table.table>head>tr>th*4´
  //button.btn.btn-danger.btn-sm
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) {
      return <p>There are no movies on the database</p>;
    }
    return (
      <React.Fragment>
        <p>Showing {count} movies available</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {this.state.movies.map((movie) => {
            return (
              <tbody>
                <tr key={movie._id}>
                  <td scope="row">{movie.title}</td>
                  <td scope="row">{movie.genre.name}</td>
                  <td scope="row">{movie.numberInStock}</td>
                  <td scope="row">{movie.dailyRentalRate}</td>
                  <td scope="row">
                    <button
                      className="btn btn-danger btn-sm m-2"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </React.Fragment>
    );
  }
}

export default Movie;
