import { Router } from "express";
import { getPopularHashtagsByCriteria } from "./domain/hashtag/index.controller";
import {
  getTweetsListByCriteria,
  createTweet
} from "./domain/tweet/index.controller";

const router = Router();

/**
 * @swagger
 *
 * /tweet:
 *   get:
 *     description: Retrieve a listing (max 10) tweets that include a keyword in the last n hours
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: keyword
 *         description: Keyword contained in tweets
 *         in: query
 *         required: true
 *         type: string
 *       - name: lastHours
 *         description: Number of hours within the tweets would be retrieved
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: list of tweets
 *       400:
 *         description: when request is not valid
 *       500:
 *         description: when error from service
 */
router.get("/tweet", async (req: any, res: any) => {
  try {
    const { keyword, lastHours } = req.query;
    const results = await getTweetsListByCriteria({ keyword, lastHours });
    return res.send(results);
  } catch (error) {
    if (error === "INPUT_VALIDATION") return res.sendStatus(400);
    res.sendStatus(500);
  }
});

/**
 * @swagger
 *
 * /hashtag:
 *   get:
 *     description: Retrieve a list of unique hashtags used in the top 10 most popular tweets on twitter containing a specific keyword
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: keyword
 *         description: Keyword contained in tweets
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: list of unique hashtags
 *       400:
 *         description: when request is not valid
 *       500:
 *         description: when error from service
 */
router.get("/hashtag", async (req: any, res: any) => {
  try {
    const { keyword } = req.query;
    const results = await getPopularHashtagsByCriteria({ keyword });
    return res.send(results);
  } catch (error) {
    if (error.code === "INPUT_VALIDATION") return res.sendStatus(400);
    res.sendStatus(500);
  }
});

/**
 * @swagger
 *
 * /tweet:
 *   post:
 *     description: Create a tweet on the 37_developers account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: keyword
 *         description: text of tweet (max 150 characters)
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: tweet ID
 *       400:
 *         description: when request is not valid
 *       500:
 *         description: when error from service
 */
router.post("/tweet", async (req: any, res: any) => {
  try {
    const id = await createTweet({ text: req.body.text });
    return res.json(id);
  } catch (error) {
    if (error.code === "INPUT_VALIDATION") return res.sendStatus(400);
    res.sendStatus(500);
  }
});

module.exports = router;
