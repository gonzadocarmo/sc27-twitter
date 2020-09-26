const router = require("express").Router();

// Retrieve a listing (max 10) tweets that include a keyword in the last n hours
// a. Inputs: keyword, number of hours
// b. Outputs: a list of objects containing:
// i. Text of tweet
// ii. URL of the tweet,
// iii. The screen name of the author
router.use("/tweet", (req: any, res: any) => res.send("list of tweets"));

// Retrieve a list of hashtags used in the top 10 most popular tweets on twitter
// containing a keyword. Hint: use the result_type=popular
// a. Inputs: keyword
// b. Outputs: A list of unique hashtags
router.use("/hashtag", (req: any, res: any) => res.send("list of hashtags"));

// Create a tweet on the 37_developers account. Note: for this step you are not
// required to implement 3-legged OAuth. This step has been done beforehand and the
// 37_developers account has already authorized the Twitter app. The Required
// authentication parameters have been provided below.
// a. Inputs: text of tweet (max 150 characters)
// b. Outputs: The tweet should be displayed on the 37_developers timeline, the
// response from the API should contain only the id of the tweet.
router.use("/tweet", (req: any, res: any) => res.send("create a tweet"));

module.exports = router;
