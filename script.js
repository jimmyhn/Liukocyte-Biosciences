/* =================================================================
   ANGel — interactive behaviors
   - Hamburger menu open/close
   - Scroll-state nav styling
   - IntersectionObserver fade-in reveals
   - Smooth menu close on anchor click
   ================================================================= */

(function () {
  "use strict";

  /* ---------- Hamburger menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const menuPanel  = document.getElementById("menuPanel");
  const menuClose  = document.getElementById("menuClose");

  function openMenu() {
    menuPanel.classList.add("open");
    menuPanel.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menuPanel.classList.remove("open");
    menuPanel.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", function () {
    if (menuPanel.classList.contains("open")) closeMenu();
    else openMenu();
  });
  menuClose.addEventListener("click", closeMenu);

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuPanel.classList.contains("open")) closeMenu();
  });

  // Close when an anchor inside the menu is clicked
  menuPanel.querySelectorAll("a[href^='#']").forEach(function (a) {
    a.addEventListener("click", function () {
      // Let the browser handle the smooth scroll, then close.
      setTimeout(closeMenu, 120);
    });
  });

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector(".nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.revealDelay || "0", 10);
            setTimeout(function () { el.classList.add("in"); }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: reveal everything immediately
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
