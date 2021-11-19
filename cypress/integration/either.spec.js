describe("비로그인 상태", () => {
  it("찬반페이지 메인뷰 보기", () => {
    cy.visit("/");
    cy.contains("찬반").click();
    cy.url().should("include", "either");
  });

  it("다음 카드 보기", () => {
    cy.get('[data-testId="nextArrow"]')
      .click({ force: true })
      .click({ force: true });
  });

  it("이전 카드 보기", () => {
    cy.get('[data-testId="prevArrow"]')
      .click({ force: true })
      .click({ force: true });
  });

  it("진행중보기", () => {
    cy.contains("진행중").click({ force: true });
  });

  it("종료됨보기", () => {
    cy.contains("종료됨").click({ force: true });
  });

  it("전체보기", () => {
    cy.contains("전체").click({ force: true });
  });

  it("작성하기", () => {
    const stub = cy.stub();
    cy.visit("/");
    cy.contains("찬반").click().url().should("include", "either");
    cy.contains("질문하기").click();
    cy.on("window:alert", stub);
  });

  it("로그인하기", () => {
    cy.visit("/");
    cy.contains("로그인").click();
    cy.get(".idInput").type("rlarkqals").should("have.value", "rlarkqals");
    cy.get(".pwInput").type("qwer1234@").should("have.value", "qwer1234@");
    cy.get('[data-testid="loginButton"]')
      .click()
      .location("pathname")
      .should("equal", "/");
    cy.get('[data-testid="menuButton"]').click({ force: true });
    cy.get('[data-testid="logOutButton"]').click();
  });
});

describe("로그인 상태", () => {
  it("로그인하기", () => {
    cy.visit("/");
    cy.contains("로그인").click();
    cy.get(".idInput").type("rlarkqals").should("have.value", "rlarkqals");
    cy.get(".pwInput").type("qwer1234@").should("have.value", "qwer1234@");
    cy.get('[data-testid="loginButton"]')
      .click()
      .location("pathname")
      .should("equal", "/");
  });

  it("찬반페이지 메인뷰 보기", () => {
    cy.visit("/");
    cy.contains("찬반").click();
    cy.url().should("include", "either");
  });

  it("다음 카드 보기", () => {
    cy.get('[data-testId="nextArrow"]')
      .click({ force: true })
      .click({ force: true });
  });

  it("이전 카드 보기", () => {
    cy.get('[data-testId="prevArrow"]')
      .click({ force: true })
      .click({ force: true });
  });

  it("진행중보기", () => {
    cy.contains("진행중").click({ force: true });
  });

  it("종료됨보기", () => {
    cy.contains("종료됨").click({ force: true });
  });

  it("전체보기", () => {
    cy.contains("전체").click({ force: true });
  });

  it("작성하기버튼 클릭", () => {
    cy.contains("찬반").click().url().should("include", "either");
    cy.contains("질문하기").click();
    // cy.get('[data-testid="menuButton"]').click({ force: true });
    // cy.get('[data-testid="logOutButton"]').click();
  });

  it("작성하기", () => {
    cy.get('[data-testid="radioBtn"]').click();
    cy.get('[data-testid="titleInput"]')
      .type("테스트입니다.")
      .should("have.value", "테스트입니다.");
    cy.get('[data-testid="contentA"]')
      .type("컨텐트A 테스트입니다.")
      .should("have.value", "컨텐트A 테스트입니다.");
    cy.get('[data-testid="contentB"]')
      .type("컨텐트B 테스트입니다.")
      .should("have.value", "컨텐트B 테스트입니다.");
    cy.contains("완료").click().location("pathname").should("equal", "/either");
  });

  it("A 투표하기", () => {
    cy.contains("컨텐트A 테스트입니다.").click();
  });
  it("B 투표하기", () => {
    cy.contains("컨텐트B 테스트입니다.").click();
  });
});
