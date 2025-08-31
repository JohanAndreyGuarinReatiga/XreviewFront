import { initAuthEvents } from "./events/authEvents.js";
import { initReviewEvents } from "./events/reviewEvents.js";
import { initUserEvents } from "./events/userEvents.js";
import { initDropdown } from "./events/dropdown.js";
import { initializeFilters, initializeSearch, clearAllFilters } from "./events/searchFilters.js";
import { initializeCarousel, moveCarousel, goToSlide } from "./events/carousel.js";
import { cargarCarrusel } from "./events/titulosEvents.js";

document.addEventListener("DOMContentLoaded", () => {
  initAuthEvents();
  initReviewEvents();
  initUserEvents();
  initDropdown();
  initializeFilters();
  initializeSearch();
  initializeCarousel();
  cargarCarrusel();

  // Botón limpiar filtros
const clearBtn = document.querySelector(".clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearAllFilters);
  }

  // Botones del carrusel
  document.querySelector(".prev-btn")?.addEventListener("click", () => moveCarousel(-1));
  document.querySelector(".next-btn")?.addEventListener("click", () => moveCarousel(1));

  // Indicadores del carrusel
  document.querySelectorAll(".indicator").forEach((ind, i) => {
    ind.addEventListener("click", () => goToSlide(i));
  });
});
