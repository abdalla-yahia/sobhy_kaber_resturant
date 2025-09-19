
export interface TokenInterFace {
    id:string
    name:string
    role:string
    image?:string
}

export interface UserLogineInterface {
    email:string
    password:string
}

export interface CreateUser {
    name:string   
    password:string 
    email:string    
    address?:string  
    gender?:'MALE'|'FEMALE'
}
export interface UpdateUser {
    id:string
    name?:string   
    password?:string 
    email?:string
    phone?:string,    
    address?:string
    image?:string
    role?:string
    gender?:string,
    review?:string
    createdAt?:string
    
}