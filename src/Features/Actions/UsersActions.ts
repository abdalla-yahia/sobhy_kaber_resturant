import { DeleteHook, GetHook, PostHook } from "@/Base/Hooks";
import { CreateUser, UpdateUser } from "@/Interfaces/UserInterfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Get All Users
export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  try {
    const res = await GetHook("/api/users");
    return res;
  } catch (error) {
    console.log(error)
    toast.error(`Error To Get All Users`);
    return error;
  }
});

// Get User By Id
export const getUserById = createAsyncThunk(
  "users/getbyid",
  async (id: string) => {
    try {
      const data = await GetHook(`/api/users/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

//Create User
export const createUser = createAsyncThunk(
  "users/create",
  async (UserData: CreateUser) => {
    try {
      const data = await PostHook(`/api/users`, UserData);
      if (data) {
        toast.success(`Create User ${data?.user?.name} Account Successfully`);
      }
      return data;
    } catch (error) {
      toast.error(`Create Anew User Faild `);
      return error;
    }
  }
);

//Update User
export const updateUser = createAsyncThunk(
  "users/update",
  async (userData: UpdateUser) => {
    try {
      const data = await PostHook(`/api/users/${userData?.id}`, userData);
      if (data) {
        toast.success(data?.message);
      }
      return data;
    } catch (error) {
      toast.error(`Faild To Update User`);
      return error;
    }
  }
);

//Delete User
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string) => {
    try {
      const data = await DeleteHook(`/api/users/${id}`);
      if (data) {
        toast.success(data?.message);
      }
      return data;
    } catch (error) {
      toast.error(`Faild To Delete User`);
      return error;
    }
  }
);
