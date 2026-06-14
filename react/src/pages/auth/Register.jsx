import AuthLayout from "../../components/auth/AuthLayout";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  SquareArrowRight,
  User,
  Eye,
  ArrowRight,
} from "lucide-react";

function Register() {
  return (
    <AuthLayout bannerType="register">
      <form className="flex flex-col gap-3 mb-5">
        <section className="flex flex-col gap-3 mb-7 ">
          <h1 className="text-3xl font-bold">Buat Akun Baru</h1>
          <p className="text-xl">
            Sudah Punya Akun?
            <Link to="/" className="text-blue-600">
             <span> Masuk di sini</span> 
            </Link>
          </p>
        </section>

        <section className=" flex gap-5">
          <div className="w-full rounded-xl flex justify-center items-center text-gray-500 text-xl border-2">
            <Link to={"https://www.google.com/?hl=id"}> Daftar via Google</Link>
          </div>

          <div className="w-full py-3 rounded-xl flex justify-center items-center text-gray-500 text-xl border-2">
            <Link to={"https://www.google.com/?hl=id"}>
              {" "}
              Daftar via Facebook
            </Link>
          </div>
        </section>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="text-sm text-gray-500 whitespace-nowrap">
            atau masuk dengan email
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <section className="flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <p>Nama Lengkap</p>
            <div className="flex w-full items-center bg-gray-100 gap-5 border-1 rounded-xl p-5 ">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Nama lengkap kamu"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p>Email</p>
            <div className="flex w-full items-center bg-gray-100 gap-5 border-1 rounded-xl p-5 ">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email@contoh.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <p className="text-lg">Kata Sandi</p>
              </div>
            </div>

            <div className="flex w-full justify-between items-center bg-gray-100 gap-5 border-1 rounded-xl p-5">
              <div className="flex gap-5">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <Eye className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <p className="text-lg">Konfirmasi Kata Sandi</p>
              </div>
            </div>

            <div className="flex w-full justify-between items-center bg-gray-100 gap-5 border-1 rounded-xl p-5">
              <div className="flex gap-5">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="konfirmPassword"
                  id="konfirmPassword"
                  placeholder="Ulangi Kata Sandi"
                />
              </div>

              <Eye className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </section>

        <div className="flex gap-4 text-gray-700">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">
            <p>Saya Menyetujui 
            <span className="text-blue-600"> Syarat & Ketentuan</span> dan
            <span className="text-blue-600"> Kebijakan privasi </span>Belimudah
            </p>
          </label>
        </div>

        <div className="bg-orange-600 rounded-xl flex justify-center items-center ">
          <button
            type="submit"
            className="text-white text-2xl flex items-center gap-5 cursor-pointer justify-center py-5"
          >
            <p className="flex -items-center">Daftar Sekarang</p>
            <ArrowRight />
          </button>
        </div>
      </form>

      <footer className="flex flex-col justify-center items-center gap-5">
        <div>
          <p>🔒 Data kamu aman dan terenskripsi</p>
        </div>
      </footer>
    </AuthLayout>
  );
}

export default Register;
