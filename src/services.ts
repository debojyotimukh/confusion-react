import { Feedback } from "./types";
import { baseUrl } from "./constants";

interface FetchError extends Error {
  response?: Response;
}

export const getPromise = <T>(endpoint: string): Promise<T> => {
  return fetch(baseUrl + endpoint)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error: FetchError = new Error(
            "Error " + response.status + " : " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error: Error) => {
        throw new Error(error.message);
      }
    )
    .then((response) => response.json() as Promise<T>);
};

export const postPromise = <T>(endpoint: string, payload: unknown): Promise<T> => {
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
          const error: FetchError = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error: Error) => {
        throw error;
      }
    )
    .then((response) => response.json() as Promise<T>);
};

export const postFeedback = (
  feedback: Omit<Feedback, "id">,
  successCallback: (response: Feedback) => void,
  failedCallback: (msg: string) => void
): void => {
  postPromise<Feedback>("feedback", { ...feedback, id: crypto.randomUUID() })
    .then((response) => successCallback(response))
    .catch((error: Error) => failedCallback(error.message));
};
