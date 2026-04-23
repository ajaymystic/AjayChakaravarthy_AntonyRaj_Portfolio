export function typed() {
  const target = document.querySelector(".hero__typed");
  if (!target) return;

  const roles = [
    "Digital Designer",
    "Frontend Developer",
    "Motion Artist",
    "Creative Coder",
    "UI/UX Enthusiast"
  ];

  const TYPE_SPEED          = 80;
  const DELETE_SPEED        = 45;
  const PAUSE_AFTER_TYPE    = 2000;
  const PAUSE_AFTER_DELETE  = 300;

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function typeCharacter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      target.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;

        if (roleIndex >= roles.length - 1) {
          roleIndex = 0;
        } else {
          roleIndex++;
        }

        setTimeout(typeCharacter, PAUSE_AFTER_DELETE);
        return;
      }

      setTimeout(typeCharacter, DELETE_SPEED);
      return;
    }

    charIndex++;
    target.textContent = currentRole.slice(0, charIndex);

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeCharacter, PAUSE_AFTER_TYPE);
      return;
    }

    setTimeout(typeCharacter, TYPE_SPEED);
  }

  typeCharacter();
}
