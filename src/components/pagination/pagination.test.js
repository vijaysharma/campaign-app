import React from "react";
import ReactDOM from "react-dom";
import Pagination from "./pagination";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);
it("Pagination renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Pagination></Pagination>, div);
  ReactDOM.unmountComponentAtNode(div);
});

const currentPage = 1;
const handlePagination = jest.fn(() => currentPage++);
it("Pagination renders correctly", () => {
  const { getByTestId } = render(
    <Pagination
      campaignsPerPage={10}
      currentPage={currentPage}
      totalCampaigns={50}
      onPaginate={handlePagination}
    ></Pagination>
  );
  expect(getByTestId("pagination")).toHaveTextContent("12345");
});

it("Pagination matches snapshot", () => {
  const treeSnap = renderer
    .create(
      <Pagination
        campaignsPerPage={10}
        currentPage={currentPage}
        totalCampaigns={50}
        onPaginate={handlePagination}
      ></Pagination>
    )
    .toJSON();
  expect(treeSnap).toMatchSnapshot();
});
