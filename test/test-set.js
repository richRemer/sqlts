import expect from "expect.js";
import {set} from "@esfn/sqlts";

describe("set(object)", () => {
  it("should create key = value assignments from object", () => {
    const data = {a: 42, b: "foo", c: null, d: true};
    expect(set(data).toString()).to.be("a = 42, b = 'foo', c = NULL, d = TRUE");
  });
});
