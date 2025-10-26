console.log("js is loaded");

// Variable declarations
const hamburger = document.querySelector('#hamburger');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const videoPlayer = document.querySelector('#player');

// Hamburger menu toggle function
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // I'm preventing body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu function
function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle window resize
function handleResize() {
    // I'm closing the menu if viewport is tablet size or larger
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
}

// Initialize video player
function initVideoPlayer() {
    if (videoPlayer && typeof Plyr !== 'undefined') {
        const player = new Plyr('#player', {
            controls: [
                'play-large',
                'play',
                'progress',
                'current-time',
                'mute',
                'volume',
                'fullscreen'
            ]
        });
        console.log('Video player initialized');
    }
}

// Event listeners
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

window.addEventListener('resize', handleResize);

// I'm initializing the video player after all variables are set
initVideoPlayer();

console.log('JavaScript initialization complete');
