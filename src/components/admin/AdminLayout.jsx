import {
  FiBarChart2,
  FiBox,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiMenu,
  FiShoppingBag,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: FiBarChart2,
    },
    {
      title: "Produk",
      path: "/admin/products",
      icon: FiBox,
    },
    {
      title: "Pesanan",
      path: "/admin/orders",
      icon: FiShoppingBag,
    },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function isActive(path) {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO */}
        <div
          className={`flex h-20 items-center border-b border-slate-200 px-5 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <Link to="/admin" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                B
              </div>

              <div>
                <p className="font-bold text-slate-900">BRilianShop</p>

                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Admin Panel
                </p>
              </div>
            </Link>
          )}

          {collapsed && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
              B
            </div>
          )}

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <FiX />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1 p-4">
          <p
            className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 ${
              collapsed ? "hidden" : ""
            }`}
          >
            Menu Utama
          </p>

          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = isActive(menu.path);

            return (
              <Link
                key={menu.path}
                to={menu.path}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? menu.title : ""}
                className={`flex items-center rounded-xl px-3 py-3 transition ${
                  collapsed ? "justify-center" : "gap-3"
                } ${
                  active
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />

                {!collapsed && (
                  <span className="text-sm font-medium">{menu.title}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* USER / LOGOUT */}
        <div className="border-t border-slate-200 p-4">
          {!collapsed && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-600">
                A
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  Admin
                </p>

                <p className="truncate text-xs text-slate-400">Administrator</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? "Keluar" : ""}
            className={`flex w-full items-center rounded-xl px-3 py-3 text-red-500 transition hover:bg-red-50 ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <FiLogOut className="h-5 w-5" />

            {!collapsed && <span className="text-sm font-medium">Keluar</span>}
          </button>
        </div>

        {/* COLLAPSE */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-emerald-600 lg:flex"
        >
          {collapsed ? (
            <FiChevronRight className="h-4 w-4" />
          ) : (
            <FiChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>

      {/* MAIN */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <FiMenu className="h-5 w-5" />
            </button>

            <div>
              <p className="text-xs text-slate-400">Admin Panel</p>

              <p className="text-sm font-semibold text-slate-800">
                BRilianShop Management
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Lihat Toko →
          </Link>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
