// Navigation Module
const NavigationModule = (function() {
  const hamburger = document.querySelector('.hamburger');
  const closeMenuBtn = document.querySelector('.mobile-menu__close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const header = document.querySelector('.header');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  
  function initNavigation() {
    // I'm checking if elements exist
    if (!hamburger || !mobileMenu) return;
    
    // I'm adding click event to hamburger
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // I'm adding click event to close button
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    // I'm adding click events to mobile links
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // I'm adding click event to close when clicking outside menu
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
    
    // I'm adding scroll event for header shadow
    window.addEventListener('scroll', handleScroll);
    
    // I'm adding escape key to close menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }
  
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }
  
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function handleScroll() {
    if (!header) return;
    
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  return {
    init: initNavigation,
    close: closeMobileMenu
  };
})();

// Video Player Module
const VideoPlayerModule = (function() {
  let plyrInstance = null;
  
  function initVideoPlayer() {
    const player = document.querySelector('#player');
    
    // I'm checking if player exists
    if (!player) return;
    
    // I'm checking if Plyr is available
    if (typeof Plyr === 'undefined') {
      console.warn('Plyr is not loaded');
      return;
    }
    
    // I'm initializing Plyr
    plyrInstance = new Plyr(player, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'fullscreen'
      ],
      quality: {
        default: 720,
        options: [1080, 720, 480]
      },
      speed: {
        selected: 1,
        options: [0.5, 0.75, 1, 1.25, 1.5, 2]
      }
    });
    
    // I'm adding event listeners
    plyrInstance.on('play', function() {
      console.log('Video is playing');
    });
    
    plyrInstance.on('pause', function() {
      console.log('Video is paused');
    });
    
    plyrInstance.on('ended', function() {
      console.log('Video ended');
    });
  }
  
  return {
    init: initVideoPlayer,
    getInstance: function() { return plyrInstance; }
  };
})();

