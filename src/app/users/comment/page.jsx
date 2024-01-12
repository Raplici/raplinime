import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import Link from "next/link";
import { Star } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/AnimeList/Header";
import DeleteComment from "@/app/users/comment/DeleteComment";

const page = async () => {
  const user = await authUserSession();

  const comments = await prisma.comment.findMany({
    where: { user_email: user.email },

    orderBy: {
      createdAt: "desc",
    },
  });

  const groupedComments = comments.reduce((acc, comment) => {
    const createdAtDate = new Date(Date.parse(comment.createdAt.toISOString()));

    const createdAtDateOnly = new Date(
      createdAtDate.getFullYear(),

      createdAtDate.getMonth(),

      createdAtDate.getDate()
    );

    const existingGroup = acc.find(
      (group) =>
        group.createdAtDateOnly.getTime() === createdAtDateOnly.getTime()
    );

    if (existingGroup) {
      existingGroup.comments.push(comment);
    } else {
      acc.push({
        createdAtDate: createdAtDate,

        createdAtDateOnly: createdAtDateOnly,

        comments: [comment],
      });
    }

    return acc;
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",

      day: "2-digit",

      month: "2-digit",

      year: "numeric",
    });

    return formatter.format(date);
  }

  return (
    <>
      <article className="container w-full text-Absolute-White">
        <Header title="Comment History" />

        {!comments.length > 0 ? (
          <div className="flex justify-center items-center h-40 text-Grey-60">
            <p className="flex justify-center items-center ">
              You haven't made any comments yet...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {groupedComments.map((group) => {
              const lastIndex = group.comments.length - 1;

              return (
                <div
                  key={group.createdAtDate.toISOString()}
                  className="flex flex-col gap-3"
                >
                  <p className="text-lg md:text-xl font-semibold tracking-wide bg-Black-10 p-3 md:p-5 rounded-lg">
                    {formatDate(group.createdAtDate)}
                  </p>

                  {group.comments.map((comment, index) => {
                    return (
                      <section
                        key={comment.id}
                        className={`flex flex-col  

                      ${
                        index !== lastIndex && "border-b-2 border-Black-12 pb-3"
                      }`}
                      >
                        <div className="flex justify-between">
                          <Link
                            href={`/anime/${comment.anime_mal_id}`}
                            className="flex flex-col w-full"
                          >
                            <p className="text-base md:text-lg font-semibold tracking-wide">
                              {comment.anime_title}
                            </p>

                            <section className="flex gap-1">
                              {[...Array(5)].map((star, index) => {
                                return (
                                  <Star
                                    key={index}
                                    weight="fill"
                                    className="transition-colors w-4 h-4"
                                    color={
                                      index + 1 <= comment.rating
                                        ? "#ff3333"
                                        : "#999999"
                                    }
                                  />
                                );
                              })}
                            </section>

                            <p>{comment.comment}</p>
                          </Link>

                          <DeleteComment id_comment={comment.id} />
                        </div>
                      </section>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </article>
    </>
  );
};

export default page;
