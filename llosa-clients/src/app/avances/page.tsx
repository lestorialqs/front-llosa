"use client";
import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import Lightbox from "@/components/Lightbox";
import EmptyState from "@/components/EmptyState";

type Update = { id: number; title: string; description: string; date: string; stage: string; type: "photo" | "video" };

const updates: Update[] = [
  { id: 1, title: "Vista aérea del proyecto", description: "Fotografía con drone mostrando el avance general del edificio hasta el piso 10.", date: "28 abr, 2024", stage: "Estructura", type: "photo" },
  { id: 2, title: "Encofrado del piso 10", description: "Proceso de encofrado completado para la losa del piso 10.", date: "25 abr, 2024", stage: "Estructura", type: "photo" },
  { id: 3, title: "Video de avance semanal", description: "Resumen en video del avance de la semana 16.", date: "22 abr, 2024", stage: "Estructura", type: "video" },
  { id: 4, title: "Instalación de columnas — Piso 9", description: "Columnas de concreto armado instaladas en el piso 9.", date: "18 abr, 2024", stage: "Estructura", type: "photo" },
  { id: 5, title: "Vista frontal del edificio", description: "Progreso visible desde la avenida principal.", date: "15 abr, 2024", stage: "Estructura", type: "photo" },
  { id: 6, title: "Vaciado de concreto — Piso 8", description: "Vaciado de concreto premezclado f'c 280 para la losa del piso 8.", date: "10 abr, 2024", stage: "Estructura", type: "photo" },
  { id: 7, title: "Time-lapse mensual — Marzo", description: "Video time-lapse mostrando 30 días de construcción.", date: "31 mar, 2024", stage: "Estructura", type: "video" },
  { id: 8, title: "Refuerzo sísmico instalado", description: "Muros de corte y refuerzos sísmicos según normativa E.030.", date: "20 mar, 2024", stage: "Estructura", type: "photo" },
  { id: 9, title: "Cimentación completada", description: "Pilotes de 18m instalados y verificados.", date: "15 ene, 2024", stage: "Cimentación", type: "photo" },
];

const stages = ["Todos", "Estructura", "Cimentación"];

export default function AvancesPage() {
  const [tab, setTab] = useState<"fecha" | "etapa">("fecha");
  const [stageFilter, setStageFilter] = useState("Todos");
  const [lightboxItem, setLightboxItem] = useState<Update | null>(null);

  const filtered = stageFilter === "Todos" ? updates : updates.filter(u => u.stage === stageFilter);

  const groupedByDate: Record<string, Update[]> = {};
  filtered.forEach(u => {
    const monthKey = u.date.split(",")[0].split(" ").slice(-2).join(" ");
    if (!groupedByDate[monthKey]) groupedByDate[monthKey] = [];
    groupedByDate[monthKey].push(u);
  });
  const groupedByStage: Record<string, Update[]> = {};
  filtered.forEach(u => {
    if (!groupedByStage[u.stage]) groupedByStage[u.stage] = [];
    groupedByStage[u.stage].push(u);
  });
  const grouped = tab === "fecha" ? groupedByDate : groupedByStage;

  return (
    <ClientLayout>
      {lightboxItem && (
        <Lightbox src="" type={lightboxItem.type === "video" ? "video" : "image"} alt={lightboxItem.title}
          caption={`${lightboxItem.title} — ${lightboxItem.date}`} onClose={() => setLightboxItem(null)} />
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-[28px] font-bold text-[#231f20] tracking-tight">Avances de Obra</h1>
          <p className="text-[14px] text-[#9e9e9e] mt-1">Galería visual del progreso de tu proyecto</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#9e9e9e] font-medium">Organizar por:</span>
          <button onClick={() => setTab("fecha")} className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${tab === "fecha" ? "bg-[#023143] text-white" : "text-[#757575] hover:text-[#023143]"}`}>Fecha</button>
          <button onClick={() => setTab("etapa")} className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${tab === "etapa" ? "bg-[#023143] text-white" : "text-[#757575] hover:text-[#023143]"}`}>Etapa</button>
        </div>
      </div>

      <div className="flex gap-2 animate-slide-up delay-100">
        {stages.map(s => (
          <button key={s} onClick={() => setStageFilter(s)} className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${
            stageFilter === s ? "bg-[#023143] text-white" : "bg-white border border-[#e0e0e0] text-[#757575] hover:border-[#023143]/30"
          }`}>{s}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="photo_library" title="Aún no hay avances disponibles" description="Las fotos y videos de avance se publicarán conforme avance la obra" />
      ) : (
        <div className="space-y-8 animate-fade-in">
          {Object.entries(grouped).map(([groupKey, items]) => (
            <div key={groupKey}>
              <h3 className="text-[14px] font-bold text-[#757575] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">{tab === "fecha" ? "calendar_today" : "construction"}</span>
                {groupKey}
                <span className="text-[11px] text-[#bdbdbd] font-medium">({items.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((item) => (
                  <button key={item.id} onClick={() => setLightboxItem(item)} className="group text-left">
                    <div className="bg-white border border-[#e0e0e0] rounded-[14px] overflow-hidden hover:border-[#bdbdbd] hover:shadow-[0_6px_24px_rgba(35,31,32,0.07)] transition-all">
                      <div className="relative h-48 flex items-center justify-center bg-[#e8f4f8]">
                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(2,49,67,0.03) 10px, rgba(2,49,67,0.03) 20px)" }} />
                        <div className="relative flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-[36px] text-[#023143]/30 group-hover:text-[#023143]/60 group-hover:scale-110 transition-all duration-300">
                            {item.type === "video" ? "play_circle" : "photo_camera"}
                          </span>
                          {item.type === "video" && <span className="text-[10px] font-bold text-[#023143]/50 bg-[#023143]/10 px-2 py-0.5 rounded-full">VIDEO</span>}
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm text-[#023143]">{item.stage}</span>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm text-[#757575]">{item.date}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-[13px] font-bold text-[#231f20] leading-snug group-hover:text-[#023143] transition-colors">{item.title}</p>
                        <p className="text-[11px] text-[#9e9e9e] mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </ClientLayout>
  );
}
