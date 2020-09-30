This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

> Make sure the `api` module is running. Check it's own [README file](../api/README.md) for further instructions.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Notes

- The 3 components are listed on the same page/view.
- Form Validation has been implemented ONLY on the first component/section ("Tweets by Keyword") as an example.
- Unit tests have been added ONLY on the on the first component/section ("Tweets by Keyword") as an example.
- Unit tests for `"src/apiCall.js"` have not been added since they're the same as the ones added into the `"api"` module (check `api/src/http/index.test.ts` for reference)
