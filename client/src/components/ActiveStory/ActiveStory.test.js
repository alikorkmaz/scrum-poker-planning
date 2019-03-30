import React from "react";
import { shallow } from "enzyme";
import ActiveStory from "./ActiveStory";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<ActiveStory />);
});

it("shows a title", () => {
  expect(wrapped.find("h3").length).toEqual(1);
});

it("has buttons", () => {
  expect(wrapped.find("button").length).toBeGreaterThan(0);
});
