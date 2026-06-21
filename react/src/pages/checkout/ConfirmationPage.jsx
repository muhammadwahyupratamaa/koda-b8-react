import { FiCheck, FiChevronRight, FiLock } from "react-icons/fi";

import { GiDiceSixFacesFive } from "react-icons/gi";
import { headphoneWirelessPremium } from "../../assets";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/cartService";

function ConfirmationPage() {
  const navigate = useNavigate();
  const cart = cartService.getCart();
  const shipping = JSON.parse(localStorage.getItem("shipping"));
  const payment = localStorage.getItem("payment");
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex justify-center items-center mb-10">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex justify-center items-center">
              <FiCheck className="w-5 h-5" />
            </div>

            <p className="text-sm text-gray-500 mt-2">Pengiriman</p>
          </div>

          <div className="w-32 h-1 bg-green-500 mx-5"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex justify-center items-center">
              <FiCheck className="w-5 h-5" />
            </div>

            <p className="text-sm text-gray-500 mt-2">Pembayaran</p>
          </div>

          <div className="w-32 h-1 bg-green-500 mx-5"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center">
              3
            </div>

            <p className="text-sm text-blue-600 mt-2">Konfirmasi</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[2fr_1fr] gap-6">
        {/* LEFT */}

        <section className="border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-medium mb-8">Konfirmasi Pesanan</h2>

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
              JNE Reguler • 3-5 hari kerja
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-medium mb-4">Produk yang Dipesan</h3>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg"
                  />

                  <div>
                    <p className="text-sm font-medium">{item.name}</p>

                    <p className="text-xs text-gray-400">x{item.qty}</p>
                  </div>
                </div>

                <p className="text-blue-600 font-medium">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-100 rounded-xl p-5 flex gap-3 mt-6">
            <FiLock className="w-5 h-5 text-blue-600 mt-1" />

            <p className="text-sm text-gray-500">
              Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat &
              Ketentuan kami. Pembayaran baru akan diproses setelah kamu
              mengkonfirmasi di langkah ini.
            </p>
          </div>

          <div className="flex justify-between gap-2 mt-8">
            <button
              onClick={() => navigate("/checkout/payment")}
              className="border border-gray-200 rounded-xl px-8 py-3 hover:bg-gray-100 cursor-pointer"
            >
              Kembali
            </button>

            <button
              onClick={() => {
                const order = cartService.checkout();

                navigate("/checkout/success", {
                  state: order,
                });
              }}
              className="bg-orange-500 w-full justify-center  hover:bg-orange-600 rounded-xl px-10 py-3 text-white flex items-center gap-2 cursor-pointer"
            >
              <FiLock className="w-4 h-4" />
              Bayar Rp {subtotal.toLocaleString("id-ID")} Sekarang
            </button>
          </div>
        </section>

        {/* RIGHT */}
        <section className="border border-gray-200 rounded-xl p-5 h-fit">
          <h2 className="text-2xl font-medium mb-6">Ringkasan Pesanan</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b border-gray-200 pb-5 mb-5"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500">x{item.qty}</p>
            </div>
          ))}

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">
                Rp {subtotal.toLocaleString("id-ID")}
              </p>

              <p>Rp {subtotal.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Ongkir</p>

              <p className="text-green-600 font-medium">Gratis</p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-5"></div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">
              Rp {subtotal.toLocaleString("id-ID")}
            </p>

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
