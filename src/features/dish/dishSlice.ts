import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPromise } from "../../services";
import { AsyncState, Dish } from "../../types";

export const fetchDishes = createAsyncThunk("dishes/fetch", async () => {
  return await getPromise<Dish[]>("dishes");
});

const initialState: AsyncState<Dish> = { data: [], isLoading: true, error: null };

const dishSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  selectors: {
    selectFeaturedDish: (state) => state.data.find((dish) => dish.featured),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { selectFeaturedDish } = dishSlice.selectors;

export default dishSlice.reducer;
