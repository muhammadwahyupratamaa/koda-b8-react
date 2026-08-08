import AuthLayout from "../../components/auth/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Navigation } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import forgotPasswordSchema from "../../validation/forgotPasswordSchema";
import authService from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await authService.forgotPassword({
        email: data.email,
        newPassword: data.newPassword,
      });

      alert("Password berhasil diubah. Silakan login kembali.");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <p>Alamat Email</p>

            <div
              className={`flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 shadow-sm transition-all duration-300 ${
                errors.email
                  ? "border-red-500"
                  : "border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100"
              }`}
            >
              <Mail className="w-5 h-5 text-gray-400" />

              <input
                type="email"
                placeholder="email@contoh.com"
                className="w-full outline-none bg-transparent"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <p>Password Baru</p>

            <div
              className={`flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 shadow-sm transition-all duration-300 ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100"
              }`}
            >
              <input
                type="password"
                placeholder="Masukkan password baru"
                className="w-full outline-none bg-transparent"
                {...register("newPassword")}
              />
            </div>

            {errors.newPassword && (
              <p className="text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <p>Konfirmasi Password</p>

            <div
              className={`flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 shadow-sm transition-all duration-300 ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100"
              }`}
            >
              <input
                type="password"
                placeholder="Ulangi password baru"
                className="w-full outline-none bg-transparent"
                {...register("confirmPassword")}
              />
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 rounded-xl flex justify-center items-center">
            <button
              type="submit"
              className="w-full py-4 font-semibold text-white flex items-center justify-center gap-3"
            >
              <Navigation className="w-5 h-5" />
              <p>Ubah Kata Sandi</p>
            </button>
          </div>
        </div>
      </form>

      <footer className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col justify-center bg-gray-200 w-full rounded-xl p-5">
          <div className="text-xl font-semibold">
            <h3>💡 Tips keamanan:</h3>
          </div>

          <div className="text-gray-500 text-sm">
            <p>• Gunakan kata sandi minimal 6 karakter</p>
            <p>• Jangan gunakan kata sandi yang sama dengan akun lain</p>
          </div>
        </div>

        <div>
          <p className="text-center text-gray-500 text-lg">
            Ingat kata Sandi Kamu?
            <Link to="/login">
              <span className="text-blue-500"> Masuk disini</span>
            </Link>
          </p>
        </div>
      </footer>
    </AuthLayout>
  );
}

export default ForgotPassword;
