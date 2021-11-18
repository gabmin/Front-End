import React from "react";
import "@testing-library/jest-dom/extend-expect";
// import { render, screen } from "@testing-library/react";

import { render, screen } from "../../test/testUtils";
import Login from "../../src/pages/Login";

test("login id input", () => {
  render(<Login />);
  const idInput = screen.getByTestId("idInput");
  expect(idInput).toHaveTextContent("에러 페이지");
});
