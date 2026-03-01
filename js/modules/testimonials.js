export function testimonials() 
{
  const sliderContainer = document.querySelector(".testimonials__slider");
  const dotsContainer = document.querySelector(".testimonials__dots");

  if (!sliderContainer || !dotsContainer) return;

  let currentSlide = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000;

  function renderTestimonials(testimonialsData) {
    sliderContainer.innerHTML = "";

    testimonialsData.forEach(function (testimonial) {
      const item = document.createElement("div");
      item.className = "testimonials__item";
      item.innerHTML = `
        <div class="testimonials__content">
          <p class="testimonials__quote">${testimonial.quote}</p>
          <div class="testimonials__author">
            <h4 class="testimonials__name">${testimonial.name}</h4>
            <p class="testimonials__role">${testimonial.role}</p>
            <p class="testimonials__company">${testimonial.company}</p>
          </div>
        </div>
      `;
      sliderContainer.appendChild(item);
    });
  }

  function renderDots(count) {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      dot.setAttribute("type", "button");
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index, items, dots) {
    items[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = index;
    items[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide(items, dots) {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }
    goToSlide(nextIndex, items, dots);
  }

  function previousSlide(items, dots) {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = items.length - 1;
    }
    goToSlide(prevIndex, items, dots);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function startAutoplay(items, dots) {
    if (autoplayInterval) return;
    autoplayInterval = setInterval(function () {
      nextSlide(items, dots);
    }, AUTOPLAY_DELAY);
  }

  function resetAutoplay(items, dots) {
    stopAutoplay();
    startAutoplay(items, dots);
  }

  function handleKeyNavigation(items, dots, e) {
    const section = document.querySelector(".testimonials");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
      if (e.key === "ArrowLeft") {
        previousSlide(items, dots);
        resetAutoplay(items, dots);
      } else if (e.key === "ArrowRight") {
        nextSlide(items, dots);
        resetAutoplay(items, dots);
      }
    }
  }

  function handleDotClick(index, items, dotsList) {
    goToSlide(index, items, dotsList);
    resetAutoplay(items, dotsList);
  }

  function handleMouseLeave(items, dots) {
    startAutoplay(items, dots);
  }

  function initSlider(testimonialsData) {
    renderTestimonials(testimonialsData);
    renderDots(testimonialsData.length);

    const testimonialItems = document.querySelectorAll(".testimonials__item");
    const dots = document.querySelectorAll(".testimonials__dots .dot");

    testimonialItems[0].classList.add("active");
    dots[0].classList.add("active");

    dots.forEach(function (dot, index) {
      dot.addEventListener("click", handleDotClick.bind(null, index, testimonialItems, dots));
    });

    function handleKeyDown(e) {
      handleKeyNavigation(testimonialItems, dots, e);
    }

    document.addEventListener("keydown", handleKeyDown);

    const section = document.querySelector(".testimonials");
    if (section) {
      section.addEventListener("mouseenter", stopAutoplay);
      section.addEventListener("mouseleave", handleMouseLeave.bind(null, testimonialItems, dots));
    }

    startAutoplay(testimonialItems, dots);
  }

  // I'm fetching testimonials from the database via PHP
  fetch("includes/testimonials.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      initSlider(data);
    })
    .catch(function (error) {
      console.error("Failed to load testimonials:", error);
    });
}