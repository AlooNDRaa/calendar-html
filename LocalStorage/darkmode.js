const savedDarkMode = localStorage.getItem("dark-mode");

if (savedDarkMode === "enabled") {
  document.body.classList.add("dark-mode");
  document.getElementById("mode-toggle").textContent = "☀️";
  document.getElementById("mode-toggle").textContent = "🌙"; 
}

document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const toggleButton = document.getElementById("mode-toggle");

  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "☀️"; 
    localStorage.setItem("dark-mode", "enabled"); 
  } else {
    toggleButton.textContent = "🌙"; 
    localStorage.setItem("dark-mode", "disabled"); 
  }
});
