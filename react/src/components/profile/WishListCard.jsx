import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import cartService from "../../services/cartService";
import wishlistService from "../../services/wishlistService";

function WishlistCard({ product, onRemove }) {
  const { id, image, brand, name, rating, review, price, priceDisc, discount } =
    product;

  console.log({
    price: product.price,
    priceDisc: product.priceDisc,
    product,
  });
  return (
    <article className="w-full max-w-[320px] border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-72 object-cover" />

        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
          {discount}
        </div>

        <button
          type="button"
          onClick={() => {
            wishlistService.removeFromWishlist(id);
            onRemove();
          }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex justify-center items-center shadow cursor-pointer hover:bg-gray-100"
        >
          <FiHeart className="w-5 h-5 text-red-500 fill-red-500" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          cartService.addToCart({
            id,
            image,
            brand,
            name,
            rating,
            review,
            price,
            priceDisc,
            discount,
            qty: 1,
          });

          wishlistService.removeFromWishlist(id);
          onRemove();
        }}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-sm font-medium flex justify-center items-center gap-2 cursor-pointer"
      >
        <FiShoppingCart className="w-5 h-5" />
        Tambah ke Keranjang
      </button>

      <div className="p-4">
        <p className="text-sm text-gray-400">{brand}</p>

        <h3 className="text-base font-medium mt-1">{name}</h3>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="w-4 h-4" />
            ))}
          </div>

          <span className="text-sm text-gray-500">
            {rating} ({review})
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <p className="text-xl font-semibold text-blue-600">
            Rp {price.toLocaleString("id-ID")}
          </p>

          <p className="text-sm text-gray-400 line-through">
            Rp {priceDisc.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </article>
  );
}

export default WishlistCard;
