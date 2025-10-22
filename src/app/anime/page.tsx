import ImageFallback from "@/components/home/image-fallback";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Fragment } from "react";

export const revalidate = 43200;

export default async function Anime({}) {
  const animes = await getAllAnime();

  return (
    <main className="max-w-8xl mx-auto px-4 relative">
      <section className="px-4 lg:px-10 my-10" id="all">
        <h2 className="text-2xl font-semibold">Semua Anime</h2>
        <div className="flex flex-wrap text-sm gap-4 mt-4">
          {animes.data.map((group) => (
            <Button key={group.type} size="icon" asChild>
              <Link href={`#${group.type}`}>{group.type}</Link>
            </Button>
          ))}
        </div>
      </section>
      {animes.data.map((group) => (
        <Fragment key={group.type}>
          <section className="mt-10">
            <div
              className="sticky top-16 left-10 p-4 backdrop-blur-md px-4 lg:px-10"
              id={group.type}
            >
              <h3 className="text-5xl font-medium">{group.type}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start mt-10 px-4 lg:px-10">
              {group.items.map((anime) => (
                <Link
                  key={anime.id}
                  href={`/anime/${anime.id}`}
                  className="flex gap-4"
                >
                  <div className="shrink-0">
                    <ImageFallback
                      src={anime.image_url ?? ""}
                      fallbackSrc="/preview-not-available.webp"
                      alt="thumbnail"
                      width={200}
                      height={300}
                      className="rounded-lg object-cover w-24"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg line-clamp-2">
                      {anime.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Fragment>
      ))}
    </main>
  );
}

const getAllAnime = async () => {
  const anime = await prisma.anime.findMany({
    orderBy: {
      title: "asc",
    },
    select: {
      id: true,
      title: true,
      image_url: true,
      status: true,
      last_episode: true,
      mal_data: true,
    },
  });

  const grouped = {};

  anime.forEach((item) => {
    const firstLetter = item.title[0].toUpperCase();

    if (/^[A-Z]$/.test(firstLetter)) {
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = { type: firstLetter, items: [] };
      }

      grouped[firstLetter].items.push(item);
    } else {
      if (!grouped["#"]) {
        grouped["#"] = { type: "#", items: [] };
      }
      grouped["#"].items.push(item);
    }
  });

  const result = Object.values(grouped);

  return {
    status: true,
    data: result as {
      type: string;
      items: Anime[];
    }[],
  };
};

type Anime = {
  id: string;
  title: string;
  image_url: string;
  status: string;
  last_episode: string;
  mal_data?: string;
};