// Animations Module
const AnimationsModule = (function() {
  function initAnimations() {
    // I'm checking if GSAP is available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP is not loaded, skipping animations');
      return;
    }
    
    // I'm registering ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    animateHero();
    
    // Cards animations
    animateCards();
    
    // Skills animations
    animateSkills();
    
    // Projects animations
    animateProjects();
    
    // Video section animations
    animateVideoSection();
    
    // CTA section animations
    animateCTA();
    
    // Testimonials animations
    animateTestimonials();
  }
  
  function animateHero() {
    const heroContent = document.querySelector('.hero__content');
    const heroImage = document.querySelector('.hero__image-container');
    
    if (!heroContent) return;
    
    // I'm ensuring elements are visible initially
    gsap.set(heroContent, { opacity: 1, visibility: 'visible' });
    if (heroImage) gsap.set(heroImage, { opacity: 1, visibility: 'visible' });
    
    // I'm animating hero content elements
    const contentElements = heroContent.querySelectorAll('.hero__title, .hero__subtitle, .hero__description, .btn');
    
    if (contentElements.length > 0) {
      gsap.from(contentElements, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
    
    // I'm animating hero image
    if (heroImage) {
      gsap.from(heroImage, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }
  
  function animateCards() {
    const cards = document.querySelectorAll('.project-card, .card');
    
    if (cards.length === 0) return;
    
    // I'm ensuring cards are visible initially
    gsap.set(cards, { opacity: 1, visibility: 'visible' });
    
    cards.forEach(function(card) {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      });
    });
  }
  
  function animateSkills() {
    const skillCategories = document.querySelectorAll('.skills__category');
    
    if (skillCategories.length === 0) return;
    
    // I'm ensuring skills are visible initially
    gsap.set(skillCategories, { opacity: 1, visibility: 'visible' });
    
    skillCategories.forEach(function(category, index) {
      gsap.from(category, {
        scrollTrigger: {
          trigger: category,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'back.out(1.7)',
        clearProps: 'all'
      });
    });
  }
  
  function animateProjects() {
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    
    if (projectCards.length === 0) return;
    
    // I'm ensuring project cards are visible initially
    gsap.set(projectCards, { opacity: 1, visibility: 'visible' });
    
    gsap.from(projectCards, {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }
  
  function animateVideoSection() {
    const videoSection = document.querySelector('.video-section');
    
    if (!videoSection) return;
    
    const videoTitle = document.querySelector('.video-section__title');
    const videoShowcase = document.querySelector('.video-showcase');
    
    if (videoTitle) {
      gsap.from(videoTitle, {
        scrollTrigger: {
          trigger: videoSection,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: -30,
        duration: 0.6,
        clearProps: 'all'
      });
    }
    
    if (videoShowcase) {
      gsap.from(videoShowcase, {
        scrollTrigger: {
          trigger: videoSection,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.2,
        clearProps: 'all'
      });
    }
  }
  
  function animateCTA() {
    const ctaSection = document.querySelector('.cta');
    
    if (!ctaSection) return;
    
    const ctaElements = ctaSection.querySelectorAll('h2, p, .btn');
    
    if (ctaElements.length > 0) {
      gsap.from(ctaElements, {
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }
  
  function animateTestimonials() {
    const testimonialsSection = document.querySelector('.testimonials');
    
    if (!testimonialsSection) return;
    
    const testimonialsTitle = document.querySelector('.testimonials__title');
    
    if (testimonialsTitle) {
      gsap.from(testimonialsTitle, {
        scrollTrigger: {
          trigger: testimonialsSection,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: -30,
        duration: 0.6,
        clearProps: 'all'
      });
    }
  }
  
  return {
    init: initAnimations
  };
})();

// Smooth Scroll Module
const SmoothScrollModule = (function() {
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', handleSmoothScroll);
    });
  }
  
  function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    // I'm checking if href is just "#"
    if (href === '#' || !href) {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (!target) return;
    
    e.preventDefault();
    
    // I'm closing mobile menu if open
    NavigationModule.close();
    
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  return {
    init: initSmoothScroll
  };
})();

// Form Validation Module
const FormValidationModule = (function() {
  function initFormValidation() {
    const form = document.querySelector('#contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // I'm adding real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(input);
      });
      
      // I'm clearing errors on input
      input.addEventListener('input', function() {
        if (input.classList.contains('error')) {
          input.classList.remove('error');
          const errorElement = input.parentElement.querySelector('.form-error');
          if (errorElement) {
            errorElement.textContent = '';
          }
        }
      });
    });
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    // I'm validating all required fields
    inputs.forEach(function(input) {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // I'm adding loading state
      if (submitBtn) {
        submitBtn.classList.add('btn--loading');
        submitBtn.disabled = true;
      }
      
      // I'm simulating form submission (replace with actual submission)
      setTimeout(function() {
        if (submitBtn) {
          submitBtn.classList.remove('btn--loading');
          submitBtn.disabled = false;
        }
        showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
        form.reset();
      }, 1500);
    } else {
      showMessage('error', 'Please fill in all required fields correctly.');
    }
  }
  
  function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.form-error');
    
    // I'm clearing previous error
    field.classList.remove('error', 'success');
    if (errorElement) {
      errorElement.textContent = '';
    }
    
    // I'm checking if field is empty
    if (field.hasAttribute('required') && value === '') {
      showFieldError(field, 'This field is required');
      return false;
    }
    
    // I'm validating email
    if (field.type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }
    
    // I'm validating min length
    if (field.hasAttribute('minlength')) {
      const minLength = parseInt(field.getAttribute('minlength'));
      if (value.length < minLength) {
        showFieldError(field, `Minimum ${minLength} characters required`);
        return false;
      }
    }
    
    // I'm marking field as valid
    field.classList.add('success');
    return true;
  }
  
  function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
  
  function showMessage(type, message) {
    const messageElement = document.querySelector('.form-message');
    if (!messageElement) {
      // I'm creating message element if it doesn't exist
      const newMessage = document.createElement('div');
      newMessage.className = 'form-message ' + type;
      newMessage.textContent = message;
      const form = document.querySelector('#contactForm');
      if (form) {
        form.insertAdjacentElement('beforebegin', newMessage);
      }
      return;
    }
    
    messageElement.className = 'form-message ' + type;
    messageElement.textContent = message;
    
    // I'm hiding message after 5 seconds
    setTimeout(function() {
      messageElement.className = 'form-message';
      messageElement.textContent = '';
    }, 5000);
  }
  
  return {
    init: initFormValidation
  };
})();

// Project Filter Module
const ProjectFilterModule = (function() {
  function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        handleFilter(button, projectCards, filterButtons);
      });
    });
  }
  
  function handleFilter(button, cards, buttons) {
    const filter = button.getAttribute('data-filter');
    
    // I'm updating active button
    buttons.forEach(function(btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // I'm checking if GSAP is available
    if (typeof gsap === 'undefined') {
      // I'm using simple show/hide without animation
      cards.forEach(function(card) {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
      return;
    }
    
    // I'm filtering cards with GSAP animation
    cards.forEach(function(card, index) {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        // I'm showing card
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: index * 0.05,
          onStart: function() {
            card.classList.remove('hidden');
            card.style.display = 'block';
          },
          clearProps: 'all'
        });
      } else {
        // I'm hiding card
        gsap.to(card, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          onComplete: function() {
            card.classList.add('hidden');
            card.style.display = 'none';
          }
        });
      }
    });
  }
  
  return {
    init: initProjectFilter
  };
})();

