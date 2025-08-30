// events/searchFilters.js

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

  // Cerrar dropdowns al hacer clic fuera
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
    const buttonText = button.querySelector("span:last-child");
    buttonText.textContent = getFilterDisplayName(filterType);

    const options = button.querySelectorAll(".dropdown-option");
    options.forEach(option => option.classList.remove("selected"));
  });

  updateActiveFiltersCount();
  performSearch();
}

// Función para agregar dinámicamente filtros
export function addNewFilter(filterType, displayName, options, icon = "🔧") {
  const filtersContainer = document.querySelector(".filters-container");
  const clearButton = filtersContainer.querySelector(".clear-filters");

  const filterButton = document.createElement("div");
  filterButton.className = "filter-button";
  filterButton.dataset.filter = filterType;

  filterButton.innerHTML = `
    <span class="filter-icon">${icon}</span>
    <span>${displayName}</span>
    <div class="filter-dropdown">
      ${options.map(option =>
        `<div class="dropdown-option" data-value="${option.value}">${option.label}</div>`
      ).join("")}
    </div>
  `;

  filtersContainer.insertBefore(filterButton, clearButton);

  filterButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFilterDropdown(filterButton);
  });

  const dropdownOptions = filterButton.querySelectorAll(".dropdown-option");
  dropdownOptions.forEach(option => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      selectFilterOption(filterButton, option);
    });
  });
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
  const filterValue = option.dataset.value;

  activeFilters[filterType] = filterValue;
  button.classList.add("active");

  const buttonText = button.querySelector("span:last-child");
  buttonText.textContent = `${getFilterDisplayName(filterType)}: ${option.textContent}`;

  const allOptions = button.querySelectorAll(".dropdown-option");
  allOptions.forEach(opt => opt.classList.remove("selected"));
  option.classList.add("selected");

  closeAllDropdowns();
  updateActiveFiltersCount();
  performSearch();
}

function getFilterDisplayName(filterType) {
  const names = {
    fecha: "Fecha",
    popularidad: "Popularidad",
    año: "Año",
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

function performSearch() {
  console.log("🔍 Realizando búsqueda...");
  console.log("Término:", searchTerm);
  console.log("Filtros:", activeFilters);

  const resultsInfo = document.getElementById("resultsInfo");
  if (!resultsInfo) return;

  let infoText = "Mostrando resultados";
  if (searchTerm) infoText += ` para "${searchTerm}"`;

  const filterCount = Object.keys(activeFilters).length;
  if (filterCount > 0) {
    infoText += ` con ${filterCount} filtro${filterCount > 1 ? "s" : ""}`;
  }

  resultsInfo.textContent = infoText;
}
