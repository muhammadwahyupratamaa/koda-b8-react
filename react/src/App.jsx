import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import AppLayout from "./components/layout/AppLayout";

import LandingPage from "./pages/main/LandingPage";
import BrowserProducts from "./pages/main/BrowseProducts";
import DetailPage from "./pages/main/DetailPage";
import Cart from "./pages/main/Cart"

const router = createBrowserRouter([
  // Auth
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

  // Main Browser
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
        element: <BrowserProducts />,
      },
      {
        path: "detail",
        element: <DetailPage />,
      }, 
      {
        path : "cart",
        element : <Cart />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;