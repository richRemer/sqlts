import expect from "expect.js";
import {iseq} from "@esfn/sqlts";

describe("iseq(value)", () => {
  it("should return 'IS ...' when appropriate", () => {
    expect(iseq(null).toString()).to.be("IS NULL");
    expect(iseq(true).toString()).to.be("IS TRUE");
    expect(iseq(false).toString()).to.be("IS FALSE");
  });

  it("should return '= ...' when appropriate", () => {
    expect(iseq(42).toString()).to.be("= 42");
    expect(iseq("foo").toString()).to.be("= 'foo'");
  });
});
