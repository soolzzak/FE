export const convertUrltoVideoId = (url: string) => {
  const params = new URLSearchParams(new URL(url).search);
  return params.get('v');
};
