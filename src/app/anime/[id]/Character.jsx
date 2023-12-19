"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { getAnimeResponse } from "@/libs/api-libs";
import { XCircle } from "@phosphor-icons/react";
import Header from "@/components/AnimeList/Header";

const Character = ({ data }) => {
  const [characterId, setCharacterId] = useState(null);
  const [isCharacterDetailsVisible, setCharacterDetailsVisible] =
    useState(false);
  const [details, setDetails] = useState({
    images: {
      webp: {
        image_url:
          "https://cdn.myanimelist.net/images/characters/7/525105.webp",
      },
    },
  });

  const character = useMemo(
    () => data.filter((char) => char.role == "Main"),
    [data]
  );

  useEffect(() => {
    if (characterId) {
      getAnimeResponse(`characters/${characterId}`).then((data) => {
        setDetails(data.data);
        setTimeout(() => setCharacterDetailsVisible(true), 200);
      });
    } else {
      //close modal
      setCharacterDetailsVisible(false);
    }
  }, [characterId]);

  function decodedText(text) {
    return text?.replaceAll(/&[a-zA-Z0-9;]+;/g, "");
  }

  return (
    <>
      {character.length > 0 && (
        <section>
          <Header title="MAIN CHARACTER" />

          <div className="flex flex-wrap gap-3 text-Absolute-White">
            {character.map((char, index) => {
              return (
                <section
                  key={index}
                  onClick={() => setCharacterId(char.character.mal_id)}
                  className="flex flex-row w-full md:w-80 cursor-pointer bg-Black-10 rounded-lg text-Absolute-White items-center transition hover:bg-gradient-to-r from-transparent to-Red-60"
                >
                  <div className="w-auto h-auto">
                    <Image
                      src={char.character.images.webp.image_url}
                      alt={char.character.images.webp.image_url}
                      width={64}
                      height={100}
                      className="object-cover object-center rounded-l-lg aspect-[3/4] w-auto h-auto"
                    />
                  </div>

                  <section className="w-full px-5">
                    <p className="font-medium md:text-lg line-clamp-1">
                      {char.character.name}
                    </p>
                  </section>
                </section>
              );
            })}

            {/* modal details */}
            {/* backdrop */}
            <div
              onClick={() => setCharacterId(null)}
              className={`fixed z-10 inset-0 flex justify-center items-center transition-colors ${
                isCharacterDetailsVisible
                  ? "bg-Absolute-Black bg-opacity-75 visible"
                  : "invisible"
              }`}
            >
              {/* modal */}
              <section
                onClick={(e) => e.stopPropagation()}
                className={`overscroll-contain bg-Black-10 max-w-[90%] md:max-w-[80%] max-h-[86%] overflow-auto rounded-xl shadow p-5 transition-all duration-500 ${
                  isCharacterDetailsVisible
                    ? "scale-100 opacity-100"
                    : "scale-50 opacity-0"
                }`}
              >
                {/* x button */}

                <button
                  onClick={() => setCharacterId(null)}
                  className="absolute top-3 right-3 text-Absolute-White"
                >
                  <XCircle size={20} weight="fill" />
                </button>

                {/* character details */}

                <article className="flex flex-col gap-7 rounded-lg md:flex-row ">
                  <div className="w-auto h-auto">
                    <Image
                      src={details.images?.webp.image_url}
                      alt={details.images?.webp.image_url}
                      width={384}
                      height={542}
                      className="object-cover object-center rounded-lg aspect-[3/4] w-full md:w-80"
                    />
                  </div>

                  <section className="flex flex-col gap-1.5 w-full text-base leading-7">
                    <p className="font-bold text-center text-2xl md:text-start md:text-4xl">
                      {details?.name}
                    </p>

                    <hr className="w-full border-t border-Absolute-White" />

                    <p className="whitespace-pre-line">
                      {decodedText(details?.about)}
                    </p>
                  </section>
                </article>
              </section>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Character;
