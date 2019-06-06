const request = require("supertest");
const assert = require("assert");
const app = require("../../Server/index");
const { divide } = require("./operations");

describe("checking tests", () => {
  it("sums numbers", () => {
    expect(1 + 2).toEqual(3);
  });
});

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});

// // it("correctly calculates the sum of 15 and 20", () => {
// //   assert.equal(operations.add(15, 20), 25);
// // });

// // it("correctly calculates the difference of 10 and 0", () => {
// //   assert.equal(operations.subtract(10, 10), 0);
// // });

// it("correctly calculates the quotient of 10 and 2", () => {
//   assert.equal(operations.divide(10, 2), 5);
// });
