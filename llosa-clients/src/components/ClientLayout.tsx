"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LlosaLogo from "./LlosaLogo";

const navItems = [
  { href: "/home",            icon: "home",            label: "Inicio" },
  { href: "/proyecto",        icon: "apartment",       label: "Mi Proyecto" },
  { href: "/documentos",      icon: "folder_open",     label: "Documentos" },
  { href: "/avances",         icon: "construction",    label: "Avances de Obra" },
  { href: "/cronograma",      icon: "calendar_month",  label: "Cronograma" },
  { href: "/notificaciones",  icon: "notifications",   label: "Notificaciones" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifCount] = useState(3);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-[256px] flex flex-col
        bg-[#231f20] text-white
        transition-transform duration-300 lg:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="px-6 pt-7 pb-2">
          <LlosaLogo size={140} color="white" />
          <div className="mt-4 mb-2">
            <div className="h-px bg-white/10" />
          </div>
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mt-3">
            Portal del Cliente
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <button
                key={item.href}
                onClick={() => { router.push(item.href); setMobileOpen(false); }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold
                  transition-all duration-200 group relative
                  ${active
                    ? "bg-[#023143] text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"
                  }
                `}
              >
                <span className={`material-symbols-outlined text-[20px] ${active ? "fill" : ""}`}>
                  {item.icon}
                </span>
                {item.label}
                {item.href === "/notificaciones" && notifCount > 0 && (
                  <span className="ml-auto bg-[#c62828] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {notifCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#023143] flex items-center justify-center text-[13px] font-bold text-white shrink-0">
              CM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white/90 truncate">Carlos Mendoza</p>
              <p className="text-[10px] text-white/40 truncate">carlos@email.com</p>
            </div>
            <button className="text-white/30 hover:text-white/60 transition-colors">
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 py-4 bg-white border-b border-[#e0e0e0]">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[#231f20]/60 hover:text-[#231f20]">
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <div>
              <p className="text-[13px] text-[#9e9e9e] font-medium">Buenos días,</p>
              <p className="text-[16px] font-bold text-[#231f20] tracking-tight">Carlos Mendoza</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-[#f5f5f5] transition-colors">
              <span className="material-symbols-outlined text-[22px] text-[#757575]">notifications</span>
              {notifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c62828] rounded-full" />
              )}
            </button>
            <button className="relative p-2 rounded-xl hover:bg-[#f5f5f5] transition-colors">
              <span className="material-symbols-outlined text-[22px] text-[#757575]">help_outline</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 lg:px-8 py-6 space-y-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-6 lg:px-8 py-4 border-t border-[#e0e0e0]">
          <p className="text-[11px] text-[#bdbdbd] text-center">
            © 2024 Llosa Edificaciones. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}
