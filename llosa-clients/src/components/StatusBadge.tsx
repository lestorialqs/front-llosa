export default function StatusBadge({ status, size = "sm" }: { status: string; size?: "sm" | "md" }) {
  const map: Record<string, { bg: string; label: string }> = {
    completado:        { bg: "badge-success", label: "Completado" },
    "en-progreso":     { bg: "badge-info",    label: "En progreso" },
    pendiente:         { bg: "badge-neutral",  label: "Pendiente" },
    "en-construccion": { bg: "badge-info",    label: "En construcción" },
    contrato:          { bg: "badge-warning", label: "Etapa de contrato" },
    separacion:        { bg: "badge-success", label: "Separación" },
    entregado:         { bg: "badge-success", label: "Entregado" },
    vencido:           { bg: "badge-danger",  label: "Vencido" },
    activo:            { bg: "badge-success", label: "Activo" },
  };

  const iconMap: Record<string, string> = {
    completado: "check_circle", "en-progreso": "pending", pendiente: "schedule",
    "en-construccion": "construction", contrato: "description", separacion: "handshake",
    entregado: "verified", vencido: "error", activo: "radio_button_checked",
  };

  const info = map[status] || { bg: "badge-neutral", label: status };
  const icon = iconMap[status] || "info";
  const sizeClass = size === "md" ? "text-[12px] px-3 py-1" : "text-[10px] px-2 py-0.5";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold ${info.bg} ${sizeClass}`}>
      <span className="material-symbols-outlined text-[12px] fill">{icon}</span>
      {info.label}
    </span>
  );
}
