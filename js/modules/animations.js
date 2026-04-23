export function animations() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP is not loaded, skipping animations");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  function animateHero() {
    const heroContent    = document.querySelector(".hero__content");
    const heroImageFrame = document.querySelector(".hero__image-frame");

    if (!heroContent) return;

    gsap.set(heroContent, { opacity: 1, visibility: "visible" });
    if (heroImageFrame) gsap.set(heroImageFrame, { opacity: 1 });

    const elements = heroContent.querySelectorAll(
      ".available-badge, .hero__title, .hero__role, .hero__description, .hero__cta"
    );

    if (elements.length > 0) {
      gsap.from(elements, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.13,
        ease: "power3.out",
        clearProps: "all"
      });
    }

    if (heroImageFrame) {
      gsap.from(heroImageFrame, {
        opacity: 0,
        x: 60,
        duration: 1.1,
        delay: 0.2,
        ease: "power3.out",
        clearProps: "all"
      });
    }
  }

  function animateCards() {
    const cards = document.querySelectorAll(".project-card, .card");
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 1, visibility: "visible" });

    cards.forEach(function (card) {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 60,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "all"
      });
    });
  }

  function animateSkills() {
    const skillCategories = document.querySelectorAll(".skills__category");
    if (skillCategories.length === 0) return;

    gsap.set(skillCategories, { opacity: 1, visibility: "visible" });

    gsap.from(skillCategories, {
      scrollTrigger: {
        trigger: ".skills__grid",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "all"
    });
  }

  function animateProjects() {
    const projectCards = document.querySelectorAll(".projects-grid .project-card");
    if (projectCards.length === 0) return;

    gsap.set(projectCards, { opacity: 1, visibility: "visible" });

    gsap.from(projectCards, {
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 82%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      clearProps: "all"
    });
  }

  function animateVideoSection() {
    const videoSection = document.querySelector(".video-section");
    if (!videoSection) return;

    const showcase = videoSection.querySelector(".video-showcase");
    if (!showcase) return;

    gsap.from(showcase, {
      scrollTrigger: {
        trigger: videoSection,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.out",
      clearProps: "all"
    });
  }

  function animateCTA() {
    const ctaSection = document.querySelector(".cta");
    if (!ctaSection) return;

    gsap.from(ctaSection.querySelectorAll("h2, p, .btn"), {
      scrollTrigger: {
        trigger: ctaSection,
        start: "top 82%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
      clearProps: "all"
    });
  }

  function animateTestimonials() {
    const section = document.querySelector(".testimonials");
    if (!section) return;

    const header = section.querySelector(".testimonials__header");
    if (!header) return;

    gsap.from(header, {
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: -30,
      duration: 0.6,
      clearProps: "all"
    });
  }

  function animateSectionHeaders() {
    const headers = document.querySelectorAll(
      ".skills__header, .featured-projects__header, .contact__header, .projects-header"
    );

    headers.forEach(function (header) {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 86%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all"
      });
    });
  }

  // I'm using GSAP to count up the stat numbers when they scroll into view
  function animateStats() {
    const statItems = document.querySelectorAll(".about__stats-item p[data-count]");
    if (statItems.length === 0) return;

    statItems.forEach(function (stat) {
      const targetCount = parseInt(stat.getAttribute("data-count"), 10);
      const suffix      = stat.getAttribute("data-suffix");
      const counter     = { val: 0 };

      gsap.to(counter, {
        scrollTrigger: {
          trigger: stat,
          start: "top 86%",
          toggleActions: "play none none none"
        },
        val: targetCount,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          const rounded = Math.round(counter.val);
          if (suffix) {
            stat.textContent = rounded + suffix;
          } else {
            stat.textContent = rounded + "";
          }
        }
      });
    });
  }

  function animateAboutBio() {
    const bio = document.querySelector(".about__bio");
    if (!bio) return;

    gsap.from(bio.querySelectorAll("p"), {
      scrollTrigger: {
        trigger: bio,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.out",
      clearProps: "all"
    });
  }

  animateHero();
  animateCards();
  animateSkills();
  animateProjects();
  animateVideoSection();
  animateCTA();
  animateTestimonials();
  animateSectionHeaders();
  animateStats();
  animateAboutBio();
}
