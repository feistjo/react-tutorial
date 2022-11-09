/* globals cy */

describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });
  it("Opens with Fall CS Courses", () => {
    cy.visit("/");
    cy.get("[data-cy=course]").should("contain", "Fall CS");
  });
});
