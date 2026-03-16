export default function Hero() {
  return (
    <div className="flex p-8 md:p-16 @container max-w-6xl mx-auto">
      <div className="flex w-full flex-col gap-6 items-center">
        <div className="flex gap-6 flex-col items-center w-full">
          <div className="relative w-full flex justify-center">
            <div className="p-1 w-full max-w-[300px] md:max-w-[525px] aspect-square flex items-center justify-center">
              <img className="w-full h-auto object-contain" src="/logo1.png" alt="S2 Project Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
