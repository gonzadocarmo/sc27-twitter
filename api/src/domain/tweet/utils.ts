export const createResponseModel = (result: any) => ({
  tweet: {
    text: result.text,
    url: result.entities.urls[0]?.url
  },
  author: {
    screenName: result.user.screen_name
  }
});
