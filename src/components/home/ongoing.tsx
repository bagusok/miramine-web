import { IMalData } from "@/lib/prisma";
import ImageFallback from "./image-fallback";
import { ChevronRight, StarIcon } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { unstable_cache } from "next/cache";

export default async function OngoingAnime() {
  const anime = await getAnime(12, 0);

  return (
    <section className="mt-4">
      <div className="mb-6 flex justify-between items-end">
        <h3 className="text-xl font-semibold text-primary">Sedang Tayang</h3>
        <Link
          href="/anime/ongoing"
          className="inline-flex items-center space-x-1 text-sm hover:opacity-80"
        >
          Lihat Semua
          <ChevronRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-start">
        {anime.map((anime) => (
          <Link key={anime.anime_id} href={`/anime/${anime.anime_id}`}>
            <div className="rounded-lg w-full overflow-hidden h-fit">
              <div className="w-full overflow-hidden rounded-xl aspect-auto relative h-60">
                <ImageFallback
                  src={anime.image_url ?? ""}
                  fallbackSrc="/preview-not-available.webp"
                  alt="thumbnail"
                  width={200}
                  height={300}
                  className="rounded-lg object-cover z-10 h-full"
                />
                <span className="text-sm z-30 absolute top-2 left-2 p-1 rounded inline-flex items-center gap-1 bg-primary-foreground text-white">
                  <StarIcon size={12} /> {(anime.mal_data as IMalData).score}
                </span>
                <h3 className="text-sm z-30 absolute bottom-2 left-2">
                  Episode {anime.last_episode}
                </h3>
                <span className="absolute bottom-0 left-0 right-0 z-20 h-1/2 bg-gradient-to-t from-primary-foreground"></span>
              </div>
              <div className="mt-2">
                <p className="font-medium line-clamp-2">{anime.anime_title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const getAnime = unstable_cache(
  async (limit = 12, offset = 0) => {
    const anime = await db
      .selectFrom("anime")
      .select([
        "id as anime_id",
        "title as anime_title",
        "image_url",
        "mal_data",
        "last_episode",
      ])
      .where("status", "=", "ONGOING")
      .orderBy("created_at", "desc")
      .limit(limit)
      .offset(offset)
      .execute();

    return anime;
  },
  ["ongoing"],
  {
    revalidate: 60 * 60 * 24,
  }
);
