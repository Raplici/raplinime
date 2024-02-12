"use client";

import { deleteComment } from "@/src/actions/comment";
import { Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "react-toastify";

const DeleteComment = ({ id_comment }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    const values = { id: id_comment };

    startTransition(() => {
      deleteComment(values).then((data) => {
        if (data?.success) {
          toast.success(data.success);
        }

        if (data?.error) {
          toast.error(data.error);
        }
      });

      router.refresh();
    });
  };

  return (
    <div>
      <button
        disabled={isPending}
        onClick={onDelete}
        className=" rounded-full p-2 transition-colors hover:bg-Grey-60/20 disabled:cursor-progress"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default DeleteComment;
