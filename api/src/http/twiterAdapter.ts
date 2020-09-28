import * as Twitter from "twitter";
require("dotenv").config();

let client: any;

export const getClient = () => {
  if (!client)
    client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
    });
  return client;
};
