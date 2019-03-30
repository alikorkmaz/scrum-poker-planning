import sessionsReducer from "./sessionsReducer";
import { SESSION_FETCHED, SESSION_UPDATED } from "../actions/types";

it("handles actions of type SESSION_FETCHED", () => {
  const action = {
    type: SESSION_FETCHED,
    payload: {
      _id: "1"
    }
  };
  const newState = sessionsReducer({}, action);
  expect(newState).toEqual({
    currentSession: {
      _id: "1"
    }
  });
});

it("handles actions of type SESSION_UPDATED", () => {
  const action = {
    type: SESSION_UPDATED,
    payload: {
      _id: "1"
    }
  };
  const newState = sessionsReducer({}, action);
  expect(newState).toEqual({
    currentSession: {
      _id: "1"
    }
  });
});

it("handles actions with unknown type", () => {
  const newState = sessionsReducer({}, {});
  expect(newState).toEqual({});
});
