import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTweet, getTweet, isLoading, getError } from "./tweetSlice";
import { Loader } from "../loader";
import { TweetDetails } from "./TweetDetails.component";
import { SearchForm } from "./TweetCreateForm.component";
import { Error } from "../error";
import styles from "./Tweet.module.css";

export const CreateTweet = () => {
  const tweet = useSelector(getTweet);
  const error = useSelector(getError);
  const loading = useSelector(isLoading);

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <header>Post a Tweet</header>
      <section>
        <SearchForm
          onClickHandler={(request) => dispatch(createTweet(request))}
        />
      </section>
      <section>
        <Fragment>
          <h3>Result</h3>
          {loading && <Loader />}
          {!loading && tweet && <TweetDetails tweet={tweet} />}
          {!loading && error && <Error error={error} />}
        </Fragment>
      </section>
    </div>
  );
};
