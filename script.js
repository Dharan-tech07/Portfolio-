/* Interactive Logic for Dharan B Portfolio */
document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initScrollProgress();
  initScrollSpy();
  initMobileMenu();
  initCardMouseTracking();
  initFilters();
  initScrollReveal();
  initContactForm();
  initBackToTop();
});

/* 1. Ambient Node Canvas Background */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  const particleCount = 40;
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* 2. Top Scroll Progress Indicator */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* 3. Navigation ScrollSpy & Active Link */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 4. Mobile Menu Drawer */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu a');
  
  if (!toggleBtn || !mobileMenu) return;
  
  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

/* 5. Mouse Glow Effect on Glass Cards */
function initCardMouseTracking() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* 6. Skills & Project Category Filtering */
function initFilters() {
  // Skills Filter
  const skillBtns = document.querySelectorAll('.skills-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      
      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Projects Filter
  const projectBtns = document.querySelectorAll('.projects-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 7. Scroll Reveal & Exposure Bar Animations */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Fill exposure bars inside entry if present
        const exposureBars = entry.target.querySelectorAll('.exposure-bar-fill');
        exposureBars.forEach(bar => {
          const width = bar.getAttribute('data-width') || '75%';
          bar.style.width = width;
        });
      }
    });
  }, { threshold: 0.15 });
  
  revealElements.forEach(el => observer.observe(el));
}

/* 8. Contact Form Handling & Toast Alert */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✨ Thank you! Your message has been sent successfully.');
    form.reset();
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-alert');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-alert';
    toast.className = 'toast-alert';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* Copy to Clipboard Helper */
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 ${label} copied to clipboard!`);
  }).catch(() => {
    showToast(`Link: ${text}`);
  });
}

/* 9. Back to Top Button */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
