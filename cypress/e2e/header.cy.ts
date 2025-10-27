describe("Header", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays Sign In when no user", () => {
    cy.contains("Sign In").should("exist");
  });

  it("shows search suggestions when focused", () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "searchHistory",
        JSON.stringify(["Rick Astley", "Queen"]),
      );
    });

    cy.reload();
    cy.get("input[placeholder='Search']").focus();
    cy.contains("Rick Astley").should("exist");
    cy.contains("Queen").should("exist");
  });

  it("saves query and redirects on Enter", () => {
    cy.get("input[placeholder='Search']").type("Daft Punk{enter}");
    cy.url().should("include", "results?search_query=Daft%20Punk");
  });
});
