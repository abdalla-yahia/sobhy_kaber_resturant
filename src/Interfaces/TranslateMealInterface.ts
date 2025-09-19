export interface CreateTranslateMeal {
    translations:{
        name:string,
        description?:string,
        mealId:string
        LocalId?:string
    }[]
}