import {prisma} from "../config/db";
import {Request, Response } from "express";
import {Genre} from "@prisma/client";

//1. add new Movie
export const createMovie = async (req: Request, res: Response)=> {
    const {name, genre, rating, duration, createdate} = req.body;
    let movie = await prisma.movie.create({
        data: {
            name,
            genre,
            rating,
            duration,
            createdate
        }
    })
    res.json({"message": "movie created", "movie": movie});
}

//2. get movies
export const getMovies = async (req: Request, res: Response)=> {
    let movies = await prisma.movie.findMany()
    res.json(movies);
}

//3. update movie 
export const updateMovie = async (req: Request, res: Response)=> {
    const {name, genre, rating, duration, createdate} = req.body;
    try {
        let movie = await prisma.movie.update({
        where: {
            id: req.params.id
        }, data : {
                name,
                genre,
                rating,
                duration,
                createdate,
            }
        })
        res.json({"message": "movie updated", "user": movie});
    } catch(error){
        res.json({"message": error})
    }
}

//4. delete movie
export const deleteMovie = async (req: Request, res: Response)=> {
    try {
        let deletedMovie = await prisma.movie.delete({
            where: {
                id: req.params.id
            }
        })
        res.json({"message": "movie deleted", "deletedMovie": deletedMovie});
    }catch(error){
        res.json({"message": error})
    }     
}

//5. get movie by name
export const getMovieByName = async (req: Request, res: Response)=> {
    try {
        let movie = await prisma.movie.findFirst({
            where: {
                name: req.params.name
            }
        })
        if(! movie) {
            res.json({"message": "Not found!"})
        } else {
            res.json(movie)
        }
    } catch(error){
        res.json({"message": error})
    }   
}

//6. get movies through genre
export const getMovieByGenre = async (req: Request, res: Response)=> {
    try {
        let movie = await prisma.movie.findMany({
          where:{
            genre: req.params.genre as Genre
        }
        })
        if(! movie) {
            res.json({"message": "Not found!"})
        } else {
            res.json(movie)
        }
    } catch(error){
        res.json({"message": error})
    }   
}

//7. get movies through rating
export const getMovieByRating = async (req: Request, res: Response)=> {
    try {
        let movie = await prisma.movie.findMany({
            where: {
                rating: parseInt(req.params.rating) 
            }
        })
        if(! movie) {
            res.json({"message": "Not found!"})
        } else {
            res.json(movie)
        }
    } catch(error){
        res.json({"message": error})
    }   
}
