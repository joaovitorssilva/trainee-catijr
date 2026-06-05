
import TrackCover from "../../assets/track-cover1.png";

export default function TrackInfo() {
  return (
    <div className="flex items-center gap-3">
      <img src={TrackCover} alt="Track Cover" className="w-12 h-12 rounded" />
      <div className="flex flex-col">
        <span className="text-sm text-white font-semibold">Righ Back!</span>
        <span className="text-xs text-[#b3b3b3]">Karlee Girl</span>
      </div>
    </div>
  );  
}