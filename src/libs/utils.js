export const fetcher = (url) => fetch(url).then((res) => res.json());

export function createQueryString(queries) {
  const params = new URLSearchParams(queries);
  return params.toString();
}

export function formatScore(score) {
  const formattedScore = parseFloat(score);

  if (isNaN(formattedScore)) {
    return score;
  }

  return formattedScore.toFixed(2);
}
