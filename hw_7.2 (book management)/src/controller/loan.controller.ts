import {prisma} from "../config/db";
import {Request, Response } from "express";

// 1. Add loan
export const addLoan = async(req: Request, res: Response)=> {
    const {bookId, userId} = req.body;
    const loan = await prisma.loan.create({
        data: {
            bookId,
            userId
        }, select: {
            user: {
                select: {
                    username: true
                }
            },
            book: {
                select: {
                    name: true
                }
            }
        }
    })
    res.json({"message": "Loan Added !", "loan": loan})
}

// 2. Get loans
export const getLoans = async(req: Request, res: Response)=> {
    const loans = await prisma.loan.findMany({
        select: {
            user: {
                select: {
                    username: true,
                }
            },
            book: {
                select: {
                    name: true
                }
            }
        }
    })
    res.json({"Loans List": loans})
}

// 3. Create endpoint that lend a book to user ( send the book id and the userID / return bad request if userID is invalid)
export const lendBook = async(req: Request, res: Response)=> {
    const {bookId, userId} = req.body;
    const loan = await prisma.loan.create({
        data: {
            userId,
            bookId
        }, select: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            },
            book: {
                select: {
                    name: true
                }
            }
        }
    })
    try {
        if(req.params.userId)
        res.json({"message": `The book ${loan.book.name} is lent to ${loan.user.username}!`, "Loan": loan})
        else res.json({"message": "userID is invalid !"})
    } catch (error) {
        res.json(error)
    }
}

// 4. Create endpoint that returns the loaned books (return bad request if bookID is invalid)
export const loanedBooks = async(req: Request, res: Response)=> {
    const loan = await prisma.loan.findMany({
        where: {
            bookId: req.params.bookId
        }, select: {
            book: {
                select: {
                    name: true,
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
            }
        }
    })
    try {
        if(! loan)
        res.json({"message": "bookId is invalid !"})
        else res.json({ "Loaned Books and users": loan})
    } catch (error) {
        res.json(error)
    }
}