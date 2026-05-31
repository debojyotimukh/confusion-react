import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPromise } from "../../services";
import { AsyncState, Promotion } from "../../types";

export const fetchPromos = createAsyncThunk(
  "promotions/fetch",
  async () => await getPromise<Promotion[]>("promotions")
);

const initialState: AsyncState<Promotion> = { data: [], isLoading: true, error: null };

const promoSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  selectors: {
    selectFeaturedPromo: (state) => state.data.find((promo) => promo.featured),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPromos.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { selectFeaturedPromo } = promoSlice.selectors;

export default promoSlice.reducer;
