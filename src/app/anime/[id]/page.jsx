import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { getAnimeResponse, getNestedAnimeResponse } from "@/libs/api-libs";
import Header from "@/components/AnimeList/Header";
import AnimeList from "@/components/AnimeList";
import Character from "@/app/anime/[id]/Character";

const Page = async ({ params: { id } }) => {
  //get anime data
  const anime = await getAnimeResponse(`anime/${id}/full`);

  //get recommendations
  let suggestion = await getNestedAnimeResponse(
    `anime/${id}/recommendations`,
    "entry"
  );
  suggestion = { data: suggestion.slice(0, 15) };
  ////

  //get character
  const characters = await getAnimeResponse(`anime/${id}/characters`);
  ////

  //get relations
  // const relations = anime.data.relations;
  // const parentStory = relations
  //   .filter((type) => type.relation === "Parent story")
  //   .map((data) => data.entry);
  // console.log(parentStory);

  // relation type:
  // Relation_Sequel
  // Relation_Prequel
  // Relation_Parent_Story
  // Relation_Spin-off
  // Relation_Character
  // Relaation_Side_Story
  // Relation_Alternative_Setting
  // Relation_Alternative_Version
  // Relation_Summary
  // Relation_Other

  //date format
  function formatDate(dateString) {
    // Parse the date string using the ISO 8601 format
    const date = new Date(dateString);

    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Format the date in the desired format
    return `${day}-${month}-${year}`;
  }
  ////

  return (
    <main className="container flex flex-col gap-14">
      <section className="flex flex-col gap-7 xl:flex-row">
        <div className="flex flex-col gap-7 w-full ">
          <section className="flex flex-col">
            <Header title="OVERVIEW" />

            <article className="flex flex-col gap-3 text-Absolute-White text-base leading-7">
              <div className="flex flex-col gap-7 rounded-lg md:flex-row ">
                <div className="w-auto h-auto">
                  <Image
                    priority
                    src={anime.data?.images?.webp.large_image_url}
                    alt={anime.data?.images?.jpg.large_image_url}
                    width={384}
                    height={542}
                    className="object-cover object-center rounded-lg aspect-[3/4] w-full md:w-80"
                  />
                </div>

                <section className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col md:gap-1">
                    <p className="text-Absolute-White font-bold text-2xl md:text-4xl">
                      {anime.data?.title}
                    </p>

                    {anime.data?.rating && (
                      <p className="text-Grey-60 text-sm">
                        {anime.data.rating}
                      </p>
                    )}
                  </div>

                  <section className="w-full text-Absolute-White">
                    {anime.data?.type && (
                      <div className="w-full flex gap-4">
                        <p className="w-1/6">Type:</p>

                        <p className="w-5/6">{anime.data.type}</p>
                      </div>
                    )}

                    {anime.data?.aired.from && (
                      <div className="w-full flex gap-4">
                        <p className="w-1/6">Release:</p>

                        <p className="w-5/6">
                          {formatDate(anime.data.aired.from)}
                        </p>
                      </div>
                    )}

                    {anime.data?.episodes && (
                      <div className="w-full flex gap-4">
                        <p className="w-1/6">Episode:</p>

                        <p className="w-5/6">{anime.data.episodes}</p>
                      </div>
                    )}

                    {anime.data?.status && (
                      <div className="w-full flex gap-4">
                        <p className="w-1/6">Status:</p>

                        <p className="w-5/6">{anime.data.status}</p>
                      </div>
                    )}

                    {anime.data?.genres && anime.data.genres.length > 0 && (
                      <div className="w-full flex gap-4">
                        <p className="w-1/6">Genre:</p>

                        <div className="flex flex-wrap gap-1 w-5/6">
                          {anime.data.genres.map((genres, index) => {
                            const isLast =
                              index === anime.data.genres.length - 1;

                            return (
                              <p key={index}>
                                {genres.name}

                                {!isLast && ","}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {anime.data?.score && (
                      <div className="w-full flex gap-4">
                        <p className="w-1/6">Score:</p>

                        <div className="w-5/6 flex items-center text-Red-60">
                          <Star size={14} weight="fill" className="mr-2" />

                          <p className="text-Absolute-White">
                            {anime.data.score}
                          </p>
                        </div>
                      </div>
                    )}

                    {anime.data?.duration && (
                      <div className="w-full flex gap-4">
                        <p className="w-1/6">Duration:</p>

                        <p className="w-5/6">{anime.data.duration}</p>
                      </div>
                    )}
                  </section>
                </section>
              </div>

              <p>{anime.data.synopsis}</p>
            </article>
          </section>

          {characters.data?.length > 0 && <Character data={characters.data} />}
        </div>

        {suggestion.data?.length > 0 && (
          <section className="flex flex-col">
            <Header title="RECOMMENDED" />
            <AnimeList horizontal api={suggestion} />
          </section>
        )}
      </section>
    </main>
  );
};

export default Page;
