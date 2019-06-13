describe("it should visit Jabber", () => {
  it("visits jabber", () => {
    cy.visit("/");
  });
  it("should login", () => {
    cy.get("div ul li:first-child ").click();
  });
  describe("should navigate to map page", () => {
    it("map page should open", () => {
      cy.get("a:nth-of-type(3)").click();
    });
    describe("should navigate to jabs page", () => {
      it("jabs page should open", () => {
        cy.get("a:nth-of-type(4)").click();
      });
    });
    describe("signout should log the user out", () => {
      it("user goes back to login page", () => {
        cy.get("a:first-of-type").click();
      });
    });
  });
});

// div .recorder_area .button_space .mic_button img:first-of-type
