import OrderCard from "../../components/profile/OrderCard";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import { headphoneWirelessPremium } from "../../assets";

function MyOrderPage() {
  const orders = [
    {
      orderId: "BM98765432",
      date: "20 Mei 2026",
      status: "Terkirim",
      total: "Rp 450.000",
      showReview: true,
      products: [
        {
          id: 1,
          image: headphoneWirelessPremium,
          name: "Headphone Wireless Premium",
          qty: 1,
          price: "Rp 450.000",
        },
      ],
    },
    {
      orderId: "BM87654321",
      date: "26 Mei 2026",
      status: "Dikirim",
      total: "Rp 800.000",
      showReview: false,
      products: [
        {
          id: 1,
          image: headphoneWirelessPremium,
          name: "Kaos Polos Premium Cotton",
          qty: 2,
          price: "Rp 125.000",
        },
        {
          id: 2,
          image:headphoneWirelessPremium,
          name: "Sneakers Sport Runfast",
          qty: 1,
          price: "Rp 550.000",
        },
      ],
    },
  ];
  return (
    <main className="max-w-7xl mx-auto py-8">
      <section className="grid grid-cols-[280px_1fr] gap-8">
        <ProfileSidebar active="orders" />

        <section className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">Pesanan Saya</h1>

          {orders.map((order) => (
            <OrderCard key={order.orderId} {...order} />
          ))}
        </section>
      </section>
    </main>
  );
}

export default MyOrderPage;
