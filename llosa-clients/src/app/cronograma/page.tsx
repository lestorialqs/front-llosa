"use client";
import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import GlassCard from "@/components/GlassCard";

type CalEvent = { id: number; title: string; description: string; date: number; month: number; year: number; type: "pago" | "reunion" | "firma" | "entrega" | "evento"; time?: string };

const eventTypes = {
  pago:    { label: "Pago",    icon: "payments",  color: "#023143", bg: "#e8f4f8" },
  reunion: { label: "Reunión", icon: "groups",    color: "#2e7d32", bg: "#e8f5e9" },
  firma:   { label: "Firma",   icon: "draw",      color: "#e65100", bg: "#fff3e0" },
  entrega: { label: "Entrega", icon: "key",       color: "#c62828", bg: "#ffebee" },
  evento:  { label: "Evento",  icon: "event",     color: "#757575", bg: "#f5f5f5" },
};

const events: CalEvent[] = [
  { id: 1, title: "Cuota #5", description: "Pago mensual de financiamiento — S/ 15,200.00", date: 15, month: 4, year: 2024, type: "pago", time: "Todo el día" },
  { id: 2, title: "Revisión de avance", description: "Reunión con el ingeniero residente", date: 18, month: 4, year: 2024, type: "reunion", time: "10:00 AM" },
  { id: 3, title: "Cuota #6", description: "Pago mensual de financiamiento — S/ 15,200.00", date: 15, month: 5, year: 2024, type: "pago", time: "Todo el día" },
  { id: 4, title: "Firma de adenda", description: "Firma de adenda para modificaciones de acabados", date: 22, month: 5, year: 2024, type: "firma", time: "3:00 PM" },
  { id: 5, title: "Visita a obra", description: "Visita guiada al proyecto", date: 5, month: 5, year: 2024, type: "evento", time: "9:00 AM" },
  { id: 6, title: "Cuota #7", description: "Pago mensual de financiamiento — S/ 15,200.00", date: 15, month: 6, year: 2024, type: "pago", time: "Todo el día" },
  { id: 7, title: "Reunión de propietarios", description: "Primera reunión de propietarios del edificio", date: 28, month: 6, year: 2024, type: "reunion", time: "6:00 PM" },
  { id: 8, title: "Entrega estimada", description: "Fecha estimada de entrega de llaves", date: 15, month: 10, year: 2024, type: "entrega", time: "Todo el día" },
];

