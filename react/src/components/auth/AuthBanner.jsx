import { CircleCheckBig } from "lucide-react";

function AuthBanner({ bannerType }) {
  let title = [];
  let description = [];
  let background = "";
  if (bannerType === "login") {
    title = ["Belanja lebih mudah", "hidup lebih", "praktis"];
    description = [
      "Ribuan produk pilihan dengan harga",
      "terbaik, pengiriman cepat, dan",
      "pembayaran yang aman.",
    ];
    background = "/assets/auth-banner.svg";
  }

  if (bannerType === "register") {
    title = ["Bergabung dengan", "500.000+ pelanggan ", "puas"];

    description = [
      " Akses ribuan produk dengan harga terbaik",
      " Lacak pesanan secara real-time",
      " Simpan wishlist & alamat favorit",
      " Dapatkan notifikasi promo eksklusif",
    ];
    background = "/assets/auth-register.jpg";
  }
  return (
    <section className="relative w-1/2 overflow-hidden">
      <img
        src={background}
        alt="Shopping Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-blue-600/80"></div>

      <div className="relative z-10 flex flex-col h-full p-16 ">
        <header className="flex items-center gap-4 mb-20">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-xl">
            B
          </div>

          <h2 className="text-2xl font-bold text-white">BeliMudah</h2>
        </header>

        <section className="mt-24">
          <div className="text-5xl font-bold text-white leading-tight">
            {title.map((item) => (
              <h1 key={item}>{item}</h1>
            ))}
          </div>

          <div className="text-lg text-gray-300 mt-6">
            {description.map((item) => (
              <div key={item} className="flex items-center gap-3">
                {bannerType === "register" && (
                  <CircleCheckBig className="size-5 text-gray-300" />
                )}

                <p className="text-gray-300 text-xl">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {bannerType === "login" && (
          <section className="flex gap-16 mt-12">
            <div>
              <h3 className="text-3xl font-bold text-white">10rb+</h3>
              <p className="text-gray-300 mt-1">Produk</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">500rb+</h3>
              <p className="text-gray-300 mt-1">Pelanggan</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">4.8★</h3>
              <p className="text-gray-300 mt-1">Rating</p>
            </div>
          </section>
        )}

        <footer className="mt-auto">
          <p className="text-gray-300">
            © 2026 BeliMudah. Seluruh hak cipta dilindungi.
          </p>
        </footer>
      </div>
    </section>
  );
}

export default AuthBanner;
