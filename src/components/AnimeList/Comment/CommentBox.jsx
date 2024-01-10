import prisma from "@/libs/prisma";
import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const CommentBox = async ({ anime_mal_id }) => {
  const comments = await prisma.comment.findMany({
    where: { anime_mal_id },

    orderBy: {
      id: "desc",
    },
  });

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="flex flex-col">
      {comments.map((comment) => {
        return (
          <section
            key={comment.id}
            className="flex gap-3 border-t-2 border-Black-12 py-7 text-Absolute-White "
          >
            <Image
              src={comment.user_image}
              alt=""
              width={40}
              height={40}
              className="aspect-square h-10 w-10 shrink-0 object-cover object-center rounded-full"
            />

            <div className="flex flex-col w-full ">
              <p className="leading-5">{comment.username}</p>

              <p className="text-xs text-Grey-60">
                {formatDate(comment.createdAt)}
              </p>

              <section className="flex gap-1">
                {[...Array(5)].map((star, index) => {
                  return (
                    <Star
                      key={index}
                      weight="fill"
                      className="transition-colors w-4 h-4"
                      color={
                        index + 1 <= comment.rating ? "#ff3333" : "#999999"
                      }
                    />
                  );
                })}
              </section>

              <p className="text-sm md:text-base">{comment.comment}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CommentBox;
