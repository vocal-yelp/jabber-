describe("it should visit Jabber", () => {
  beforeEach(() => {
    cy.log("test commencing");
  });
  it("visits jabber", () => {
    cy.visit("/");
  });
  it("should login", () => {
    cy.get("button").click("center");
  });
  describe("should navigate to map page", () => {
    it("map page should open", () => {
      cy.get("button").click({ multiple: true });
    });
    describe("should navigate to jabs page", () => {
      it("jabs page should open", () => {
        cy.get("a:nth-of-type(4)").click();
      });
    });
    describe("signout should log the user out", () => {
      it("user goes back to login page", () => {
        cy.get("a").click("topRight");
      });
    });
  });
});
