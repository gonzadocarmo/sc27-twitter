interface ISearchTweetResponseItem {
  id_str: string;
  text: string;
  user: {
    screen_name: string;
    id_str: string;
  };
}

interface ICreateResponseModel {
  tweet: {
    text: string;
    url: string;
  };
  author: {
    screenName: string;
  };
}
export const createResponseModel = ({
  text,
  id_str,
  user: { screen_name: screenName, id_str: userId }
}: ISearchTweetResponseItem): ICreateResponseModel => ({
  tweet: {
    text,
    url: `https://twitter.com/${userId}/status/${id_str}`
  },
  author: {
    screenName
  }
});

export const filterResultsByLastHours = (
  results: Array<ISearchTweetResponseItem>,
  lastHours: number
): Array<ISearchTweetResponseItem> => {
  const NOW = new Date(Date.now());
  const LAST_HOURS_START = new Date(Date.now());
  LAST_HOURS_START.setHours(NOW.getHours() - lastHours);

  return results.filter((e: any) => new Date(e.created_at) >= LAST_HOURS_START);
};
