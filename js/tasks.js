document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tasks-tab");
  const addTaskBtn = document.querySelector(".tasks-add-btn");

  const views = {
    "my-tasks": document.getElementById("view-my-tasks"),
    "ai-summary": document.getElementById("view-ai-summary"),
  };

  if (!tabButtons.length || !addTaskBtn) {
    return;
  }

 
  function activateView(target) {
    Object.entries(views).forEach(([name, el]) => {
      if (!el) return;
      el.classList.toggle("tasks-view--active", name === target);
    });

    if (target === "my-tasks") {
      addTaskBtn.classList.remove("tasks-add-btn--hidden");
    } else {
      addTaskBtn.classList.add("tasks-add-btn--hidden");
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.view;

      tabButtons.forEach((b) =>
        b.classList.toggle("tasks-tab--active", b === btn)
      );

      activateView(target);
    });
  });

  const initiallyActive = document.querySelector(
    ".tasks-tab.tasks-tab--active"
  );
  const initialTarget = initiallyActive
    ? initiallyActive.dataset.view
    : "my-tasks";

  activateView(initialTarget);

  const aiTabs = document.querySelectorAll(".ai-inner-tab");
  aiTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      aiTabs.forEach((t) =>
        t.classList.toggle("ai-inner-tab--active", t === tab)
      );
    });
  });
});
