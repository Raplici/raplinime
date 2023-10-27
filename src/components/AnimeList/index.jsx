import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5 sm:grid-cols-3">
      {api.data?.map((anime, index) => {
        return (
          <Link
            href={`/anime/${anime.mal_id}`}
            key={index}
            className="cursor-pointer text-color-primary hover:text-Red-60 transition-all"
          >
            <Image
              src={anime.images.webp.large_image_url}
              alt="..."
              width={350}
              height={350}
              className="object-cover aspect-square object-center"
            />
            <h3 className="font-bold text-lg leading-6 md:text-xl md:leading-7 py-4 ">{anime.title}</h3>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeList;
