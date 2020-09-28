import * as yup from "yup";
export const getTweetsListByCriteriaSchema = yup.object().shape({
  keyword: yup.string().required(),
  lastHours: yup.number().positive().required()
});
export const createTweetSchema = yup.object().shape({
  text: yup.string().required().max(150)
});
