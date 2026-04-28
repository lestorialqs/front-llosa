"use client";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

/* ── Data ─────────────────────────────────────────────── */
type Employee = {
  id: number;
  initials: string;
  color: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
  lastAccess: string;
};

type Module = {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
};

const EMPLOYEES: Employee[] = [
  { id: 1, initials: "ER", color: "bg-[#023143] text-white", name: "Elena Rodriguez",  email: "elena.r@llosa.com",   role: "Commercial Advisor", status: "ACTIVE",   lastAccess: "Today, 09:41 AM" },
  { id: 2, initials: "CM", color: "bg-[#442605] text-[#ffdcbf]", name: "Carlos Mendez",    email: "c.mendez@llosa.com",  role: "Legal",             status: "ACTIVE",   lastAccess: "Yesterday, 14:20" },
  { id: 3, initials: "ST", color: "bg-[#e9e0e1] text-[#635d5e]", name: "Sofia Torres",     email: "s.torres@llosa.com",  role: "Post-sales",        status: "INACTIVE", lastAccess: "Oct 12, 2023" },
  { id: 4, initials: "DC", color: "bg-[#c2e8ff] text-[#001b27]", name: "David Chen",       email: "d.chen@llosa.com",    role: "Global Admin",      status: "ACTIVE",   lastAccess: "Today, 11:05 AM" },
];

const DEFAULT_MODULES: Module[] = [
  { key: "clients",    label: "Clients Module", description: "View, Create, Edit", enabled: true  },
  { key: "contracts",  label: "Contracts",      description: "View only",          enabled: true  },
  { key: "projects",   label: "Projects",       description: "No access",          enabled: false },
  { key: "templates",  label: "Templates",      description: "View only",          enabled: true  },
  { key: "schedule",   label: "Schedule",       description: "View, Edit",         enabled: true  },
  { key: "tracking",   label: "Tracking",       description: "View only",          enabled: false },
  { key: "employees",  label: "Employees",      description: "No access",          enabled: false },
  { key: "permissions",label: "Permissions",    description: "No access",          enabled: false },
];

const ROLES = ["Commercial Advisor", "Legal", "Post-sales", "Global Admin", "Manager", "Viewer"];

