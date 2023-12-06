"use client";

import { useState, useEffect } from "react";
import { getAnimeResponse } from "@/libs/api-libs";
import Link from "next/link";

import Image from "next/image";
import imageFrieren from "@public/images/Frieren.jpg";
import imageJijitsu from "@public/images/JJK.png";
import imageYourName from "@public/images/your_name.png";
import imageReZero from "@public/images/ReZero.png";
import {
  CaretRight,
  CaretLeft,
  Star,
  BookmarkSimple,
  Circle,
} from "@phosphor-icons/react";

const Banner = () => {
  const slides = [
    {
      id: 52991,
      title: "SOUSOU NO FRIEREN",
      url: imageFrieren.src,
      synopsis:
        "After defeating the Demon King, an elf named Frieren embarks on a journey to say goodbye to her human companions, who are aging at a much faster rate than she is. Along the way, she learns more about the world and the meaning of life.",
    },
    {
      id: 51009,
      title: "JUJUTSU KAISEN (SEASON 2)",
      url: imageJijitsu.src,
      synopsis:
        "In the second season of Jujutsu Kaisen, Yuji Itadori and his friends face off against Suguru Geto and his followers in the Shibuya Incident, a battle that threatens to tear apart the world of jujutsu.",
    },
    {
      id: 32281,
      title: "KIMI NO NA WA",
      url: imageYourName.src,
      synopsis:
        "Mitsuha Miyamizu, a high school girl in a rural town, and Taki Tachibana, a high school boy in Tokyo, wake up in each other's bodies one day. They try to find each other and learn more about each other's lives.",
    },
    {
      id: 31240,
      title: "RE:ZERO KARA HAJIMERU ISEKAI SEIKATSU",
      url: imageReZero.src,
      synopsis:
        'Subaru Natsuki is a NEET who is suddenly summoned to a fantasy-like world where he has the ability to "return with death", which allows him to rewind time to a previous point if he dies. He uses this power to try to save his friends and change the course of events.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animeData, setAnimeData] = useState([]);
  let id = slides[currentIndex].id;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnimeResponse(`anime/${id}`);
      setAnimeData(data.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="relative flex mb-20">
      <Image
        src={`${slides[currentIndex].url}`}
        alt=""
        loading="eager"
        width={1980}
        height={50}
        className="object-cover h-[360px] rounded-t-2xl md:h-[680px] "
      />

      <button
        onClick={prevSlide}
        className="absolute z-30 left-1 top-1/3 md:top-1/2 text-Absolute-White p-1.5 bg-Black-10 border border-Black-12 rounded-lg hover:bg-Absolute-White hover:border-Absolute-White hover:text-Black-8 transition md:p-3 md:left-5"
      >
        <CaretLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute z-30 right-1 top-1/3 md:top-1/2 text-xs text-Absolute-White p-1.5 bg-Black-10 border border-Black-12 rounded-lg hover:bg-Absolute-White hover:border-Absolute-White  hover:text-Black-8 transition md:p-3 md:right-5"
      >
        <CaretRight size={20} />
      </button>

      <section className="absolute inset-x-0 bottom-0 z-20 text-Absolute-White ">
        <div className="flex flex-col items-start text-start w-full gap-2.5 px-2 pb-5 lg:w-2/3 md:p-20 md:gap-5">
          <div className="flex flex-col gap-1 md:gap-2">
            <p className="text-lg font-bold md:text-3xl">{`${slides[currentIndex].title}`}</p>

            <section className="flex flex-wrap gap-2 text-xs justify-start md:text-sm">
              {animeData?.score && (
                <div className="flex items-center border border-Absolute-White rounded-3xl px-2 py-1">
                  <Star size={14} className="mr-1" />
                  <p>{animeData?.score}</p>
                </div>
              )}

              {animeData?.rating && (
                <div className="flex border w-fit border-Absolute-White rounded-3xl px-2 py-1 text-xs text-center items-center">
                  {animeData.rating == "G - All Ages" ? (
                    <p>G</p>
                  ) : animeData.rating == "PG - Children" ? (
                    <p>PG</p>
                  ) : animeData.rating == "PG-13 - Teens 13 or older" ? (
                    <p>PG-13</p>
                  ) : animeData.rating == "R - 17+ (violence & profanity)" ? (
                    <p>R17+</p>
                  ) : animeData.rating == "R+ - Mild Nudity" ? (
                    <p>R+</p>
                  ) : animeData.rating == "Rx - Hentai" ? (
                    <p>Rx</p>
                  ) : null}
                </div>
              )}

              {animeData?.genres && animeData.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {animeData.genres.map((genres, index) => {
                    return (
                      <p
                        key={index}
                        className="flex border border-Absolute-White rounded-3xl px-2 py-1"
                      >
                        {genres.name}
                      </p>
                    );
                  })}
                </div>
              )}
            </section>

            <p className="hidden text-sm leading-4 lg:contents">{`${slides[currentIndex].synopsis}`}</p>
          </div>

          <div className=" flex flex-wrap gap-3 md:gap-5">
            <Link
              href={`/anime/${id}`}
              className="rounded-lg border border-Absolute-White leading-5 md:leading-7 text-sm md:text-lg md:font-medium text-Absolute-White px-2 md:px-6 py-1 md:py-2.5 hover:bg-Absolute-White hover:text-Black-8 transition-all "
            >
              Read more
            </Link>

            <Link
              href="#"
              className="flex flex-nowrap items-center gap-1 rounded-lg leading-5 md:leading-7 text-sm md:text-lg md:font-medium text-Absolute-White  px-2 md:px-6 py-1 md:py-2.5 hover:bg-Absolute-White hover:text-Black-8 transition-all "
            >
              <BookmarkSimple size={20} />
              Add to Collections
            </Link>
          </div>
        </div>
      </section>

      <div className="absolute flex justify-center inset-x-0 top-3 md:top-auto md:bottom-10  z-20 gap-2">
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="cursor-pointer"
          >
            {index === currentIndex ? (
              <div className="text-Absolute-White">
                <Circle size={12} weight="fill" />
              </div>
            ) : (
              <div className="text-Grey-60">
                <Circle size={12} weight="fill" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 -bottom-2 z-10 h-full bg-gradient-to-b from-transparent to-Black-8" />
    </div>
  );
};

export default Banner;
