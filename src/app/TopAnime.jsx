"use client";

import useSWR from "swr";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TopAnime = () => {
  const { data: topAnime } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?sfw&limit=21`,
    fetcher
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    if (topAnime != undefined) {
      setData(topAnime);
    }
  }, [topAnime]);

  if (topAnime?.status == 429) {
    setTimeout(() => {
      const { data: retry } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?sfw&limit=21`,
        fetcher
      );
      setData(retry);
    }, 1000);
  }

  return (
    <>
      {topAnime != undefined && (
        <section className="flex flex-col">
          <Header title="TOP ANIME" link="/populer" />

          <AnimeList api={data} />
        </section>
      )}
    </>
  );
};

export default TopAnime;
