import AdminLayout from "@/components/AdminLayout";

const alerts = [
  {
    icon:"gavel",iconBg:"bg-[#ffdad6]/20 text-[#ba1a1a]",
    title:"Pending Contracts Validation",desc:"Project 'Torre Alba' - 3 contracts unverified",
    priority:"High",priorityBg:"bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/10",dot:"bg-[#ba1a1a]",
    assigneeImg:"https://lh3.googleusercontent.com/aida-public/AB6AXuBp7tmreQ_4G6RfE7uFwjTwpCyXQzSNp5vpwCEwnjZQyzKl7Bsz5AqjNPT5Mf1mJRjsCSlktSPNAzu_TXI5Qn2AwNyuoixFr6AEOi1J313ESuTHTHVvn0AH3DxwVflb-_5QwkROohcpShKTWI6m5D0w9mh_ZutsmDS2rDc3aO2w6koi53iVj9vyNAQqUEMKtb6VoWjhjxMZYhmp4gkFRRzvWKD4KJkfoSYM26MCkqf-t67VPuwQR-9nqnYoZKtZS09IS6WOgCfjnINj",
    assignee:"Elena Rojas",action:"Review",suggestion:"Review and sign legal documents",
  },
  {
    icon:"construction",iconBg:"bg-[#ffdad6]/20 text-[#ba1a1a]",
    title:"Work Progress Not Sent",desc:"Project 'Mirador 2' - Week 14 delayed",
    priority:"High",priorityBg:"bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/10",dot:"bg-[#ba1a1a]",
    assigneeInitials:"CM",assigneeBg:"bg-[#023143] text-white",
    assignee:"Carlos Mendoza",action:"Request",suggestion:"Upload photos and weekly report",
  },
  {
    icon:"record_voice_over",iconBg:"bg-[#ffdcbf]/30 text-[#442605]",
    title:"Clients without recent contact",desc:"7 VIP clients untouched for >30 days",
    priority:"Medium",priorityBg:"bg-[#ffdcbf] text-[#623f1c] border-[#442605]/10",dot:"bg-[#442605]",
    assigneeImg:"https://lh3.googleusercontent.com/aida-public/AB6AXuDEl3oXwtb7cZeSUnZMY9L5CwCjtI7y9ovCwHVdnxBWcXjpzOX4nVKusHGJAmnglZ0LCbxMdWPPzbTrIj-bWGiNs4M98PQKX9IdTFzU6bZg-PabuB55r2DoDetCBX3NwhUP2Ruujc5iRERXmw3GQ8nt_veBvDphYie1Ifms-4jq7P7hcpD-EXbER_3ecF7y6tUOJraN0R9eyBDTqt_CGNj-hzmKmdnMgfY2lTcBB7NRxQ_7Fk1ymgcyXAcTsXUeEKdRrSsCuZdi46xa",
    assignee:"Luis Aranda",action:"Assign",suggestion:"Schedule follow-up calls",
  },
  {
    icon:"scanner",iconBg:"bg-[#c2e8ff]/30 text-[#023143]",
    title:"Non-digitalized Docs",desc:"Archive Room B - 45 files pending",
    priority:"Low",priorityBg:"bg-[#e2e2e4] text-[#41484c] border-[#c1c7cc]/50",dot:"bg-[#72787c]",
    assigneeInitials:"AS",assigneeBg:"bg-[#e2e2e4] text-[#41484c]",
    assignee:"Admin Staff",action:"Details",suggestion:"Scan and upload to database",
  },
  {
    icon:"event",iconBg:"bg-[#ffdcbf]/30 text-[#442605]",
    title:"Upcoming Meetings Setup",desc:"Board Review at 14:00 - Room prep",
    priority:"Medium",priorityBg:"bg-[#ffdcbf] text-[#623f1c] border-[#442605]/10",dot:"bg-[#442605]",
    assigneeInitials:"AS",assigneeBg:"bg-[#e2e2e4] text-[#41484c]",
    assignee:"Admin Staff",action:"Details",suggestion:"Prepare A/V and documentation",
  },
];

