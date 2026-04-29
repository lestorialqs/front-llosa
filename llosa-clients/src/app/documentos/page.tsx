"use client";
import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import GlassCard from "@/components/GlassCard";
import EmptyState from "@/components/EmptyState";

type Doc = { id: number; name: string; category: "contrato" | "recibo" | "legal" | "reporte"; date: string; size: string; icon: string };

const documents: Doc[] = [
  { id: 1, name: "Contrato de Compraventa — Dpto 1204", category: "contrato", date: "15 dic, 2023", size: "3.2 MB", icon: "description" },
  { id: 2, name: "Adenda al Contrato — Modificación de acabados", category: "contrato", date: "20 ene, 2024", size: "1.1 MB", icon: "description" },
  { id: 3, name: "Recibo de Separación", category: "recibo", date: "01 dic, 2023", size: "450 KB", icon: "receipt_long" },
  { id: 4, name: "Comprobante — Cuota #1", category: "recibo", date: "15 ene, 2024", size: "380 KB", icon: "receipt_long" },
  { id: 5, name: "Comprobante — Cuota #2", category: "recibo", date: "15 feb, 2024", size: "390 KB", icon: "receipt_long" },
  { id: 6, name: "Comprobante — Cuota #3", category: "recibo", date: "15 mar, 2024", size: "385 KB", icon: "receipt_long" },
  { id: 7, name: "Comprobante — Cuota #4", category: "recibo", date: "15 abr, 2024", size: "395 KB", icon: "receipt_long" },
  { id: 8, name: "Partida Registral — Inmueble", category: "legal", date: "10 dic, 2023", size: "2.8 MB", icon: "gavel" },
  { id: 9, name: "Certificado de Habilitación Urbana", category: "legal", date: "05 nov, 2023", size: "1.5 MB", icon: "verified" },
  { id: 10, name: "Licencia de Construcción", category: "legal", date: "01 oct, 2023", size: "4.2 MB", icon: "apartment" },
  { id: 11, name: "Reporte de Avance — Enero 2024", category: "reporte", date: "31 ene, 2024", size: "5.5 MB", icon: "analytics" },
  { id: 12, name: "Reporte de Avance — Marzo 2024", category: "reporte", date: "31 mar, 2024", size: "6.1 MB", icon: "analytics" },
];

const categories = [
  { key: "all", label: "Todos", count: documents.length },
  { key: "contrato", label: "Contratos", count: documents.filter(d => d.category === "contrato").length },
  { key: "recibo", label: "Recibos", count: documents.filter(d => d.category === "recibo").length },
  { key: "legal", label: "Legales", count: documents.filter(d => d.category === "legal").length },
  { key: "reporte", label: "Reportes", count: documents.filter(d => d.category === "reporte").length },
];

const categoryColors: Record<string, { color: string; bg: string }> = {
  contrato: { color: "#e65100", bg: "#fff3e0" },
  recibo:   { color: "#2e7d32", bg: "#e8f5e9" },
  legal:    { color: "#023143", bg: "#e8f4f8" },
  reporte:  { color: "#231f20", bg: "#f5f5f5" },
};

export default function DocumentosPage() {
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const filtered = filter === "all" ? documents : documents.filter(d => d.category === filter);

  function handleDownload(id: number) {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 1500);
  }

  return (
    <ClientLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-[28px] font-bold text-[#231f20] tracking-tight">Documentos</h1>
          <p className="text-[14px] text-[#9e9e9e] mt-1">Accede y descarga todos los documentos de tu proceso</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#023143] text-white" : "text-[#bdbdbd] hover:text-[#757575]"}`}>
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#023143] text-white" : "text-[#bdbdbd] hover:text-[#757575]"}`}>
            <span className="material-symbols-outlined text-[20px]">view_list</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 animate-slide-up delay-100">
        {categories.map(c => (
          <button key={c.key} onClick={() => setFilter(c.key)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all ${
            filter === c.key ? "bg-[#023143] text-white" : "bg-white border border-[#e0e0e0] text-[#757575] hover:border-[#023143]/30 hover:text-[#023143]"
          }`}>
            {c.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${filter === c.key ? "bg-white/20" : "bg-[#f5f5f5]"}`}>{c.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="folder_off" title="Sin documentos" description="Aún no hay documentos disponibles en esta categoría" />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in">
          {filtered.map((doc) => {
            const cat = categoryColors[doc.category];
            const isDownloading = downloadingId === doc.id;
            return (
              <GlassCard key={doc.id} padding="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: cat.bg }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color: cat.color }}>{doc.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#231f20] leading-snug line-clamp-2">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: cat.bg, color: cat.color }}>
                        {categories.find(c => c.key === doc.category)?.label}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-[#bdbdbd]">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">calendar_today</span>{doc.date}</span>
                    <span>{doc.size}</span>
                  </div>
                  <button onClick={() => handleDownload(doc.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-300 ${
                    isDownloading ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#023143] text-white hover:bg-[#012433]"
                  }`}>
                    <span className="material-symbols-outlined text-[14px]">{isDownloading ? "check" : "download"}</span>
                    {isDownloading ? "¡Listo!" : "Descargar"}
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2 animate-fade-in">
          {filtered.map((doc) => {
            const cat = categoryColors[doc.category];
            const isDownloading = downloadingId === doc.id;
            return (
              <GlassCard key={doc.id} padding="p-4" className="!rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: cat.bg }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color: cat.color }}>{doc.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#231f20] truncate">{doc.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: cat.bg, color: cat.color }}>
                        {categories.find(c => c.key === doc.category)?.label}
                      </span>
                      <span className="text-[10px] text-[#bdbdbd]">{doc.date}</span>
                      <span className="text-[10px] text-[#bdbdbd]">{doc.size}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload(doc.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-300 shrink-0 ${
                    isDownloading ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#023143] text-white hover:bg-[#012433]"
                  }`}>
                    <span className="material-symbols-outlined text-[14px]">{isDownloading ? "check" : "download"}</span>
                    {isDownloading ? "¡Listo!" : "Descargar"}
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </ClientLayout>
  );
}
