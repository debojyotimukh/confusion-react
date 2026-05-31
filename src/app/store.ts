import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/dish/commentSlice";
import dishReducer from "../features/dish/dishSlice";
import leaderReducer from "../features/leader/leaderSlice";
import promoReducer from "../features/promo/promoSlice";

const store = configureStore({
  reducer: {
    dishes: dishReducer,
    promotions: promoReducer,
    leaders: leaderReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
