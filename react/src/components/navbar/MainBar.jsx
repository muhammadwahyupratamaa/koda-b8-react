import { Bell, Heart, Search, ShoppingCart, User } from "lucide-react";

function MainBar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-start gap-6 px-4 py-4">
        <div className="flex-shrink-0 flex gap-2 justify-center items-center">
          <div className="bg-blue-600 rounded-xl w-10 h-10 flex justify-center items-center">
            <h1 className="text-white font-bold text-sm">B</h1>
          </div>

          <p className="text-base ">BeliMudah</p>
        </div>

        <div className="flex items-center overflow-hidden rounded-lg w-2/4 border border-gray-300">
          <input
            type="text"
            placeholder="Cari produk,merek,kategori..."
            className="w-full px-4 text-sm py-2 bg-gray-100 outline-none"
          />

          <button className="bg-blue-600 px-4 py-2 cursor-pointer text-white hover:bg-blue-700 transition">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-6 text-gray-600">
          <button className="transition cursor-pointer hover:text-blue-600">
            <Bell className="h-5 w-5" />
          </button>

          <button className="flex items-center gap-2 cursor-pointer transition hover:text-blue-600">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">Budi</span>
          </button>

          <button className=" cursor-pointer transition hover:text-blue-600">
            <Heart className="h-5 w-5" />
          </button>

          <button className="cursor-pointer relative transition hover:text-blue-600">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainBar;
