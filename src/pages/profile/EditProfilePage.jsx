import { FiEdit2 } from "react-icons/fi";
import ProfileSidebar from "../../components/profile/ProfileSidebar";

function EditProfilePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
        <ProfileSidebar active="profile" />

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold">Pengaturan Profil</h1>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-600 px-5 py-3 text-sm text-blue-600 transition hover:bg-blue-50 sm:w-auto cursor-pointer"
            >
              <FiEdit2 className="w-5 h-5" />
              Simpan
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 sm:p-6">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-blue-100 flex justify-center items-center">
                <span className="text-3xl sm:text-4xl font-semibold text-blue-600">B</span>
              </div>

              <button
                type="button"
                className="text-blue-600 hover:underline text-sm cursor-pointer"
              >
                Ganti Foto Profil
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="text-sm text-gray-500">Nama Lengkap</label>

                <input
                  type="text"
                  defaultValue="Budi Santoso"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm text-gray-500">
                  Email
                </label>

                <input
                  name="email"
                  id="email"
                  type="email"
                  defaultValue="budi@email.com"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Nomor Telepon</label>

                <input
                  type="text"
                  defaultValue="0812-3456-7890"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Tanggal Lahir</label>

                <input
                  type="date"
                  defaultValue="1990-03-15"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Jenis Kelamin</label>

                <select className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500">
                  <option>Laki-laki</option>

                  <option>Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 sm:p-6 mt-6">
            <h2 className="text-xl font-semibold mb-5">Keamanan Akun</h2>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                className="text-blue-600 hover:underline text-left text-sm cursor-pointer"
              >
                Ubah Kata Sandi
              </button>

              <button
                type="button"
                className="text-blue-600 hover:underline text-left text-sm cursor-pointer"
              >
                Aktifkan Verifikasi 2 Langkah
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default EditProfilePage;
