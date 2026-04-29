"use client";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const roles = [
  { id: "admin",    label: "Global Admin",       desc: "Full access to all modules",      color: "#023143", bg: "#c2e8ff" },
  { id: "advisor",  label: "Commercial Advisor", desc: "Sales & client management",        color: "#2E7D32", bg: "#E8F5E9" },
  { id: "legal",    label: "Legal",              desc: "Contracts & document handling",    color: "#1565C0", bg: "#E3F2FD" },
  { id: "admin2",   label: "Administration",     desc: "Internal operations & scheduling", color: "#E65100", bg: "#FFF3E0" },
  { id: "postsales",label: "Post-sales",         desc: "Client follow-up & tracking",     color: "#6A1B9A", bg: "#F3E5F5" },
];

type ModulePerm = { view: boolean; create: boolean; edit: boolean; delete: boolean };
type RolePerms  = Record<string, Record<string, ModulePerm>>;

const modules = [
  { key: "dashboard",   label: "Dashboard",   icon: "dashboard"       },
  { key: "clients",     label: "Clients",     icon: "group"           },
  { key: "properties",  label: "Properties",  icon: "domain"          },
  { key: "contracts",   label: "Contracts",   icon: "description"     },
  { key: "projects",    label: "Projects",    icon: "architecture"    },
  { key: "schedule",    label: "Schedule",    icon: "calendar_today"  },
  { key: "templates",   label: "Templates",   icon: "article"         },
  { key: "tracking",    label: "Tracking",    icon: "analytics"       },
  { key: "employees",   label: "Employees",   icon: "badge"           },
  { key: "permissions", label: "Permissions", icon: "lock_person"     },
];

function defaultPerms(full: boolean): ModulePerm {
  return { view: full, create: full, edit: full, delete: full };
}

const INITIAL: RolePerms = {
  admin:     Object.fromEntries(modules.map(m => [m.key, defaultPerms(true)])),
  advisor:   Object.fromEntries(modules.map(m => [m.key, m.key === "clients" || m.key === "dashboard" || m.key === "properties" || m.key === "schedule" ? defaultPerms(true) : m.key === "contracts" ? { view: true, create: false, edit: false, delete: false } : defaultPerms(false)])),
  legal:     Object.fromEntries(modules.map(m => [m.key, m.key === "contracts" || m.key === "templates" || m.key === "dashboard" ? defaultPerms(true) : defaultPerms(false)])),
  admin2:    Object.fromEntries(modules.map(m => [m.key, m.key === "schedule" || m.key === "dashboard" || m.key === "employees" || m.key === "tracking" ? defaultPerms(true) : defaultPerms(false)])),
  postsales: Object.fromEntries(modules.map(m => [m.key, m.key === "clients" || m.key === "tracking" || m.key === "dashboard" ? defaultPerms(true) : defaultPerms(false)])),
};

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${on ? "bg-[#023143]" : "bg-[#c1c7cc]"}`}>
      <span className={`absolute top-[2px] left-[2px] w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${on ? "translate-x-[16px]" : "translate-x-0"}`} />
    </button>
  );
}

const perms: Array<keyof ModulePerm> = ["view", "create", "edit", "delete"];

export default function PermissionsPage() {
  const [activeRole, setActiveRole] = useState("admin");
  const [matrix, setMatrix] = useState<RolePerms>(INITIAL);
  const [saved, setSaved] = useState(false);

  function toggle(mod: string, perm: keyof ModulePerm) {
    setMatrix(prev => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        [mod]: { ...prev[activeRole][mod], [perm]: !prev[activeRole][mod][perm] },
      },
    }));
    setSaved(false);
  }

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  const role = roles.find(r => r.id === activeRole)!;

  return (
    <AdminLayout>
      <div className="flex justify-between items-start animate-slide-up mb-1">
        <div>
          <h2 className="text-[30px] font-bold tracking-tight text-[#1a1c1d]">Permissions</h2>
          <p className="text-[14px] text-[#41484c] mt-1">Configure module access per role. Changes apply to all users assigned to that role.</p>
        </div>
        <button
          onClick={save}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all shadow-sm ${saved ? "bg-[#2E7D32] text-white" : "bg-[#023143] text-white hover:bg-[#001b27]"}`}
        >
          <span className="material-symbols-outlined text-[17px]">{saved ? "check" : "save"}</span>
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex gap-5 animate-slide-up delay-100">
        {/* Role cards */}
        <div className="w-60 shrink-0 space-y-2">
          {roles.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-150 ${
                activeRole === r.id
                  ? "border-[#023143] bg-[#023143] shadow-sm"
                  : "border-[#e2e2e4] bg-white hover:border-[#023143]/30 hover:bg-[#f4f3f5]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: activeRole === r.id ? "rgba(255,255,255,.15)" : r.bg }}>
                  <span className="material-symbols-outlined text-[15px]" style={{ color: activeRole === r.id ? "#fff" : r.color }}>shield_person</span>
                </div>
                <div>
                  <p className={`text-[12px] font-bold leading-tight ${activeRole === r.id ? "text-white" : "text-[#1a1c1d]"}`}>{r.label}</p>
                  <p className={`text-[10px] mt-0.5 leading-tight ${activeRole === r.id ? "text-white/60" : "text-[#72787c]"}`}>{r.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Permission matrix */}
        <div className="flex-1 card overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#e2e2e4] bg-[#f9f9fb] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: role.bg }}>
              <span className="material-symbols-outlined text-[17px]" style={{ color: role.color }}>shield_person</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#1a1c1d]">{role.label}</h3>
              <p className="text-[11px] text-[#72787c]">{role.desc}</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#e2e2e4] bg-[#f9f9fb]">
                  <th className="py-3 px-6 text-left text-[11px] font-bold text-[#72787c] uppercase tracking-wider">Module</th>
                  {perms.map(p => (
                    <th key={p} className="py-3 px-4 text-center text-[11px] font-bold text-[#72787c] uppercase tracking-wider w-20">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e4]">
                {modules.map(mod => {
                  const mp = matrix[activeRole][mod.key];
                  const hasAny = Object.values(mp).some(Boolean);
                  return (
                    <tr key={mod.key} className="hover:bg-[#f9f9fb] transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${hasAny ? "bg-[#c2e8ff]" : "bg-[#f4f3f5]"}`}>
                            <span className={`material-symbols-outlined text-[15px] ${hasAny ? "text-[#023143]" : "text-[#72787c]"}`}>{mod.icon}</span>
                          </div>
                          <span className={`text-[13px] font-semibold ${hasAny ? "text-[#1a1c1d]" : "text-[#72787c]"}`}>{mod.label}</span>
                          {!hasAny && <span className="text-[10px] text-[#72787c] bg-[#e2e2e4] px-1.5 py-0.5 rounded font-semibold">No access</span>}
                        </div>
                      </td>
                      {perms.map(p => (
                        <td key={p} className="py-3.5 px-4 text-center">
                          <div className="flex justify-center">
                            <Toggle on={mp[p]} onChange={() => toggle(mod.key, p)} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
