import { Router } from "express";
import validate from "../middleware/validate";
import { UserType } from "../schema.zod/user.zod";
import { addUser, getUsers } from "../controller/user.controller";

const route = Router()

// 1. Add User
route.post('/', validate(UserType), addUser);

// 2. Get Users
route.get('/', getUsers);

export default route;