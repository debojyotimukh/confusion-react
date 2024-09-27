import { baseUrl } from "./constants";

export const fetchAll = (endpoint, loadedCallback, failedCallback) => {
  fetch(baseUrl + endpoint)
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
    .then((response) => response.json())
    .then((dishes) => loadedCallback(dishes))
    .catch((error) => failedCallback(error.message));
};
