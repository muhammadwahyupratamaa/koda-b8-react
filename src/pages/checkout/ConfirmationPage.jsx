import { FiCheck, FiChevronRight, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cartService from "../../services/cartService";
import checkoutService from "../../services/checkoutService";
import storageService from "../../services/storageService";
import { getProductImage } from "../../services/productService";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";

function ConfirmationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const shipping = storageService.get("shipping");
  const payment = storageService.get("payment");

  console.log("shipping =", shipping);
  console.log("payment =", payment);

  async function loadCart() {
    try {
      const result = await cartService.getCart();
      setCart(result.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!shipping) {
      navigate("/checkout/shipping", { replace: true });
      return;
    }

    if (!payment) {
      navigate("/checkout/payment", { replace: true });
      return;
    }

    if (cart.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [loading, shipping, payment, cart, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!shipping || !payment || cart.length === 0) {
    return null;
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex justify-center items-center mb-10">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-500 text-white flex justify-center items-center">
              <FiCheck className="w-5 h-5" />
            </div>

            <p className="text-sm text-gray-500 mt-2">Pengiriman</p>
          </div>

          <div className="mx-2 h-1 w-12 bg-green-500 sm:mx-5 sm:w-32"></div>

          <div className="flex flex-col items-center">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-500 text-white flex justify-center items-center">
              <FiCheck className="w-5 h-5" />
            </div>

            <p className="text-sm text-gray-500 mt-2">Pembayaran</p>
          </div>

          <div className="mx-2 h-1 w-12 bg-green-500 sm:mx-5 sm:w-32"></div>

          <div className="flex flex-col items-center">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-600 text-white flex justify-center items-center">
              3
            </div>

            <p className="text-sm text-blue-600 mt-2">Konfirmasi</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        {/* LEFT */}

        <section className="border border-gray-200 rounded-xl p-6">
          <h2 className="mb-8 text-xl font-medium sm:text-2xl">
            Konfirmasi Pesanan
          </h2>

          <div className="bg-gray-50 rounded-xl p-5 mb-5">
            <h3 className="font-medium mb-3">Alamat Pengiriman</h3>

            <p className="text-sm text-gray-500">
              {shipping.name} • {shipping.phone}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {shipping.address}, {shipping.city}, {shipping.province}{" "}
              {shipping.postalCode}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 mb-5">
            <h3 className="font-medium mb-3">Metode Pengiriman</h3>

            <p className="text-sm text-gray-500">
              {shipping.shippingMethod} • 3-5 Hari
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 mb-5">
            <h3 className="font-medium mb-3">Metode Pembayaran</h3>

            <p className="text-sm text-gray-500">{payment}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-medium mb-4">Produk yang Dipesan</h3>

            {cart.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-3">
                  <img
                    src={getProductImage(item.image_url)}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover sm:h-14 sm:w-14"
                  />

                  <div>
                    <p className="text-sm font-medium">{item.name}</p>

                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                </div>

                <p className="text-blue-600 font-medium">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-100 p-5">
            <FiLock className="w-5 h-5 text-blue-600 mt-1" />

            <p className="text-sm text-gray-500">
              Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat &
              Ketentuan kami. Pembayaran baru akan diproses setelah kamu
              mengkonfirmasi di langkah ini.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/checkout/payment")}
              className="w-full rounded-xl border border-gray-200 px-8 py-3 sm:w-auto hover:bg-gray-100 cursor-pointer"
            >
              Kembali
            </button>

            <button
              disabled={checkoutLoading}
              onClick={async () => {
                if (checkoutLoading) return;

                try {
                  setCheckoutLoading(true);

                  const result = await checkoutService.checkout(
                    shipping,
                    payment,
                  );

                  dispatch(clearCart());

                  storageService.remove("shipping");
                  storageService.remove("payment");

                  navigate("/checkout/success", {
                    replace: true,
                    state: {
                      order: result.data,
                      shipping,
                      payment,
                    },
                  });
                } catch (error) {
                  console.error("CHECKOUT ERROR:", error);
                  alert(error.message);
                  setCheckoutLoading(false);
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed w-full justify-center rounded-xl px-10 py-3 text-white flex items-center gap-2 cursor-pointer"
            >
              <FiLock className="w-4 h-4" />

              {checkoutLoading
                ? "Memproses Pesanan..."
                : `Bayar Rp ${subtotal.toLocaleString("id-ID")} Sekarang`}
            </button>
          </div>
        </section>

        {/* RIGHT */}
        <section className="border border-gray-200 rounded-xl p-5 h-fit">
          <h2 className="mb-6 text-xl font-medium sm:text-2xl">
            Ringkasan Pesanan
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b border-gray-200 pb-5 mb-5"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={getProductImage(item.image_url)}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500">x{item.quantity}</p>
            </div>
          ))}

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Subtotal</p>

              <p>Rp {subtotal.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Ongkir</p>

              <p className="text-green-600 font-medium">Gratis</p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-5"></div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Total</p>

            <p className="text-2xl font-semibold text-blue-600">
              Rp {subtotal.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            <p className="text-xs text-gray-400">
              🔒 Pembayaran aman dan terenkripsi
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default ConfirmationPage;
