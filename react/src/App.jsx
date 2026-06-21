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

// Profile Pages
import MyOrderPage from "./pages/profile/MyOrderPage";
import WishlistPage from "./pages/profile/WishlistPage";
import AddressListPage from "./pages/profile/AddressListPage";
import EditProfilePage from "./pages/profile/EditProfilePage";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import ProtectedRoute from "./pages/auth/ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        children: [
          {
            path: "shipping",
            element: (
              <ProtectedRoute>
                <ShippingPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "confirmation",
            element: (
              <ProtectedRoute>
                <ConfirmationPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "success",
            element: (
              <ProtectedRoute>
                <SuccessPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "profile",
        children: [
          {
            path: "orders",
            element: (
              <ProtectedRoute>
                <MyOrderPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "wishlist",
            element: (
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "address",
            element: (
              <ProtectedRoute>
                <AddressListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit",
            element: (
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
