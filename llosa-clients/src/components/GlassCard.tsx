export default function GlassCard({
  children,
  className = "",
  hover = true,
  padding = "p-6",
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: string;
}) {
  return (
    <div
      className={`
        bg-white border border-[#e0e0e0] rounded-[14px] ${padding}
        transition-all duration-250
        ${hover ? "hover:border-[#bdbdbd] hover:shadow-[0_6px_24px_rgba(35,31,32,0.07)] hover:-translate-y-0.5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
