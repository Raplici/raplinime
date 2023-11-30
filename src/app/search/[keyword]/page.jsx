import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import Group from "@/components/Group";

const Page = async ({ params }) => {
  const { keyword } = params;
  const decodedKeyword = decodeURI(keyword);
  const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`);

  return (
    <section className="container">
      <Group>
      <Header title={`Pencarian untuk ${decodedKeyword}...`} />
      <AnimeList api={searchAnime} />
      </Group>
    </section>
  );
};
export default Page;
