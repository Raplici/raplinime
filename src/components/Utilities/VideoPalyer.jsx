"use client";

import { useState } from "react";
import { Play, XCircle } from "@phosphor-icons/react/dist/ssr";
import YouTube from "react-youtube";

const VideoPlayer = ({ youtubeId }) => {
  const [showVideo, setShowVideo] = useState(false);

  const option = {
    height: `100%`,
    width: `100%`,
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="flex w-full md:w-auto">
      <button
        onClick={() => setShowVideo(true)}
        className=" flex justify-center bg-Red-45 rounded-lg px-5 py-3.5 gap-2 font-semibold text-lg items-center w-full md:w-auto "
      >
        <Play size={24} weight="fill" />
        Play Trailer
      </button>

      {showVideo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center ">
          <div className=" w-2/3 h-1/6 md:h-1/4 lg:h-3/4 ">
            <div className="flex justify-end">
              <button
                onClick={() => setShowVideo(false)}
                className=" text-Absolute-White bg-transparent right-12"
              >
                <XCircle size={32} weight="bold" />
              </button>
            </div>

            <YouTube
              videoId={youtubeId}
              opts={option}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
