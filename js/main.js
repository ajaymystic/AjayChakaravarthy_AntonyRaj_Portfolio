// Navigation Module
const NavigationModule = (function() {
  const hamburger = document.querySelector('.hamburger');
  const closeMenuBtn = document.querySelector('.mobile-menu__close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const header = document.querySelector('.header');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  
  function initNavigation() {
    if (!hamburger || !mobileMenu) return;
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking any navigation link
    mobileLinks.forEach(addCloseLinkHandler);
    
    mobileMenu.addEventListener('click', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscapeKey);
  }
  
  function addCloseLinkHandler(link) {
    link.addEventListener('click', closeMobileMenu);
  }
  
  function handleOutsideClick(e) {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  }
  
  function handleEscapeKey(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  }
  
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
    
    if (!player) return;
    
    if (typeof Plyr === 'undefined') {
      console.warn('Plyr is not loaded');
      return;
    }
    
    // Custom controls for demo reel playback
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
    
    plyrInstance.on('play', handleVideoPlay);
    plyrInstance.on('pause', handleVideoPause);
    plyrInstance.on('ended', handleVideoEnd);
  }
  
  function handleVideoPlay() {
    console.log('Video is playing');
  }
  
  function handleVideoPause() {
    console.log('Video is paused');
  }
  
  function handleVideoEnd() {
    console.log('Video ended');
  }
  
  return {
    init: initVideoPlayer,
    getInstance: function() { return plyrInstance; }
  };
})();

// Animations Module
const AnimationsModule = (function() {
  function initAnimations() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP is not loaded, skipping animations');
      return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    animateHero();
    animateCards();
    animateSkills();
    animateProjects();
    animateVideoSection();
    animateCTA();
    animateTestimonials();
  }
  
  function animateHero() {
    const heroContent = document.querySelector('.hero__content');
    const heroImage = document.querySelector('.hero__image-container');
    
    if (!heroContent) return;
    
    // Set initial visibility before animation
    gsap.set(heroContent, { opacity: 1, visibility: 'visible' });
    if (heroImage) gsap.set(heroImage, { opacity: 1, visibility: 'visible' });
    
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
    
    gsap.set(cards, { opacity: 1, visibility: 'visible' });
    
    cards.forEach(animateSingleCard);
  }
  
  function animateSingleCard(card) {
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
  }
  
  function animateSkills() {
    const skillCategories = document.querySelectorAll('.skills__category');
    
    if (skillCategories.length === 0) return;
    
    gsap.set(skillCategories, { opacity: 1, visibility: 'visible' });
    
    skillCategories.forEach(animateSingleSkill);
  }
  
  function animateSingleSkill(category, index) {
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
  }
  
  function animateProjects() {
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    
    if (projectCards.length === 0) return;
    
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
    links.forEach(addSmoothScrollHandler);
  }
  
  function addSmoothScrollHandler(link) {
    link.addEventListener('click', handleSmoothScroll);
  }
  
  function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    if (href === '#' || !href) {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (!target) return;
    
    e.preventDefault();
    
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
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(addInputValidation);
  }
  
  function addInputValidation(input) {
    input.addEventListener('blur', handleFieldBlur);
    input.addEventListener('input', handleFieldInput);
  }
  
  function handleFieldBlur() {
    validateField(this);
  }
  
  function handleFieldInput() {
    if (this.classList.contains('error')) {
      this.classList.remove('error');
      const errorElement = this.parentElement.querySelector('.form-error');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(checkFieldValidity);
    
    function checkFieldValidity(input) {
      if (!validateField(input)) {
        isValid = false;
      }
    }
    
    if (isValid) {
      if (submitBtn) {
        submitBtn.classList.add('btn--loading');
        submitBtn.disabled = true;
      }
      
      // Form submits to PHP handler automatically
      // This timeout is for demonstration only
      setTimeout(completeSubmission, 1500);
      
      function completeSubmission() {
        if (submitBtn) {
          submitBtn.classList.remove('btn--loading');
          submitBtn.disabled = false;
        }
        showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
        form.reset();
      }
    } else {
      showMessage('error', 'Please fill in all required fields correctly.');
    }
  }
  
  function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.form-error');
    
    field.classList.remove('error', 'success');
    if (errorElement) {
      errorElement.textContent = '';
    }
    
    if (field.hasAttribute('required') && value === '') {
      showFieldError(field, 'This field is required');
      return false;
    }
    
    if (field.type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }
    
    if (field.hasAttribute('minlength')) {
      const minLength = parseInt(field.getAttribute('minlength'));
      if (value.length < minLength) {
        showFieldError(field, `Minimum ${minLength} characters required`);
        return false;
      }
    }
    
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
    
    setTimeout(clearMessage, 5000);
    
    function clearMessage() {
      messageElement.className = 'form-message';
      messageElement.textContent = '';
    }
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
    
    filterButtons.forEach(addFilterHandler);
    
    function addFilterHandler(button) {
      button.addEventListener('click', handleFilterClick);
      
      function handleFilterClick() {
        handleFilter(button, projectCards, filterButtons);
      }
    }
  }
  
  function handleFilter(button, cards, buttons) {
    const filter = button.getAttribute('data-filter');
    
    buttons.forEach(removeActiveClass);
    button.classList.add('active');
    
    function removeActiveClass(btn) {
      btn.classList.remove('active');
    }
    
    if (typeof gsap === 'undefined') {
      cards.forEach(simpleFilterCard);
      return;
    }
    
    cards.forEach(animatedFilterCard);
    
    function simpleFilterCard(card) {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    }
    
    function animatedFilterCard(card, index) {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: index * 0.05,
          onStart: showCard,
          clearProps: 'all'
        });
        
        function showCard() {
          card.classList.remove('hidden');
          card.style.display = 'block';
        }
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          onComplete: hideCard
        });
        
        function hideCard() {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      }
    }
  }
  
  return {
    init: initProjectFilter
  };
})();

