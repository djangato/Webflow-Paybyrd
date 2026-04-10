/* Paybyrd Webflow Overrides — Homepage Product Showcase */

(function () {
  "use strict";

  // Only run on the homepage
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var CDN = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/";

  var slides = [
    {
      tab: "Platform",
      number: "01",
      title: "Unified Omnichannel Platform",
      description: "POS, e-commerce, QR codes, kiosks, and pay-by-link \u2014 all managed through one powerful dashboard with real-time data and full control.",
      features: [
        "Single dashboard for all channels",
        "Real-time transaction monitoring",
        "Multi-store and multi-currency support"
      ],
      image: CDN + "69d9242bbde99c4b80e41cae_Frame%201707479734.png",
      link: "/e-commerce",
      linkText: "Explore the platform"
    },
    {
      tab: "Dashboard",
      number: "02",
      title: "Complete Control Over Your Payments",
      description: "Track \u20AC16M+ in volume, monitor success rates at 92%, and manage refunds \u2014 all from a beautifully designed mobile-first dashboard.",
      features: [
        "Revenue analytics by currency",
        "Success rate & transaction metrics",
        "Refund management in one tap"
      ],
      image: CDN + "69d9242bbde99c4b80e41cb1_New%20dashboard%20image.png",
      link: "/e-commerce",
      linkText: "See the dashboard"
    },
    {
      tab: "Transactions",
      number: "03",
      title: "Review, Track, and Issue Refunds Instantly",
      description: "Every transaction at your fingertips. Filter by date, store, or status. Drill into details, process refunds, and resolve issues in seconds.",
      features: [
        "Advanced filtering and search",
        "One-click full or partial refunds",
        "Complete payment audit trail"
      ],
      image: CDN + "69d9242bbde99c4b80e41cac_Website%20Feedback%20Figma%20(1).png",
      link: "/e-commerce",
      linkText: "Learn more"
    },
    {
      tab: "Analytics",
      number: "04",
      title: "Real-Time Business Intelligence",
      description: "Revenue breakdowns by time period, status analysis with 92% success rates, and volume distribution across Visa, Mastercard, MB Way, and more.",
      features: [
        "Revenue charts by time of day",
        "Status breakdown (success, failed, pending)",
        "Volume distribution by payment method"
      ],
      image: CDN + "69d9242bbde99c4b80e41cad_Website%20Feedback%20Figma.png",
      link: "/e-commerce",
      linkText: "Explore analytics"
    },
    {
      tab: "POS",
      number: "05",
      title: "Enterprise-Grade POS Terminals",
      description: "Accept payments anywhere with Paybyrd-powered Android terminals. Portable, countertop, or kiosk-integrated \u2014 all running our software.",
      features: [
        "Android-based smart terminals",
        "Buy outright or rent monthly",
        "Built-in printer, scanner, and 4G"
      ],
      image: CDN + "69d9242bbde99c4b80e41c84_paybyrd-pos-tab-04.avif",
      link: "/pos",
      linkText: "View POS terminals"
    },
    {
      tab: "Payments",
      number: "06",
      title: "192+ Currencies and Every Method That Matters",
      description: "From Visa and Amex to Pix, MB Way, and Klarna. Multi-acquiring with intelligent routing ensures the highest approval rates globally.",
      features: [
        "20+ payment methods supported",
        "Multi-acquiring & smart routing",
        "Local methods for every market"
      ],
      image: CDN + "69d9242bbde99c4b80e41c72_slider-2_wrap.webp",
      link: "/payment-methods",
      linkText: "See all payment methods"
    }
  ];

  var currentSlide = 0;
  var autoplayInterval = null;
  var autoplayDuration = 6000;
  var progressStart = 0;
  var progressRAF = null;

  var arrowSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function buildSection() {
    var section = document.createElement("section");
    section.className = "pbrd-showcase";
    section.id = "product-showcase";

    var tabsHTML = slides.map(function(s, i) {
      return '<button class="pbrd-showcase-tab' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '">' + s.tab + '</button>';
    }).join("");

    var progressHTML = slides.map(function(_, i) {
      return '<div class="pbrd-progress-bar' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"><div class="pbrd-progress-fill"></div></div>';
    }).join("");

    var s = slides[0];

    section.innerHTML =
      '<div class="pbrd-showcase-inner">' +
        '<div class="pbrd-showcase-header">' +
          '<span class="pbrd-showcase-label">The Paybyrd Platform</span>' +
          '<h2>Everything you need to accept payments, everywhere.</h2>' +
          '<p>One platform for online, in-store, and mobile payments \u2014 with the tools to grow.</p>' +
        '</div>' +
        '<div class="pbrd-showcase-tabs">' + tabsHTML + '</div>' +
        '<div class="pbrd-showcase-stage">' +
          '<div class="pbrd-showcase-text">' +
            '<div class="pbrd-showcase-number">' + s.number + '</div>' +
            '<h3>' + s.title + '</h3>' +
            '<p>' + s.description + '</p>' +
            '<ul class="pbrd-showcase-features">' +
              s.features.map(function(f) { return '<li>' + f + '</li>'; }).join("") +
            '</ul>' +
            '<a href="' + s.link + '" class="pbrd-showcase-link">' + s.linkText + ' ' + arrowSVG + '</a>' +
          '</div>' +
          '<div class="pbrd-showcase-visual">' +
            '<img src="' + s.image + '" alt="' + s.title + '" class="pbrd-showcase-img" loading="eager">' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-showcase-progress">' + progressHTML + '</div>' +
      '</div>';

    return section;
  }

  function goToSlide(idx, section) {
    if (idx === currentSlide) return;

    var s = slides[idx];
    var textEl = section.querySelector(".pbrd-showcase-text");
    var imgEl = section.querySelector(".pbrd-showcase-img");

    // Fade out
    textEl.classList.add("fading");
    imgEl.classList.add("fading");

    // Update tabs
    section.querySelectorAll(".pbrd-showcase-tab").forEach(function(t, i) {
      t.classList.toggle("active", i === idx);
    });

    // Update progress bars
    section.querySelectorAll(".pbrd-progress-bar").forEach(function(b, i) {
      b.classList.remove("active", "completed");
      b.querySelector(".pbrd-progress-fill").style.width = "0%";
      if (i < idx) {
        b.classList.add("completed");
        b.querySelector(".pbrd-progress-fill").style.width = "100%";
      }
    });

    setTimeout(function() {
      // Update content
      textEl.querySelector(".pbrd-showcase-number").textContent = s.number;
      textEl.querySelector("h3").textContent = s.title;
      textEl.querySelector("p").textContent = s.description;
      var featUl = textEl.querySelector(".pbrd-showcase-features");
      featUl.innerHTML = s.features.map(function(f) { return '<li>' + f + '</li>'; }).join("");
      var link = textEl.querySelector(".pbrd-showcase-link");
      link.href = s.link;
      link.innerHTML = s.linkText + ' ' + arrowSVG;

      // Update image
      imgEl.src = s.image;
      imgEl.alt = s.title;

      // Fade in
      textEl.classList.remove("fading");
      imgEl.classList.remove("fading");

      currentSlide = idx;

      // Start progress animation
      startProgress(section);
    }, 350);
  }

  function startProgress(section) {
    cancelAnimationFrame(progressRAF);
    var bar = section.querySelectorAll(".pbrd-progress-bar")[currentSlide];
    if (!bar) return;
    bar.classList.add("active");
    var fill = bar.querySelector(".pbrd-progress-fill");
    progressStart = performance.now();

    function tick(now) {
      var elapsed = now - progressStart;
      var pct = Math.min((elapsed / autoplayDuration) * 100, 100);
      fill.style.width = pct + "%";
      if (pct < 100) {
        progressRAF = requestAnimationFrame(tick);
      }
    }
    progressRAF = requestAnimationFrame(tick);
  }

  function startAutoplay(section) {
    stopAutoplay();
    startProgress(section);
    autoplayInterval = setInterval(function() {
      var next = (currentSlide + 1) % slides.length;
      goToSlide(next, section);
    }, autoplayDuration);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    cancelAnimationFrame(progressRAF);
  }

  function init() {
    var sliderWrap = document.querySelector(".slider-2_wrap");
    if (!sliderWrap) return;

    var section = buildSection();

    // Insert before the hidden slider section
    sliderWrap.parentElement.insertBefore(section, sliderWrap);

    // Animate in
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    requestAnimationFrame(function() {
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    });

    // Tab clicks
    section.querySelectorAll(".pbrd-showcase-tab").forEach(function(tab) {
      tab.addEventListener("click", function() {
        var idx = parseInt(tab.dataset.idx);
        stopAutoplay();
        goToSlide(idx, section);
        // Restart autoplay after manual interaction
        setTimeout(function() { startAutoplay(section); }, autoplayDuration);
      });
    });

    // Progress bar clicks
    section.querySelectorAll(".pbrd-progress-bar").forEach(function(bar) {
      bar.addEventListener("click", function() {
        var idx = parseInt(bar.dataset.idx);
        stopAutoplay();
        goToSlide(idx, section);
        setTimeout(function() { startAutoplay(section); }, autoplayDuration);
      });
    });

    // Pause on hover
    var stage = section.querySelector(".pbrd-showcase-stage");
    stage.addEventListener("mouseenter", stopAutoplay);
    stage.addEventListener("mouseleave", function() { startAutoplay(section); });

    // Start
    startAutoplay(section);

    // Intersection observer - only autoplay when visible
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            startAutoplay(section);
          } else {
            stopAutoplay();
          }
        });
      }, { threshold: 0.3 });
      obs.observe(section);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
