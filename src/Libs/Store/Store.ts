import { configureStore } from "@reduxjs/toolkit";
import {useDispatch,useSelector,TypedUseSelectorHook,} from "react-redux";
import MealsSlice from '@/Features/Slices/MealsSlice';
import AuthSlice from '@/Features/Slices/AuthSlice';
import CategoriesSlice from '@/Features/Slices/CategoriesSlice';
import LanguageSlice from '@/Features/Slices/LanguageSlice';
import UsersSlice from '@/Features/Slices/UsersSlice';
import TranslatCategorySlice from '@/Features/Slices/TranslateCategorySlice';
import TranslatMealSlice from '@/Features/Slices/TranslateMealSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
    meals:MealsSlice,
    user:UsersSlice,
    auth:AuthSlice,
    category:CategoriesSlice,
    language:LanguageSlice,
    translatecategory:TranslatCategorySlice,
    translatemeal:TranslatMealSlice,

    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
