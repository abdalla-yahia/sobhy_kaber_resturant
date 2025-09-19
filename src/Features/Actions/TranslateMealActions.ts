import {GetHook, PostHook } from "@/Base/Hooks";
import { CreateTranslateMeal } from "@/Interfaces/TranslateMealInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Get All TranslateMeal
export const getAllTranslateMeal = createAsyncThunk("TranslateMeal/getAll",async () => {
    try {
      const data = await GetHook("/api/mealtranslations");
      console.log("data= > ",data)
      return data;
    } catch (error) {
      console.log(error)
      toast.error(`Error To Get All TranslateMeal`);
      return error;
    }
  }
);


//Create TranslateMeal
export const createTranslateMeal = createAsyncThunk(
  "TranslateMeal/create",
  async (TranslateMealData: CreateTranslateMeal) => {
    try {
      const data = await PostHook(`/api/mealtranslations`, TranslateMealData);
      if (data) {
        toast.success(data?.message);
      }
      return data;
    } catch (error) {
      console.log(error)
      toast.error(`Create Anew TranslateMeal Faild `);
      return error;
    }
  }
);
