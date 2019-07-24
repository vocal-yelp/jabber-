describe("Should route to Jabber", () => {
  beforeEach(() => {
    cy.log("Testing...");
  });
  it("Routes", () => {
    cy.visit("/");
  });
  it("This should log in to Jabber", () => {
    cy.get("button").click("center");
  });

  describe("Should navigate to map page", () => {
    it("map page should open", () => {
      cy.get("a:nth-of-type(3)").click();
    });

    describe("Should navigate to jabs page", () => {
      it("Jabs page should open", () => {
        cy.get("a:nth-of-type(4)").click();
      });
    });

    describe("Signout should log the user out", () => {
      it("User goes back to login page", () => {
        cy.get("a:first-of-type").click();
      });
    });
  });
});
