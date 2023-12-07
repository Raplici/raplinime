import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api, horizontal }) => {
  const cardVertical = (
    <div className="grid gap-x-3 gap-y-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {api.data?.map((anime, index) => {
        return (
          <Link
            href={`/anime/${anime.mal_id}`}
            key={index}
            className="flex flex-col gap-2 cursor-pointer text-color-primary transition-all hover:text-Red-60"
          >
            <Image
              src={anime.images.webp.large_image_url}
              alt={anime.images.jpg.large_image_url}
              width={256}
              height={256}
              className="object-cover object-center rounded-lg aspect-[3/4]"
            />

            <div className="flex flex-col gap-1">
              {anime != null && (
                <div className="flex gap-3 md:justify-between items-center text-xs text-Grey-60">
                  {anime.score && (
                    <div className="flex items-center">
                      <Star size={14} className="mr-1" />

                      <p>{anime.score}</p>
                    </div>
                  )}

                  {anime.type && <p>{anime.type}</p>}
                </div>
              )}

              <p className="font-medium text-base leading-5 md:text-lg md:leading-6 line-clamp-2">
                {anime.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
  const cardHorizontal = (
    <div className="relative h-max w-full xl:w-80 shrink-0 flex flex-col gap-3">
      {api.data?.map((anime, index) => {
        return (
          <Link
            key={index}
            href={`/anime/${anime.mal_id}`}
            className="flex flex-row cursor-pointer bg-Black-10 rounded-lg text-Absolute-White items-center transition hover:bg-gradient-to-r from-transparent to-Red-60"
          >
            <Image
              src={anime.images.webp.large_image_url}
              alt={anime.images.jpg.large_image_url}
              width={64}
              height={100}
              className="object-cover object-center rounded-l-lg aspect-[3/4]"
            />

            <section className="flex flex-col px-5 w-full">
              {anime.rating && (
                <div className="flex gap-3 text-sm text-Grey-60">
                  <p>{anime.rating}</p>
                </div>
              )}

              <p className="font-medium md:text-lg line-clamp-1">{anime.title}</p>
            </section>
          </Link>
        );
      })}
    </div>
  );
  return <>{horizontal ? cardHorizontal : cardVertical}</>;
};

export default AnimeList;
