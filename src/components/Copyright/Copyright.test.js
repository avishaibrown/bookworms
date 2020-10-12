import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Copyright from "./Copyright";
import { COPYRIGHT } from "../../util/constants";

configure({ adapter: new Adapter() });

describe("<Copyright />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Copyright />);
  });

  it("should render <Copyright /> with appropriate text", () => {
    expect(wrapper.text()).toContain(COPYRIGHT);
  });
});
