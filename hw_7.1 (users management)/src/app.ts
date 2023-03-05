import express, { Application }  from "express";
import userRoute from "./routes/user.route";
import {connectDB} from "./config/db";

connectDB()

const app: Application = express();
const PORT: Number = 3000;

app.use(express.json());
app.use('/user', userRoute);

app.listen(PORT, ()=> console.log(`express started on port: ${PORT}`));
