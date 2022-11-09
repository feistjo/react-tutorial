/* globals cy */

describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });
  it("Opens with Fall CS Courses", () => {
    cy.visit("/");
    cy.get("[data-cy=course]").should("contain", "Fall CS");
  });
  it("shows Winter courses when Winter is selected", () => {
    cy.visit("/");
    cy.get("[data-cy=Winter]").click();
    cy.get("[data-cy=course]").should("contain", "Winter");
  });
});
