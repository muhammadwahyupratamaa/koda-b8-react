import { GoChevronRight } from "react-icons/go";
import ProductCard from "../../components/home/ProductCard";
import productService from "../../services/productService";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [debouncedPriceRange, setDebouncedPriceRange] = useState(20000000);
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 400);

    return () => clearTimeout(timer);
  }, [priceRange]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const products = await productService.getProductsFromApi({
          search: keyword,
          minPrice: 0,
          maxPrice: debouncedPriceRange,
          sort:
            sortBy === "price-low"
              ? "price_asc"
              : sortBy === "price-high"
                ? "price_desc"
                : sortBy === "newest"
                  ? "newest"
                  : "popular",
        });

        setDisplayedProducts(products);
      } catch (error) {
        console.error("LOAD PRODUCTS ERROR:", error);
        setError("Gagal memuat produk.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [keyword, debouncedPriceRange, sortBy]);

  useEffect(() => {
    setVisibleCount(6);
  }, [keyword, debouncedPriceRange, sortBy]);

  const filteredProducts = displayedProducts.filter((product) => {
    if (category.trim()) {
      if (product.category?.toLowerCase() !== category.trim().toLowerCase()) {
        return false;
      }
    }

    if (promo === "true" && Number(product.discount) < 20) {
      return false;
    }

    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    if (minRating > 0 && Number(product.rating) < minRating) {
      return false;
    }

    if (stockOnly && Number(product.stock) <= 0) {
      return false;
    }

    return true;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remainingProducts = filteredProducts.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((current) => current + 6);
  };

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
      <section className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <span>Beranda</span>

        <GoChevronRight className="h-4 w-4" />

        <span>Toko</span>
      </section>

      <h1 className="mb-8 text-2xl font-semibold sm:text-3xl">
        {keyword
          ? `Hasil Pencarian "${keyword}"`
          : category
            ? `Kategori ${category}`
            : "Semua Produk"}
      </h1>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden h-fit rounded-xl border border-gray-200 p-5 lg:block">
          <div className="mb-8">
            <h2 className="mb-5 text-base font-semibold">Harga</h2>

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
            <h2 className="mb-5 text-base font-semibold">Brand :</h2>

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
            <h2 className="mb-5 text-base font-semibold">Rating Minimum</h2>

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
            <h2 className="mb-5 text-base font-semibold">Ketersediaan</h2>

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
                className="w-full cursor-pointer rounded-lg border px-3 py-2 text-sm outline-none sm:w-auto"
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && !error && visibleCount < filteredProducts.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="w-full cursor-pointer rounded-lg border border-blue-600 px-8 py-3 text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white sm:w-auto"
              >
                Muat Lebih Banyak ({Math.min(6, remainingProducts)} produk lagi)
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default BrowseProducts;
