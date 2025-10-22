"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { searchAnime } from "./actions";
import Link from "next/link";
import ImageFallback from "@/components/home/image-fallback";

const initialState = {
  status: false,
  message: "",
  data: [],
};

export default function Search() {
  const [state, formAction, isPending] = useActionState(
    searchAnime,
    initialState
  );

  return (
    <main className="max-w-8xl mx-auto px-4 lg:px-10 flex flex-col items-center min-h-svh relative">
      <h2 className="text-4xl font-semibold mt-10 text-center">
        Cari Anime Favoritmu
      </h2>
      <form action={formAction} className="flex flex-col items-center w-full">
        <div className="w-full md:w-3/4 lg:w-2/3 mt-10">
          <Input
            placeholder="Kembar 5 Goblok"
            className="h-16 rounded-xl bg-secondary"
            name="query"
            required
          />
        </div>
        <Button
          className="mt-6 rounded-full px-8 py-6 text-lg"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Cari"}
        </Button>
      </form>

      {isPending && (
        <div className="w-full mt-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-center place-items-center place-content-center items-center">
          {Array.from({
            length: 7,
          }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg w-full overflow-hidden h-fit animate-pulse"
            >
              <div className="w-full overflow-hidden rounded-xl aspect-auto relative h-60 bg-secondary">
                <span className="absolute top-2 left-2 p-1 rounded bg-secondary w-16 h-5"></span>
                <span className="absolute bottom-2 left-2 w-24 h-5 bg-secondary rounded"></span>
                <span className="absolute bottom-0 left-0 right-0 z-20 h-1/2 bg-gradient-to-t from-primary-foreground"></span>
              </div>
              <div className="mt-2 space-y-2">
                <div className="bg-secondary rounded h-4 w-3/4"></div>
                <div className="bg-secondary rounded h-4 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {state.status && !isPending ? (
        <div className="w-full mt-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-center place-items-center place-content-center items-center">
          {state.data.map((anime) => (
            <Link key={anime.id} href={`/anime/${anime.id}`}>
              <div className="rounded-lg w-full overflow-hidden h-fit">
                <div className="w-full overflow-hidden rounded-xl aspect-auto relative h-full max-h-60 lg:max-h-80">
                  <ImageFallback
                    src={anime.image_url ?? ""}
                    fallbackSrc="/preview-not-available.webp"
                    alt="thumbnail"
                    width={200}
                    height={300}
                    className="rounded-lg object-cover z-10 h-full w-full"
                  />
                  <span className="text-sm z-30 absolute top-2 left-2 p-1 rounded inline-flex items-center gap-1 bg-primary-foreground text-white">
                    {anime.status}
                  </span>
                  <h3 className="text-sm z-30 absolute bottom-2 left-2">
                    Episode {anime.last_episode}
                  </h3>
                  <span className="absolute bottom-0 left-0 right-0 z-20 h-1/2 bg-gradient-to-t from-primary-foreground"></span>
                </div>
                <div className="mt-2">
                  <p className="font-medium line-clamp-2">{anime.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-10">{state.message}</p>
      )}
    </main>
  );
}
