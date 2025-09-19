export interface CreateTranslateCategory {
    translations:{
        name:string,
        description?:string,
        categoryId:string
        LocalId?:string
    }[]
}