import {prisma} from "../config/db";
import {Request, Response } from "express";

// 1. Add new Book
export const addBook = async(req: Request, res: Response)=> {
    const {name, genre, userId} = req.body;
    const book = await prisma.book.create({
        data: {
            name,
            genre,
            userId
        }
    })
    res.json({"message": "Book Added !", "book": book})
}

// 2. Get Books
export const getBooks = async(req: Request, res: Response)=> {
    const books = await prisma.book.findMany({
        select: {
            name: true,
            genre: true,
            id: true,
            users: {
                select: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    })
    try {
        if(books)
        res.json({"Books List": books})
    } catch (error) {
        res.json(error)
    }
}