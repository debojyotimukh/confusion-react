import { fetchActionTypes } from "./app/common/fetchReducer";
import { baseUrl } from "./constants";

const getPromise = (endpoint) => {
  return fetch(baseUrl + endpoint)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + " : " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json());
};

export const get = (endpoint, sucessCallback, failedCallback) => {
  getPromise(endpoint)
    .then((dishes) => sucessCallback(dishes))
    .catch((error) => failedCallback(error.message));
};

export const getDishWithComments = async (
  dishId,
  loadedCallback,
  failedCallback
) => {
  try {
    const allComments = await getPromise("comments");
    const comments = allComments.filter(
      (comment) => parseInt(comment.dishId, 10) === dishId
    );
    const dish = await getPromise(`dishes/${dishId}`);
    loadedCallback({ ...dish, comments: comments });
  } catch (error) {
    failedCallback(error.message);
  }
};

export const getAndDispatch = (endpoint, dispatch, processor = (x) => x) => {
  get(
    endpoint,
    (data) =>
      dispatch({
        type: fetchActionTypes.FULFILLED,
        payload: processor(data),
      }),
    (errmsg) => dispatch({ type: fetchActionTypes.REJECTED, payload: errmsg })
  );
};

const postPromise = (endpoint, payload) => {
  return fetch(baseUrl + endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json());
};

export const postFeedback = (feedback, sucessCallback, failedCallback) => {
  postPromise("feedback", { ...feedback, id: crypto.randomUUID() })
    .then((response) => sucessCallback(response))
    .catch((error) => failedCallback(error.message));
};

export const postComment = (comment, sucessCallback, failedCallback) => {
  postPromise("comments", { ...comment, id: crypto.randomUUID() })
    .then((response) => sucessCallback(response))
    .catch((error) => failedCallback(error.message));
};
