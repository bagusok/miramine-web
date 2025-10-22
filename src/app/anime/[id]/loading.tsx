export default function Loading() {
  return (
    <main className="max-w-8xl mx-auto px-4 lg:px-10">
      <div className="h-4 rounded w-96 bg-secondary animate-pulse"></div>
      <div className="mt-6 grid grid-flow-row md:grid-cols-3 gap-20">
        <div className="col-span-3 lg:col-span-2 flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <div className="rounded-xl overflow-hidden relative shrink-0 shadow-primary/20 h-72 aspect-[2/3] bg-secondary animate-pulse"></div>
          <div className="h-fit w-full">
            <div className="h-4 rounded w-full bg-secondary animate-pulse"></div>
            <div className="h-8 rounded w-full bg-secondary animate-pulse"></div>
            <div className="flex gap-2 mt-8 justify-center lg:justify-start">
              <div className="w-28 h-10 rounded-full bg-secondary animate-pulse"></div>
              <div className="w-28 h-10 rounded-full bg-secondary animate-pulse"></div>
            </div>
            <div className="mt-8 h-2 rounded w-full bg-secondary animate-pulse"></div>
            <div className="mt-1 h-2 rounded w-full bg-secondary animate-pulse"></div>
            <div className="mt-1 h-2 rounded w-full bg-secondary animate-pulse"></div>
            <div className="mt-1 h-2 rounded w-full bg-secondary animate-pulse"></div>
            <div className="mt-1 h-2 rounded w-full bg-secondary animate-pulse"></div>
            <div className="mt-1 h-2 rounded w-full bg-secondary animate-pulse"></div>
            <div className="mt-1 h-2 rounded w-full bg-secondary animate-pulse"></div>
            <div className="mt-1 h-2 rounded w-full bg-secondary animate-pulse"></div>
            <div className="mt-1 h-2 rounded w-full bg-secondary animate-pulse"></div>
          </div>
        </div>
        <div className="w-full col-span-3 lg:col-span-1">
          <div className="flex justify-between items-center mb-2">
            <div className="h-8 rounded w-full bg-secondary animate-pulse"></div>
            <div className="h-8 rounded w-16 bg-secondary animate-pulse"></div>
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-xl w-full bg-secondary animate-pulse mb-2"
            ></div>
          ))}
        </div>
      </div>
    </main>
  );
}
