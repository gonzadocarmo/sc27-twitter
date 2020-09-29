import React from "react";
import styles from "./HashtagsKeyword.module.css";

export const HashtagsList = ({ hashtags }) =>
  hashtags.length > 0
    ? hashtags.map((hashtag, idx) => (
        <div key={idx} className={styles.tweetRow}>
          #{hashtag}
        </div>
      ))
    : "No hashtags found yet!";
