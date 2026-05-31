import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { getPromise } from "../../services";
import { AsyncState, Leader } from "../../types";

export const fetchLeaders = createAsyncThunk(
  "leaders/fetch",
  async () => await getPromise<Leader[]>("leaders")
);

const initialState: AsyncState<Leader> = { data: [], isLoading: true, error: null };

const leaderSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeaders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeaders.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const selectFeaturedLeader = createSelector(
  (state: RootState) => state.leaders.data,
  (data) => data.find((l) => l.featured)
);

export default leaderSlice.reducer;
