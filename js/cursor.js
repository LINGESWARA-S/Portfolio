/* ============================================
   CURSOR — Custom Cursor with Hover Effects
   ============================================ */
const CustomCursor = {
  dot: null,
  ring: null,
  pos: { x: 0, y: 0 },
  target: { x: 0, y: 0 },
  isVisible: false,

  init() {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    this.dot = document.createElement('div');
    this.dot.className = 'cursor-dot';
    this.ring = document.createElement('div');
    this.ring.className = 'cursor-ring';
    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);

    this.addStyles();
    this.addListeners();
    this.animate();
  },

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cursor-dot {
        position: fixed; top: 0; left: 0;
        width: 6px; height: 6px;
        background: var(--clr-accent-blue);
        border-radius: 50%;
        pointer-events: none;
        z-index: var(--z-cursor);
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, background 0.2s;
        opacity: 0;
      }
      .cursor-ring {
        position: fixed; top: 0; left: 0;
        width: 36px; height: 36px;
        border: 1.5px solid rgba(0, 212, 255, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: var(--z-cursor);
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease,
                    border-color 0.3s ease, background 0.3s ease;
        opacity: 0;
      }
      .cursor-dot.visible, .cursor-ring.visible { opacity: 1; }
      .cursor-ring.hover {
        width: 56px; height: 56px;
        border-color: rgba(124, 58, 237, 0.5);
        background: rgba(124, 58, 237, 0.05);
      }
      .cursor-dot.hover {
        width: 8px; height: 8px;
        background: var(--clr-accent-purple);
      }
      .cursor-ring.click { transform: translate(-50%, -50%) scale(0.8); }
    `;
    document.head.appendChild(style);
  },

  addListeners() {
    document.addEventListener('mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;
      if (!this.isVisible) {
        this.isVisible = true;
        this.dot.classList.add('visible');
        this.ring.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', () => {
      this.isVisible = false;
      this.dot.classList.remove('visible');
      this.ring.classList.remove('visible');
    });

    document.addEventListener('mousedown', () => {
      this.ring.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
      this.ring.classList.remove('click');
    });

    // Hover on interactive elements
    const interactiveSelectors = 'a, button, .btn, .project-card, .filter-btn, .nav-link, .social-link, .chatbot-toggle, input, textarea, .quick-link';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.dot.classList.add('hover');
        this.ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        this.dot.classList.remove('hover');
        this.ring.classList.remove('hover');
      });
    });
  },

  animate() {
    // Smooth follow for dot
    this.pos.x += (this.target.x - this.pos.x) * 0.15;
    this.pos.y += (this.target.y - this.pos.y) * 0.15;

    this.dot.style.left = this.target.x + 'px';
    this.dot.style.top = this.target.y + 'px';
    this.ring.style.left = this.pos.x + 'px';
    this.ring.style.top = this.pos.y + 'px';

    requestAnimationFrame(() => this.animate());
  }
};
