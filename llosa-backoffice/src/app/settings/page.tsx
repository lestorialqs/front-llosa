import AdminLayout from "@/components/AdminLayout";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="mb-4">
        <h2 className="text-[36px] leading-[44px] font-bold tracking-[-0.02em] text-[#1a1c1d]">Settings</h2>
        <p className="text-base text-[#41484c] mt-2">Configure portal preferences and system settings.</p>
      </div>
      <div className="bg-white rounded-xl border border-[#e2e2e4] p-12 text-center shadow-[0_4px_20px_rgba(2,49,67,0.03)]">
        <span className="material-symbols-outlined text-[64px] text-[#c1c7cc]">settings</span>
        <h3 className="text-[20px] font-semibold text-[#1a1c1d] mt-4">Settings Module</h3>
        <p className="text-sm text-[#41484c] mt-2">System settings coming soon.</p>
      </div>
    </AdminLayout>
  );
}
