import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";

import { Formik, Form, Field } from "formik";
import styles from "./TweetsKeyword.module.css";

import * as yup from "yup";

export const searchFormSchema = yup.object().shape({
  keyword: yup.string().required(),
  lastHours: yup.number().required().positive()
});

export const SearchForm = ({ onClickHandler }) => {
  const initialValues = {
    lastHours: "",
    keyword: ""
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={searchFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        onClickHandler(
          {
            keyword: values.keyword,
            lastHours: values.lastHours
          },
          setSubmitting
        );
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form className={styles.form}>
            <div>
              <Field component={TextField} label="Keyword" name="keyword" />
            </div>

            <div>
              <Field
                component={TextField}
                label="hours ago"
                type="number"
                name="lastHours"
              />
            </div>

            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                Search
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                type="reset"
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
