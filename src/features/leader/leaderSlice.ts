import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  selectors: {
    selectFeaturedLeader: (state) => state.data.find((leader) => leader.featured),
  },
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

export const { selectFeaturedLeader } = leaderSlice.selectors;

export default leaderSlice.reducer;
