import { cn } from "@/lib/utils";

export default function SkeletonList({
  classname = "",
}: {
  classname?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", classname)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex gap-2">
          <div className="w-16 h-16 bg-secondary animate-pulse rounded-xl"></div>
          <div className="flex flex-col gap-1 w-full">
            <div className="w-3/4 h-4 bg-secondary animate-pulse rounded"></div>
            <div className="w-1/2 h-4 bg-secondary animate-pulse rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
