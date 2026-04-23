export function galleryHover() {
  const images = document.querySelectorAll('.cs-gallery__main img, .cs-gallery__thumb img');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'gallery-overlay';

  const overlayImg = document.createElement('img');
  overlayImg.className = 'gallery-overlay__img';
  overlay.appendChild(overlayImg);

  document.body.appendChild(overlay);

  let hideTimeout;

  function showOverlay(event) {
    clearTimeout(hideTimeout);
    const src = event.currentTarget.src;
    overlayImg.src = src;
    overlay.classList.add('gallery-overlay--visible');
  }

  function hideOverlay() {
    hideTimeout = setTimeout(function () {
      overlay.classList.remove('gallery-overlay--visible');
    }, 120);
  }

  images.forEach(function (img) {
    img.addEventListener('mouseenter', showOverlay);
    img.addEventListener('mouseleave', hideOverlay);
  });
}
