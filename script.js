/* =========================================================
   TASK 4 — PERSONAL PORTFOLIO — script.js
   Modular vanilla JS: each feature is its own init function,
   all wired up from one entry point at the bottom.
   ========================================================= */

(() => {
  'use strict';

  /* ---------- Helpers ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- 1. THEME (Dark / Light) ---------- */
  function initTheme() {
    const root   = document.body;
    const toggle = $('#themeToggle');
    if (!toggle) return;

    const STORAGE_KEY = 'apex-portfolio-theme';
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');

    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem(STORAGE_KEY, next); }
      catch (err) { console.warn('Could not persist theme:', err); }
    });
  }

  /* ---------- 2. RESPONSIVE NAV (hamburger + active link) ---------- */
  function initNav() {
    const hamburger = $('#hamburger');
    const navLinks   = $('#navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu after clicking a link (mobile) + smooth scroll
    $$('a', navLinks).forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Active-link highlighting via scroll position
    const sections = $$('section[id]');
    const linkMap = new Map($$('a', navLinks).map(a => [a.getAttribute('href').slice(1), a]));

    const spy = () => {
      let current = sections[0]?.id;
      const offset = 110;
      sections.forEach(sec => {
        if (window.scrollY + offset >= sec.offsetTop) current = sec.id;
      });
      linkMap.forEach((a, id) => a.classList.toggle('active', id === current));
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* ---------- 3. SCROLL REVEAL ANIMATIONS ---------- */
  function initRevealAnimations() {
    const targets = $$('.reveal, .skill-card');
    if (!('IntersectionObserver' in window) || !targets.length) {
      targets.forEach(t => t.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(t => observer.observe(t));
  }

  /* ---------- 4. SCROLL-TO-TOP BUTTON ---------- */
  function initScrollToTop() {
    const btn = $('#toTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 480);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 5. CONTACT FORM (validation + fake submit) ---------- */
  function initContactForm() {
    const form   = $('#contactForm');
    const status = $('#formStatus');
    if (!form || !status) return;

    const setStatus = (msg, isError = false) => {
      status.textContent = msg;
      status.style.color = isError ? '#FF6B6B' : 'var(--teal)';
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        const data = Object.fromEntries(new FormData(form).entries());
        const { name, email, subject, message } = data;

        if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
          setStatus('Please fill in every field before sending.', true);
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          setStatus('Please enter a valid email address.', true);
          return;
        }

        // No backend in this static build — simulate a send.
        setStatus(`Thanks, ${name.split(' ')[0]}! Your message has been queued — I’ll reply soon.`);
        form.reset();
      } catch (err) {
        console.error('Contact form error:', err);
        setStatus('Something went wrong sending that. Please try again.', true);
      }
    });
  }

  /* ---------- 6. ENTRY POINT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initRevealAnimations();
    initScrollToTop();
    initContactForm();
  });
})();