const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAY_NAMES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function getDaysInMonth(m: number, y: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(m: number, y: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

export default function CronogramaPage() {
  const [currentMonth, setCurrentMonth] = useState(4);
  const [currentYear] = useState(2024);
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthEvents = events.filter(e => e.month === currentMonth && e.year === currentYear && (!typeFilter || e.type === typeFilter));

  return (
    <ClientLayout>
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#231f20]/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedEvent(null)}>
          <div className="w-full max-w-md mx-4 animate-scale-in" onClick={e => e.stopPropagation()}>
            <GlassCard padding="p-6" hover={false}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: eventTypes[selectedEvent.type].bg }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color: eventTypes[selectedEvent.type].color }}>{eventTypes[selectedEvent.type].icon}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: eventTypes[selectedEvent.type].bg, color: eventTypes[selectedEvent.type].color }}>
                    {eventTypes[selectedEvent.type].label}
                  </span>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-[#bdbdbd] hover:text-[#231f20] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <h3 className="text-[18px] font-bold text-[#231f20] mb-2">{selectedEvent.title}</h3>
              <p className="text-[13px] text-[#757575] leading-relaxed mb-4">{selectedEvent.description}</p>
              <div className="space-y-2 bg-[#f5f5f5] rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#bdbdbd]">calendar_today</span>
                  <span className="text-[12px] text-[#757575]">{selectedEvent.date} de {MONTH_NAMES[selectedEvent.month]} {selectedEvent.year}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#bdbdbd]">schedule</span>
                    <span className="text-[12px] text-[#757575]">{selectedEvent.time}</span>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      <div className="animate-slide-up">
        <h1 className="text-[28px] font-bold text-[#231f20] tracking-tight">Cronograma</h1>
        <p className="text-[14px] text-[#9e9e9e] mt-1">Fechas importantes de tu proceso inmobiliario</p>
      </div>

      <div className="flex flex-wrap gap-2 animate-slide-up delay-100">
        <button onClick={() => setTypeFilter(null)} className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${!typeFilter ? "bg-[#023143] text-white" : "bg-white border border-[#e0e0e0] text-[#757575] hover:border-[#023143]/30"}`}>Todos</button>
        {Object.entries(eventTypes).map(([key, val]) => (
          <button key={key} onClick={() => setTypeFilter(typeFilter === key ? null : key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${typeFilter === key ? "text-white" : "text-[#757575] hover:border-[#023143]/30"}`}
            style={{ background: typeFilter === key ? val.color : "white", border: typeFilter === key ? "none" : "1px solid #e0e0e0" }}>
            <span className="material-symbols-outlined text-[14px]" style={{ color: typeFilter === key ? "white" : val.color }}>{val.icon}</span>
            {val.label}
          </button>
        ))}
      </div>

      <div className="animate-slide-up delay-200">
        <GlassCard hover={false} padding="p-0" className="overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0e0e0]">
            <button onClick={() => setCurrentMonth(m => m === 0 ? 11 : m - 1)} className="p-2 rounded-xl hover:bg-[#f5f5f5] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#757575]">chevron_left</span>
            </button>
            <h3 className="text-[18px] font-bold text-[#231f20]">{MONTH_NAMES[currentMonth]} {currentYear}</h3>
            <button onClick={() => setCurrentMonth(m => m === 11 ? 0 : m + 1)} className="p-2 rounded-xl hover:bg-[#f5f5f5] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#757575]">chevron_right</span>
            </button>
          </div>
          <div className="grid grid-cols-7 border-b border-[#e0e0e0] bg-[#fafafa]">
            {DAY_NAMES.map(d => (<div key={d} className="py-3 text-center text-[11px] font-bold text-[#9e9e9e] uppercase tracking-wider">{d}</div>))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (<div key={`e-${i}`} className="min-h-[100px] border-r border-b border-[#eeeeee] bg-[#fafafa]" />))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = monthEvents.filter(e => e.date === day);
              const isToday = day === 28 && currentMonth === 3;
              return (
                <div key={day} className={`min-h-[100px] border-r border-b border-[#eeeeee] p-1.5 transition-colors hover:bg-[#fafafa] ${isToday ? "bg-[#e8f4f8]" : ""}`}>
                  <span className={`text-[12px] font-bold inline-flex items-center justify-center w-7 h-7 rounded-full ${isToday ? "bg-[#023143] text-white" : "text-[#757575]"}`}>{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.map(ev => {
                      const et = eventTypes[ev.type];
                      return (<button key={ev.id} onClick={() => setSelectedEvent(ev)} className="w-full text-left px-1.5 py-1 rounded-md text-[10px] font-semibold truncate transition-all hover:opacity-80" style={{ background: et.bg, color: et.color }}>{ev.title}</button>);
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <div className="animate-slide-up delay-300">
        <h3 className="text-[16px] font-bold text-[#231f20] mb-4">Próximos eventos</h3>
        <div className="space-y-2">
          {events.filter(e => !typeFilter || e.type === typeFilter).sort((a, b) => a.month - b.month || a.date - b.date).slice(0, 5).map(ev => {
            const et = eventTypes[ev.type];
            return (
              <button key={ev.id} onClick={() => setSelectedEvent(ev)} className="w-full text-left">
                <GlassCard padding="p-4" className="!rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0" style={{ background: et.bg }}>
                      <span className="text-[14px] font-bold leading-none" style={{ color: et.color }}>{ev.date}</span>
                      <span className="text-[9px] font-semibold uppercase" style={{ color: et.color, opacity: 0.7 }}>{MONTH_NAMES[ev.month].substring(0, 3)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#231f20]">{ev.title}</p>
                      <p className="text-[11px] text-[#9e9e9e] mt-0.5 truncate">{ev.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {ev.time && <span className="text-[11px] text-[#bdbdbd] flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">schedule</span>{ev.time}</span>}
                      <span className="material-symbols-outlined text-[16px] text-[#bdbdbd]">chevron_right</span>
                    </div>
                  </div>
                </GlassCard>
              </button>
            );
          })}
        </div>
      </div>
    </ClientLayout>
  );
}
