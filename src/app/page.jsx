import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import {
  getAnimeResponse,
  getNestedAnimeResponse,
  reproduce,
} from "@/libs/api-libs";
import Banner from "@/components/Banner";

const Page = async () => {
  // Schedules
  const getDay = () => {
    var date = new Date();
    let day = date.toString().slice(0, 3);

    switch (day) {
      case "Sun":
        day = "sunday";
        return day;

      case "Mon":
        day = "monday";
        return day;

      case "Tue":
        day = "tuesday";
        return day;

      case "Wed":
        day = "wednesday";
        return day;

      case "Thu":
        day = "thursday";
        return day;

      case "Fri":
        day = "friday";
        return day;

      case "Sat":
        day = "saturday";
        return day;
    }
  };

  const schedules = await getAnimeResponse(
    "schedules",
    `filter=${getDay()}&sfw=true`
  );
  ////

  // Top Anime
  let recommendedAnime = await getNestedAnimeResponse(
    "recommendations/anime",
    "entry"
  );
  recommendedAnime = reproduce(recommendedAnime, 7);
  ////

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
