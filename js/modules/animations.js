export function animations() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP is not loaded, skipping animations");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  function animateHero() {
    const heroContent = document.querySelector(".hero__content");
    const heroImage = document.querySelector(".hero__image-container");

    if (!heroContent) return;

    gsap.set(heroContent, { opacity: 1, visibility: "visible" });
    if (heroImage) gsap.set(heroImage, { opacity: 1, visibility: "visible" });

    const contentElements = heroContent.querySelectorAll(
      ".hero__title, .hero__subtitle, .hero__description, .btn"
    );

    if (contentElements.length > 0) {
      gsap.from(contentElements, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all",
      });
    }

    if (heroImage) {
      gsap.from(heroImage, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        clearProps: "all",
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
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all",
      });
    });
  }

  function animateSkills() {
    const skillCategories = document.querySelectorAll(".skills__category");

    if (skillCategories.length === 0) return;

    gsap.set(skillCategories, { opacity: 1, visibility: "visible" });

    skillCategories.forEach(function (category, index) {
      gsap.from(category, {
        scrollTrigger: {
          trigger: category,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        clearProps: "all",
      });
    });
  }

  function animateProjects() {
    const projectCards = document.querySelectorAll(".projects-grid .project-card");

    if (projectCards.length === 0) return;

    gsap.set(projectCards, { opacity: 1, visibility: "visible" });

    gsap.from(projectCards, {
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "all",
    });
  }

  function animateVideoSection() {
    const videoSection = document.querySelector(".video-section");

    if (!videoSection) return;

    const videoTitle = document.querySelector(".video-section__title");
    const videoShowcase = document.querySelector(".video-showcase");

    if (videoTitle) {
      gsap.from(videoTitle, {
        scrollTrigger: {
          trigger: videoSection,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: -30,
        duration: 0.6,
        clearProps: "all",
      });
    }

    if (videoShowcase) {
      gsap.from(videoShowcase, {
        scrollTrigger: {
          trigger: videoSection,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.2,
        clearProps: "all",
      });
    }
  }

  function animateCTA() {
    const ctaSection = document.querySelector(".cta");

    if (!ctaSection) return;

    const ctaElements = ctaSection.querySelectorAll("h2, p, .btn");

    if (ctaElements.length > 0) {
      gsap.from(ctaElements, {
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all",
      });
    }
  }

  function animateTestimonials() {
    const testimonialsSection = document.querySelector(".testimonials");

    if (!testimonialsSection) return;

    const testimonialsTitle = document.querySelector(".testimonials__title");

    if (testimonialsTitle) {
      gsap.from(testimonialsTitle, {
        scrollTrigger: {
          trigger: testimonialsSection,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: -30,
        duration: 0.6,
        clearProps: "all",
      });
    }
  }

  animateHero();
  animateCards();
  animateSkills();
  animateProjects();
  animateVideoSection();
  animateCTA();
  animateTestimonials();
}