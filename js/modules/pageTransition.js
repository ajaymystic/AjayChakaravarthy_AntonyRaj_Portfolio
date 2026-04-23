export function pageTransition() {
  const overlay = document.querySelector(".page-transition");

  if (!overlay || typeof gsap === "undefined") return;

  // I'm revealing the page immediately — overlay starts opaque then fades out
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.45,
    ease: "power2.out",
    onComplete: function () {
      overlay.style.pointerEvents = "none";
    }
  });

  const links = document.querySelectorAll("a[href]");

  function handleLinkClick(e) {
    const href = e.currentTarget.getAttribute("href");

    if (!href) return;
    if (href.startsWith("#"))      return;
    if (href.startsWith("mailto")) return;
    if (href.startsWith("tel"))    return;
    if (href.startsWith("http"))   return;
    if (href.includes("download")) return;

    e.preventDefault();

    overlay.style.pointerEvents = "all";

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.in",
      onComplete: function () {
        window.location.href = href;
      }
    });
  }

  links.forEach(function (link) {
    link.addEventListener("click", handleLinkClick);
  });
}
