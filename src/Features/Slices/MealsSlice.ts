import { createSlice } from "@reduxjs/toolkit";
import {
  getAllMeal,
  getMealBySlug,
  createMeal,
  updateMeal,
  deleteMeal,
} from "../Actions/MealsActions";
import { UpdateMeal } from "@/Interfaces/MealInterface";

const initialState = {
  AllMeals: {} as {
    meals: UpdateMeal[];
    FullyMeals: UpdateMeal[];
    pages: number;
    status: number;
  },
  Meal: {} as { Meal: UpdateMeal; status: number },
  loading: false,
  error: null as string | null,
  pageNumber: 1,
  searchText: "" as string,
  categories: [] as string[],
  brands: [] as string[],
  price: {} as { min: string; max: string },
  sort:'' as string
};

const MealSlice = createSlice({
  name: "Meals",
  initialState,
  reducers: {
    setPageNumberRedux: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTextRedux: (state, action) => {
      state.searchText = action.payload;
    },
    setCategoriesRedux: (state, action) => {
      state.categories = action.payload;
    },
    setBrandsRedux: (state, action) => {
      state.brands = action.payload;
    },
    setPriceRedux: (state, action) => {
      state.price = action.payload;
    },
    setSortRedux: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMeal.fulfilled, (state, action) => {
        state.AllMeals = action.payload;
        state.loading = false;
      })
      .addCase(getAllMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMealBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMealBySlug.fulfilled, (state, action) => {
        state.Meal = action.payload;
        state.loading = false;
      })
      .addCase(getMealBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMeal.fulfilled, (state, action) => {
        state.Meal = action.payload;
        state.loading = false;
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        state.Meal = action.payload;
        state.loading = false;
      })
      .addCase(updateMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMeal.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default MealSlice.reducer;
export const {
  setSearchTextRedux,
  setPageNumberRedux,
  setCategoriesRedux,
  setBrandsRedux,
  setPriceRedux,
  setSortRedux
} = MealSlice.actions;
