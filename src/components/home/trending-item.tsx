"use client";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import ImageFallback from "./image-fallback";
import Link from "next/link";

export default function TrendingItem({ anime }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
        1600: {
          slidesPerView: 8,
        },

        // 1440: {
        //   slidesPerView: 8,
        // },
      }}
      navigation
      className="w-full h-full"
      autoplay={{ delay: 5000 }}
    >
      {anime.map((episode) => (
        <SwiperSlide key={episode.id}>
          <Link href={`/anime/${episode.id}`}>
            <div
              key={episode.id}
              className="rounded-lg w-full overflow-hidden h-fit"
            >
              <div className="w-full overflow-hidden rounded-xl aspect-auto relative h-72">
                <ImageFallback
                  src={episode.image_url ?? ""}
                  fallbackSrc="/preview-not-available.webp"
                  alt="thumbnail"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover object-center aspect-auto z-10 w-full h-full"
                />
                <h3 className="text-sm z-30 absolute bottom-2 left-2">
                  Episode {episode.last_episode}
                </h3>
                <span className="absolute bottom-0 left-0 right-0 z-20 h-1/2 bg-gradient-to-t from-primary-foreground"></span>
              </div>
              <div className="mt-2">
                <p className="font-medium line-clamp-1">{episode.title_show}</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
