import ImageFallback from "@/components/home/image-fallback";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { IMalData } from "@/lib/prisma";
import { Star } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { db } from "@/db";
import { AnimeStatus } from "@/db/enums";

export const revalidate = 43200;

export default async function schedulechedule() {
  const schedule = await getSchedule();

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
            <BreadcrumbLink href="/components">Schedule</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-2xl font-semibold mt-6">Jadwal Tayang</h2>

      <Tabs defaultValue="Mondays" className="w-full">
        <ScrollArea>
          <TabsList className="flex gap-4 mt-4 justify-start w-fit p-4 rounded-full">
            {schedule.data.map((group) => (
              <TabsTrigger
                key={group.day}
                value={group.day}
                className="rounded-full data-[state=active]:bg-primary"
              >
                {group.day}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>

        {schedule.data.map((group) => (
          <TabsContent key={group.day} value={group.day} className="mt-8">
            <section className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-2 lg:gap-4 justify-start mt-4">
              {group.data.map((anime) => (
                <Link key={anime.id} href={`/anime/${anime.id}`}>
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
                        Episode {anime.last_episode}
                      </h3>
                      <span className="absolute bottom-0 left-0 right-0 z-20 h-1/2 bg-gradient-to-t from-primary-foreground"></span>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium line-clamp-2">
                        {anime.title_show}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
const getSchedule = async () => {
  const anime = await db
    .selectFrom("anime")
    .select([
      "id",
      "title as title_show",
      "image_url",
      "mal_data",
      "last_episode",
    ])
    .where("status", "=", AnimeStatus.ONGOING)
    .execute();

  const days = [
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
    "Sundays",
    "Unknown",
  ];

  type ScheduleGroup = {
    day: string;
    data: typeof anime;
  };

  const result: ScheduleGroup[] = days.map((day) => ({ day, data: [] }));

  anime.forEach((item) => {
    const day = (item.mal_data as IMalData)?.broadcast?.day || "Unknown";
    const formattedDay = day.endsWith("s") ? day : `${day}s`;
    const group =
      result.find((g) => g.day === formattedDay) ||
      result.find((g) => g.day === "Unknown");

    if (group) {
      group.data.push(item);
    }
  });

  return {
    status: true,
    data: result,
  };
};
