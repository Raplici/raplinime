import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api, titleOnly = true }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5 md:grid-cols-5 sm:grid-cols-3">
      {api.data?.map((anime, index) => {
        return (
          <Link
            href={`/anime/${anime.mal_id}`}
            key={index}
            className="cursor-pointer text-color-primary hover:text-Red-60 transition-all"
          >
            <Image
              src={anime.images.webp.large_image_url}
              alt={anime.images.jpg.large_image_url}
              width={350}
              height={350}
              className="object-cover aspect-square object-center rounded-xl hover:scale-102"
            />
            {titleOnly ? (
              <p className="font-bold text-sm leading-5 line-clamp-2 pt-2 md:text-xl md:leading-7 ">
                {anime.title}
              </p>
            ) : (
              <div className="text-sm leading-5 line-clamp-2 pt-2 md:text-xl md:leading-7">
                <div className="flex justify-between items-center text-xs text-Grey-60 md:text-base">
                  <p>{anime.type}</p>
                  <div className="flex items-center">
                    <Star size={14} className="mx-1" />
                    <p>{anime.score}</p>
                  </div>
                </div>
                <p className="font-bold">{anime.title}</p>
              </div>
            )}
            <div></div>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeList;
