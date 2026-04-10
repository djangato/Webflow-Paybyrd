(function () {
  "use strict";
  if (!window.location.pathname.includes("/pricing")) return;

  /* ═══════════════════════════════════════════ */
  /* PART 1: Payment Methods Pricing Table      */
  /* ═══════════════════════════════════════════ */

  var paymentMethods = [
    { name: "Visa", category: "cards", region: "Worldwide", fee: "1.50% + \u20AC0.15", icon: "VISA", iconBg: "#1A1F71" },
    { name: "Mastercard", category: "cards", region: "Worldwide", fee: "1.50% + \u20AC0.15", icon: "MC", iconBg: "#EB001B" },
    { name: "American Express", category: "cards", region: "Worldwide", fee: "2.60% + \u20AC0.15", icon: "AMEX", iconBg: "#006FCF" },
    { name: "Discover", category: "cards", region: "Worldwide", fee: "2.40% + \u20AC0.15", icon: "DISC", iconBg: "#FF6000" },
    { name: "Diners Club", category: "cards", region: "Worldwide", fee: "2.40% + \u20AC0.15", icon: "DC", iconBg: "#004A97" },
    { name: "China Union Pay", category: "cards", region: "Worldwide", fee: "2.80% + \u20AC0.15", icon: "CUP", iconBg: "#E21836" },
    { name: "Apple Pay", category: "wallets", region: "Worldwide", fee: "Card rate applies", icon: "AP", iconBg: "#000" },
    { name: "Google Pay", category: "wallets", region: "Worldwide", fee: "Card rate applies", icon: "GP", iconBg: "#4285F4" },
    { name: "Samsung Pay", category: "wallets", region: "Worldwide", fee: "Card rate applies", icon: "SP", iconBg: "#1428A0" },
    { name: "PayPal", category: "wallets", region: "Worldwide", fee: "PayPal rate + \u20AC0.10", icon: "PP", iconBg: "#003087" },
    { name: "Revolut Pay", category: "wallets", region: "Europe", fee: "1.00% + \u20AC0.20", icon: "REV", iconBg: "#0075EB" },
    { name: "SEPA Direct Debit", category: "bank", region: "Europe", fee: "\u20AC0.30", icon: "SEPA", iconBg: "#2D6CA2" },
    { name: "SEPA Instant", category: "bank", region: "Europe", fee: "\u20AC0.35", icon: "SEPA", iconBg: "#2D6CA2" },
    { name: "iDEAL", category: "bank", region: "Netherlands", fee: "\u20AC0.29", icon: "iD", iconBg: "#CC0066" },
    { name: "Multibanco Reference", category: "bank", region: "Portugal", fee: "2.00% + \u20AC0.25", icon: "MB", iconBg: "#1F3B7A" },
    { name: "Klarna", category: "bnpl", region: "Europe", fee: "3.29% + \u20AC0.35", icon: "K", iconBg: "#FFB3C7" },
    { name: "Floa", category: "bnpl", region: "Europe", fee: "2.99% + \u20AC0.35", icon: "FL", iconBg: "#00D26A" },
    { name: "MBWay", category: "local", region: "Portugal", fee: "1.20% + \u20AC0.15", icon: "MBW", iconBg: "#D4002A" },
    { name: "PIX", category: "local", region: "Brazil", fee: "0.99%", icon: "PIX", iconBg: "#32BCAD" },
    { name: "Multicaixa", category: "local", region: "Angola", fee: "Contact us", icon: "MCX", iconBg: "#E3242B" },
    { name: "Multicaixa Express", category: "local", region: "Angola", fee: "Contact us", icon: "MCX", iconBg: "#E3242B" }
  ];

  var categories = [
    { id: "all", label: "All Methods" },
    { id: "cards", label: "Cards" },
    { id: "wallets", label: "Digital Wallets" },
    { id: "bank", label: "Bank Transfers" },
    { id: "bnpl", label: "Buy Now, Pay Later" },
    { id: "local", label: "Local Methods" }
  ];

  var categoryLabels = {
    cards: "Cards",
    wallets: "Digital Wallets",
    bank: "Bank Transfers & Direct Debit",
    bnpl: "Buy Now, Pay Later",
    local: "Local Payment Methods"
  };

  var chevronSVG = '<svg class="pbrd-category-chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function buildMethodIcon(m) {
    return '<div class="pbrd-method-icon" style="background:' + m.iconBg + '"><span style="color:#fff;font-size:0.5rem;font-weight:800;letter-spacing:0.02em;line-height:1">' + m.icon + '</span></div>';
  }

  function buildMethodRow(m) {
    return '<div class="pbrd-method-row" data-category="' + m.category + '">' +
      '<div class="pbrd-method-info">' + buildMethodIcon(m) + '<span class="pbrd-method-name">' + m.name + '</span></div>' +
      '<span class="pbrd-method-region">' + m.region + '</span>' +
      '<span class="pbrd-method-fee">' + m.fee + '</span></div>';
  }

  function buildCategoryGroup(catId, methods) {
    var filtered = methods.filter(function(m) { return m.category === catId; });
    if (!filtered.length) return "";
    return '<div class="pbrd-category-group" data-cat="' + catId + '">' +
      '<div class="pbrd-category-header" role="button" tabindex="0" aria-expanded="true">' +
        '<h3>' + categoryLabels[catId] + '</h3>' +
        '<span class="pbrd-category-count">' + filtered.length + ' method' + (filtered.length > 1 ? 's' : '') + '</span>' +
        chevronSVG + '</div>' +
      '<div class="pbrd-category-items">' + filtered.map(buildMethodRow).join("") + '</div></div>';
  }

  function render(cat) {
    var methods = cat === "all" ? paymentMethods : paymentMethods.filter(function(m) { return m.category === cat; });
    var order = cat === "all" ? Object.keys(categoryLabels) : [cat];
    return order.map(function(c) { return buildCategoryGroup(c, methods); }).join("");
  }

  function bindCategoryToggles(section) {
    section.querySelectorAll(".pbrd-category-header").forEach(function(h) {
      var nh = h.cloneNode(true);
      h.parentNode.replaceChild(nh, h);
      nh.addEventListener("click", function() {
        var g = nh.closest(".pbrd-category-group");
        g.classList.toggle("collapsed");
        nh.setAttribute("aria-expanded", String(!g.classList.contains("collapsed")));
      });
      nh.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); nh.click(); }
      });
    });
  }

  function initPaymentMethods() {
    var gridWrap = document.querySelector(".grid-2_wrap");
    if (!gridWrap) { console.warn("[Paybyrd] grid-2_wrap not found"); return; }

    var section = document.createElement("div");
    section.className = "pbrd-pricing-section";
    section.id = "payment-methods-pricing";

    var filtersHTML = categories.map(function(c) {
      return '<button class="pbrd-filter-btn' + (c.id === "all" ? " active" : "") + '" data-filter="' + c.id + '">' + c.label + '</button>';
    }).join("");

    section.innerHTML =
      '<div class="pbrd-pricing-header">' +
        '<h2>Payment Methods & Fees</h2>' +
        '<p>Transparent pricing across all payment methods. No hidden fees, no surprises \u2014 just simple, competitive rates.</p>' +
      '</div>' +
      '<div class="pbrd-category-filters">' + filtersHTML + '</div>' +
      '<div class="pbrd-pricing-table">' +
        '<div class="pbrd-table-header"><span>Payment method</span><span>Region</span><span>Transaction fee</span></div>' +
        '<div class="pbrd-table-body">' + render("all") + '</div>' +
      '</div>' +
      '<div class="pbrd-pricing-cta">' +
        '<p>Looking for volume pricing or a custom package?<br>We offer tailored rates for high-volume businesses.</p>' +
        '<a href="/book-demo" class="pbrd-cta-button">Get a Custom Quote \u2192</a><br>' +
        '<a href="/payment-methods" class="pbrd-cta-secondary">View all payment methods \u2192</a>' +
      '</div>' +
      '<div class="pbrd-pricing-disclaimer">' +
        'Fees shown are starting rates for the Essential plan. Final rates depend on volume, industry, and card type.<br>' +
        'All fees are in EUR and exclude applicable taxes.</div>';

    // Insert after the grid wrap section
    gridWrap.insertAdjacentElement("afterend", section);

    section.querySelectorAll(".pbrd-filter-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        section.querySelectorAll(".pbrd-filter-btn").forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var body = section.querySelector(".pbrd-table-body");
        body.style.opacity = "0";
        body.style.transition = "opacity 0.15s ease";
        setTimeout(function() {
          body.innerHTML = render(btn.dataset.filter);
          body.style.opacity = "1";
          bindCategoryToggles(section);
        }, 150);
      });
    });

    bindCategoryToggles(section);
  }

  /* ═══════════════════════════════════════════ */
  /* PART 2: POS Terminals Pricing              */
  /* ═══════════════════════════════════════════ */

  var terminals = [
    {
      name: "Paybyrd Rawhide",
      model: "PAX A920 Pro",
      desc: "Sleek portable terminal with high-res touchscreen, 4G & Wi-Fi. Perfect for restaurants, retail, and on-the-go.",
      image: "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/69d9242bbde99c4b80e41c84_paybyrd-pos-tab-04.avif",
      buyPrice: "\u20AC399", rentPrice: "\u20AC19.90",
      featured: true,
      specs: ["Android 10 \u00B7 PCI 6 SRED", "5.5\" HD Touchscreen Display", "4G / Wi-Fi / Bluetooth", "Built-in Printer & Scanner", "All-day Battery Life"]
    },
    {
      name: "Paybyrd Renegade",
      model: "PAX A77",
      desc: "Compact handheld terminal built for speed and mobility. Ideal for delivery, events, and small businesses.",
      image: "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/69d9242bbde99c4b80e41c82_paybyrd-pos-tab-03.avif",
      buyPrice: "\u20AC299", rentPrice: "\u20AC14.90",
      featured: false,
      specs: ["Android 10 \u00B7 PCI 5 SRED", "5.5\" HD Touchscreen Display", "4G / Wi-Fi Connectivity", "13MP Rear + 5MP Front Camera", "Professional Barcode Scanner"]
    },
    {
      name: "Paybyrd Eagle",
      model: "PAX IM30",
      desc: "All-in-one terminal designed for vending machines, kiosks, and unattended environments.",
      image: "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/69d9242bbde99c4b80e41c85_paybyrd-pos-tab-02.avif",
      buyPrice: "\u20AC499", rentPrice: "\u20AC24.90",
      featured: false,
      specs: ["Android 10 \u00B7 PCI 6.x SRED", "5\" HD Touchscreen Display", "IP65 / IK09 Rated", "Seamless Kiosk Integration", "2MP Front Camera"]
    }
  ];

  var checkSVG = '<svg viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function buildTerminalCard(t, mode) {
    var price = mode === "buy" ? t.buyPrice : t.rentPrice;
    var period = mode === "buy" ? "" : "/mo";
    var note = mode === "buy" ? "One-time purchase" : "Minimum 12 months";
    var cta = mode === "buy" ? "Order Now" : "Start Renting";
    var specsList = t.specs.map(function(s) {
      return '<li><span class="pbrd-spec-check">' + checkSVG + '</span>' + s + '</li>';
    }).join("");

    return '<div class="pbrd-terminal-card' + (t.featured ? ' featured' : '') + '">' +
      '<div class="pbrd-terminal-img-wrap"><img src="' + t.image + '" alt="' + t.name + '" loading="lazy"></div>' +
      '<div class="pbrd-terminal-body">' +
        '<h3 class="pbrd-terminal-name">' + t.name + '</h3>' +
        '<p class="pbrd-terminal-model">' + t.model + '</p>' +
        '<p class="pbrd-terminal-desc">' + t.desc + '</p>' +
        '<div class="pbrd-terminal-price">' +
          '<span class="pbrd-price-amount">' + price + '</span><span class="pbrd-price-period">' + period + '</span>' +
          '<div class="pbrd-price-note">' + note + '</div>' +
        '</div>' +
        '<ul class="pbrd-terminal-specs">' + specsList + '</ul>' +
        '<a href="/book-demo" class="pbrd-terminal-cta">' + cta + '</a>' +
      '</div></div>';
  }

  function renderTerminals(mode) {
    return terminals.map(function(t) { return buildTerminalCard(t, mode); }).join("");
  }

  function initPOS() {
    var pmSection = document.getElementById("payment-methods-pricing");
    if (!pmSection) return;

    var section = document.createElement("div");
    section.className = "pbrd-pos-section";
    section.id = "pos-pricing";

    section.innerHTML =
      '<div class="pbrd-pos-header">' +
        '<h2>POS Terminals</h2>' +
        '<p>Enterprise-grade payment terminals with Paybyrd software built in. Buy outright or rent monthly \u2014 your choice.</p>' +
      '</div>' +
      '<div class="pbrd-pos-toggle"><div class="pbrd-pos-toggle-inner">' +
        '<button class="pbrd-toggle-btn active" data-mode="rent">Monthly Rental<span class="pbrd-toggle-badge">Flexible</span></button>' +
        '<button class="pbrd-toggle-btn" data-mode="buy">Buy Outright</button>' +
      '</div></div>' +
      '<div class="pbrd-pos-grid">' + renderTerminals("rent") + '</div>' +
      '<p class="pbrd-pos-note">All terminals include Paybyrd software, security updates, and technical support.<br>' +
        'Rental includes free replacement in case of hardware failure. Prices exclude VAT.</p>';

    pmSection.insertAdjacentElement("afterend", section);

    section.querySelectorAll(".pbrd-toggle-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        section.querySelectorAll(".pbrd-toggle-btn").forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var grid = section.querySelector(".pbrd-pos-grid");
        grid.style.opacity = "0";
        grid.style.transition = "opacity 0.2s ease";
        setTimeout(function() {
          grid.innerHTML = renderTerminals(btn.dataset.mode);
          grid.style.opacity = "1";
        }, 200);
      });
    });
  }

  /* ─── Init ─── */
  function boot() {
    try {
      initPaymentMethods();
      setTimeout(initPOS, 100);
      console.log("[Paybyrd] Pricing sections initialized");
    } catch(err) {
      console.error("[Paybyrd] Pricing error:", err);
    }
  }

  if (document.readyState === "complete") {
    boot();
  } else {
    window.addEventListener("load", boot);
  }
})();

