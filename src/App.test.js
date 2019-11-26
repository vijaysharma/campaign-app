import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Campaign from "./components/campaign/campaign";
import ActionButton from "./components/actionButton/actionButton";

Enzyme.configure({ adapter: new Adapter() });

it("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const currentStateSampaigns = [
  {
    id: 1,
    title: "Emails",
    history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }],
    selected: true
  },
  {
    id: 2,
    title: "Push Notifications",
    history: [{ title: "Created", on: "2:45 pm", by: "John" }]
  },
  {
    id: 3,
    title: "InApp Messages",
    history: [{ title: "Created", on: "2:43 pm", by: "Dave" }]
  }
];
const campaign = {
  id: 1,
  title: "Emails",
  history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }],
  selected: true
};
it("App component Testing", () => {
  const appComponent = mount(<App />);
  expect(appComponent.exists()).toBe(true);
  expect(appComponent.getElements()).toMatchSnapshot();
  const campaignItem = appComponent.find(Campaign).first();
  campaignItem.simulate("click");
  expect(campaignItem.prop("listNumber")).toBeTruthy();
  expect(campaignItem.prop("campaign")).toBeTruthy();
  const selectPause = campaignItem.find(ActionButton).first();
  selectPause.simulate("click");
  expect(selectPause.prop("label")).toBe("Pause");

  const selectDelete = campaignItem.find(ActionButton).last();
  selectDelete.simulate("click");
  expect(selectDelete.prop("label")).toBe("Delete");
});
