import http from "./httpService";

export async function getGenres() {
  const { data: genres } = await http.get("/genres", {
    crossdomain: true,
  });
  console.log("response", genres);
  return genres;
}
