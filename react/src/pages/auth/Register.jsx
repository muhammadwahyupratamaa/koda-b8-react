import AuthLayout from "../../components/auth/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, Lock, User, Eye, ArrowRight } from "lucide-react";
import registerSchema from "../../validation/registerSchema";
import authService from "../../services/authService";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      const { confirmPassword, ...userData } = data;

      authService.register(userData);

      window.alert("Registrasi berhasil!");
      navigate("/login");
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <AuthLayout bannerType="register">
      <form onSubmit={handleSubmit(onSubmit)} className="flex text-sm flex-col gap-3 ">
        <section className="flex flex-col gap-3  ">
          <h1 className="text-3xl font-bold">Buat Akun Baru</h1>
          <p className="text-base">
            Sudah Punya Akun?
            <Link to="/login" className="text-blue-600">
              <span> Masuk di sini</span>
            </Link>
          </p>
        </section>

        <section className=" flex gap-5">
          <div className="w-full rounded-xl flex justify-center items-center text-gray-500 text-base border-2">
            <Link to={"https://www.google.com/?hl=id"}> Daftar via Google</Link>
          </div>

          <div className="w-full py-2 rounded-xl flex justify-center items-center text-gray-500 text-base border-2">
            <Link to={"https://www.google.com/?hl=id"}>
              Daftar via Facebook
            </Link>
          </div>
        </section>

        <div className="flex items-center gap-4 ">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="text-sm text-gray-500 whitespace-nowrap">
            atau masuk dengan email
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p>Nama Lengkap</p>
            <div
              className={`flex w-full items-center bg-gray-100 gap-5 border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-xl p-3`}
            >
              <User
                className={`w-5 h-5  text-gray-400 ${errors.fullName ? "text-red-500" : "text-gray-300"}`}
              />
              <input
                type="text"
                {...register("fullName")}
                id="fullName"
                placeholder="Nama lengkap kamu"
                className="bg-transparent outline-none flex-1"
              />
            </div>
            {errors.fullName && (
              <p className="text-sm text-red-500 ">
                {errors.fullName?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p>Email</p>
            <div
              className={`flex w-full items-center bg-gray-100 gap-5 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-xl p-3`}
            >
              <Mail
                className={`w-5 h-5   ${errors.email ? "text-red-500" : "text-gray-300"}`}
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
              <p className="text-sm text-red-500 ">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <p>Kata Sandi</p>
              </div>
            </div>

            <div
              className={`flex w-full items-center bg-gray-100 justify-between gap-5 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-xl p-3`}
            >
              <div className="flex gap-5">
                <Lock
                  className={`w-5 h-5 ${errors.password ? "text-red-500" : "text-gray-300"}`}
                />
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="Minimal 6 karakter"
                  className="bg-transparent outline-none flex-1"
                />
              </div>

              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 ">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <p>Konfirmasi Kata Sandi</p>
              </div>
            </div>

            <div
              className={`flex w-full items-center justify-between bg-gray-100 gap-5 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-xl p-3`}
            >
              <div className="flex gap-5">
                <Lock
                  className={`w-5 h-5 ${errors.confirmPassword ? "text-red-500" : "text-gray-300"}`}
                />
                <input
                  type="password"
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  placeholder="Ulangi Kata Sandi"
                  className="bg-transparent outline-none flex-1"
                />
              </div>

              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 ">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
        </section>

        <div className="flex gap-4 text-xs text-gray-700">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">
            <p>
              Saya Menyetujui
              <span className="text-blue-600"> Syarat & Ketentuan</span> dan
              <span className="text-blue-600"> Kebijakan privasi </span>
              Belimudah
            </p>
          </label>
        </div>

        <div className="bg-emerald-600 hover:bg-emerald-700 rounded-xl flex justify-center items-center ">
          <button
            type="submit"
            className="text-white text-base flex items-center gap-5 cursor-pointer justify-center py-3"
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
