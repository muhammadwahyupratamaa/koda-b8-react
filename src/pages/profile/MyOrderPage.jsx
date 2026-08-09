import OrderCard from "../../components/profile/OrderCard";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import { useNavigate } from "react-router-dom";
import checkoutService from "../../services/checkoutService";
import { useEffect, useState } from "react";

function MyOrderPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const result = await checkoutService.getOrders();

      setOrders(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <ProfileSidebar active="orders" />

        <section className="flex flex-col gap-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Pesanan Saya</h1>

          {orders.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-6 sm:p-10 text-center">
              <h2 className="text-2xl font-semibold">Belum ada pesanan</h2>

              <p className="text-gray-500 mt-2">
                Yuk mulai belanja di BRilianShop.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer"
              >
                Belanja Sekarang
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                orderId={`ORD-${order.id}`}
                date={new Date(order.created_at).toLocaleDateString("id-ID")}
                status={order.status}
                total={`Rp ${Number(order.total).toLocaleString("id-ID")}`}
                products={order.items}
                showReview={false}
              />
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default MyOrderPage;
