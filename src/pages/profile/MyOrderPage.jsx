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

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const wsUrl = `ws://localhost:8081?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("User WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.event !== "order_status_updated") {
          return;
        }

        const updatedOrder = message.data;

        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            String(order.id) === String(updatedOrder.id)
              ? {
                  ...order,
                  status: updatedOrder.status,
                }
              : order,
          ),
        );
      } catch (error) {
        console.error("User WebSocket message error:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("User WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("User WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
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
          <h1 className="text-2xl font-semibold sm:text-3xl">Pesanan Saya</h1>

          {orders.length === 0 ? (
            <div className="rounded-xl border border-gray-200 p-6 text-center sm:p-10">
              <h2 className="text-2xl font-semibold">Belum ada pesanan</h2>

              <p className="mt-2 text-gray-500">
                Yuk mulai belanja di BRilianShop.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-6 cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
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
