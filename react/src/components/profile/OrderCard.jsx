import { FiTruck, FiStar } from "react-icons/fi";

function OrderCard({
  orderId,
  date,
  status,
  total,
  products,
  showReview = false,
}) {
  const statusStyle = {
    Dikirim: "bg-blue-100 text-blue-600",
    Terkirim: "bg-green-100 text-green-600",
  };

  const currentStatus = statusStyle[status] ?? "bg-gray-100 text-gray-600";

  return (
    <article className="border border-gray-200 rounded-xl p-6">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-2xl font-semibold">#{orderId}</h3>

          <p className="text-sm text-gray-400 mt-1">{date}</p>
        </div>

        <div
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full ${currentStatus}`}
        >
          <FiTruck className="w-4 h-4" />

          {status}
        </div>
      </div>

      <div className="border-b border-gray-200 pb-5 flex flex-col gap-5">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex flex-col gap-1">
              <h4 className="text-base font-medium">{product.name}</h4>

              <p className="text-sm text-gray-400">
                ×{product.qty} • {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg">
          Total :
          <span className="text-blue-600 font-semibold ml-2">{total}</span>
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            className="border border-blue-600 text-blue-600 rounded-lg px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
          >
            Lacak
          </button>

          {showReview && (
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2 cursor-pointer"
            >
              <FiStar className="w-4 h-4" />
              Beri Ulasan
            </button>
          )}

          <button
            type="button"
            className="border border-gray-300 text-gray-500 rounded-lg px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            Beli Lagi
          </button>
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