export default function TrackingPage() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-[36px] leading-[44px] font-bold tracking-[-0.02em] text-[#1a1c1d]">Tracking &amp; Alerts</h2>
          <p className="text-base text-[#41484c] mt-2">Monitor pending tasks, operational bottlenecks, and critical alerts across all divisions.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-[#c1c7cc] text-[#1a1c1d] bg-white rounded-lg text-[12px] font-semibold hover:bg-[#f4f3f5] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>Filter View
          </button>
          <button className="px-4 py-2 bg-[#023143] text-white rounded-lg text-[12px] font-semibold shadow-sm hover:bg-[#001b27] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>Export Report
          </button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="bg-white rounded-xl border border-[#c1c7cc] p-6 shadow-[0_4px_20px_rgba(2,49,67,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#ba1a1a]" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[12px] font-semibold text-[#41484c] uppercase tracking-wider">Critical Alerts</span>
            <span className="material-symbols-outlined text-[#ba1a1a] bg-[#ffdad6]/30 p-2 rounded-lg">warning</span>
          </div>
          <div className="text-[28px] font-semibold text-[#1a1c1d]">12</div>
          <div className="text-[12px] font-semibold text-[#ba1a1a] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>+3 since yesterday
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#c1c7cc] p-6 shadow-[0_4px_20px_rgba(2,49,67,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#f0bd8f]" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[12px] font-semibold text-[#41484c] uppercase tracking-wider">Pending Contracts</span>
            <span className="material-symbols-outlined text-[#442605] bg-[#ffdcbf]/50 p-2 rounded-lg">contract</span>
          </div>
          <div className="text-[28px] font-semibold text-[#1a1c1d]">8</div>
          <div className="text-[12px] font-semibold text-[#41484c] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>Requires follow-up
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#c1c7cc] p-6 shadow-[0_4px_20px_rgba(2,49,67,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#023143]" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[12px] font-semibold text-[#41484c] uppercase tracking-wider">Actionable Items</span>
            <span className="material-symbols-outlined text-[#023143] bg-[#c2e8ff]/50 p-2 rounded-lg">check_circle</span>
          </div>
          <div className="text-[28px] font-semibold text-[#1a1c1d]">24</div>
          <div className="text-[12px] font-semibold text-[#023143] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>View all tasks
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-xl border border-[#c1c7cc] shadow-[0_4px_20px_rgba(2,49,67,0.05)] overflow-hidden">
        <div className="p-6 border-b border-[#e2e2e4] flex justify-between items-center bg-[#f9f9fb]">
          <h3 className="text-[20px] font-semibold text-[#1a1c1d]">Active Monitoring Panel</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#eeeeef] rounded-full text-[12px] font-semibold text-[#41484c] cursor-pointer hover:bg-[#e8e8e9]">All</span>
            <span className="px-3 py-1 bg-[#ffdad6] text-[#93000a] rounded-full text-[12px] font-semibold cursor-pointer border border-[#ba1a1a]/20">High</span>
            <span className="px-3 py-1 bg-[#eeeeef] rounded-full text-[12px] font-semibold text-[#41484c] cursor-pointer hover:bg-[#e8e8e9]">Medium</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f9fb] border-b border-[#e2e2e4]">
                {["Issue / Alert Description","Priority","Assigned To","Suggested Action","Action"].map(h => (
                  <th key={h} className={`py-4 px-6 text-[12px] font-semibold text-[#3d6377] uppercase tracking-wider ${h==="Action"?"text-right":""} ${h==="Issue / Alert Description"?"w-1/3":""} ${h==="Priority"?"w-32":""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-[#1a1c1d] divide-y divide-[#e2e2e4]">
              {alerts.map((a) => (
                <tr key={a.title} className="hover:bg-[#f4f3f5] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${a.iconBg}`}>
                        <span className="material-symbols-outlined text-[18px]">{a.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-[#1a1c1d]">{a.title}</p>
                        <p className="text-sm text-[#41484c]">{a.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[12px] font-semibold border ${a.priorityBg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${a.dot} mr-1.5`} />{a.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {a.assigneeImg
                        ? <img src={a.assigneeImg} alt={a.assignee} className="w-6 h-6 rounded-full object-cover" />
                        : <div className={`w-6 h-6 rounded-full ${a.assigneeBg} flex items-center justify-center text-[10px] font-bold`}>{a.assigneeInitials}</div>
                      }
                      <span className="text-sm">{a.assignee}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-[#41484c]">{a.suggestion}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-2 border border-[#c1c7cc] text-[#023143] rounded-lg text-[12px] font-semibold hover:bg-[#eeeeef] transition-colors">{a.action}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
