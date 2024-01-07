"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BookmarkSimple } from "@phosphor-icons/react";

const CollectionButton = ({
  anime_mal_id,
  user_email,
  anime_title,
  anime_image,
  collection,
}) => {
  const router = useRouter();

  const handleAddCollection = async () => {
    event.preventDefault();

    const data = { anime_mal_id, user_email, anime_title, anime_image };

    await toast.promise(
      fetch("/api/v1/collection", {
        method: "POST",
        body: JSON.stringify(data),
      }),
      {
        pending: "Adding to the collection...",
        success: "Successfully added to collection!",
        error: "Failed to add to collection, please try again.",
      }
    );

    router.refresh();
  };

  const handleDeleteCollection = async () => {
    event.preventDefault();

    await toast.promise(
      fetch(`/api/v1/collection/`, {
        method: "DELETE",
        body: JSON.stringify(collection.id),
      }),
      {
        pending: "Remove from collection...",
        success: "Successfully removed from collection!",
        error: "Failed to remove from collection, please try again.",
      }
    );

    router.refresh();
  };

  return (
    <>
      {collection ? (
        <button
          onClick={handleDeleteCollection}
          className="flex flex-nowrap rounded-lg justify-center items-center gap-1 p-2 bg-Absolute-White bg-opacity-50 text-Black-8 font-semibold text-sm transition-colors"
        >
          <BookmarkSimple size={20} />
          Remove From Collection
        </button>
      ) : (
        <button
          onClick={handleAddCollection}
          className="flex flex-nowrap rounded-lg justify-center items-center gap-1 p-2 bg-Absolute-White text-Black-8 font-semibold text-sm hover:bg-opacity-50 transition-colors"
        >
          <BookmarkSimple size={20} />
          Add To Collection
        </button>
      )}
    </>
  );
};

export default CollectionButton;
