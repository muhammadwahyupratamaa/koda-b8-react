import {
  FiBox,
  FiHeart,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import profileService from "../../services/profileService";
import wishlistService from "../../services/wishlistService";
import checkoutService from "../../services/checkoutService";
import { useEffect, useState } from "react";

function ProfileSidebar({ active }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const menus = [
    {
      key: "orders",
      title: "Pesanan Saya",
      icon: FiBox,
      path: "/profile/orders",
    },
    {
      key: "wishlist",
      title: "Wishlist",
      icon: FiHeart,
      path: "/profile/wishlist",
    },
    {
      key: "address",
      title: "Alamat Saya",
      icon: FiMapPin,
      path: "/profile/address",
    },
    {
      key: "profile",
      title: "Pengaturan Profil",
      icon: FiSettings,
      path: "/profile/edit",
    },
  ];

  useEffect(() => {
    async function loadSidebarData() {
      try {
        const [profileResult, ordersResult, wishlistResult] = await Promise.all(
          [
            profileService.getProfile(),
            checkoutService.getOrders(),
            wishlistService.getWishlist(),
          ],
        );

        setProfile(profileResult.data || {});
        setOrders(ordersResult.data || []);
        setWishlist(wishlistResult.data || []);
      } catch (error) {
        console.error("LOAD PROFILE SIDEBAR ERROR:", error);
      }
    }

    loadSidebarData();

    window.addEventListener("profileUpdated", loadSidebarData);

    return () => {
      window.removeEventListener("profileUpdated", loadSidebarData);
    };
  }, []);

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <section className="rounded-xl border border-gray-200 p-5 sm:p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-100 sm:h-24 sm:w-24">
            {profile.avatar_url ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${profile.avatar_url}`}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl font-semibold text-blue-600 sm:text-4xl">
                {profile.name?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>

          <h2 className="mt-5 text-xl font-semibold sm:text-2xl">
            {profile.name || "User"}
          </h2>

          <p className="mt-1 text-sm text-gray-400">{profile.email || "-"}</p>
        </div>

        <div className="mt-8 flex justify-center gap-8 border-t border-gray-200 pt-5 sm:gap-12">
          <div className="text-center">
            <p className="text-xl font-semibold sm:text-2xl">{orders.length}</p>

            <p className="text-xs text-gray-400 sm:text-sm">Pesanan</p>
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold sm:text-2xl">
              {wishlist.length}
            </p>

            <p className="text-xs text-gray-400 sm:text-sm">Wishlist</p>
          </div>
        </div>
      </section>

      <section className="mt-5 overflow-hidden rounded-xl border border-gray-200">
        <div className="py-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.key}
                to={menu.path}
                className={`flex items-center justify-between px-6 py-4 transition ${
                  active === menu.key
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />

                  <span className="text-sm font-medium">{menu.title}</span>
                </div>

                <FiChevronRight className="h-5 w-5" />
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex w-full cursor-pointer items-center gap-3 px-6 py-5 text-red-500 hover:bg-red-50"
          >
            <FiLogOut className="h-5 w-5" />

            <span className="text-sm font-medium">Keluar</span>
          </button>
        </div>
      </section>
    </aside>
  );
}

export default ProfileSidebar;
