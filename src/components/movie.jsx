import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
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

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    if (count === 0) {
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
            <p>Showing {totalCount} movies available</p>
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
