import { useState } from "react";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import WishlistCard from "../../components/profile/WishListCard";
import wishlistService from "../../services/wishlistService";

function WishListPage() {
  const [wishlist, setWishlist] = useState(wishlistService.getWishlist());
  return (
    <main className="max-w-7xl mx-auto py-8">
      <section className="grid grid-cols-[300px_1fr] gap-8">
        <ProfileSidebar active="wishlist" />

        <section>
          <h1 className="text-3xl font-semibold mb-6">
            Wishlist ({wishlist.length})
          </h1>

          {wishlist.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-10 w-full text-center">
              <h2 className="text-2xl font-semibold">Wishlist masih kosong</h2>

              <p className="text-gray-500 mt-2">
                Simpan produk favoritmu di sini.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {wishlist.map((product) => (
                <WishlistCard
                  key={product.id}
                  product={product}
                  onRemove={() => setWishlist(wishlistService.getWishlist())}
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
