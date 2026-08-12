import { FiAlertTriangle, FiX } from "react-icons/fi";
import { useState } from "react";
import productService from "../../../services/productService";

function DeleteProductModal({ open, product, onClose, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!open || !product) {
    return null;
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);
      setError("");

      await productService.deleteAdminProduct(product.id);

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Hapus Produk</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
              <FiAlertTriangle className="h-5 w-5 text-red-500" />
            </div>

            <div>
              <p className="font-medium text-slate-900">
                Yakin ingin menghapus produk ini?
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Produk{" "}
                <span className="font-medium text-slate-700">
                  {product.name}
                </span>{" "}
                akan dihapus dari daftar produk.
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Menghapus..." : "Hapus Produk"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