/* ═══════════════════════════════════════════ */
/* Homepage Product Showcase                  */
/* ═══════════════════════════════════════════ */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var CDN = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/";

  var slides = [
    {
      tab: "Platform",
      number: "01",
      title: "Unified Omnichannel Platform",
      desc: "POS, e-commerce, QR codes, kiosks, and pay-by-link \u2014 all managed through one powerful dashboard with real-time data and full control.",
      features: ["Single dashboard for all channels", "Real-time transaction monitoring", "Multi-store and multi-currency support"],
      image: CDN + "69d9242bbde99c4b80e41cae_Frame%201707479734.png",
      link: "/e-commerce", linkText: "Explore the platform"
    },
    {
      tab: "Dashboard",
      number: "02",
      title: "Complete Control Over Your Payments",
      desc: "Track \u20AC16M+ in volume, monitor success rates at 92%, and manage refunds \u2014 all from a beautifully designed mobile-first dashboard.",
      features: ["Revenue analytics by currency", "Success rate & transaction metrics", "Refund management in one tap"],
      image: CDN + "69d9242bbde99c4b80e41cb1_New%20dashboard%20image.png",
      link: "/e-commerce", linkText: "See the dashboard"
    },
    {
      tab: "Transactions",
      number: "03",
      title: "Review, Track, and Issue Refunds Instantly",
      desc: "Every transaction at your fingertips. Filter by date, store, or status. Drill into details, process refunds, and resolve issues in seconds.",
      features: ["Advanced filtering and search", "One-click full or partial refunds", "Complete payment audit trail"],
      image: CDN + "69d9242bbde99c4b80e41cac_Website%20Feedback%20Figma%20(1).png",
      link: "/e-commerce", linkText: "Learn more"
    },
    {
      tab: "Analytics",
      number: "04",
      title: "Real-Time Business Intelligence",
      desc: "Revenue breakdowns by time period, status analysis with 92% success rates, and volume distribution across Visa, Mastercard, MB Way, and more.",
      features: ["Revenue charts by time of day", "Status breakdown (success, failed, pending)", "Volume distribution by payment method"],
      image: CDN + "69d9242bbde99c4b80e41cad_Website%20Feedback%20Figma.png",
      link: "/e-commerce", linkText: "Explore analytics"
    },
    {
      tab: "POS",
      number: "05",
      title: "Enterprise-Grade POS Terminals",
      desc: "Accept payments anywhere with Paybyrd-powered Android terminals. Portable, countertop, or kiosk-integrated \u2014 all running our software.",
      features: ["Android-based smart terminals", "Buy outright or rent monthly", "Built-in printer, scanner, and 4G"],
      image: CDN + "69d9242bbde99c4b80e41c84_paybyrd-pos-tab-04.avif",
      link: "/pos", linkText: "View POS terminals"
    },
    {
      tab: "Payments",
      number: "06",
      title: "192+ Currencies and Every Method That Matters",
      desc: "From Visa and Amex to Pix, MB Way, and Klarna. Multi-acquiring with intelligent routing ensures the highest approval rates globally.",
      features: ["20+ payment methods supported", "Multi-acquiring & smart routing", "Local methods for every market"],
      image: CDN + "69d9242bbde99c4b80e41c72_slider-2_wrap.webp",
      link: "/payment-methods", linkText: "See all payment methods"
    }
  ];

  var currentSlide = 0;
  var autoplayTimer = null;
  var autoplayDuration = 6000;
  var progressStart = 0;
  var progressRAF = null;
  var arrowSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function buildShowcase() {
    var el = document.createElement("section");
    el.className = "pbrd-showcase";
    el.id = "product-showcase";

    var tabsHTML = slides.map(function(s, i) {
      return '<button class="pbrd-showcase-tab' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '">' + s.tab + '</button>';
    }).join("");

    var progressHTML = slides.map(function(_, i) {
      return '<div class="pbrd-progress-bar' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"><div class="pbrd-progress-fill"></div></div>';
    }).join("");

    var s = slides[0];
    el.innerHTML =
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
            '<p>' + s.desc + '</p>' +
            '<ul class="pbrd-showcase-features">' + s.features.map(function(f) { return '<li>' + f + '</li>'; }).join("") + '</ul>' +
            '<a href="' + s.link + '" class="pbrd-showcase-link">' + s.linkText + ' ' + arrowSVG + '</a>' +
          '</div>' +
          '<div class="pbrd-showcase-visual">' +
            '<img src="' + s.image + '" alt="' + s.title + '" class="pbrd-showcase-img" loading="eager">' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-showcase-progress">' + progressHTML + '</div>' +
      '</div>';
    return el;
  }

  function goTo(idx, section) {
    if (idx === currentSlide) return;
    var s = slides[idx];
    var textEl = section.querySelector(".pbrd-showcase-text");
    var imgEl = section.querySelector(".pbrd-showcase-img");

    textEl.classList.add("fading");
    imgEl.classList.add("fading");

    section.querySelectorAll(".pbrd-showcase-tab").forEach(function(t, i) {
      t.classList.toggle("active", i === idx);
    });
    section.querySelectorAll(".pbrd-progress-bar").forEach(function(b, i) {
      b.classList.remove("active", "completed");
      b.querySelector(".pbrd-progress-fill").style.width = "0%";
      if (i < idx) { b.classList.add("completed"); b.querySelector(".pbrd-progress-fill").style.width = "100%"; }
    });

    setTimeout(function() {
      textEl.querySelector(".pbrd-showcase-number").textContent = s.number;
      textEl.querySelector("h3").textContent = s.title;
      textEl.querySelector("p").textContent = s.desc;
      textEl.querySelector(".pbrd-showcase-features").innerHTML = s.features.map(function(f) { return '<li>' + f + '</li>'; }).join("");
      var link = textEl.querySelector(".pbrd-showcase-link");
      link.href = s.link;
      link.innerHTML = s.linkText + ' ' + arrowSVG;
      imgEl.src = s.image;
      imgEl.alt = s.title;
      textEl.classList.remove("fading");
      imgEl.classList.remove("fading");
      currentSlide = idx;
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
      var pct = Math.min(((now - progressStart) / autoplayDuration) * 100, 100);
      fill.style.width = pct + "%";
      if (pct < 100) progressRAF = requestAnimationFrame(tick);
    }
    progressRAF = requestAnimationFrame(tick);
  }

  function startAutoplay(section) {
    stopAutoplay();
    startProgress(section);
    autoplayTimer = setInterval(function() {
      goTo((currentSlide + 1) % slides.length, section);
    }, autoplayDuration);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    cancelAnimationFrame(progressRAF);
  }

  function initShowcase() {
    try {
      var sliderWrap = document.querySelector(".slider-2_wrap");
      if (!sliderWrap) { console.warn("[Paybyrd] slider-2_wrap not found"); return; }

      var section = buildShowcase();

      // Kill any GSAP ScrollTrigger instances tied to the slider
      if (window.ScrollTrigger) {
        ScrollTrigger.getAll().forEach(function(st) {
          if (sliderWrap.contains(st.trigger) || st.trigger === sliderWrap) {
            st.kill();
          }
        });
      }

      // Replace the entire slider section with our showcase
      sliderWrap.replaceWith(section);

      // Tell GSAP to recalculate all scroll positions
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }

      section.querySelectorAll(".pbrd-showcase-tab").forEach(function(tab) {
        tab.addEventListener("click", function() {
          stopAutoplay();
          goTo(parseInt(tab.dataset.idx), section);
          setTimeout(function() { startAutoplay(section); }, autoplayDuration);
        });
      });

      section.querySelectorAll(".pbrd-progress-bar").forEach(function(bar) {
        bar.addEventListener("click", function() {
          stopAutoplay();
          goTo(parseInt(bar.dataset.idx), section);
          setTimeout(function() { startAutoplay(section); }, autoplayDuration);
        });
      });

      var stage = section.querySelector(".pbrd-showcase-stage");
      stage.addEventListener("mouseenter", stopAutoplay);
      stage.addEventListener("mouseleave", function() { startAutoplay(section); });

      startAutoplay(section);

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            if (e.isIntersecting) startAutoplay(section); else stopAutoplay();
          });
        }, { threshold: 0.3 }).observe(section);
      }

      console.log("[Paybyrd] Showcase inserted successfully");
    } catch(err) {
      console.error("[Paybyrd] Showcase error:", err);
    }
  }

  // Try multiple strategies to find and replace the slider
  var showcaseDone = false;

  function tryInit() {
    if (showcaseDone) return;
    if (document.querySelector(".slider-2_wrap")) {
      showcaseDone = true;
      initShowcase();
    }
  }

  // Strategy 1: try immediately (element is in static HTML)
  tryInit();

  // Strategy 2: try on DOMContentLoaded (before Webflow scripts run)
  document.addEventListener("DOMContentLoaded", tryInit);

  // Strategy 3: try on window load
  window.addEventListener("load", function() {
    tryInit();
    // Strategy 4: poll after load in case Webflow delays
    if (!showcaseDone) {
      var attempts = 0;
      var poll = setInterval(function() {
        tryInit();
        if (showcaseDone || ++attempts > 30) clearInterval(poll);
      }, 200);
    }
  });
})();

