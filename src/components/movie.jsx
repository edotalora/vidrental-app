import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movie extends Component {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  /**
   * Original handleLike implementation
   * 
   handleLike = (movie) => {
     let movies = [...this.state.movies];
     let movieToUpdate = movies.indexOf(movie);
     movie.like = movie.like === "heart" ? "heart-o" : "heart";
     this.setState({ movies });
   };
   */
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

  //table.table>head>tr>th*4´
  //button.btn.btn-danger.btn-sm
  /**
   * My like solution
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
                     <i
                       className={"fa fa-" + movie.like}
                       aria-hidden="true"
                       onClick={() => this.handleLike(movie)}
                     ></i>
                   </td>
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
   */
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    if (count === 0) {
      return <p>There are no movies on the database</p>;
    }

    const movies = paginate(allMovies, currentPage, pageSize);
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
              <th scope="col"></th>
            </tr>
          </thead>
          {movies.map((movie) => {
            return (
              <tbody>
                <tr key={movie._id}>
                  <td scope="row">{movie.title}</td>
                  <td scope="row">{movie.genre.name}</td>
                  <td scope="row">{movie.numberInStock}</td>
                  <td scope="row">{movie.dailyRentalRate}</td>
                  <td scope="row">
                    <Like
                      liked={movie.liked}
                      onClicked={() => this.handleLike(movie)}
                    ></Like>
                  </td>
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
        <Pagination
          itemCount={allMovies.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default Movie;
