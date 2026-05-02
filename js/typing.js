/* ============================================
   TYPING — Typing Animation Effect
   ============================================ */
const TypingEffect = {
  element: null,
  words: [],
  wordIndex: 0,
  charIndex: 0,
  isDeleting: false,
  typeSpeed: 80,
  deleteSpeed: 40,
  pauseTime: 2000,

  init(selector, words) {
    this.element = document.querySelector(selector);
    if (!this.element || !words.length) return;
    this.words = words;
    this.type();
  },

  type() {
    const currentWord = this.words[this.wordIndex];
    let displayText;

    if (this.isDeleting) {
      displayText = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      displayText = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    this.element.textContent = displayText;

    let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      speed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      speed = 300;
    }

    setTimeout(() => this.type(), speed);
  }
};
