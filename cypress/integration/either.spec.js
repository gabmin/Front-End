describe("Either Test", () => {
  it("찬반페이지 메인뷰 보기", () => {
    cy.visit("https://gomtang.shop/");
    cy.contains("찬반").click();
    cy.url().should("include", "either");
  });

  it("비로그인시 작성하기", () => {
    const stub = cy.stub();

    cy.visit("https://gomtang.shop/");
    cy.contains("찬반").click();
    cy.contains("질문하기").click();
    cy.on("window:alert", stub);
  });

  it("로그인하기", () => {
    cy.visit("https://gomtang.shop/");
    cy.contains("로그인").click();
    cy.get(".idInput").type("rlarkqals").should("have.value", "rlarkqals");
    cy.get(".pwInput").type("qwer1234@").should("have.value", "qwer1234@");
    cy.get(".loginBtn").click().location("pathname").should("equal", "/");
  });
});
