import storageService from "./storageService";

function getOrders() {
  return storageService.get("orders", []);
}

function saveOrders(orders) {
  storageService.set("orders", orders);
}

function checkout(cart) {
  if (!cart || cart.length === 0) return null;

  const shipping = storageService.get("shipping");
  const payment = storageService.get("payment");

  const orders = getOrders();

  const order = {
    id: Date.now(),
    orderNumber: `BM${Date.now()}`,
    items: cart,
    shipping,
    payment,
    total: cart.reduce((total, item) => total + item.price * item.qty, 0),
    createdAt: new Date().toISOString(),
    status: "Diproses",
  };

  orders.unshift(order);

  saveOrders(orders);

  storageService.remove("shipping");
  storageService.remove("payment");

  return order;
}

export default {
  getOrders,
  saveOrders,
  checkout,
};
