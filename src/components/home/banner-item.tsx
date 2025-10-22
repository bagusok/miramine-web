"use client";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Button } from "../ui/button";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import { IMalData } from "@/lib/prisma";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";

export default function BannerItem({ anime }) {
  const router = useRouter();

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className="w-full h-full"
      autoplay={{ delay: 5000 }}
    >
      {anime.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="w-full grid lg:lg:grid-cols-8 h-[65dvh] max-h-[500px] relative mb-16 lg:px-10">
            <div className="lg:col-span-3 flex flex-col justify-end">
              <h2 className="font-bold text-primary text-center lg:text-start ">
                # Populer
              </h2>
              <h2 className="text-4xl font-bold mt-2 line-clamp-2 text-center lg:text-start [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
                {item.title_show}
              </h2>
              <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start">
                <span className="bg-purple-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {item.sub_type}
                </span>
                <span className="bg-purple-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                  {(item.mal_data as IMalData).year ?? ""}
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                  {item.status}
                </span>
                <span className="bg-purple-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 inline-flex items-center gap-1">
                  <Star size={12} /> {(item.mal_data as IMalData).score}
                </span>
                <span className="bg-purple-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  {(item.mal_data as IMalData).rating}
                </span>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm line-clamp-4 mt-8 ">{item.synopsis}</p>
              </div>
              <div className="flex gap-4 mt-10 justify-center lg:justify-start">
                <Button
                  onClick={() =>
                    router.push(`/watch/${item.latest_episode_id}`)
                  }
                  className="rounded-full text-base"
                >
                  <Play size={14} />
                  Tonton Sekarang
                </Button>
                <Button
                  onClick={() => router.push(`/anime/${anime.id}`)}
                  variant="secondary"
                  className="rounded-full text-base"
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-2/3 h-full absolute top-0 right-0 bottom-0 -z-40">
              <Image
                src={item.image_url ?? ""}
                alt="thumbnail"
                layout="fill"
                className="-z-20 object-cover object-center "
              />
              <span className="-z-10 h-1/3 absolute top-0 left-0 right-0 bg-gradient-to-b from-primary-foreground"></span>
              <span className="-z-10 h-1/2 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-foreground"></span>
              <span className="hidden lg:block -z-10 w-1/2 absolute top-0 bottom-0 left-0 bg-gradient-to-r from-primary-foreground"></span>
              <span className="hidden lg:block -z-10 w-1/3 absolute top-0 bottom-0 right-0 bg-gradient-to-l from-primary-foreground"></span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
