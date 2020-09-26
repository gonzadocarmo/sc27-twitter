import * as yup from "yup";
import { callAPI } from "../../http";
import * as querystring from "querystring";

const schema = yup.object().shape({
  keyword: yup.string().required()
});

interface IGetPopularHashtagsByCriteria {
  keyword: string;
}
export const getPopularHashtagsByCriteria = async (
  request: IGetPopularHashtagsByCriteria
) => {
  const isInputValid = await schema.isValid(request);
  if (!isInputValid) return Promise.reject({ code: "INPUT_VALIDATION" });

  const url = `/search/tweets.json?${querystring.encode({
    q: request.keyword,
    count: 10,
    result_type: "popular"
  })}`;
  const results = await callAPI({ url });

  // TODO: move logic to process response into another file
  let hashtags: Array<String> = [];
  results.statuses.forEach((result: any) => {
    hashtags.concat(result.entities.hashtags);
  });
  return [...new Set(hashtags)];
};
