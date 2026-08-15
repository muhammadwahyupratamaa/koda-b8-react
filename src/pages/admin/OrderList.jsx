import { FiEye, FiPackage, FiSearch, FiTruck } from "react-icons/fi";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import OrderDetailModal from "./components/OrderDetailModal";

const initialStatistics = {
  total: 0,
  pending: 0,
  processing: 0,
  shipped: 0,
  delivered: 0,
};

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
};

function OrderList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [orders, setOrders] = useState([]);

  const [statistics, setStatistics] = useState(initialStatistics);

  const [pagination, setPagination] = useState(initialPagination);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  async function fetchOrders(
    page = pagination.page,
    currentSearch = search,
    currentStatus = statusFilter,
  ) {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", page);
      params.set("limit", pagination.limit);

      if (currentSearch.trim()) {
        params.set("search", currentSearch.trim());
      }

      if (currentStatus) {
        params.set("status", currentStatus);
      }

      const response = await api(`/admin/orders?${params.toString()}`);

      setOrders(response.data || []);

      setPagination(response.pagination || initialPagination);
    } catch (error) {
      console.error("Failed to fetch orders:", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStatistics() {
    try {
      const response = await api("/admin/orders/statistics");

      setStatistics(response.data || initialStatistics);
    } catch (error) {
      console.error("Failed to fetch order statistics:", error);
    }
  }

  useEffect(() => {
    fetchOrders(1);
    fetchStatistics();
  }, []);

  function handleSearchChange(e) {
    const value = e.target.value;

    setSearch(value);

    fetchOrders(1, value, statusFilter);
  }

  function handleStatusChange(e) {
    const value = e.target.value;

    setStatusFilter(value);

    fetchOrders(1, search, value);
  }

  function handlePreviousPage() {
    if (pagination.page <= 1) {
      return;
    }

    fetchOrders(pagination.page - 1, search, statusFilter);
  }

  function handleNextPage() {
    if (pagination.page >= pagination.totalPages) {
      return;
    }

    fetchOrders(pagination.page + 1, search, statusFilter);
  }

  function handlePageChange(page) {
    fetchOrders(page, search, statusFilter);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const wsUrl = `${
      import.meta.env.VITE_WS_URL || "ws://localhost:8081"
    }?token=${token}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Admin WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.event === "order_created") {
          fetchOrders(pagination.page, search, statusFilter);

          fetchStatistics();

          return;
        }

        if (message.event === "order_status_updated") {
          const updatedOrder = message.data;

          setOrders((currentOrders) =>
            currentOrders.map((order) =>
              String(order.id) === String(updatedOrder.id)
                ? {
                    ...order,
                    ...updatedOrder,
                  }
                : order,
            ),
          );

          setSelectedOrder((currentOrder) => {
            if (
              !currentOrder ||
              String(currentOrder.id) !== String(updatedOrder.id)
            ) {
              return currentOrder;
            }

            return {
              ...currentOrder,
              ...updatedOrder,
            };
          });

          fetchStatistics();

          return;
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Admin WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Admin WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [pagination.page, search, statusFilter]);

  function getStatusLabel(status) {
    if (status === "pending") {
      return "Pending";
    }

    if (status === "processing") {
      return "Diproses";
    }

    if (status === "shipped") {
      return "Dikirim";
    }

    if (status === "delivered") {
      return "Terkirim";
    }

    return status || "-";
  }

  function getStatusStyle(status) {
    const styles = {
      pending: "bg-orange-50 text-orange-600",
      processing: "bg-yellow-50 text-yellow-600",
      shipped: "bg-blue-50 text-blue-600",
      delivered: "bg-emerald-50 text-emerald-600",
    };

    return styles[status] || "bg-slate-50 text-slate-600";
  }

  function getCustomer(order) {
    return order.shipping_address?.name || `User ${order.user_id}`;
  }

  function getEmail(order) {
    return order.shipping_address?.email || "-";
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Manajemen Pesanan
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Kelola dan pantau seluruh pesanan pelanggan.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Pesanan</p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {statistics.total}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiPackage className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending</p>

              <p className="mt-2 text-2xl font-bold text-orange-500">
                {statistics.pending}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FiPackage className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Diproses</p>

              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {statistics.processing}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
              <FiPackage className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Dikirim</p>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                {statistics.shipped}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiTruck className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search & Filter */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari nomor pesanan atau pelanggan..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="">Semua Status</option>

            <option value="pending">Pending</option>

            <option value="processing">Diproses</option>

            <option value="shipped">Dikirim</option>

            <option value="delivered">Terkirim</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4 font-semibold">Pesanan</th>

                <th className="px-5 py-4 font-semibold">Pelanggan</th>

                <th className="px-5 py-4 font-semibold">Tanggal</th>

                <th className="px-5 py-4 font-semibold">Produk</th>

                <th className="px-5 py-4 font-semibold">Total</th>

                <th className="px-5 py-4 font-semibold">Status</th>

                <th className="px-5 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    Memuat pesanan...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-10 text-center text-sm text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                orders.map((order) => {
                  const customer = getCustomer(order);

                  return (
                    <tr key={order.id} className="transition hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          #{order.id}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-600">
                            {customer.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {customer}
                            </p>

                            <p className="text-xs text-slate-400">
                              {getEmail(order)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {formatDate(order.created_at)}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {order.OrderItems?.reduce(
                          (total, item) => total + Number(item.quantity),
                          0,
                        ) || 0}{" "}
                        produk
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {formatCurrency(order.total)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                            order.status,
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            type="button"
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600"
                          >
                            <FiEye className="h-4 w-4" />
                            Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {!loading && !error && orders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    Tidak ada pesanan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Menampilkan{" "}
            <span className="font-medium text-slate-700">{orders.length}</span>{" "}
            dari{" "}
            <span className="font-medium text-slate-700">
              {pagination.total}
            </span>{" "}
            pesanan
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={pagination.page <= 1 || loading}
              className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Sebelumnya
            </button>

            {Array.from(
              {
                length: pagination.totalPages,
              },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                disabled={loading}
                className={`rounded-lg px-3 py-2 ${
                  pagination.page === page
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={handleNextPage}
              disabled={pagination.page >= pagination.totalPages || loading}
              className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </section>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default OrderList;
