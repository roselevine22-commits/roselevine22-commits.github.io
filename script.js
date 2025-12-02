// Minimal interactive behavior:
// - Smooth scroll on nav click
// - Mobile menu toggle
// - Reveal on scroll using IntersectionObserver
// - Current year in footer

document.addEventListener('DOMContentLoaded', () => {
  // year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // close mobile nav if open
        closeMobileNav();
      }
    });
  });

  // mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    // close on escape
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') closeMobileNav();
    });
  }

  function closeMobileNav(){
    if (siteNav && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.12 });

    reveals.forEach(el => obs.observe(el));
  } else {
    // fallback
    reveals.forEach(el => el.classList.add('in'));
  }

  // subtle logo hover scale on pointer
  const logo = document.querySelector('.logo-glow');
  if (logo) {
    let timeout;
    logo.addEventListener('pointerenter', () => {
      logo.style.transform = 'scale(1.03)';
      clearTimeout(timeout);
    });
    logo.addEventListener('pointerleave', () => {
      timeout = setTimeout(() => logo.style.transform = '', 150);
    });
  }
});
