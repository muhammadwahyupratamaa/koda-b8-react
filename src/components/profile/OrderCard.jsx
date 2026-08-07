import { FiTruck, FiStar } from "react-icons/fi";
import { productImages } from "../../assets";

function OrderCard({
  orderId,
  date,
  status,
  total,
  products = [],
  showReview = false,
}) {
  const statusStyle = {
    Diproses: "bg-yellow-100 text-yellow-700",
    Dikirim: "bg-blue-100 text-blue-600",
    Terkirim: "bg-green-100 text-green-600",
  };

  const currentStatus = statusStyle[status] ?? "bg-gray-100 text-gray-600";

  return (
    <article className="rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">#{orderId}</h3>

          <p className="text-sm text-gray-400 mt-1">{date}</p>
        </div>

        <div
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full ${currentStatus}`}
        >
          <FiTruck className="w-4 h-4" />
          {status}
        </div>
      </div>

      <div className="border-b border-gray-200 pb-5 mt-6 flex flex-col gap-5">
        {products.length === 0 ? (
          <p className="text-sm text-gray-400 italic">
            Detail produk belum tersedia.
          </p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <img
                src={productImages[product.image_url]}
                alt={product.name}
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover"
              />

              <div className="flex flex-col gap-1">
                <h4 className="text-base font-medium">{product.name}</h4>

                <p className="text-sm text-gray-400">
                  ×{product.quantity} • Rp{" "}
                  {Number(product.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base sm:text-lg">
          Total :
          <span className="text-blue-600 font-semibold ml-2">{total}</span>
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="border border-blue-600 text-blue-600 rounded-lg px-4 py-2 w-full sm:w-auto text-sm hover:bg-blue-50 cursor-pointer"
          >
            Lacak
          </button>

          {showReview && (
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 w-full sm:w-auto text-sm flex items-center gap-2 cursor-pointer"
            >
              <FiStar className="w-4 h-4" />
              Beri Ulasan
            </button>
          )}

          <button
            type="button"
            className="border border-gray-300 text-gray-500 rounded-lg px-4 py-2 w-full sm:w-auto text-sm hover:bg-gray-100 cursor-pointer"
          >
            Beli Lagi
          </button>
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
