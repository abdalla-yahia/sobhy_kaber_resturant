import {GetHook, PostHook } from "@/Base/Hooks";
import { CreateTranslateCategory } from "@/Interfaces/TranslateCategoryInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Get All TranslateCategory
export const getAllTranslateCategory = createAsyncThunk("TranslateCategory/getAll",async () => {
    try {
      const data = await GetHook("/api/categorytranslation");
      console.log("data= > ",data)
      return data;
    } catch (error) {
      console.log(error)
      toast.error(`Error To Get All TranslateCategory`);
      return error;
    }
  }
);


//Create TranslateCategory
export const createTranslateCategory = createAsyncThunk(
  "TranslateCategory/create",
  async (TranslateCategoryData: CreateTranslateCategory) => {
    try {
      const data = await PostHook(`/api/categorytranslation`, TranslateCategoryData);
      if (data) {
        toast.success(data?.message);
      }
      return data;
    } catch (error) {
      console.log(error)
      toast.error(`Create Anew TranslateCategory Faild `);
      return error;
    }
  }
);
