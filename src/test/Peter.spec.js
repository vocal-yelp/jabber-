const request = require("supertest");
const assert = require("assert");
const app = require("../../Server/index");

describe("Checking tests", () => {
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

test("Latitude to be a number greater than 1", (req, res) => {
  const lat = req.body;
  expect(sendUserInfo(req)).toBeGreaterThan(1);
});

test("Longitude to be a number greater than 1", req => {
  const lng = req.body;
  expect(lng).toBeGreaterThan(1);
});

describe("Map style size", () => {
  test("height to equal 60vh", () => {
    expect(mapStyles.height).toBe("60vh");
  });
});
describe("Recording property:", function() {
  test("Recording should default to false.", function() {
    expect(Recording).toBe(false);
  });
});
