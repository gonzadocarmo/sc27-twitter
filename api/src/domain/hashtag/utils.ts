export const createResponseModel = (results: any) => {
  if (results.length === 0) return [];

  const allHashtagsFromElements: Array<String> = results.statuses
    .filter((el: any) => el.entities.hashtags.length > 0)
    .map((el: any) => el.entities.hashtags)
    .reduce(
      (acc: Array<String>, hashtags: Array<object>) =>
        acc.concat(hashtags.map((e: any) => e.text)),
      []
    );
  return [...new Set(allHashtagsFromElements)];
};
