import { baseUrl } from "./constants";

export const getPromise = (endpoint) => {
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

export const postPromise = (endpoint, payload) => {
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
