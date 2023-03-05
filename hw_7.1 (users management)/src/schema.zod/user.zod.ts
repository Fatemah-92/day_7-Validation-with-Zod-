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
        }),
        
        email: z.
        string({
            required_error: "Email is required !",
        }).
        email("This is not a valid email."),

        role: z.
        string({
            required_error: "Role is required !",
            invalid_type_error: "Role must be User or Admin !"
        }),

        joiningYear: z.
        string({
            required_error: "Joining Year date is required !"
        }),

        age: z.
        number({
            required_error: "Age is required !",
            invalid_type_error: "Age must be Number !"
        })        
        .min(7, 'Age must be more than 7 !')
        .max(90, 'Age must be less than 90 !'),
    })
})

export type Usertypeschema = TypeOf<typeof UserType>["body"];