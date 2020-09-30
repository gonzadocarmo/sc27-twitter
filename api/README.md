# API

## How to

### Start local server

1. Create an `".env"` file at this same location containing the values for the following environment variables:

   ```
   TWITTER_CONSUMER_KEY=placeholder
   TWITTER_CONSUMER_SECRET=placeholder
   TWITTER_ACCESS_TOKEN_KEY=placeholder
   TWITTER_ACCESS_TOKEN_SECRET=placeholder
   TWITTER_ACCESS_TOKEN_BEARER=placeholder
   TWITTER_API_URL=https://api.twitter.com/1.1
   PORT=placeholder
   ```

   > PORT -> port where local server will be listening. Defaults to 7777. In case this value is changed, don't forget to update this same value on the `"client"` [side](../client/src/apiCall.js)

   > For further reference on `".env"` file, click [here](https://www.npmjs.com/package/dotenv)

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

### Swagger Documentaton

- Documentation is generated on the fly every time the server is started.
- It can be viewed by doing the following:

1. Start server

   `yarn start`

2. Open a browser and navigate to: [http://localhost:7777/swagger/](http://localhost:7777/swagger/)
