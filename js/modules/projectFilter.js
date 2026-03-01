export function projectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length === 0) return;

  function showCard(card) {
    card.classList.remove("hidden");
    card.style.display = "block";
  }

  function hideCard(card) {
    card.classList.add("hidden");
    card.style.display = "none";
  }

  function handleFilter(button) {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    projectCards.forEach(function (card, index) {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: index * 0.05,
          onStart: function () {
            showCard(card);
          },
          clearProps: "all",
        });
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          onComplete: function () {
            hideCard(card);
          },
        });
      }
    });
  }

    filterButtons.forEach(function (button) {
    button.addEventListener("click", handleFilter.bind(null, button));
  });
}