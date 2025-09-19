import {GetHook, PostHook } from "@/Base/Hooks";
import { CreateLanguage } from "@/Interfaces/LanguageInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Get All Languagies
export const getAllLanguagies = createAsyncThunk(
  "Languagies/getAll",
  async () => {
    try {
      const data = await GetHook("/api/locale");
      return data;
    } catch (error) {
      toast.error(`Error To Get All Languagies`);
      return error;
    }
  }
);


//Create Language
export const createLanguage = createAsyncThunk(
  "Languagies/create",
  async (LanguageData: CreateLanguage) => {
    try {
      const data = await PostHook(`/api/locale`, LanguageData);
      if (data) {
        toast.success(data?.message);
      }
      return data;
    } catch (error) {
      toast.error(`Create Anew Language Faild `);
      return error;
    }
  }
);
