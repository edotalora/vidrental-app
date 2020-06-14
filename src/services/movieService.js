import http from "./httpService";
import config from "../config.json";
import _ from "lodash"; //underscore js library upgrade

const apiEndpoint = config.apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getMovies() {
  const { data: movies } = await http.get(apiEndpoint, {
    crossdomain: true,
  });
  console.log("response", movies);
  return movies;
}

export async function deleteMovie(id) {
  const movieInDb = await http.delete(movieUrl(id));
  return movieInDb;
}

export async function getMovie(id) {
  const movieInDb = await http.get(movieUrl(id));
  return movieInDb;
}

export async function saveMovie(movie) {
  if (movie._id) {
    //let movieData = _.omit(movie, "_id");
    const body = { ...movie };
    delete body._id;
    return await http.put(movieUrl(movie._id), body);
  }
  return await http.post(apiEndpoint, movie);
}
