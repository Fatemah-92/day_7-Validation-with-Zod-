import { Router } from "express";
import { JoiningYearOrAfter, addUser, getUserByEmail, getUserById, getUserByJoiningYear, getUserByRole, getUsers, login, newPassword, olderAge } from "../controller/user.controller";
import validate from "../middleware/validate";
import { UserType } from "../schema.zod/user.zod";

const route = Router()

// 1. Add user
route.post('/', validate(UserType), addUser);

// 2. Get users
route.get('/', getUsers);

// 3. Get user by id
route.get('/getUserById/:id', getUserById);

// 4. Get user by email
route.get('/getUserByEmail/:email', getUserByEmail);

// 5. Get user by older age
route.get('/olderAge/:age', olderAge);

// 6. Get count for specific role
route.get('/getUserByRole/:role', getUserByRole);

// 7. Get username and password, and check all (login)
route.get('/login', login);

// 8. Get newPassword and userid, and Update password
route.put('/newPassword', newPassword);

// 9. Get joiningYear and userid , and check joiningYear
route.get('/getUserByJoiningYear', getUserByJoiningYear);

// 10. Get users by joiningYear in that date or after
route.get('/JoiningYearOrAfter/:joiningYear', JoiningYearOrAfter);

export default route;