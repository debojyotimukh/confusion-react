import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPromise } from "../../services";

export const fetchPromos = createAsyncThunk(
  "promotions/fetch",
  async () => await getPromise("promotions")
);

const initialState = { data: [], isLoading: true, error: null };

const promoSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  selectors: {
    selectFeaturedPromo: (state) =>
      state.data.filter((promo) => promo.featured)[0],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromos.pending, (state, _) => {
        state = initialState;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPromos.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});

export const { selectFeaturedPromo } = promoSlice.selectors;

export default promoSlice.reducer;
