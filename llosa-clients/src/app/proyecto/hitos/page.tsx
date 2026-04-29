"use client";
import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import GlassCard from "@/components/GlassCard";

type Attachment = { name: string; type: "pdf" | "image" | "video" | "receipt"; size: string };
type Milestone = { id: number; title: string; description: string; company: string; date: string; done: boolean; attachments: Attachment[] };

const milestones: Milestone[] = [
  { id: 1, title: "Excavación y cimentación", description: "Se completó la excavación del terreno y la instalación de la cimentación profunda con pilotes de 18m. Verificación de compactación del suelo aprobada.", company: "Constructora Llosa SAC", date: "15 de enero, 2024", done: true,
    attachments: [ { name: "Informe_Cimentacion.pdf", type: "pdf", size: "2.4 MB" }, { name: "Foto_Excavacion_01.jpg", type: "image", size: "1.8 MB" }, { name: "Video_Pilotes.mp4", type: "video", size: "45 MB" } ] },
  { id: 2, title: "Estructura — Pisos 1 al 5", description: "Construcción de la estructura de concreto armado para los pisos 1 al 5. Inspección de INDECI aprobada.", company: "Constructora Llosa SAC", date: "28 de febrero, 2024", done: true,
    attachments: [ { name: "Reporte_Estructural_P1-5.pdf", type: "pdf", size: "5.1 MB" }, { name: "Comprobante_Pago_Cuota3.pdf", type: "receipt", size: "320 KB" }, { name: "Avance_Piso5.jpg", type: "image", size: "2.2 MB" } ] },
  { id: 3, title: "Estructura — Pisos 6 al 10", description: "Avance de estructura hasta el piso 10. Refuerzo sísmico adicional según normativa E.030. Muros de corte instalados.", company: "Constructora Llosa SAC", date: "15 de abril, 2024", done: true,
    attachments: [ { name: "Informe_Avance_P6-10.pdf", type: "pdf", size: "3.7 MB" }, { name: "Foto_Piso10.jpg", type: "image", size: "1.5 MB" }, { name: "Recibo_Cuota4.pdf", type: "receipt", size: "280 KB" } ] },
  { id: 4, title: "Estructura — Pisos 11 al 15", description: "Próxima etapa de construcción. Se estima completar la estructura del piso 11 al 15, incluyendo tu departamento.", company: "Constructora Llosa SAC", date: "Estimado: junio 2024", done: false, attachments: [] },
  { id: 5, title: "Acabados interiores", description: "Instalación de pisos, pintura, aparatos sanitarios, muebles de cocina y carpintería interior.", company: "Acabados Premium SAC", date: "Estimado: septiembre 2024", done: false, attachments: [] },
  { id: 6, title: "Entrega de llaves", description: "Inspección final, pruebas de sistemas y entrega oficial de tu departamento.", company: "Llosa Edificaciones", date: "Estimado: noviembre 2024", done: false, attachments: [] },
];

const fileIcons: Record<string, { icon: string; color: string; bg: string }> = {
  pdf: { icon: "picture_as_pdf", color: "#c62828", bg: "#ffebee" },
  image: { icon: "image", color: "#023143", bg: "#e8f4f8" },
  video: { icon: "videocam", color: "#e65100", bg: "#fff3e0" },
  receipt: { icon: "receipt_long", color: "#2e7d32", bg: "#e8f5e9" },
};

