"use client";

export default function Lightbox({
  src,
  type = "image",
  alt = "",
  caption,
  onClose,
}: {
  src: string;
  type?: "image" | "video";
  alt?: string;
  caption?: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#231f20]/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
      >
        <span className="material-symbols-outlined text-white text-[22px]">close</span>
      </button>

      <div
        className="max-w-[90vw] max-h-[85vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {type === "video" ? (
          <video src={src} controls autoPlay className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl" />
        ) : (
          <img src={src} alt={alt} className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain" />
        )}
        {caption && (
          <p className="text-center text-[13px] text-white/70 mt-4 font-medium">{caption}</p>
        )}
      </div>
    </div>
  );
}
