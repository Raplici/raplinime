"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Star } from "@phosphor-icons/react";

const CommentInput = ({
  anime_mal_id,
  user_email,
  username,
  user_image,
  anime_title,
}) => {
  const [comment, setComment] = useState("");

  //rating
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const router = useRouter();

  const handleInput = (event) => {
    setComment(event.target.value);
  };

  const handlePosting = async (event) => {
    event.preventDefault();

    //validate that the value is not empty
    if (rating < 1 || rating > 5 || comment === "") {
      toast.error("Please provide a rating and comments before submitting.");
      return;
    }

    // validate against spam, max 30 letters per word
    const words = comment.split(" ");
    const hasTooLongWord = words.some((word) => word.length > 30);

    if (hasTooLongWord) {
      toast.error(
        "The word is too long. The maximum length is 30 letters per word."
      );
      return;
    }

    // Validate total letters (max 5000)
    if (comment.length > 5000) {
      toast.error("Comment is too long. The maximum length is 5000 letters.");
      return;
    }

    const data = {
      anime_mal_id,
      user_email,
      comment,
      username,
      user_image,
      rating,
      anime_title,
    };

    await toast.promise(
      fetch(`/api/v1/comment`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
      {
        pending: "Adding a comment...",
        success: "Successfully added your comment!",
        error: "Failed to add your comment, please try again.",
      }
    );

    router.refresh();
    setRating(0);
    setComment("");
  };

  return (
    <section className="flex flex-col gap-3">
      <section className="flex container gap-3">
        <Image
          src={user_image}
          alt=""
          width={48}
          height={48}
          className="aspect-square h-10 w-10 md:h-12 md:w-12 shrink-0 object-cover object-center rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-Absolute-White md:text-lg font-semibold tracking-wide">
            {username}
          </p>
          <section className="flex gap-1">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label key={index}>
                  <input
                    type="radio"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    className="hidden"
                  />

                  <Star
                    weight="fill"
                    className="text-xl md:text-2xl cursor-pointer transition-colors"
                    color={
                      currentRating <= (hover || rating) ? "#ff3333" : "#999999"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </section>
        </div>
      </section>

      <textarea
        rows={6}
        className="w-full text-sm tracking-wide text-Absolute-White outline-none py-2 px-4 overscroll-contain bg-Black-12 rounded-lg"
        placeholder="Write a comment..."
        onChange={handleInput}
        value={comment}
      ></textarea>

      <button
        onClick={handlePosting}
        className="w-fit rounded-lg items-center px-5 py-2 bg-Absolute-White text-Black-8 font-semibold hover:bg-opacity-50 transition-colors"
      >
        Post a comment
      </button>
    </section>
  );
};

export default CommentInput;
