/* ============================================
   ANIMATIONS — Scroll-Triggered Reveals
   ============================================ */
const ScrollAnimations = {
  init() {
    this.observeReveals();
    this.observeSkillBars();
    this.observeTimeline();
    this.observeCountUp();
  },

  observeReveals() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  },

  observeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const percent = entry.target.getAttribute('data-percent');
          entry.target.style.width = percent + '%';
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  },

  observeTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(timeline);
  },

  observeCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  },

  animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
};
