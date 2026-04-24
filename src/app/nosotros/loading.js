"use client";

export default function Loading() {
  return (
    <main className="min-h-screen pb-16 relative bg-white overflow-x-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 pt-0">
        <div className="flex flex-col space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            <div className="w-full flex justify-center lg:justify-start">
              <div className="relative w-full aspect-[4/3] lg:aspect-square xl:h-[75vh] xl:max-h-[800px] max-w-[750px]">
                <div className="absolute inset-0 bg-slate-100 animate-pulse rounded-lg" />
              </div>
            </div>

            <div className="flex flex-col justify-start space-y-6 lg:space-y-8 lg:pr-8">
              <div className="space-y-3">
                <div className="h-16 sm:h-20 lg:h-28 bg-slate-100 animate-pulse rounded-lg" />
                <div className="h-6 w-3/4 bg-slate-100 animate-pulse rounded-lg" />
              </div>

              <div className="space-y-3">
                <div className="h-8 w-48 bg-slate-100 animate-pulse rounded-lg" />
                <div className="h-20 bg-slate-100 animate-pulse rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-lg border-l-4 border-primary" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="pt-8 border-t border-slate-200 flex lg:col-start-2">
              <div className="h-16 w-72 bg-slate-100 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
