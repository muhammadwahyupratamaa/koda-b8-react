import { api } from "./api";

async function checkout() {
  return await api("/checkout", {
    method: "POST",
  });
}

async function getOrders() {
  return await api("/checkout/orders");
}

export default {
  checkout,
  getOrders,
};
