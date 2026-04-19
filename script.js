/* ==========================================
   SCRIPT.JS — Portfolio 2.0
   Ritesh Yadav Premium Portfolio
   ========================================== */

'use strict';

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Blur navbar after scroll
  if (currentScrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollY = currentScrollY;
}, { passive: true });

// ===== HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on nav-link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', false);
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger skill bars when skills section is visible
      if (entry.target.classList.contains('skill-card')) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.getAttribute('data-width') + '%';
          }, 200);
        }
      }

      // Trigger counter animation when achievement card is visible
      if (entry.target.classList.contains('achievement-card') || entry.target.classList.contains('achievements-strip') || entry.target.classList.contains('achievements-strip-card')) {
        entry.target.querySelectorAll('.achievement-count').forEach(counter => {
          if (!counter.dataset.animated) {
            counter.dataset.animated = 'true';
            animateCounter(counter, parseInt(counter.getAttribute('data-count')));
          }
        });
      }
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal-up, .reveal-fade, .achievements-strip, .achievements-strip-card').forEach(el => {
  revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target) {
  const duration = 1800;
  const startTime = performance.now();
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = Math.floor(easedProgress * target);
    el.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  let rect;
  let isHovered = false;

  btn.addEventListener('mouseenter', () => {
    rect = btn.getBoundingClientRect();
    isHovered = true;
  });

  btn.addEventListener('mousemove', (e) => {
    if (!isHovered || !rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = 0.25;
    btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    isHovered = false;
    btn.style.transform = '';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => {
      btn.style.transition = '';
    }, 400);
  });
});

// (Hero image removed — cinematic centered layout)

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id], .split-section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -30% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// Hero animations handled by CSS @keyframes (hero-anim class)

// ===== CURSOR GLOW EFFECT (Desktop only) =====
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    left: -160px;
    top: -160px;
    transition: transform 0.08s linear;
    will-change: transform;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }, { passive: true });
}

// ===== COPY EMAIL ON CLICK =====
const emailBtn = document.getElementById('emailBtn');
if (emailBtn) {
  emailBtn.addEventListener('click', (e) => {
    // Allow the default mailto behavior
  });
}

console.log('%cRitesh Yadav — Portfolio 2.0', 'color: #f97316; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with passion · Java · AI · Hackathons', 'color: #a3a3a3; font-size: 12px;');
