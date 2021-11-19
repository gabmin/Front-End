describe("프로필 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/profile/20");
  });

  it("자신의 프로필페이지에서만 닉네임 수정 버튼 표시", () => {
    cy.get('[data-testid="headerNick"]')
      .invoke("text")
      .then(pickUpLocation => {
        cy.get('[data-testid="profileNick"]').should(
          "have.text",
          pickUpLocation,
        );
      });
  });
});
