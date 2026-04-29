"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ClientLayout from "@/components/ClientLayout";
import GlassCard from "@/components/GlassCard";
import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";

const stages = [
  {
    id: "separacion", label: "Separación", icon: "handshake", status: "completado" as const, progress: 100,
    description: "Reserva de la unidad inmobiliaria confirmada",
    milestones: [
      { name: "Firma de carta de intención", done: true },
      { name: "Pago de separación", done: true },
      { name: "Verificación de documentos", done: true },
    ],
  },
  {
    id: "contrato", label: "Contrato", icon: "description", status: "completado" as const, progress: 100,
    description: "Documentación contractual completada y firmada",
    milestones: [
      { name: "Revisión de contrato", done: true },
      { name: "Firma de contrato de compraventa", done: true },
      { name: "Registro notarial", done: true },
      { name: "Pago de primera cuota", done: true },
    ],
  },
  {
    id: "seguimiento", label: "Seguimiento de Obra", icon: "construction", status: "en-progreso" as const, progress: 67,
    description: "Construcción activa — Etapa de estructura en progreso",
    milestones: [
      { name: "Excavación y cimentación", done: true },
      { name: "Estructura — Pisos 1 al 5", done: true },
      { name: "Estructura — Pisos 6 al 10", done: true },
      { name: "Estructura — Pisos 11 al 15", done: false },
      { name: "Acabados interiores", done: false },
      { name: "Entrega de llaves", done: false },
    ],
  },
];

export default function ProyectoPage() {
  const router = useRouter();
  const [expandedStage, setExpandedStage] = useState<string | null>("seguimiento");

  return (
    <ClientLayout>
      <div className="animate-slide-up">
        <h1 className="text-[28px] font-bold text-[#231f20] tracking-tight">Mi Proyecto</h1>
        <p className="text-[14px] text-[#9e9e9e] mt-1">Sigue el estado de tu propiedad paso a paso</p>
      </div>

      {/* Project info card */}
      <GlassCard className="animate-slide-up delay-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e8f4f8] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px] text-[#023143]">apartment</span>
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[#231f20]">Torre Residencial Miraflores</h2>
              <p className="text-[13px] text-[#9e9e9e] mt-0.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">door_front</span>
                Departamento 1204 — Piso 12
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status="en-construccion" size="md" />
            <div className="text-right">
              <p className="text-[11px] text-[#9e9e9e] font-semibold">Progreso general</p>
              <p className="text-[22px] font-bold text-[#023143]">67%</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Stage Pipeline */}
      <div className="animate-slide-up delay-200">
        <h3 className="text-[16px] font-bold text-[#231f20] mb-4">Etapas del proceso</h3>

        {/* Horizontal stepper */}
        <div className="flex items-center gap-0 mb-6">
          {stages.map((stage, i) => {
            const isComplete = stage.status === "completado";
            const isActive = stage.status === "en-progreso";
            return (
              <div key={stage.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${isComplete ? "bg-[#e8f5e9] ring-2 ring-[#2e7d32]/20" :
                      isActive ? "bg-[#023143] shadow-lg shadow-[#023143]/20" :
                      "bg-[#f5f5f5] ring-1 ring-[#e0e0e0]"}
                  `}>
                    <span className={`material-symbols-outlined text-[22px] ${
                      isComplete ? "text-[#2e7d32] fill" :
                      isActive ? "text-white" :
                      "text-[#bdbdbd]"
                    }`}>
                      {isComplete ? "check_circle" : stage.icon}
                    </span>
                  </div>
                  <p className={`text-[12px] font-bold mt-2 text-center ${
                    isActive ? "text-[#023143]" : isComplete ? "text-[#2e7d32]" : "text-[#bdbdbd]"
                  }`}>{stage.label}</p>
                </div>
                {i < stages.length - 1 && (
                  <div className={`h-[2px] flex-1 -mt-6 mx-2 rounded-full ${
                    isComplete ? "bg-[#2e7d32]/30" : "bg-[#e0e0e0]"
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Expandable stage cards */}
        <div className="space-y-3">
          {stages.map((stage) => {
            const isExpanded = expandedStage === stage.id;
            const isComplete = stage.status === "completado";
            const isActive = stage.status === "en-progreso";

            return (
              <div key={stage.id} className={`
                bg-white border rounded-[14px] overflow-hidden transition-all duration-300
                ${isActive ? "border-[#023143]/30 shadow-sm" : "border-[#e0e0e0]"}
              `}>
                <button
                  onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#fafafa] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isComplete ? "bg-[#e8f5e9]" : isActive ? "bg-[#e8f4f8]" : "bg-[#f5f5f5]"
                    }`}>
                      <span className={`material-symbols-outlined text-[20px] ${
                        isComplete ? "text-[#2e7d32] fill" : isActive ? "text-[#023143]" : "text-[#bdbdbd]"
                      }`}>
                        {isComplete ? "check_circle" : stage.icon}
                      </span>
                    </div>
                    <div>
                      <p className={`text-[14px] font-bold ${isActive ? "text-[#231f20]" : isComplete ? "text-[#616161]" : "text-[#bdbdbd]"}`}>
                        {stage.label}
                      </p>
                      <p className="text-[12px] text-[#9e9e9e] mt-0.5">{stage.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={stage.status} />
                    <span className={`material-symbols-outlined text-[20px] text-[#bdbdbd] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 animate-slide-down">
                    <div className="border-t border-[#e0e0e0] pt-4">
                      <ProgressBar value={stage.progress} label="Progreso de etapa" height={4} />
                      <div className="mt-4 space-y-2">
                        {stage.milestones.map((m, i) => (
                          <div key={i} className="flex items-center gap-3 py-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${m.done ? "bg-[#e8f5e9]" : "bg-[#f5f5f5]"}`}>
                              <span className={`material-symbols-outlined text-[14px] ${m.done ? "text-[#2e7d32] fill" : "text-[#bdbdbd]"}`}>
                                {m.done ? "check" : "radio_button_unchecked"}
                              </span>
                            </div>
                            <span className={`text-[13px] font-medium ${m.done ? "text-[#616161]" : "text-[#bdbdbd]"}`}>
                              {m.name}
                            </span>
                            {m.done && <span className="text-[10px] text-[#2e7d32] ml-auto font-semibold">Completado</span>}
                          </div>
                        ))}
                      </div>
                      {isActive && (
                        <button
                          onClick={() => router.push("/proyecto/hitos")}
                          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#023143] hover:bg-[#012433] rounded-xl text-[13px] font-semibold text-white transition-all duration-200 shadow-sm"
                        >
                          Ver hitos detallados
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ClientLayout>
  );
}
