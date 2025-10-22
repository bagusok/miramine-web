import SkeletonList from "@/components/loading/skeleton-list";

export default function Loading() {
  return (
    <main className="max-w-8xl mx-auto px-4 lg:px-10">
      <div className="h-4 rounded w-full lg:w-96 bg-secondary animate-pulse"></div>
      <div className="mt-6 grid md:grid-cols-3 gap-8">
        <div className="col-span-3 lg:col-span-2">
          <div className="w-full aspect-video bg-secondary animate-pulse"></div>
          <div className="mt-2 h-12 rounded w-full bg-secondary animate-pulse"></div>
        </div>
        <div className="w-full col-span-3 lg:col-span-1">
          <div className="h-16 rounded-xl w-full bg-secondary animate-pulse"></div>
          <div className="mt-2 h-16 rounded-xl w-full bg-secondary animate-pulse"></div>
          <div className="mt-2 h-16 rounded-xl w-full bg-secondary animate-pulse"></div>
          <div className="mt-2 h-16 rounded-xl w-full bg-secondary animate-pulse"></div>
          <div className="mt-2 h-16 rounded-xl w-full bg-secondary animate-pulse"></div>
          <div className="mt-2 h-16 rounded-xl w-full bg-secondary animate-pulse"></div>
          <SkeletonList classname="mt-4" />
        </div>
      </div>
    </main>
  );
}
