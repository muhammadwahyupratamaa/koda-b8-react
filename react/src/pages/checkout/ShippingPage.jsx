import { FiTruck, FiLock, FiChevronRight } from "react-icons/fi";
import { headphoneWirelessPremium } from "../../assets";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/cartService";

function ShippingPage() {
  const navigate = useNavigate();
  const cart = cartService.getCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const shippingData = {
    name: "Budi Santoso",
    phone: "0812-3456-7890",
    email: "budi@email.com",
    address: "Jl. Kebon Jeruk No.15",
    city: "Jakarta Barat",
    province: "DKI Jakarta",
    postalCode: "11530",
    shippingMethod: "JNE Reguler",
  };
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex justify-center items-center mb-10">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
              1
            </div>

            <p className="text-sm text-blue-600 mt-2">Pengiriman</p>
          </div>

          <div className="w-32 h-1 bg-gray-300 mx-5"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">
              2
            </div>

            <p className="text-sm text-gray-400 mt-2">Pembayaran</p>
          </div>

          <div className="w-32 h-1 bg-gray-300 mx-5"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">
              3
            </div>

            <p className="text-sm text-gray-400 mt-2">Konfirmasi</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[2fr_1fr] gap-6">
        {/* Left */}

        <section className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-8">
            <FiTruck className="w-5 h-5 text-blue-600" />

            <h2 className="text-2xl font-medium">Alamat Pengiriman</h2>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Nama Penerima *
              </label>

              <input
                type="text"
                defaultValue="Budi Santoso"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Nomor Telepon *
              </label>

              <input
                type="text"
                defaultValue="0812-3456-7890"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Email *
              </label>

              <input
                type="email"
                defaultValue="budi@email.com"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Alamat Lengkap *
              </label>

              <input
                type="text"
                defaultValue="Jl. Kebon Jeruk No.15"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Kota *
              </label>

              <input
                type="text"
                defaultValue="Jakarta Barat"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Provinsi *
              </label>

              <input
                type="text"
                defaultValue="DKI Jakarta"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Kode Pos *
              </label>

              <input
                type="text"
                defaultValue="11530"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Catatan (opsional)
              </label>

              <input
                type="text"
                placeholder="Warna pagar, dll."
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-medium mb-5">Metode Pengiriman</h2>

            <div className="flex flex-col gap-4">
              <label className="border-2 border-blue-600 rounded-xl p-5 flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-4">
                  <input type="radio" name="shipping" defaultChecked />

                  <div>
                    <p className="font-medium">JNE Reguler</p>

                    <p className="text-sm text-gray-400">3-5 hari kerja</p>
                  </div>
                </div>

                <p className="text-green-600 font-medium">GRATIS</p>
              </label>

              <label className="border border-gray-200 rounded-xl p-5 flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-4">
                  <input type="radio" name="shipping" />

                  <div>
                    <p className="font-medium">JNE Express</p>

                    <p className="text-sm text-gray-400">1-2 hari kerja</p>
                  </div>
                </div>

                <p className="text-green-600 font-medium">GRATIS</p>
              </label>

              <label className="border border-gray-200 rounded-xl p-5 flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-4">
                  <input type="radio" name="shipping" />

                  <div>
                    <p className="font-medium">Same Day Delivery</p>

                    <p className="text-sm text-gray-400">
                      Hari ini (sebelum 16:00)
                    </p>
                  </div>
                </div>

                <p className="text-green-600 font-medium">GRATIS</p>
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.setItem("shipping", JSON.stringify(shippingData));

              navigate("/checkout/payment");
            }}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 flex justify-center items-center gap-2 font-medium cursor-pointer"
          >
            Lanjut ke Pembayaran
            <FiChevronRight className="w-5 h-5" />
          </button>
        </section>

        {/* RIGHT */}
        <section className="border border-gray-200 rounded-xl p-5 h-fit">
          <h2 className="text-2xl font-medium mb-6">Ringkasan Pesanan</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b border-gray-200 pb-5 mb-5"
            >
              <div className="flex gap-3 justify-center items-center">
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

              <div>
                <p className="text-sm text-gray-500">x{item.qty}</p>
              </div>
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

export default ShippingPage;
