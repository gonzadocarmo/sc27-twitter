import { getPopularHashtagsByCriteria } from "./index.controller";

describe("Hashtag Controller", () => {
  describe("getPopularHashtagsByCriteria", () => {
    describe("when request is not valid", () => {
      it("should return error for no keyword", async () => {
        expect.assertions(1);
        try {
          await getPopularHashtagsByCriteria({});
        } catch (error) {
          expect(error.code).toEqual("INPUT_VALIDATION");
        }
      });

      it("should return error for empty keyword", async () => {
        expect.assertions(1);
        try {
          await getPopularHashtagsByCriteria({ keyword: "" });
        } catch (error) {
          expect(error.code).toEqual("INPUT_VALIDATION");
        }
      });
    });

    describe("when request is valid", () => {
      // TBD: similar to others
    });
  });
});
