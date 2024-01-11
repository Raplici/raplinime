"use client";

import useSWR from "swr";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Schedules = ({ day }) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedules?filter=${day}&sfw=true`,
    fetcher
  );

  return (
    <>
      {data != undefined && (
        <section className="flex flex-col">
          <Header title="AIRING TODAY" />

          <AnimeList horizontal api={data} className="xl:w-80" />
        </section>
      )}
    </>
  );
};

export default Schedules;
