import {
  bgLandingPage,
  bgLandingPage1,
  headphoneWirelessPremium,
} from "../../assets";
import CategorySection from "../../components/home/CategorySection";
import Hero from "../../components/home/Hero";
import FlashDealSection from "../../components/home/FlashDealSection";
import ProductSection from "../../components/home/ProductSection";

function LandingPage() {
  const flashDeal = [
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

  const produkTerbaru = [
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
    {
      id: 5,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      priceDisc: "Rp 650.000",
    },
    {
      id: 6,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      priceDisc: "Rp 650.000",
    },
    {
      id: 7,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      priceDisc: "Rp 650.000",
    },
  ];

  const produkUnggulan = [
    {
      id: 1,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      oldPrice: "Rp 650.000",
    },
    {
      id: 2,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      oldPrice: "Rp 650.000",
    },
    {
      id: 3,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      oldPrice: "Rp 650.000",
    },
    {
      id: 4,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      oldPrice: "Rp 650.000",
    },
    {
      id: 5,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      oldPrice: "Rp 650.000",
    },
    {
      id: 6,
      image: headphoneWirelessPremium,
      brand: "SoundWave",
      name: "Headphone Wireless Premium",
      rating: 4.8,
      review: 512,
      price: "Rp 450.000",
      oldPrice: "Rp 650.000",
    },
  ];

  return (
    <main className="w-full">
      <Hero />
      <CategorySection />
      <FlashDealSection isFlashDeal products={flashDeal} />

      <section className="grid grid-cols-2 mt-5 mx-auto px-4 max-w-7xl">
        <div className="w-full relative">
          <div>
            <img
              src={bgLandingPage}
              alt="elektronics Sale"
              className="rounded-xl"
            />
          </div>

          <div className="absolute flex flex-col gap-2 justify-start top-12 left-4">
            <p className="text-sm text-gray-300">Fashion wanita</p>
            <p className="text-2xl font-bold text-white">Diskon s/d 50%</p>

            <button
              type="button"
              className="border-1 p-2 text-white border-white rounded-xl"
            >
              Belanja sekarang
            </button>
          </div>
        </div>

        <div className="w-full relative">
          <div>
            <img
              src={bgLandingPage1}
              alt="Fashion Sale"
              className="rounded-xl"
            />
          </div>

          <div className="absolute flex flex-col gap-2 justify-start top-12 left-4">
            <p className="text-sm text-gray-300">Elektronik Pilihan</p>
            <p className="text-2xl font-bold text-white">Harga Terbaik</p>

            <button
              type="button"
              className="border-1 p-2 text-white border-white rounded-xl"
            >
              Lihat Produk
            </button>
          </div>
        </div>
      </section>

      <ProductSection title="Produk Terbaru" products={produkTerbaru} />
      <ProductSection title="Produk Unggulan" products={produkUnggulan} />

      <section className=" border-2 border-gray-100 rounded-xl  max-w-7xl mx-auto flex mt-10  flex-col gap-4 justify-center items-center">
        <div className="text-xl p-5">
          <h3> Kenapa Belanja di BeliMudah?</h3>
        </div>

        <section className="w-full grid grid-cols-4 px-4 gap-3 justify-center  items-center text-center">
          <div className="flex flex-col gap-2">
            
            <p className="text-2xl">
                🚚
            </p>
            <p className="text-sm">
                Gratis Ongkir
            </p>
            <p className="text-gray-400 text-xs">
                Pembelian di atas Rp 100.000 gratis ongkir ke seluruh Indonesia
            </p>
          </div>

          <div className="flex flex-col gap-2">
            
            <p className="text-2xl">
                🔒
            </p>
            <p className="text-sm">
                Pembayaran Aman
            </p>
            <p className="text-gray-400 text-xs">
                Data kamu terenkripsi dengan standar keamanan tertinggi
            </p>
          </div>

          <div className="flex flex-col gap-2">
            
            <p className="text-2xl">
                ↩️
            </p>
            <p className="text-sm">
                Retur Mudah
            </p>
            <p className="text-gray-400 text-xs">
               Produk tidak sesuai? Kembalikan dalam 30 hari tanpa ribet
            </p>
          </div>

          <div className="flex flex-col gap-2">
            
            <p className="text-2xl">
                💬
            </p>
            <p className="text-sm">
               CS 24/7
            </p>
            <p className="text-gray-400 text-xs">
                Tim kami siap membantu kamu kapan saja
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
export default LandingPage;
