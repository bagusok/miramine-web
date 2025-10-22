import { db } from "@/db";

export default async function Genres({}) {
  const genres = await db
    .selectFrom("_AnimeToGenres")
    .select(["B", (eb) => eb.fn.countAll().as("count")])
    .groupBy("B")
    .orderBy("B", "asc")
    .execute();

  return (
    <>
      <h3 className="text-xl font-semibold mb-4 text-primary mt-6">
        Daftar Genre
      </h3>
      <div className="rounded-2xl bg-secondary w-full col-span-3 lg:col-span-1 flex flex-wrap justify-start items-start h-fit p-2">
        {genres.map((genre) => (
          <div
            key={genre.B}
            className="rounded-lg bg-primary-foreground text-white p-2 m-2 h-fit"
          >
            {genre.B} ({genre.count})
          </div>
        ))}
      </div>
    </>
  );
}
