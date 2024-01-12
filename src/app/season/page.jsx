"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import Pagination from "@/components/Utilities/Pagination";

const fetcher = (url) => fetch(url).then((res) => res.json());

const typeQuery = ["", "TV", "Movie", "OVA", "Special", "ONA", "Music"];

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const params = new URLSearchParams(query);

  const selectedType = query.get("type") || "";
  const page = query.get("page") || 1;

  const [loading, setLoading] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const createQueryString = useCallback(
    (queries) => {
      const params = new URLSearchParams(queries);
      return params.toString();
    },
    [query]
  );

  const deleteQueryString = (query) => {
    params.set("page", 1);
    params.delete(query);
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  //fetch data
  const { data } = useSWR(
    selectedType === ""
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now?sfw&page=${page}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now?sfw&page=${page}&filter=${selectedType}`,
    fetcher
  );

  //loading skeleton
  useEffect(() => {
    if (data === undefined) {
      setLoading(true);
    } else {
      setLoading(false);

      if (data.data.length <= 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    }
  }, [data]);

  //validasi tipe dan halaman pada url
  useEffect(() => {
    if (!typeQuery.includes(selectedType)) {
      deleteQueryString("type");
    }

    if (parseInt(page) < 1) {
      params.set("page", 1);
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl);
    }

    if (parseInt(page) > data?.pagination?.last_visible_page) {
      params.set("page", data?.pagination?.last_visible_page);
      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl);
    }
  }, [data]);

  console.log(isEmpty);
  return (
    <section className="container">
      <div className="flex flex-col md:items-center md:flex-row md:gap-10">
        <Header title={`Seasonal Anime #${page}`} />
        <div className="flex gap-3 overflow-x-auto mb-3 items-center ">
          {typeQuery.map((type, index) => (
            <button
              onClick={() => {
                type === ""
                  ? deleteQueryString("type")
                  : router.push(
                      pathname +
                        "?" +
                        createQueryString({
                          page: 1,

                          type: `${type}`,
                        })
                    );
              }}
              key={index}
              className={`py-1 px-5 rounded-lg md:rounded-3xl text-center ${
                selectedType == type
                  ? "bg-Absolute-White text-Black-8"
                  : "border-2 border-Black-12 text-Absolute-White transition-colors hover:bg-Black-15 hover:border-Black-15"
              }`}
            >
              {type === "" ? "All" : type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        Array(25)
          .fill(0)
          .map((d, i) => (
            <section
              key={i}
              className="flex flex-row mb-3 animate-pulse bg-Black-10 rounded-lg items-center "
            >
              <div className="w-auto h-auto">
                <div className="w-14 h-16 md:w-16 md:h-20 bg-Black-20 rounded-l-lg" />
              </div>

              <section className="flex flex-col gap-3 px-5 w-full">
                <div className="flex gap-3">
                  <div className="w-10 h-3 bg-Black-20 rounded-3xl" />
                  <div className="w-10 h-3 bg-Black-20 rounded-3xl" />
                  <div className="w-10 h-3 bg-Black-20 rounded-3xl" />
                </div>

                <div className="w-44 sm:w-80 h-3 bg-Black-20 rounded-3xl" />
              </section>
            </section>
          ))
      ) : (
        <>
          {isEmpty ? (
            <div className="flex justify-center items-center h-40 text-Grey-60">
              <p className="flex justify-center items-center ">
                There are no anime of this type this season..
              </p>
            </div>
          ) : (
            <>
              <AnimeList horizontal api={data} score type />
              <Pagination
                page={page}
                lastPage={data?.pagination?.last_visible_page}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Page;
