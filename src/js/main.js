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

// Modal functionality
const modal = document.getElementById('booking-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const bookingForm = document.getElementById('booking-form');
const formStatus = document.getElementById('form-status');

// Open modal when clicking CTA buttons
const openModal = () => {
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.setAttribute('aria-hidden', 'false');
  }
};

// Close modal
const closeModal = () => {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }
  }
};

// Attach event listeners
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});

// Open modal from buttons
const bookNowBtn = document.getElementById('book-now-btn');
const heroQuoteBtn = document.getElementById('hero-quote-btn');
const navQuoteBtn = document.getElementById('nav-quote-btn');

[bookNowBtn, heroQuoteBtn, navQuoteBtn].forEach(btn => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }
});

// Handle form submission
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (formStatus) {
      // Check if page is in Spanish
      const isSpanish = document.documentElement.lang === 'es';
      formStatus.textContent = isSpanish ? 'Enviando...' : 'Sending...';
      formStatus.className = 'form-status loading';
    }
    
    const formData = new FormData(bookingForm);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        if (formStatus) {
          // Check if page is in Spanish
          const isSpanish = document.documentElement.lang === 'es';
          formStatus.textContent = isSpanish 
            ? '¡Gracias! Su mensaje ha sido enviado. Me pondré en contacto pronto.'
            : 'Thank you! Your message has been sent. I\'ll get back to you soon.';
          formStatus.className = 'form-status success';
        }
        bookingForm.reset();
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      if (formStatus) {
        // Check if page is in Spanish
        const isSpanish = document.documentElement.lang === 'es';
        formStatus.textContent = isSpanish
          ? 'Lo siento, hubo un error al enviar su mensaje. Por favor intente nuevamente o llame directamente.'
          : 'Sorry, there was an error sending your message. Please try again or call directly.';
        formStatus.className = 'form-status error';
      }
      console.error('Form submission error:', error);
    }
  });
}
