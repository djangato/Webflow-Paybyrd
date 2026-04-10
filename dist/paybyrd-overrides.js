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

/* ═══════════════════════════════════════════ */
/* Bento Grid — Cursor Spotlight Effect       */
/* ═══════════════════════════════════════════ */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  function initSpotlight() {
    var cards = document.querySelectorAll(".card-1_element");
    if (!cards.length) return;
    cards.forEach(function (card) {
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
    initSpotlight();
  } else {
    window.addEventListener("load", initSpotlight);
  }
})();
