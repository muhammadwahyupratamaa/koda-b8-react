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

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import OrderList from "./pages/admin/OrderList";
import CustomerList from "./pages/admin/CustomerList";

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
        path: "detail/:id",
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

      // ================= CHECKOUT =================
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

      // ================= PROFILE =================
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

  // ================= ADMIN =================
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
      {
        path: "customers",
        element: <CustomerList />,
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
