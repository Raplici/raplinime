"use client";

import { Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { collection } from "@/src/actions/collection";
import { useTransition } from "react";

const DeleteCollection = ({ user_email, anime_mal_id }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    const values = { anime_mal_id, user_email };

    startTransition(() => {
      collection(values).then((data) => {
        if (data?.success) {
          router.refresh();
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <div>
      <button
        disabled={isPending}
        onClick={onDelete}
        className=" rounded-full p-2 bg-transparent hover:bg-Grey-60/20"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default DeleteCollection;
