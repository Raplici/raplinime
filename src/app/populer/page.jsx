"use client";

import AnimeList from "@/components/AnimeList";
import Group from "@/components/Group";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";


const Page = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const populerAnime = await getAnimeResponse("top/anime",`page=${page}`)
    setData(populerAnime);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <section className="container">
      <HeaderMenu title={`ANIME TERPOPULER #${page}`} />
      <Group >
      <AnimeList api={data} />
      </Group>
      <Pagination
        page={page}
        lastPage={data.pagination?.last_visible_page}
        setPage={setPage}
      />
    </section>
  );
};

export default Page;
