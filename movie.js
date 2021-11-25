import { getMovies, createMovie, getMovieById, deleteMovieById, updateByName } from "./helper.js";
import express from "express";


const router = express.Router()
router.get("/", async (req, resp) => {
  // const query = req.query;
  //const lang = query.split('?')
  // let respToSend = movies;
  // if(query) {
  // console.log("inside if ")
  // let tempMovies = movies
  // for(let i in query){
  //     respToSend = tempMovies.filter(e => e[i] == query[i]);
  //     tempMovies = respToSend;
  //     console.log(respToSend)
  // }  
  //}
  //let respToSend = query.lang ? movies.filter(e => e.lang == query.lang) : movies;
  const query = req.query;
  if (query.id) {
    query.id = parseInt(query.id);
  }
  const movie = await getMovies(query);
  //console.log(movie)
  resp.send(movie);
});
router.post("/", async (request, resp) => {
  const data = request.body;
  //const lang = query.split('?')
  console.log(data);
  const movie = await createMovie(data);


  resp.send(movie);
});

router.put("/", async (req, resp) => {
  let { name } = req.query;
  const body = req.body;
  await updateByName(name, body);
  const movie = await getMovies();
  resp.send(movie ? movie : { message: "no match" });
});

//simplyfying based on common path. ("/:id")
router.
route("/:id")
.get(async (req, resp) => {
  let param = +req.params.id;
  // let respToSend = movies.find(e => e.id == param)
  // resp.send(respToSend ? respToSend : {message : "no match"})
  const movie = await getMovieById(param);
  resp.send(movie ? movie : { message: "no match" });
})
.delete(async (req, resp) => {
  let param = +req.params.id;
  const movie = await deleteMovieById(param);
  resp.send(movie ? movie : { message: "no match" });

})
.put(async (req,resp) => {
  let param = +req.params.id;
  await updatebyId(id, body);
  const movie = await getMovieById(param);
  resp.send(movie ? movie : { message: "no match" });
});

 
export const movieRouter = router;