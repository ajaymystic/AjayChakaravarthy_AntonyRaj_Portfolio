export function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  function handleSmoothScroll(e) {
    const href = this.getAttribute("href");

    if (href === "#" || !href) {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();

    const header = document.querySelector(".header");
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  links.forEach(function (link) {
    link.addEventListener("click", handleSmoothScroll);
  });
}