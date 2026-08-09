import { GoChevronRight } from "react-icons/go";
import ProductCard from "../../components/home/ProductCard";
import productService from "../../services/productService";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

function BrowseProducts() {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const promo = searchParams.get("promo") || "";

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [stockOnly, setStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState(20000000);
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const products = await productService.getProductsFromApi();

        setDisplayedProducts(products);
      } catch (error) {
        console.error("LOAD PRODUCTS ERROR:", error);
        setError("Gagal memuat produk.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let products = [...displayedProducts];

    // Search
    if (keyword.trim()) {
      const search = keyword.trim().toLowerCase();

      products = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(search) ||
          product.brand.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
        );
      });
    }

    // Category
    if (category.trim()) {
      products = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Promo
    if (promo === "true") {
      products = products.filter((product) => Number(product.discount) >= 20);
    }

    // Brand
    if (selectedBrands.length > 0) {
      products = products.filter((product) =>
        selectedBrands.includes(product.brand),
      );
    }

    // Rating
    if (minRating > 0) {
      products = products.filter(
        (product) => Number(product.rating) >= minRating,
      );
    }

    // Stock
    if (stockOnly) {
      products = products.filter((product) => Number(product.stock) > 0);
    }

    // Price
    products = products.filter(
      (product) => Number(product.price) <= priceRange,
    );

    // Sort
    if (sortBy === "popular") {
      products.sort((a, b) => Number(b.sold) - Number(a.sold));
    }

    if (sortBy === "price-low") {
      products.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-high") {
      products.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "newest") {
      products.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return products;
  }, [
    displayedProducts,
    keyword,
    category,
    promo,
    selectedBrands,
    minRating,
    stockOnly,
    priceRange,
    sortBy,
  ]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((current) => {
      if (current.includes(brand)) {
        return current.filter((item) => item !== brand);
      }

      return [...current, brand];
    });
  };
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <span>Beranda</span>

        <GoChevronRight className="w-4 h-4" />

        <span>Toko</span>
      </section>

      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">
        {keyword
          ? `Hasil Pencarian "${keyword}"`
          : category
            ? `Kategori ${category}`
            : "Semua Produk"}
      </h1>

      <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block border border-gray-200 rounded-xl p-5 h-fit">
          <div className="mb-8">
            <h2 className="text-base font-semibold mb-5">Harga</h2>

            <div className="flex justify-between text-xs text-gray-400">
              <span>Rp 0</span>
              <span>Rp 20.000.000</span>
            </div>

            <input
              type="range"
              min="0"
              max="20000000"
              step="100000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="mt-4 w-full cursor-pointer"
            />

            <p className="mt-2 text-sm font-medium text-slate-700">
              Maks. Rp {priceRange.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-base font-semibold mb-5">Brand : </h2>

            <div className="flex flex-col gap-3 text-sm text-gray-500">
              {[
                "KeyForce",
                "SoundWave",
                "ClickPro",
                "TimeFit",
                "BoomSound",
                "UrbanWear",
                "DailyWear",
                "RunMax",
                "BlueWear",
                "ComfortSeat",
                "HydroGo",
              ].map((brand) => (
                <label key={brand} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />

                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-base font-semibold mb-5">Rating Minimum</h2>

            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 4}
                  onChange={() => setMinRating(4)}
                />
                ★★★★☆ ke atas
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 3}
                  onChange={() => setMinRating(3)}
                />
                ★★★☆☆ ke atas
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 2}
                  onChange={() => setMinRating(2)}
                />
                ★★☆☆☆ ke atas
              </label>

              <button
                type="button"
                onClick={() => setMinRating(0)}
                className="text-left text-xs text-blue-600"
              >
                Reset rating
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-5">Ketersediaan</h2>

            <label className="flex items-center gap-2 text-sm text-gray-500">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(e) => setStockOnly(e.target.checked)}
              />
              Stok tersedia
            </label>
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-400">
              {filteredProducts.length} produk ditemukan
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="text-sm text-gray-400">Urutkan:</span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
              >
                <option value="popular">Paling Populer</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="newest">Terbaru</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex h-72 items-center justify-center">
              <p className="text-slate-500">Memuat produk...</p>
            </div>
          ) : error ? (
            <div className="flex h-72 items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500">Produk tidak ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-10">
            <button className="border border-blue-600 text-blue-600 rounded-lg w-full sm:w-auto px-8 py-3 text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
              Muat Lebih Banyak (6 produk lagi)
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default BrowseProducts;
