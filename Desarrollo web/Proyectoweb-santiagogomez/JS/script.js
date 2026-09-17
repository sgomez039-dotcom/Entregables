document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const nextButton = document.getElementById('carouselNext');
  const prevButton = document.getElementById('carouselPrev');
  const dotsNav = document.getElementById('carouselDots');

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Crear los puntos (dots) automáticamente
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => moveToSlide(index));
    dotsNav.appendChild(dot);
  });

  const dots = Array.from(dotsNav.children);

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function moveToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  // Eventos de los botones < y >
  if (nextButton) {
    nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));
  }

  // Cambio automático cada 4 segundos
  let autoSlide = setInterval(() => {
    moveToSlide(currentIndex + 1);
  }, 4000);

  // Pausar cambio automático si el usuario pasa el mouse sobre el carrusel
  const carouselContainer = document.getElementById('carousel');
  carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carouselContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      moveToSlide(currentIndex + 1);
    }, 4000);
  });
});