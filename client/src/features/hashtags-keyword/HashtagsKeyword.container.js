import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  searchHashtags,
  getHashtags,
  isLoading,
  getError
} from "./hashtagsKeywordSlice";
import { Loader } from "../loader";
import { HashtagsList } from "./HashtagsKeywordList.component";
import { SearchForm } from "./HashtagsKeywordSearchForm.component";
import { Error } from "../error";

import styles from "./HashtagsKeyword.module.css";

export const HashtagsByKeyword = () => {
  const hashtags = useSelector(getHashtags);
  const error = useSelector(getError);
  const loading = useSelector(isLoading);

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <header>Popular Hashtags by Keyword</header>
      <section>
        <SearchForm
          onClickHandler={(request) => dispatch(searchHashtags(request))}
        />
      </section>
      <section>
        <Fragment>
          <h3>Hashtags</h3>
          {loading && <Loader />}
          {!loading && hashtags && <HashtagsList hashtags={hashtags} />}
          {!loading && error && <Error error={error} />}
        </Fragment>
      </section>
    </div>
  );
};
