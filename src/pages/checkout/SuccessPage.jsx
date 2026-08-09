import { FiCheck, FiPackage, FiTruck, FiMapPin, FiBox } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const order = state?.order;
  const shipping = state?.shipping;
  const payment = state?.payment;

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center">
        <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-green-100 flex justify-center items-center">
          <FiCheck className="h-10 w-10 sm:h-12 sm:w-12 text-green-500" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold mt-8">
          Pesanan Berhasil! 🎉
        </h1>

        <p className="text-gray-400 text-base text-center px-2 mt-3">
          Terima kasih telah berbelanja di BRilianShop. Pesananmu sedang
          diproses.
        </p>
      </div>

      <section className="max-w-3xl mx-auto border border-gray-200 rounded-xl p-6 mt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-400">Nomor Pesanan</p>

            <p className="text-blue-600 text-xl font-semibold mt-1">
              {`#ORD-${order?.id}`}
            </p>
          </div>

          <div className="text-end">
            <p className="text-sm text-gray-400">Total Pembayaran</p>

            <p className="text-2xl font-semibold mt-1">
              Rp {Number(order?.total).toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-6">
          <div className="flex gap-4">
            <FiTruck className="w-5 h-5 text-blue-600 mt-1" />

            <div>
              <p className="font-medium">{shipping?.shippingMethod}</p>

              <p className="text-sm text-gray-400">
                Estimasi tiba 2-3 hari kerja
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiMapPin className="w-5 h-5 text-blue-600 mt-1" />

            <div>
              <p className="font-medium">Alamat Pengiriman</p>

              <p className="text-sm text-gray-400">
                {shipping?.address},{shipping?.city},{shipping?.province}{" "}
                {shipping?.postalCode}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiCheck className="w-5 h-5 text-blue-600 mt-1" />

            <div>
              <p className="font-medium">Metode Pembayaran</p>

              <p className="text-sm text-gray-400">{payment}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto border border-gray-200 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-medium mb-6">Status Pesanan</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              <p className="font-medium text-gray-500">Pesanan Selesai</p>

              <p className="text-sm text-gray-400">
                Menunggu proses pengiriman
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto flex flex-col gap-3 sm:flex-row mt-8">
        <button
          onClick={() => navigate("/profile/orders")}
          className="bg-blue-600 hover:bg-blue-700 flex gap-2 justify-center items-center text-white rounded-xl w-full sm:w-auto px-8 py-3  cursor-pointer"
        >
          <BsBoxSeam /> Lacak Pesanan
        </button>

        <button
          onClick={() => navigate("/profile/orders")}
          className="border border-gray-200 rounded-xl w-full sm:w-auto px-8 py-3 hover:bg-gray-100 cursor-pointer"
        >
          Lihat Riwayat Pesanan
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-blue-600 w-full text-center sm:w-auto font-medium cursor-pointer"
        >
          Lanjut Belanja →
        </button>
      </div>
    </main>
  );
}

export default SuccessPage;
