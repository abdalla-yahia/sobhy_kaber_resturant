import {z} from 'zod';

//Create Category
export const CreateCategoryValidation = z.object({
    title:z.string(),
    image:z.string().optional(),
    description:z.string().optional(),
    gallery:z.array(z.string()).optional()
})

//Update Category
export const UpdateCategoryValidation = z.object({
    id:z.string(),
    title:z.string().optional(),
    image:z.string().optional(),
    description:z.string().optional(),
    gallery:z.array(z.string()).optional()
})