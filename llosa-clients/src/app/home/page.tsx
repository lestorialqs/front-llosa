"use client";
import dynamic from "next/dynamic";
import ClientLayout from "@/components/ClientLayout";
import GlassCard from "@/components/GlassCard";
import ProgressBar from "@/components/ProgressBar";
import StatusBadge from "@/components/StatusBadge";

const BuildingViewer = dynamic(() => import("@/components/BuildingViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#f5f5f5] rounded-2xl">
      <div className="w-16 h-16 rounded-2xl skeleton" />
    </div>
  ),
});

const projectData = {
  name: "Torre Residencial Miraflores",
  unit: "Departamento 1204 — Piso 12",
  status: "en-construccion",
  progress: 67,
  lastUpdate: "28 de abril, 2024",
  message: "Tu proyecto ha avanzado a la etapa de estructura del piso 10",
  nextMilestone: "Instalación eléctrica — Piso 12",
  nextPayment: "15 de mayo, 2024",
  nextPaymentAmount: "S/ 15,200.00",
};

export default function HomePage() {
  return (
    <ClientLayout>
      {/* ── Hero Section ── */}
      <div className="relative rounded-2xl overflow-hidden bg-[#231f20] animate-fade-in">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left: Info */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="animate-slide-up">
              <StatusBadge status={projectData.status} size="md" />
              <h1 className="text-[32px] lg:text-[38px] font-bold text-white tracking-tight mt-4 leading-tight">
                {projectData.name}
              </h1>
              <p className="text-[14px] text-white/50 mt-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">apartment</span>
                {projectData.unit}
              </p>
            </div>

            {/* Progress */}
            <div className="mt-8 animate-slide-up delay-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px] font-semibold text-white/50">Progreso general</span>
                <span className="text-[13px] font-bold text-white">{projectData.progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="h-full rounded-full bg-[#023143] transition-all duration-1000" style={{ width: `${projectData.progress}%` }} />
              </div>
            </div>

            {/* Update message */}
            <div className="mt-6 flex items-start gap-3 bg-[#023143]/30 border border-[#023143]/40 rounded-xl p-4 animate-slide-up delay-200">
              <div className="w-8 h-8 rounded-lg bg-[#023143] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px] text-white">trending_up</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">{projectData.message}</p>
                <p className="text-[11px] text-white/40 mt-1">Última actualización: {projectData.lastUpdate}</p>
              </div>
            </div>
          </div>

          {/* Right: 3D Building */}
          <div className="h-[350px] lg:h-[420px] relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(2,49,67,0.2),transparent)]" />
            <BuildingViewer />
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="material-symbols-outlined text-[12px] text-white/40">3d_rotation</span>
              <span className="text-[10px] text-white/40 font-medium">Arrastra para rotar</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up delay-200">
        {/* Progreso */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#e8f4f8] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#023143]">trending_up</span>
            </div>
            <div>
              <p className="text-[11px] text-[#9e9e9e] font-semibold uppercase tracking-wider">Progreso</p>
              <p className="text-[22px] font-bold text-[#231f20]">{projectData.progress}%</p>
            </div>
          </div>
          <ProgressBar value={projectData.progress} showPercent={false} height={4} />
        </GlassCard>

        {/* Próximo hito */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff3e0] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#e65100]">flag</span>
            </div>
            <div>
              <p className="text-[11px] text-[#9e9e9e] font-semibold uppercase tracking-wider">Próximo hito</p>
            </div>
          </div>
          <p className="text-[14px] font-semibold text-[#231f20] leading-snug">{projectData.nextMilestone}</p>
          <p className="text-[11px] text-[#bdbdbd] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">calendar_today</span>
            Estimado para mayo 2024
          </p>
        </GlassCard>

        {/* Próximo pago */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#2e7d32]">payments</span>
            </div>
            <div>
              <p className="text-[11px] text-[#9e9e9e] font-semibold uppercase tracking-wider">Próximo pago</p>
            </div>
          </div>
          <p className="text-[20px] font-bold text-[#231f20]">{projectData.nextPaymentAmount}</p>
          <p className="text-[11px] text-[#bdbdbd] mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">event</span>
            {projectData.nextPayment}
          </p>
        </GlassCard>
      </div>

      {/* ── Recent Activity ── */}
      <div className="animate-slide-up delay-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold text-[#231f20]">Actividad reciente</h2>
          <button className="text-[12px] font-semibold text-[#023143] hover:underline transition-colors">
            Ver todo →
          </button>
        </div>
        <div className="space-y-2">
          {[
            { icon: "construction", color: "#023143", bg: "#e8f4f8", text: "Avance de obra actualizado — Piso 10 completado", time: "Hace 2 horas" },
            { icon: "description", color: "#e65100", bg: "#fff3e0", text: "Nuevo documento disponible — Contrato de compraventa v2", time: "Ayer" },
            { icon: "payments", color: "#2e7d32", bg: "#e8f5e9", text: "Pago registrado — Cuota #8 confirmada", time: "25 abr" },
            { icon: "event", color: "#757575", bg: "#f5f5f5", text: "Reunión programada — Revisión de avance con ingeniero", time: "22 abr" },
          ].map((item, i) => (
            <GlassCard key={i} padding="p-4" className="!rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.bg }}>
                  <span className="material-symbols-outlined text-[18px]" style={{ color: item.color }}>{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#231f20] truncate">{item.text}</p>
                </div>
                <span className="text-[11px] text-[#bdbdbd] shrink-0">{item.time}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
}
