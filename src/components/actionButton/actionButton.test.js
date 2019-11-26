import React from "react";
import ReactDOM from "react-dom";
import ActionButton from "./actionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

afterEach(cleanup);
it("ActionButton renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ActionButton></ActionButton>, div);
  ReactDOM.unmountComponentAtNode(div);
});
const handleAction = jest.fn(() => true);
it("ActionButton renders correctly", () => {
  const { getByTestId } = render(
    <ActionButton
      icon={<FontAwesomeIcon icon={faTrash} />}
      label={"Test"}
      campaign={{
        id: 1,
        title: "Emails",
        history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }],
        selected: true
      }}
      onHandle={handleAction}
    ></ActionButton>
  );
  expect(getByTestId("actionButton")).toHaveTextContent("Test");
});

it("ActionButton matches snapshot", () => {
  const actionButtonSnap = renderer
    .create(
      <ActionButton
        icon={<FontAwesomeIcon icon={faTrash} />}
        label={"Test"}
        campaign={{
          id: 1,
          title: "Emails",
          history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }],
          selected: true
        }}
        onHandle={handleAction}
      ></ActionButton>
    )
    .toJSON();
  expect(actionButtonSnap).toMatchSnapshot();
});
