/* Paybyrd — Customer Showcase with Video Cards + Lightbox */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/customers/";

  var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";

  var customers = [
    {
      name: "TAP Air Portugal",
      slug: "tap",
      industry: "Airlines",
      stat: "Millions unlocked in new revenue",
      desc: "Global and local transaction processing with maximized approval rates and fraud reduction \u2014 unlocking millions in additional payment volume across 90+ markets.",
      video: BASE + "tap.mp4",
      poster: BASE + "tap-poster.jpg",
      logo: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg"
    },
    {
      name: "Wink",
      slug: "wink",
      industry: "Retail",
      stat: "Real-time visibility across all stores",
      desc: "Leveraging real-time data across own stores and franchise network to boost loyalty, identify recurring shoppers, and increase basket size.",
      video: BASE + "wink.mp4",
      poster: BASE + "wink-poster.jpg",
      logo: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg"
    },
    {
      name: "Vila Gal\u00E9",
      slug: "vilagale",
      industry: "Hospitality",
      stat: "Omnichannel across 40+ hotels",
      desc: "Seamless payment orchestration across one of the largest hotel groups in Portugal and Brazil \u2014 from front desk to spa to room service.",
      video: BASE + "vilagale.mp4",
      poster: BASE + "vilagale-poster.jpg",
      logo: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg"
    },
    {
      name: "KuantoKusta",
      slug: "kuantokusta",
      industry: "E-Commerce",
      stat: "Higher checkout conversion with BNPL",
      desc: "High-performance checkout with multi-payment strategy including BNPL and local methods \u2014 reducing cart abandonment and increasing order value.",
      video: BASE + "kuantokusta.mp4",
      poster: BASE + "kuantokusta-poster.jpg",
      logo: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg"
    },
    {
      name: "Kabuki",
      slug: "kabuki",
      industry: "Restaurants",
      stat: "Bespoke POS with loyalty insights",
      desc: "Tailored terminal experience with branded checkout flows and full customer loyalty visibility \u2014 turning every transaction into a relationship.",
      video: BASE + "kabuki.mp4",
      poster: BASE + "kabuki-poster.jpg",
      logo: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg"
    },
    {
      name: "Rede Expressos",
      slug: "redeexpressos",
      industry: "Transport",
      stat: "Seamless ticketing across 700+ routes",
      desc: "Powering frictionless payments for Portugal\u2019s largest intercity bus network \u2014 online, at the counter, and on the go. Every seat sold faster.",
      video: BASE + "redeexpressos.mp4",
      poster: BASE + "redeexpressos-poster.jpg",
      logo: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png"
    },
    {
      name: "Andr\u00E9 \u00D3ticas",
      slug: "andreoticas",
      industry: "Luxury Retail",
      stat: "Premium checkout for premium eyewear",
      desc: "Elevating the in-store payment experience for high-end optical retail \u2014 with tailored POS flows that match the care behind every pair.",
      video: BASE + "andreoticas.mp4",
      poster: BASE + "andreoticas-poster.jpg",
      logo: BASE + "andreoticas-logo.png"
    },
    {
      name: "Onyria Resorts",
      slug: "onyria",
      industry: "Luxury Hospitality",
      stat: "Unified payments across resort properties",
      desc: "From golf clubhouse to spa to fine dining \u2014 seamless omnichannel payments across one of Portugal\u2019s most prestigious resort groups.",
      video: BASE + "onyria.mp4",
      poster: BASE + "onyria-poster.jpg",
      logo: BASE + "onyria-logo.svg"
    },
    {
      name: "SkinBoutique by LMR",
      slug: "skinboutique",
      industry: "Aesthetics & Health",
      stat: "Effortless payments for premium care",
      desc: "Streamlined checkout for high-value treatments \u2014 installments, recurring billing, and a payment experience as refined as the clinic itself.",
      video: BASE + "skinboutique.mp4",
      poster: BASE + "skinboutique-poster.jpg",
      logo: BASE + "skinboutique-logo.png"
    }
  ];

  var arrowSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var chevLeftSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var chevRightSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ─── Carousel Lightbox ─── */
  var lightbox = null;
  var carouselIdx = 0;
  var touchStartX = 0;

  function buildCarouselCard(c, idx) {
    return '<div class="pbrd-carousel-card' + (idx === 0 ? ' active' : '') + '" data-idx="' + idx + '" data-customer="' + c.slug + '">' +
      '<video muted loop playsinline preload="metadata" poster="' + c.poster + '">' +
        '<source src="' + c.video + '" type="video/mp4">' +
      '</video>' +
      '<div class="pbrd-carousel-overlay"></div>' +
      '<div class="pbrd-carousel-content">' +
        '<span class="pbrd-carousel-tag">' + c.industry + '</span>' +
        (c.logo
          ? '<img class="pbrd-carousel-logo" src="' + c.logo + '" alt="' + c.name + '">'
          : '<div class="pbrd-carousel-logo-text">' + c.name + '</div>') +
        '<h3 class="pbrd-carousel-name">' + c.name + '</h3>' +
        '<p class="pbrd-carousel-stat">' + c.stat + '</p>' +
        '<p class="pbrd-carousel-desc">' + c.desc + '</p>' +
      '</div>' +
    '</div>';
  }

  function createLightbox() {
    var el = document.createElement("div");
    el.className = "pbrd-lightbox";

    var dotsHTML = customers.map(function (_, i) {
      return '<button class="pbrd-carousel-dot' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"></button>';
    }).join("");

    el.innerHTML =
      '<button class="pbrd-lightbox-close">\u00D7</button>' +
      '<div class="pbrd-carousel-track">' +
        customers.map(buildCarouselCard).join("") +
      '</div>' +
      '<button class="pbrd-lightbox-nav pbrd-lightbox-prev">' + chevLeftSVG + '</button>' +
      '<button class="pbrd-lightbox-nav pbrd-lightbox-next">' + chevRightSVG + '</button>' +
      '<div class="pbrd-carousel-dots">' + dotsHTML + '</div>';

    document.body.appendChild(el);

    // Close
    el.querySelector(".pbrd-lightbox-close").addEventListener("click", closeLightbox);
    el.addEventListener("click", function (e) {
      if (e.target === el) closeLightbox();
    });

    // Keyboard
    document.addEventListener("keydown", function (e) {
      if (!el.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToCarousel((carouselIdx - 1 + customers.length) % customers.length);
      if (e.key === "ArrowRight") goToCarousel((carouselIdx + 1) % customers.length);
    });

    // Nav buttons
    el.querySelector(".pbrd-lightbox-prev").addEventListener("click", function (e) {
      e.stopPropagation();
      goToCarousel((carouselIdx - 1 + customers.length) % customers.length);
    });
    el.querySelector(".pbrd-lightbox-next").addEventListener("click", function (e) {
      e.stopPropagation();
      goToCarousel((carouselIdx + 1) % customers.length);
    });

    // Dots
    el.querySelectorAll(".pbrd-carousel-dot").forEach(function (dot) {
      dot.addEventListener("click", function (e) {
        e.stopPropagation();
        goToCarousel(parseInt(dot.dataset.idx));
      });
    });

    // Click inactive card to navigate to it
    el.querySelectorAll(".pbrd-carousel-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        var idx = parseInt(card.dataset.idx);
        if (idx !== carouselIdx) {
          e.stopPropagation();
          goToCarousel(idx);
        }
      });
    });

    // Touch swipe
    var track = el.querySelector(".pbrd-carousel-track");
    track.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToCarousel(Math.min(carouselIdx + 1, customers.length - 1));
        else goToCarousel(Math.max(carouselIdx - 1, 0));
      }
    }, { passive: true });

    return el;
  }

  function goToCarousel(idx) {
    carouselIdx = idx;
    if (!lightbox) return;
    var track = lightbox.querySelector(".pbrd-carousel-track");
    var cards = lightbox.querySelectorAll(".pbrd-carousel-card");
    var cardWidth = 360; // card flex-basis + gap

    // Center the active card
    var offset = (window.innerWidth / 2) - (340 / 2) - (idx * cardWidth);
    track.style.transform = "translateX(" + offset + "px)";

    // Update active states
    cards.forEach(function (c, i) {
      c.classList.toggle("active", i === idx);
      var v = c.querySelector("video");
      if (i === idx) { v.currentTime = 0; v.play().catch(function () {}); }
      else { v.pause(); }
    });

    // Update dots
    lightbox.querySelectorAll(".pbrd-carousel-dot").forEach(function (d, i) {
      d.classList.toggle("active", i === idx);
    });
  }

  function showLightbox(idx) {
    if (!lightbox) lightbox = createLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    // Slight delay so the transition plays after display
    requestAnimationFrame(function () { goToCarousel(idx); });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lightbox.querySelectorAll("video").forEach(function (v) { v.pause(); });
  }

  /* ─── Build Cards ─── */
  function buildCard(c, idx) {
    return '<div class="pbrd-customer-card" data-idx="' + idx + '" data-customer="' + c.slug + '">' +
      '<video class="pbrd-customer-video" muted loop playsinline preload="none" poster="' + c.poster + '">' +
        '<source src="' + c.video + '" type="video/mp4">' +
      '</video>' +
      '<div class="pbrd-customer-overlay"></div>' +
      '<div class="pbrd-customer-tag">' + c.industry + '</div>' +
      '<div class="pbrd-customer-content">' +
        (c.logo
          ? '<img class="pbrd-customer-logo" src="' + c.logo + '" alt="' + c.name + '" loading="lazy">'
          : '<div class="pbrd-customer-logo-text">' + c.name + '</div>') +
        '<h3 class="pbrd-customer-name">' + c.name + '</h3>' +
        '<p class="pbrd-customer-stat">' + c.stat + '</p>' +
        '<p class="pbrd-customer-desc">' + c.desc + '</p>' +
      '</div>' +
    '</div>';
  }

  function init() {
    var marquee = document.querySelector('[data-wf--section-partner-marquee--section-theme]');
    if (!marquee) return;

    // Build cards HTML — duplicate the set for seamless infinite loop
    var cardsHTML = customers.map(buildCard).join("");
    var duplicatedCards = cardsHTML + cardsHTML;

    // Calculate marquee duration based on number of cards (more cards = slower)
    var marqueeDur = customers.length * 7; // ~7s per card

    var section = document.createElement("section");
    section.className = "pbrd-customers";

    section.innerHTML =
      '<div class="pbrd-customers-inner">' +
        '<div class="pbrd-customers-header">' +
          '<span class="pbrd-customers-label">Trusted by industry leaders</span>' +
          '<h2>Powering payments for businesses that demand more.</h2>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-customers-marquee">' +
        '<div class="pbrd-customers-track" style="--marquee-dur:' + marqueeDur + 's">' +
          duplicatedCards +
        '</div>' +
      '</div>' +
      '<div class="pbrd-customers-inner">' +
        '<div class="pbrd-customers-cta">' +
          '<a href="/book-demo">Become a success story ' + arrowSVG + '</a>' +
        '</div>' +
      '</div>';

    marquee.replaceWith(section);

    // ─── JS-driven infinite marquee with scroll/swipe ─── //
    var track = section.querySelector(".pbrd-customers-track");
    var marqueeWrap = section.querySelector(".pbrd-customers-marquee");
    var pos = 0;
    var autoSpeed = 0.5; // px per frame
    var isHovering = false;
    var userScrolling = false;
    var userScrollTimer = null;
    var halfWidth = 0;
    var raf = null;

    function measureHalf() {
      // Half the track = width of the original set (first half)
      halfWidth = track.scrollWidth / 2;
    }

    function loop() {
      if (!userScrolling) {
        pos -= autoSpeed;
      }
      // Wrap seamlessly
      if (pos <= -halfWidth) pos += halfWidth;
      if (pos > 0) pos -= halfWidth;
      track.style.transform = "translateX(" + pos + "px)";
      raf = requestAnimationFrame(loop);
    }

    // Start after measuring
    requestAnimationFrame(function () {
      measureHalf();
      loop();
    });

    // Recalculate on resize
    window.addEventListener("resize", measureHalf);

    // Mouse wheel / trackpad horizontal scroll
    marqueeWrap.addEventListener("wheel", function (e) {
      // Use deltaX for horizontal scroll, fallback to deltaY if shift is held or deltaX is 0
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      e.preventDefault();
      pos -= delta * 1.5;

      // Mark as user scrolling, pause auto-advance briefly
      userScrolling = true;
      clearTimeout(userScrollTimer);
      userScrollTimer = setTimeout(function () {
        userScrolling = false;
      }, 1500);
    }, { passive: false });

    // Touch swipe
    var touchStartX = 0;
    var touchLastX = 0;
    marqueeWrap.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
      touchLastX = touchStartX;
      userScrolling = true;
    }, { passive: true });

    marqueeWrap.addEventListener("touchmove", function (e) {
      var x = e.touches[0].clientX;
      var delta = touchLastX - x;
      pos -= delta;
      touchLastX = x;
    }, { passive: true });

    marqueeWrap.addEventListener("touchend", function () {
      userScrolling = false;
    }, { passive: true });

    // Card interactions
    section.querySelectorAll(".pbrd-customer-card").forEach(function (card) {
      var video = card.querySelector("video");

      card.addEventListener("mouseenter", function () {
        if (video) { video.currentTime = 0; video.play().catch(function () {}); }
      });
      card.addEventListener("mouseleave", function () {
        if (video) video.pause();
      });

      card.addEventListener("click", function () {
        var idx = parseInt(card.dataset.idx) % customers.length;
        showLightbox(idx);
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
      }, { rootMargin: "300px" });
      section.querySelectorAll(".pbrd-customer-card").forEach(function (c) { obs.observe(c); });
    }
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
