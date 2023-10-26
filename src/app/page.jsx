import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse } from "@/app/libs/api-libs";
import Group from "@/components/Group";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=5");

  return (
    <main className="md:px-40">
      {/* populer */}
      <section>
        {/* <Header
          title="Paling Populer"
          linkHref="/populer"
          linkTitle="Lihat Semua"
        /> */}
        <Group title="Anime">
          <div className="flex justify-between items-center">
            <p className=" text-Absolute-White font-bold text-2xl">Top Anime</p>
            <Link href="/populer" className=" text-Absolute-White p-3.5 bg-Black-10 border border-Black-12 rounded-lg">
              <ArrowRight size={20} />
            </Link>
          </div>
          <AnimeList api={topAnime} />
        </Group>
      </section>
    </main>
  );
};
export default Page;
