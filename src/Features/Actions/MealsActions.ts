import { DeleteHook, GetHook, PostHook } from "@/Base/Hooks";
import { CreateMeal, UpdateMeal } from "@/Interfaces/MealInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Get All Meals
export const getAllMeal = createAsyncThunk('Meals/getAll',async()=>{
    try {
        const res =await GetHook(`/api/meals`)
        return res;
    } catch (error) {
        toast.error(`Error To Get All Meals`)
        return error
    }
})


// Get Meal By Id
export const getMealBySlug = createAsyncThunk('Meals/getbyid',async(slug:string)=>{
    try {
        const data =await GetHook(`/api/meals/${slug}`)
        return data;
    } catch (error) {
        toast.error(`Faild To Get Meal`)
        return error
    }
})

//Create Meal
export const createMeal = createAsyncThunk('Meals/create',async(MealData:CreateMeal)=>{
    try {
        const data = await PostHook(`/api/meals`, MealData)
        if(data){
            toast.success(`Create Meal ${data?.Meal?.title} Successfully`)
        }
        console.log(data)
        return data;
        } catch (error) {
            console.log(error)
      toast.error("Create a new Meal failed");
      return error;
    }
})

//Update Meal 
export const updateMeal = createAsyncThunk('Meals/update',async(MealData:UpdateMeal)=>{
    try {
        const data = await PostHook(`/api/meals/${MealData?.slug}`,MealData)
        if(data){
            toast.success(data?.message)
        }
        return data;
    } catch (error) {
        toast.error(`Faild To Update Meal`)
        return error
    }
})

//Delete Meal
export const deleteMeal = createAsyncThunk('Meals/delete',async(slug:string)=>{
    try {
        const data = await DeleteHook(`/api/meals/${slug}`)
        if(data){
             toast.success(data?.message)
        }
        return data;
    } catch (error) {
        toast.error(`Faild To Delete Meal `)
        return error
    }
})

