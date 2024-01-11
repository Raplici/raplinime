"use client";

import useSWR from "swr";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Schedules = ({ day }) => {
  const { data: schedules } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedules?filter=${day}&sfw=true`,
    fetcher
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    if (schedules != undefined) {
      setData(schedules);
    }
  }, [schedules]);

  if (schedules?.status == 429) {
    setTimeout(() => {
      const { data: retry } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedules?filter=${day}&sfw=true`,
        fetcher
      );

      if (retry != undefined) {
        setData(retry);
      }
    }, 3000);
  }

  return (
    <>
      {schedules != undefined && (
        <section className="flex flex-col">
          <Header title="AIRING TODAY" />

          <AnimeList horizontal api={data} className="xl:w-80" />
        </section>
      )}
    </>
  );
};

export default Schedules;
