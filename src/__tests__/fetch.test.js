jest.mock("node-fetch");
import fetch from "node-fetch";
import { fetchJson } from "../fetch.js";

describe("fetchJson", () => {
  it("should return JSON", async () => {
    const expected = { success: true };
    const response = new Response(JSON.stringify(expected));
    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(response));

    const actual = await fetchJson("http://fake.url/");
    expect(actual).toMatchObject(expected);
  });
});
