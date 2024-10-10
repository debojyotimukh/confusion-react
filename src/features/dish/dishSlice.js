import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPromise } from "../../services";

export const fetchDishes = createAsyncThunk("dishes/fetch", async () => {
  const dishes = await getPromise("dishes");
  return dishes;
});

const initialState = { data: [], isLoading: true, error: null };

const dishSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  selectors: {
    selectFeaturedDish: (state) =>
      state.data.filter((dish) => dish.featured)[0],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state, _) => {
        state = initialState;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});

export const { selectFeaturedDish } = dishSlice.selectors;

export default dishSlice.reducer;
