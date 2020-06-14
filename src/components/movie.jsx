import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Input from "./common/input";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    searchText: "",
  };

  async componentDidMount() {
    const genreResult = await getGenres();

    const genres = [{ _id: "", name: "All genres" }, ...genreResult];

    const movies = await getMovies();
    this.setState({ movies: movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === "404") {
        toast.error("This post has alredy been deleted");
      }

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    let movieToUpdateIndex = movies.indexOf(movie);
    movies[movieToUpdateIndex] = { ...movies[movieToUpdateIndex] };
    movies[movieToUpdateIndex].liked = !movies[movieToUpdateIndex].liked;
    this.setState({ movies });
  };

  //this method should receive a page number
  handlePageChange = (pageNumber) => {
    console.log(pageNumber);

    this.setState({ currentPage: pageNumber });
    //load new records

    //update pages grid--- enabled/disabled
  };
  handleGenreSelect = (genre) => {
    console.log("genre selected ", genre);
    this.setState({ selectedGenre: genre, currentPage: 1, searchText: "" });
  };
  handleSort = (sortCol) => {
    this.setState({ sortColumn: sortCol });
  };

  getPagedData = () => {
    const {
      selectedGenre,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    //this orderBy will return a new array
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleChange = ({ currentTarget: input }) => {
    const searchText = input.value;
    this.setState({ searchText });
    //filtrar todos los movies por el valor obtenido
    const allMovies = getMovies();
    //includes or startsWith can be used
    const filteredMovies =
      searchText.length > 0
        ? allMovies.filter((m) =>
            m.title.toLowerCase().includes(searchText.toLowerCase())
          )
        : allMovies;

    console.log("filtered movies", filteredMovies);

    //actualizar estado de los movies para que se filtre sobre esa
    this.setState({
      movies: filteredMovies,
      selectedGenre: null,
      currentPage: 1,
    });
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchText } = this.state;
    if (count === 0 && searchText.length === 0) {
      return <p>There are no movies on the database</p>;
    }

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            ></ListGroup>
          </div>
          <div className="col-md">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <p>Showing {totalCount} movies available</p>
            <Input
              name="search"
              placeHolder="Search..."
              value={searchText}
              onChange={this.handleChange}
            ></Input>
            <MoviesTable
              movies={data}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            ></MoviesTable>
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            ></Pagination>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
