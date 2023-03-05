import express, { Application } from "express";

import movieRoute from './routes/movie.route'

import {connectDB} from "./config/db";

connectDB()

const app: Application = express()
const PORT = 3000;

app.use(express.json());
app.use('/movie', movieRoute)


app.listen(PORT, ()=> console.log(`express started on port: ${PORT}`));