"use client";
import { StreamSourceSelect } from "@/db/custom.type";
import dynamic from "next/dynamic";
import Image from "next/image";
import MediaThemeSutro from "player.style/sutro/react";
import { useEffect, useState } from "react";
const MuxVideo = dynamic(() => import("@mux/mux-video-react"), {
  ssr: false,
});

export default function MuxVideoCustom({
  src = null,
  thumbnail = "",
  watermark = "",
}: {
  src: StreamSourceSelect | null;
  thumbnail: string;
  watermark: string;
}) {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsError(true);
      setError("Video source tidak ditemukan");
    } else {
      setIsError(false);
      setIsLoading(true);
    }
  }, [src]);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
    setError("Video error atau tidak didukung, silahkan ganti source");
  };

  return (
    <div className="w-full h-full aspect-video bg-secondary rounded-xl overflow-hidden relative">
      {/* Error State */}
      {isError && (
        <div className="w-full h-full aspect-video flex flex-col justify-center items-center gap-2 bg-black/90">
          <h4 className="font-medium text-red-500">Error!</h4>
          <p className="text-white text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !isError && (
        <div className="absolute inset-0 z-50 bg-black/90 flex flex-col gap-2 justify-center items-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-300">Loading video...</p>
        </div>
      )}

      {/* Video Player */}
      {!isError && (
        <div className="relative w-full h-full">
          <MediaThemeSutro className="w-full h-full">
            <MuxVideo
              src={src?.url}
              slot="media"
              playsInline
              className={`w-full h-full ${
                isLoading ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300`}
              width="100%"
              height="100%"
              poster={thumbnail}
              onLoadStart={handleLoadStart}
              onLoadedData={handleLoadedData}
              onError={handleError}
            />
          </MediaThemeSutro>

          {/* Watermark di luar MuxVideo */}
          {watermark && !isLoading && (
            <Image
              src={watermark}
              alt="wm"
              className="absolute z-50 top-5 right-5 w-[5%] h-auto pointer-events-none"
              width={100}
              height={50}
            />
          )}
        </div>
      )}
    </div>
  );
}
