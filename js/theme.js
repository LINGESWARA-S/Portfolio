/* ============================================
   THEME — Dark/Light Mode Toggle
   ============================================ */
const Theme = {
  toggle: null,
  currentTheme: 'dark',

  init() {
    this.toggle = document.getElementById('theme-toggle');
    // Load saved preference
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      this.currentTheme = saved;
      document.documentElement.setAttribute('data-theme', saved);
    }
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.switch());
    }
  },

  switch() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('portfolio-theme', this.currentTheme);
  }
};
