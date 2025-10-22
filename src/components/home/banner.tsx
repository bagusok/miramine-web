import BannerItem from "./banner-item";
import { unstable_cache } from "next/cache";
import { db } from "@/db";

export const dynamic = "force-dynamic";

export default async function Banner() {
  const anime = await getBanner();

  return (
    <section>
      <BannerItem anime={anime} />
    </section>
  );
}

const getBanner = unstable_cache(
  async () => {
    const animeOngoing = await db
      .selectFrom("anime")
      .innerJoin("episode", "episode.anime_id", "anime.id")
      .where("anime.status", "=", "ONGOING")
      .select([
        "anime.id as id",
        "anime.title as title",
        "anime.title_show as title_show",
        "anime.image_url as image_url",
        "anime.type as type",
        "anime.sub_type as sub_type",
        "anime.status as status",
        "anime.synopsis as synopsis",
        "anime.mal_data as mal_data",
        (eb) => eb.fn.sum("episode.views").as("views"),
      ])
      .groupBy("anime.id")
      .orderBy("views", "desc")
      .limit(5)
      .execute();

    const animeCompleted = await db
      .selectFrom("anime")
      .innerJoin("episode", "episode.anime_id", "anime.id")
      .where("anime.status", "=", "COMPLETED")
      .select([
        "anime.id as id",
        "anime.title as title",
        "anime.title_show as title_show",
        "anime.image_url as image_url",
        "anime.type as type",
        "anime.sub_type as sub_type",
        "anime.status as status",
        "anime.synopsis as synopsis",
        "anime.mal_data as mal_data",
        (eb) => eb.fn.sum("episode.views").as("views"),
      ])
      .groupBy("anime.id")
      .orderBy("views", "desc")
      .limit(5)
      .execute();

    const shuffledResults: typeof animeCompleted = [];
    for (let i = 0; i < 5; i++) {
      if (animeOngoing[i]) shuffledResults.push(animeOngoing[i]);
      if (animeCompleted[i]) shuffledResults.push(animeCompleted[i]);
    }

    return shuffledResults;
  },
  ["banner-home"],
  {
    revalidate: 604800,
  }
);
