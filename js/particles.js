/* ============================================
   PARTICLES — Canvas Particle Network Background
   ============================================ */
const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  mouse: { x: null, y: null, radius: 120 },
  count: 80,
  animId: null,

  init() {
    this.canvas = document.getElementById('hero-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.create();
    this.animate();

    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  },

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    // Adjust particle count for mobile
    this.count = window.innerWidth < 768 ? 40 : 80;
  },

  create() {
    this.particles = [];
    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p, i) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          p.x += dx * 0.02;
          p.y += dy * 0.02;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      this.ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          const opacity = (1 - dist / 150) * 0.15;
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    });

    this.animId = requestAnimationFrame(() => this.animate());
  },

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
};
