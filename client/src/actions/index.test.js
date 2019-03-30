import { sessionFetched, sessionUpdated } from "../actions";

it("sessionFetched returns a function", () => {
  const action = sessionFetched({});
  expect(typeof action).toBe("function");
});

it("sessionUpdated returns a function", () => {
  const action = sessionUpdated({});
  expect(typeof action).toBe("function");
});
