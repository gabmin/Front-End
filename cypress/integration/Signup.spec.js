describe("회원가입 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("로그인페이지에서 회원가입 버튼 클릭", () => {
    cy.visit("/login");

    cy.contains("회원가입")
      .click()
      .location("pathname")
      .should("equal", "/signup");
  });

  it("회원가입 페이지 각 인풋 입력 후 제출", () => {
    cy.get(".idInput").type("asd123").should("have.value", "asd123");
    cy.get(".pwInput").type("asdasd123!").should("have.value", "asdasd123!");
    cy.get('[data-testid="loginButton"]')
      .contains("로그인")
      .click()
      .location("pathname")
      .should("equal", "/");
    cy.get(".loginBtn").should("not.exist");
  });
});
