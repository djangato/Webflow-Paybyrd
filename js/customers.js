/* Paybyrd — Customer Showcase with Video Cards + Lightbox */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/customers/";

  var customers = [
    {
      name: "TAP Air Portugal",
      industry: "Airlines",
      stat: "Millions unlocked in new revenue",
      desc: "Global and local transaction processing with maximized approval rates and fraud reduction \u2014 unlocking millions in additional payment volume across 90+ markets.",
      video: BASE + "tap.mp4",
      poster: BASE + "tap-poster.jpg"
    },
    {
      name: "Wink",
      industry: "Retail",
      stat: "Real-time visibility across all stores",
      desc: "Leveraging real-time data across own stores and franchise network to boost loyalty, identify recurring shoppers, and increase basket size.",
      video: BASE + "wink.mp4",
      poster: BASE + "wink-poster.jpg"
    },
    {
      name: "Vila Gal\u00E9",
      industry: "Hospitality",
      stat: "Omnichannel across 40+ hotels",
      desc: "Seamless payment orchestration across one of the largest hotel groups in Portugal and Brazil \u2014 from front desk to spa to room service.",
      video: BASE + "vilagale.mp4",
      poster: BASE + "vilagale-poster.jpg"
    },
    {
      name: "KuantoKusta",
      industry: "E-Commerce",
      stat: "Higher checkout conversion with BNPL",
      desc: "High-performance checkout with multi-payment strategy including BNPL and local methods \u2014 reducing cart abandonment and increasing order value.",
      video: BASE + "kuantokusta.mp4",
      poster: BASE + "kuantokusta-poster.jpg"
    },
    {
      name: "Kabuki",
      industry: "Restaurants",
      stat: "Bespoke POS with loyalty insights",
      desc: "Tailored terminal experience with branded checkout flows and full customer loyalty visibility \u2014 turning every transaction into a relationship.",
      video: BASE + "kabuki.mp4",
      poster: BASE + "kabuki-poster.jpg"
    }
  ];

  var arrowSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var chevLeftSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var chevRightSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ─── Lightbox ─── */
  var lightbox = null;
  var lightboxIdx = 0;

  function createLightbox() {
    var el = document.createElement("div");
    el.className = "pbrd-lightbox";
    el.innerHTML =
      '<div class="pbrd-lightbox-card">' +
        '<video class="pbrd-lightbox-video" muted loop playsinline></video>' +
        '<div class="pbrd-lightbox-overlay"></div>' +
        '<button class="pbrd-lightbox-close">\u00D7</button>' +
        '<div class="pbrd-lightbox-content">' +
          '<span class="pbrd-lightbox-tag"></span>' +
          '<h3 class="pbrd-lightbox-name"></h3>' +
          '<p class="pbrd-lightbox-stat"></p>' +
          '<p class="pbrd-lightbox-desc"></p>' +
        '</div>' +
      '</div>' +
      '<button class="pbrd-lightbox-nav pbrd-lightbox-prev">' + chevLeftSVG + '</button>' +
      '<button class="pbrd-lightbox-nav pbrd-lightbox-next">' + chevRightSVG + '</button>';
    document.body.appendChild(el);

    // Close handlers
    el.querySelector(".pbrd-lightbox-close").addEventListener("click", closeLightbox);
    el.addEventListener("click", function (e) {
      if (e.target === el) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!el.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showLightbox((lightboxIdx - 1 + customers.length) % customers.length);
      if (e.key === "ArrowRight") showLightbox((lightboxIdx + 1) % customers.length);
    });

    // Nav
    el.querySelector(".pbrd-lightbox-prev").addEventListener("click", function (e) {
      e.stopPropagation();
      showLightbox((lightboxIdx - 1 + customers.length) % customers.length);
    });
    el.querySelector(".pbrd-lightbox-next").addEventListener("click", function (e) {
      e.stopPropagation();
      showLightbox((lightboxIdx + 1) % customers.length);
    });

    return el;
  }

  function showLightbox(idx) {
    if (!lightbox) lightbox = createLightbox();
    lightboxIdx = idx;
    var c = customers[idx];
    var video = lightbox.querySelector(".pbrd-lightbox-video");
    video.src = c.video;
    video.poster = c.poster;
    video.currentTime = 0;
    video.play().catch(function () {});
    lightbox.querySelector(".pbrd-lightbox-tag").textContent = c.industry;
    lightbox.querySelector(".pbrd-lightbox-name").textContent = c.name;
    lightbox.querySelector(".pbrd-lightbox-stat").textContent = c.stat;
    lightbox.querySelector(".pbrd-lightbox-desc").textContent = c.desc;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    var video = lightbox.querySelector(".pbrd-lightbox-video");
    video.pause();
  }

  /* ─── Build Cards ─── */
  function buildCard(c, idx) {
    return '<div class="pbrd-customer-card" data-idx="' + idx + '">' +
      '<video class="pbrd-customer-video" muted loop playsinline preload="none" poster="' + c.poster + '">' +
        '<source src="' + c.video + '" type="video/mp4">' +
      '</video>' +
      '<div class="pbrd-customer-overlay"></div>' +
      '<div class="pbrd-customer-tag">' + c.industry + '</div>' +
      '<div class="pbrd-customer-content">' +
        '<h3 class="pbrd-customer-name">' + c.name + '</h3>' +
        '<p class="pbrd-customer-stat">' + c.stat + '</p>' +
        '<p class="pbrd-customer-desc">' + c.desc + '</p>' +
      '</div>' +
    '</div>';
  }

  function init() {
    var marquee = document.querySelector('[data-wf--section-partner-marquee--section-theme]');
    if (!marquee) return;

    var section = document.createElement("section");
    section.className = "pbrd-customers";

    section.innerHTML =
      '<div class="pbrd-customers-inner">' +
        '<div class="pbrd-customers-header">' +
          '<span class="pbrd-customers-label">Trusted by industry leaders</span>' +
          '<h2>Powering payments for businesses that demand more.</h2>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-customers-track">' +
        customers.map(buildCard).join("") +
      '</div>' +
      '<div class="pbrd-customers-inner">' +
        '<div class="pbrd-customers-cta">' +
          '<a href="/book-demo">Become a success story ' + arrowSVG + '</a>' +
        '</div>' +
      '</div>';

    marquee.replaceWith(section);

    // Card interactions
    section.querySelectorAll(".pbrd-customer-card").forEach(function (card) {
      var video = card.querySelector("video");

      // Hover: play video
      card.addEventListener("mouseenter", function () {
        if (video) { video.currentTime = 0; video.play().catch(function () {}); }
      });
      card.addEventListener("mouseleave", function () {
        if (video) video.pause();
      });

      // Click: open lightbox
      card.addEventListener("click", function () {
        showLightbox(parseInt(card.dataset.idx));
      });
    });

    // Lazy load videos
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var v = entry.target.querySelector("video");
            if (v && v.preload === "none") v.preload = "metadata";
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: "200px" });
      section.querySelectorAll(".pbrd-customer-card").forEach(function (c) { obs.observe(c); });
    }
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
