import { galleryHover }        from "./modules/galleryHover.js";
import { navigation }           from "./modules/navigation.js";
import { videoPlayer }          from "./modules/video.js";
import { animations }           from "./modules/animations.js";
import { smoothScroll }         from "./modules/smoothscroll.js";
import { contactForm }          from "./modules/contactForm.js";
import { projectFilter }        from "./modules/projectFilter.js";
import { background3d }         from "./modules/background3d.js";
import { aboutBackground3d }    from "./modules/aboutBackground3d.js";
import { projectsBackground3d } from "./modules/projectsBackground3d.js";
import { contactBackground3d }  from "./modules/contactBackground3d.js";
import { pageBackground3d }     from "./modules/pageBackground3d.js";
import { cursor }               from "./modules/cursor.js";
import { typed }                from "./modules/typed.js";
import { preloader }            from "./modules/preloader.js";
import { magnetic }             from "./modules/magnetic.js";
import { pageTransition }       from "./modules/pageTransition.js";

const page = document.body.dataset.page;

navigation();
smoothScroll();
cursor();
magnetic();
pageTransition();

if (page === "home") {
  preloader();
  background3d();
  typed();
  animations();
  videoPlayer();
}

if (page === "about") {
  animations();
  aboutBackground3d();
}

if (page === "projects") {
  animations();
  projectFilter();
  projectsBackground3d();
}

if (page === "casestudy") {
  animations();
  pageBackground3d();
  galleryHover();
}

if (page === "contact") {
  contactForm();
  contactBackground3d();
}
