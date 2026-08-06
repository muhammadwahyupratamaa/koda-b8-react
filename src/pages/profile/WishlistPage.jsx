import { useEffect, useState } from "react";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import WishlistCard from "../../components/profile/WishListCard";
import wishlistService from "../../services/wishlistService";

function WishListPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      const result = await wishlistService.getWishlist();

      setWishlist(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
        <ProfileSidebar active="wishlist" />

        <section>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
            Wishlist ({wishlist.length})
          </h1>

          {wishlist.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-6 sm:p-10 w-full text-center">
              <h2 className="text-2xl font-semibold">Wishlist masih kosong</h2>

              <p className="text-gray-500 mt-2">
                Simpan produk favoritmu di sini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <WishlistCard
                  key={product.id}
                  product={product}
                  onRemove={loadWishlist}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default WishListPage;
