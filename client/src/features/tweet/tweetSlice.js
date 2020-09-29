import { createSlice } from "@reduxjs/toolkit";
import { callAPI } from "../../apiCall";

export const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    loading: false
  },
  reducers: {
    createFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.item = undefined;
    },
    createSuccess: (state, action) => {
      state.loading = false;
      state.item = action.payload;
      state.error = undefined;
    },
    createInit: (state) => {
      state.loading = true;
    }
  }
});

const { createInit, createSuccess, createFailure } = tweetSlice.actions;

export const createTweet = ({ text }) => (dispatch) => {
  dispatch(createInit());
  callAPI({ url: "/tweet", method: "POST", data: { text } })
    .then((data) => {
      dispatch(createSuccess(data));
    })
    .catch((e) => dispatch(createFailure(e)));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getTweet = (state) => state.tweet.item;
export const isLoading = (state) => state.tweet.loading;

export default tweetSlice.reducer;
