describe("Watch Page", () => {
  beforeEach(() => {
    cy.visit("/watch?v=dQw4w9WgXcQ");
  });

  it("loads the YouTube iframe correctly", () => {
    cy.get("iframe").should("have.attr", "src").and("include", "dQw4w9WgXcQ");
  });

  it("shows video details and comments", () => {
    cy.contains("Comments").should("exist");
  });
});
