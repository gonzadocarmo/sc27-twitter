import React from "react";
import Link from "@material-ui/core/Link";
import styles from "./TweetsKeyword.module.css";

export const TweetsList = ({ tweets }) =>
  tweets.length > 0
    ? tweets.map((tweet, idx) => (
        <div key={idx} className={styles.tweetRow}>
          <strong>@{tweet.author.screenName}</strong> {tweet.tweet.text} (
          <Link href={tweet.tweet.url} target="_blank">
            {tweet.tweet.url}
          </Link>
          )
        </div>
      ))
    : "No tweets found yet!";