/* ── Toggle Switch ────────────────────────────────────── */
function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-[#023143]" : "bg-[#c1c7cc]"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function EmployeesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(EMPLOYEES[0]);
  const [panelOpen, setPanelOpen] = useState(true);
  const [modules, setModules] = useState<Module[]>(DEFAULT_MODULES);
  const [selectedRole, setSelectedRole] = useState("Commercial Advisor");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("Active");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const filtered = EMPLOYEES.filter(e =>
    (statusFilter === "All" || e.status === statusFilter.toUpperCase()) &&
    (roleFilter === "All Roles" || e.role === roleFilter)
  );

  function openPanel(emp: Employee) {
    setSelectedEmployee(emp);
    setSelectedRole(emp.role);
    setPanelOpen(true);
  }

  function toggleModule(key: string) {
    setModules(prev =>
      prev.map(m => m.key === key ? { ...m, enabled: !m.enabled } : m)
    );
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[36px] leading-[44px] font-bold tracking-[-0.02em] text-[#1a1c1d]">
            Employee Directory
          </h2>
          <p className="text-sm text-[#3d6377] mt-1">
            Manage organizational roles, system access, and module permissions.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#023143] text-white text-sm font-semibold rounded-lg hover:bg-[#001b27] transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Employee
        </button>
      </div>

      {/* Layout: table + slide panel */}
      <div className="flex gap-6 items-start">
        {/* Table Card */}
        <div className={`flex-1 bg-white rounded-xl border border-[#e2e2e4] shadow-[0_4px_20px_rgba(2,49,67,0.04)] overflow-hidden transition-all duration-300 ${panelOpen ? "min-w-0" : ""}`}>
          {/* Filter Bar */}
          <div className="px-6 py-4 border-b border-[#e2e2e4] flex items-center gap-3">
            {/* Role filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 bg-[#f4f3f5] border border-[#c1c7cc] rounded-lg text-sm text-[#1a1c1d] font-medium focus:outline-none focus:border-[#023143] cursor-pointer"
              >
                <option>All Roles</option>
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#72787c] text-[16px] pointer-events-none">expand_more</span>
            </div>
            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as "All" | "Active" | "Inactive")}
                className="appearance-none pl-3 pr-8 py-1.5 bg-[#f4f3f5] border border-[#c1c7cc] rounded-lg text-sm text-[#1a1c1d] font-medium focus:outline-none focus:border-[#023143] cursor-pointer"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#72787c] text-[16px] pointer-events-none">expand_more</span>
            </div>
            <span className="ml-auto text-sm text-[#72787c]">
              Showing <span className="font-semibold text-[#1a1c1d]">{filtered.length}</span> of{" "}
              <span className="font-semibold text-[#023143]">42</span>
            </span>
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e2e2e4] bg-[#f9f9fb]">
                {["Employee", "Role", "Status", "Last Access", "Actions"].map(h => (
                  <th key={h} className={`py-3 px-6 text-[12px] font-semibold text-[#72787c] uppercase tracking-wider ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e2e4]">
              {filtered.map(emp => {
                const isSelected = selectedEmployee?.id === emp.id && panelOpen;
                return (
                  <tr
                    key={emp.id}
                    className={`transition-colors cursor-pointer group ${isSelected ? "bg-[#f4f3f5]" : "hover:bg-[#f9f9fb]"}`}
                    onClick={() => openPanel(emp)}
                  >
                    {/* Employee */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${emp.color}`}>
                          {emp.initials}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isSelected ? "text-[#023143]" : "text-[#1a1c1d]"}`}>{emp.name}</p>
                          <p className="text-xs text-[#3d6377] mt-0.5">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="py-4 px-6 text-sm text-[#41484c]">{emp.role}</td>
                    {/* Status */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        emp.status === "ACTIVE"
                          ? "bg-[#E8F5E9] text-[#2E7D32]"
                          : "bg-[#e2e2e4] text-[#41484c]"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "ACTIVE" ? "bg-[#2E7D32]" : "bg-[#72787c]"}`} />
                        {emp.status}
                      </span>
                    </td>
                    {/* Last Access */}
                    <td className="py-4 px-6 text-sm text-[#41484c]">{emp.lastAccess}</td>
                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={e => { e.stopPropagation(); openPanel(emp); }}
                        className={`p-1.5 rounded-md transition-colors ${isSelected ? "text-[#023143] bg-[#c2e8ff]" : "text-[#72787c] hover:text-[#023143] hover:bg-[#c2e8ff] opacity-0 group-hover:opacity-100"}`}
                        title="Edit permissions"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-[#72787c] text-sm">No employees match the selected filters.</div>
          )}
        </div>

        {/* Edit Permissions Panel */}
        {panelOpen && selectedEmployee && (
          <div className="w-[320px] shrink-0 bg-white rounded-xl border border-[#e2e2e4] shadow-[0_8px_32px_rgba(2,49,67,0.10)] overflow-hidden">
            {/* Panel Header */}
            <div className="px-6 py-5 border-b border-[#e2e2e4] flex items-start justify-between bg-[#f9f9fb]">
              <div>
                <h3 className="text-base font-bold text-[#1a1c1d]">Edit Permissions</h3>
                <p className="text-sm text-[#41484c] mt-0.5">{selectedEmployee.name}</p>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-md text-[#72787c] hover:bg-[#e2e2e4] hover:text-[#1a1c1d] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Assigned Role */}
            <div className="px-6 pt-5 pb-4 border-b border-[#e2e2e4]">
              <label className="text-[12px] font-semibold text-[#41484c] uppercase tracking-wider block mb-2">
                Assigned Role
              </label>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                  className="w-full appearance-none pl-3 pr-9 py-2.5 bg-white border border-[#c1c7cc] rounded-lg text-sm text-[#1a1c1d] font-medium focus:outline-none focus:border-[#023143] focus:ring-1 focus:ring-[#023143] cursor-pointer"
                >
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#72787c] text-[18px] pointer-events-none">expand_more</span>
              </div>
              <p className="text-xs text-[#72787c] mt-2 leading-relaxed">
                Changing the role will apply a preset template of permissions below.
              </p>
            </div>

            {/* Module Toggles */}
            <div className="px-6 py-4 flex flex-col gap-4 overflow-y-auto max-h-[420px]">
              {modules.map(mod => (
                <div key={mod.key} className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1a1c1d] leading-tight">{mod.label}</p>
                    <p className="text-[11px] text-[#72787c] mt-0.5">{mod.enabled ? mod.description : "No access"}</p>
                  </div>
                  <Toggle enabled={mod.enabled} onToggle={() => toggleModule(mod.key)} />
                </div>
              ))}
            </div>

            {/* Panel Footer */}
            <div className="px-6 py-4 border-t border-[#e2e2e4] flex gap-3 bg-[#f9f9fb]">
              <button
                onClick={() => setPanelOpen(false)}
                className="flex-1 py-2 rounded-lg border border-[#c1c7cc] text-sm font-semibold text-[#41484c] hover:bg-[#e2e2e4] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-2 rounded-lg bg-[#023143] text-white text-sm font-semibold hover:bg-[#001b27] transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
