import { render, screen } from "@testing-library/react";
import { SignupWrapper } from "../../src/pages/Login";

test("login id input", () => {
  render(<SignupWrapper />);
  const idInput = screen.getByTestId("idInput");
  expect(idInput).toHaveTextContext("계정이 없으신가요? 지금 바로 가입하세요!");
});
