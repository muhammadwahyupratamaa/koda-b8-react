import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  elektronik,
  fashion,
  rumahDapur,
  kecantikan,
  olahraga,
  bukuAlatTulis,
} from "../../assets";

const categories = [
  {
    id: 1,
    title: "Elektronik",
    total: 7,
    image: elektronik,
  },
  {
    id: 2,
    title: "Fashion",
    total: 5,
    image: fashion,
  },
  {
    id: 3,
    title: "Rumah & Dapur",
    total: 4,
    image: rumahDapur,
  },
  {
    id: 4,
    title: "Kecantikan",
    total: 2,
    image: kecantikan,
  },
  {
    id: 5,
    title: "Olahraga",
    total: 3,
    image: olahraga,
  },
  {
    id: 6,
    title: "Buku & ATK",
    total: 2,
    image: bukuAlatTulis,
  },
];
function CategorySection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-600">
              ✨ Kategori Pilihan
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Temukan Produk Favoritmu
            </h2>

            <div className="mt-5 h-1 w-full rounded-full bg-emerald-500"></div>

            <p className="mt-6 max-w-xl leading-7 text-slate-500">
              Jelajahi berbagai kategori pilihan untuk memenuhi kebutuhan
              sehari-hari dengan kualitas terbaik dan harga yang bersahabat.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-500 px-5 py-3 font-medium text-emerald-600 transition-all duration-300 hover:bg-emerald-500 hover:text-white"
          >
            Lihat Semua
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.id} to="/products">
              <div
                className="flex min-h-[220px] cursor-pointer flex-col items-center rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:from-white hover:to-emerald-50/60 hover:shadow-xl
              "
              >
                <div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 shadow-sm transition-all duration-300 
                "
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-14 w-14 object-contain transition-transform duration-300   
                  "
                  />
                </div>

                <h3
                  className="text-base font-semibold text-slate-800 transition-colors duration-300
                 
                "
                >
                  {category.title}
                </h3>

                <div className="mt-auto flex items-center gap-2 pt-5">
                  <span className="text-sm text-slate-500">
                    {category.total} Produk
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
