import { FaTruck } from "react-icons/fa";

function TopBar() {
  return (
    <header className="bg-slate-950 border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 sm:text-sm">
        <FaTruck className="text-emerald-400" />

        <span>
          Gratis Ongkir <strong className="text-white">Min. Rp100.000</strong>

          <span className="mx-2 text-slate-600">•</span>

          Pengiriman ke Seluruh Indonesia
        </span>
      </div>
    </header>
  );
}

export default TopBar;