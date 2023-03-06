import {prisma} from "../config/db";
import {Request, Response } from "express";

// 1. Add User
export const addUser = async(req: Request, res: Response)=> {
    const {username, password} = req.body;
    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    })
    res.json({"message": "User Created !", "user": user})
}

// 2. Get Users
export const getUsers = async(req: Request, res: Response)=> {
    const users = await prisma.user.findMany({
        select: {
            username: true,
            // id: true,
            books: {
                select: {
                    book: {
                        select: {
                            name: true,
                            genre: true
                        }
                    }
                }
            }
        }
    })
    try {
        if(users)
        res.json({"Users List": users})
    } catch (error) {
        res.json(error)
    }
}