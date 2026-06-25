import { CircleCheckBig } from "lucide-react";
import { login, authRegister, authForgotPassword } from "../../assets";

function AuthBanner({ bannerType }) {
  let title = [];
  let description = [];
  let background = login;
  let isRegister = false;
  let isForgot = false;

  if (bannerType === "login") {
    background = login;
    title = ["Belanja Lebih", "Mudah."];
    description = [
      "Temukan ribuan produk pilihan dengan harga terbaik.",
      "Belanja cepat, aman, dan nyaman setiap hari.",
    ];
  }

  if (bannerType === "register") {
    background = authRegister;
    title = ["Mulai", "Perjalananmu."];
    description = [
      "Akses ribuan produk pilihan",
      "Simpan wishlist favorit",
      "Nikmati promo eksklusif",
      "Lacak pesanan secara real-time",
    ];

    isRegister = true;
  }

  if (bannerType === "forgotPassword") {
    background = authForgotPassword;
    title = ["Lindungi", "Akunmu."];
    description = [
      "Reset password dengan aman.",
      "Kami menjaga data akunmu tetap terlindungi.",
    ];

    isForgot = true;
  }

  return (
    <section className="relative sm:hidden md:hidden lg:flex h-full overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500">
      <img
        src={background}
        alt="Banner"
        className="absolute inset-0 h-full w-full object-cover object-right opacity-40 pointer-events-none select-none"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-900/50 to-emerald-700/10" />
      <div className="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/10" />
      <div className="absolute -bottom-24 left-20 h-40 w-40 rounded-full border border-white/10" />

      <div className="relative z-10 flex h-full w-full flex-col p-8 lg:p-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            BeliMudah
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-white/70" />
        </div>

        <div className="my-auto">
          <div className="space-y-2">
            {title.map((item) => (
              <h1
                key={item}
                className="text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-lg lg:text-6xl"
              >
                {item}
              </h1>
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {description.map((item) => (
              <div key={item} className="flex items-start gap-3">
                {isRegister && (
                  <CircleCheckBig
                    className="mt-1 shrink-0 text-emerald-200"
                    size={18}
                  />
                )}

                <p className="max-w-md text-lg leading-8 text-emerald-50">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {!isForgot && (
          <div className="grid grid-cols-3 border-t border-white/20 pt-8">
            <div>
              <h3 className="text-3xl font-bold text-white">10K+</h3>
              <p className="mt-1 text-sm text-emerald-100">Produk</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">500K+</h3>
              <p className="mt-1 text-sm text-emerald-100">Pelanggan</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">4.8★</h3>
              <p className="mt-1 text-sm text-emerald-100">Rating</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AuthBanner;
