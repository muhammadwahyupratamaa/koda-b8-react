import { FaStar, FaCheck, FaShoppingCart } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { headphoneWirelessPremium } from "../../assets";
import ProductSection from "../../components/home/ProductSection";

import {
  FiHeart,
  FiShield,
  FiRefreshCw,
  FiTruck,
  FiMinus,
  FiPlus,
} from "react-icons/fi";



function DetailPage() {

    const produkTerkait = [
    {
      id: 1,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      priceDisc: "Rp 650.000",
    },
    {
      id: 2,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      priceDisc: "Rp 650.000",
    },
    {
      id: 3,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      priceDisc: "Rp 650.000",
    },
    {
      id: 4,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      priceDisc: "Rp 650.000",
    },
  ];
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <span>Beranda</span>

        <GoChevronRight className="w-4 h-4" />

        <span>Toko</span>
        <GoChevronRight className="w-4 h-4" />

        <span>Electronics</span>

        <GoChevronRight className="w-4 h-4" />

        <span className="text-sm text-black">Headphone Wireless Premium</span>
      </section>

      <section className="grid grid-cols-2 gap-10">
        {/*  LEFT  */}

        <div>
          <div className="relative rounded-xl overflow-hidden">
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              -31%
            </span>

            <img
              src={headphoneWirelessPremium}
              alt="product"
              className="w-full object-cover"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button className="border-2 border-blue-500 rounded-lg p-1">
              <img
                src={headphoneWirelessPremium}
                className="w-12 h-12 rounded"
              />
            </button>

            <button className="border border-gray-300 rounded-lg p-1">
              <img
                src={headphoneWirelessPremium}
                className="w-12 h-12 rounded opacity-60"
              />
            </button>
          </div>
        </div>

        {/* RIGHT  */}

        <div>
          <p className="text-sm text-gray-400">SoundWave • Audio</p>

          <h1 className="text-2xl font-semibold ">
            Headphone Wireless Premium
          </h1>

          <div className="flex items-center gap-3 mt-1">
            <div className="flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p className="text-sm text-gray-500">4.8 (512)</p>

            <div className="flex items-center gap-1 text-green-600 text-sm">
              <FaCheck />

              <p>Stok tersedia (45)</p>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mt-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-blue-600">Rp 450.000</h2>

              <p className="line-through text-lg text-gray-400">Rp 650.000</p>

              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                Hemat 31%
              </span>
            </div>

            <p className="text-green-600 text-sm mt-2">Kamu hemat Rp 200.000</p>
          </div>

          <div className="mt-3">
            <p className="text-sm font-medium mb-3">
              Warna :<span className="text-blue-600 ml-1">Hitam</span>
            </p>

            <div className="flex gap-3">
              <button className="border-2 border-blue-600 text-blue-600 rounded-lg px-4 py-2 text-sm">
                Hitam
              </button>

              <button className="border text-gray-400 rounded-lg px-4 py-2 text-sm">
                Putih
              </button>

              <button className="border text-gray-400 rounded-lg px-4 py-2 text-sm">
                Biru
              </button>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm font-medium mb-3">Jumlah</p>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-100 rounded-lg">
                <button className="px-4 py-2">
                  <FiMinus />
                </button>

                <span className="px-4">1</span>

                <button className="px-4 py-2">
                  <FiPlus />
                </button>
              </div>

              <p className="text-sm text-gray-400">Stok : 45 pcs</p>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1fr_60px] gap-3 mt-8">
            <button className="border-2 text-base border-orange-500 text-orange-500 rounded-xl py-3 flex justify-center items-center gap-2 font-medium cursor-pointer hover:bg-orange-50">
              <FaShoppingCart />
              Tambah ke Keranjang
            </button>

            <button className="bg-orange-500 text-base rounded-xl py-3 text-white font-medium hover:bg-orange-600 cursor-pointer">
              Beli Sekarang
            </button>

            <button className="border-gray-100 border rounded-xl flex justify-center items-center hover:bg-gray-100">
              <FiHeart />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <FiTruck className="mx-auto text-blue-600 w-5 h-5 mb-2" />

              <p className="text-sm">Gratis Ongkir</p>

              <p className="text-xs text-gray-400">Min. Rp100.000</p>
            </div>

            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <FiShield className="mx-auto text-blue-600 w-5 h-5 mb-2" />

              <p className="text-sm">Pembayaran Aman</p>

              <p className="text-xs text-gray-400">SSL Terenkripsi</p>
            </div>

            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <FiRefreshCw className="mx-auto text-blue-600 w-5 h-5 mb-2" />

              <p className="text-sm">Retur 30 Hari</p>

              <p className="text-xs text-gray-400">Gratis retur</p>
            </div>
          </div>
        </div>
      </section>

      <section className=" border-1 border-gray-200 mt-10 rounded-xl">
        <div className="flex gap-6 text-sm border-b-1 border-gray-100 p-4 pb-0 text-gray-500 justify-start">
          <p className="text-blue-600 border-b-1 border-blue-600">Deskripsi</p>
          <p>Spesifikasi</p>
          <p>Ulasan (2)</p>
        </div>

        <div className="text-base text-gray-400 py-7 px-4">
          <p>
            Headphone wireless dengan teknologi noise-cancelling terdepan.
            Nikmati musik favoritmu tanpa gangguan dengan kualitas suara yang
            memukau.
          </p>
        </div>
      </section>

      <ProductSection title="Produk Terkait" products={produkTerkait} />



    </main>
  );
}

export default DetailPage;
