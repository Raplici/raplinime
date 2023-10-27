import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse } from "@/app/libs/api-libs";
import Group from "@/components/Group";
import Navbar from "@/components/Navbar";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=10");

  return (
    <main className="flex flex-col gap-10 md:gap-14">
      <section className="container flex flex-col gap-8 pt-5 md:flex-row md:pt-6">
        <Group title="Anime">
          <Header title="Paling Populer" linkHref="/populer" />
          <AnimeList api={topAnime} titleOnly={false}/>
        </Group>
      </section>
    </main>
  );
};
export default Page;
