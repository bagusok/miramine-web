"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { StreamSourceSelect } from "@/db/custom.type";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Vidstack({
  src = null,
  thumbnail = "",
  watermark = "",
  title = "",
}: {
  src: StreamSourceSelect | null;
  thumbnail: string;
  watermark: string;
  title: string;
}) {
  // Set initial state to false to show loading state first
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src?.url]);

  return (
    <div className="w-full h-fit aspect-video bg-secondary rounded-xl overflow-hidden relative">
      <MediaPlayer
        playsInline
        title={title}
        src={src?.url}
        className={`w-full h-full ${!loaded ? "opacity-0" : "opacity-100"}`}
        onLoadStart={() => setLoaded(false)}
        onLoadedData={() => setLoaded(true)}
        onLoadedMetadata={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(false);
        }}
      >
        <MediaProvider />
        <DefaultVideoLayout thumbnails={thumbnail} icons={defaultLayoutIcons} />
        <Poster
          className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src={thumbnail}
          alt="Video thumbnail"
        />
        {watermark && (
          <Image
            src={watermark}
            alt="wm"
            className="absolute z-50 top-5 right-5 w-[5%] h-auto"
            width={100}
            height={50}
          />
        )}
      </MediaPlayer>

      {/* Loading or Error State */}
      {(!loaded || error) && (
        <div className="absolute inset-0 bg-black/90 flex flex-col gap-2 justify-center items-center">
          {error ? (
            <p className="text-red-500">Error loading video</p>
          ) : (
            <>
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-300">Loading video...</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
