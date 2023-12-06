import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import {
  getAnimeResponse,
  getNestedAnimeResponse,
  reproduce,
} from "@/libs/api-libs";
import Group from "@/components/Group";
import Banner from "@/components/Banner";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=10");

  let recommendedAnime = await getNestedAnimeResponse(
    "recommendations/anime",
    "entry"
  );
  recommendedAnime = reproduce(recommendedAnime, 5);

  return (
    <main className="container">
      <Banner/>
      <Group title="Anime" className="md:gap-10">
        <section className="flex flex-col gap-4 md:gap-5">
          <Header title="Top Anime" linkHref="/populer" />
          <AnimeList api={topAnime} titleOnly={false} />
        </section>

        <section className="flex flex-col gap-4 md:gap-5">
          <Header title="Recommendation" />
          <AnimeList api={recommendedAnime} />
        </section>
      </Group>
    </main>
  );
};
export default Page;
