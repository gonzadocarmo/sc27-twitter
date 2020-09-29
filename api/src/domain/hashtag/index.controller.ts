import { callAPI } from "../../http";
import * as querystring from "querystring";
import { schema } from "./hashtag.schema";
import { createResponseModel } from "./utils";
interface IGetPopularHashtagsByCriteria {
  keyword: string;
}
export const getPopularHashtagsByCriteria = async (
  request: IGetPopularHashtagsByCriteria
) => {
  const isInputValid = await schema.isValid(request);
  if (!isInputValid) return Promise.reject({ code: "INPUT_VALIDATION" });

  const MAX_NUMBER_OF_TWEETS = 10;
  const queryParameters = {
    q: request.keyword,
    count: MAX_NUMBER_OF_TWEETS,
    result_type: "popular"
  };

  const url = `/search/tweets.json?${querystring.encode(queryParameters)}`;

  const results = await callAPI({ url });

  return createResponseModel(results);
};
