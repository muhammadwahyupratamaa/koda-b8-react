import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#4F39F6] to-[#8200DB]">
      <div className="mx-auto flex h-[420px] max-w-7xl items-center px-6">
        <div className="z-10 w-full lg:w-1/2">
          <div className="flex flex-col gap-5">
            <div className="text-white flex flex-col gap-5">
              <h1 className="text-2xl font-bold  sm:text-3xl lg:text-4xl">
                Elektronik Pilihan, Harga
              </h1>

              <h1 className="text-2xl font-bold  sm:text-3xl lg:text-4xl">
                 Spesial
              </h1>
            </div>

            <div className="text-sm text-gray-200 sm:text-base lg:text-base">
              <p>Laptop, Smartphone, Headphone, dan masih banyak lagi</p>
              <p>dengan diskon hingga 40%</p>
            </div>

            <Link
              to="/products"
              className="flex w-52 items-center gap-2 rounded-xl text-base bg-white px-6 py-4 font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              Lihat Promo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      
      <img
        src="/assets/hero2.png"
        alt="Hero"
        className="absolute bottom-0 right-0 hidden lg:block w-[580px] xl:w-[680px] 2xl:w-[760px]
        "
      />

      <button className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition cursor-pointer hover:bg-white/30">
        <ArrowLeft className="h-6 w-6" />
      </button>

      <button className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition cursor-pointer hover:bg-white/30">
        <ArrowRight className="h-6 w-6" />
      </button>

    
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#4F39F6]/10 to-[#8200DB]/20" />

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        <span className="h-3 w-3 rounded-full bg-white/40"></span>
        <span className="h-3 w-8 rounded-full bg-white"></span>
        <span className="h-3 w-3 rounded-full bg-white/40"></span>
      </div>
    </section>
  );
}

export default Hero;
