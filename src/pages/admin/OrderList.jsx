import {
  FiChevronDown,
  FiEye,
  FiPackage,
  FiSearch,
  FiTruck,
} from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import OrderDetailModal from "./components/OrderDetailModal";

function OrderList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);

        const response = await api("/admin/orders");

        setOrders(response.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const wsUrl = `${import.meta.env.VITE_WS_URL || "ws://localhost:8081"}?token=${token}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Admin WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.event !== "order_created") {
          return;
        }

        const newOrder = message.data;

        setOrders((currentOrders) => {
          const exists = currentOrders.some(
            (order) => String(order.id) === String(newOrder.id),
          );

          if (exists) {
            return currentOrders;
          }

          return [newOrder, ...currentOrders];
        });
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
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue =
        `${order.id} ${order.user_id} ${order.shipping_address?.name || ""} ${
          order.shipping_address?.email || ""
        }`.toLowerCase();

      const matchesSearch = searchValue.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "Semua Status" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const statistics = useMemo(() => {
    return {
      total: orders.length,

      pending: orders.filter((order) => order.status === "pending").length,

      diproses: orders.filter((order) => order.status === "Diproses").length,

      dikirim: orders.filter(
        (order) => order.status === "shipped" || order.status === "Dikirim",
      ).length,
    };
  }, [orders]);

  function getStatusLabel(status) {
    if (status === "pending") {
      return "Pending";
    }

    if (status === "shipped") {
      return "Dikirim";
    }

    if (status === "delivered") {
      return "Terkirim";
    }

    return status || "Diproses";
  }

  function getStatusStyle(status) {
    const label = getStatusLabel(status);

    const styles = {
      Pending: "bg-orange-50 text-orange-600",
      Diproses: "bg-yellow-50 text-yellow-600",
      Dikirim: "bg-blue-50 text-blue-600",
      Terkirim: "bg-emerald-50 text-emerald-600",
    };

    return styles[label] || "bg-slate-50 text-slate-600";
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
                {statistics.diproses}
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
                {statistics.dikirim}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiTruck className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor pesanan atau pelanggan..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
          >
            <option>Semua Status</option>
            <option value="pending">Pending</option>
            <option value="Diproses">Diproses</option>
            <option value="shipped">Dikirim</option>
            <option value="delivered">Terkirim</option>
          </select>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            Filter
            <FiChevronDown />
          </button>
        </div>

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
                filteredOrders.map((order) => {
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

              {!loading && !error && filteredOrders.length === 0 && (
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

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Menampilkan{" "}
            <span className="font-medium text-slate-700">
              {filteredOrders.length}
            </span>{" "}
            pesanan
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
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default OrderList;
