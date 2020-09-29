import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import tweetsReducer from "../features/tweets-keyword/tweetsKeyboardSlice";
import tweetReducer from "../features/tweet/tweetSlice";
import hashtagsReducer from "../features/hashtags-keyword/hashtagsKeywordSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    tweets: tweetsReducer,
    tweet: tweetReducer,
    hashtags: hashtagsReducer
  }
});
