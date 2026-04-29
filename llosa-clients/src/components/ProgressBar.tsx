"use client";
import { useEffect, useState } from "react";

export default function ProgressBar({
  value,
  label,
  showPercent = true,
  height = 6,
}: {
  value: number;
  label?: string;
  showPercent?: boolean;
  height?: number;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-[12px] font-semibold text-[#757575]">{label}</span>}
          {showPercent && (
            <span className="text-[13px] font-bold text-[#023143]">{value}%</span>
          )}
        </div>
      )}
      <div
        className="w-full bg-[#e0e0e0] rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out bg-[#023143]"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
