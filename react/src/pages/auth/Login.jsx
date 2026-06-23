import AuthLayout from "../../components/auth/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, SquareArrowRight, Eye } from "lucide-react";
import authService from "../../services/authService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../validation/loginSchema";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const {login} = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
  try {
    const user = authService.login(data);

    login(user);

    window.alert("Login berhasil!");

    navigate("/");
  } catch (error) {
    window.alert(error.message);
  }
};
  return (
    <AuthLayout bannerType="login">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Masuk ke Akun</h1>
          <p className="text-lg">
            Belum Punya Akun ?
            <Link to="/register" className="text-blue-600">
              <span> Daftar Gratis</span>
            </Link>
          </p>
        </section>

        <section className=" flex gap-5">
          <div className="w-full rounded-xl hover:bg-gray-100 flex justify-center items-center text-gray-500 text-lg border-2">
            <Link to={"https://www.google.com/?hl=id"}> Google</Link>
          </div>

          <div className="w-full hover:bg-gray-100 py-2 rounded-xl flex justify-center items-center text-gray-500 text-lg border-2">
            <Link to={"https://www.google.com/?hl=id"}> Facebook</Link>
          </div>
        </section>

        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="text-sm text-gray-500 whitespace-nowrap">
            atau masuk dengan email
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p>Email</p>
            <div
              className={`flex w-full items-center bg-gray-100 gap-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-xl px-5 py-4`}
            >
              <Mail
                className={`w-5 h-5 text-gray-400 ${errors.email ? "text-red-500" : "text-gray-300"}`}
              />
              <input
                type="email"
                {...register("email")}
                id="email"
                placeholder="email@contoh.com"
                className="bg-transparent outline-none flex-1"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-2 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <p >Kata Sandi</p>
              </div>

              <div>
                <Link to="/forgot-password" className="text-blue-600 text-base">
                  Lupa Kata Sandi?
                </Link>
              </div>
            </div>

            <div
              className={`flex w-full justify-between items-center bg-gray-100 gap-4 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-xl px-5 py-4`}
            >
              <div className="flex gap-5">
                <Lock
                  className={`w-5 h-5  text-gray-400 ${errors.password ? "text-red-500" : "text-gray-300"}`}
                />
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="Masukkan Kata sandi"
                  className="bg-transparent outline-none flex-1"
                />
              </div>

              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-2 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </section>

        <div className="flex gap-2 text-gray-700">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember" className="text-sm">Ingat saya selama 30 hari</label>
        </div>

        <div className="bg-emerald-600 rounded-xl flex justify-center items-center ">
          <button
            type="submit"
            className="text-white hover:bg-emerald-700 hover:rounded-xl text-lg flex cursor-pointer w-full items-center gap-3 justify-center py-3"
          >
            <SquareArrowRight />
            <p className="flex text-base items-center">Masuk</p>
          </button>
        </div>
      </form>

      <footer className="flex flex-col mt-2 justify-center items-center gap-3">
        <div className="text-sm">
          <p>🔒 Login aman dengan enkripsi SSL 256-bit</p>
        </div>

        <div>
          <p className="text-center text-sm">
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
