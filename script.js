// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Create floating particles
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(particle);
    }
}

createParticles();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    observer.observe(card);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:shaurya.upadhyaya@myglobal.school?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Opening your email client...');
    
    // Reset form
    this.reset();
});

// Add stagger animation to cards
const cards = document.querySelectorAll('.project-card, .skill-card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

(function () {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  // Read saved theme, or fallback to system preference
  const saved = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved ? saved : (systemPrefersLight ? 'light' : 'dark');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      btn.textContent = '☀'; // sun
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.dataset.theme = 'light';
      btn.setAttribute('data-has-tooltip', 'true');
      btn.setAttribute('data-label', 'Light mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      btn.textContent = '🌙'; // moon
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.dataset.theme = 'dark';
      btn.setAttribute('data-has-tooltip', 'true');
      btn.setAttribute('data-label', 'Dark mode');
    }
    localStorage.setItem('theme', theme);
  }

  // Toggle handler
  function toggleTheme() {
    const current = btn.dataset.theme === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  }

  // Click and keyboard support
  btn.addEventListener('click', toggleTheme);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Apply initial theme
  applyTheme(initial);

  // If user hasn't saved a pref, respond to system changes
  if (!saved && window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: light)');
    if (mql.addEventListener) {
      mql.addEventListener('change', (e) => {
        applyTheme(e.matches ? 'light' : 'dark');
      });
    } else if (mql.addListener) {
      mql.addListener((e) => {
        applyTheme(e.matches ? 'light' : 'dark');
      });
    }
  }
})();
