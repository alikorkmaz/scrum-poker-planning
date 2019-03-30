import React from "react";
import { shallow } from "enzyme";
import StoryList from "./StoryList";

const stories = [
  {
    _id: "1",
    content: "story 1",
    developerVotes: []
  },
  {
    _id: "2",
    content: "story 2",
    developerVotes: []
  }
];

let wrapped;

beforeEach(() => {
  wrapped = shallow(<StoryList stories={stories} />);
});

it("shows a title", () => {
  expect(wrapped.find("h3").length).toEqual(1);
});

it("has a table and has rows for stories that comes from props", () => {
  expect(wrapped.find("table").length).toEqual(1);
  expect(wrapped.find("tr").length).toEqual(stories.length + 1);
});
