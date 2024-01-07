"use client";

import { Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

const DeleteComment = ({ id_comment }) => {
  const router = useRouter();

  const handleDeleteComment = async () => {
    event.preventDefault();

    await toast.promise(
      fetch(`/api/v1/comment/`, {
        method: "DELETE",
        body: JSON.stringify(id_comment),
      }),
      {
        pending: "Removing comment...",
        success: "Successfully removed from comment history!",
        error: "Failed to remove from comment history, please try again.",
      }
    );

    router.refresh();
  };

  return (
    <div>
      <button
        onClick={handleDeleteComment}
        className=" rounded-full p-2 transition-colors hover:bg-opacity-20 hover:bg-Grey-60"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default DeleteComment;
