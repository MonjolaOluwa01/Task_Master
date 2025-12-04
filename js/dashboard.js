document.addEventListener("DOMContentLoaded", () => {
  const auth = window.Auth;
  if (!auth) return;

  const user = auth.getCurrentUser();

  // If not logged in, go back to auth page
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // Fill in UI with user data
  const name = user.name || "User";
  const email = user.email || "";

  const sidebarName = document.getElementById("sidebarUserName");
  const sidebarEmail = document.getElementById("sidebarUserEmail");
  const greeting = document.getElementById("mainGreeting");
  const avatar = document.querySelector(".sidebar__avatar");
  const  sidebar = document.getElementsByClassName("sidebar-container")

  if (sidebarName) sidebarName.textContent = name;
  if (sidebarEmail) sidebarEmail.textContent = email;
  if (greeting) greeting.textContent = `Good morning, ${name.split(" ")[0]}!`;
  if (avatar && name) avatar.textContent = name.charAt(0).toUpperCase();

  // Logout button
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      auth.logoutUser();
      window.location.href = "index.html";
    });
  }
});
