import { FiX, FiMapPin, FiCreditCard, FiPackage } from "react-icons/fi";
import formatCurrency from "../../../utils/formatCurrency";
import formatDate from "../../../utils/formatDate";

function OrderDetailModal({ order, onClose }) {
  if (!order) {
    return null;
  }

  const address = order.shipping_address;
  const items = order.OrderItems || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Detail Pesanan #{order.id}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {formatDate(order.created_at)}
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
          {/* Order Information */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-500">
                <FiPackage className="h-4 w-4" />
                <span className="text-xs">Status</span>
              </div>

              <p className="font-semibold text-slate-800">
                {order.status === "pending"
                  ? "Pending"
                  : order.status === "shipped"
                    ? "Dikirim"
                    : order.status === "delivered"
                      ? "Terkirim"
                      : order.status}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-500">
                <FiCreditCard className="h-4 w-4" />
                <span className="text-xs">Pembayaran</span>
              </div>

              <p className="font-semibold text-slate-800">
                {order.payment_method || "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-500">
                <FiPackage className="h-4 w-4" />
                <span className="text-xs">Total</span>
              </div>

              <p className="font-semibold text-slate-800">
                {formatCurrency(order.total)}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <FiMapPin className="h-5 w-5 text-emerald-600" />

              <h3 className="font-semibold text-slate-900">
                Alamat Pengiriman
              </h3>
            </div>

            {address ? (
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">
                  {address.name || "-"}
                </p>

                <p className="mt-1">{address.phone || "-"}</p>

                <p className="mt-2">{address.address || "-"}</p>

                <p>
                  {address.city || "-"}, {address.province || "-"}
                </p>

                <p>{address.postalCode || "-"}</p>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                Alamat pengiriman tidak tersedia.
              </div>
            )}
          </section>

          {/* Products */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <FiPackage className="h-5 w-5 text-emerald-600" />

              <h3 className="font-semibold text-slate-900">Produk Pesanan</h3>
            </div>

            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                        <FiPackage className="h-5 w-5 text-slate-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {item.Product?.name || "Produk"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-slate-800">
                      {formatCurrency(item.subtotal)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-slate-500">
                  Tidak ada produk pada pesanan ini.
                </p>
              )}
            </div>
          </section>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-5">
            <span className="font-medium text-slate-500">Total Pesanan</span>

            <span className="text-xl font-bold text-slate-900">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;
