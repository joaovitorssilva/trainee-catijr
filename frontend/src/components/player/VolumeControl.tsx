import { useRef, useState } from "react";
import VolumeIcon from "@/assets/icons/volume-icon.svg"
import OpenIcon from "@/assets/icons/open-now-playing-page-icon.svg"

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
}

export default function VolumeControl({ volume, onChange }: VolumeControlProps) {
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const getPercentFromEvent = (e: React.MouseEvent): number => {
    if (!trackRef.current) return 0;
    const { left, width } = trackRef.current.getBoundingClientRect();
    return Math.min(Math.max(((e.clientX - left) / width) * 100, 0), 100);
  }

  return (
    <div className="flex items-center gap-2 ">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(volume === 0 ? 50 : 0)}>
          <img
            src={VolumeIcon}
            alt="Volume Icon"
          />
        </button>
        <div
          ref={trackRef}
          onClick={(e) => onChange(getPercentFromEvent(e))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={(e) => { if (isDragging) onChange(getPercentFromEvent(e)) }}
          onMouseLeave={() => setIsDragging(false)}
          className="relative flex-1 h-1 bg-track-bar rounded-full w-[70px] cursor-pointer group"
        >
          {/* Fill */}
          <div
            className="absolute left-0 top-0 h-full bg-white group-hover:bg-primary rounded-full transition-colors duration-150"
            style={{ width: `${volume}%` }}
          />

          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${volume}%` }}
          />
        </div>
      </div>

      <button className="cursor-pointer">
        <img
          src={OpenIcon}
          alt=""
        />
      </button>
    </div>
  )
}