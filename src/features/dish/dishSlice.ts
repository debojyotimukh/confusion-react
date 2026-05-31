import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
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

// Memoised selectors — find() returns the same object reference from the
// array, but wrapping in createSelector ensures the result is only
// recomputed when state.dishes.data actually changes.
const selectDishesData = (state: RootState) => state.dishes.data;

export const selectFeaturedDish = createSelector(
  selectDishesData,
  (data) => data.find((d) => d.featured)
);

/** Factory: call once per component instance (via useMemo) to get a
 *  per-instance cache so multiple components with different dishIds
 *  don't invalidate each other. */
export const makeSelectDishById = (dishId: string) =>
  createSelector(selectDishesData, (data) =>
    data.find((d) => String(d.id) === dishId)
  );

export default dishSlice.reducer;
