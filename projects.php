<?php

use Portfolio\Database;

spl_autoload_register(function ($class) {
    $class = str_replace('Portfolio\\', '', $class);
    $class = str_replace("\\", DIRECTORY_SEPARATOR, $class);
    $filepath = __DIR__ . '/includes/classes/' . $class . '.php';
    $filepath = str_replace("/", DIRECTORY_SEPARATOR, $filepath);
    require_once $filepath;
});

$database = new Database();
$projects = $database->query(
    'SELECT projects.*, categories.name AS category_name
     FROM projects
     LEFT JOIN categories ON projects.category_id = categories.id
     ORDER BY projects.sort_order ASC'
);

// I'm mapping category names to filter slugs for the JS filter system
$categoryMap = [
    'Web Development' => 'web-design',
    'UI/UX Design'    => 'branding',
    'Motion Design'   => 'motion'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Projects by Ajay Chakaravarthy Antony Raj">
  <title>Projects - Ajay Antony Raj</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/grid.css">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
</head>
<body data-page="projects">

  <canvas id="page-canvas"></canvas>

  <div class="page-transition"></div>
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>

  <header class="header">
    <div class="grid-con">
      <nav class="header__nav col-span-4 m-col-span-12 l-col-span-12">
        <a href="index.html" class="header__logo">
          <img src="images/logo.svg" alt="Ajay Antony Raj Logo">
        </a>
        <div class="nav__menu">
          <a href="index.html" class="nav__link">HOME</a>
          <a href="about.html" class="nav__link">ABOUT</a>
          <a href="projects.php" class="nav__link active">WORK</a>
          <a href="contact.php" class="nav__link">CONTACT</a>
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

  <div class="mobile-menu" id="mobileMenu">
    <button class="mobile-menu__close" id="closeMenuBtn" aria-label="Close menu">
      <i class="fas fa-times"></i>
    </button>
    <div class="mobile-menu__content">
      <nav class="mobile-menu__list">
        <a href="index.html" class="mobile-menu__link">HOME</a>
        <a href="about.html" class="mobile-menu__link">ABOUT</a>
        <a href="projects.php" class="mobile-menu__link">WORK</a>
        <a href="contact.php" class="mobile-menu__link">CONTACT</a>
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

    <section class="projects-header">
      <div class="container">
        <h1 class="projects__title">Featured Projects</h1>
        <div class="projects__filters">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="web-design">Web Design</button>
          <button class="filter-btn" data-filter="branding">Branding</button>
          <button class="filter-btn" data-filter="motion">Motion Graphics</button>
        </div>
      </div>
    </section>

    <section class="projects-section">
      <div class="container">
        <div class="projects__grid">

          <?php foreach ($projects as $index => $project): ?>
          <?php $filterSlug = $categoryMap[$project['category_name']] ?? 'web-design'; ?>
          <div class="project-card" data-category="<?php echo $filterSlug; ?>">
            <a href="case-study.php?id=<?php echo $project['id']; ?>" class="project-card__image-link">
              <div class="project-card__image">
                <img src="<?php echo htmlspecialchars($project['image']); ?>" alt="<?php echo htmlspecialchars($project['title']); ?>">
                <div class="project-card__hover">
                  <span class="project-card__hover-cta">View Case Study <i class="fas fa-arrow-right"></i></span>
                </div>
              </div>
            </a>
            <div class="project-card__content">
              <div class="project-card__number"><?php echo str_pad($index + 1, 2, '0', STR_PAD_LEFT); ?></div>
              <h3 class="project-card__title"><?php echo htmlspecialchars($project['title']); ?></h3>
              <p class="project-card__description"><?php echo htmlspecialchars($project['description']); ?></p>
              <div class="project-card__tags">
                <?php
                $tags = explode(',', $project['technologies']);
                foreach ($tags as $tag): ?>
                <span class="tag"><?php echo trim(htmlspecialchars($tag)); ?></span>
                <?php endforeach; ?>
              </div>
              <div class="project-card__links">
                <a href="case-study.php?id=<?php echo $project['id']; ?>" class="btn btn--small btn--primary">Case Study</a>
                <?php if (!empty($project['github_url'])): ?>
                <a href="<?php echo htmlspecialchars($project['github_url']); ?>" target="_blank" class="btn btn--small btn--outline">
                  <i class="fab fa-github"></i> Code
                </a>
                <?php endif; ?>
                <?php if (!empty($project['live_url'])): ?>
                <a href="<?php echo htmlspecialchars($project['live_url']); ?>" target="_blank" class="btn btn--small btn--outline">Live Site</a>
                <?php endif; ?>
              </div>
            </div>
          </div>
          <?php endforeach; ?>

        </div>
      </div>
    </section>

  </main>

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
          <li><a href="projects.php" class="active">Work</a></li>
          <li><a href="contact.php">Contact</a></li>
        </ul>
      </nav>
      <div class="footer__social">
        <a href="mailto:contact.ajayantony@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
        <a href="https://www.linkedin.com/in/ajayantonyraj/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/ajaymystic" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
      </div>
      <div class="footer__copyright">
        <p>&copy; <?php echo date('Y'); ?> Ajay Chakaravarthy Antony Raj. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
  <script type="module" src="js/main.js"></script>
</body>
</html>
