const request = require("supertest");
const assert = require("assert");
const app = require("../../Server/index");

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
describe("array to equal correct values", () => {
  test("Array should = [1,2,3]", () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });
});

describe("map style size", () => {
  test("height to equal 60vh", () => {
    expect(mapStyles.height).toBe("60vh");
  });
});
describe("Recording property:", function() {
  test("Recording should default to false.", function() {
    expect(Recording).toBe(false);
  });
});
