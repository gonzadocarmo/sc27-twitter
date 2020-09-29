import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  searchTweets,
  getTweets,
  isLoading,
  getError
} from "./tweetsKeywordSlice";
import { Loader } from "../loader";
import { TweetsList } from "./TweetsKeywordList.component";
import { SearchForm } from "./TweetsKeywordSearchForm.component";
import { Error } from "../error";

import styles from "./TweetsKeyword.module.css";

export const TweetsByKeyword = () => {
  const tweets = useSelector(getTweets);
  const error = useSelector(getError);
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
          {!loading && error && <Error error={error} />}
        </Fragment>
      </section>
    </div>
  );
};
