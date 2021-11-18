describe("Either Test", () => {
  it("visit website and go to Either main page", () => {
    cy.visit("https://gomtang.shop/");
    cy.contains("찬반").click();
    cy.contains("질문하기").click();
  });
});
