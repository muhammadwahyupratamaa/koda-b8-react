import storageService from "./storageService";

const KEY = "addresses";

function getAddresses() {
  return storageService.get(KEY, []);
}

function saveAddresses(addresses) {
  storageService.set(KEY, addresses);
}

function addAddress(address) {
  const addresses = getAddresses();

  addresses.push({
    id: Date.now(),
    ...address,
  });

  saveAddresses(addresses);
}

function updateAddress(id, data) {
  const addresses = getAddresses().map((address) =>
    address.id === id
      ? {
          ...address,
          ...data,
        }
      : address,
  );

  saveAddresses(addresses);
}

function deleteAddress(id) {
  const addresses = getAddresses().filter((address) => address.id !== id);

  saveAddresses(addresses);
}

function setPrimaryAddress(id) {
  const addresses = getAddresses().map((address) => ({
    ...address,
    isPrimary: address.id === id,
  }));

  saveAddresses(addresses);
}

function getPrimaryAddress() {
  return getAddresses().find((address) => address.isPrimary) || null;
}

export default {
  getAddresses,
  saveAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setPrimaryAddress,
  getPrimaryAddress,
};
