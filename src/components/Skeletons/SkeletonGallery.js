'use client';

export default function SkeletonGallery() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="h-4 w-96 bg-slate-100 rounded-lg animate-pulse"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="mb-12 flex flex-col md:flex-row justify-between gap-6">
          <div className="h-12 w-full max-w-md bg-slate-100 rounded-2xl animate-pulse"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-20 bg-slate-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-[4/5] bg-slate-100 rounded-2xl animate-pulse overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-200 to-transparent"></div>
              <div className="absolute bottom-6 left-6 space-y-2 w-[70%]">
                <div className="h-4 w-full bg-slate-200 rounded"></div>
                <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
