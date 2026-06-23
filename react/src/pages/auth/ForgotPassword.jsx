import AuthLayout from "../../components/auth/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Navigation } from "lucide-react";
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

  const onSubmit = (data) => {
    try {
      authService.forgotPassword(data.email);

      alert("Tautan Reset Password sudah dikirim ke Email Anda!!");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <AuthLayout bannerType="forgotPassword" center={false}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <article>
          <Link to="/login" className="text-gray-500 text-base flex gap-3">
            <ArrowLeft className="w-5 h-5 text-gray-500" /> kembali ke login
          </Link>
        </article>
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Lupa Kata Sandi?</h1>
          <p className="text-sm text-gray-500">
            Tidak perlu khawatir. Masukkan email yang terdaftar dan kami akan
            mengirimkan tautan untuk membuat kata sandi baru.
          </p>
        </section>

        <section className="flex flex-col gap-5">
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
        </section>

        <div className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 rounded-xl flex justify-center items-center ">
          <button
            type="submit"
            className="w-full py-4 font-semibold text-white flex items-center justify-center gap-3"
          >
            <Navigation className="w-5 h-5" />
            <p className="flex -items-center">kirim Tautan Reset</p>
          </button>
        </div>
      </form>

      <footer className="mt-8 flex flex-col gap-5">
        <div className=" flex flex-col justify-center bg-gray-200 w-full rounded-xl p-5">
          <div className="text-xl font-semibold ">
            <h3>💡 Tips keamanan:</h3>
          </div>

          <div className="text-gray-500 text-sm ">
            <p>• Pastikan kamu memeriksa folder spam/junk email</p>
            <p>• Tautan reset hanya berlaku selama 30 menit</p>
            <p>• Jangan bagikan tautan reset kepada siapapun</p>
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
