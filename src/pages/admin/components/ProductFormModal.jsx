import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import productService from "../../../services/productService";
import categoryService from "../../../services/categoryService";

const initialForm = {
  name: "",
  brand: "",
  category: "",
  price: "",
  priceDisc: "",
  stock: "",
  description: "",
};

function ProductFormModal({
  open,
  mode = "create",
  productId = null,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit";

  useEffect(() => {
    if (!open) return;

    async function loadData() {
      try {
        setIsLoading(true);
        setError("");

        const categoriesData = await categoryService.getCategories();

        setCategories(categoriesData);

        if (!isEdit) {
          setForm(initialForm);
          return;
        }

        const product = await productService.getAdminProductById(productId);

        setForm({
          name: product.name ?? "",
          brand: product.brand ?? "",
          category: String(product.category_id ?? ""),
          price: product.price ?? "",
          priceDisc: product.price_disc ?? "",
          stock: product.stock ?? "",
          description: product.description ?? "",
        });
      } catch (error) {
        console.error("LOAD PRODUCT FORM ERROR:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [open, isEdit, productId]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function calculateDiscount(price, priceDisc) {
    const normalPrice = Number(price);
    const discountPrice = Number(priceDisc);

    if (!normalPrice || !discountPrice || discountPrice >= normalPrice) {
      return 0;
    }

    return Math.round(((normalPrice - discountPrice) / normalPrice) * 100);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSaving(true);
      setError("");

      const price = Number(form.price);

      const priceDisc = form.priceDisc ? Number(form.priceDisc) : null;

      const stock = Number(form.stock);
      const categoryId = Number(form.category);

      if (!form.name.trim()) {
        throw new Error("Nama produk wajib diisi.");
      }

      if (!form.brand.trim()) {
        throw new Error("Brand wajib diisi.");
      }

      if (!categoryId) {
        throw new Error("Kategori wajib dipilih.");
      }

      if (!price || price <= 0) {
        throw new Error("Harga harus lebih dari 0.");
      }

      if (stock < 0) {
        throw new Error("Stok tidak boleh kurang dari 0.");
      }

      if (priceDisc !== null) {
        if (priceDisc <= 0) {
          throw new Error("Harga promo harus lebih dari 0.");
        }

        if (priceDisc >= price) {
          throw new Error("Harga promo harus lebih rendah dari harga normal.");
        }
      }

      const discount = calculateDiscount(price, priceDisc);

      const payload = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        category_id: categoryId,
        price,
        price_disc: priceDisc,
        discount,
        stock,
        description: form.description.trim(),
      };

      if (isEdit) {
        await productService.updateAdminProduct(productId, payload);
      } else {
        await productService.createAdminProduct(payload);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("SAVE PRODUCT ERROR:", error);
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (!open) return null;

  const calculatedDiscount = calculateDiscount(form.price, form.priceDisc);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {isEdit ? "Edit Produk" : "Tambah Produk"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEdit
                ? "Perbarui informasi produk."
                : "Tambahkan produk baru ke BRilianShop."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {isLoading ? (
            <p className="py-10 text-center text-sm text-slate-500">
              Memuat data produk...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nama Produk
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
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
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Kategori
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="">Pilih kategori</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Stok
                  </label>

                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Harga Normal
                  </label>

                  <input
                    type="number"
                    name="price"
                    min="1"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Harga Promo
                  </label>

                  <input
                    type="number"
                    name="priceDisc"
                    min="1"
                    value={form.priceDisc}
                    onChange={handleChange}
                    placeholder="Kosongkan jika tidak promo"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />

                  {calculatedDiscount > 0 && (
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      Promo aktif · Diskon {calculatedDiscount}%
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Deskripsi
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isSaving || categories.length === 0}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving
                    ? "Menyimpan..."
                    : isEdit
                      ? "Simpan Perubahan"
                      : "Simpan Produk"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductFormModal;
