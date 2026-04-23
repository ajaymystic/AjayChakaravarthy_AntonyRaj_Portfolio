<!DOCTYPE html>
<html lang="en">
<?php
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
<body data-page="contact">

  <canvas id="page-canvas"></canvas>

  <!-- Page transition overlay -->
  <div class="page-transition"></div>

  <!-- Custom cursor -->
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>

  <!-- Header -->
  <header class="header">
    <div class="grid-con">
      <nav class="header__nav col-span-4 m-col-span-12 l-col-span-12">
        <a href="index.html" class="header__logo">
          <img src="images/logo.svg" alt="Ajay Antony Raj Logo">
        </a>

        <div class="nav__menu">
          <a href="index.html" class="nav__link">HOME</a>
          <a href="about.html" class="nav__link">ABOUT</a>
          <a href="projects.php" class="nav__link">WORK</a>
          <a href="contact.php" class="nav__link active">CONTACT</a>
        </div>

        <div class="nav__social-icons">
          <a href="mailto:contact.ajayantony@gmail.com" class="nav__social-link" aria-label="Email">
            <i class="fas fa-envelope"></i>
          </a>
          <a href="https://www.linkedin.com/in/ajayantonyraj/" class="nav__social-link" target="_blank" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/ajaymystic" class="nav__social-link" target="_blank" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
        </div>

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
    <button class="mobile-menu__close" id="closeMenuBtn" aria-label="Close menu">
      <i class="fas fa-times"></i>
    </button>
    <div class="mobile-menu__content">
      <nav class="mobile-menu__list">
        <a href="index.html" class="mobile-menu__link">HOME</a>
        <a href="about.html" class="mobile-menu__link">ABOUT</a>
        <a href="projects.php" class="mobile-menu__link">WORK</a>
        <a href="contact.php" class="mobile-menu__link active">CONTACT</a>
      </nav>
      <div class="mobile-menu__social">
        <a href="mailto:contact.ajayantony@gmail.com" class="mobile-menu__social-link" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
        <a href="https://www.linkedin.com/in/ajayantonyraj/" class="mobile-menu__social-link" target="_blank" aria-label="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/ajaymystic" class="mobile-menu__social-link" target="_blank" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </div>
  </div>

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

        <!-- AJAX feedback -->
        <div id="feedback"></div>

        <form class="contact__form" id="contactForm" method="post" action="includes/send.php">

          <!-- Honeypot — invisible to real users, bots fill it -->
          <div style="display:none" aria-hidden="true">
            <label for="website">Website</label>
            <input type="text" name="website" id="website" tabindex="-1" autocomplete="off">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="first_name">First Name *</label>
              <input type="text" id="first_name" name="first_name" placeholder="e.g. Ajay" required>
              <span class="form-error"></span>
            </div>

            <div class="form-group">
              <label for="last_name">Last Name *</label>
              <input type="text" id="last_name" name="last_name" placeholder="e.g. Antony Raj" required>
              <span class="form-error"></span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input type="email" id="email" name="email" placeholder="yourname@domain.com" required>
              <span class="form-error"></span>
            </div>

            <div class="form-group">
              <label for="social">Social Media <span style="opacity:0.5">(Optional)</span></label>
              <input type="text" id="social" name="social" placeholder="e.g. linkedin.com/in/yourname">
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="6" placeholder="Tell me about your project..." required minlength="10"></textarea>
            <span class="form-error"></span>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn--primary btn-submit">Send Message</button>
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
            <a href="https://www.linkedin.com/in/ajayantonyraj/" target="_blank" class="btn btn--small btn--primary">
              Connect
            </a>
          </div>

          <div class="contact__methods-item">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <a href="mailto:contact.ajayantony@gmail.com" class="btn btn--small btn--primary">
              Write Me
            </a>
          </div>

          <div class="contact__methods-item">
            <div class="contact-icon">
              <i class="fab fa-github"></i>
            </div>
            <h3>GitHub</h3>
            <a href="https://github.com/ajaymystic" target="_blank" class="btn btn--small btn--primary">
              View Code
            </a>
          </div>

        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__logo">
        <a href="index.html">
          <img src="images/logo.svg" alt="Ajay Antony Raj Logo">
        </a>
      </div>
      <nav class="footer__nav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="projects.php">Work</a></li>
          <li><a href="contact.php" class="active">Contact</a></li>
        </ul>
      </nav>
      <div class="footer__social">
        <a href="mailto:contact.ajayantony@gmail.com" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
        <a href="https://www.linkedin.com/in/ajayantonyraj/" target="_blank" aria-label="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/ajaymystic" target="_blank" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <div class="footer__copyright">
        <p>&copy; <?php echo date('Y'); ?> Ajay Chakaravarthy Antony Raj. All rights reserved.</p>
        <p><?php
          date_default_timezone_set('America/Toronto');
          echo date('F j, Y, g:i a');
        ?></p>
      </div>
    </div>
  </footer>

  <!-- GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <!-- Font Awesome -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
  <!-- Main JS module -->
  <script type="module" src="js/main.js"></script>

</body>
</html>
