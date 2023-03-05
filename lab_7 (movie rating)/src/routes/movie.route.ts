import { Router } from "express";
import { createMovie, getMovies, updateMovie, deleteMovie, getMovieByName, getMovieByGenre, getMovieByRating } from "../controller/movie.controller";
import validate from "../middleware/validate";
import { MovieType } from "../schema.zod/movie.zod";

const route = Router();

// 1. create movie 
route.post('/', validate(MovieType), createMovie);

// 2. get movies
route.get('/', getMovies);

// 3. update movie
route.put('/:id', updateMovie);

// 4. delete movie 
route.delete('/:id', deleteMovie)

// 5. get movie by name
route.get('/name/:name', getMovieByName)

// 6. Get all movies with specific genre
route.get('/genre/:genre', getMovieByGenre)

// 7. Get all movies which have more than rating number
route.get('/rating/:rating', getMovieByRating)

export default route;