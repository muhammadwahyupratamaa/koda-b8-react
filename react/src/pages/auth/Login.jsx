import AuthLayout from "../../components/auth/AuthLayout";
import { Link } from "react-router-dom";
import { Mail, Lock, SquareArrowRight,Eye } from "lucide-react";

function Login() {
  return (
    <AuthLayout bannerType="login">
      <form className="flex flex-col gap-7 mb-10">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Masuk ke Akun</h1>
          <p className="text-xl">
            Belum Punya Akun ? 
            <Link to="/register" className="text-blue-600">
               <span> Daftar Gratis</span>
            </Link>
          </p>
        </section>

        <section className=" flex gap-5">
          <div className="w-full rounded-xl flex justify-center items-center text-gray-500 text-xl border-2">
            <Link to={"https://www.google.com/?hl=id"}> Google</Link>
          </div>

          <div className="w-full py-3 rounded-xl flex justify-center items-center text-gray-500 text-xl border-2">
            <Link to={"https://www.google.com/?hl=id"}> Facebook</Link>
          </div>
        </section>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="text-sm text-gray-500 whitespace-nowrap">
            atau masuk dengan email
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <section className="flex flex-col gap-5">
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

              <div>
                <Link to="/ForgotPassword" className="text-blue-600 text-base">
                  Lupa Kata Sandi?
                </Link>
              </div>
            </div>

            <div className="flex w-full justify-between items-center bg-gray-100 gap-5 border-1 rounded-xl p-5">
              <div className="flex gap-5">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Masukkan Kata sandi"
                />
              </div>

              <Eye className="w-5 h-5 text-gray-400"  />
            </div>
          </div>
        </section>

        <div className="flex gap-2 text-gray-700">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Ingat saya selama 30 hari</label>
        </div>

        <div className="bg-blue-600 rounded-xl flex justify-center items-center ">
          <button
            type="submit"
            className="text-white text-2xl flex items-center gap-5 cursor-pointer justify-center py-5"
          >
            <SquareArrowRight />
            <p className="flex -items-center">Masuk</p>
          </button>
        </div>
      </form>

      <footer className="flex flex-col justify-center items-center gap-5">
        <div>
          <p>🔒 Login aman dengan enkripsi SSL 256-bit</p>
        </div>

        <div>
          <p className="text-center">
            Dengan masuk, kamu menyetujui{" "}
            <span className="text-blue-500">Syarat & Ketentuan</span> dan{" "}
            <span className="text-blue-500">Kebijakan Privasi</span> kami.
          </p>
        </div>
      </footer>
    </AuthLayout>
  );
}

export default Login;
