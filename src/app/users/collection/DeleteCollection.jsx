"use client";

import { Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

const DeleteCollection = ({ id_collection }) => {
  const router = useRouter();

  const handleDeleteCollection = async () => {
    event.preventDefault();

    await toast.promise(
      fetch(`/api/v1/collection/`, {
        method: "DELETE",
        body: JSON.stringify(id_collection),
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
    <div>
      <button
        onClick={handleDeleteCollection}
        className=" rounded-full p-2 bg-Black-10 hover:bg-opacity-20 hover:bg-Grey-60"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default DeleteCollection;
