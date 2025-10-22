import TrendingItem from "./trending-item";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { sql } from "kysely";

export default async function TrendingAnime() {
  const anime = await getTrendingAnime();

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-4">Trending 🔥</h3>
      <TrendingItem anime={anime} />
    </section>
  );
}

const getTrendingAnime = unstable_cache(
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
          sort: ["TRENDING_DESC", "POPULARITY_DESC"],
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
      const titles = resJson.data.Page.media.map(
        (item) => item.title.userPreferred
      );

      const anime = await db
        .selectFrom("anime")
        .selectAll()
        .where(
          sql`lower(title_show)`,
          "in",
          titles.map((title) => title.toLowerCase())
        )
        .execute();

      return anime;
    } catch (e) {
      console.error(e);
    }
  },
  ["trending"],
  {
    revalidate: 60 * 60 * 24,
  }
);
