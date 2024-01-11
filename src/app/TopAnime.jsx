"use client";

import useSWR from "swr";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TopAnime = () => {
  const { data: topAnime } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?sfw&limit=21`,
    fetcher,
    {
      onErrorRetry: (error, revalidate, { retryCount }) => {
        if (retryCount >= 10) return;

        if (error.status === 429) {
          console.log(error)
          setTimeout(() => revalidate({ retryCount }), 5000);
        }
      },
    }
  );

  return (
    <>
      {topAnime != undefined && (
        <section className="flex flex-col">
          <Header title="TOP ANIME" link="/populer" />

          <AnimeList api={topAnime} />
        </section>
      )}
    </>
  );
};

export default TopAnime;
