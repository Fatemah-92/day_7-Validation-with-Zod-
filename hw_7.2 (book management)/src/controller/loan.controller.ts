import {prisma} from "../config/db";
import {Request, Response } from "express";

// 1. Get loans
export const getLoans = async(req: Request, res: Response)=> {
    const loans = await prisma.loan.findMany()
    res.json({"loans": loans})
}

// 2. Add loan
export const addLoan = async(req: Request, res: Response)=> {
    const {bookId, userId} = req.body;
    const loan = await prisma.loan.create({
        data: {
            bookId,
            userId
        }
    })
    res.json({"message": "Loan Added !", "loan": loan})
}

// 3. Create endpoint that lend a book to user ( send the book id and the userID / return bad request if userID is invalid)
export const lendBook = async(req: Request, res: Response)=> {
    const {bookId, userId} = req.body;
    const loan = await prisma.loan.create({
        data: {
            userId,
            bookId
        }
    })
    try {
        if(! userId)
        res.json({"message": "userID is invalid !"})
        else res.json({"message": `The book is lent to ${loan.userId}!`, "loan": loan})
    } catch (error) {
        res.json(error)
    }
}

// 4. Create endpoint that returns the loaned books (return bad request if bookID is invalid)
export const loanedBooks = async(req: Request, res: Response)=> {
    const loan = await prisma.loan.findFirst({
        where: {
            bookId: req.params.bookId
        }
    })
    try {
        if(! loan)
        res.json({"message": "bookId is invalid !"})
        else res.json({ "Loaned Book": loan})
    } catch (error) {
        res.json(error)
    }
}