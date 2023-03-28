import { memoize } from "../memoize.js";

describe("memoize", () => {
  it("should call the function once", () => {
    const fn = jest.fn();
    const memoized = memoize(fn);

    memoized("foo");
    memoized("foo");
    memoized("foo");

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
