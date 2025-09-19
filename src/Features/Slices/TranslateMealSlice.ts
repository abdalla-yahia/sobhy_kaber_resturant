import { createSlice } from '@reduxjs/toolkit';
import {getAllTranslateMeal,createTranslateMeal} from '../Actions/TranslateMealActions';

const initialState = {
    AllTranslateMeal:[] ,
    TranslateMeal:{} ,
    loading:false,
    error:null as string | null
}

const TranslatMealSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllTranslateMeal.pending,state=>{
            state.loading = true
            state.error = null
        })
        .addCase(getAllTranslateMeal.fulfilled ,(state,action)=>{
            state.AllTranslateMeal = action.payload
            state.loading = false
        })
        .addCase(getAllTranslateMeal.rejected ,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(createTranslateMeal.pending,state=>{
            state.loading = true
            state.error = null
        })
        .addCase(createTranslateMeal.fulfilled ,(state,action)=>{
            state.TranslateMeal = action.payload
            state.loading = false
        })
        .addCase(createTranslateMeal.rejected ,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
       
    }
})

export default TranslatMealSlice.reducer