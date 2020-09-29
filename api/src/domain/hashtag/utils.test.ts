import { createResponseModel } from "./utils";

describe("createResponseModel", () => {
  describe("when no hashtags", () => {
    it("should return empty array", () => {
      const input = {
        statuses: [
          { user_id: 1, entities: { hashtags: [], symbols: [] } },
          { user_id: 2, entities: { hashtags: [], symbols: [] } },
          { user_id: 3, entities: { hashtags: [], symbols: [] } }
        ]
      };

      const result = createResponseModel(input);

      expect(result).toEqual([]);
    });
  });

  describe("when hashtags", () => {
    it("should return array w/ unique hashtag text", () => {
      const input = {
        statuses: [
          {
            user_id: 1,
            entities: {
              hashtags: [
                { text: "museum", indices: [1, 5] },
                { text: "health", indices: [10, 50] }
              ],
              symbols: []
            }
          },
          { user_id: 2, entities: { hashtags: [], symbols: [] } },
          {
            user_id: 3,
            entities: {
              hashtags: [
                { text: "flight", indices: [1, 5] },
                { text: "health", indices: [10, 50] }
              ],
              symbols: []
            }
          }
        ]
      };

      const result = createResponseModel(input);

      expect(result).toEqual(["museum", "health", "flight"]);
    });
  });
});
