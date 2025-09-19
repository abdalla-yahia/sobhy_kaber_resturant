import {z} from 'zod';

//Create Meal Validation

export const CreateMealValidation = z.object({
    title:z.string(),
    description:z.string().optional(),
    price:z.number(),
    quantity:z.number().optional(),
    offer:z.string().optional(),
    image:z.string().optional(),
    isFeature:z.boolean().optional(),
    gallery:z.array(z.string()),
    categoryId:z.string(),
})

//Create Meal Validation

export const UpdataMealValidation = z.object({
    slug:z.string(),
    title:z.string().optional(),
    description:z.string().optional(),
    price:z.number().optional(),
    quantity:z.number().optional(),
    offer:z.string().optional(),
    image:z.string().optional(),
    isFeature:z.boolean().optional(),
    gallery:z.array(z.string()).optional(),
    categoryId:z.string().optional(),
})