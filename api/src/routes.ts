const router = require("express").Router();
import { getPopularHashtagsByCriteria } from "./domain/hashtag/index.controller";
import {
  getTweetsListByCriteria,
  createTweet
} from "./domain/tweet/index.controller";

// Retrieve a listing (max 10) tweets that include a keyword in the last n hours
// a. Inputs: keyword, number of hours
// b. Outputs: a list of objects containing:
// i. Text of tweet
// ii. URL of the tweet,
// iii. The screen name of the author
router.get("/tweet", async (req: any, res: any) => {
  try {
    const { keyword, lastHours } = req.query;
    const results = await getTweetsListByCriteria({ keyword, lastHours });
    return res.send(results);
  } catch (error) {
    return res.send(error);
  }
});

// Retrieve a list of hashtags used in the top 10 most popular tweets on twitter
// containing a keyword. Hint: use the result_type=popular
// a. Inputs: keyword
// b. Outputs: A list of unique hashtags
router.get("/hashtag", async (req: any, res: any) => {
  try {
    const { keyword } = req.query;
    const results = await getPopularHashtagsByCriteria({ keyword });
    return res.send(results);
  } catch (error) {
    return res.send(error);
  }
});

// Create a tweet on the 37_developers account. Note: for this step you are not
// required to implement 3-legged OAuth. This step has been done beforehand and the
// 37_developers account has already authorized the Twitter app. The Required
// authentication parameters have been provided below.
// a. Inputs: text of tweet (max 150 characters)
// b. Outputs: The tweet should be displayed on the 37_developers timeline, the
// response from the API should contain only the id of the tweet.
router.post("/tweet", async (req: any, res: any) => {
  try {
    await createTweet({ text: req.body });
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
