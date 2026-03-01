export function navigation() {
  const hamburger = document.querySelector(".hamburger");
  const closeMenuBtn = document.querySelector(".mobile-menu__close");
  const mobileMenu = document.querySelector(".mobile-menu");
  const header = document.querySelector(".header");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");

  if (!hamburger || !mobileMenu) return;

  function toggleMobileMenu() {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  function closeMobileMenu() {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function handleOutsideClick(e) {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  }

  function handleMobileLinkClick() {
    closeMobileMenu();
  }

  hamburger.addEventListener("click", toggleMobileMenu);

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMobileMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", handleMobileLinkClick);
  });

  mobileMenu.addEventListener("click", handleOutsideClick);
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("keydown", handleKeyDown);
}