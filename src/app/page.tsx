import AllTimePopular from "@/components/home/all-time-popular";
import Banner from "@/components/home/banner";
import Genres from "@/components/home/genres";
import LatestAnime from "@/components/home/latest";
import LatestCompleted from "@/components/home/latest-completed";
import LatestMovie from "@/components/home/latest-movie";
import SkeletonOne from "@/components/loading/skeleton-one";
import SkeletonSquare from "@/components/loading/skeleton-square";
import SkeletonList from "@/components/loading/skeleton-list";
import TrendingAnime from "@/components/home/trending";
import { Button } from "@/components/ui/button";

import { Suspense } from "react";
import OngoingAnime from "@/components/home/ongoing";
import MostViewed from "@/components/home/most-viewed";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <main className="max-w-8xl mx-auto">
        <Suspense
          fallback={
            <div className="w-full h-2/3 bg-secondary rounded-2xl animate-pulse"></div>
          }
        >
          <Banner />
        </Suspense>
        <div className="px-4 lg:px-10">
          <Suspense fallback={<SkeletonOne />}>
            <TrendingAnime />
          </Suspense>
        </div>

        <div className="grid grid-flow-row lg:grid-cols-4 gap-6 mt-14 px-4 lg:px-10">
          <div className="col-span-3">
            <Suspense fallback={<SkeletonOne />}>
              <LatestAnime />
            </Suspense>
            <Suspense fallback={<SkeletonOne />}>
              <OngoingAnime />
            </Suspense>
            <Suspense fallback={<SkeletonOne />}>
              <LatestMovie />
            </Suspense>
            <div className="my-4 w-full rounded-2xl bg-secondary h-60 flex justify-center items-center">
              <Button>Space Iklan</Button>
            </div>
          </div>

          <aside>
            <Suspense fallback={<SkeletonList classname="mt-4" />}>
              <AllTimePopular />
            </Suspense>
            <Suspense fallback={<SkeletonList classname="mt-4" />}>
              <MostViewed />
            </Suspense>
            <Suspense fallback={<SkeletonSquare />}>
              <Genres />
            </Suspense>
          </aside>
        </div>
        <div className="px-4 lg:px-10">
          <Suspense fallback={<SkeletonOne />}>
            <LatestCompleted />
          </Suspense>
        </div>
      </main>
    </>
  );
}
