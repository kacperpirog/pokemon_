import React from "react";
import { render, screen } from "@testing-library/react";
import Root from "./Root";

test("renders learn react link", () => {
  render(<Root />);
  const linkElement = screen.queryByText(/learn react/i);
  const linkElement_02 = screen.getByText((text) =>
    text.toLowerCase().includes("learn react")
  );
  expect(linkElement).toBeInTheDocument();
  expect(linkElement_02).toBeInTheDocument();
});
