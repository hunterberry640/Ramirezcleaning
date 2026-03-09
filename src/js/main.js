// Scroll-reveal: fade in elements as they enter the viewport
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealElements.forEach((el) => revealObserver.observe(el));

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav-open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav-open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Before/After slider
const baRange = document.getElementById('ba-range');
const baAfter = document.getElementById('ba-after');
const baHandle = document.getElementById('ba-handle');

if (baRange && baAfter && baHandle) {
  const updateSlider = () => {
    const value = baRange.value;
    baAfter.style.clipPath = `inset(0 0 0 ${value}%)`;
    baHandle.style.left = `${value}%`;
  };
  baRange.addEventListener('input', updateSlider);
  updateSlider();
}
