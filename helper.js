import { client } from "./index.js";
import bcrypt from "bcrypt"



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
    .insertOne(data);
  return movie;
}

export async function updateById(id, body) {
 const movie = await client
  .db("sample")
  .collection("movies")
  .updateOne({id : id}, {$set : body})
  return movie;
}
 export async function getHashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
 }

 export async function createUser(username, password) {
  const hashedPassword = await getHashedPassword(password); 
  const availableUsers = await getUsers({});
  if(availableUsers.find(e => e.username == username)){
    console.log("username already in use");
    throw({message : "username already in use"})
  }
  else {
    const users =  await client
    .db("sample")
    .collection("users")
    .insertOne({username, hashedPassword})
    return users
  }
  
 }

 export async function getUsers(query) {
   const users =  await client
   .db("sample")
   .collection("users")
   .find(query).toArray()
  
  return users
 }