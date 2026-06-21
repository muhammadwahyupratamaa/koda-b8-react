import * as yup from "yup";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
});

export default forgotPasswordSchema