import {
  FiBox,
  FiHeart,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function ProfileSidebar({ active }) {
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

  return (
    <aside className="flex flex-col gap-6">
      <section className="border border-gray-200 rounded-xl p-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex justify-center items-center">
            <span className="text-3xl font-semibold text-blue-600">B</span>
          </div>

          <h2 className="text-2xl font-semibold mt-5">Budi Santoso</h2>

          <p className="text-sm text-gray-400 mt-1">budi@email.com</p>
        </div>

        <div className="flex justify-center gap-12 mt-8 pt-5 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-semibold">2</p>

            <p className="text-sm text-gray-400">Pesanan</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-semibold">0</p>

            <p className="text-sm text-gray-400">Wishlist</p>
          </div>
        </div>
      </section>

      <section className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="py-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.key}
                to={menu.path}
                className={`flex justify-between items-center px-6 py-4 transition ${
                  active === menu.key
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />

                  <span className="text-sm font-medium">{menu.title}</span>
                </div>

                <FiChevronRight className="w-5 h-5" />
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-200">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-6 py-5 text-red-500 hover:bg-red-50 transition cursor-pointer"
          >
            <FiLogOut className="w-5 h-5" />

            <Link to="/login" className="text-sm font-medium">
              Keluar
            </Link>
          </button>
        </div>
      </section>
    </aside>
  );
}

export default ProfileSidebar;
