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
            id: true,
            username: true,
            books: {
                select: {
                    id: true,
                    name: true,
                    genre: true
                }
            }

        }
    })
    res.json({"users": users})
}