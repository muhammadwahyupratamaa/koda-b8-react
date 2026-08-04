import storageService from "./storageService";

const KEY = "profile";

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "Laki-laki",
  avatar: "",
};

function getProfile() {
  return storageService.get(KEY, defaultProfile);
}

function saveProfile(profile) {
  storageService.set(KEY, profile);
}

function updateProfile(data) {
  const current = getProfile();

  const updated = {
    ...current,
    ...data,
  };

  saveProfile(updated);

  return updated;
}

export default {
  getProfile,
  saveProfile,
  updateProfile,
};
