import * as yup from "yup";
import { callAPI } from "../../http";
import * as querystring from "querystring";

const getTweetsListByCriteriaSchema = yup.object().shape({
  keyword: yup.string().required(),
  lastHours: yup.number().positive().required()
});
const createTweetSchema = yup.object().shape({
  text: yup.string().required().max(150)
});
interface IGetTweetsListByCriteria {
  keyword: string;
  lastHours: number;
}

interface ICreateTweet {
  text: string;
}
export const getTweetsListByCriteria = async (
  request: IGetTweetsListByCriteria
) => {
  const isValidInput = await getTweetsListByCriteriaSchema.isValid(request);
  if (!isValidInput) return Promise.reject({ code: "INPUT_VALIDATION" });

  const url = `/search/tweets.json?${querystring.encode({
    q: request.keyword,
    count: 10,
    result_type: "recent"
  })}`;
  const results = await callAPI({ url });

  // TODO: move logic to process response into another file
  return results.statuses.map((result: any) => ({
    tweet: {
      text: result.text,
      url: result.entities.urls[0]?.url
    },
    author: {
      screenName: result.user.screen_name
    }
  }));
};
export const createTweet = async (request: ICreateTweet) => {
  const isValidInput = await createTweetSchema.isValid(request);
  if (!isValidInput) return Promise.reject({ code: "INPUT_VALIDATION" });
};
