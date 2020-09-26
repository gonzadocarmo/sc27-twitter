import { getTweetsListByCriteria, createTweet } from "./index.controller";

import { callAPI } from "../../http/index";

jest.mock("../../http/index", () => ({
  callAPI: jest.fn()
}));

describe("Tweet Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getTweetsListByCriteria", () => {
    describe("when request is not valid", () => {
      describe("when keyword field invalid", () => {
        it("should return error for no keyword", async () => {
          expect.assertions(1);
          try {
            await getTweetsListByCriteria({ lastHours: 5 });
          } catch (error) {
            expect(error.code).toEqual("INPUT_VALIDATION");
          }
        });

        it("should return error for empty keyword", async () => {
          expect.assertions(1);
          try {
            await getTweetsListByCriteria({ lastHours: 5, keyword: "" });
          } catch (error) {
            expect(error.code).toEqual("INPUT_VALIDATION");
          }
        });
      });

      describe("when lastHours field invalid", () => {
        it("should return error for no lastHours", async () => {
          expect.assertions(1);
          try {
            await getTweetsListByCriteria({ keyword: "some" });
          } catch (error) {
            expect(error.code).toEqual("INPUT_VALIDATION");
          }
        });

        it("should return error for no right format", async () => {
          expect.assertions(1);
          try {
            await getTweetsListByCriteria({
              keyword: "some",
              lastHours: "ala"
            });
          } catch (error) {
            expect(error.code).toEqual("INPUT_VALIDATION");
          }
        });
      });
    });

    describe("when request is valid", () => {
      const validRequest = {
        keyword: "some",
        lastHours: 2
      };
      let results;
      beforeEach(async () => {
        callAPI.mockResolvedValue({ statuses: [] });
        results = await getTweetsListByCriteria(validRequest);
      });
      it("should callAPI w/ specific query query string", () => {
        expect(callAPI).toHaveBeenCalledTimes(1);
        expect(callAPI).toHaveBeenCalledWith({
          url: "/search/tweets.json?q=some&count=10&result_type=recent"
        });
      });
      it("should return results from callAPI", () => {
        expect(results).toEqual([]);
      });
    });
  });

  describe("createTweet", () => {
    describe("when request is not valid", () => {
      describe("when text field invalid", () => {
        it("should return error for no text", async () => {
          expect.assertions(1);
          try {
            await createTweet({});
          } catch (error) {
            expect(error.code).toEqual("INPUT_VALIDATION");
          }
        });

        it("should return error for empty text", async () => {
          expect.assertions(1);
          try {
            await createTweet({ text: "" });
          } catch (error) {
            expect(error.code).toEqual("INPUT_VALIDATION");
          }
        });
      });
    });
  });
});
