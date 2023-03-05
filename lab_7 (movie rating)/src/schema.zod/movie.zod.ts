import { z, TypeOf } from "zod";

export const MovieType = z.object({
    body: z.object ({
        name: z.
        string({
            required_error: "Name is required !",
            invalid_type_error: "Name must be string !"
        })
        .min(2, 'You must enter more than 2 chars for name !'),

        genre: z.
        string({
            required_error: "Genre is required !",
            invalid_type_error: "Genre must be string !"
        }),
        
        rating: z.
        number({
            required_error: "Rating is required !",
            invalid_type_error: "Rating must be number !"
        })
        .min(1, 'Rating must be more than 1 !')
        .max(5, 'Rating must be less than 5 !'),

        duration: z.
        number({
            required_error: "Duration is required !",
            invalid_type_error: "Duration must be number !"
        })
        .min(60, 'Duration must be more than 60 minutes !'),

        createdate: z.
        string({
            required_error: "Create date is required !",
            invalid_type_error: "Create date must be date !"
        })
        .datetime()
    })
})

export type Movietypeschema = TypeOf<typeof MovieType>["body"];