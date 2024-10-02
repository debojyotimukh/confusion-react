export const fetchActionTypes = Object.freeze({
  PENDING: "REQUEST_PENDING",
  FULFILLED: "REQUEST_FULFILLED",
  REJECTED: "REQUEST_REJECTED",
});

export const pendingState = { data: {}, isLoading: true, error: null };

export const fetchReducer = (_, action) => {
  switch (action.type) {
    case fetchActionTypes.PENDING:
      return pendingState;
    case fetchActionTypes.FULFILLED:
      return { data: action.payload, isLoading: false, error: null };
    case fetchActionTypes.REJECTED:
      return { data: {}, isLoading: false, error: action.payload };
  }
};
