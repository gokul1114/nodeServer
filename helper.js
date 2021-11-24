import { client } from "./index.js";


export async function getMovies(query) {
  const movie = await client
    .db("sample")
    .collection("movies")
    .find(query).toArray();
  return movie;
}


export async function updateByName(name,body) {
  const movie = await client
    .db("sample")
    .collection("movies")
    .updateOne({ name: name }, { $set: body });
  return movie;
}
export async function deleteMovieById(param) {
  const movie = await client
    .db("sample")
    .collection("movies")
    .deleteOne({ id: param });
  return movie;
}
export async function getMovieById(param) {
  const movie = await client
    .db("sample")
    .collection("movies")
    .findOne({ id: param });
  return movie;
}
export async function createMovie(data) {
  const movie = await client
    .db("sample")
    .collection("movies")
    .insertMany(data);
  return movie;
}
