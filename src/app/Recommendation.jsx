"use client";

import useSWR from "swr";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { useEffect, useState } from "react";
import { reproduce } from "@/libs/api-libs";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Recommendation = () => {
  const { data: recommendation } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations/anime`,
    fetcher,
    {
      onErrorRetry: (error, revalidate, { retryCount }) => {
        if (retryCount >= 10) return;

        if (error.status === 429) {
          setTimeout(() => revalidate({ retryCount }), 1000);
        }
      },
    }
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    if (recommendation != undefined) {
      let entry = recommendation.data.flatMap((item) => item["entry"]);
      entry = reproduce(entry, 7);
      setData(entry);
    }
  }, [recommendation]);

  return (
    <>
      {recommendation != undefined && (
        <section className="flex flex-col">
          <Header title="RECOMMENDATION" />

          <AnimeList api={data} />
        </section>
      )}
    </>
  );
};

export default Recommendation;
