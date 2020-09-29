import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import styles from "./Tweet.module.css";

export const SearchForm = ({ onClickHandler }) => {
  const messageEl = useRef(null);
  return (
    <form noValidate autoComplete="off" className={styles.form}>
      <TextField label="Message" ref={messageEl} />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onClickHandler({
            text: messageEl.current.childNodes[1].childNodes[0].value
          });
        }}
      >
        Post
      </Button>
    </form>
  );
};
