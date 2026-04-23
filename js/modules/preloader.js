export function preloader() {
  const loader = document.querySelector("#preloader");

  if (!loader || typeof gsap === "undefined") return;

  const initials = loader.querySelector(".preloader__initials");
  const bar      = loader.querySelector(".preloader__bar");

  // I'm chaining the intro animation then sweeping the preloader up off screen
  const tl = gsap.timeline({
    onComplete: function () {
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.85,
        ease: "power3.inOut",
        onComplete: function () {
          loader.remove();
        }
      });
    }
  });

  tl.from(initials, {
    opacity: 0,
    y: 40,
    duration: 0.65,
    ease: "power3.out"
  });

  tl.to(bar, {
    width: "100%",
    duration: 0.85,
    ease: "power2.inOut"
  }, "-=0.25");

  tl.to({}, { duration: 0.35 });
}
