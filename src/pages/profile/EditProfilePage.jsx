import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import profileService from "../../services/profileService";
import { BASE_URL } from "../../services/api";

function EditProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "Laki-laki",
    avatarUrl: "",
  });

  const [preview, setPreview] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2 MB");
      e.target.value = "";
      return;
    }

    setForm((prev) => ({
      ...prev,
      avatar: file,
    }));

    setPreview(URL.createObjectURL(file));
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const result = await profileService.getProfile();

      const avatarUrl = result.data.avatar_url
        ? result.data.avatar_url.startsWith("http")
          ? result.data.avatar_url
          : `${BASE_URL}${result.data.avatar_url}`
        : "";

      setForm({
        name: result.data.name || "",
        email: result.data.email || "",
        phone: result.data.phone || "",
        birthDate: result.data.birth_date || "",
        gender: result.data.gender || "Laki-laki",
        avatarUrl,
        avatar: null,
      });

      setPreview(avatarUrl);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSave() {
    if (!form.name.trim()) {
      return alert("Nama wajib diisi");
    }

    if (!form.email.trim()) {
      return alert("Email wajib diisi");
    }

    if (!form.phone.trim()) {
      return alert("Nomor telepon wajib diisi");
    }

    try {
      await profileService.updateProfile(form);

      window.dispatchEvent(new Event("profileUpdated"));

      alert("Profil berhasil disimpan");

      loadProfile();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          {/* SIDEBAR */}
          <ProfileSidebar active="profile" />

          {/* CONTENT */}
          <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-semibold sm:text-3xl">
                Pengaturan Profil
              </h1>

              <button
                type="button"
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-600 px-5 py-3 text-sm text-blue-600 transition hover:bg-blue-50 sm:w-auto cursor-pointer"
              >
                <FiEdit2 className="h-5 w-5" />
                Simpan
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-100 sm:h-24 sm:w-24">
                  {preview ? (
                    <img
                      src={preview}
                      alt={form.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-semibold text-blue-600 sm:text-4xl">
                      {form.name ? form.name[0].toUpperCase() : "B"}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer text-sm text-blue-600 hover:underline"
                  >
                    Ganti Foto Profil
                  </label>

                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                  <p className="mt-1 text-xs text-gray-400">
                    Pilih foto dari komputer kamu.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-sm text-gray-500">Nama Lengkap</label>

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm text-gray-500">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Nomor Telepon</label>

                  <input
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Tanggal Lahir</label>

                  <input
                    name="birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Jenis Kelamin</label>

                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-xl font-semibold">Keamanan Akun</h2>

              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  className="cursor-pointer text-left text-sm text-blue-600 hover:underline"
                >
                  Ubah Kata Sandi
                </button>

                <button
                  type="button"
                  className="cursor-pointer text-left text-sm text-blue-600 hover:underline"
                >
                  Aktifkan Verifikasi 2 Langkah
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default EditProfilePage;
