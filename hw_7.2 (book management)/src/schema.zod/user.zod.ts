import { z, TypeOf } from "zod";

export const UserType = z.object({
    body: z.object ({
        username: z.
        string({
            required_error: "Name is required !",
            invalid_type_error: "Name must be string !"
        }),

        password: z.
        number({
            required_error: "Password is required !",
            invalid_type_error: "Password must be Number !"
        })   
    })
})

export type Usertypeschema = TypeOf<typeof UserType>["body"];