// Simple "database" in localStorage
const USERS_KEY = "tm_users";
const CURRENT_USER_KEY = "tm_currentUser";

function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({ name: user.name, email: user.email })
  );
}

function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// SIGN UP
function handleSignup(form) {
  const formData = new FormData(form);
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim().toLowerCase();
  const password = formData.get("password");

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const users = getUsers();
  const exists = users.find((u) => u.email === email);

  if (exists) {
    alert("An account with this email already exists. Please log in.");
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  // redirect to dashboard
  window.location.href = "dashboard.html";
}

// LOGIN
function handleLogin(form) {
  const formData = new FormData(form);
  const email = formData.get("email")?.trim().toLowerCase();
  const password = formData.get("password");

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  const users = getUsers();
  const match = users.find((u) => u.email === email && u.password === password);

  if (!match) {
    alert("Invalid email or password.");
    return;
  }

  setCurrentUser(match);
  window.location.href = "dashboard.html";
}

// Attach listeners
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("form-signup");
  const loginForm = document.getElementById("form-login");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSignup(signupForm);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin(loginForm);
    });
  }
});

// export helpers for dashboard.js (just attach to window)
window.tmAuth = {
  getCurrentUser,
  logoutUser,
};
