import { GoChevronRight } from "react-icons/go";
import ProductCard from "../../components/home/ProductCard";
import { headphoneWirelessPremium } from "../../assets";

function BrowseProducts() {
  const products = [
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
      id: 1,
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
      </section>

      <h1 className="text-3xl font-semibold mb-8">Semua Produk</h1>

      <section className="grid grid-cols-[260px_1fr] gap-8">
        <aside className="border border-gray-200 rounded-xl p-5 h-fit">
          <div className="mb-8">
            <h2 className="text-base font-semibold mb-5">Harga</h2>

            <div className="flex justify-between text-xs text-gray-400">
              <span>Rp 0</span>
              <span>Rp 20.000.000</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-base font-semibold mb-5">Merek</h2>

            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                TechMaster
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                SoundWave
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                PhoneX
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                OptiCam
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                FashionID
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                SportPro
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-base font-semibold mb-5">Rating Minimum</h2>

            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="radio" name="rating" />
                ★★★★☆ ke atas
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="rating" />
                ★★★☆☆ ke atas
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="rating" />
                ★★☆☆☆ ke atas
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-5">Ketersediaan</h2>

            <label className="flex items-center gap-2 text-sm text-gray-500">
              <input type="checkbox" />
              Stok tersedia
            </label>
          </div>
        </aside>

        <section>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-400">18 produk ditemukan</p>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Urutkan:</span>

              <select className="border rounded-lg px-3 py-2 text-sm outline-none">
                <option>Paling Populer</option>
                <option>Harga Terendah</option>
                <option>Harga Tertinggi</option>
                <option>Terbaru</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                brand={product.brand}
                name={product.name}
                rating={product.rating}
                review={product.review}
                price={product.price}
                priceDisc={product.priceDisc}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="border border-blue-600 text-blue-600 rounded-lg px-8 py-3 text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
              Muat Lebih Banyak (6 produk lagi)
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default BrowseProducts;
