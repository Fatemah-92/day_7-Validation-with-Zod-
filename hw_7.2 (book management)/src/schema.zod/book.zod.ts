import { z, TypeOf } from "zod";

export const BookType = z.object({
    body: z.object ({
        name: z.
        string({
            required_error: "Name is required !",
            invalid_type_error: "Name must be string !"
        }),

        genre: z.
        string({
            required_error: "Genre is required !",
            invalid_type_error: "Genre must be string !"
        })   
    })
})

export type BookTypeschema = TypeOf<typeof BookType>["body"];