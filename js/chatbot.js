/* ============================================
   CHATBOT — AI Portfolio Assistant
   ============================================ */
const Chatbot = {
  window: null,
  toggle: null,
  messages: null,
  input: null,
  isOpen: false,

  // Knowledge base for the chatbot
  knowledge: {
    greetings: ['hi', 'hello', 'hey', 'sup', 'what\'s up'],
    sections: {
      'about': { section: '#about', response: 'Let me take you to the About section! 👋' },
      'skills': { section: '#skills', response: 'Here are my technical skills! 💻' },
      'projects': { section: '#projects', response: 'Check out my projects! 🚀' },
      'experience': { section: '#experience', response: 'Here\'s my experience timeline! 📋' },
      'education': { section: '#experience', response: 'My education details are right here! 🎓' },
      'achievements': { section: '#achievements', response: 'Here are my achievements and certifications! 🏆' },
      'certificates': { section: '#achievements', response: 'Scrolling to my certifications! 📜' },
      'contact': { section: '#contact', response: 'Let\'s get in touch! 📧' }
    },
    responses: {
      'resume': 'You can download my resume by clicking the "Download Resume" button in the About section! 📄',
      'email': 'You can reach me at lingeshwarakani@gmail.com or use the contact form below! 📧',
      'github': 'Check out my GitHub profile! I have various projects from web apps to AI tools. 💻',
      'linkedin': 'Connect with me on LinkedIn! The link is in the contact section. 🔗',
      'tech stack': 'I work with React, Node.js, Python, and more. Check the Skills section for the full list! 🛠️',
      'hire': 'I\'m always open to exciting opportunities! Please reach out via the contact form or email. 🤝',
      'available': 'Yes, I\'m open to freelance projects and full-time opportunities! Let\'s talk. 💼'
    }
  },

  init() {
    this.window = document.querySelector('.chatbot-window');
    this.toggle = document.querySelector('.chatbot-toggle');
    this.messages = document.querySelector('.chatbot-messages');
    this.input = document.querySelector('.chatbot-input input');
    const sendBtn = document.querySelector('.chatbot-input button');
    const closeBtn = document.querySelector('.chatbot-close');

    if (!this.toggle) return;

    this.toggle.addEventListener('click', () => this.toggleChat());
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggleChat());
    if (sendBtn) sendBtn.addEventListener('click', () => this.send());
    if (this.input) {
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.send();
      });
    }

    // Quick link clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-link')) {
        this.input.value = e.target.textContent;
        this.send();
      }
    });
  },

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.window) this.window.classList.toggle('active', this.isOpen);
  },

  send() {
    const text = this.input.value.trim();
    if (!text) return;

    this.addMessage(text, 'user');
    this.input.value = '';

    // Show typing indicator
    this.showTyping();

    // Process after delay for natural feel
    setTimeout(() => {
      this.removeTyping();
      const response = this.getResponse(text);
      this.addMessage(response.text, 'bot', response.quickLinks);

      // Navigate if needed
      if (response.navigate) {
        setTimeout(() => {
          document.querySelector(response.navigate)?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }, 800 + Math.random() * 600);
  },

  getResponse(input) {
    const lower = input.toLowerCase().trim();

    // Greetings
    if (this.knowledge.greetings.some(g => lower.includes(g))) {
      return {
        text: 'Hey there! 👋 I\'m the portfolio assistant. I can help you navigate around, find projects, or learn more about me. What would you like to know?',
        quickLinks: ['Projects', 'Skills', 'Contact', 'Resume']
      };
    }

    // Section navigation
    for (const [key, val] of Object.entries(this.knowledge.sections)) {
      if (lower.includes(key)) {
        return { text: val.response, navigate: val.section };
      }
    }

    // Knowledge base responses
    for (const [key, val] of Object.entries(this.knowledge.responses)) {
      if (lower.includes(key)) {
        return { text: val };
      }
    }

    // Project-specific
    if (lower.includes('project')) {
      return {
        text: 'I\'ve worked on 5+ projects including AI tools, web platforms, and developer utilities. Want me to take you there? 🚀',
        navigate: '#projects',
        quickLinks: ['Show projects', 'Skills', 'Contact']
      };
    }

    // Default
    return {
      text: 'I\'m not sure about that, but I can help you explore the portfolio! Try asking about my projects, skills, experience, or how to contact me. 😊',
      quickLinks: ['About', 'Projects', 'Skills', 'Contact']
    };
  },

  addMessage(text, type, quickLinks) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${type}`;
    msg.innerHTML = text;

    if (quickLinks && quickLinks.length) {
      const linksHtml = quickLinks.map(l => `<button class="quick-link">${l}</button>`).join('');
      msg.innerHTML += `<div class="quick-links">${linksHtml}</div>`;
    }

    this.messages.appendChild(msg);
    this.messages.scrollTop = this.messages.scrollHeight;
  },

  showTyping() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    this.messages.appendChild(indicator);
    this.messages.scrollTop = this.messages.scrollHeight;
  },

  removeTyping() {
    const indicator = this.messages.querySelector('.typing-indicator');
    if (indicator) indicator.remove();
  }
};
