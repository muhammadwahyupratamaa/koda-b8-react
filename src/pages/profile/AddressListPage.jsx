import { FiEdit2, FiPlus, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import { useEffect, useState } from "react";
import addressService from "../../services/addressService";
import profileService from "../../services/profileService";

const initialForm = {
  label: "Rumah",
  name: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
};

function AddressListPage() {
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [addressResult, profileResult] = await Promise.all([
        addressService.getAddresses(),
        profileService.getProfile(),
      ]);

      setAddresses(addressResult.data || []);
      setProfile(profileResult.data || null);
    } catch (error) {
      console.error("LOAD ADDRESS ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function openCreateForm() {
    setEditingId(null);

    setForm({
      ...initialForm,
      name: profile?.name || "",
      phone: profile?.phone || "",
    });

    setShowForm(true);
  }

  function openEditForm(address) {
    setEditingId(address.id);

    setForm({
      label: address.label || "Rumah",
      name: address.name || "",
      phone: address.phone || "",
      address: address.address || "",
      city: address.city || "",
      province: address.province || "",
      postalCode: address.postal_code || address.postalCode || "",
    });

    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.label.trim() ||
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.province.trim() ||
      !form.postalCode.trim()
    ) {
      alert("Semua field wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        label: form.label,
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode,
      };

      if (editingId) {
        await addressService.updateAddress(editingId, payload);
        alert("Alamat berhasil diperbarui.");
      } else {
        await addressService.createAddress(payload);
        alert("Alamat berhasil ditambahkan.");
      }

      closeForm();
      await loadData();
    } catch (error) {
      console.error("SAVE ADDRESS ERROR:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleSetPrimary(id) {
    try {
      await addressService.setPrimaryAddress(id);

      await loadData();
    } catch (error) {
      console.error("SET PRIMARY ADDRESS ERROR:", error);
      alert(error.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus alamat ini?",
    );

    if (!confirmed) return;

    try {
      await addressService.deleteAddress(id);

      await loadData();
    } catch (error) {
      console.error("DELETE ADDRESS ERROR:", error);
      alert(error.message);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex flex-col gap-8 lg:flex-row">
        <ProfileSidebar />

        <section className="flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Alamat Saya
            </h1>

            <button
              type="button"
              onClick={openCreateForm}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-700 sm:w-auto cursor-pointer"
            >
              <FiPlus className="w-5 h-5" />
              Tambah Alamat
            </button>
          </div>

          {showForm && (
            <section className="mb-6 rounded-xl border border-gray-200 p-5 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {editingId
                    ? "Edit Alamat"
                    : "Tambah Alamat"}
                </h2>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              >
                <div>
                  <label className="text-sm text-gray-500">
                    Label Alamat *
                  </label>

                  <select
                    name="label"
                    value={form.label}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Rumah">Rumah</option>
                    <option value="Kantor">Kantor</option>
                    <option value="Apartemen">Apartemen</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Nama Penerima *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nama penerima"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Nomor Telepon *
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="text"
                    placeholder="08xxxxxxxxxx"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Kota *
                  </label>

                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    type="text"
                    placeholder="Kota"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Provinsi *
                  </label>

                  <input
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    type="text"
                    placeholder="Provinsi"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Kode Pos *
                  </label>

                  <input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    type="text"
                    placeholder="Kode pos"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-500">
                    Alamat Lengkap *
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Nama jalan, nomor rumah, RT/RW, dll."
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="rounded-xl border border-gray-200 px-6 py-3 text-sm hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer"
                  >
                    {saving
                      ? "Menyimpan..."
                      : editingId
                        ? "Simpan Perubahan"
                        : "Simpan Alamat"}
                  </button>
                </div>
              </form>
            </section>
          )}

          {loading ? (
            <div className="rounded-xl border border-gray-200 p-10 text-center">
              <p className="text-gray-500">
                Memuat alamat...
              </p>
            </div>
          ) : addresses.length === 0 ? (
            <div className="rounded-xl border border-gray-200 p-10 text-center">
              <h2 className="text-xl font-semibold">
                Belum ada alamat
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Tambahkan alamat pengiriman untuk mempermudah
                proses checkout.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm text-white hover:bg-blue-700 cursor-pointer"
              >
                Tambah Alamat
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {addresses.map((address) => {
                const isPrimary =
                  address.is_primary ?? address.isPrimary;

                return (
                  <div
                    key={address.id}
                    className={`rounded-xl border p-5 ${
                      isPrimary
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold">
                            {address.label || "Alamat"}
                          </h2>

                          {isPrimary && (
                            <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                              <FiCheck className="w-3 h-3" />
                              Alamat Utama
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-sm font-medium text-gray-700">
                          {address.name} • {address.phone}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {address.address},{" "}
                          {address.city},{" "}
                          {address.province}{" "}
                          {address.postal_code ||
                            address.postalCode}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(address)
                          }
                          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          <FiEdit2 className="w-4 h-4" />
                          Edit
                        </button>

                        {!isPrimary && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSetPrimary(address.id)
                            }
                            className="rounded-lg border border-blue-200 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer"
                          >
                            Jadikan Utama
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(address.id)
                          }
                          className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default AddressListPage;