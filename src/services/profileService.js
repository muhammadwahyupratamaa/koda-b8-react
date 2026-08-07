import { api } from "./api";

async function getProfile() {
  return await api("/profile");
}

async function updateProfile(data) {
  return await api("/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async function updatePassword(oldPassword, newPassword) {
  return await api("/profile/password", {
    method: "PATCH",
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });
}

export default {
  getProfile,
  updateProfile,
  updatePassword,
};
