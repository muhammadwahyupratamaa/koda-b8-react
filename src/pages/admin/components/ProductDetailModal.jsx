import { FiX } from "react-icons/fi";
import formatCurrency from "../../../utils/formatCurrency";

function ProductDetailModal({ open, product, onClose }) {
  if (!open || !product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Detail Produk
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Informasi lengkap produk
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-xs text-slate-500">Nama Produk</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              {product.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {product.brand || "-"}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Kategori</p>
              <p className="mt-1 font-medium text-slate-800">
                {product.Category?.name || "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Stok</p>
              <p className="mt-1 font-medium text-slate-800">{product.stock}</p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Harga</p>
              <p className="mt-1 font-medium text-slate-800">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Harga Diskon</p>
              <p className="mt-1 font-medium text-slate-800">
                {product.price_disc ? formatCurrency(product.price_disc) : "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Rating</p>
              <p className="mt-1 font-medium text-slate-800">
                ⭐ {product.rating ?? 0}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Terjual</p>
              <p className="mt-1 font-medium text-slate-800">
                {product.sold ?? 0}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-900">
              Deskripsi
            </p>

            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {product.description || "Tidak ada deskripsi."}
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
