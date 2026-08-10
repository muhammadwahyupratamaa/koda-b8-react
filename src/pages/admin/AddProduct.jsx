import { FiArrowLeft, FiImage, FiSave, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    priceDisc: "",
    stock: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("PRODUCT DATA:", form);
    alert("Produk berhasil disimpan (dummy)");

    navigate("/admin/products");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Tambah Produk
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tambahkan produk baru ke BRilianShop.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Informasi Produk
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Informasi dasar mengenai produk.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nama Produk
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Contoh: Headphone Wireless Premium"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Brand
                  </label>

                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="Nama brand"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Kategori
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Rumah & Dapur">Rumah & Dapur</option>
                    <option value="Kecantikan">Kecantikan</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Buku & Alat Tulis">Buku & Alat Tulis</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Harga
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      Rp
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Harga Diskon
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      Rp
                    </span>

                    <input
                      type="number"
                      name="priceDisc"
                      value={form.priceDisc}
                      onChange={handleChange}
                      placeholder="Opsional"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Stok
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Deskripsi Produk
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Jelaskan detail dan keunggulan produk.
                </p>
              </div>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder="Tulis deskripsi produk..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </section>
          </div>
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Foto Produk
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Upload gambar utama produk.
                </p>
              </div>

              <div className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-emerald-400 hover:bg-emerald-50">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  <FiImage className="h-7 w-7" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-700">
                  Upload gambar produk
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG atau WEBP
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Pilih File
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Status Produk
              </h3>

              <div className="mt-5 space-y-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="status"
                    defaultChecked
                    className="h-4 w-4 accent-emerald-600"
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-700">Aktif</p>

                    <p className="text-xs text-slate-400">
                      Produk tampil di toko.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="status"
                    className="h-4 w-4 accent-emerald-600"
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-700">Draft</p>

                    <p className="text-xs text-slate-400">
                      Produk belum ditampilkan.
                    </p>
                  </div>
                </label>
              </div>
            </section>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  <FiSave className="h-5 w-5" />
                  Simpan Produk
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <FiX className="h-5 w-5" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
