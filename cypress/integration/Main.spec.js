describe("메인 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("찬반 질문 작성하기 클릭 시, 작성하기 페이지로 이동한다", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
    cy.get('[data-testid="goEitherBtn"]')
      .click()
      .location("pathname")
      .should("equal", "/write");
  });

  it("객관식 질문 작성하기 클릭 시, 작성하기 페이지로 이동한다", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
    cy.get('[data-testid="goMultiBtn"]')
      .click()
      .location("pathname")
      .should("equal", "/write");
  });

  it("초기 렌더되는 카드의 총 갯수는 8개", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
    cy.get('[data-testid="slickSlider"]')
      .find('[data-testid="slickcard"]')
      .should("have.length", 8);
  });
});
