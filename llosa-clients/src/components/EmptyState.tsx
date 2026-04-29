export default function EmptyState({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-[#f5f5f5] border border-[#e0e0e0] flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[36px] text-[#bdbdbd]">{icon}</span>
      </div>
      <h3 className="text-[17px] font-bold text-[#757575] mb-2">{title}</h3>
      <p className="text-[13px] text-[#bdbdbd] max-w-xs text-center leading-relaxed">{description}</p>
    </div>
  );
}
