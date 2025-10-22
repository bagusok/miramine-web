import { db } from "@/db";
import { formatViews } from "@/lib/format";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export default async function MostViewed() {
  const anime = await getPopularAnime();

  return (
    <>
      <h3 className="text-xl font-semibold mb-4 text-primary mt-6">
        Paling Banyak Ditonton
      </h3>

      <div className="flex flex-col gap-4">
        {anime?.map((item, index) => (
          <Link
            href={`/anime/${item.id}`}
            key={item.id}
            className="flex gap-2 items-center hover:opacity-70"
          >
            <div className="w-12 h-12 aspect-square rounded bg-primary/20 flex items-center justify-center shrink-0">
              <h3 className="text-xl font-bold">{index + 1}</h3>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold line-clamp-1">{item.title}</h3>
              <span className="text-xs text-muted-foreground">
                {formatViews((item.views as number) ?? 0)} kali ditonton
              </span>
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
      const anime = await db
        .selectFrom("anime as a")
        .innerJoin("episode as e", "e.anime_id", "a.id")
        .select([
          "a.title_show as title",
          "a.id as id",
          (eb) => eb.fn.sum("e.views").as("views"),
        ])
        .groupBy("a.id")
        .orderBy("views", "desc")
        .limit(10)
        .execute();

      return anime;
    } catch (e) {
      console.error(e);
    }
  },
  ["most-viewed"],
  {
    revalidate: 60 * 60 * 24,
  }
);
