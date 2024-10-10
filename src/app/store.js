import { configureStore } from "@reduxjs/toolkit";
import dishReducer from "../features/dish/dishSlice";
import leaderReducer from "../features/leader/leaderSlice";
import promoReducer from "../features/promo/promoSlice";

const store = configureStore({
  reducer: {
    dishes: dishReducer,
    promotions: promoReducer,
    leaders: leaderReducer,
  },
});

export default store;
