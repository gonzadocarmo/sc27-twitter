import React from "react";

import { TweetsList } from "./TweetsKeywordList.component";
import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";

describe("TweetsList", () => {
  describe("when no tweets", () => {
    it('should show "No tweets found yet!"', () => {
      const emptyTweets = [];
      render(<TweetsList tweets={emptyTweets} />);
      screen.getByText("No tweets found yet!");
    });
  });
  describe("when 3 tweets", () => {
    const tweets = [
      {
        author: { screenName: "user 1" },
        tweet: { text: "content one", url: "http://www.one.com" }
      },
      {
        author: { screenName: "user 1" },
        tweet: { text: "content two", url: "http://www.two.com" }
      },
      {
        author: { screenName: "user 2" },
        tweet: { text: "content three", url: "http://www.three.com" }
      }
    ];
    beforeEach(() => {
      render(<TweetsList tweets={tweets} />);
    });

    it('should not display "No tweets found yet!" message', () => {
      expect(
        screen.queryByText("No tweets found yet!")
      ).not.toBeInTheDocument();
    });
    it("should list 3 tweets", () => {
      expect(screen.getAllByTestId("tweet-el").length).toEqual(3);
    });
    it("should dislay the author", async () => {
      const tweets = screen.getAllByTestId("tweet-el");

      within(tweets[0]).getByText("@user 1");
      within(tweets[1]).getByText("@user 1");
      within(tweets[2]).getByText("@user 2");
    });
    xit("should display the text", () => {
      const tweets = screen.getAllByTestId("tweet-el");

      within(tweets[0]).getByText("content one");
      within(tweets[1]).getByText("content two");
      within(tweets[2]).getByText("content three");
    });
    it("should have a link to the tweet page", () => {
      const tweets = screen.getAllByTestId("tweet-el");

      within(tweets[0]).getByText("http://www.one.com");
      within(tweets[1]).getByText("http://www.two.com");
      within(tweets[2]).getByText("http://www.three.com");
    });
  });
});
