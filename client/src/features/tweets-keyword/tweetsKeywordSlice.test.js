import {
  getTweets,
  getError,
  isLoading,
  searchFailure,
  searchInit,
  searchSuccess
} from "./tweetsKeywordSlice";
import * as reducer from "./tweetsKeywordSlice";

describe("tweetsKeywordSlice", () => {
  describe("reducer", () => {
    const reducerUnderTest = reducer.tweetsKeywordSlice.reducer;
    describe("searchFailure", () => {
      it("should return new state w/ loading=false, empty items and error", () => {
        const intialState = {
          loading: true,
          items: [{ a: 1 }]
        };
        const actionPayload = { code: 1, data: "error one" };

        const result = reducerUnderTest(
          intialState,
          searchFailure(actionPayload)
        );

        expect(result).toEqual({
          loading: false,
          error: actionPayload,
          items: []
        });
      });
    });
    describe("searchInit", () => {
      it("should return new state w/ loading=true, empty items and no error", () => {
        const intialState = {
          loading: false,
          items: [{ a: 1 }],
          error: {}
        };

        const result = reducerUnderTest(intialState, searchInit());

        expect(result).toEqual({
          loading: true,
          items: []
        });
      });
    });
    describe("searchSuccess", () => {
      it("should return new state w/ loading=false, items and no error", () => {
        const intialState = {
          loading: true,
          items: []
        };

        const actionPayload = [{ a: 1 }, { b: 2 }];
        const result = reducerUnderTest(
          intialState,
          searchSuccess(actionPayload)
        );

        expect(result).toEqual({
          loading: false,
          items: [{ a: 1 }, { b: 2 }]
        });
      });
    });
  });
  describe("selectors", () => {
    describe("getTweets", () => {
      it("should return tweets from state when present", () => {
        const state = {
          tweets: {
            items: [{ a: 1 }, { b: 2 }],
            loading: false
          }
        };

        const result = getTweets(state);

        expect(result).toEqual([{ a: 1 }, { b: 2 }]);
      });
      it("should return empty array from state when no tweets", () => {
        const state = {
          tweets: {
            error: "something happened",
            loading: false,
            items: []
          }
        };

        const result = getTweets(state);

        expect(result).toEqual([]);
      });
    });
    describe("getError", () => {
      it("should return error from state when present", () => {
        const state = {
          tweets: { error: "something happened!", loading: false }
        };

        const result = getError(state);

        expect(result).toEqual("something happened!");
      });
      it("should return undefined from state when no error", () => {
        const state = { tweets: { loading: false } };

        const result = getError(state);

        expect(result).toBeUndefined();
      });
    });
    describe("isLoading", () => {
      it("should return isLoading from state", () => {
        const state = { tweets: { isLoading: false } };

        const result = isLoading(state);

        expect(result).toBeFalsy();
      });
    });
  });
});
