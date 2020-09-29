import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchTweets, getTweets, isLoading } from "./tweetsKeyboardSlice";
import { Loader } from "../loader";
import { TweetsList } from "./TweetsKeyboardList.component";
import { SearchForm } from "./TweetsKeyboardSearchForm.component";

import styles from "./TweetsKeyword.module.css";

export const TweetsByKeyword = () => {
  const tweets = useSelector(getTweets);
  const loading = useSelector(isLoading);

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <header>Tweets by Keyword</header>
      <section>
        <SearchForm
          onClickHandler={(request, setSubmitting) =>
            dispatch(searchTweets(request)).then((_) => setSubmitting(false))
          }
        />
      </section>
      <section>
        <Fragment>
          <h3>Tweets</h3>
          {loading && <Loader />}
          {!loading && <TweetsList tweets={tweets} />}
        </Fragment>
      </section>
    </div>
  );
};
