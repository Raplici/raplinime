import { getAnimeResponse } from "@/libs/api-libs";
import Group from "@/components/Group";
import VideoPlayer from "@/components/Utilities/VideoPalyer";
import Image from "next/image";
import Information from "./Information";
import Character from "./Character";

const Page = async ({ params: { id } }) => {
  const anime = await getAnimeResponse(`anime/${id}`);

  return (
    <main className="container flex flex-col gap-14">
      <section className="relative">
        <Image
          priority={true}
          src={anime.data.images.webp.large_image_url}
          alt={anime.data.images.jpg.large_image_url}
          width={380}
          height={350}
          className=" object-cover aspect-[3/4] object-center rounded-xl w-full brightness-50 md:aspect-video"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-Black-8" />

        <div className="relative mx-6">
          <div className="absolute flex flex-col text-Absolute-White gap-5 items-center text-center bottom-0 mb-8 w-full md:gap-8 md:mb-20">
            <p className="text-2xl font-bold md:text-4xl md:px-20">
              {anime.data.title}
            </p>

            <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row lg:grid-cols-2 gap-5 text-Absolute-White text-sm leading-6 font-normal md:text-lg md:font-medium">
        <div className="flex flex-col gap-5 lg:w-3/4">
          <Group className="bg-Black-10 gap-2.5 md:gap-3.5">
            <p className="text-Grey-60">Synopsis</p>
            <p className="text-justify">{anime.data.synopsis}</p>
          </Group>

          <Character id={id} />
        </div>

        <div className="order-first lg:order-last lg:w-1/4">
          <Information id={id} />
        </div>
      </section>
    </main>
  );
};

export default Page;