// Testimonials Slider Module
const TestimonialsModule = (function() {
  let currentSlide = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000; // 5 seconds
  
  // Testimonials Data Array
  const testimonialsData = [
    {
      quote: "Working with Ajay was an absolute pleasure. His attention to detail and creative approach brought our vision to life in ways we never imagined.",
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Inc."
    },
    {
      quote: "Ajay's UI/UX expertise transformed our product completely. User engagement increased by 200% after the redesign. Highly recommended!",
      name: "Michael Chen",
      role: "Product Manager",
      company: "StartupXYZ"
    },
    {
      quote: "Professional, creative, and efficient. Ajay delivered beyond our expectations and on time. His design skills are truly exceptional.",
      name: "Emily Rodriguez",
      role: "CEO",
      company: "Digital Solutions Ltd."
    },
    {
      quote: "The best designer we've worked with. Ajay's ability to understand our brand and translate it into stunning visuals is remarkable.",
      name: "David Thompson",
      role: "Creative Director",
      company: "BrandStudio"
    },
    {
      quote: "Ajay doesn't just design interfaces, he creates experiences. Our users love the new design and so do we!",
      name: "Lisa Wang",
      role: "Founder",
      company: "InnovateTech"
    }
  ];
  
  function initTestimonials() {
    const sliderContainer = document.querySelector('.testimonials__slider');
    const dotsContainer = document.querySelector('.testimonials__dots');
    
    if (!sliderContainer || !dotsContainer) return;
    
    // I'm rendering testimonials
    renderTestimonials(sliderContainer);
    
    // I'm rendering dots
    renderDots(dotsContainer);
    
    // I'm getting rendered elements
    const testimonialItems = document.querySelectorAll('.testimonials__item');
    const dots = document.querySelectorAll('.testimonials__dots .dot');
    
    if (testimonialItems.length === 0) return;
    
    // I'm ensuring first slide is active
    testimonialItems[0].classList.add('active');
    dots[0].classList.add('active');
    
    // I'm adding click events to dots
    dots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        goToSlide(index, testimonialItems, dots);
        resetAutoplay(testimonialItems, dots);
      });
    });
    
    // I'm adding keyboard navigation
    document.addEventListener('keydown', function(e) {
      const testimonialsSection = document.querySelector('.testimonials');
      if (!testimonialsSection) return;
      
      const rect = testimonialsSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        if (e.key === 'ArrowLeft') {
          previousSlide(testimonialItems, dots);
          resetAutoplay(testimonialItems, dots);
        } else if (e.key === 'ArrowRight') {
          nextSlide(testimonialItems, dots);
          resetAutoplay(testimonialItems, dots);
        }
      }
    });
    
    // I'm starting auto-play
    startAutoplay(testimonialItems, dots);
    
    // I'm pausing on hover
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
      testimonialsSection.addEventListener('mouseenter', stopAutoplay);
      testimonialsSection.addEventListener('mouseleave', function() {
        startAutoplay(testimonialItems, dots);
      });
    }
    
    console.log('Testimonials initialized with ' + testimonialsData.length + ' items');
  }
  
  function renderTestimonials(container) {
    container.innerHTML = '';
    
    testimonialsData.forEach(function(testimonial, index) {
      const item = document.createElement('div');
      item.className = 'testimonials__item';
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
      container.appendChild(item);
    });
  }
  
  function renderDots(container) {
    container.innerHTML = '';
    
    testimonialsData.forEach(function(testimonial, index) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.setAttribute('type', 'button');
      container.appendChild(dot);
    });
  }
  
  function goToSlide(index, items, dots) {
    // I'm hiding current slide
    items[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // I'm showing new slide
    currentSlide = index;
    items[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  function nextSlide(items, dots) {
    const nextIndex = (currentSlide + 1) % items.length;
    goToSlide(nextIndex, items, dots);
  }
  
  function previousSlide(items, dots) {
    const prevIndex = (currentSlide - 1 + items.length) % items.length;
    goToSlide(prevIndex, items, dots);
  }
  
  function startAutoplay(items, dots) {
    if (autoplayInterval) return;
    
    autoplayInterval = setInterval(function() {
      nextSlide(items, dots);
    }, AUTOPLAY_DELAY);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  
  function resetAutoplay(items, dots) {
    stopAutoplay();
    startAutoplay(items, dots);
  }
  
  return {
    init: initTestimonials,
    addTestimonial: function(testimonial) {
      testimonialsData.push(testimonial);
    },
    getData: function() {
      return testimonialsData;
    }
  };
})();

// Lazy Loading Images Module
const LazyLoadModule = (function() {
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(function(img) {
      imageObserver.observe(img);
    });
  }
  
  return {
    init: initLazyLoad
  };
})();

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  NavigationModule.init();
  VideoPlayerModule.init();
  AnimationsModule.init();
  SmoothScrollModule.init();
  FormValidationModule.init();
  ProjectFilterModule.init();
  TestimonialsModule.init();
  LazyLoadModule.init();
  
  console.log('Portfolio initialized successfully');
});
