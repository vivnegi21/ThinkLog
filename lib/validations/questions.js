import * as z from 'zod'

export const questionValidation = z.object({
    title:z.string().nonempty(),
    questionLink: z.string().url(),
    hint:z.string().min(10),
    difficulty:z.string(),
    solutionLink: z.string().url(),
    tags:z.string()
});
