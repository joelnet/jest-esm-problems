import { jest } from "@jest/globals";
import { Response } from "node-fetch";

jest.unstable_mockModule("node-fetch", () => ({
  default: jest.fn(),
}));

const mockFetch = await import("node-fetch");

const { fetchJson } = await import("../fetch.js");

describe("fetchJson", () => {
  it("should return JSON", async () => {
    const expected = { success: true };
    const response = new Response(JSON.stringify(expected));

    mockFetch.default.mockReturnValueOnce(response);

    const actual = await fetchJson("http://fake.url/");
    expect(actual).toStrictEqual(expected);
  });
});
