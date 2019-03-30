import { SESSION_FETCHED, SESSION_UPDATED } from "../actions/types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SESSION_FETCHED:
      return { ...state, currentSession: payload };
    case SESSION_UPDATED:
      return { ...state, currentSession: payload };
    default:
      return state;
  }
};
