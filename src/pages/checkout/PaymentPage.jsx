import { FiCheck, FiChevronRight, FiCreditCard, FiLock } from "react-icons/fi";

import { headphoneWirelessPremium } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import storageService from "../../services/storageService";

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(
    storageService.get("payment", "Virtual Account BCA"),
  );

  const cart = useSelector((state) => state.cart.items);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex justify-center items-center mb-10">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 sm:h-10 sm:w-10rounded-full bg-green-500 text-white flex justify-center items-center">
              <FiCheck className="w-5 h-5" />
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-2">Pengiriman</p>
          </div>

          <div className="w-32 h-1 bg-green-500 mx-5"></div>

          <div className="flex flex-col items-center">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-600 text-white flex justify-center items-center">
              2
            </div>

            <p className="text-xs sm:text-sm text-blue-600 mt-2">Pembayaran</p>
          </div>

          <div className="mx-2 h-1 w-12 bg-green-500 sm:mx-5 sm:w-32"></div>

          <div className="flex flex-col items-center">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 text-gray-500 flex justify-center items-center">
              3
            </div>

            <p className="text-xs sm:text-sm text-gray-400 mt-2">Konfirmasi</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        {/* LEFT */}

        <section className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-8">
            <FiCreditCard className="w-5 h-5 text-blue-600" />

            <h2 className="text-2xl font-medium">Metode Pembayaran</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label
              className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer ${
                paymentMethod === "Virtual Account BCA"
                  ? "border-2 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={paymentMethod === "Virtual Account BCA"}
                onChange={() => setPaymentMethod("Virtual Account BCA")}
              />

              <span>🏦 Virtual Account BCA</span>
            </label>

            <label
              className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer ${
                paymentMethod === "Virtual Account BNI"
                  ? "border-2 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={paymentMethod === "Virtual Account BNI"}
                onChange={() => setPaymentMethod("Virtual Account BNI")}
              />

              <span>🏦 Virtual Account BNI</span>
            </label>

            <label
              className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer ${
                paymentMethod === "Kartu Kredit / Debit"
                  ? "border-2 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={paymentMethod === "Kartu Kredit / Debit"}
                onChange={() => setPaymentMethod("Kartu Kredit / Debit")}
              />

              <span>💳 Kartu Kredit / Debit</span>
            </label>

            <label
              className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer ${
                paymentMethod === "Gopay"
                  ? "border-2 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={paymentMethod === "Gopay"}
                onChange={() => setPaymentMethod("Gopay")}
              />

              <span>📱 GoPay</span>
            </label>

            <label
              className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer ${
                paymentMethod === "Ovo"
                  ? "border-2 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={paymentMethod === "Ovo"}
                onChange={() => setPaymentMethod("Ovo")}
              />

              <span>📱 Ovo</span>
            </label>

            <label
              className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer ${
                paymentMethod === "Dana"
                  ? "border-2 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={paymentMethod === "Dana"}
                onChange={() => setPaymentMethod("Dana")}
              />

              <span>📱 Dana</span>
            </label>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-100 p-4">
            <FiLock className="w-5 h-5 text-blue-600" />

            <p className="text-xs sm:text-sm text-gray-500">
              Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak
              menyimpan data kartu kreditmu.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/checkout/shipping")}
              className="w-full rounded-xl border border-gray-200 px-8 py-3 hover:bg-gray-100 sm:w-auto cursor-pointer"
            >
              Kembali
            </button>

            <button
              onClick={() => {
                storageService.set("payment", paymentMethod);
                if (!paymentMethod) {
                  return alert("Pilih metode pembayaran.");
                }
                navigate("/checkout/confirmation");
              }}
              className="bg-blue-600 hover:bg-blue-700 justify-center rounded-xl w-full px-12 py-3 text-white flex items-center gap-2 cursor-pointer"
            >
              Lanjut ke Konfirmasi
              <FiChevronRight className="w-5 h-5" />
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
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-500">x{item.qty}</p>
            </div>
          ))}

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <p className="text-gray-500">
                Rp {subtotal.toLocaleString("id-ID")}
              </p>

              <p>Rp {subtotal.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm">
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

export default PaymentPage;
