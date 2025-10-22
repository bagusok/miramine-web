import { db } from "@/db";
import { sql } from "kysely";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export default async function AllTimePopular() {
  const anime = await getPopularAnime();

  return (
    <>
      <h3 className="text-xl font-semibold mb-4 text-primary">Anime Populer</h3>

      <div className="flex flex-col gap-4">
        {anime?.map((item, index) => (
          <Link
            href={`/anime/${item.id}`}
            key={item.id}
            className="flex gap-2 items-center hover:opacity-70"
          >
            <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center">
              <h3 className="text-xl font-bold">{index + 1}</h3>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{item.title_show}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

const getPopularAnime = unstable_cache(
  async () => {
    try {
      const graphql = JSON.stringify({
        query: `query (
          $page: Int = 1
          $type: MediaType
          $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
        ) {
          Page(page: $page, perPage: 20) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            media(
              type: $type
              sort: $sort
            ) {
              id
              title {
                userPreferred
              }
              coverImage {
                extraLarge
                large
                color
              }
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              bannerImage
              season
              seasonYear
              description
              type
              format
              status(version: 2)
              episodes
              duration
              chapters
              volumes
              genres
              isAdult
              averageScore
              popularity
              nextAiringEpisode {
                airingAt
                timeUntilAiring
                episode
              }
              mediaListEntry {
                id
                status
              }
              studios(isMain: true) {
                edges {
                  isMain
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }`,
        variables: {
          page: 1,
          type: "ANIME",
          sort: ["POPULARITY_DESC"],
        },
      });

      const res = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: graphql,
        cache: "force-cache",
      });

      const resJson = await res.json();
      const titles = resJson.data.Page.media
        .map((item) => item.title.userPreferred)
        .slice(0, 12); // Ambil hanya 12 judul pertama sesuai dengan indeks > 11

      // Kysely query menggantikan Prisma
      const anime = await db
        .selectFrom("anime")
        .selectAll()
        .where(
          sql`lower(title_show)`,
          "in",
          titles.map((title: string) => title.toLowerCase())
        )
        .limit(10)
        .execute();

      return anime;
    } catch (e) {
      console.error(e);
    }
  },
  ["popular"], // Ubah key cache dari "trending" ke "popular"
  {
    revalidate: 60 * 60 * 24,
  }
);
