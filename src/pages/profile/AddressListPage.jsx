import { FiPlus } from "react-icons/fi";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import AddressCard from "../../components/profile/AddressCard";
import { useState } from "react";
import addressService from "../../services/addressService";

function AddressListPage() {
  const [addresses, setAddresses] = useState(addressService.getAddresses());
  function refreshAddresses() {
    setAddresses(addressService.getAddresses());
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
        <ProfileSidebar active="address" />

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold">Alamat Saya</h1>

            <button
              type="button"
              onClick={() => {
                addressService.addAddress({
                  title: "Alamat Baru",
                  name: "Budi Santoso",
                  phone: "081234567890",
                  address: "Masukkan alamat",
                  city: "Kota",
                });

                refreshAddresses();
              }}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-700 sm:w-auto cursor-pointer"
            >
              <FiPlus className="w-5 h-5" />
              Tambah Alamat
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                {...address}
                onDelete={() => {
                  addressService.deleteAddress(address.id);
                  refreshAddresses();
                }}
                onPrimary={() => {
                  addressService.setPrimaryAddress(address.id);
                  refreshAddresses();
                }}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default AddressListPage;
