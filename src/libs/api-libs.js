export const getAnimeResponse = async (resource, query) => {
  let response;
  let anime;
  let attempt = 0;

  while (true) {
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
      );

      if (response.status === 404) {
        anime = await response.json();
        break; // Handle 404 here if needed
      }

      if (response.ok) {
        anime = await response.json();
        break; // Fetch successful, exit the loop
      } else if (response.status === 429) {
        const delay = attempt < 5 ? attempt * 1000 : attempt * 5000; // Delay increases by 1000 or 5000

        console.warn(`API rate limit reached. Retrying in ${delay}ms...`);

        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++; // Increment attempt counter for backoff calculation
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
    }
  }

  return anime;
};

export const getNestedAnimeResponse = async (resource, objectProperty) => {
  const response = await getAnimeResponse(resource);
  const data = await response.data?.flatMap((item) => item[objectProperty]);
  return data;
};

export const reproduce = (data, gap) => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const response = {
    data: data.slice(first, last),
  };

  return response;
};
