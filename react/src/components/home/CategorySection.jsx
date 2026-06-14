import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CategorySection() {
  return (
    <section className="w-full mt-10">
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div>
            <p className="text-sm">Belanja Berdasarkan Kategori </p>
          </div>

          <div className="flex gap-3">
            <Link className="cursor-pointer text-blue-600 text-sm">Lihat Semua </Link>
            <ArrowRight className="text-blue-600 text-sm" />
          </div>
        </div>

        <div className="grid w-full  gap-3 px-4 pt-8 grid-cols-6">
          <div className="w-full h-36 gap-3 flex justify-center items-center flex-col border-1 border-gray-300 rounded-lg">
            <div>
              <img
                src="assets/Elektronik.svg"
                className="w-16 h-16 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <p className="text-xs">Elektronik</p>
              <p className="text-xs text-gray-400">7 produk</p>
            </div>
          </div>

           <div className="w-full h-36 gap-3 flex justify-center items-center flex-col border-1 border-gray-300 rounded-lg">
            <div>
              <img
                src="assets/Fashion.svg"
                className="w-16 h-16 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <p className="text-xs">Fashion</p>
              <p className="text-xs text-gray-400">5 produk</p>
            </div>
          </div>

           <div className="w-full h-36 gap-3 flex justify-center items-center flex-col border-1 border-gray-300 rounded-lg">
            <div>
              <img
                src="assets/Rumah & Dapur.svg"
                className="w-16 h-16 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <p className="text-xs">Rumah & Dapur</p>
              <p className="text-xs text-gray-400">4 produk</p>
            </div>
          </div>

           <div className="w-full h-36 gap-3 flex justify-center items-center flex-col border-1 border-gray-300 rounded-lg">
            <div>
              <img
                src="assets/Kecantikan.svg"
                className="w-16 h-16 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <p className="text-xs">Kecantikan</p>
              <p className="text-xs text-gray-400">2 produk</p>
            </div>
          </div>

           <div className="w-full h-36 gap-3 flex justify-center items-center flex-col border-1 border-gray-300 rounded-lg">
            <div>
              <img
                src="assets/Olahraga.svg"
                className="w-16 h-16 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <p className="text-xs">Olahraga</p>
              <p className="text-xs text-gray-400">3 produk</p>
            </div>
          </div>

           <div className="w-full h-36 gap-3 flex justify-center items-center flex-col border-1 border-gray-300 rounded-lg">
            <div>
              <img
                src="assets/Buku & Alat Tulis.svg"
                className="w-16 h-16 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <p className="text-xs">Buku & Alat Tulis</p>
              <p className="text-xs text-gray-400">2 produk</p>
            </div>
          </div>
        </div>
      </section>

      <section></section>
    </section>
  );
}

export default CategorySection;
