import { Router } from "express";
import validate from "../middleware/validate";
import { BookType } from "../schema.zod/book.zod";
import { addBook, getBooks } from "../controller/book.controller";

const route = Router()

// 1. Add User
route.post('/', validate(BookType), addBook);

// 2. Get Users
route.get('/', getBooks);

export default route;