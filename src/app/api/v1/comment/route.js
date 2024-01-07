import prisma from "@/libs/prisma";

export async function POST(request) {
  const {
    anime_mal_id,
    user_email,
    comment,
    username,
    user_image,
    rating,
    anime_title,
  } = await request.json();

  const data = {
    anime_mal_id,
    user_email,
    comment,
    username,
    user_image,
    rating,
    anime_title,
  };

  const createComment = await prisma.comment.create({ data });

  if (!createComment) return Response.json({ status: 500, isCreated: false });
  else return Response.json({ status: 200, isCreated: true });
}

export async function DELETE(request) {
  const id = await request.json();

  const deleteComment = await prisma.comment.delete({
    where: {
      id,
    },
  });

  if (!deleteComment) {
    return Response.json({ status: 500, message: "comment not found" });
  } else {
    return Response.json({
      status: 200,
      message: "comment deleted successfully",
    });
  }
}
