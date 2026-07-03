import OrderCard from "../../components/profile/OrderCard";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/cartService";

function MyOrderPage() {
  const navigate = useNavigate();

  const orders = cartService.getOrders();
  return (
    <main className="max-w-7xl mx-auto py-8">
      <section className="grid grid-cols-[280px_1fr] gap-8">
        <ProfileSidebar active="orders" />

        <section className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">Pesanan Saya</h1>

          {orders.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-10 text-center">
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
                orderId={order.orderNumber}
                date={new Date(order.createdAt).toLocaleDateString("id-ID")}
                status={order.status}
                total={`Rp ${order.total.toLocaleString("id-ID")}`}
                showReview={false}
                products={order.items}
              />
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default MyOrderPage;
