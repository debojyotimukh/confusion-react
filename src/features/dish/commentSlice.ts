import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
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

const selectCommentsData = (state: RootState) => state.comments.data;

/** Factory: one selector instance per component so each dishId has its
 *  own memoisation cache. filter() always creates a new array, so
 *  memoisation is essential here. */
export const makeSelectCommentsByDishId = (dishId: string) =>
  createSelector(selectCommentsData, (data) =>
    data.filter((c) => String(c.dishId) === dishId)
  );

export default commentSlice.reducer;
