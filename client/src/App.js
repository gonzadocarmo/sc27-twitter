import React from "react";
import { TweetsByKeyword } from "./features/tweets-keyword/TweetsKeyword.container";
import { HashtagsByKeyword } from "./features/hashtags-keyword/HashtagsKeyword.container";
import { CreateTweet } from "./features/tweet/Tweet.container";

const moduleStyles = {
  marginBottom: "5rem"
};
const App = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <div style={moduleStyles}>
        <TweetsByKeyword />
      </div>

      <div style={moduleStyles}>
        <HashtagsByKeyword />
      </div>

      <div style={moduleStyles}>
        <CreateTweet />
      </div>
    </div>
  );
};

export default App;
