"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiClient } from "@/lib/api-client";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Eye, Play } from "lucide-react";
import Link from "next/link";

export default function Episodes({
  animeId,
  activeEpisodeId = null,
}: {
  animeId: string;
  activeEpisodeId?: string | null;
}) {
  const episodes = useQuery({
    queryKey: ["episodes", animeId],
    queryFn: () =>
      apiClient
        .get(`/api/anime/get-episode?anime_id=${animeId}`)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          throw Error("Failed to fetch episodes");
        }),
  });

  return (
    <div className="w-full col-span-3 lg:col-span-1">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Episode</h3>
        <Select>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Terbaru" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Terbaru</SelectItem>
            <SelectItem value="old">Terlama</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {episodes.isError && <p>Error: {episodes.error.message}</p>}
      {episodes.isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-16 rounded-xl w-full bg-secondary animate-pulse mt-2"
          ></div>
        ))}
      {episodes.isSuccess && (
        <ScrollArea className="h-96 mt-2">
          <ul className="flex flex-col gap-2">
            {episodes.data.data?.map((episode) => (
              <Link
                key={episode.id}
                href={`/anime/watch/${episode.id}`}
                passHref
              >
                <li className="flex items-center gap-4 bg-secondary p-2 rounded hover: cursor-pointer hover:opacity-80">
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      className="text-secondary-foreground rounded-full"
                    >
                      <Play
                        size={12}
                        className={cn({
                          "animate-spin ease-in-out duration-1000":
                            episode.id === activeEpisodeId,
                        })}
                      />
                    </Button>
                  </div>
                  <div className="w-full">
                    <h3 className="font-medium">Episode {episode.episode}</h3>
                    <div className="w-full flex mt-2 items-center justify-between gap-2">
                      <span className="text-xs">
                        {formatDate(episode.created_at)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Eye size={10} />
                        <p className="text-xs">{episode.views}</p>
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
