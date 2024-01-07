"use client";

import { useState } from "react";

import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import Pagination from "@/components/Utilities/Pagination";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ButtonItem = ({ value, active, onClick }) => {
  return (
    <button
      className={`py-1 px-5 rounded-lg md:rounded-3xl text-center ${
        active
          ? "bg-Absolute-White text-Black-8"
          : "border-2 border-Black-12 text-Absolute-White transition-colors hover:bg-Black-15 hover:border-Black-15"
      }`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};
 
const Page = () => {
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState("All");
  const [typeQuery, setTypeQuery] = useState("");

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?page=${page}${typeQuery}`,
    fetcher
  );

  const handleButtonType = (value) => {
    setActiveItem(value);

    switch (value) {
      case "TV":
        setTypeQuery("&type=tv");
        setPage(1);
        break;

      case "Movie":
        setTypeQuery("&type=movie");
        setPage(1);
        break;

      case "OVA":
        setTypeQuery("&type=ova");
        setPage(1);
        break;

      case "Special":
        setTypeQuery("&type=special");
        setPage(1);
        break;

      case "ONA":
        setTypeQuery("&type=ona");
        setPage(1);
        break;

      case "Music":
        setTypeQuery("&type=music");
        setPage(1);
        break;

      default:
        setTypeQuery("");
        setPage(1);
    }
  };

  const items = ["All", "TV", "Movie", "OVA", "Special", "ONA", "Music"];

  return (
    <section className="container">
      <div className="flex flex-col md:items-center md:flex-row md:gap-10">
        <Header title={`TOP ANIME #${page}`} />
        <div className="flex gap-3 overflow-x-auto mb-3 items-center ">
          {items.map((item) => (
            <ButtonItem
              key={item}
              value={item}
              active={activeItem === item}
              onClick={handleButtonType}
            />
          ))}
        </div>
      </div>

      <AnimeList horizontal api={data} score type />

      <Pagination
        page={page}
        lastPage={data?.pagination?.last_visible_page}
        setPage={setPage}
      />
    </section>
  );
};

export default Page;
