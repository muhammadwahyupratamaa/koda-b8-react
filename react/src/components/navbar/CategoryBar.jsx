import { ChevronDown, Menu } from "lucide-react";

function CategoryBar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white pl-10">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-3">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
        >
          <Menu className="h-4 w-4" />
          <span> Semua Kategori</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-8 text-sm text-gray-600">
          <button
            type="button"
            className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            💻 Elektronik
          </button>

          <button
            type="button"
            className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            👗 Fashion
          </button>

          <button
            type="button"
            className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            🏠 Rumah & Dapur
          </button>

          <button
            type="button"
            className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            💄 Kecantikan
          </button>

          <button
            type="button"
            className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            ⚽ Olahraga
          </button>

          <button
            type="button"
            className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            📚 Buku & Alat Tulis
          </button>

          <button
            type="button"
            className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
          >
            🔥 Promo
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CategoryBar;
