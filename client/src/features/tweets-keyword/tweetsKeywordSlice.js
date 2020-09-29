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
      state.error = undefined;
      state.items = [];
    }
  }
});

export const {
  searchInit,
  searchSuccess,
  searchFailure
} = tweetsKeywordSlice.actions;

export const searchTweets = ({ keyword, lastHours }) => (dispatch) => {
  dispatch(searchInit());
  return callAPI({ url: `/tweet?keyword=${keyword}&lastHours=${lastHours}` })
    .then((data) => {
      dispatch(searchSuccess(data));
      return Promise.resolve();
    })
    .catch((e) => dispatch(searchFailure(e)));
};

export const getTweets = (state) => state.tweets.items;
export const getError = (state) => state.tweets.error;
export const isLoading = (state) => state.tweets.loading;

export default tweetsKeywordSlice.reducer;
