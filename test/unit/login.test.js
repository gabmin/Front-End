import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import ErrorPage from "../../src/pages/ErrorPage";

test("login id input", () => {
  render(<ErrorPage />);
  const idInput = screen.getByTestId("idInput");
  expect(idInput).toHaveTextContent("에러 페이지");
});
