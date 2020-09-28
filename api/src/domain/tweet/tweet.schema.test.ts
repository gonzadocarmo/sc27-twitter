import {
  getTweetsListByCriteriaSchema,
  createTweetSchema
} from "./tweet.schema";

describe("schema", () => {
  describe("getTweetsListByCriteriaSchema", () => {
    describe("when valid", () => {
      it("should return true", async () => {
        const input = { keyword: "hello", lastHours: 3 };
        const result = await getTweetsListByCriteriaSchema.isValid(input);
        expect(result).toBeTruthy();
      });
    });
    describe("when not valid", () => {
      it("'keyword' field not present - should return false", async () => {
        const input = { lastHours: 3 };
        const result = await getTweetsListByCriteriaSchema.isValid(input);
        expect(result).toBeFalsy();
      });
      it("'keyword' field empty - should return false", async () => {
        const input = { keyword: "", lastHours: 3 };
        const result = await getTweetsListByCriteriaSchema.isValid(input);
        expect(result).toBeFalsy();
      });
      it("'lastHours' field not present - should return false", async () => {
        const input = { keyword: "hello" };
        const result = await getTweetsListByCriteriaSchema.isValid(input);
        expect(result).toBeFalsy();
      });
      it("'lastHours' field not a number - should return false", async () => {
        const input = { keyword: "hello", lastHours: "seven hours" };
        const result = await getTweetsListByCriteriaSchema.isValid(input);
        expect(result).toBeFalsy();
      });
      it("'lastHours' field smaller than 0 - should return false", async () => {
        const input = { keyword: "hello", lastHours: -1 };
        const result = await getTweetsListByCriteriaSchema.isValid(input);
        expect(result).toBeFalsy();
      });
    });
  });
  describe("createTweetSchema", () => {
    describe("when valid", () => {
      it("should return true", async () => {
        const input = { text: "this is the message" };
        const result = await createTweetSchema.isValid(input);
        expect(result).toBeTruthy();
      });
    });
    describe("when not valid", () => {
      it("'text' field not present - should return false", async () => {
        const input = {};
        const result = await createTweetSchema.isValid(input);
        expect(result).toBeFalsy();
      });
      it("'text' field empty - should return false", async () => {
        const input = { text: "" };
        const result = await createTweetSchema.isValid(input);
        expect(result).toBeFalsy();
      });
      it("'text' field w/ more than 150 chars - should return false", async () => {
        const input = {
          text:
            "this is a very long text that is not supposed to be valid because of maximum number of characters exceeded! - this is a very long text that is not supposed to be valid because of maximum number of characters exceeded!"
        };
        const result = await createTweetSchema.isValid(input);
        expect(result).toBeFalsy();
      });
    });
  });
});
