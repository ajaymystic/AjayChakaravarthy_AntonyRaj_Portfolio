import { navigation } from "./modules/navigation.js";
import { videoPlayer } from "./modules/video.js";
import { animations } from "./modules/animations.js";
import { smoothScroll } from "./modules/smoothscroll.js";
import { contactForm } from "./modules/contactForm.js";
import { projectFilter } from "./modules/projectFilter.js";
import { testimonials } from "./modules/testimonials.js";

// I'm running navigation and smoothScroll on every page
navigation();
smoothScroll();

// I'm checking the page and only running what's needed
if (document.body.dataset.page === "home") {
  videoPlayer();
  animations();
  testimonials();
}
else if (document.body.dataset.page === "about") {
  animations();
}
else if (document.body.dataset.page === "projects") {
  animations();
  projectFilter();
}
else if (document.body.dataset.page === "contact") {
  contactForm();
}