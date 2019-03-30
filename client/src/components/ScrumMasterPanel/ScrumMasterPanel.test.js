import React from "react";
import { shallow } from "enzyme";
import ScrumMasterPanel from "./ScrumMasterPanel";

const activeStory = {
  _id: "1",
  content: "story 1",
  isActive: true,
  developerVotes: [
    {
      _id: "11",
      browserId: "brId123",
      vote: "13"
    }
  ]
};

let wrapped;

beforeEach(() => {
  wrapped = shallow(<ScrumMasterPanel story={activeStory} />);
});

it("shows a title", () => {
  expect(wrapped.find("h3").length).toEqual(1);
});

it("has a button and input", () => {
  expect(wrapped.find("input").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(1);
});

it("has an input that users can type in", () => {
  wrapped.find("input").simulate("change", { target: { value: "12" } });
  wrapped.update();

  expect(wrapped.find("input").prop("value")).toEqual("12");
});

it("contain active story as a text like xxx is active", () => {
  wrapped.find("input").simulate("change", { target: { value: "12" } });
  wrapped.update();

  expect(wrapped.render().text()).toContain(`${activeStory.content} is active`);
});
