import ImageFallback from "@/components/home/image-fallback";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { db } from "@/db";

import { IMalData } from "@/lib/prisma";
import { Star } from "lucide-react";
import Link from "next/link";

export const revalidate = 43200;

export default async function AnimeOngoing() {
  const animes = await getOngoingAnime();

  return (
    <main className="max-w-8xl mx-auto relative mt-4 px-4 lg:px-10">
      <Breadcrumb className="self-start">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Anime</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Latest</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-2xl font-semibold mt-6">Anime Ongoing</h2>

      <section className="grid grid-cols-2  md:grid-cols-5 lg:grid-cols-7 gap-4 justify-start mt-4">
        {animes.data.map((anime) => (
          <Link key={anime.anime_id} href={`/anime/${anime.anime_id}`}>
            <div className="rounded-lg w-full overflow-hidden h-fit">
              <div className="w-full overflow-hidden rounded-xl aspect-[2/3] relative max-h-60 lg:max-h-80">
                <ImageFallback
                  src={anime.image_url ?? ""}
                  fallbackSrc="/preview-not-available.webp"
                  alt="thumbnail"
                  width={200}
                  height={300}
                  className="rounded-lg object-cover z-10 h-full w-full"
                />
                <span className="text-sm z-30 absolute top-2 left-2 p-1 rounded inline-flex items-center gap-1 bg-primary-foreground text-white">
                  <Star size={12} />{" "}
                  {(anime.mal_data as IMalData).score ?? "N/A"}
                </span>
                <h3 className="text-sm z-30 absolute bottom-2 left-2">
                  Episode {anime.episode}
                </h3>
                <span className="absolute bottom-0 left-0 right-0 z-20 h-1/2 bg-gradient-to-t from-primary-foreground"></span>
              </div>
              <div className="mt-2">
                <p className="font-medium line-clamp-2">{anime.anime_title}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

const getOngoingAnime = async () => {
  const anime = await db
    .with("latest_episodes", (qb) =>
      qb
        .selectFrom("anime as a")
        .where("a.status", "=", "ONGOING")
        .distinctOn("a.id")
        .innerJoin("episode as e", "e.anime_id", "a.id")
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

    .execute();

  return {
    status: true,
    data: anime,
  };
};
