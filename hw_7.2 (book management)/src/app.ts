import express, { Application }  from "express";
import {connectDB} from './config/db'

import userRoute from "./routes/user.route";
import bookRoute from "./routes/book.route";
import loanRoute from "./routes/loan.route";

const app: Application = express()
const PORT = 3000;

connectDB()

app.use(express.json());
app.use('/user', userRoute);
app.use('/book', bookRoute);
app.use('/loan', loanRoute);

app.listen(PORT, ()=> console.log(`express started on port: ${PORT}`));
