import Image from "next/image";
import Link from "next/link";

import { db } from "@/src/libs/prisma";
import { currentUser } from "@/src/libs/auth";
import Header from "@/src/components/AnimeList/Header";
import DeleteCollection from "@/src/app/(protected)/users/collection/DeleteCollection";

const Page = async () => {
  const user = await currentUser();
  const collection = await db.collection.findMany({
    where: { user_email: user?.email },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <section className="container w-full">
      <Header title="Collection" />

      {!collection.length > 0 ? (
        <>
          <p className="flex justify-center items-center text-Grey-60">
            You haven't added any anime to the collection...
          </p>
        </>
      ) : (
        <div className="h-max w-full shrink-0 flex flex-col gap-3">
          {collection.map((collect, index) => {
            return (
              <div key={index} className="relative flex items-center">
                <Link
                  href={`/anime/${collect.anime_mal_id}`}
                  className="group flex flex-row w-full cursor-pointer h-20 bg-Black-10 rounded-lg text-Absolute-White items-center transition-colors hover:bg-Grey-60/20 "
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

                <div className="group absolute top-5 right-5 text-Absolute-White transition-colors group-hover:bg-Grey-60/20">
                  <DeleteCollection
                    user_email={user?.email}
                    anime_mal_id={collect.anime_mal_id}
                  />
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
