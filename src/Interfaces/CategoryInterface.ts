import { UpdateMeal } from "./MealInterface"

export interface CreateCategory {
    title:string
    description?:string
    image?:string
    meals?:string[]
}
export interface UpdateCategory {
    id:string
    title?:string
    description?:string
    image?:string
    meals?:UpdateMeal[],
    translations?:{
        id:number
        name:string
        categoryId:string
        LocalId:string
    }[]
}