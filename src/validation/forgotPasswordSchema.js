import * as yup from "yup";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),

  newPassword: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password baru wajib diisi"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});

export default forgotPasswordSchema;