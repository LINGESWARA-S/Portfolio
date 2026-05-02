/* ============================================
   PROJECTS — Modal & Filtering Logic
   ============================================ */
const Projects = {
  overlay: null,
  modal: null,
  cards: [],
  filterBtns: [],

  // Project data for modal display
  data: [
    {
      id: 2,
      title: 'DevConnect ',
      category: 'web',
      desc: 'A full-stack social networking platform for developers to share projects, collaborate on open-source code, and find team members. Features real-time messaging, project boards, and GitHub integration for seamless workflow.',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Docker'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: ''
    },
    {
      id: 3,
      title: 'CloudDeploy CLI',
      category: 'tools',
      desc: 'A command-line tool that simplifies cloud deployment workflows. Supports multi-cloud deployments (AWS, GCP, Azure), automated CI/CD pipeline generation, and infrastructure-as-code templates for common architectures.',
      tech: ['Go', 'Docker', 'Terraform', 'AWS SDK', 'GitHub Actions'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: ''
    },
    {
      id: 5,
      title: 'EcoMarket',
      category: 'web',
      desc: 'A sustainable e-commerce platform connecting eco-friendly sellers with conscious consumers. Features carbon footprint tracking per product, green shipping options, and community-driven sustainability ratings.',
      tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: ''
    },
    {
      id: 6,
      title: 'GitViz Analytics',
      category: 'tools',
      desc: 'A visual analytics tool for GitHub repositories that generates interactive contribution graphs, code complexity heatmaps, and team productivity dashboards. Helps engineering managers make data-driven decisions.',
      tech: ['TypeScript', 'D3.js', 'GitHub API', 'Express', 'Redis'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: ''
    }
  ],

  init() {
    this.overlay = document.getElementById('project-modal-overlay');
    this.modal = document.querySelector('.modal');
    this.cards = document.querySelectorAll('.project-card');
    this.filterBtns = document.querySelectorAll('.filter-btn');

    this.setupFilters();
    this.setupCards();
    this.setupModalClose();
  },

  setupFilters() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        this.cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  },

  setupCards() {
    this.cards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if clicking on a link
        if (e.target.closest('a')) return;
        const id = parseInt(card.getAttribute('data-id'));
        const project = this.data.find(p => p.id === id);
        if (project) this.openModal(project);
      });
    });
  },

  openModal(project) {
    if (!this.overlay) return;
    const body = this.overlay.querySelector('.modal-body');
    body.innerHTML = `
      <div class="modal-project-image-container" style="height:200px;background:var(--grad-card);border-radius:var(--radius-md);margin-bottom:var(--sp-6);display:flex;align-items:center;justify-content:center;">
        <i class="fas fa-project-diagram" style="font-size:3rem;color:var(--clr-accent-blue);opacity:0.3;"></i>
      </div>
      <h3 style="margin-bottom:var(--sp-3);font-size:var(--fs-xl);">${project.title}</h3>
      <p class="modal-project-desc">${project.desc}</p>
      <div class="modal-project-tech">
        ${project.tech.map(t => `<span class="badge badge-accent">${t}</span>`).join('')}
      </div>
      <div class="modal-project-links">
        <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
          <i class="fab fa-github"></i> Source Code
        </a>
        <a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
      </div>
    `;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  setupModalClose() {
    if (!this.overlay) return;
    // Close button
    const closeBtn = this.overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    // Click overlay
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.closeModal();
    });
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }
};
