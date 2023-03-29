import { jest } from '@jest/globals';

jest.unstable_mockModule('node-fetch', () => ({
  default: function () { return { ok: true, json: () => ({ success: true }) } }
}));

import { Response } from 'node-fetch';
const { fetchJson } = await import("../fetch.js");

describe("fetchJson", () => {
  it("should return JSON", async () => {
    const expected = { success: true };
    const response = new Response(JSON.stringify(expected));
    // @ts-ignore

    const actual = await fetchJson("http://fake.url/");
    expect(actual).toMatchObject(expected);
  });
});
