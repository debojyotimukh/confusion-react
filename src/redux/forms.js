import * as ActionTypes from "./ActionTypes";
const InitialFeedback = {
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
    case ActionTypes.FEEDBACK_SUCCESS:
      alert("Thank you for your feedback!\n" + JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};
