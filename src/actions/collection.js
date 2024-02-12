"use server";

import { db } from "@/src/libs/prisma";

export const collection = async (values) => {
  const alreadyExist = await db.collection.findFirst({
    where: { anime_mal_id: values.anime_mal_id, user_email: values.user_email },
  });

  if (alreadyExist) {
    await db.collection.delete({
      where: { id: alreadyExist.id },
    });

    return { success: "Successfully removed from your collection!" };
  }

  await db.collection.create({
    data: { ...values },
  });

  return { success: "Successfully added to collection!" };
};
