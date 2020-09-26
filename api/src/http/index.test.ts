const { callAPI } = require("./");

import axiosMockAdapter from "axios-mock-adapter";
import axios from "axios";

const mockAdapter = new axiosMockAdapter(axios);

describe("http", () => {
  const request = {
    url: "www.google.com"
  };

  beforeEach(() => jest.clearAllMocks());

  it("should make GET request", async () => {
    mockAdapter.onGet("www.google.com").reply(200);

    await callAPI(request);
  });

  it("should make POST request with proper headers and body", async () => {
    mockAdapter
      .onPost(
        "www.google.com",
        { a: 1, b: 2 },
        {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8"
        }
      )
      .reply(200);

    await callAPI({ ...request, method: "POST", data: { a: 1, b: 2 } });
  });

  it("should make PUT request with proper headers and body", async () => {
    mockAdapter
      .onPut(
        "www.google.com?id=1",
        { c: 3 },
        {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8"
        }
      )
      .reply(200);

    await callAPI({
      url: "www.google.com?id=1",
      method: "PUT",
      data: { c: 3 }
    });
  });

  it("should make DELETE request with proper headers and body", async () => {
    mockAdapter.onDelete("www.google.com?id=1").reply(200);

    await callAPI({ url: "www.google.com?id=1", method: "DELETE" });
  });
  describe("when success service response", () => {
    it("should return response from service", async () => {
      const serviceResponse = { a: 1 };
      mockAdapter.onGet("www.google.com").reply(200, serviceResponse);

      const result = await callAPI(request);

      expect(result).toEqual(serviceResponse);
    });
  });
  describe("when error service response", () => {
    describe("when network error", () => {
      it('should return rejected promise with "Network Error" error', async () => {
        mockAdapter.onGet("www.google.com").networkError();
        expect.assertions(1);
        try {
          await callAPI(request);
        } catch (error) {
          expect(error).toEqual({ code: "UNKNOWN", data: "Network Error" });
        }
      });
    });
    describe("when timeout error", () => {
      it('should return rejected promise with "timeout of 0ms exceeded" error', async () => {
        mockAdapter.onGet("www.google.com").timeout();
        expect.assertions(1);
        try {
          await callAPI(request);
        } catch (error) {
          expect(error).toEqual({
            code: "UNKNOWN",
            data: "timeout of 0ms exceeded"
          });
        }
      });
    });

    [400, 404, 500].map((httpStatusCode) => {
      describe(`when http status code = ${httpStatusCode}`, () => {
        it("should return rejected promise with error code and response from service", async () => {
          const errorResponse = { b: 1, c: 0 };
          mockAdapter
            .onGet("www.google.com")
            .reply(httpStatusCode, errorResponse);
          expect.assertions(1);
          try {
            await callAPI(request);
          } catch (error) {
            expect(error).toEqual({
              code: `${httpStatusCode}`,
              data: errorResponse
            });
          }
        });
      });
    });
  });
});
