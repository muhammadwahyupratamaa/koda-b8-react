import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { hero3 } from "../../assets";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-emerald-50">
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-100 blur-[120px] opacity-70" />

      <div className="absolute right-0 top-1/2 h-[520px] w-128 -translate-y-1/2 rounded-full bg-emerald-100/80 blur-3xl" />

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-14 px-4 py-16 sm:px-6 lg:flex-row lg:gap-10 lg:py-24">
        {/* LEFT */}
        <div className="z-10 flex-1 text-center lg:text-left">
          <div className="mb-6 inline-flex rounded-full bg-emerald-100 px-4 py-2">
            <span className="text-sm font-semibold text-emerald-700">
              🔥 Mega Sale 2026
            </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Belanja Mudah
            <span className="mt-2 block text-emerald-600">
              Untuk Semua Kebutuhan
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-slate-500 lg:mx-0 lg:text-lg">
            Temukan ribuan produk pilihan dengan harga terbaik setiap hari.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-600 px-7 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-2xl"
          >
            Belanja Sekarang
            <FaArrowRight />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-1 justify-center">
          <img
            src={hero3}
            alt="Hero"
            className="relativ rounded-2xl z-10 w-full max-w-sm transition-all duration-300 hover:-translate-y-1 sm:max-w-md md:max-w-xl lg:max-w-2xl "
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

export default Hero;
