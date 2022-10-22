import * as ActionTypes from "./ActionTypes";
export const InitialFeedback = {
  firstname: "",
  lastname: "",
  telnum: "",
  email: "",
  agree: false,
  contactType: "Tel.",
  message: "",
};

export const FeedbackForm = (state = InitialFeedback, action) => {
  switch (action.type) {
    case ActionTypes.POST_FEEDBACK:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
