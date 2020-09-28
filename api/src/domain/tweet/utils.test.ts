import { createResponseModel } from "./utils";

describe("createResponseModel", () => {
  it("should return model w/ text, url and author screen name", () => {
    const input = {
      text: "hi there",
      entities: { urls: [{ url: "www.google.com" }] },
      user: {
        screen_name: "gonzalo"
      }
    };
    const result = createResponseModel(input);
    expect(result).toEqual({
      tweet: {
        text: "hi there",
        url: "www.google.com"
      },
      author: {
        screenName: "gonzalo"
      }
    });
  });
  describe("when no urls", () => {
    it("should return model w/text, no url and and author screen name", () => {
      const input = {
        text: "hi there",
        entities: { urls: [] },
        user: {
          screen_name: "gonzalo"
        }
      };
      const result = createResponseModel(input);
      expect(result).toEqual({
        tweet: {
          text: "hi there"
        },
        author: {
          screenName: "gonzalo"
        }
      });
    });
  });
});
