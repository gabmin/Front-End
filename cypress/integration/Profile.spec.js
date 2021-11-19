const randomNum = Math.floor(Math.random() * 21);

describe("프로필 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit(`/profile/${randomNum}`);
  });

  it("자신의 프로필페이지에서만 닉네임 수정 버튼 표시", () => {
    cy.get('[data-testid="headerNick"]')
      .invoke("text")
      .then(headerNick => {
        cy.get('[data-testid="profileNick"]')
          .invoke("text")
          .then(profileNick => {
            headerNick === profileNick
              ? cy.get('[data-testid="nickEditBtn"]').should("be.visible")
              : cy.get('[data-testid="nickEditBtn"]').should("not.exist");
          });
      });
  });
});
