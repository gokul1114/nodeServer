// const { response } = require('express');
// const express = require('express');
import express from "express";
import { MongoClient } from "mongodb"
import dotenv from "dotenv";
import { movieRouter } from "./movie.js";
import cors from "cors"

export const app = express();
dotenv.config()
console.log(process.env.MONGO_URL);
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("connected successfully")
//   const movie =  await client
//   .db("sample")
//   .collection("movies")
//   .findOne({id : 1});
//   console.log(movie)
  return client ;
 }

export const client = await createConnection();
// createConnection()

const movies = [
    {
      id: 1,
      name: "Vetaikkaran",
      language: "tamil",
      "Song writer": "Vennelakanthi",
      lang : "en"
    },
    {
      id: 2,
      name: "VIP",
      language: "tamil",
      "Song writer": "Dhanush",
      lang : "sp"
    },
    {
      id: 3,
      name: "Master",
      language: "tamil",
      "Song writer": "Vimal Kashyap",
      lang : "en"
    },
    {
      id: 4,
      name: "Tenet",
      language: "English",
      lang : "sp"
    },
    {
      id: 5,
      name: "Intersteller",
      language: "English",
      lang : "en"
    },
    {
      id: 6,
      name: "Bahubali",
      language: "Telugu",
      "Song writer": "Shiva Shakti Datta",
      lang : "en"
    }
  ];

app.use("/movies", movieRouter);
//console.log(movies)
app.get("/",(req, resp) => {
    resp.send('hello world')
})

app.listen(PORT, ()=> console.log("Server started "))



