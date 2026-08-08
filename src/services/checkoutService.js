import { api } from "./api";

async function checkout(shippingAddress, paymentMethod) {
  return await api("/checkout", {
    method: "POST",
    body: JSON.stringify({
      shippingAddress,
      paymentMethod,
    }),
  });
}

async function getOrders() {
  return await api("/checkout/orders");
}

export default {
  checkout,
  getOrders,
};
