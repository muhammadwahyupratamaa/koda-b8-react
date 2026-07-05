import { Heart, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import cartService from "../../services/cartService";
import wishlistService from "../../services/wishlistService";
import formatCurrency from "../../utils/formatCurrency";
import { useAuth } from "../../context/AuthContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [liked, setLiked] = useState(wishlistService.isInWishlist(product.id));

  useEffect(() => {
    setLiked(wishlistService.isInWishlist(product.id));
  }, [product.id]);

  const {
    id,
    category,
    name,
    image,
    rating,
    review,
    price,
    priceDisc,
    discount,
    sold,
  } = product;

  function handleWishlist(e) {
    e.stopPropagation();

    if (!user) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    if (liked) {
      wishlistService.removeFromWishlist(product.id);
    } else {
      wishlistService.addToWishlist(product);
    }

    setLiked((prev) => !prev);
  }

  function handleAddCart(e) {
    e.stopPropagation();

    if (!user) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    const success = cartService.addToCart(product);

    if (!success) {
      alert("Stok produk tidak mencukupi.");
    }
  }

  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className="cursor-pointer overflow-hidden  rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-emerald-300 hover:shadow-xl"
    >
      <div className="relative overflow-hidden bg-slate-100">
        {discount > 0 && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-red-500 hover:text-white"
        >
          <Heart
            size={18}
            className={liked ? "fill-red-500 text-red-500" : ""}
          />
        </button>

        <img
          src={image}
          alt={name}
          className=" border-b border-gray-200 aspect-square w-full object-cover transition-transform duration-500 "
        />
      </div>

      <div className="flex flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
          {category}
        </span>

        <h3
          className=" mt-2 line-clamp-2 min-h-[56px] text-lg font-semibold leading-7 text-slate-900 transition-colors 
          "
        >
          {name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />

            <span className="text-sm font-medium text-slate-700">{rating}</span>

            <span className="text-xs text-slate-400">({review})</span>
          </div>

          <span className="text-xs text-slate-500">{sold} Terjual</span>
        </div>

        <div className="mt-5">
          <h4 className="text-2xl font-bold text-emerald-600">
            {formatCurrency(price)}
          </h4>

          {priceDisc && (
            <p className="mt-1 text-sm text-slate-400 line-through">
              {formatCurrency(priceDisc)}
            </p>
          )}
        </div>

        <button
          onClick={handleAddCart}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg active:scale-95 "
        >
          <ShoppingCart size={18} />
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
