export function magnetic() {
  // I'm skipping magnetic effect on touch devices since they have no mouse
  if (!window.matchMedia("(hover: hover)").matches) return;

  const targets = document.querySelectorAll(".btn--primary, .btn--outline-light, .btn--outline");

  targets.forEach(function (btn) {

    function handleMouseEnter() {
      btn.style.transition = "transform 0.08s ease";
    }

    function handleMouseMove(e) {
      const rect    = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const distX   = e.clientX - centerX;
      const distY   = e.clientY - centerY;
      btn.style.transform = "translate(" + (distX * 0.28) + "px, " + (distY * 0.28) + "px)";
    }

    function handleMouseLeave() {
      btn.style.transition = "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      btn.style.transform  = "translate(0, 0)";
    }

    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mousemove",  handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
  });
}
