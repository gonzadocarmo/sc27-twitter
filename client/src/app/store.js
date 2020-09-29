import { configureStore } from "@reduxjs/toolkit";
import tweetsReducer from "../features/tweets-keyword/tweetsKeywordSlice";
import tweetReducer from "../features/tweet/tweetSlice";
import hashtagsReducer from "../features/hashtags-keyword/hashtagsKeywordSlice";

export default configureStore({
  reducer: {
    tweets: tweetsReducer,
    tweet: tweetReducer,
    hashtags: hashtagsReducer
  }
});
