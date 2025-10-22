import { IMalData } from "@/lib/prisma";
import ImageFallback from "./image-fallback";
import { ChevronRight, StarIcon } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";

export default async function LatestMovie() {
  // const anime = await prisma.$queryRawTyped(getLatestUpdateMovie(6));
  const anime = await getAnime(6, 0);

  return (
    <section className="mt-4">
      <div className="mb-6 flex justify-between items-end">
        <h3 className="text-xl font-semibold text-primary">Movie Terbaru</h3>
        <Link
          href="/anime/latest?type=Movie"
          className="inline-flex items-center space-x-1 text-sm hover:opacity-80"
        >
          Lihat Semua
          <ChevronRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-start">
        {anime.map((episode) => (
          <Link key={episode.episode_id} href={`/anime/${episode.anime_id}`}>
            <div className="rounded-lg w-full overflow-hidden h-fit">
              <div className="w-full overflow-hidden rounded-xl aspect-auto relative h-60">
                <ImageFallback
                  src={episode.image_url ?? ""}
                  fallbackSrc="/preview-not-available.webp"
                  alt="thumbnail"
                  width={200}
                  height={300}
                  className="rounded-lg object-cover z-10 h-full"
                />
                <span className="text-sm z-30 absolute top-2 left-2 p-1 rounded inline-flex items-center gap-1 bg-primary-foreground text-white">
                  <StarIcon size={12} /> {(episode.mal_data as IMalData).score}
                </span>
                <h3 className="text-sm z-30 absolute bottom-2 left-2">
                  Episode {episode.episode}
                </h3>
                <span className="absolute bottom-0 left-0 right-0 z-20 h-1/2 bg-gradient-to-t from-primary-foreground"></span>
              </div>
              <div className="mt-2">
                <p className="font-medium line-clamp-2">
                  {episode.anime_title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const getAnime = async (limit = 12, offset = 0) => {
  const anime = await db
    .with("latest_episodes", (qb) =>
      qb
        .selectFrom("anime as a")
        .distinctOn("a.id")
        .innerJoin("episode as e", "e.anime_id", "a.id")
        .where("a.sub_type", "=", "Movie")
        .select([
          "a.id as anime_id",
          "e.id as episode_id",
          "a.title as anime_title",
          "e.title as episode_title",
          "a.image_url",
          "e.episode",
          "a.mal_data",
          "e.created_at",
        ])
        .orderBy("a.id")
        .orderBy("e.created_at", "desc")
    )
    .selectFrom("latest_episodes")
    .selectAll()
    .orderBy("created_at", "desc")
    .limit(limit)
    .offset(offset)
    .execute();

  return anime;
};
