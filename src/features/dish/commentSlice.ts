import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPromise, postPromise } from "../../services";
import { AsyncState, Comment } from "../../types";

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async () => await getPromise<Comment[]>("comments")
);

export const addNewComment = createAsyncThunk(
  "comments/post",
  async (comment: Comment) => await postPromise<Comment>("comments", comment)
);

const initialState: AsyncState<Comment> = { data: [], isLoading: true, error: null };

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  selectors: {
    selectCommentsByDishId: (state, dishId: number) =>
      state.data.filter((comment) => comment.dishId === dishId),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export const { selectCommentsByDishId } = commentSlice.selectors;

export default commentSlice.reducer;
