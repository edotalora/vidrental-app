import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  async populateGenres() {
    const genresResult = await getGenres();
    this.setState({ genres: genresResult });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      console.log("movieId", movieId);
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);

      //map movie returned by the server for a structure that can be used in this form
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("the movie to update was not found");
        return this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.required().label("Genre"),
    numberInStock: Joi.number()
      .max(100)
      .required()
      .min(0)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .max(10)
      .required()
      .min(0)
      .label("Daily Rental Rate"),
  };

  doSubmit = () => {
    const { history } = this.props;
    // then call server
    console.log("submitted");
    //tomar valores actuales del formulario a partir del estado.
    //dispara el servicio de creaciòn, y finalmente hace direccionamiento hacia la lista
    console.log("movie data", this.state.data);
    saveMovie(this.state.data);
    history.push("/movies");
    //get dom element input value ex
    //document.getElementById("username").value;
    //dont work like this
    //use ref object
  };

  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form - {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
