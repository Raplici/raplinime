import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse } from "@/app/libs/api-libs";
import Group from "@/components/Group";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=10");

  return (
    <main className="container">
        <Group title="Anime">
          <Header title="Paling Populer" linkHref="/populer" />
          <AnimeList api={topAnime} titleOnly={false}/>
        </Group>
    </main>
  );
};
export default Page;