/* Bento JS is inlined from bento.js */

/* Paybyrd — Bento Grid: Custom Animated Visuals + Spotlight */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ─── Card 0: Conversion Rates — Animated bar chart ─── */
  var vizConversion = '<div class="pbrd-viz pbrd-viz-conversion">' +
    '<div class="pbrd-viz-chart">' +
      '<div class="pbrd-bar" style="--h:35%;--d:0s"><div class="pbrd-bar-fill"></div><span>72%</span></div>' +
      '<div class="pbrd-bar" style="--h:55%;--d:0.15s"><div class="pbrd-bar-fill"></div><span>81%</span></div>' +
      '<div class="pbrd-bar" style="--h:48%;--d:0.3s"><div class="pbrd-bar-fill"></div><span>77%</span></div>' +
      '<div class="pbrd-bar" style="--h:72%;--d:0.45s"><div class="pbrd-bar-fill"></div><span>89%</span></div>' +
      '<div class="pbrd-bar" style="--h:65%;--d:0.6s"><div class="pbrd-bar-fill"></div><span>85%</span></div>' +
      '<div class="pbrd-bar pbrd-bar-accent" style="--h:90%;--d:0.75s"><div class="pbrd-bar-fill"></div><span>98%</span></div>' +
    '</div>' +
    '<div class="pbrd-viz-label">Approval Rate</div>' +
    '<div class="pbrd-viz-trend">+12.4% <svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 8l4-4 4 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></div>' +
  '</div>';

  /* ─── Card 1: Pricing — Fee ticker display ─── */
  var vizPricing = '<div class="pbrd-viz pbrd-viz-pricing">' +
    '<div class="pbrd-fee-row" style="--d:0.1s">' +
      '<div class="pbrd-fee-icon"><svg viewBox="0 0 20 20" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.2" fill="none"/><line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="1.2"/></svg></div>' +
      '<span class="pbrd-fee-name">Visa / Mastercard</span>' +
      '<span class="pbrd-fee-amount">1.50%</span>' +
    '</div>' +
    '<div class="pbrd-fee-row" style="--d:0.25s">' +
      '<div class="pbrd-fee-icon"><svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg></div>' +
      '<span class="pbrd-fee-name">SEPA Direct Debit</span>' +
      '<span class="pbrd-fee-amount">\u20AC0.30</span>' +
    '</div>' +
    '<div class="pbrd-fee-row" style="--d:0.4s">' +
      '<div class="pbrd-fee-icon"><svg viewBox="0 0 20 20" width="20" height="20"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="10" cy="15" r="1" fill="currentColor"/></svg></div>' +
      '<span class="pbrd-fee-name">Apple Pay</span>' +
      '<span class="pbrd-fee-amount">Card rate</span>' +
    '</div>' +
    '<div class="pbrd-fee-row pbrd-fee-highlight" style="--d:0.55s">' +
      '<div class="pbrd-fee-icon"><svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2l2.5 5h5.5l-4.5 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5L2 7h5.5z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg></div>' +
      '<span class="pbrd-fee-name">No hidden fees</span>' +
      '<span class="pbrd-fee-amount">\u20AC0.00</span>' +
    '</div>' +
  '</div>';

  /* ─── Card 2: Security — Shield with pulse ─── */
  var vizSecurity = '<div class="pbrd-viz pbrd-viz-security">' +
    '<div class="pbrd-shield-wrap">' +
      '<div class="pbrd-shield-pulse"></div>' +
      '<div class="pbrd-shield-pulse pbrd-pulse-2"></div>' +
      '<svg class="pbrd-shield-svg" viewBox="0 0 80 96" fill="none">' +
        '<path d="M40 4L8 20v28c0 22 14 38 32 44 18-6 32-22 32-44V20L40 4z" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="rgba(255,255,255,0.03)"/>' +
        '<path class="pbrd-shield-check" d="M28 48l8 8 16-16" stroke="rgba(120,255,180,0.8)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
    '</div>' +
    '<div class="pbrd-security-badges">' +
      '<span class="pbrd-sec-badge" style="--d:0.3s">PCI DSS</span>' +
      '<span class="pbrd-sec-badge" style="--d:0.5s">3D Secure</span>' +
      '<span class="pbrd-sec-badge" style="--d:0.7s">Tokenization</span>' +
    '</div>' +
  '</div>';

  /* ─── Card 3: Business Intelligence — Heatmap + Trend Line ─── */
  // Generate heatmap cells (7 cols x 4 rows — days of week)
  var heatCells = '';
  var heatData = [
    [0.1,0.3,0.4,0.5,0.6,0.8,0.3],
    [0.2,0.5,0.7,0.8,0.9,0.7,0.2],
    [0.15,0.4,0.6,0.9,1.0,0.6,0.15],
    [0.1,0.3,0.5,0.7,0.8,0.5,0.1]
  ];
  var heatLabelsTop = ['M','T','W','T','F','S','S'];
  var heatLabelsLeft = ['06','12','18','00'];
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 7; c++) {
      var op = heatData[r][c];
      var delay = (r * 7 + c) * 0.02;
      heatCells += '<div class="pbrd-heat-cell" style="--op:' + op + ';--d:' + delay + 's"></div>';
    }
  }

  var vizBI = '<div class="pbrd-viz pbrd-viz-bi">' +
    '<div class="pbrd-bi-left">' +
      '<div class="pbrd-bi-kpi" style="--d:0.2s">' +
        '<span class="pbrd-bi-number">\u20AC142</span>' +
        '<span class="pbrd-bi-label">Avg. Ticket</span>' +
      '</div>' +
      '<div class="pbrd-bi-kpi" style="--d:0.4s">' +
        '<span class="pbrd-bi-number">847</span>' +
        '<span class="pbrd-bi-label">Recurring Shoppers</span>' +
      '</div>' +
      '<div class="pbrd-bi-sparkline" style="--d:0.6s">' +
        '<svg viewBox="0 0 120 32" fill="none">' +
          '<path class="pbrd-spark-line" d="M0 28 C10 26, 15 24, 20 22 S30 16, 40 18 S55 12, 65 10 S80 8, 90 5 S105 3, 120 2" stroke="rgba(120,180,255,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
          '<path d="M0 28 C10 26, 15 24, 20 22 S30 16, 40 18 S55 12, 65 10 S80 8, 90 5 S105 3, 120 2 V32 H0Z" fill="url(#pbrd-spark-grad)" opacity="0.3"/>' +
          '<defs><linearGradient id="pbrd-spark-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(120,180,255,0.4)"/><stop offset="100%" stop-color="rgba(120,180,255,0)"/></linearGradient></defs>' +
        '</svg>' +
        '<span class="pbrd-spark-label">12-week trend</span>' +
      '</div>' +
    '</div>' +
    '<div class="pbrd-bi-right">' +
      '<div class="pbrd-heatmap-label">Store Activity</div>' +
      '<div class="pbrd-heatmap-days">' + heatLabelsTop.map(function(d) { return '<span>' + d + '</span>'; }).join('') + '</div>' +
      '<div class="pbrd-heatmap-body">' +
        '<div class="pbrd-heatmap-hours">' + heatLabelsLeft.map(function(h) { return '<span>' + h + '</span>'; }).join('') + '</div>' +
        '<div class="pbrd-heatmap-grid">' + heatCells + '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  /* ─── Card 4: Loyalty — Elegant arc + single metric ─── */
  var vizLoyalty = '<div class="pbrd-viz pbrd-viz-loyalty2">' +
    '<div class="pbrd-loy-arc-wrap">' +
      '<svg class="pbrd-loy-arc" viewBox="0 0 200 120">' +
        '<!-- Track -->' +
        '<path d="M20 110 A80 80 0 0 1 180 110" stroke="rgba(255,255,255,0.04)" stroke-width="6" fill="none" stroke-linecap="round"/>' +
        '<!-- Fill -->' +
        '<path class="pbrd-loy-arc-fill" d="M20 110 A80 80 0 0 1 180 110" stroke="url(#pbrd-arc-gradient)" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="252" stroke-dashoffset="252"/>' +
        '<!-- Glow dot at end -->' +
        '<circle class="pbrd-loy-dot" cx="180" cy="110" r="4" fill="rgba(120,180,255,0.8)" opacity="0"/>' +
        '<defs>' +
          '<linearGradient id="pbrd-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%" stop-color="rgba(255,255,255,0.1)"/>' +
            '<stop offset="100%" stop-color="rgba(120,180,255,0.7)"/>' +
          '</linearGradient>' +
        '</defs>' +
      '</svg>' +
      '<div class="pbrd-loy-center">' +
        '<div class="pbrd-loy-big">94</div>' +
        '<div class="pbrd-loy-unit">NPS</div>' +
      '</div>' +
    '</div>' +
    '<div class="pbrd-loy-footer">' +
      '<div class="pbrd-loy-stat" style="--d:0.6s"><span class="pbrd-loy-stat-val">3.2\u00D7</span><span class="pbrd-loy-stat-lbl">Repeat purchase rate</span></div>' +
      '<div class="pbrd-loy-divider"></div>' +
      '<div class="pbrd-loy-stat" style="--d:0.8s"><span class="pbrd-loy-stat-val">68%</span><span class="pbrd-loy-stat-lbl">Return within 30 days</span></div>' +
    '</div>' +
  '</div>';

  var visuals = [vizConversion, vizPricing, vizSecurity, vizBI, vizLoyalty];

  // Text overrides for cards (index → { tag, heading, desc })
  var textOverrides = {
    3: {
      tag: "Business Intelligence",
      heading: "Know your customers before they walk in",
      desc: "Recurring shoppers, average tickets, and store heatmaps \u2014 insights that turn data into revenue."
    },
    4: {
      tag: "Loyalty",
      heading: "Customers who come back, spend more",
      desc: "Track retention, repeat rates, and lifetime value across every channel."
    }
  };

  function init() {
    var cards = document.querySelectorAll(".card-1_element");
    if (!cards.length) return;

    cards.forEach(function (card, idx) {
      // Replace image area with custom visual
      if (visuals[idx]) {
        var imgWrap = card.querySelector(".card-1_gradient-bg");
        if (imgWrap) {
          var origImg = imgWrap.querySelector(".u-image-wrapper");
          if (origImg) origImg.style.display = "none";

          var vizDiv = document.createElement("div");
          vizDiv.className = "pbrd-viz-container";
          vizDiv.innerHTML = visuals[idx];
          imgWrap.appendChild(vizDiv);
        }
      }

      // Override text content if needed
      if (textOverrides[idx]) {
        var ov = textOverrides[idx];
        var tag = card.querySelector(".tag_wrap-2");
        if (tag) tag.textContent = ov.tag;
        var h3 = card.querySelector(".card-1_content h3");
        if (h3) h3.textContent = ov.heading;
        var p = card.querySelector(".card-1_content .u-color-faded p");
        if (p) p.textContent = ov.desc;
      }

      // Add cursor spotlight
      var spot = document.createElement("div");
      spot.className = "pbrd-spotlight";
      card.appendChild(spot);
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        spot.style.left = (e.clientX - r.left) + "px";
        spot.style.top = (e.clientY - r.top) + "px";
      });
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();

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
