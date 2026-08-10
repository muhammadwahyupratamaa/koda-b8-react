import {
  FiChevronDown,
  FiEye,
  FiPackage,
  FiSearch,
  FiTruck,
} from "react-icons/fi";
import { useState } from "react";

function OrderList() {
  const [search, setSearch] = useState("");

  const orders = [
    {
      id: "ORD-120",
      customer: "Jek",
      email: "jek@gmail.com",
      date: "10 Agu 2026",
      total: 450000,
      items: 2,
      status: "Diproses",
    },
    {
      id: "ORD-119",
      customer: "Bildan",
      email: "bildan@gmail.com",
      date: "10 Agu 2026",
      total: 129000,
      items: 1,
      status: "Dikirim",
    },
    {
      id: "ORD-118",
      customer: "Rina",
      email: "rina@gmail.com",
      date: "9 Agu 2026",
      total: 850000,
      items: 3,
      status: "Terkirim",
    },
    {
      id: "ORD-117",
      customer: "Andi",
      email: "andi@gmail.com",
      date: "9 Agu 2026",
      total: 320000,
      items: 2,
      status: "Pending",
    },
    {
      id: "ORD-116",
      customer: "Salsa",
      email: "salsa@gmail.com",
      date: "8 Agu 2026",
      total: 1200000,
      items: 4,
      status: "Diproses",
    },
    {
      id: "ORD-115",
      customer: "Rizky",
      email: "rizky@gmail.com",
      date: "8 Agu 2026",
      total: 275000,
      items: 1,
      status: "Terkirim",
    },
    {
      id: "ORD-114",
      customer: "Dimas",
      email: "dimas@gmail.com",
      date: "7 Agu 2026",
      total: 650000,
      items: 2,
      status: "Dikirim",
    },
  ];

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customer} ${order.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const statusStyle = {
    Diproses: "bg-yellow-50 text-yellow-600",
    Dikirim: "bg-blue-50 text-blue-600",
    Terkirim: "bg-emerald-50 text-emerald-600",
    Pending: "bg-orange-50 text-orange-600",
  };

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

              <p className="mt-2 text-2xl font-bold text-slate-900">890</p>
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

              <p className="mt-2 text-2xl font-bold text-orange-500">24</p>
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

              <p className="mt-2 text-2xl font-bold text-yellow-600">42</p>
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

              <p className="mt-2 text-2xl font-bold text-blue-600">67</p>
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

          <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
            <option>Semua Status</option>
            <option>Pending</option>
            <option>Diproses</option>
            <option>Dikirim</option>
            <option>Terkirim</option>
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="transition hover:bg-slate-50">
                  
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">#{order.id}</p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-600">
                        {order.customer.charAt(0)}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {order.customer}
                        </p>

                        <p className="text-xs text-slate-400">{order.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {order.date}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {order.items} produk
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      Rp {order.total.toLocaleString("id-ID")}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600"
                      >
                        <FiEye className="h-4 w-4" />
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
    </div>
  );
}

export default OrderList;
