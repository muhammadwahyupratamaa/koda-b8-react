import { api } from "./api";

async function getProfile() {
  return await api("/profile");
}

async function updateProfile(data) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("birthDate", data.birthDate);
  formData.append("gender", data.gender);

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  return await api("/profile", {
    method: "PUT",
    body: formData,
  });
}

async function updatePassword(oldPassword, newPassword) {
  return await api("/profile/password", {
    method: "PUT",
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
