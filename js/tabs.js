document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll(".auth-tab"));
  const forms = Array.from(document.querySelectorAll(".auth-form"));
  const title = document.getElementById("card-title");
  const subtitle = document.getElementById("card-subtitle");

  function setCopy(tab) {
    if (tab === "signup") {
      title.textContent = "Join TaskMaster";
      subtitle.textContent = "Create an account to boost your productivity";
    } else {
      title.textContent = "Welcome Back!";
      subtitle.textContent = "Enter your details to access your account";
    }
  }

  function activate(tabName) {
    tabs.forEach((tabEl) => {
      const active = tabEl.dataset.tab === tabName;
      tabEl.classList.toggle("auth-tab--active", active);
      tabEl.setAttribute("aria-selected", active ? "true" : "false");
    });

    forms.forEach((form) => {
      const match = form.dataset.panel === tabName;
      form.classList.toggle("auth-form--hidden", !match);
    });

    setCopy(tabName);
  }

  tabs.forEach((tabEl) => {
    tabEl.addEventListener("click", () => {
      activate(tabEl.dataset.tab);
    });
  });
});
