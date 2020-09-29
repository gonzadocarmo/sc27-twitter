import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchHashtags, getHashtags, isLoading } from "./hashtagsKeywordSlice";
import { Loader } from "../loader";
import { HashtagsList } from "./HashtagsKeywordList.component";
import { SearchForm } from "./HashtagsKeywordSearchForm.component";

import styles from "./HashtagsKeyword.module.css";

export const HashtagsByKeyword = () => {
  const hashtags = useSelector(getHashtags);
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
          {!loading && <HashtagsList hashtags={hashtags} />}
        </Fragment>
      </section>
    </div>
  );
};
