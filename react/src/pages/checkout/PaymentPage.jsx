import { FiCheck, FiChevronRight, FiCreditCard, FiLock } from "react-icons/fi";

import { headphoneWirelessPremium } from "../../assets";

function PaymentPage() {
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
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center">
              2
            </div>

            <p className="text-sm text-blue-600 mt-2">Pembayaran</p>
          </div>

          <div className="w-32 h-1 bg-gray-300 mx-5"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex justify-center items-center">
              3
            </div>

            <p className="text-sm text-gray-400 mt-2">Konfirmasi</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[2fr_1fr] gap-6">
        {/* LEFT */}

        <section className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-8">
            <FiCreditCard className="w-5 h-5 text-blue-600" />

            <h2 className="text-2xl font-medium">Metode Pembayaran</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="border-2 border-blue-600 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
              <input type="radio" name="payment" defaultChecked />

              <span className="text-sm">🏦 Virtual Account BCA</span>
            </label>

            <label className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
              <input type="radio" name="payment" />

              <span className="text-sm">🏦 Virtual Account BNI</span>
            </label>

            <label className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
              <input type="radio" name="payment" />

              <span className="text-sm">💳 Kartu Kredit / Debit</span>
            </label>

            <label className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
              <input type="radio" name="payment" />

              <span className="text-sm">📱 GoPay</span>
            </label>

            <label className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
              <input type="radio" name="payment" />

              <span className="text-sm">📱 OVO</span>
            </label>

            <label className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
              <input type="radio" name="payment" />

              <span className="text-sm">📱 DANA</span>
            </label>
          </div>

          <div className="bg-slate-100 rounded-xl p-4 flex items-center gap-3 mt-6">
            <FiLock className="w-5 h-5 text-blue-600" />

            <p className="text-sm text-gray-500">
              Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak
              menyimpan data kartu kreditmu.
            </p>
          </div>

          <div className="flex justify-between gap-2 mt-8">
            <button className="border border-gray-200 rounded-xl px-8 py-3 cursor-pointer hover:bg-gray-100">
              Kembali
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 justify-center rounded-xl w-full px-12 py-3 text-white flex items-center gap-2 cursor-pointer">
              Lanjut ke Konfirmasi
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* RIGHT */}
        <section className="border border-gray-200 rounded-xl p-5 h-fit">
          <h2 className="text-2xl font-medium mb-6">Ringkasan Pesanan</h2>

          <div className="flex justify-between items-start border-b border-gray-200 pb-5">
            <div className="flex gap-3 justify-center items-center">
              <img
                src={headphoneWirelessPremium}
                alt="Headphone"
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Headphone Wireless Premium
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">x1</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Subtotal</p>

              <p>Rp 450.000</p>
            </div>

            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Ongkir</p>

              <p className="text-green-600 font-medium">Gratis</p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-5"></div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Total</p>

            <p className="text-2xl font-semibold text-blue-600">Rp 450.000</p>
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
