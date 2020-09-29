import { createSlice } from "@reduxjs/toolkit";
import { callAPI } from "../../apiCall";

export const tweetsKeywordSlice = createSlice({
  name: "tweetsKeyword",
  initialState: {
    items: [],
    loading: false
  },
  reducers: {
    searchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.items = [];
    },
    searchSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = undefined;
    },
    searchInit: (state) => {
      state.loading = true;
    }
  }
});

const { searchInit, searchSuccess, searchFailure } = tweetsKeywordSlice.actions;

export const searchTweets = ({ keyword, lastHours }) => (dispatch) => {
  dispatch(searchInit());
  callAPI({ url: `/tweet?keyword=${keyword}&lastHours=${lastHours}` })
    .then((data) => {
      dispatch(searchSuccess(data));
    })
    .catch((e) => dispatch(searchFailure(e)));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getTweets = (state) => state.tweets.items;
export const isLoading = (state) => state.tweets.loading;

export default tweetsKeywordSlice.reducer;
