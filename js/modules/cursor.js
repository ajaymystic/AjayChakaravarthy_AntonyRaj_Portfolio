export function cursor() {
  const dot  = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (!dot || !ring) return;

  let dotX  = 0;
  let dotY  = 0;
  let ringX = 0;
  let ringY = 0;

  function handleMouseMove(e) {
    dotX = e.clientX;
    dotY = e.clientY;
    dot.style.left = dotX + "px";
    dot.style.top  = dotY + "px";
  }

  function handleMouseDown() {
    dot.classList.add("clicking");
    ring.classList.add("clicking");
  }

  function handleMouseUp() {
    dot.classList.remove("clicking");
    ring.classList.remove("clicking");
  }

  function handleEnterInteractive() {
    dot.classList.add("hovering");
    ring.classList.add("hovering");
  }

  function handleLeaveInteractive() {
    dot.classList.remove("hovering");
    ring.classList.remove("hovering");
  }

  function attachHoverListeners() {
    const interactives = document.querySelectorAll("a, button, .project-card, .filter-btn, .dot, .skills__category");

    interactives.forEach(function (el) {
      el.addEventListener("mouseenter", handleEnterInteractive);
      el.addEventListener("mouseleave", handleLeaveInteractive);
    });
  }

  // I'm animating the ring with a lerp so it lags behind the dot
  function animateRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top  = ringY + "px";
    requestAnimationFrame(animateRing);
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup",   handleMouseUp);

  attachHoverListeners();
  animateRing();
}
