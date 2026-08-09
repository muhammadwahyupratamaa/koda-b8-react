import { api } from "./api";

async function getAddresses() {
  return await api("/addresses");
}

async function getAddressById(id) {
  return await api(`/addresses/${id}`);
}

async function createAddress(data) {
  return await api("/addresses", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function updateAddress(id, data) {
  return await api(`/addresses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

async function setPrimaryAddress(id) {
  return await api(`/addresses/${id}/primary`, {
    method: "PATCH",
  });
}

async function deleteAddress(id) {
  return await api(`/addresses/${id}`, {
    method: "DELETE",
  });
}

export default {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  setPrimaryAddress,
  deleteAddress,
};