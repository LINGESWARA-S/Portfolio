/* ============================================
   LOADER — Loading Screen Controller
   ============================================ */
const Loader = {
  loader: null,
  bar: null,
  progress: 0,

  init() {
    this.loader = document.getElementById('loader');
    this.bar = document.querySelector('.loader-bar-fill');
    if (!this.loader) return;

    document.body.classList.add('loading');
    this.simulateProgress();
  },

  simulateProgress() {
    const interval = setInterval(() => {
      this.progress += Math.random() * 20 + 5;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(interval);
        setTimeout(() => this.hide(), 400);
      }
      if (this.bar) this.bar.style.width = this.progress + '%';
    }, 200);
  },

  hide() {
    if (this.loader) {
      this.loader.classList.add('hidden');
      document.body.classList.remove('loading');
      // Remove from DOM after transition
      setTimeout(() => {
        if (this.loader) this.loader.remove();
      }, 600);
    }
  }
};
