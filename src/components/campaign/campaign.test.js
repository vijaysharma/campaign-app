import React from "react";
import ReactDOM from "react-dom";
import Campaign from "./campaign";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

const handleAction = jest.fn(() => true);
afterEach(cleanup);
it("Campaign renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Campaign
      campaign={{
        id: 1,
        title: "Emails",
        history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }],
        selected: true
      }}
      onPause={handleAction}
      onToggleComment={handleAction}
      onComment={handleAction}
      onRename={handleAction}
      onDelete={handleAction}
      onSelect={handleAction}
      listNumber={1}
    ></Campaign>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("Campaign renders correctly", () => {
  const { getByTestId } = render(
    <Campaign
      campaign={{
        id: 1,
        title: "Emails",
        history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }],
        selected: true
      }}
      onPause={handleAction}
      onToggleComment={handleAction}
      onComment={handleAction}
      onRename={handleAction}
      onDelete={handleAction}
      onSelect={handleAction}
      listNumber={1}
    ></Campaign>
  );
  expect(getByTestId("campaign")).toHaveTextContent(
    "1Campaign 1 - EmailsCreated at 2:54 pmPauseCommentRenameDelete"
  );
});

it("Campaign matches snapshot", () => {
  const campaignSnap = renderer
    .create(
      <Campaign
        campaign={{
          id: 1,
          title: "Emails",
          history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }],
          selected: true
        }}
        onPause={handleAction}
        onToggleComment={handleAction}
        onComment={handleAction}
        onRename={handleAction}
        onDelete={handleAction}
        onSelect={handleAction}
        listNumber={1}
      ></Campaign>
    )
    .toJSON();
  expect(campaignSnap).toMatchSnapshot();
});
