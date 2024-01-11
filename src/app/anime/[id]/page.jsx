import Image from "next/image";
import { Star, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { authUserSession } from "@/libs/auth-libs";
import { getAnimeResponse, getNestedAnimeResponse } from "@/libs/api-libs";

import Header from "@/components/AnimeList/Header";
import AnimeList from "@/components/AnimeList";
import Character from "@/app/anime/[id]/Character";
import CollectionButton from "@/components/AnimeList/Collection/CollectionButton";
import CommentBox from "@/components/AnimeList/Comment/CommentBox";
import CommentInput from "@/components/AnimeList/Comment/CommentInput";
import Link from "next/link";

const Page = async ({ params: { id } }) => {
  //user session & get data from collection
  const user = await authUserSession();

  const collection = await prisma.collection.findFirst({
    where: { user_email: user?.email, anime_mal_id: id },
  });

  //get anime data
  const anime = await getAnimeResponse(`anime/${id}/full`);

  //validate anime data
  if (anime.status == 404) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <div className="bg-Black-10 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-24 py-8 rounded-lg md:rounded-3xl text-Red-60 gap-3">
          <p className="text-6xl md:text-7xl lg:text-9xl font-bold">404</p>

          <p className="text-2xl md:text-3xl lg:text-5xl font-bold">
            Anime Not Found
          </p>

          <p className="text-Absolute-White text-center">
            Sorry, the page you are looking for could not be found.
          </p>

          <a
            href={"/"}
            className="flex justify-center items-center py-2 text-Absolute-White gap-2"
          >
            <ArrowLeft size={20} />
            Home
          </a>
        </div>
      </section>
    );
  }

  //get recommendations
  let suggestion = await getNestedAnimeResponse(
    `anime/${id}/recommendations`,
    "entry"
  ).then((data) => {
    return { data: data?.slice(0, 15) };
  });

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

  //score format
  function formatScore(score) {
    const formattedScore = parseFloat(score);

    if (isNaN(formattedScore)) {
      return score;
    }

    return formattedScore.toFixed(2);
  }

  return (
    <main className="container flex flex-col gap-14">
      <section className="flex flex-col gap-7 xl:flex-row">
        <div className="flex flex-col gap-7 w-full ">
          {anime.data && (
            <section className="flex flex-col">
              <Header title="OVERVIEW" />

              <article className="flex flex-col gap-3 text-Absolute-White text-base leading-7">
                <div className="flex flex-col gap-3 rounded-lg md:flex-row md:gap-7 ">
                  <div className="flex flex-col gap-3 w-auto h-auto">
                    <Image
                      priority
                      src={anime.data?.images?.webp.large_image_url}
                      alt={anime.data?.images?.jpg.large_image_url}
                      width={384}
                      height={542}
                      className="object-cover object-center rounded-lg aspect-[3/4] w-full md:w-80"
                    />

                    {user && (
                      <CollectionButton
                        anime_mal_id={id}
                        user_email={user.email}
                        anime_title={anime.data?.title}
                        anime_image={anime.data?.images.webp.large_image_url}
                        collection={collection}
                      />
                    )}
                  </div>

                  <section className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col md:gap-1">
                        <p className="text-Absolute-White font-bold text-2xl md:text-4xl md:leading-9">
                          {anime.data?.title}
                        </p>

                        {anime.data?.rating && (
                          <p className="text-Grey-60 text-sm leading-4">
                            {anime.data.rating}
                          </p>
                        )}
                      </div>

                      {anime.data?.type != "Music" &&
                        anime.data?.trailer.url && (
                          <Link
                            target="_blank"
                            href={anime.data?.trailer.url}
                            rel="noopener noreferrer"
                            className="flex py-1 px-2 rounded-lg w-fit bg-Red-55 transition-colors hover:bg-opacity-50"
                          >
                            <p className="text-sm">Watch Trailer</p>
                          </Link>
                        )}

                      {anime.data?.type == "Music" && anime.data?.external && (
                        <>
                          {anime.data.external.map((mv) => {
                            if (mv.name == "YouTube") {
                              return (
                                <Link
                                  target="_blank"
                                  href={mv.url}
                                  rel="noopener noreferrer"
                                  className="flex py-1 px-2 rounded-lg w-fit bg-Red-55 transition-colors hover:bg-opacity-50"
                                >
                                  <p className="text-sm">Watch MV</p>
                                </Link>
                              );
                            }
                          })}
                        </>
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

                      {anime.data?.genres != null && (
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
                              {formatScore(anime.data.score)}
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

                <p>{anime.data?.synopsis}</p>
              </article>
            </section>
          )}

          <Character animeId={id} />

          <section className="flex flex-col">
            <Header title="COMMENT" />

            <div className="flex flex-col gap-3">
              {!user && (
                <Link
                  href="/api/auth/signin"
                  className="w-full rounded-lg px-5 py-1.5 bg-Black-10 text-Absolute-White text-center font-medium tracking-wide transition-colors duration-300 hover:bg-Absolute-White hover:text-Black-8"
                >
                  <p>
                    Sign in and start collecting your favorite shows, leaving
                    comments, and share your thoughts with a rating.
                  </p>
                </Link>
              )}

              {user && (
                <CommentInput
                  anime_mal_id={id}
                  user_email={user.email}
                  user_image={user.image}
                  username={user.name}
                  anime_title={anime.data?.title}
                />
              )}

              <CommentBox anime_mal_id={id} />
            </div>
          </section>
        </div>

        {suggestion != undefined && (
          <>
            {suggestion.data.length > 0 && (
              <section className="flex flex-col">
                <Header title="RECOMMENDED" />
                <AnimeList horizontal api={suggestion} className="xl:w-80" />
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Page;
