import { FiCheck, FiPackage, FiTruck, FiMapPin, FiBox } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();
  const { state: order } = useLocation();

  if (!order) {
    navigate("/");
    return null;
  }
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex justify-center items-center">
          <FiCheck className="w-12 h-12 text-green-500" />
        </div>

        <h1 className="text-4xl font-semibold mt-8">Pesanan Berhasil! 🎉</h1>

        <p className="text-gray-400 text-base mt-3">
          Terima kasih telah berbelanja di BeliMudah. Pesananmu sedang diproses.
        </p>
      </div>

      <section className="max-w-3xl mx-auto border border-gray-200 rounded-xl p-6 mt-10">
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-400">Nomor Pesanan</p>

            <p className="text-blue-600 text-xl font-semibold mt-1">
              #{order?.orderNumber}
            </p>
          </div>

          <div className="text-end">
            <p className="text-sm text-gray-400">Total Pembayaran</p>

            <p className="text-2xl font-semibold mt-1">
              Rp {order?.total?.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-6">
          <div className="flex gap-4">
            <FiTruck className="w-5 h-5 text-blue-600 mt-1" />

            <div>
              <p className="font-medium">{order.shipping?.shippingMethod}</p>

              <p className="text-sm text-gray-400">
                Estimasi tiba: 2-3 Juni 2026
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiMapPin className="w-5 h-5 text-blue-600 mt-1" />

            <div>
              <p className="font-medium">Alamat Pengiriman</p>

              <p className="text-sm text-gray-400">
                {order.shipping?.address}, {order.shipping?.city},
                {order.shipping?.province} {order.shipping?.postalCode}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto border border-gray-200 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-medium mb-6">Status Pesanan</h2>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex justify-center items-center">
                <FiCheck className="text-green-600 w-5 h-5" />
              </div>

              <div>
                <p className="font-medium">Pesanan Diterima</p>

                <p className="text-sm text-gray-400">Baru saja</p>
              </div>
            </div>

            <FiCheck className="text-green-500 w-5 h-5" />
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
              <FiPackage className="text-gray-400 w-5 h-5" />
            </div>

            <div>
              <p className="font-medium text-gray-500">Sedang Dikemas</p>

              <p className="text-sm text-gray-400">Estimasi 1-2 jam</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
              <FiTruck className="text-gray-400 w-5 h-5" />
            </div>

            <div>
              <p className="font-medium text-gray-500">Dalam Pengiriman</p>

              <p className="text-sm text-gray-400">3-5 hari kerja</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
              <FiBox className="text-gray-400 w-5 h-5" />
            </div>

            <div>
              <p className="font-medium text-gray-500">Terkirim</p>

              <p className="text-sm text-gray-400">2-3 Juni 2026</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto flex justify-between gap-4 mt-8">
        <button
          onClick={() => navigate("/profile/orders")}
          className="bg-blue-600 hover:bg-blue-700 flex gap-2 justify-center items-center text-white rounded-xl px-15 py-3 cursor-pointer"
        >
          <BsBoxSeam /> Lacak Pesanan
        </button>

        <button
          onClick={() => navigate("/profile/orders")}
          className="border border-gray-200 rounded-xl px-15 py-3 hover:bg-gray-100 cursor-pointer"
        >
          Lihat Riwayat Pesanan
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-blue-600 font-medium cursor-pointer"
        >
          Lanjut Belanja →
        </button>
      </div>
    </main>
  );
}

export default SuccessPage;
