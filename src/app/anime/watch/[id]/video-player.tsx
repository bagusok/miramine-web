"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageFallback from "@/components/home/image-fallback";
import StreamingNotFound from "./streaming-not-found";
import { StreamSourceSelect } from "@/db/custom.type";
import MuxVideoCustom from "@/components/video-player.tsx/mux-video";
import Vidstack from "@/components/video-player.tsx/vidstack";
import { StreamFormat } from "@/db/enums";
import disableDevtool from "disable-devtool";

export default function VideoPlayer({
  streamSource,
  animeTitle,
  episode,
  image,
  synopsis,
}: {
  streamSource: StreamSourceSelect[];
  animeTitle: string;
  episode: string;
  image: string;
  synopsis: string;
}) {
  const [activeSource, setActiveSource] = useState<StreamSourceSelect | null>(
    streamSource[0] ?? null
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined" &&
      typeof navigator !== "undefined" &&
      navigator.userAgent
    ) {
      disableDevtool({
        url: "/",
      });
    }
  }, []);

  return (
    <>
      <div className="w-full h-fit aspect-video bg-secondary rounded-xl overflow-hidden relative">
        {activeSource ? (
          <>
            {isOtherSource(activeSource) ? (
              <MuxVideoCustom
                src={activeSource}
                thumbnail="/thumbnail.png"
                watermark="/video-watermark.png"
              />
            ) : (
              <Vidstack
                title={`${animeTitle} - Episode ${episode}`}
                src={activeSource}
                thumbnail="/thumbnail.png"
                watermark="/video-watermark.png"
              />
            )}
          </>
        ) : (
          <StreamingNotFound />
        )}
      </div>
      <div className="w-full mt-4 bg-secondary rounded-xl p-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Episode {episode}</h3>
        <Select
          onValueChange={(v) =>
            setActiveSource(streamSource.find((x) => x.id == v) ?? null)
          }
          value={activeSource?.id}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Server" />
          </SelectTrigger>
          <SelectContent className="h-60 overflow-y-auto">
            {streamSource.map((source) => (
              <SelectItem
                key={source.id}
                value={source.id}
                // onClick={() => setActiveSource(source.id)}
              >
                {source.quality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="shrink-0 bg-secondary rounded-lg overflow-hidden">
          <ImageFallback
            src={image}
            fallbackSrc="/preview-not-available.webp"
            alt="thumbnail"
            width={200}
            height={300}
            className="rounded-lg object-cover w-24"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{animeTitle}</h3>
          <p className="text-slate-400 text-sm italic line-clamp-2">
            {synopsis}
          </p>
        </div>
      </div>
    </>
  );
}

const isOtherSource = (source: StreamSourceSelect) => {
  if (source.format == StreamFormat.OTHER) {
    return true;
  }

  const videoExtension = [
    ".mp4",
    ".mkv",
    ".webm",
    ".avi",
    ".flv",
    ".mov",
    ".m3u8",
    ".mpd",
    ".dash",
    ".hls",
  ];
  if (videoExtension.some((ext) => source.url.endsWith(ext))) {
    return false;
  }
  return true;
};
