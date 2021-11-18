describe("first test", () => {
  beforeEach(() => {
    cy.visit("/multi");
    cy.contains("로그인").click();
    cy.get(".idInput").type("tomato").should("have.value", "tomato");
    cy.get(".pwInput").type("test111!").should("have.value", "test111!");
    cy.waitForReact();
    cy.get(".Btn").click();
  });
  it("작성하기 버튼 클릭", () => {
    cy.visit("/");
    // cy.contains("질문하기").click();
    // cy.get(".idInput").type("tomato").should("have.value", "tomato");
    // cy.get(".pwInput").type("test111!").should("have.value", "test111!");
    // cy.waitForReact();
    // cy.get(".Btn").click();
  });
  // it("Multi 페이지로 가기", () => {
  // cy.visit("/multi");
  // });
  // it("질문하기", () => {
  //   cy.contains("질문하기").click();
  // });
});
