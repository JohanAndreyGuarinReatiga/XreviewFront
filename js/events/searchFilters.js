// events/searchFilters.js
import { buscarTitulo, listarConFiltros } from "../services/titulos.js";
import { renderResults } from "../ui/ui.js"; 

// Estado global
let activeFilters = {};
let searchTerm = "";

// Inicializar filtros
export function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFilterDropdown(button);
    });

    const dropdown = button.querySelector(".filter-dropdown");
    const options = dropdown.querySelectorAll(".dropdown-option");

    options.forEach(option => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        selectFilterOption(button, option);
      });
    });
  });

  document.addEventListener("click", closeAllDropdowns);
}

// Inicializar búsqueda
export function initializeSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    searchTerm = this.value;
    performSearch();
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}

// Limpiar todos los filtros
export function clearAllFilters() {
  activeFilters = {};

  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach(button => {
    button.classList.remove("active");

    const filterType = button.dataset.filter;
    const buttonText = button.querySelector(".selected-value");
    if (buttonText) {
      buttonText.textContent = getFilterDisplayName(filterType);
    }

    const options = button.querySelectorAll(".dropdown-option");
    options.forEach(option => option.classList.remove("selected"));
  });

  updateActiveFiltersCount();
  performSearch();
}

/* ------------------ funciones internas ------------------ */
function toggleFilterDropdown(button) {
  const dropdown = button.querySelector(".filter-dropdown");
  const isOpen = dropdown.classList.contains("show");

  closeAllDropdowns();
  if (!isOpen) dropdown.classList.add("show");
}

function closeAllDropdowns() {
  document.querySelectorAll(".filter-dropdown").forEach(d => d.classList.remove("show"));
}

function selectFilterOption(button, option) {
  const filterType = button.dataset.filter;
  let filterValue = option.dataset.value;

  // Mapear "año" -> "anio" para backend
  if (filterType === "año") {
    activeFilters["anio"] = filterValue;
  } else {
    activeFilters[filterType] = filterValue;
  }

  button.classList.add("active");

  // ✅ Buscar el span correcto
  const buttonText = button.querySelector(".selected-value");
  if (buttonText) {
    buttonText.textContent = option.textContent; 
  }

  // Marcar opción seleccionada
  const allOptions = button.querySelectorAll(".dropdown-option");
  allOptions.forEach(opt => opt.classList.remove("selected"));
  option.classList.add("selected");

  closeAllDropdowns();
  updateActiveFiltersCount();
  performSearch();
}

function getFilterDisplayName(filterType) {
  const names = {
    popularidad: "Popularidad",
    categoria: "Categoría",
    tipo: "Tipo"
  };
  return names[filterType] || filterType;
}

function updateActiveFiltersCount() {
  const count = Object.keys(activeFilters).length;
  const counter = document.getElementById("activeFiltersCount");

  if (!counter) return;

  if (count > 0) {
    counter.textContent = count;
    counter.style.display = "flex";
  } else {
    counter.style.display = "none";
  }
}

export async function performSearch() {
  const resultsInfo = document.getElementById("resultsInfo");
  const resultsGrid = document.getElementById("resultsGrid");

  try {
    let results = [];

    if (searchTerm) {
      results = await buscarTitulo(searchTerm);
    } else {
      results = await listarConFiltros(activeFilters);
    }

    // Mostrar texto informativo
    let infoText = "Mostrando resultados";
    if (searchTerm) infoText += ` para "${searchTerm}"`;
    const filterCount = Object.keys(activeFilters).length;
    if (filterCount > 0) {
      infoText += ` con ${filterCount} filtro${filterCount > 1 ? "s" : ""}`;
    }
    if (resultsInfo) resultsInfo.textContent = infoText;

    // Renderizar resultados
    renderResults(results, resultsGrid);

  } catch (err) {
    console.error("❌ Error en búsqueda:", err);
    if (resultsInfo) resultsInfo.textContent = "Error al obtener resultados";
  }
}
