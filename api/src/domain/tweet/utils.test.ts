import { createResponseModel, filterResultsByLastHours } from "./utils";

describe("createResponseModel", () => {
  it("should return model w/ text, url and author screen name", () => {
    const input = {
      text: "hi there",
      id_str: "1234567890",
      user: {
        screen_name: "gonzalo",
        id_str: "900"
      }
    };
    const result = createResponseModel(input);
    expect(result).toEqual({
      tweet: {
        text: "hi there",
        url: "https://twitter.com/900/status/1234567890"
      },
      author: {
        screenName: "gonzalo"
      }
    });
  });
});

describe("filterResultsByLastHours", () => {
  let now: Date, oneHourAgo: Date, threeHoursAgo: Date;

  beforeAll(() => {
    now = new Date(2020, 1, 24, 20, 0, 0);
    oneHourAgo = new Date(2020, 1, 24, 19, 0, 0);
    threeHoursAgo = new Date(2020, 1, 24, 17, 0, 0);
    global.Date.now = jest.fn(() => now.getTime());
  });
  afterAll(() => jest.resetAllMocks());

  describe("when no results within the last 2 hours", () => {
    it("should return empty array", () => {
      const input = [
        {
          created_at: threeHoursAgo,
          text: "hi there"
        },
        {
          created_at: threeHoursAgo,
          text: "hi again"
        },
        {
          created_at: threeHoursAgo,
          text: "bye bye!"
        },
        {
          created_at: threeHoursAgo,
          text: "good morning"
        }
      ];

      const result = filterResultsByLastHours(input, 2);

      expect(result).toEqual([]);
    });
  });
  describe("when all 4 results within the last 2 hours", () => {
    it("should return array w/ 4 items", () => {
      const input = [
        {
          created_at: oneHourAgo,
          text: "hi there"
        },
        {
          created_at: oneHourAgo,
          text: "hi again"
        },
        {
          created_at: oneHourAgo,
          text: "bye bye!"
        },
        {
          created_at: oneHourAgo,
          text: "good morning"
        }
      ];

      const result = filterResultsByLastHours(input, 2);

      expect(result).toEqual(input);
    });
  });
  describe("when only 2 results within the last 2 hours", () => {
    it("should return array w/ 2 items", () => {
      const input = [
        {
          created_at: threeHoursAgo,
          text: "hi there"
        },
        {
          created_at: oneHourAgo,
          text: "hi again"
        },
        {
          created_at: oneHourAgo,
          text: "bye bye!"
        },
        {
          created_at: threeHoursAgo,
          text: "good morning"
        }
      ];

      const result = filterResultsByLastHours(input, 2);

      expect(result).toEqual([
        {
          created_at: oneHourAgo,
          text: "hi again"
        },
        {
          created_at: oneHourAgo,
          text: "bye bye!"
        }
      ]);
    });
  });
});
