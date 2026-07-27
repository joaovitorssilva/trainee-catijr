
export default function TourCard() {
  return (
    <div className="max-w-md w-full flex flex-col gap-3 bg-bg-highlight p-3 rounded-lg">
      <h2 className="text-white text-12-bold">
        Em turnê
      </h2>

      <div className="flex gap-3">
        {/* date badge */}
        <div className="w-10.5 h-10.5 flex flex-col gap-1 items-center bg-bg-base py-1.5 px-2.5 rounded-sm ">
          <span className="text-white text-8-bold">Mai.</span>
          <span className="text-white text-16-bold">24</span>
        </div>

        {/* event info */}
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-11-semibold">Los Angeles</h3>
          <p className="text-subdued text-10-medium">LNGSHOT, P1Harmony e Jay Park</p>
          <p className="text-subdued text-10-medium">dom., 18:00 • Peacock Theather</p>
        </div>
      </div>
    </div>
  )
}