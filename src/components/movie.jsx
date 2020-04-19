import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
  state = { movies: getMovies() };

  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies });
  };
  //table.table>head>tr>th*4
  render() {
    return (
      <React.Fragment>
        {this.state.movies.length === 0
          ? "There a no movies in the database"
          : this.state.movies.length + " peliculas"}
        <table className="table">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
          </tr>
          {this.state.movies.map((movie) => {
            return (
              <tr key={movie._id}>
                <td scope="row">{movie.title}</td>
                <td scope="row">{movie.genre.name}</td>
                <td scope="row">{movie.numberInStock}</td>
                <td scope="row">{movie.dailyRentalRate}</td>
                <td scope="row">
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => this.handleDelete(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </React.Fragment>
    );
  }
}

export default Movie;
