# API

## How to

### Start local server

1. Create an `".env"` under file at this same location containing the values for the following environment variables:
   `TWITTER_CONSUMER_KEY=placeholder TWITTER_CONSUMER_SECRET=placeholder TWITTER_ACCESS_TOKEN_KEY=placeholder TWITTER_ACCESS_TOKEN_SECRET=placeholder TWITTER_ACCESS_TOKEN_BEARER=placeholder TWITTER_API_URL=https://api.twitter.com/1.1 PORT=placeholder`

   > PORT -> port where local server will be listening. Defaults to 7777

2. Install dependencies by running the following command:

   ```
   yarn
   ```

3. Start server by runnning the following command:
   ```
   yarn start
   ```

### Run unit tests

```
yarn test
```

### Run unit test coverage

```
yarn run test:co
```
