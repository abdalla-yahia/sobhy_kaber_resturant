import { createSlice } from "@reduxjs/toolkit";
import { createLanguage,getAllLanguagies } from "../Actions/LanguageActions";
import { CreateLanguage, UpdateLanguage } from "@/Interfaces/LanguageInterface";

const initialState ={
    AllLanguages:{Language:[] as UpdateLanguage[]},
    Language :{} as {Language:CreateLanguage},
    loading:false,
    error:null as null | string
}

const LanguageSlice = createSlice({
    name:'Locale',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllLanguagies.pending,state=>{
            state.loading = true
        })
        .addCase(getAllLanguagies.fulfilled,(state,action)=>{
            state.loading = false
            state.AllLanguages = action.payload
        })
        .addCase(getAllLanguagies.rejected ,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(createLanguage.pending,state=>{
            state.loading = true
        })
        .addCase(createLanguage.fulfilled,(state,action)=>{
            state.loading = false
            state.Language = action.payload
        })
        .addCase(createLanguage.rejected ,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export default LanguageSlice.reducer