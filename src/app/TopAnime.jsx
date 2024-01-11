"use client";

import useSWR from "swr";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TopAnime = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?sfw&limit=21`,
    fetcher
  );

  return (
    <>
      {data != undefined && (
        <section className="flex flex-col">
          <Header title="TOP ANIME" link="/populer" />

          <AnimeList api={data} />
        </section>
      )}
    </>
  );
};

export default TopAnime;
