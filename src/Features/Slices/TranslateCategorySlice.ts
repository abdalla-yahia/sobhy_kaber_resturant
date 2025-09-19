import { createSlice } from '@reduxjs/toolkit';
import {getAllTranslateCategory,createTranslateCategory} from '../Actions/TranslateCategoryActions';

const initialState = {
    AllTranslateCategory:[] ,
    TranslateCategory:{} ,
    loading:false,
    error:null as string | null
}

const TranslatCategorySlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllTranslateCategory.pending,state=>{
            state.loading = true
            state.error = null
        })
        .addCase(getAllTranslateCategory.fulfilled ,(state,action)=>{
            state.AllTranslateCategory = action.payload
            state.loading = false
        })
        .addCase(getAllTranslateCategory.rejected ,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(createTranslateCategory.pending,state=>{
            state.loading = true
            state.error = null
        })
        .addCase(createTranslateCategory.fulfilled ,(state,action)=>{
            state.TranslateCategory = action.payload
            state.loading = false
        })
        .addCase(createTranslateCategory.rejected ,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
       
    }
})

export default TranslatCategorySlice.reducer