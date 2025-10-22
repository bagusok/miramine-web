import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { db } from "@/db";
import Episodes from "../../[id]/episodes";
import Error from "./error";
import VideoPlayer from "./video-player";
import { StreamType } from "@/db/enums";
import { StreamSourceSelect } from "@/db/custom.type";

export default async function AnimeWatch({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const episode = await getEpisodeDetail(id);

  if (!episode.status) {
    return <Error />;
  }

  return (
    <main className="max-w-8xl mx-auto px-4 lg:px-10">
      <Breadcrumb className="self-start">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/anime">Anime</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Watch</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">
              {episode.data?.anime_title_show}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="mt-2 grid grid-flow-row md:grid-cols-3 gap-8">
        <div className="col-span-3 lg:col-span-2 flex flex-col items-center lg:items-start gap-2">
          <VideoPlayer
            animeTitle={episode.data?.anime_title as string}
            episode={episode.data?.episode as string}
            image={episode.data?.anime_image_url as string}
            synopsis={episode.data?.anime_synopsis as string}
            streamSource={episode.data!.stream_source}
          />
        </div>
        <Episodes
          animeId={episode.data?.anime_id as string}
          activeEpisodeId={id}
        />
      </section>
      <section className="gap-8"></section>
    </main>
  );
}

const getEpisodeDetail = async (id: string) => {
  try {
    const anime = await db
      .selectFrom("episode as e")
      .innerJoin("anime as a", "a.id", "e.anime_id")
      .select([
        "a.id as anime_id",
        "a.title as anime_title",
        "a.title_show as anime_title_show",
        "a.image_url as anime_image_url",
        "a.synopsis as anime_synopsis",
        "a.created_at as anime_created_at",
        "e.episode",
        "e.views",
        "e.created_at",
      ])
      .where("e.id", "=", id)
      .executeTakeFirstOrThrow();
    const streams = await db
      .selectFrom("stream_source")
      .select(["id", "quality", "format", "url", "created_at"])
      .where("episode_id", "=", id)
      .where("type", "=", StreamType.DIRECT)
      .where((eb) =>
        eb.not(
          eb.and([
            eb("format", "=", "M3U8"),
            eb.or([
              eb("url", "like", "%exafiles%"),
              eb("url", "like", "%animeplay%"),
            ]),
          ])
        )
      )
      .orderBy("quality", "desc")
      .orderBy("created_at", "desc")
      .$assertType<StreamSourceSelect>()
      .execute();

    return {
      status: true,
      data: {
        ...anime,
        stream_source: streams,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
    };
  }
};
