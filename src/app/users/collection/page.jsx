import Image from "next/image";
import Link from "next/link";
import Header from "@/components/AnimeList/Header";
import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import DeleteCollection from "@/app/users/collection/DeleteCollection";

const Page = async () => {
  const user = await authUserSession();
  const collection = await prisma.collection.findMany({
    where: { user_email: user.email },

    orderBy: {
      id: "desc",
    },
  });

  return (
    <section className="container w-full">
      <Header title="COLLECTION" />

      {!collection.length > 0 ? (
        <div className="flex justify-center items-center h-40 text-Grey-60">
          <p className="flex justify-center items-center ">
            You haven't added any anime to the collection...
          </p>
        </div>
      ) : (
        <div className="h-max w-full shrink-0 flex flex-col gap-3">
          {collection.map((collect, index) => {
            return (
              <div key={index} className="relative flex items-center">
                <Link
                  href={`/anime/${collect.anime_mal_id}`}
                  className="flex flex-row w-full cursor-pointer h-20 bg-Black-10 rounded-lg text-Absolute-White items-center transition hover:bg-gradient-to-r from-transparent to-Red-60"
                >
                  <div className="w-auto h-auto">
                    <Image
                      src={collect.anime_image}
                      alt={collect.anime_image}
                      width={64}
                      height={100}
                      className="object-cover object-center rounded-l-lg aspect-[3/4] "
                    />
                  </div>

                  <section className="flex flex-col px-5 w-full">
                    <p className="text-Absolute-White font-medium text-xl tracking-wide line-clamp-1">
                      {collect.anime_title}
                    </p>
                  </section>
                </Link>
                <div className="absolute top-5 right-5 text-Absolute-White">
                  <DeleteCollection id_collection={collect.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Page;
