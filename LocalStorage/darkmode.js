document.addEventListener("DOMContentLoaded", () => {
    const savedDarkMode = localStorage.getItem("dark-mode");
    const savedAccessibilityMode = localStorage.getItem("accessibility-mode");
    const savedDislexiaMode = localStorage.getItem("dislexia-mode");
  
    if (savedDarkMode === "enabled") {
      document.body.classList.add("dark-mode");
      document.getElementById("mode-toggle").textContent = "☀️";
    }
  
    if (savedAccessibilityMode) {
      document.body.classList.add(savedAccessibilityMode);
    }
  
    if (savedDislexiaMode === "enabled") {
      document.body.classList.add("body-dislexia");
    }
  
    const clearDaltonismModes = () => {
      const daltonismClasses = [
        "body-acromatopsia",
        "body-dicromatismo",
        "body-deuteranomaly",
        "body-protanomaly",
        "body-tritanomaly",
      ];
      document.body.classList.remove(...daltonismClasses);
    };
  
    // Configurar botón de modo oscuro
    const darkModeButton = document.getElementById("mode-toggle");
    darkModeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        darkModeButton.textContent = "Modo Claro";
        localStorage.setItem("dark-mode", "enabled");
      } else {
        darkModeButton.textContent = "Modo Oscuro";
        localStorage.setItem("dark-mode", "disabled");
      }
    });
  
    // Configurar botones de daltonismo
    const daltonismButtons = document.querySelectorAll(".daltonism-toggle");
    daltonismButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const mode = `body-${button.getAttribute("data-mode")}`;
  
        if (document.body.classList.contains(mode)) {
          // Si ya está activo, desactivarlo
          document.body.classList.remove(mode);
          localStorage.removeItem("accessibility-mode");
        } else {
          // Limpiar otros estilos de daltonismo y activar
          clearDaltonismModes();
          document.body.classList.add(mode);
          localStorage.setItem("accessibility-mode", mode);
        }
      });
    });
  
    // Configurar botón de dislexia
    const dislexiaButton = document.getElementById("dislexia-toggle");
    dislexiaButton.addEventListener("click", () => {
      const isActive = document.body.classList.toggle("body-dislexia");
  
      // Guardar estado de dislexia en localStorage
      if (isActive) {
        localStorage.setItem("dislexia-mode", "enabled");
      } else {
        localStorage.removeItem("dislexia-mode");
      }
    });
  });