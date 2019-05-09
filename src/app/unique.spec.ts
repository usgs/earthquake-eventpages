import { getUnique } from "./unique";

describe("getUnique", () => {
  it("should be defined", () => {
    expect(getUnique).toBeTruthy();
  });

  it("should return unique values", () => {
    const result = getUnique(["a", "a", "b"]);
    expect(result).toEqual(["a", "b"]);
  });

  it("should omit empty values", () => {
    const result = getUnique(["", "a"]);
    expect(result).toEqual(["a"]);
  });

  it("should support objects", () => {
    const result = getUnique([
      { id: "a", other: 1 },
      { id: "b" },
      { id: "a", other: 2 }
    ]);
    expect(result).toEqual([{ id: "a", other: 1 }, { id: "b" }]);
  });
});
