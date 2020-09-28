import { callAPI } from "../../http";
import * as querystring from "querystring";
import { getClient } from "../../http/twiterAdapter";
import {
  getTweetsListByCriteriaSchema,
  createTweetSchema
} from "./tweet.schema";
import { createResponseModel } from "./utils";

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

  return (results.statuses || []).map(createResponseModel);
};
export const createTweet = async (request: ICreateTweet) => {
  const isValidInput = await createTweetSchema.isValid(request);
  if (!isValidInput) return Promise.reject({ code: "INPUT_VALIDATION" });

  const client = getClient();
  try {
    const result = await client.post("statuses/update", {
      status: request.text
    });
    return result.id;
  } catch (error) {
    console.log({ error });
    return Promise.reject({ code: "CLIENT_ERROR" });
  }
};
