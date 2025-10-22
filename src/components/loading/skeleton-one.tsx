export default function SkeletonOne() {
  return (
    <div className="w-full mt-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-center place-items-center place-content-center items-center">
      {Array.from({
        length: 7,
      }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg w-full overflow-hidden h-fit animate-pulse"
        >
          <div className="w-full overflow-hidden rounded-xl aspect-auto relative h-60 bg-secondary">
            <span className="absolute top-2 left-2 p-1 rounded bg-secondary w-16 h-5"></span>
            <span className="absolute bottom-2 left-2 w-24 h-5 bg-secondary rounded"></span>
            <span className="absolute bottom-0 left-0 right-0 z-20 h-1/2 bg-gradient-to-t from-primary-foreground"></span>
          </div>
          <div className="mt-2 space-y-2">
            <div className="bg-secondary rounded h-4 w-3/4"></div>
            <div className="bg-secondary rounded h-4 w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