// Testimonials Slider Module
const TestimonialsModule = (function() {
  let currentSlide = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000;
  
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
    
    renderTestimonials(sliderContainer);
    renderDots(dotsContainer);
    
    const testimonialItems = document.querySelectorAll('.testimonials__item');
    const dots = document.querySelectorAll('.testimonials__dots .dot');
    
    if (testimonialItems.length === 0) return;
    
    testimonialItems[0].classList.add('active');
    dots[0].classList.add('active');
    
    dots.forEach(addDotClickHandler);
    
    function addDotClickHandler(dot, index) {
      dot.addEventListener('click', handleDotClick);
      
      function handleDotClick() {
        goToSlide(index, testimonialItems, dots);
        resetAutoplay(testimonialItems, dots);
      }
    }
    
    document.addEventListener('keydown', handleKeyboardNav);
    
    function handleKeyboardNav(e) {
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
    }
    
    startAutoplay(testimonialItems, dots);
    
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
      testimonialsSection.addEventListener('mouseenter', stopAutoplay);
      testimonialsSection.addEventListener('mouseleave', handleMouseLeave);
      
      function handleMouseLeave() {
        startAutoplay(testimonialItems, dots);
      }
    }
    
    console.log('Testimonials initialized with ' + testimonialsData.length + ' items');
  }
  
  function renderTestimonials(container) {
    container.innerHTML = '';
    
    testimonialsData.forEach(createTestimonialElement);
    
    function createTestimonialElement(testimonial) {
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
    }
  }
  
  function renderDots(container) {
    container.innerHTML = '';
    
    testimonialsData.forEach(createDotElement);
    
    function createDotElement(testimonial, index) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.setAttribute('type', 'button');
      container.appendChild(dot);
    }
  }
  
  function goToSlide(index, items, dots) {
    items[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    items[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  function nextSlide(items, dots) {
    let nextIndex = currentSlide + 1;
    
    
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }
    
    goToSlide(nextIndex, items, dots);
  }
  
  function previousSlide(items, dots) {
    let prevIndex = currentSlide - 1;
    
    
    if (prevIndex < 0) {
      prevIndex = items.length - 1;
    }
    
    goToSlide(prevIndex, items, dots);
  }
  
  function startAutoplay(items, dots) {
    if (autoplayInterval) return;
    
    autoplayInterval = setInterval(handleAutoplayTick, AUTOPLAY_DELAY);
    
    function handleAutoplayTick() {
      nextSlide(items, dots);
    }
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

// Initialize all modules 
NavigationModule.init();
VideoPlayerModule.init();
AnimationsModule.init();
SmoothScrollModule.init();
FormValidationModule.init();
ProjectFilterModule.init();
TestimonialsModule.init();

console.log('Portfolio initialized successfully');