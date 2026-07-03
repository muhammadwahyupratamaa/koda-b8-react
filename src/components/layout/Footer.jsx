import { Link } from "react-router-dom";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiShoppingBag,
  FiShield,
  FiRotateCcw,
  FiHeadphones,
  FiSend,
} from "react-icons/fi";

const features = [
  {
    icon: FiShoppingBag,
    title: "Gratis Ongkir",
    desc: "Pembelian di atas Rp100.000",
  },
  {
    icon: FiShield,
    title: "Pembayaran Aman",
    desc: "Transaksi terenkripsi & terpercaya",
  },
  {
    icon: FiRotateCcw,
    title: "Mudah Dikembalikan",
    desc: "Garansi retur hingga 30 hari",
  },
  {
    icon: FiHeadphones,
    title: "Customer Support",
    desc: "Siap membantu 24 jam",
  },
];

const shopLinks = [
  "Kategori",
  "Flash Sale",
  "Produk Terbaru",
  "Promo",
  "Best Seller",
];

const helpLinks = [
  "Cara Belanja",
  "Lacak Pesanan",
  "Pengembalian",
  "FAQ",
  "Hubungi Kami",
];

const companyLinks = [
  "Tentang Kami",
  "Karir",
  "Blog",
  "Kemitraan",
  "Kebijakan Privasi",
];

const socials = [
  {
    icon: FaFacebookF,
  },
  {
    icon: FaInstagram,
  },
  {
    icon: FaTwitter,
  },
  {
    icon: FaYoutube,
  },
];

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <section className="relative border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/10 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 transition-all duration-300 group-hover:bg-emerald-500">
                  <Icon className="h-6 w-6 text-emerald-400 transition-all duration-300 group-hover:text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>

                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-500/20">
                B
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight">BRilianShop</h2>

                <p className="text-sm text-gray-400">
                  Belanja Online Indonesia
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md leading-8 text-gray-400">
              Temukan ribuan produk pilihan dengan harga terbaik. Nikmati
              pengalaman belanja online yang cepat, aman, dan nyaman hanya di
              BRilianShop.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {socials.map((social, index) => {
                const Icon = social.icon;

                return (
                  <button
                    key={index}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30"
                  >
                    <Icon className="text-slate-300 transition-colors duration-300 group-hover:text-white" />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Belanja</h3>

            <ul className="space-y-4">
              {shopLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    className="text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-emerald-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Bantuan</h3>

            <ul className="space-y-4">
              {helpLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-emerald-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Tetap Terhubung
            </h3>

            <p className="mb-6 text-sm leading-7 text-gray-400">
              Dapatkan promo eksklusif, diskon spesial, dan informasi produk
              terbaru langsung ke email kamu.
            </p>

            <div className="space-y-4">
              <div className="relative">
                <input
                  aria-label="email"
                  type="email"
                  placeholder="Masukkan email..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />

                <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-600 active:scale-95">
                <FiSend />
                Berlangganan
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-emerald-400" />

                <p className="text-sm leading-6 text-gray-400">
                  Jakarta Selatan, Indonesia
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-emerald-400" />

                <p className="text-sm text-gray-400">0800-1234-5678</p>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-emerald-400" />

                <p className="text-sm text-gray-400">support@BRilianShop.id</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-6 text-sm text-slate-500 md:flex-row">
          <p className="text-center md:text-left">
            © 2026 <span className="font-semibold text-white">BRilianShop</span>.
            All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/"
              className="transition-colors duration-300 hover:text-emerald-400"
            >
              Privacy
            </Link>

            <Link
              to="/"
              className="transition-colors duration-300 hover:text-emerald-400"
            >
              Terms
            </Link>

            <Link
              to="/"
              className="transition-colors duration-300 hover:text-emerald-400"
            >
              Cookies
            </Link>

            <Link
              to="/"
              className="transition-colors duration-300 hover:text-emerald-400"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
