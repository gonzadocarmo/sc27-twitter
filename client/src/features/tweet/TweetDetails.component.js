import React from "react";
import styles from "./Tweet.module.css";

export const TweetDetails = ({ tweet }) => (
  <div className={styles.tweetRow}>
    <strong>Success!</strong> {tweet}
  </div>
);
