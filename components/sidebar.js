window.addEventListener("sidebar-loaded", () => {

  const sidebar = document.getElementById("sidebar");
  console.log("sidebar found:", sidebar)
  const toggleBtn = document.getElementById("sidebarToggle");
  const links = document.querySelectorAll(".sidebar__link", ".sidebar__logout");

  if(!sidebar || !toggleBtn) {
    console.warn("Sidebar or toggle button not found");
    return;
  }

  const collapsed = localStorage.getItem("sidebar-collapsed") === "true";
  if (collapsed) sidebar.classList.add("collapsed");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    localStorage.setItem(
      "sidebar-collapsed",
      sidebar.classList.contains("collapsed")
    );
  });

  const currentPage = document.body.dataset.page;
  links.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
});
