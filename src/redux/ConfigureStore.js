import { applyMiddleware, combineReducers, createStore } from "redux";
import { Comments } from "./comments";
import { Dishes } from "./dishes";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { FeedbackForm } from "./forms";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      ...createForms({ feedback: FeedbackForm }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
