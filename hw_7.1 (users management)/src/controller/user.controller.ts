import {prisma} from "../config/db";
import {Request, Response } from "express";
import { Role } from "@prisma/client";


// 1. Add user
export const addUser = async(req: Request, res: Response)=> {
    const {username, password, email, role, joiningYear, age} = req.body;
    const user = await prisma.user.create({
        data: {
            username,
            password,
            email,
            role,
            joiningYear,
            age
        }
    })
    res.json({"message": "User Created !", "user": user})
}

// 2. Get users
export const getUsers = async(req: Request, res: Response)=> {
    const users = await prisma.user.findMany()
    res.json({"users": users})
}

// 3. Get user by id
export const getUserById = async(req: Request, res: Response)=> {
    const user = await prisma.user.findFirst({
        where: {
            id: req.params.id
        }
    })
    res.json({"user": user})
}

// 4. Get user by email
export const getUserByEmail = async(req: Request, res: Response)=> {
    const user = await prisma.user.findFirst({
        where: {
            email: req.params.email
        }
    })
    res.json({"user": user})
}

// 5. Get user by older age
export const olderAge = async(req: Request, res: Response)=> {
    const users = await prisma.user.updateMany({
        where: {
            age: parseInt(req.params.age)
        },
        data: {
            age: {
              increment: 1
            }
        }
    })
    res.json({"user": users})
}

// 6. Get count for specifc role
export const getUserByRole = async(req: Request, res: Response)=> {
    const users = await prisma.user.findMany({
        where: {
            role: req.params.role as Role
        }
    })
    res.json({"Role conut": users})
}

// 7. Get username and password, and check all (login)
export const login = async(req: Request, res: Response)=> {
    const {username, password} = req.body;
    const user = await prisma.user.findFirst({
        where: {
            username,
            password
        }
    })
    try {
        if(! user)
        res.json({"message": "Wrong username | password !"})
        else res.json({"message": `Welcome  ${username}!`, "user": user})
    } catch (error) {
        res.json(error)
    }
}

// 8. Get newPassword and userid, and Update password
export const newPassword = async(req: Request, res: Response)=> {
    const {id, password} = req.body;
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            password: password
        }
    })
    res.json({"User with new password": user })
}

// 9. Get joiningYear and userid , and check joiningYear
export const getUserByJoiningYear = async(req: Request, res: Response)=> {
    const {id, joiningYear} = req.body;
    const user = await prisma.user.findFirst({
        where: {
            id,
            joiningYear
        }
    })
    try {
        if(! user?.joiningYear)
        res.json({"message": "The user doesn't joined with that date !"})
        else res.json({"message": "The user joined with that date !", "user": user})
    } catch (error) {
        res.json(error)
    }
}

// 10. Get users by joiningYear in that date or after
export const JoiningYearOrAfter = async(req: Request, res: Response)=> {
    const users = await prisma.user.findMany({
        where: {
            joiningYear: {
                gte: req.params.joiningYear
            }
        }
    })
    try {
        if(! users)
        res.json({"message": "No user joined with that date !"})
        else 
        res.json({"message": "The users joined with that date or after !", "users": users})
    } catch (error) {
        res.json(error)
    }
}