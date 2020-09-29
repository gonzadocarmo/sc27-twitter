import React from "react";
import { screen, render } from "@testing-library/react";
import { TweetsByKeyword } from "./TweetsKeyword.container";

import { Provider } from "react-redux";

import tweetsReducer from "./tweetsKeywordSlice";

import configureStore from "redux-mock-store";
//ES6 modules
const mockStore = configureStore([]);

describe("TweetsByKeyword", () => {
  describe("when page renders", () => {
    beforeEach(() =>
      render(
        <Provider store={mockStore({ tweets: { items: [] } })}>
          <TweetsByKeyword />
        </Provider>
      )
    );
    it("should show search form", () => {
      screen.getByText("Tweets by Keyword");
      screen.getByText("Keyword");
      screen.getByText("hours ago");

      expect(screen.getAllByRole("button").length).toEqual(2);
    });
    it("should NOT show loading indicator", () => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
    it("should show results title", () => {
      screen.getByText("Tweets");
    });
    it("should show no tweets", () => {
      expect(screen.queryAllByTestId("tweet-el").length).toEqual(0);
    });
  });

  describe("when data is loading", () => {
    beforeEach(() =>
      render(
        <Provider store={mockStore({ tweets: { items: [], loading: true } })}>
          <TweetsByKeyword />
        </Provider>
      )
    );
    it("should show search form", () => {
      screen.getByText("Tweets by Keyword");
      screen.getByText("Keyword");
      screen.getByText("hours ago");

      expect(screen.getAllByRole("button").length).toEqual(2);
    });
    it("should show loading indicator", () => {
      screen.getByRole("progressbar");
    });
    it("should show results title", () => {
      screen.getByText("Tweets");
    });
    it("should show no tweets", () => {
      expect(screen.queryAllByTestId("tweet-el").length).toEqual(0);
    });
  });

  describe("when data is fetched and there are some tweets", () => {
    beforeEach(() =>
      render(
        <Provider
          store={mockStore({
            tweets: {
              items: [
                {
                  tweet: { text: "hi there", url: "www.google.com" },
                  author: { screenName: "my-name" }
                }
              ],
              loading: false
            }
          })}
        >
          <TweetsByKeyword />
        </Provider>
      )
    );
    it("should show search form", () => {
      screen.getByText("Tweets by Keyword");
      screen.getByText("Keyword");
      screen.getByText("hours ago");

      expect(screen.getAllByRole("button").length).toEqual(2);
    });
    it("should NOT show loading indicator", () => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
    it("should show results title", () => {
      screen.getByText("Tweets");
    });
    it("should show no tweets", () => {
      expect(screen.queryAllByTestId("tweet-el").length).toEqual(1);
    });
  });
});
