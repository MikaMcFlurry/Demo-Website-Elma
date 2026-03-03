/* ============================================================
   ELMA Elektromaschinenbau GmbH – Demo Website Scripts
   Vanilla JS | No Dependencies
   ============================================================ */

(function () {
  'use strict';

  /* --- Mobile Navigation Toggle --- */
  const toggle = document.querySelector('.header__toggle');
  const nav = document.querySelector('.header__nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);

      // Swap icon
      const iconOpen = toggle.querySelector('.icon-menu');
      const iconClose = toggle.querySelector('.icon-close');
      if (iconOpen && iconClose) {
        iconOpen.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
      }
    });

    // Close nav on link click (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        var iconOpen = toggle.querySelector('.icon-menu');
        var iconClose = toggle.querySelector('.icon-close');
        if (iconOpen) iconOpen.style.display = 'block';
        if (iconClose) iconClose.style.display = 'none';
      });
    });
  }

  /* --- Header scroll shadow --- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-item__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-item__answer');
      var inner = answer.querySelector('.faq-item__answer-inner');
      var isOpen = item.classList.contains('open');

      // Close all others in the same FAQ block
      var parent = item.closest('.faq');
      if (parent) {
        parent.querySelectorAll('.faq-item.open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('open');
            var a = openItem.querySelector('.faq-item__answer');
            a.style.maxHeight = '0';
            openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = inner.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --- Scroll fade-in animations --- */
  var fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Contact Form Demo Handler --- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#c8102e';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Show success message (demo only)
      var success = form.querySelector('.form-success');
      var fields = form.querySelector('.form-fields');
      if (success && fields) {
        fields.style.display = 'none';
        success.classList.add('show');
      }
    });
  }

  /* --- File Upload Label --- */
  var fileInput = document.querySelector('.file-upload input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var label = fileInput.closest('.file-upload').querySelector('.file-upload__text');
      if (label && fileInput.files.length > 0) {
        var names = Array.from(fileInput.files).map(function(f) { return f.name; }).join(', ');
        label.textContent = names;
      }
    });
  }

  /* --- Active nav link highlighting --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
