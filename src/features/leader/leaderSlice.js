import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPromise } from "../../services";

export const fetchLeaders = createAsyncThunk(
  "leaders/fetch",
  async () => await getPromise("leaders")
);

const initialState = { data: [], isLoading: true, error: null };

const leaderSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {},
  selectors: {
    selectFeaturedLeader: (state) =>
      state.data.filter((leader) => leader.featured)[0],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaders.pending, (state, _) => {
        state = initialState;
      })
      .addCase(fetchLeaders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeaders.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});

export const { selectFeaturedLeader } = leaderSlice.selectors;

export default leaderSlice.reducer;
