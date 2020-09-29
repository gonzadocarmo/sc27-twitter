import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import styles from "./HashtagsKeyword.module.css";

export const SearchForm = ({ onClickHandler }) => {
  const keywordEl = useRef(null);
  return (
    <form noValidate autoComplete="off" className={styles.form}>
      <TextField label="Keyword" ref={keywordEl} />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onClickHandler({
            keyword: keywordEl.current.childNodes[1].childNodes[0].value
          });
        }}
      >
        Search
      </Button>
    </form>
  );
};
