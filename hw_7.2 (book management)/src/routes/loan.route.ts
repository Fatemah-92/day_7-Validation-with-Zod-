import { Router } from "express";
import { addLoan, getLoans, lendBook, loanedBooks } from "../controller/loan.controller";

const route = Router()

// 1. Get loans
route.post('/', addLoan);

// 2. Add loan
route.get('/', getLoans);

// 3. Create endpoint that lend a book to user ( send the book id and the userID / return bad request if userID is invalid)
route.post('/lendBook', lendBook);

// 4. Create endpoint that returns the loaned books (return bad request if bookID is invalid)
route.get('/loanedBooks/:bookId', loanedBooks);

export default route;