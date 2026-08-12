import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import wishlistService from "../../services/wishlistService";
import cartService from "../../services/cartService";
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCart } from "../../features/cart/cartSlice";
import { setWishlist } from "../../features/wishlist/wishlistSlice";

import {
  FaShoppingBag,
  FaSearch,
  FaBell,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

import SearchBar from "../common/SearchBar";

function MainBar() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  useEffect(() => {
    async function loadCart() {
      if (!user) {
        dispatch(setCart([]));
        return;
      }

      try {
        const result = await cartService.getCart();

        dispatch(setCart(result.data || []));
      } catch (error) {
        console.error("LOAD CART ERROR:", error);
      }
    }

    loadCart();
  }, [user, dispatch]);

  useEffect(() => {
    async function loadWishlist() {
      if (!user) {
        dispatch(setWishlist([]));
        return;
      }

      try {
        const result = await wishlistService.getWishlist();

        dispatch(setWishlist(result.data || []));
      } catch (error) {
        console.error("LOAD WISHLIST ERROR:", error);
      }
    }

    loadWishlist();
  }, [user, dispatch]);

  return (
    <nav className="w-full border-b border-slate-200 shadow bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 shadow-md">
              <FaShoppingBag className="text-lg text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
                BRilianShop
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Smart Shopping
              </p>
            </div>
          </Link>

          <div className="mx-8 hidden flex-1 lg:block">
            <SearchBar placeholder="Cari produk, merek, kategori..." />
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button className="rounded-full p-3 transition hover:bg-slate-100 hover:text-emerald-600">
              <FaBell />
            </button>

            <Link
              to="/profile/wishlist"
              className="relative rounded-full p-3 transition hover:bg-slate-100 hover:text-emerald-600"
            >
              <FaHeart />

              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative rounded-full p-3 transition hover:bg-slate-100 hover:text-emerald-600"
            >
              <FaShoppingCart />

              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link
                to="/profile/edit"
                className="ml-3 flex items-center gap-3 rounded-full border border-slate-200 px-3 py-2 transition hover:border-emerald-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <FaUserCircle className="text-xl text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Selamat Datang</p>

                  <p className="max-w-[140px] truncate text-sm font-semibold">
                    {user.name}
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="ml-3 rounded-full bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/cart"
              className="relative rounded-full p-3 transition hover:bg-slate-100"
            >
              <FaShoppingCart />

              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="rounded-full p-3 transition hover:bg-slate-100">
              <FaBars />
            </button>
          </div>
        </div>

        <div className="pb-5 lg:hidden">
          <SearchBar placeholder="Cari produk..." />
        </div>
      </div>
    </nav>
  );
}

export default MainBar;
