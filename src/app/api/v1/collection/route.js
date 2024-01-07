import prisma from "@/libs/prisma";

export async function POST(request) {
  const { anime_mal_id, user_email, anime_title, anime_image } =
    await request.json();

  const data = { anime_mal_id, user_email, anime_title, anime_image };

  const createCollection = await prisma.collection.create({ data });

  if (!createCollection)
    return Response.json({ status: 500, isCreated: false });
  else return Response.json({ status: 200, isCreated: true });
}

export async function DELETE(request) {
  const id = await request.json();

  const deleteCollection = await prisma.collection.delete({
    where: {
      id,
    },
  });

  if (!deleteCollection) {
    return Response.json({ status: 500, message: "Collection not found" });
  } else {
    return Response.json({
      status: 200,
      message: "Collection deleted successfully",
    });
  }
}
