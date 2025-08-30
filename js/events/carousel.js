let currentSlide = 0
const itemsPerSlide = 3
let autoSlideInterval

// Inicializar carousel
export function initializeCarousel() {
  startAutoSlide()
  updateCarouselPosition()

  // Agregar eventos de hover
  const carouselContainer = document.querySelector(".carousel-container")
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", pauseAutoSlide)
    carouselContainer.addEventListener("mouseleave", resumeAutoSlide)
  }
}

// Mover carousel
export function moveCarousel(direction) {
  const track = document.getElementById("carouselTrack")
  const items = track.querySelectorAll(".carousel-item")
  const totalSlides = Math.ceil(items.length / itemsPerSlide)

  currentSlide += direction

  if (currentSlide >= totalSlides) {
    currentSlide = 0
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1
  }

  updateCarouselPosition()
  updateIndicators()

  // Reiniciar auto-slide
  clearInterval(autoSlideInterval)
  startAutoSlide()
}

// Ir a slide específico
export function goToSlide(slideIndex) {
  currentSlide = slideIndex
  updateCarouselPosition()
  updateIndicators()

  // Reiniciar auto-slide
  clearInterval(autoSlideInterval)
  startAutoSlide()
}

// ----------------- Helpers internos -----------------

// Actualizar posición del carousel
function updateCarouselPosition() {
  const track = document.getElementById("carouselTrack")
  const translateX = -currentSlide * 100
  track.style.transform = `translateX(${translateX}%)`
}

// Actualizar indicadores
function updateIndicators() {
  const indicators = document.querySelectorAll(".carousel-indicator")
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide)
  })
}

// Iniciar auto-slide
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveCarousel(1)
  }, 5000)
}

// Pausar auto-slide
function pauseAutoSlide() {
  clearInterval(autoSlideInterval)
}

// Reanudar auto-slide
function resumeAutoSlide() {
  startAutoSlide()
}
