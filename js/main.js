/* ============================================
   MAIN — App Initialization & Orchestration
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize loader
  Loader.init();

  // Initialize all modules after a short delay (let loader show)
  setTimeout(() => {
    Particles.init();
    TypingEffect.init('.typing-text', [
      'Full Stack Developer',
      'UI/UX Designer',
      'Problem Solver',
      'Tech Explorer'
    ]);
    Theme.init();
    ScrollAnimations.init();
    Projects.init();
    ContactForm.init();
    Chatbot.init();
    CustomCursor.init();
    initNavigation();
    initBackToTop();
    initLightbox();
    initAchievementsToggle();
  }, 300);
});

/* ── Navigation ── */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const overlay = document.querySelector('.mobile-overlay');
  const sections = document.querySelectorAll('.section');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
      overlay?.classList.remove('active');
    });
  });

  // Close menu on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
}

/* ── Back to Top ── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Achievement Image Lightbox ── */
function initLightbox() {
  const lightbox = document.getElementById('achievement-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.achievement-lightbox-close');
  if (!lightbox) return;

  // Click on image overlay to open lightbox
  document.querySelectorAll('.achievement-image-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = overlay.closest('.achievement-image');
      const img = card.querySelector('img');
      if (img && img.style.display !== 'none' && img.src) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
}

/* ── Achievements View More Toggle ── */
function initAchievementsToggle() {
  const btn = document.getElementById('achievements-toggle');
  const extra = document.getElementById('achievements-extra');
  if (!btn || !extra) return;

  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    extra.classList.toggle('expanded', expanded);
    btn.classList.toggle('expanded', expanded);
    btn.innerHTML = expanded
      ? '<i class="fas fa-chevron-up"></i> Show Less'
      : '<i class="fas fa-chevron-down"></i> View More Certificates';

    // Trigger reveal animations on newly visible cards
    if (expanded) {
      extra.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        setTimeout(() => el.classList.add('active'), 100);
      });
    }
  });
}
