import { FiBox, FiDollarSign, FiShoppingBag, FiUsers } from "react-icons/fi";

function Dashboard() {
  const stats = [
    {
      title: "Pendapatan Bulan Ini",
      value: "Rp 125.000.000",
      change: "+18,2% dari bulan lalu",
      icon: FiDollarSign,
    },
    {
      title: "Pesanan Baru",
      value: "890",
      change: "+12,5% dari bulan lalu",
      icon: FiShoppingBag,
    },
    {
      title: "Pelanggan Aktif",
      value: "3.284",
      change: "+8,1% dari bulan lalu",
      icon: FiUsers,
    },
    {
      title: "Produk Aktif",
      value: "247",
      change: "-2,3% dari bulan lalu",
      icon: FiBox,
      negative: true,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-12",
      customer: "Jek",
      date: "10 Agu 2026",
      total: "Rp 450.000",
      status: "Diproses",
    },
    {
      id: "#ORD-11",
      customer: "Bildan",
      date: "9 Agu 2026",
      total: "Rp 129.000",
      status: "Dikirim",
    },
    {
      id: "#ORD-10",
      customer: "Rina",
      date: "9 Agu 2026",
      total: "Rp 850.000",
      status: "Terkirim",
    },
    {
      id: "#ORD-09",
      customer: "Andi",
      date: "8 Agu 2026",
      total: "Rp 320.000",
      status: "Pending",
    },
  ];

  const topProducts = [
    {
      name: "Headphone Wireless Premium",
      sold: "156 terjual",
      price: "Rp 450.000",
    },
    {
      name: "Laptop Ultrabook Pro 15",
      sold: "87 terjual",
      price: "Rp 8.500.000",
    },
    {
      name: "Kaos Polos Premium Cotton",
      sold: "312 terjual",
      price: "Rp 125.000",
    },
    {
      name: "Sneakers Sport Runfast",
      sold: "203 terjual",
      price: "Rp 550.000",
    },
    {
      name: "Smartphone 5G Ultra",
      sold: "124 terjual",
      price: "Rp 4.200.000",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>

        <p className="mt-1 text-sm text-slate-500">
          Selamat datang kembali! Ini ringkasan bisnis hari ini.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <p
                className={`mt-4 text-xs font-medium ${
                  stat.negative ? "text-red-500" : "text-emerald-600"
                }`}
              >
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Pendapatan & Pesanan
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Performa 12 bulan terakhir
              </p>
            </div>

            <select className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none">
              <option>12 Bulan</option>
              <option>6 Bulan</option>
              <option>3 Bulan</option>
            </select>
          </div>

          <div className="mt-8 flex h-64 items-end gap-2 border-b border-l border-slate-200 px-3">
            {[35, 44, 40, 56, 51, 66, 62, 76, 70, 87, 101, 118].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 items-end justify-center"
                >
                  <div
                    className="w-full max-w-10 rounded-t-lg bg-emerald-500 transition hover:bg-emerald-600"
                    style={{
                      height: `${height * 1.7}px`,
                    }}
                  />
                </div>
              ),
            )}
          </div>

          <div className="mt-3 grid grid-cols-6 text-center text-[10px] text-slate-400 sm:grid-cols-12">
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Mei",
              "Jun",
              "Jul",
              "Agu",
              "Sep",
              "Okt",
              "Nov",
              "Des",
            ].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            Penjualan per Kategori
          </h3>

          <div className="mx-auto mt-8 flex h-48 w-48 items-center justify-center rounded-full bg-[conic-gradient(#10b981_0_45%,#3b82f6_45%_73%,#f59e0b_73%_88%,#8b5cf6_88%_96%,#cbd5e1_96%_100%)]">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-center text-sm font-semibold text-slate-700">
              Total
              <br />
              Penjualan
            </div>
          </div>

          <div className="mt-6 space-y-3 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Elektronik</span>
              <span className="font-medium">45%</span>
            </div>

            <div className="flex justify-between">
              <span>Fashion</span>
              <span className="font-medium">28%</span>
            </div>

            <div className="flex justify-between">
              <span>Rumah & Dapur</span>
              <span className="font-medium">15%</span>
            </div>

            <div className="flex justify-between">
              <span>Kecantikan</span>
              <span className="font-medium">8%</span>
            </div>

            <div className="flex justify-between">
              <span>Lainnya</span>
              <span className="font-medium">4%</span>
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Pesanan Terbaru</h3>

            <button className="text-xs font-medium text-emerald-600 hover:underline">
              Lihat Semua →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {order.id}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {order.customer} • {order.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    {order.total}
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Produk Terlaris</h3>

            <button className="text-xs font-medium text-emerald-600 hover:underline">
              Kelola →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4 py-4">
                <span className="w-5 text-sm font-semibold text-slate-400">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">{product.sold}</p>
                </div>

                <p className="text-sm font-semibold text-emerald-600">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
