import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const Page = async ({ params }) => {
  const { keyword } = params;
  const decodedKeyword = decodeURI(keyword);
  const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`);

  return (
    <section className="container">
      <Header title={`SEARCH RESULTS FOR '${decodedKeyword}...' `} />
      {searchAnime.data?.length > 0 ? (
        <AnimeList api={searchAnime} />
      ) : (
        <div className="flex justify-center items-center h-40 text-Grey-60">
          <p className="flex justify-center items-center ">
            Anime with keyword '{decodedKeyword}' not found...
          </p>
        </div>
      )}
    </section>
  );
};
export default Page;
