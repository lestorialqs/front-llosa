"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LlosaLogo from "@/components/LlosaLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/home"), 1400);
  }

  return (
    <div className="min-h-screen flex font-['Manrope',sans-serif] animate-fade-in">

      {/* ── Left panel — brand ─────────────────────── */}
      <div className="relative hidden lg:flex lg:w-[52%] bg-[#231f20] flex-col items-center justify-center p-16 overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(2,49,67,0.35),transparent)]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-10">
            <LlosaLogo size={240} color="white" />
          </div>
          <div className="w-16 h-px bg-white/10 mb-8" />
          <p className="text-white/30 text-[12px] font-semibold uppercase tracking-[0.25em]">
            Portal del Cliente
          </p>
          <div className="flex gap-3 mt-10">
            {["Mi Proyecto", "Documentos", "Avances", "Cronograma"].map(f => (
              <span key={f} className="text-[10px] font-semibold text-white/20 border border-white/10 px-3 py-1.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>
        <p className="absolute bottom-6 left-8 text-[10px] text-white/20 font-medium">
          © 2024 Llosa Edificaciones
        </p>
      </div>

      {/* ── Right panel — login form ───────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-8 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10 bg-[#231f20] rounded-2xl p-6">
          <LlosaLogo size={160} color="white" />
        </div>

        <div className="w-full max-w-[380px] animate-slide-up">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-[#231f20] tracking-tight">Bienvenido</h2>
            <p className="text-[14px] text-[#9e9e9e] mt-1">Accede a tu portal de cliente</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-[#757575] uppercase tracking-wider mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bdbdbd] text-[18px]">mail</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tucorreo@email.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#e0e0e0] rounded-xl text-[14px] text-[#231f20] placeholder:text-[#bdbdbd] focus:outline-none focus:border-[#023143] focus:ring-2 focus:ring-[#023143]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] font-bold text-[#757575] uppercase tracking-wider">
                  Contraseña
                </label>
                <button type="button" className="text-[11px] font-semibold text-[#023143] hover:underline transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bdbdbd] text-[18px]">lock</span>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3.5 bg-white border border-[#e0e0e0] rounded-xl text-[14px] text-[#231f20] placeholder:text-[#bdbdbd] focus:outline-none focus:border-[#023143] focus:ring-2 focus:ring-[#023143]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#bdbdbd] hover:text-[#757575] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">{showPass ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-[#023143] hover:bg-[#012433] disabled:opacity-70 text-white font-bold text-[14px] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(2,49,67,0.25)]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Accediendo…
                </>
              ) : (
                <>
                  Acceder a mi portal
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-[#bdbdbd] mt-12">
            Protegido por la política de seguridad de Llosa Edificaciones
          </p>
        </div>
      </div>
    </div>
  );
}
