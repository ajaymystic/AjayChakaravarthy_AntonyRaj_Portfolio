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

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

$result = $database->query(
    'SELECT projects.*, categories.name AS category_name
     FROM projects
     LEFT JOIN categories ON projects.category_id = categories.id
     WHERE projects.id = :id',
    ['id' => $id]
);

if (empty($result)) {
    header('Location: projects.php');
    exit;
}

$project = $result[0];

// I'm building prev/next nav from all project IDs ordered by sort_order
$allProjects = $database->query('SELECT id, title FROM projects ORDER BY sort_order ASC');
$currentIndex = 0;
foreach ($allProjects as $i => $p) {
    if ((int)$p['id'] === $id) {
        $currentIndex = $i;
        break;
    }
}

$prevProject = $currentIndex > 0 ? $allProjects[$currentIndex - 1] : null;
$nextProject = $currentIndex < count($allProjects) - 1 ? $allProjects[$currentIndex + 1] : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="<?php echo htmlspecialchars($project['title']); ?> — Ajay Antony Raj">
  <title><?php echo htmlspecialchars($project['title']); ?> - Ajay Antony Raj</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/grid.css">
  <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
</head>
<body data-page="casestudy">

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
        <a href="projects.php" class="mobile-menu__link active">WORK</a>
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

    <section class="cs-hero">
      <div class="container">
        <a href="projects.php" class="cs-back">
          <i class="fas fa-arrow-left"></i> Back to Projects
        </a>
        <div class="cs-hero__meta">
          <span class="cs-hero__category"><?php echo htmlspecialchars($project['category_name']); ?></span>
        </div>
        <h1 class="cs-hero__title"><?php echo htmlspecialchars($project['title']); ?></h1>
        <p class="cs-hero__description"><?php echo htmlspecialchars($project['description']); ?></p>
        <div class="cs-hero__tags">
          <?php
          $tags = explode(',', $project['technologies']);
          foreach ($tags as $tag): ?>
          <span class="tag"><?php echo trim(htmlspecialchars($tag)); ?></span>
          <?php endforeach; ?>
        </div>
        <div class="cs-hero__links">
          <?php if (!empty($project['github_url'])): ?>
          <a href="<?php echo htmlspecialchars($project['github_url']); ?>" target="_blank" class="btn btn--outline-light">
            <i class="fab fa-github"></i> View Code
          </a>
          <?php endif; ?>
          <?php if (!empty($project['live_url'])): ?>
          <a href="<?php echo htmlspecialchars($project['live_url']); ?>" target="_blank" class="btn btn--primary">
            Live Site <i class="fas fa-external-link-alt"></i>
          </a>
          <?php endif; ?>
        </div>
      </div>
    </section>

    <section class="cs-gallery">
      <div class="container">
        <div class="cs-gallery__grid">

          <div class="cs-gallery__main">
            <?php if (!empty($project['image'])): ?>
            <img src="<?php echo htmlspecialchars($project['image']); ?>" alt="<?php echo htmlspecialchars($project['title']); ?>">
            <?php else: ?>
            <div class="cs-gallery__placeholder">
              <i class="fas fa-image"></i>
              <span>Image coming soon</span>
            </div>
            <?php endif; ?>
          </div>

          <div class="cs-gallery__secondary">
            <div class="cs-gallery__thumb">
              <?php if (!empty($project['image_2'])): ?>
              <img src="<?php echo htmlspecialchars($project['image_2']); ?>" alt="<?php echo htmlspecialchars($project['title']); ?> detail">
              <?php else: ?>
              <div class="cs-gallery__placeholder">
                <i class="fas fa-image"></i>
                <span>Image coming soon</span>
              </div>
              <?php endif; ?>
            </div>
            <div class="cs-gallery__thumb">
              <?php if (!empty($project['image_3'])): ?>
              <img src="<?php echo htmlspecialchars($project['image_3']); ?>" alt="<?php echo htmlspecialchars($project['title']); ?> detail">
              <?php else: ?>
              <div class="cs-gallery__placeholder">
                <i class="fas fa-image"></i>
                <span>Image coming soon</span>
              </div>
              <?php endif; ?>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="cs-content">
      <div class="container">
        <div class="cs-content__grid">

          <?php if (!empty($project['overview'])): ?>
          <div class="cs-block">
            <span class="cs-block__label">Overview</span>
            <p class="cs-block__text"><?php echo htmlspecialchars($project['overview']); ?></p>
          </div>
          <?php endif; ?>

          <?php if (!empty($project['problem'])): ?>
          <div class="cs-block">
            <span class="cs-block__label">The Problem</span>
            <p class="cs-block__text"><?php echo htmlspecialchars($project['problem']); ?></p>
          </div>
          <?php endif; ?>

          <?php if (!empty($project['solution'])): ?>
          <div class="cs-block">
            <span class="cs-block__label">The Solution</span>
            <p class="cs-block__text"><?php echo htmlspecialchars($project['solution']); ?></p>
          </div>
          <?php endif; ?>

        </div>
      </div>
    </section>

    <section class="cs-nav">
      <div class="container">
        <div class="cs-nav__inner">
          <?php if ($prevProject): ?>
          <a href="case-study.php?id=<?php echo $prevProject['id']; ?>" class="cs-nav__link cs-nav__link--prev">
            <span class="cs-nav__dir"><i class="fas fa-arrow-left"></i> Previous</span>
            <span class="cs-nav__title"><?php echo htmlspecialchars($prevProject['title']); ?></span>
          </a>
          <?php else: ?>
          <div></div>
          <?php endif; ?>

          <?php if ($nextProject): ?>
          <a href="case-study.php?id=<?php echo $nextProject['id']; ?>" class="cs-nav__link cs-nav__link--next">
            <span class="cs-nav__dir">Next <i class="fas fa-arrow-right"></i></span>
            <span class="cs-nav__title"><?php echo htmlspecialchars($nextProject['title']); ?></span>
          </a>
          <?php else: ?>
          <div></div>
          <?php endif; ?>
        </div>
      </div>
    </section>

  </main>

  <footer class="footer">
    <div class="footer__container">
      <div class="footer__logo">
        <a href="index.html"><img src="images/logo.svg" alt="Ajay Antony Raj Logo"></a>
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
