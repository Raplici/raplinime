import { getAnimeResponse } from "@/app/libs/api-libs";
import Group from "@/components/Group";

const Information = async ({ id }) => {
  const anime = await getAnimeResponse(`anime/${id}`);

  return (
    <Group className="md:grid md:grid-cols-2 lg:flex lg:flex-col bg-Black-10 gap-2.5 md:gap-3.5">
      {anime.data?.type && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Type:</p>
          <p>{anime.data.type}</p>
        </div>
      )}

      {anime.data?.rating && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Rating:</p>
          <p>{anime.data.rating}</p>
        </div>
      )}

      {anime.data?.episodes && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Episode:</p>
          <p>{anime.data.episodes}</p>
        </div>
      )}

      {anime.data?.duration && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Duration:</p>
          <p>{anime.data.duration}</p>
        </div>
      )}

      {anime.data?.genres && anime.data.genres.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Genres:</p>
          {anime.data.genres.map((genres, index) => {
            const isLast = index === anime.data.genres.length - 1;
            return (
              <p key={index} className="whitespace-nowrap">
                {genres.name}
                {!isLast && ","}
              </p>
            );
          })}
        </div>
      )}

      {anime.data?.status && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Status:</p>
          {anime.data.status}
        </div>
      )}

      {anime.data?.aired.string && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Aired:</p>
          <p>{anime.data.aired.string}</p>
        </div>
      )}

      {anime.data?.season && anime.data.aired.prop.from.year && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Premiered:</p>
          <p>
            {anime.data.season.charAt(0).toUpperCase() +
              anime.data.season.slice(1)}{" "}
            {anime.data.aired.prop.from.year}
          </p>
        </div>
      )}

      {anime.data?.studios && anime.data.studios.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Studios:</p>
          {anime.data.studios.map((studios, index) => {
            const isLast = index === anime.data.studios.length - 1;
            return (
              <p key={index} className="whitespace-nowrap">
                {studios.name}
                {!isLast && ","}
              </p>
            );
          })}
        </div>
      )}

      {anime.data?.source && (
        <div className="flex gap-1 flex-wrap">
          <p className="text-Grey-60">Source:</p>
          <p>{anime.data.source}</p>
        </div>
      )}
    </Group>
  );
};

export default Information;
