document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const sunIcon = document.querySelector(".sun");
  const moonIcon = document.querySelector(".moon");

  // Initialize theme from localStorage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      body.setAttribute("data-theme", savedTheme);
    } else {
      body.setAttribute("data-theme", systemDark ? "dark" : "light");
    }

    updateIcons();
  }

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    updateIcons();
    addTransition();
  }

  // Update icon visibility
  function updateIcons() {
    const isDark = body.getAttribute("data-theme") === "dark";
    sunIcon.style.opacity = isDark ? "0" : "1";
    moonIcon.style.opacity = isDark ? "1" : "0";
    sunIcon.style.transform = isDark
      ? "scale(0.8) rotate(15deg)"
      : "scale(1) rotate(0deg)";
    moonIcon.style.transform = isDark
      ? "scale(1) rotate(0deg)"
      : "scale(0.8) rotate(-15deg)";
  }

  // Add smooth transition
  function addTransition() {
    body.style.transition = "background 0.3s ease, color 0.3s ease";
    setTimeout(() => {
      body.style.transition = "";
    }, 300);
  }

  // Event listeners
  themeToggle.addEventListener("click", toggleTheme);

  // Initialize theme
  initTheme();
});
