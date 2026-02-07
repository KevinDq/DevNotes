const root = document.documentElement;

// Appliquer le thème dès le début
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.dataset.theme = savedTheme;
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = prefersDark ? "dark" : "light";
}

// Attendre que le bouton existe (header injecté)
function initThemeToggle() {
  const button = document.getElementById("themeToggle");
  if (!button) return;

  function updateIcon() {
    button.textContent = root.dataset.theme === "dark" ? "🌞" : "🌙";
  }

  updateIcon();

  button.addEventListener("click", () => {
    const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    updateIcon();
  });
}

// Vérifier régulièrement jusqu'à ce que le header soit chargé
const interval = setInterval(() => {
  if (document.getElementById("themeToggle")) {
    initThemeToggle();
    clearInterval(interval);
  }
}, 50);
