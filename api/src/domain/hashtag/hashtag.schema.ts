import * as yup from "yup";

export const schema = yup.object().shape({
  keyword: yup.string().required()
});
