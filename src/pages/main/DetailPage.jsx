import { FaStar, FaCheck, FaShoppingCart } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import ProductSection from "../../components/home/ProductSection";
import wishlistService from "../../services/wishlistService";
import { useState, useEffect } from "react";
import cartService from "../../services/cartService";

import {
  FiHeart,
  FiShield,
  FiRefreshCw,
  FiTruck,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../services/productService";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productService.getProductById(id);

  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "",
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedColor(product.colors?.[0] || "");
      setQty(1);

      loadWishlist();
    }
  }, [id]);

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold">Produk tidak ditemukan</h1>
      </main>
    );
  }

  const handleBuyNow = async () => {
    try {
      for (let i = 0; i < qty; i++) {
        await cartService.addToCart(product.id, selectedColor);
      }

      navigate("/checkout/shipping");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleWishlist = async () => {
    if (wishlistLoading) {
      return;
    }

    try {
      if (isWishlisted) {
        await wishlistService.removeFromWishlist(product.id);
        setIsWishlisted(false);
      } else {
        await wishlistService.addToWishlist(product.id);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      alert(error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      for (let i = 0; i < qty; i++) {
        await cartService.addToCart(product.id, selectedColor);
      }

      alert("Produk berhasil ditambahkan ke keranjang.");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleIncreaseQty = () => {
    if (qty < product.stock) {
      setQty((prev) => prev + 1);
    }
  };

  const handleDecreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  async function loadWishlist() {
    try {
      const result = await wishlistService.getWishlist();

      const exists = result.data.some(
        (item) => Number(item.product_id) === Number(product.id),
      );

      setIsWishlisted(exists);
    } catch (error) {
      console.error("LOAD WISHLIST ERROR:", error);
    } finally {
      setWishlistLoading(false);
    }
  }

  const produkTerkait = productService.getRelatedProducts(
    product.category,
    product.id,
  );

  const saving = product.priceDisc - product.price;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-gray-400">
        <span>Beranda</span>

        <GoChevronRight className="w-4 h-4" />

        <span>Toko</span>
        <GoChevronRight className="w-4 h-4" />

        <span>{product.category}</span>

        <GoChevronRight className="w-4 h-4" />

        <span className="text-sm text-black">{product.name}</span>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {/*  LEFT  */}

        <div>
          <div className="relative rounded-xl overflow-hidden">
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              -{product.discount}%
            </span>

            <img
              src={selectedImage}
              alt={product.name}
              className="aspect-square w-full rounded-xl object-cover"
            />
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {product.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                  selectedImage === image
                    ? "border-blue-600"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name}-${index + 1}`}
                  className="sm:w-24 sm:h-24 w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT  */}

        <div className="flex flex-col gap-7">
          <p className="text-sm text-gray-400">
            {product.brand} • {product.category}
          </p>

          <div className="flex flex-col justify-start items-start gap-2 ">
            <h1 className="text-xl sm:text-2xl font-semibold ">
              {product.name}
            </h1>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-sm text-gray-500">
                {product.rating} ({product.review} ulasan)
              </p>

              <div className="flex items-center gap-1 text-green-600 text-sm">
                <FaCheck />

                <p>Stok tersedia {product.stock}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-5">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold text-blue-600">
                Rp {product.price.toLocaleString("id-ID")}
              </h2>

              <p className="line-through text-lg text-gray-400">
                Rp {product.priceDisc.toLocaleString("id-ID")}
              </p>

              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                Hemat {product.discount}%
              </span>
            </div>

            <p className="text-green-600 text-sm mt-2">
              Kamu hemat Rp {saving.toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Pilih Warna :</p>

            <div className="mt-5 flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-lg border px-5 py-2 text-sm transition cursor-pointer ${
                    selectedColor === color
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {color}
                </button>
              ))}

              <p className="mt-3 text-sm text-gray-500">
                Warna dipilih:
                <span className="font-medium text-gray-800">
                  {" "}
                  {selectedColor}
                </span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Jumlah</p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-gray-100 rounded-lg">
                <button
                  onClick={handleDecreaseQty}
                  disabled={qty === 1}
                  className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMinus />
                </button>

                <span className="px-4">{qty}</span>

                <button
                  onClick={handleIncreaseQty}
                  disabled={qty === product.stock}
                  className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiPlus />
                </button>
              </div>

              <p className="text-sm text-gray-400">
                Stok : {product.stock} pcs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_60px] gap-3 ">
            <button
              onClick={handleAddToCart}
              className="border-2 text-base border-orange-500 text-orange-500 rounded-xl py-3 flex justify-center items-center gap-2 font-medium cursor-pointer hover:bg-orange-50"
            >
              <FaShoppingCart />
              Tambah ke Keranjang
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-orange-500 text-base rounded-xl py-3 text-white font-medium hover:bg-orange-600 cursor-pointer"
            >
              Beli Sekarang
            </button>

            <button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              className={`transition-all duration-300 ${
                isWishlisted
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-600"
              }`}
            >
              <FiHeart
                className={`transition ${
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
          </div>

          <div className="grid sm:grid-cols-3 grid-cols-1 gap-3 ">
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

      <section className=" border border-gray-200 mt-10 rounded-xl">
        <div className="flex gap-6 text-sm border-b border-gray-100 p-4 pb-0 text-gray-500 justify-start">
          <p className="text-blue-600 border-b border-blue-600">Deskripsi</p>
        </div>

        <div className="text-base text-gray-400 py-7 px-4">
          <p>{product.description}</p>
        </div>
      </section>

      <ProductSection title="Produk Terkait" products={produkTerkait} />
    </main>
  );
}

export default DetailPage;
