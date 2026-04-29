"use client";
import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import GlassCard from "@/components/GlassCard";
import EmptyState from "@/components/EmptyState";

type Notification = { id: number; type: "hito" | "documento" | "avance" | "pago" | "evento"; title: string; description: string; time: string; read: boolean };

const initialNotifications: Notification[] = [
  { id: 1, type: "avance", title: "Nuevo avance de obra publicado", description: "Se ha subido una nueva foto: Vista aérea del proyecto — Piso 10 completado.", time: "Hace 2 horas", read: false },
  { id: 2, type: "documento", title: "Nuevo documento disponible", description: "Reporte de Avance — Marzo 2024 está listo para descargar.", time: "Hace 5 horas", read: false },
  { id: 3, type: "pago", title: "Pago recibido", description: "Tu cuota #4 de S/ 15,200.00 ha sido registrada exitosamente.", time: "Ayer", read: false },
  { id: 4, type: "hito", title: "Hito completado", description: "Estructura — Pisos 6 al 10 ha sido marcado como completado.", time: "Hace 2 días", read: true },
  { id: 5, type: "evento", title: "Reunión programada", description: "Se ha agendado una revisión de avance con el ingeniero residente para el 18 de mayo.", time: "Hace 3 días", read: true },
  { id: 6, type: "avance", title: "Video de avance disponible", description: "Nuevo video time-lapse del avance de marzo ya está disponible en la galería.", time: "31 mar", read: true },
  { id: 7, type: "documento", title: "Documento actualizado", description: "Se ha actualizado el contrato de compraventa con la adenda de modificaciones.", time: "28 mar", read: true },
  { id: 8, type: "hito", title: "Hito completado", description: "Estructura — Pisos 1 al 5 ha sido marcado como completado.", time: "28 feb", read: true },
  { id: 9, type: "pago", title: "Pago recibido", description: "Tu cuota #3 de S/ 15,200.00 ha sido registrada exitosamente.", time: "15 mar", read: true },
  { id: 10, type: "avance", title: "Nuevas fotos de obra", description: "Se han publicado 3 nuevas fotos del avance de la cimentación.", time: "15 ene", read: true },
];

const typeConfig: Record<string, { icon: string; color: string; bg: string }> = {
  hito:      { icon: "flag",         color: "#e65100", bg: "#fff3e0" },
  documento: { icon: "description",  color: "#023143", bg: "#e8f4f8" },
  avance:    { icon: "construction", color: "#023143", bg: "#e8f4f8" },
  pago:      { icon: "payments",     color: "#2e7d32", bg: "#e8f5e9" },
  evento:    { icon: "event",        color: "#757575", bg: "#f5f5f5" },
};

export default function NotificacionesPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter ? notifications.filter(n => n.type === filter) : notifications;

  function markAsRead(id: number) { setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n)); }
  function markAllAsRead() { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); }

  return (
    <ClientLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-[28px] font-bold text-[#231f20] tracking-tight">Notificaciones</h1>
          <p className="text-[14px] text-[#9e9e9e] mt-1">{unreadCount > 0 ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? "es" : ""} sin leer` : "Estás al día con todas las novedades"}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold text-[#023143] bg-[#e8f4f8] hover:bg-[#d0eaf2] transition-all">
            <span className="material-symbols-outlined text-[16px]">done_all</span>
            Marcar todo como leído
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto animate-slide-up delay-100">
        <button onClick={() => setFilter(null)} className={`px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all ${!filter ? "bg-[#023143] text-white" : "bg-white border border-[#e0e0e0] text-[#757575] hover:border-[#023143]/30"}`}>Todas ({notifications.length})</button>
        {Object.entries(typeConfig).map(([key, val]) => {
          const count = notifications.filter(n => n.type === key).length;
          return (
            <button key={key} onClick={() => setFilter(filter === key ? null : key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all ${filter === key ? "text-white" : "text-[#757575] hover:border-[#023143]/30"}`}
              style={{ background: filter === key ? val.color : "white", border: filter === key ? "none" : "1px solid #e0e0e0" }}>
              <span className="material-symbols-outlined text-[14px]" style={{ color: filter === key ? "white" : val.color }}>{val.icon}</span>
              {key.charAt(0).toUpperCase() + key.slice(1)}s ({count})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="notifications_off" title="Sin notificaciones" description="No hay notificaciones en esta categoría" />
      ) : (
        <div className="space-y-2 animate-fade-in">
          {filtered.map((notif) => {
            const config = typeConfig[notif.type];
            return (
              <button key={notif.id} onClick={() => markAsRead(notif.id)} className="w-full text-left group">
                <div className={`bg-white border rounded-[14px] overflow-hidden transition-all duration-300 hover:shadow-sm ${!notif.read ? "border-l-[3px]" : "border-[#e0e0e0]"}`}
                  style={!notif.read ? { borderLeftColor: config.color, borderTop: "1px solid #e0e0e0", borderRight: "1px solid #e0e0e0", borderBottom: "1px solid #e0e0e0" } : {}}>
                  <div className="flex items-start gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: config.bg }}>
                      <span className="material-symbols-outlined text-[20px]" style={{ color: config.color }}>{config.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`text-[13px] font-bold ${notif.read ? "text-[#757575]" : "text-[#231f20]"}`}>{notif.title}</p>
                        {!notif.read && <span className="w-2 h-2 bg-[#023143] rounded-full shrink-0" />}
                      </div>
                      <p className={`text-[12px] leading-relaxed ${notif.read ? "text-[#bdbdbd]" : "text-[#757575]"}`}>{notif.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[10px] text-[#bdbdbd] font-medium">{notif.time}</span>
                      {!notif.read && <span className="text-[10px] text-[#023143] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">check</span>Marcar como leído</span>}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </ClientLayout>
  );
}
