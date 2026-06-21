import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Format email harus valid *")
    .required("Email wajib diisi"),

  password: yup
    .string()
    .required("Password wajib diisi"),
});

export default loginSchema;