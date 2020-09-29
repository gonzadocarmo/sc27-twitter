import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import styles from "./TweetsKeyword.module.css";

export const SearchForm = ({ onClickHandler }) => {
  const keyboardEl = useRef(null);
  const hoursEl = useRef(null);
  return (
    <form noValidate autoComplete="off" className={styles.form}>
      <TextField label="Keyword" ref={keyboardEl} />
      <TextField label="hours ago" type="number" ref={hoursEl} />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onClickHandler({
            keyword: keyboardEl.current.childNodes[1].childNodes[0].value,
            lastHours: hoursEl.current.childNodes[1].childNodes[0].value
          });
        }}
      >
        Search
      </Button>
    </form>
  );
};
