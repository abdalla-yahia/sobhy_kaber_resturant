import { DeleteHook, GetHook, PostHook } from "@/Base/Hooks";
import { CreateCategory, UpdateCategory } from "@/Interfaces/CategoryInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Get All categories
export const getAllCategories = createAsyncThunk("categories/getAll",async () => {
    try {
      const res = await GetHook("/api/categories");
      return res;
    } catch (error) {
      console.log(error)
      toast.error(`Error To Get All categories`);
      return error;
    }
  }
);

// Get Category By Id
export const getCategoryById = createAsyncThunk("categories/getbyid",async (queries: { id: string; pageNumber: number; searchText: string,brands:string[],sort:string }) => {
    
  try {
      const data = await GetHook(
        `/api/categories/${queries?.id}?pageNumber=${queries?.pageNumber}&search=${queries?.searchText}&brands=${queries?.brands}&sort=${queries?.sort}`
      );
      return data;
    } catch (error) {
      toast.error(`Faild To Get Category`);
      return error;
    }
  }
);

//Create category
export const createCategory = createAsyncThunk(
  "categories/create",
  async (categoryData: CreateCategory) => {
    try {
      const data = await PostHook(`/api/categories`, categoryData);
      if (data) {
        toast.success(data?.message);
      }
      return data;
    } catch (error) {
      toast.error(`Create Anew category Faild `);
      return error;
    }
  }
);
//Update Category
export const updateCategory = createAsyncThunk(
  "categories/update",
  async (CategoryData: UpdateCategory) => {
    try {
      const data = await PostHook(
        `/api/categories/${CategoryData?.id}`,
        CategoryData
      );
      if (data) {
        toast.success(data?.message);
      }
      return data;
    } catch (error) {
      toast.error(`Faild To Update Category`);
      return error;
    }
  }
);

//Delete Category
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: string) => {
    try {
      const data = await DeleteHook(`/api/categories/${id}`);
      if (data) {
        toast.success(data?.message);
      }
      return data;
    } catch (error) {
      toast.error(`Faild To Delete Category`);
      return error;
    }
  }
);
