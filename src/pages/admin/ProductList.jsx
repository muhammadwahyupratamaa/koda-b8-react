import {
  FiEdit2,
  FiEye,
  FiMoreVertical,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      name: "Headphone Wireless Premium",
      brand: "SoundWave",
      category: "Elektronik",
      price: 450000,
      stock: 45,
      rating: 4.8,
      status: "Aktif",
    },
    {
      id: 2,
      name: "Smartphone 5G Ultra",
      brand: "TechMax",
      category: "Elektronik",
      price: 4200000,
      stock: 30,
      rating: 4.8,
      status: "Aktif",
    },
    {
      id: 3,
      name: "Kaos Polos Premium Cotton",
      brand: "UrbanWear",
      category: "Fashion",
      price: 125000,
      stock: 200,
      rating: 4.6,
      status: "Aktif",
    },
    {
      id: 4,
      name: "Sneakers Sport Runfast",
      brand: "SportPro",
      category: "Fashion",
      price: 550000,
      stock: 60,
      rating: 4.7,
      status: "Aktif",
    },
    {
      id: 5,
      name: "LED Desk Lamp",
      brand: "HomeLight",
      category: "Rumah & Dapur",
      price: 280000,
      stock: 80,
      rating: 4.5,
      status: "Aktif",
    },
    {
      id: 6,
      name: "Blender Portable Mini",
      brand: "BlendPro",
      category: "Rumah & Dapur",
      price: 189000,
      stock: 120,
      rating: 4.2,
      status: "Aktif",
    },
    {
      id: 7,
      name: "Serum Vitamin C Brightening",
      brand: "GlowSkin",
      category: "Kecantikan",
      price: 185000,
      stock: 150,
      rating: 4.8,
      status: "Promo",
    },
    {
      id: 8,
      name: "Sepatu Lari Trail Ultra",
      brand: "TrailMax",
      category: "Olahraga",
      price: 780000,
      stock: 35,
      rating: 4.6,
      status: "Aktif",
    },
  ];

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.brand} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Manajemen Produk
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Kelola semua produk yang tersedia di toko.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/products/create")}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <FiPlus className="h-5 w-5" />
          Tambah Produk
        </button>
      </div>

      {/* STAT */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Produk</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">18</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Produk Aktif</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">15</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Stok Menipis</p>
          <p className="mt-2 text-2xl font-bold text-orange-500">3</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Produk Promo</p>
          <p className="mt-2 text-2xl font-bold text-red-500">5</p>
        </div>
      </div>

      {/* TABLE */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* FILTER */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk, brand, atau kategori..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500"
            />
          </div>

          <select className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none">
            <option>Semua Kategori</option>
            <option>Elektronik</option>
            <option>Fashion</option>
            <option>Rumah & Dapur</option>
            <option>Kecantikan</option>
            <option>Olahraga</option>
          </select>

          <select className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none">
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Promo</option>
            <option>Nonaktif</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4 font-semibold">Produk</th>
                <th className="px-5 py-4 font-semibold">Kategori</th>
                <th className="px-5 py-4 font-semibold">Harga</th>
                <th className="px-5 py-4 font-semibold">Stok</th>
                <th className="px-5 py-4 font-semibold">Rating</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="transition hover:bg-slate-50">
                  {/* PRODUCT */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
                        IMG
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                      {product.category}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </td>

                  {/* STOCK */}
                  <td className="px-5 py-4">
                    <span
                      className={
                        product.stock <= 40
                          ? "font-medium text-orange-500"
                          : "text-slate-600"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* RATING */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">
                      ⭐ {product.rating}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.status === "Promo"
                          ? "bg-red-50 text-red-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        title="Lihat"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
                        title="Edit"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Hapus"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                      >
                        <FiMoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Menampilkan{" "}
            <span className="font-medium text-slate-700">
              {filteredProducts.length}
            </span>{" "}
            dari {products.length} produk
          </p>

          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
              Sebelumnya
            </button>

            <button className="rounded-lg bg-emerald-600 px-3 py-2 text-white">
              1
            </button>

            <button className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
              Selanjutnya
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductList;
