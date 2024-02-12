import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { db } from "@/src/libs/prisma";
import { currentUser } from "@/src/libs/auth";
import Header from "@/src/components/AnimeList/Header";
import DeleteComment from "@/src/app/(protected)/users/comment/DeleteComment";

const Page = async () => {
  const user = await currentUser();

  const comments = await db.comment.findMany({
    where: { user_email: user?.email },

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
    <section className="container w-full text-Absolute-White">
      <Header title="Comment History" />

      {!comments.length > 0 ? (
        <>
          <p className="flex justify-center items-center text-Grey-60">
            You haven't made any comments yet...
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          {groupedComments.map((group) => {
            const lastIndex = group.comments.length - 1;

            return (
              <div
                key={group.createdAtDate.toISOString()}
                className="flex flex-col gap-3"
              >
                <p className="text-lg font-semibold tracking-wide bg-Grey-60/10 p-3 rounded-lg">
                  {formatDate(group.createdAtDate)}
                </p>

                {group.comments.map((comment, index) => {
                  return (
                    <section
                      key={comment.id}
                      className={`flex flex-col ${
                        index !== lastIndex && "border-b-2 border-Black-12 pb-3"
                      }`}
                    >
                      <div className="flex justify-between items-center">
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
                                <FaStar
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
    </section>
  );
};

export default Page;
