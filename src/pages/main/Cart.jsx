import { FiHeart, FiMinus, FiPlus, FiTag, FiTrash2 } from "react-icons/fi";
import { headphoneWirelessPremium } from "../../assets";
import cartService from "../../services/cartService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import wishlistService from "../../services/wishlistService";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(cartService.getCart());
  }, []);

  const refreshCart = () => {
    setCart(cartService.getCart());
  };

  const handleIncrease = (id) => {
    cartService.increaseQty(id);
    refreshCart();
  };

  const handleDecrease = (id) => {
    cartService.decreaseQty(id);
    refreshCart();
  };

  const handleRemove = (id) => {
    cartService.removeItem(id);
    refreshCart();
  };

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl p-5"
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>

                    <p className="text-sm text-gray-400 mt-1">{item.color}</p>

                    <div className="flex items-center border border-gray-200 rounded-lg w-fit mt-3">
                      <button className="px-3 py-2 cursor-pointer">
                        <FiMinus onClick={() => handleDecrease(item.id)} />
                      </button>

                      <span className="px-5">{item.qty}</span>

                      <button className="px-3 py-2 cursor-pointer">
                        <FiPlus onClick={() => handleIncrease(item.id)} />
                      </button>
                    </div>

                    <button
                      className="flex gap-2 mt-4 justify-center items-center cursor-pointer"
                      onClick={() => {
                        wishlistService.addToWishlist(item);

                        cartService.removeItem(item.id);

                        setCart(cartService.getCart());
                      }}
                    >
                      <FiHeart />
                      Simpan ke Wishlist
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <button>
                    <FiTrash2
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-400"
                    />
                  </button>

                  <p className="text-2xl font-semibold text-blue-600">
                    Rp {(item.price * item.qty).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <FiTag className="w-5 h-5 text-blue-600" />

              <h2 className="text-2xl font-medium">Kode Promo</h2>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Masukkan kode promo"
                className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg cursor-pointer">
                Terapkan
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              Coba: HEMAT10, BRilianShop, atau NEWUSER
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border border-gray-200 rounded-xl p-5 h-fit">
          <h2 className="text-2xl font-medium mb-6">Ringkasan Pesanan</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <div className="flex w-full justify-between text-gray-500 text-sm font-meidum">
                <p>Subtotal</p>

                <p className="text-blue-600">
                  {formatRupiah(subtotal)}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Ongkir</p>

              <p className="text-green-600 font-medium">GRATIS</p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-5"></div>

          <div className="flex justify-between text-lg font-semibold">
            <p>{formatRupiah(subtotal)}</p>

            <p className="text-blue-600">
              {formatRupiah(subtotal)}
            </p>
          </div>

          <button
            onClick={() => navigate("/checkout/shipping")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl mt-6 cursor-pointer"
          >
            Checkout Aman
          </button>

          <div className="text-center mt-5">
            <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
              <span>🔒 Pembayaran 100% Aman</span>
            </div>

            <p className="text-xs text-gray-400 mt-2 leading-5">
              Metode: Transfer Bank • Virtual Account • Kartu Kredit • e-Wallet
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
export {formatRupiah};
