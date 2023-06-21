export const convertUrltoVideoId = (url: string) => {
  const urlObject = new URL(url);
  const searchParams = new URLSearchParams(urlObject.search);
  console.log(searchParams.get('v'));
  return searchParams.get('v');
};
