describe("검색 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("검색 인풋에 검색어 입력 후 실행, 검색결과 페이지로 이동한다", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[data-testid="searchInput"]')
      .type("무야호")
      .should("have.value", "무야호");

    cy.get('[data-testid="searchInput"]')
      .type("{enter}")
      .location("pathname")
      .should("equal", `/search`);
  });
});
