import {z} from 'zod';

export const CreateUserValidation = z.object({
    name:z.string(),
    email:z.string(),
    password:z.string(),
    address:z.string().optional()
})
