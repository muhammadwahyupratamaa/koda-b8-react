import { FaStar, FaCheck, FaShoppingCart } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import ProductSection from "../../components/home/ProductSection";
import wishlistService from "../../services/wishlistService";

import {
  FiHeart,
  FiShield,
  FiRefreshCw,
  FiTruck,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import cartService from "../../services/cartService";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../services/productService";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    cartService.clearCart();

    cartService.addToCart(product);

    navigate("/checkout/shipping");
  };

  const product = productService.getProductById(id);
  if (!product) {
    return (
      <main className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold">Produk tidak ditemukan</h1>
      </main>
    );
  }

  const handleAddToCart = () => {
    cartService.addToCart(product);
  };

  const produkTerkait = productService.getRelatedProducts(
    product.category,
    product.id,
  );
  const saving = product.priceDisc - product.price;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <span>Beranda</span>

        <GoChevronRight className="w-4 h-4" />

        <span>Toko</span>
        <GoChevronRight className="w-4 h-4" />

        <span>{product.category}</span>

        <GoChevronRight className="w-4 h-4" />

        <span className="text-sm text-black">{product.name}</span>
      </section>

      <section className="grid grid-cols-2 gap-10">
        {/*  LEFT  */}

        <div>
          <div className="relative rounded-xl overflow-hidden">
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              -{product.discount}%
            </span>

            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {product.gallery.map((image, index) => (
              <button key={index}>
                <img
                  src={image}
                  className="rounded-xl"
                  alt={`${product.name}-${index + 1}`}
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
            <h1 className="text-2xl font-semibold ">{product.name}</h1>
            <div className="flex gap-2 mb-2">
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
            <div className="flex items-center gap-3">
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

            <div className="flex gap-5 mt-5 ">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="rounded-lg border  border-gray-300 px-5 py-2 text-sm transition cursor-pointer  hover:border-emerald-500 hover:text-emerald-600"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
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

              <p className="text-sm text-gray-400">
                Stok : {product.stock} pcs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1fr_60px] gap-3 ">
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
              onClick={() => {
                wishlistService.addToWishlist(product);
              }}
              className="border-gray-100 border rounded-xl flex justify-center items-center hover:bg-gray-100 cursor-pointer"
            >
              <FiHeart />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 ">
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
