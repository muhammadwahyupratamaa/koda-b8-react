import { FiEye, FiMail, FiSearch, FiUserPlus } from "react-icons/fi";
import { useState } from "react";

function CustomerList() {
  const [search, setSearch] = useState("");

  const customers = [
    {
      id: 1,
      name: "Jek",
      email: "jek@gmail.com",
      phone: "081234567890",
      joined: "10 Agu 2026",
      orders: 12,
      spent: 4500000,
      status: "Aktif",
    },
    {
      id: 2,
      name: "Bildan",
      email: "bildan@gmail.com",
      phone: "082234567890",
      joined: "8 Agu 2026",
      orders: 8,
      spent: 2100000,
      status: "Aktif",
    },
    {
      id: 3,
      name: "Rina",
      email: "rina@gmail.com",
      phone: "083334567890",
      joined: "2 Agu 2026",
      orders: 21,
      spent: 8900000,
      status: "Aktif",
    },
    {
      id: 4,
      name: "Andi",
      email: "andi@gmail.com",
      phone: "084434567890",
      joined: "28 Jul 2026",
      orders: 5,
      spent: 1250000,
      status: "Aktif",
    },
    {
      id: 5,
      name: "Salsa",
      email: "salsa@gmail.com",
      phone: "085534567890",
      joined: "25 Jul 2026",
      orders: 17,
      spent: 6300000,
      status: "Aktif",
    },
    {
      id: 6,
      name: "Rizky",
      email: "rizky@gmail.com",
      phone: "086634567890",
      joined: "20 Jul 2026",
      orders: 3,
      spent: 750000,
      status: "Nonaktif",
    },
    {
      id: 7,
      name: "Dimas",
      email: "dimas@gmail.com",
      phone: "087734567890",
      joined: "18 Jul 2026",
      orders: 9,
      spent: 3200000,
      status: "Aktif",
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.phone}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Pelanggan</h2>

          <p className="mt-1 text-sm text-slate-500">
            Kelola data dan aktivitas pelanggan BRilianShop.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <FiUserPlus className="h-5 w-5" />
          Tambah Pelanggan
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Pelanggan</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">3.284</p>

          <p className="mt-2 text-xs font-medium text-emerald-600">
            +8,1% bulan ini
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pelanggan Aktif</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">3.021</p>

          <p className="mt-2 text-xs font-medium text-emerald-600">
            92% dari total
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pelanggan Baru</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">128</p>

          <p className="mt-2 text-xs font-medium text-blue-600">
            30 hari terakhir
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Rata-rata Belanja</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">Rp 1,8 jt</p>

          <p className="mt-2 text-xs font-medium text-emerald-600">
            +5,4% bulan ini
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">
          <div className="relative max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, atau nomor telepon..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4 font-semibold">Pelanggan</th>

                <th className="px-5 py-4 font-semibold">Kontak</th>

                <th className="px-5 py-4 font-semibold">Bergabung</th>

                <th className="px-5 py-4 font-semibold">Pesanan</th>

                <th className="px-5 py-4 font-semibold">Total Belanja</th>

                <th className="px-5 py-4 font-semibold">Status</th>

                <th className="px-5 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-600">
                        {customer.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {customer.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          ID #{customer.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-slate-600">{customer.email}</p>

                      <p className="text-xs text-slate-400">{customer.phone}</p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {customer.joined}
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {customer.orders} pesanan
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-slate-800">
                      Rp {customer.spent.toLocaleString("id-ID")}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                        customer.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        title="Kirim Email"
                        className="rounded-lg border border-slate-200 p-2 text-slate-400 transition hover:border-blue-500 hover:text-blue-600"
                      >
                        <FiMail className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        title="Lihat Detail"
                        className="rounded-lg border border-slate-200 p-2 text-slate-400 transition hover:border-emerald-500 hover:text-emerald-600"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    Pelanggan tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Menampilkan {" "}
            <span className="font-medium text-slate-700">
              {filteredCustomers.length}
            </span>
            {" "}pelanggan
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

export default CustomerList;
