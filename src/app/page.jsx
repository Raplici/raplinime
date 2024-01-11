import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import {
  getAnimeResponse,
  getNestedAnimeResponse,
  reproduce,
} from "@/libs/api-libs";
import Banner from "@/components/Banner";

const date = new Date();
const fullDay = date.toLocaleDateString("en-US", { weekday: "long" });

const Page = async () => {
  // get schedules
  const schedules = await getAnimeResponse(
    "schedules",
    `filter=${fullDay}&sfw=true`
  );

  // get recommendation
  let recommendedAnime = await getNestedAnimeResponse(
    "recommendations/anime",
    "entry"
  );
  recommendedAnime = reproduce(recommendedAnime, 7);

  // get top anime
  const topAnime = await getAnimeResponse("top/anime", "sfw&limit=21");

  return (
    <main className="container flex flex-col gap-14">
      <Banner />

      <section className="flex flex-col gap-7 xl:flex-row">
        <div className="flex flex-col gap-7">
          <section className="flex flex-col">
            <Header title="TOP ANIME" link="/populer" />

            <AnimeList api={topAnime} />
          </section>

          {recommendedAnime?.data?.length > 0 && (
            <section className="flex flex-col">
              <Header title="RECOMMENDATION" />

              <AnimeList api={recommendedAnime} />
            </section>
          )}
        </div>

        {schedules?.data?.length > 0 && (
          <section className="flex flex-col">
            <Header title="AIRING TODAY" />

            <AnimeList horizontal api={schedules} className="xl:w-80" />
          </section>
        )}
      </section>
    </main>
  );
};
export default Page;
