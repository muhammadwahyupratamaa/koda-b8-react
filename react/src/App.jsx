import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Layout
import AppLayout from "./components/layout/AppLayout";

// Main Pages
import LandingPage from "./pages/main/LandingPage";
import BrowseProducts from "./pages/main/BrowseProducts";
import DetailPage from "./pages/main/DetailPage";
import Cart from "./pages/main/Cart";

// Checkout Pages
import ShippingPage from "./pages/checkout/ShippingPage";
import PaymentPage from "./pages/checkout/PaymentPage";
import ConfirmationPage from "./pages/checkout/ConfirmationPage";
import SuccessPage from "./pages/checkout/SuccessPage";

const router = createBrowserRouter([
  // ================= AUTH =================
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  // ================= MAIN =================
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "products",
        element: <BrowseProducts />,
      },
      {
        path: "detail",
        element: <DetailPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        children: [
          {
            path: "shipping",
            element: <ShippingPage />,
          },
          {
            path: "payment",
            element: <PaymentPage />,
          },
          {
            path: "confirmation",
            element: <ConfirmationPage />,
          },
          {
            path: "success",
            element: <SuccessPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;