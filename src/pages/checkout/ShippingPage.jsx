import { FiTruck, FiLock, FiChevronRight } from "react-icons/fi";
import { getProductImage } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import addressService from "../../services/addressService";
import profileService from "../../services/profileService";
import storageService from "../../services/storageService";
import { useEffect, useState } from "react";
import cartService from "../../services/cartService";

function ShippingPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    shippingMethod: "JNE Reguler",
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  function handleChange(e) {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    async function loadShippingData() {
      try {
        const [profileResult, addressResult] = await Promise.all([
          profileService.getProfile(),
          addressService.getAddresses(),
        ]);

        const profile = profileResult.data;
        const addressList = addressResult.data || [];

        setAddresses(addressList);

        const primaryAddress =
          addressList.find((address) => address.is_primary) ||
          addressList.find((address) => address.isPrimary);

        if (primaryAddress) {
          setSelectedAddressId(primaryAddress.id);

          setShipping((prev) => ({
            ...prev,
            name: primaryAddress.name || profile?.name || "",
            phone: primaryAddress.phone || profile?.phone || "",
            email: profile?.email || "",
            address: primaryAddress.address || "",
            city: primaryAddress.city || "",
            province: primaryAddress.province || "",
            postalCode:
              primaryAddress.postal_code || primaryAddress.postalCode || "",
          }));
        } else {
          setShipping((prev) => ({
            ...prev,
            name: profile?.name || "",
            email: profile?.email || "",
            phone: profile?.phone || "",
          }));
        }
      } catch (error) {
        console.error("Failed to load shipping data:", error);
      }
    }

    loadShippingData();
  }, []);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    const result = await cartService.getCart();
    setCart(result.data);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex justify-center items-center mb-10">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
              1
            </div>

            <p className="text-sm text-blue-600 mt-2">Pengiriman</p>
          </div>

          <div className="mx-2 h-1 w-12 bg-gray-300 sm:mx-5 sm:w-32"></div>

          <div className="flex flex-col items-center">
            <div className="sm:w-10 sm:h-10 h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">
              2
            </div>

            <p className="text-sm text-gray-400 mt-2">Pembayaran</p>
          </div>

          <div className="w-32 h-1 bg-gray-300 mx-5"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">
              3
            </div>

            <p className="text-sm text-gray-400 mt-2">Konfirmasi</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Left */}

        <section className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-8">
            <FiTruck className="w-5 h-5 text-blue-600" />

            <h2 className="text-2xl font-medium">Alamat Pengiriman</h2>
          </div>

          {addresses.length > 0 && (
            <div className="mb-6 flex flex-col gap-3">
              {addresses.map((address) => {
                const isSelected = selectedAddressId === address.id;

                return (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => {
                      setSelectedAddressId(address.id);

                      setShipping((prev) => ({
                        ...prev,
                        name: address.name || "",
                        phone: address.phone || "",
                        address: address.address || "",
                        city: address.city || "",
                        province: address.province || "",
                        postalCode:
                          address.postal_code || address.postalCode || "",
                      }));
                    }}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-2 border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">
                          {address.label || "Alamat"}
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {address.name} • {address.phone}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                          {address.address}, {address.city}, {address.province}{" "}
                          {address.postal_code || address.postalCode}
                        </p>
                      </div>

                      {isSelected && (
                        <span className="text-sm font-medium text-blue-600">
                          Dipilih
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Nama Penerima *
              </label>

              <input
                type="text"
                name="name"
                value={shipping.name}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Nomor Telepon *
              </label>

              <input
                type="text"
                name="phone"
                value={shipping.phone}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Email *
              </label>

              <input
                type="email"
                name="email"
                value={shipping.email}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Alamat Lengkap *
              </label>

              <input
                type="text"
                name="address"
                value={shipping.address}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Kota *
              </label>

              <input
                type="text"
                name="city"
                value={shipping.city}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Provinsi *
              </label>

              <input
                type="text"
                name="province"
                value={shipping.province}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Kode Pos *
              </label>

              <input
                type="text"
                name="postalCode"
                value={shipping.postalCode}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Catatan (opsional)
              </label>

              <input
                type="text"
                name="note"
                value={shipping.note || ""}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-medium mb-5">Metode Pengiriman</h2>

            <div className="flex flex-col gap-4">
              <label
                className={`rounded-xl p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between cursor-pointer ${
                  shipping.shippingMethod === "JNE Reguler"
                    ? "border-2 border-blue-600"
                    : "border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    checked={shipping.shippingMethod === "JNE Reguler"}
                    onChange={() =>
                      setShipping({
                        ...shipping,
                        shippingMethod: "JNE Reguler",
                      })
                    }
                  />

                  <div>
                    <p className="font-medium">JNE Reguler</p>

                    <p className="text-sm text-gray-400">3-5 hari kerja</p>
                  </div>
                </div>

                <p className="text-green-600 font-medium">GRATIS</p>
              </label>

              <label
                className={`rounded-xl p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between cursor-pointer ${
                  shipping.shippingMethod === "JNE Express"
                    ? "border-2 border-blue-600"
                    : "border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    checked={shipping.shippingMethod === "JNE Express"}
                    onChange={() =>
                      setShipping({
                        ...shipping,
                        shippingMethod: "JNE Express",
                      })
                    }
                  />

                  <div>
                    <p className="font-medium">JNE Express</p>

                    <p className="text-sm text-gray-400">1-2 hari kerja</p>
                  </div>
                </div>

                <p className="text-green-600 font-medium">GRATIS</p>
              </label>

              <label
                className={`rounded-xl p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between cursor-pointer ${
                  shipping.shippingMethod === "Same Day Delivery"
                    ? "border-2 border-blue-600"
                    : "border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    checked={shipping.shippingMethod === "Same Day Delivery"}
                    onChange={() =>
                      setShipping({
                        ...shipping,
                        shippingMethod: "Same Day Delivery",
                      })
                    }
                  />

                  <div>
                    <p className="font-medium">Same Day Delivery</p>

                    <p className="text-sm text-gray-400">
                      Hari ini (sebelum 16:00)
                    </p>
                  </div>
                </div>

                <p className="text-green-600 font-medium">GRATIS</p>
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              if (
                !shipping.name ||
                !shipping.phone ||
                !shipping.email ||
                !shipping.address ||
                !shipping.city ||
                !shipping.province ||
                !shipping.postalCode
              ) {
                alert("Lengkapi alamat pengiriman.");
                return;
              }

              storageService.set("shipping", shipping);
              navigate("/checkout/payment");
            }}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 flex justify-center items-center gap-2 font-medium cursor-pointer"
          >
            Lanjut ke Pembayaran
            <FiChevronRight className="w-5 h-5" />
          </button>
        </section>

        {/* RIGHT */}
        <section className="border border-gray-200 rounded-xl p-5 h-fit">
          <h2 className="text-2xl font-medium mb-6">Ringkasan Pesanan</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b border-gray-200 pb-5 mb-5"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    getProductImage(item.image_url)
                  }
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">
                Rp {subtotal.toLocaleString("id-ID")}
              </p>

              <p>Rp {subtotal.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Ongkir</p>

              <p className="text-green-600 font-medium">Gratis</p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-5"></div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">
              Rp {subtotal.toLocaleString("id-ID")}
            </p>

            <p className="text-2xl font-semibold text-blue-600">
              Rp {subtotal.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            <p className="text-xs text-gray-400">
              🔒 Pembayaran aman dan terenkripsi
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default ShippingPage;