export default function HitosPage() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  function handleDownload(fileName: string) {
    setDownloadingFile(fileName);
    setTimeout(() => setDownloadingFile(null), 1500);
  }

  const completedCount = milestones.filter(m => m.done).length;

  return (
    <ClientLayout>
      <div className="animate-slide-up">
        <button onClick={() => window.history.back()} className="flex items-center gap-1 text-[12px] text-[#9e9e9e] hover:text-[#023143] transition-colors mb-4">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Volver a Mi Proyecto
        </button>
        <h1 className="text-[28px] font-bold text-[#231f20] tracking-tight">Hitos del Proyecto</h1>
        <p className="text-[14px] text-[#9e9e9e] mt-1">{completedCount} de {milestones.length} hitos completados — Seguimiento de Obra</p>
      </div>

      {/* Progress summary */}
      <GlassCard className="animate-slide-up delay-100 !p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] font-semibold text-[#757575]">Progreso de hitos</span>
              <span className="text-[13px] font-bold text-[#023143]">{completedCount}/{milestones.length}</span>
            </div>
            <div className="w-full bg-[#e0e0e0] rounded-full h-2 overflow-hidden">
              <div className="h-full rounded-full bg-[#023143] transition-all duration-1000" style={{ width: `${(completedCount / milestones.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Timeline */}
      <div className="relative animate-slide-up delay-200">
        <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-[#e0e0e0]" />
        <div className="absolute left-[23px] top-0 w-[2px] bg-[#023143] transition-all duration-700" style={{ height: `${(completedCount / milestones.length) * 100}%` }} />

        <div className="space-y-4">
          {milestones.map((m, index) => {
            const isExpanded = expandedId === m.id;
            return (
              <div key={m.id} className="relative pl-14">
                <div className={`
                  absolute left-[11px] top-5 w-[26px] h-[26px] rounded-full flex items-center justify-center z-10 transition-all duration-300
                  ${m.done ? "bg-[#e8f5e9] ring-2 ring-[#2e7d32]/20" :
                    index === completedCount ? "bg-[#023143] shadow-md shadow-[#023143]/20" :
                    "bg-white ring-1 ring-[#e0e0e0]"}
                `}>
                  <span className={`material-symbols-outlined text-[14px] ${
                    m.done ? "text-[#2e7d32] fill" : index === completedCount ? "text-white" : "text-[#bdbdbd]"
                  }`}>
                    {m.done ? "check" : index === completedCount ? "pending" : "radio_button_unchecked"}
                  </span>
                </div>

                <div className={`
                  bg-white border rounded-[14px] overflow-hidden transition-all duration-300
                  ${!m.done && index !== completedCount ? "opacity-50" : ""}
                  ${index === completedCount ? "border-[#023143]/30 shadow-sm" : "border-[#e0e0e0]"}
                `}>
                  <button onClick={() => setExpandedId(isExpanded ? null : m.id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-[#fafafa] transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          m.done ? "badge-success" : index === completedCount ? "badge-info" : "badge-neutral"
                        }`}>
                          {m.done ? "Completado" : index === completedCount ? "En curso" : "Pendiente"}
                        </span>
                        <span className="text-[10px] text-[#bdbdbd]">{m.date}</span>
                      </div>
                      <p className={`text-[14px] font-bold ${m.done ? "text-[#616161]" : "text-[#231f20]"}`}>{m.title}</p>
                    </div>
                    <span className={`material-symbols-outlined text-[20px] text-[#bdbdbd] transition-transform duration-300 shrink-0 ml-3 ${isExpanded ? "rotate-180" : ""}`}>expand_more</span>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 animate-slide-down">
                      <div className="border-t border-[#e0e0e0] pt-4 space-y-4">
                        <p className="text-[13px] text-[#757575] leading-relaxed">{m.description}</p>
                        <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-lg px-3 py-2">
                          <span className="material-symbols-outlined text-[16px] text-[#bdbdbd]">business</span>
                          <span className="text-[12px] text-[#757575] font-medium">{m.company}</span>
                        </div>
                        {m.attachments.length > 0 ? (
                          <div>
                            <p className="text-[11px] font-bold text-[#9e9e9e] uppercase tracking-wider mb-2">Archivos adjuntos ({m.attachments.length})</p>
                            <div className="space-y-1.5">
                              {m.attachments.map((att) => {
                                const fInfo = fileIcons[att.type];
                                const isDownloading = downloadingFile === att.name;
                                return (
                                  <div key={att.name} className="flex items-center gap-3 bg-[#fafafa] border border-[#eeeeee] rounded-lg px-3 py-2.5">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: fInfo.bg }}>
                                      <span className="material-symbols-outlined text-[16px]" style={{ color: fInfo.color }}>{fInfo.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[12px] font-medium text-[#616161] truncate">{att.name}</p>
                                      <p className="text-[10px] text-[#bdbdbd]">{att.size}</p>
                                    </div>
                                    <button onClick={() => handleDownload(att.name)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-300 ${
                                      isDownloading ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#023143] text-white hover:bg-[#012433]"
                                    }`}>
                                      <span className="material-symbols-outlined text-[14px]">{isDownloading ? "check" : "download"}</span>
                                      {isDownloading ? "¡Listo!" : "Descargar"}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 py-2">
                            <span className="material-symbols-outlined text-[16px] text-[#bdbdbd]">info</span>
                            <span className="text-[12px] text-[#bdbdbd]">Los archivos estarán disponibles cuando se complete este hito</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClientLayout>
  );
}
