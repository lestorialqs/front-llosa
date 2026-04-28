import AdminLayout from "@/components/AdminLayout";

const steps = [
  { label: "Separation", date: "Oct 12", done: true },
  { label: "Receipt Generated", date: "Oct 14", done: true },
  { label: "Contract Review", date: "In Progress", active: true },
  { label: "Contract Generated", date: "", done: false },
  { label: "Signed", date: "", done: false },
  { label: "Legalized", date: "", done: false },
  { label: "Digitalized", date: "", done: false },
  { label: "Sent", date: "", done: false },
];

const contracts = [
  { unit: "Torre Aviana - 1402", client: "Carlos Mendoza", id: "CTR-2023-0842", badge: "Review", badgeBg: "bg-[#c2e8ff] text-[#001e2b]", active: true },
  { unit: "Parque Sur - 501", client: "Maria Fernanda Rojas", id: "CTR-2023-0839", badge: "Legalized", badgeBg: "bg-[#e2e2e4] text-[#41484c]" },
  { unit: "Vistas del Golf - 202", client: "Inversiones Altamira SAC", id: "CTR-2023-0835", badge: "Signed", badgeBg: "bg-[#ffdcbf] text-[#2d1600]" },
  { unit: "Torre Aviana - 1104", client: "Luis Delgado", id: "CTR-2023-0831", badge: "Review", badgeBg: "bg-[#c2e8ff] text-[#001e2b]" },
  { unit: "Parque Sur - 802", client: "Elena Vargas", id: "CTR-2023-0828", badge: "Sent", badgeBg: "bg-[#d1fae5] text-[#065f46]" },
];

export default function ContractsPage() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-[36px] leading-[44px] font-bold tracking-[-0.02em] text-[#001b27]">Contract Tracking</h1>
          <p className="text-base text-[#41484c] mt-2">Manage and track the lifecycle of property contracts.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded border border-[#E5E7EB] bg-white text-[#1a1c1d] text-xs font-semibold hover:bg-[#f4f3f5] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>Filter
          </button>
          <button className="px-4 py-2 rounded bg-[#023143] text-white text-xs font-semibold hover:bg-[#001b27] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>New Contract
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Detail Panel */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
          {/* Progress Tracker Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-[0_4px_20px_rgba(2,49,67,0.05)]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2 py-1 bg-[#c2e8ff] text-[#001e2b] text-[12px] font-semibold rounded uppercase">Contract Review</span>
                  <span className="text-[12px] font-semibold text-[#72787c]">ID: CTR-2023-0842</span>
                </div>
                <h3 className="text-[28px] leading-[36px] font-semibold text-[#001b27]">Torre Aviana - Unit 1402</h3>
                <p className="text-sm text-[#41484c]">Client: Carlos Mendoza</p>
              </div>
              <div className="flex gap-2">
                {["download","edit"].map(icon => (
                  <button key={icon} className="w-10 h-10 rounded border border-[#E5E7EB] flex items-center justify-center text-[#41484c] hover:bg-[#f4f3f5] transition-colors">
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline */}
            <div className="relative py-8">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#eeeeef] -translate-y-1/2 z-0" />
              <div className="absolute top-1/2 left-0 w-[37%] h-[2px] bg-[#023143] -translate-y-1/2 z-0" />
              <div className="relative z-10 flex justify-between">
                {steps.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-2 cursor-pointer w-24">
                    {s.active ? (
                      <div className="w-8 h-8 rounded-full border-2 border-[#023143] bg-white flex items-center justify-center shadow-md">
                        <div className="w-3 h-3 rounded-full bg-[#023143]" />
                      </div>
                    ) : s.done ? (
                      <div className="w-6 h-6 rounded-full bg-[#023143] text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#eeeeef] border border-[#c1c7cc]" />
                    )}
                    <span className={`text-[12px] font-semibold text-center leading-tight ${s.active ? "text-[#001b27] font-bold" : s.done ? "text-[#001b27]" : "text-[#72787c]"}`}>
                      {s.label}
                    </span>
                    {s.date && <span className={`text-[10px] ${s.active ? "text-[#023143]" : "text-[#72787c]"}`}>{s.date}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex gap-4">
              <button className="px-6 py-2 rounded bg-[#023143] text-white text-xs font-semibold hover:bg-[#001b27] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">visibility</span>View Contract
              </button>
              <button className="px-6 py-2 rounded border border-[#E5E7EB] bg-white text-[#1a1c1d] text-xs font-semibold hover:bg-[#f4f3f5] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">upload_file</span>Upload Document
              </button>
              <button className="px-6 py-2 rounded border border-[#E5E7EB] bg-white text-[#1a1c1d] text-xs font-semibold hover:bg-[#f4f3f5] transition-colors flex items-center gap-2 ml-auto">
                <span className="material-symbols-outlined text-[18px]">mail</span>Send by Email
              </button>
            </div>
          </div>

          {/* Client & Property Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-[0_4px_20px_rgba(2,49,67,0.05)]">
              <h4 className="text-[20px] font-semibold text-[#001b27] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3d6377]">person</span>Client Information
              </h4>
              <div className="space-y-4">
                {[["Full Name","Carlos Eduardo Mendoza Silva"],["Document (DNI)","45892103"],["Email","c.mendoza@example.com"],["Phone","+51 987 654 321"]].map(([label,val]) => (
                  <div key={label}>
                    <p className="text-[12px] font-semibold text-[#72787c] uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-sm text-[#1a1c1d]">{val}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-[0_4px_20px_rgba(2,49,67,0.05)]">
              <h4 className="text-[20px] font-semibold text-[#001b27] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3d6377]">domain</span>Property Details
              </h4>
              <div className="space-y-4">
                {[["Project","Torre Aviana Residencial"],["Unit / Type","1402 / 3-Bedroom Flat"],["Total Value","$ 245,000.00"],["Separation Amount","$ 5,000.00 (Paid Oct 12)"]].map(([label,val]) => (
                  <div key={label}>
                    <p className="text-[12px] font-semibold text-[#72787c] uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-sm text-[#1a1c1d]">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="col-span-12 xl:col-span-4">
          <div className="bg-white rounded-xl border border-[#E5E7EB] flex flex-col h-[800px] shadow-[0_4px_20px_rgba(2,49,67,0.05)]">
            <div className="p-6 border-b border-[#E5E7EB]">
              <h3 className="text-[20px] font-semibold text-[#001b27]">Recent Contracts</h3>
              <div className="mt-4 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#72787c] text-[18px]">search</span>
                <input type="text" placeholder="Search list..." className="w-full bg-[#f9f9fb] border border-[#E5E7EB] rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-[#023143] transition-colors" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contracts.map((c) => (
                <div key={c.id} className={`p-4 border-b border-[#E5E7EB] cursor-pointer transition-colors ${c.active ? "bg-[#f4f3f5] border-l-4 border-l-[#023143]" : "hover:bg-[#f4f3f5]"}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[12px] font-semibold ${c.active ? "text-[#001b27] font-bold" : "text-[#1a1c1d]"}`}>{c.unit}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.badgeBg}`}>{c.badge}</span>
                  </div>
                  <p className="text-[13px] text-[#41484c]">{c.client}</p>
                  <p className="text-[11px] text-[#72787c] mt-2">ID: {c.id}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#E5E7EB] bg-[#f4f3f5] text-center">
              <button className="text-[12px] font-semibold text-[#3d6377] hover:text-[#001b27] transition-colors">Load More</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
