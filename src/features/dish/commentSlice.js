import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPromise, postPromise } from "../../services";

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async () => await getPromise("comments")
);

export const addNewComment = createAsyncThunk(
  "comments/post",
  async (comment) => await postPromise("comments", comment)
);

const initialState = { data: [], isLoading: true, error: null };

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  selectors: {
    selectCommentsByDishId: (state, dishId) =>
      state.data.filter((comment) => comment.dishId == dishId),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, _) => {
        state = initialState;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export const { selectCommentsByDishId } = commentSlice.selectors;

export default commentSlice.reducer;
