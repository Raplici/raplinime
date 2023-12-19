import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import {
  getAnimeResponse,
  getNestedAnimeResponse,
  reproduce,
} from "@/libs/api-libs";
import Banner from "@/components/Banner";

const Page = async () => {
  // get schedules
  const date = new Date();

  // Passing undefined as the first argument indicates the browser should use the default locale settings.
  // weekday: This key specifies that we want to format only the weekday.
  // "long": This value indicates we want the full name of the day (example: "Wednesday" instead of "Wed").
  const fullDay = date.toLocaleDateString(undefined, { weekday: "long" });

  const schedules = await getAnimeResponse(
    "schedules",
    `filter=${fullDay}&sfw=true`
  );
  ////

  // get recommendation
  let recommendedAnime = await getNestedAnimeResponse(
    "recommendations/anime",
    "entry"
  );
  recommendedAnime = reproduce(recommendedAnime, 7);
  ////

  // get top anime
  const topAnime = await getAnimeResponse("top/anime", "sfw&limit=21");
  ////

  return (
    <main className="container flex flex-col gap-14">
      <Banner />

      <section className="flex flex-col gap-7 xl:flex-row">
        <div className="flex flex-col gap-7">
          <section className="flex flex-col">
            <Header title="TOP ANIME" link="/populer" />

            <AnimeList api={topAnime} />
          </section>

          <section className="flex flex-col">
            <Header title="RECOMMENDATION" />

            <AnimeList api={recommendedAnime} />
          </section>
        </div>

        <section className="flex flex-col">
          <Header title="AIRING TODAY" />

          <AnimeList horizontal api={schedules} />
        </section>
      </section>
    </main>
  );
};
export default Page;
