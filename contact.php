<!DOCTYPE html>
<html lang="en">
<?php
//Error reporting, turn off when we launch
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Contact Ajay Chakaravarthy Antony Raj">
  <title>Contact - Ajay Antony Raj</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/grid.css">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
</head>
<body>
  
  <!-- Header -->
  <header class="header">
  <div class="grid-con">
    <nav class="header__nav col-span-4 m-col-span-12 l-col-span-12">
      <a href="index.html" class="header__logo">
        <img src="images/logo.svg" alt="Ajay Antony Raj Logo">
      </a>
      
      <!-- Desktop Navigation (Show on Desktop Only) -->
      <div class="nav__menu">
        <a href="index.html" class="nav__link">HOME</a>
        <a href="about.html" class="nav__link">ABOUT</a>
        <a href="projects.html" class="nav__link">WORK</a>
        <a href="contact.php" class="nav__link active">CONTACT</a>
      </div>
      
      <!-- Social Icons (Desktop Only) -->
      <div class="nav__social-icons">
        <a href="mailto:a_chakaravarthyantonyraj@fanshaweonline.ca" class="nav__social-link" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
        <a href="https://linkedin.com/in/yourprofile" class="nav__social-link" target="_blank" aria-label="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/yourprofile" class="nav__social-link" target="_blank" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
      </div>
      
      <!-- Hamburger Menu (Mobile/Tablet) -->
      <button class="hamburger" id="hamburgerBtn" aria-label="Toggle menu">
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
      </button>
    </nav>
  </div>
</header>

<!-- Mobile Menu Overlay -->
<div class="mobile-menu" id="mobileMenu">
  <!-- Close Button -->
  <button class="mobile-menu__close" id="closeMenuBtn" aria-label="Close menu">
    <i class="fas fa-times"></i>
  </button>
  
  <div class="mobile-menu__content">
    <nav class="mobile-menu__list">
      <a href="index.html" class="mobile-menu__link">HOME</a>
      <a href="about.html" class="mobile-menu__link">ABOUT</a>
      <a href="projects.html" class="mobile-menu__link">WORK</a>
      <a href="contact.php" class="mobile-menu__link active">CONTACT</a>
    </nav>
    
    <div class="mobile-menu__social">
      <a href="mailto:a_chakaravarthyantonyraj@fanshaweonline.ca" class="mobile-menu__social-link" aria-label="Email">
        <i class="fas fa-envelope"></i>
      </a>
      <a href="https://linkedin.com/in/yourprofile" class="mobile-menu__social-link" target="_blank" aria-label="LinkedIn">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com/yourprofile" class="mobile-menu__social-link" target="_blank" aria-label="GitHub">
        <i class="fab fa-github"></i>
      </a>
    </div>
  </div>
</div>
  
  <!-- Main Content -->
  <main>
    
    <!-- Contact Header -->
    <section class="contact__header">
      <div class="container">
        <h1>Contact Me</h1>
        <p>Let's turn ideas into awesome things. Your move.</p>
      </div>
    </section>
    
    <!-- Contact Form -->
    <section class="contact__form-section">
      <div class="container">
        
        <!-- Success/Error Message Display -->
        <?php if (isset($_GET['msg'])): ?>
          <div class="form-message <?php echo (isset($_GET['success'])) ? 'success' : 'error'; ?>">
            <?php echo htmlspecialchars($_GET['msg'], ENT_QUOTES, 'UTF-8'); ?>
          </div>
        <?php endif; ?>
        
        <form class="contact__form" id="contactForm" method="post" action="includes/send.php">
          
          <div class="form-row">
            <div class="form-group">
              <input type="text" id="first_name" name="first_name" placeholder="First Name*" required>
              <span class="form-error"></span>
            </div>
            
            <div class="form-group">
              <input type="text" id="last_name" name="last_name" placeholder="Last Name*" required>
              <span class="form-error"></span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <input type="email" id="email" name="email" placeholder="E-mail*" required>
              <span class="form-error"></span>
            </div>
            
            <div class="form-group">
              <input type="text" id="social" name="social" placeholder="Social Media (Optional)">
            </div>
          </div>
          
          <div class="form-group">
            <textarea id="message" name="message" rows="6" placeholder="Message*" required minlength="10"></textarea>
            <span class="form-error"></span>
          </div>
          
          <div class="text-center">
            <button type="submit" class="btn btn--primary btn-submit">Hit It !</button>
          </div>
          
        </form>
      </div>
    </section>
    
    <!-- Contact Methods -->
    <section class="contact__methods">
      <div class="container">
        <div class="contact__methods-grid">
          
          <div class="contact__methods-item">
            <div class="contact-icon">
              <i class="fab fa-linkedin"></i>
            </div>
            <h3>LinkedIn</h3>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" class="btn btn--small btn--primary">
              Click Here
            </a>
          </div>
          
          <div class="contact__methods-item">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <h3>E-Mail</h3>
            <a href="mailto:a_chakaravarthyantonyraj@fanshaweonline.ca" class="btn btn--small btn--primary">
              Click Here
            </a>
          </div>
          
          <div class="contact__methods-item">
            <div class="contact-icon">
              <i class="fab fa-discord"></i>
            </div>
            <h3>Discord</h3>
            <a href="#" class="btn btn--small btn--primary">
              Click Here
            </a>
          </div>
          
        </div>
      </div>
    </section>
    
  </main>
  
  
  <!-- Footer -->
<footer class="footer">
  <div class="footer__container">
    <!-- Logo -->
    <div class="footer__logo">
      <a href="index.html">
        <img src="images/logo.svg" alt="Ajay Antony Raj Logo">
      </a>
    </div>
    
    <!-- Navigation -->
    <nav class="footer__nav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="projects.html">Work</a></li>
        <li><a href="contact.php" class="active">Contact</a></li>
      </ul>
    </nav>
    
    <!-- Social Links -->
    <div class="footer__social">
      <a href="mailto:a_chakaravarthyantonyraj@fanshaweonline.ca" aria-label="Email">
        <i class="fas fa-envelope"></i>
      </a>
      <a href="https://linkedin.com/in/yourprofile" target="_blank" aria-label="LinkedIn">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com/yourprofile" target="_blank" aria-label="GitHub">
        <i class="fab fa-github"></i>
      </a>
    </div>
    
    <!-- Copyright with Date/Time (Class Requirement) -->
    <div class="footer__copyright">
      <p>&copy; <?php echo date('Y'); ?> Ajay Chakaravarthy Antony Raj. All rights reserved.</p>
      <p><?php 
        date_default_timezone_set('America/Toronto');
        echo date('F j, Y, g:i a');
      ?></p>
    </div>
  </div>
</footer>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="js/main.js"></script>
  
</body>
</html>