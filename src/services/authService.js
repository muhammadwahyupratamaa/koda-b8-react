import { api } from "./api";

async function register(data) {
  return await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function login(data) {
  return await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function forgotPassword(data) {
  return await api("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export default {
  register,
  login,
  forgotPassword,
};
