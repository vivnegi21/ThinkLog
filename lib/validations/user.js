import * as z from 'zod'

export const userValidation = z.object({
    profile_photo:z.string().url().nonempty(),
    name:z.string().nonempty().min(3).max(20),
});
