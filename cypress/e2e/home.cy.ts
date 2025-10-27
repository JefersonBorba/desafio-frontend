describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the home page with videos", () => {
    cy.contains("YouTube").should("exist");
    cy.get("[data-testid='more-videos']").should("exist");
  });

  it("navigates to the must-watch video", () => {
    cy.contains("Must Watch").click();
    cy.url().should("include", "/watch");
  });
});
