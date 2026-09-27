// LUMORE FILMS — shared site behaviour
document.addEventListener('DOMContentLoaded', function () {

  /* Header: shrink on scroll */
  var header = document.querySelector('.site-header');
  function onScroll () {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  /* Submenu: tap-to-open on touch/mobile, hover on desktop (CSS handles hover) */
  document.querySelectorAll('.has-submenu > a.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* Close mobile nav when a plain link is clicked */
  document.querySelectorAll('.main-nav a.nav-link:not(.has-submenu > a)').forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav) nav.classList.remove('open');
    });
  });

  /* Lightbox for portfolio galleries */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery figure').forEach(function (fig) {
      fig.addEventListener('click', function () {
        var img = fig.querySelector('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function () {
      lightbox.classList.remove('open');
      lbImg.src = '';
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /*
    Contact / enquiry form.
    NOTE: This is a front-end placeholder only. When this site is rebuilt
    in WordPress, replace this <form> with a Forminator form shortcode and
    delete this JS block — Forminator will handle validation, spam
    protection and email delivery on its own.
  */
  var form = document.querySelector('.enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.parentElement.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
      form.reset();
    });
  }

});
