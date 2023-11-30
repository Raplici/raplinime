"use client";

import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Group from "@/components/Group";

const Character = ({ id }) => {
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sliceCount, setSliceCount] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnimeResponse(`anime/${id}/characters`);
      setCharacters(data);
    };

    fetchData();

    const handleWindowSizeChange = () => {
      if (window.innerWidth >= 1280) {
        setSliceCount(8);
      } else if (window.innerWidth >= 768) {
        setSliceCount(6);
      } else {
        setSliceCount(4);
      }
    };

    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [id]);

  const handlerOnClick = () => {
    setShowMore(!showMore);
  };

  return (
    <Group className="bg-Black-10 gap-2.5 md:gap-3.5">
      <div className="flex justify-between items-center">
        <p className="text-Grey-60">Characters</p>
        <button
          onClick={handlerOnClick}
          className=" text-Absolute-White p-1.5 border border-Black-15 bg-Black-8 rounded-full md:p-3.5"
        >
          {showMore == false ? <CaretDown size={18} /> : <CaretUp size={18} />}
        </button>
      </div>

      {showMore == false ? (
        <div className="flex gap-5">
          {characters.data?.slice(0, sliceCount).map((char, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <Image
                  src={char.character.images.webp.image_url}
                  alt={char.character.images.jpg.image_url}
                  width={350}
                  height={350}
                  className="object-cover aspect-square object-center rounded-xl"
                />
                <div>
                  <p className="text-xs text-Grey-60 md:text-base">
                    {char.role}
                  </p>
                  <p className="text-xs md:text-base">{char.character.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-5">
          {characters.data?.map((char, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <Image
                  src={char.character.images.webp.image_url}
                  alt={char.character.images.jpg.image_url}
                  width={350}
                  height={350}
                  className="object-cover aspect-square object-center rounded-xl"
                />
                <div>
                  <p className="text-xs text-Grey-60 md:text-base">
                    {char.role}
                  </p>
                  <p className="text-xs md:text-base">{char.character.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Group>
  );
};

export default Character;
