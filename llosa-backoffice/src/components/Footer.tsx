export default function Footer() {
  return (
    <footer className="w-full py-4 mt-auto border-t border-[#E5E7EB] bg-[#F9FAFB] text-slate-400 text-xs flex justify-between items-center px-8">
      <div>© 2024 Llosa Edificaciones. All rights reserved.</div>
      <div className="flex gap-4">
        <a href="#" className="text-[#023143] underline hover:opacity-70">Privacy Policy</a>
        <a href="#" className="text-[#023143] underline hover:opacity-70">Terms of Service</a>
        <a href="#" className="text-[#023143] underline hover:opacity-70">Support</a>
      </div>
    </footer>
  );
}
