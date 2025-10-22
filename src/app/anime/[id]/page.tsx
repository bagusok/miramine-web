import ImageFallback from "@/components/home/image-fallback";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlayIcon } from "lucide-react";

import Error from "./error";
import { db } from "@/db";
import Episodes from "./episodes";

export default async function AnimeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const animeDetail = await getAnimeDetail(id);
  if (!animeDetail.status) {
    return <Error />;
  }

  return (
    <main className="max-w-8xl mx-auto px-4 lg:px-10">
      <div className="mt-6 grid grid-flow-row md:grid-cols-3 gap-20">
        <div className="col-span-3 lg:col-span-2 flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <Breadcrumb className="block lg:hidden self-start">
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
                <BreadcrumbPage>{id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="rounded-xl overflow-hidden aspect-auto relative shrink-0 shadow-[40px_0px_80px_2px] shadow-primary/20 h-fit w-fit">
            <ImageFallback
              src={animeDetail.data?.image_url ?? ""}
              fallbackSrc="/preview-not-available.webp"
              alt="thumbnail"
              width={200}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="h-fit">
            <Breadcrumb className="hidden lg:block">
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
                  <BreadcrumbPage>{id}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h2 className="text-4xl font-semibold mt-2 text-center lg:text-start">
              {animeDetail.data?.title_show}
            </h2>
            <div className="flex gap-2 mt-8 justify-center lg:justify-start">
              <Button
                variant="default"
                className="text-lg font-semibold text-secondary-foreground rounded-full"
              >
                <PlayIcon size={24} />
                Tonton
              </Button>
              <Button
                variant="secondary"
                className="text-secondary-foreground rounded-full text-lg"
              >
                <HeartIcon size={24} />
                Whistlist
              </Button>
            </div>
            <p className="text-slate-400 text-sm italic mt-6 line-clamp-6 text-center lg:text-start">
              {animeDetail.data?.synopsis}
            </p>
          </div>
        </div>
        <Episodes animeId={id} />
      </div>
    </main>
  );
}

const getAnimeDetail = async (id: string) => {
  try {
    const anime = await db
      .selectFrom("anime")
      .select([
        "id",
        "title",
        "title_show",
        "image_url",
        "synopsis",
        "created_at",
        "mal_data",
      ])
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    // const episodes = await db
    //   .selectFrom("episode")
    //   .select(["id", "title", "episode", "views", "order", "created_at"])
    //   .where("anime_id", "=", id)
    //   .orderBy("order", "asc")
    //   .execute();

    return {
      status: true,
      data: {
        ...anime,
        // episode: episodes,
      },
    };
  } catch (error) {
    console.error(error, id);
    return {
      status: false,
    };
  }
};
