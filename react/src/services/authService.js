function getUsers() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users;
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function register(data) {
  const users = getUsers();
  const existingUser = users.find((user) => user.email === data.email);

  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }
  users.push(data);
  saveUsers(users);
}

function login(data) {
  const users = getUsers();

  const existingUser = users.find((user) => user.email === data.email);

  if (!existingUser) {
    throw new Error("Email tidak ditemukan");
  }

  if (existingUser.password !== data.password) {
    throw new Error("Password salah");
  }

  return existingUser;
}

function forgotPassword(email) {
  const users = getUsers();

  const existingUser = users.find((user) => user.email === email);

  if (!existingUser) {
    throw new Error("Email tidak terdaftar");
  }

  return true;
}

export default {
  getUsers,
  saveUsers,
  register,
  login,
  forgotPassword
};
