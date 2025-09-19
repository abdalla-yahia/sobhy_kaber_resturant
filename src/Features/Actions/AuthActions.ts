import { GetHook, PostHook } from "@/Base/Hooks";
import { UserLogineInterface } from "@/Interfaces/UserInterfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

let hasShownLoginToast = false;

// Logein User
export const loginUser = createAsyncThunk('auth/login',async(loginData:UserLogineInterface)=>{
    try {
        const data = await PostHook(`/api/auth/login`,loginData)
        if(data){
            toast.success(`User ${data?.user?.name} logged in successfully
`)
        }
        return data;
    } catch (error) {
        toast.error(`Failed to log in user`)
        return error
    }
})

// Logout User
export const logoutUser = createAsyncThunk('auth/logout',async()=>{
    try {
        const data= await PostHook('/api/auth/logout')
        if(data){
            toast.success(data?.message)
        }
        return data
    } catch (error) {
        toast.error(`Faild To Logout`)
        return error
    }
})
// Get Logged User
export const loggedUser = createAsyncThunk("auth/logged", async () => {
  try {
    const data = await GetHook(`/api/auth/me`);
    return data;
  } catch (error) {
    if (!hasShownLoginToast) {
      toast.warn(`Attention: You are not logged in yet!`);
      hasShownLoginToast = true;
    }
    return error;
  }
});

