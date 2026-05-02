/* ============================================
   CONTACT — EmailJS Form Handling
   ============================================
   
   SETUP INSTRUCTIONS:
   1. Go to https://www.emailjs.com/ and create a free account
   2. Add an email service (Gmail, Outlook, etc.) → copy the Service ID
   3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
   4. Copy the Template ID
   5. Go to Account → General → copy your Public Key
   6. Replace the values below:
*/

const EMAILJS_CONFIG = {
  publicKey: 'J1Okj6F8gVPvADgPZ',
  serviceId: 'service_vf97pyq',
  templateId: 'template_nooiedd'
};

const ContactForm = {
  form: null,
  initialized: false,

  init() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      this.initialized = true;
    }

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  async handleSubmit(e) {
    e.preventDefault();
    const btn = this.form.querySelector('.form-submit');
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    const name = this.form.querySelector('#contact-name').value.trim();
    const email = this.form.querySelector('#contact-email').value.trim();
    const message = this.form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      this.showToast('Please fill in all fields.', 'error');
      btn.innerHTML = origText;
      btn.disabled = false;
      return;
    }

    try {
      if (this.initialized) {
        // Send via EmailJS — you'll get an email notification
        await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Lingeswara S'
        });
        this.showToast('Message sent successfully! I\'ll get back to you soon. 🎉', 'success');
      } else {
        // Fallback: open mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.open(`mailto:hello@portfolio.dev?subject=${subject}&body=${body}`, '_blank');
        this.showToast('Opening your email client... 📧', 'info');
      }
      this.form.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      this.showToast('Oops! Something went wrong. Please try again or email me directly.', 'error');
    }

    btn.innerHTML = origText;
    btn.disabled = false;
  },

  showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || ''}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
};
