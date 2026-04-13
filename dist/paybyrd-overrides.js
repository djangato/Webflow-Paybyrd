/* Paybyrd Webflow Overrides — Utilities */
/* Helper functions */
/* Paybyrd Webflow Overrides — Interactions */
/* Payment Methods Pricing Table */

(function () {
  "use strict";

  // Only run on the pricing page
  if (!window.location.pathname.includes("/pricing")) return;

  /* ─── Payment Methods Data ─── */
  const paymentMethods = [
    // Cards
    { name: "Visa", category: "cards", region: "Worldwide", fee: "1.50% + €0.15", icon: "VISA", iconBg: "#1A1F71" },
    { name: "Mastercard", category: "cards", region: "Worldwide", fee: "1.50% + €0.15", icon: "MC", iconBg: "#EB001B" },
    { name: "American Express", category: "cards", region: "Worldwide", fee: "2.60% + €0.15", icon: "AMEX", iconBg: "#006FCF" },
    { name: "Discover", category: "cards", region: "Worldwide", fee: "2.40% + €0.15", icon: "DISC", iconBg: "#FF6000" },
    { name: "Diners Club", category: "cards", region: "Worldwide", fee: "2.40% + €0.15", icon: "DC", iconBg: "#004A97" },
    { name: "China Union Pay", category: "cards", region: "Worldwide", fee: "2.80% + €0.15", icon: "CUP", iconBg: "#E21836" },

    // Digital Wallets
    { name: "Apple Pay", category: "wallets", region: "Worldwide", fee: "Card rate applies", icon: "AP", iconBg: "#000" },
    { name: "Google Pay", category: "wallets", region: "Worldwide", fee: "Card rate applies", icon: "GP", iconBg: "#4285F4" },
    { name: "Samsung Pay", category: "wallets", region: "Worldwide", fee: "Card rate applies", icon: "SP", iconBg: "#1428A0" },
    { name: "PayPal", category: "wallets", region: "Worldwide", fee: "PayPal rate + €0.10", icon: "PP", iconBg: "#003087" },
    { name: "Revolut Pay", category: "wallets", region: "Europe", fee: "1.00% + €0.20", icon: "REV", iconBg: "#0075EB" },

    // Bank Transfers & Direct Debit
    { name: "SEPA Direct Debit", category: "bank", region: "Europe", fee: "€0.30", icon: "SEPA", iconBg: "#2D6CA2" },
    { name: "SEPA Instant", category: "bank", region: "Europe", fee: "€0.35", icon: "SEPA", iconBg: "#2D6CA2" },
    { name: "iDEAL", category: "bank", region: "Netherlands", fee: "€0.29", icon: "iD", iconBg: "#CC0066" },
    { name: "Multibanco Reference", category: "bank", region: "Portugal", fee: "2.00% + €0.25", icon: "MB", iconBg: "#1F3B7A" },

    // Buy Now Pay Later
    { name: "Klarna", category: "bnpl", region: "Europe", fee: "3.29% + €0.35", icon: "K", iconBg: "#FFB3C7" },
    { name: "Floa", category: "bnpl", region: "Europe", fee: "2.99% + €0.35", icon: "FL", iconBg: "#00D26A" },

    // Local Payment Methods
    { name: "MBWay", category: "local", region: "Portugal", fee: "1.20% + €0.15", icon: "MBW", iconBg: "#D4002A" },
    { name: "PIX", category: "local", region: "Brazil", fee: "0.99%", icon: "PIX", iconBg: "#32BCAD" },
    { name: "Multicaixa", category: "local", region: "Angola", fee: "Contact us", icon: "MCX", iconBg: "#E3242B" },
    { name: "Multicaixa Express", category: "local", region: "Angola", fee: "Contact us", icon: "MCX", iconBg: "#E3242B" },
  ];

  const categories = [
    { id: "all", label: "All Methods" },
    { id: "cards", label: "Cards" },
    { id: "wallets", label: "Digital Wallets" },
    { id: "bank", label: "Bank Transfers" },
    { id: "bnpl", label: "Buy Now, Pay Later" },
    { id: "local", label: "Local Methods" },
  ];

  const categoryLabels = {
    cards: "Cards",
    wallets: "Digital Wallets",
    bank: "Bank Transfers & Direct Debit",
    bnpl: "Buy Now, Pay Later",
    local: "Local Payment Methods",
  };

  /* ─── SVG Icons ─── */
  const chevronSVG = `<svg class="pbrd-category-chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ─── Render Functions ─── */
  function buildMethodIcon(method) {
    return `<div class="pbrd-method-icon" style="background:${method.iconBg}"><span style="color:#fff;font-size:0.5rem;font-weight:800;letter-spacing:0.02em;line-height:1">${method.icon}</span></div>`;
  }

  function buildMethodRow(method) {
    return `
      <div class="pbrd-method-row" data-category="${method.category}">
        <div class="pbrd-method-info">
          ${buildMethodIcon(method)}
          <span class="pbrd-method-name">${method.name}</span>
        </div>
        <span class="pbrd-method-region">${method.region}</span>
        <span class="pbrd-method-fee">${method.fee}</span>
      </div>`;
  }

  function buildCategoryGroup(catId, methods) {
    const filtered = methods.filter((m) => m.category === catId);
    if (filtered.length === 0) return "";
    return `
      <div class="pbrd-category-group" data-cat="${catId}">
        <div class="pbrd-category-header" role="button" tabindex="0" aria-expanded="true">
          <h3>${categoryLabels[catId]}</h3>
          <span class="pbrd-category-count">${filtered.length} method${filtered.length > 1 ? "s" : ""}</span>
          ${chevronSVG}
        </div>
        <div class="pbrd-category-items">
          ${filtered.map(buildMethodRow).join("")}
        </div>
      </div>`;
  }

  function render(filteredCategory) {
    const methods = filteredCategory === "all"
      ? paymentMethods
      : paymentMethods.filter((m) => m.category === filteredCategory);

    const groupOrder = filteredCategory === "all"
      ? Object.keys(categoryLabels)
      : [filteredCategory];

    return groupOrder.map((catId) => buildCategoryGroup(catId, methods)).join("");
  }

  /* ─── Build Full Section ─── */
  function buildSection() {
    const section = document.createElement("div");
    section.className = "pbrd-pricing-section";
    section.id = "payment-methods-pricing";

    section.innerHTML = `
      <div class="pbrd-pricing-header">
        <h2>Payment Methods & Fees</h2>
        <p>Transparent pricing across all payment methods. No hidden fees, no surprises — just simple, competitive rates.</p>
      </div>

      <div class="pbrd-category-filters">
        ${categories
          .map(
            (c) =>
              `<button class="pbrd-filter-btn${c.id === "all" ? " active" : ""}" data-filter="${c.id}">${c.label}</button>`
          )
          .join("")}
      </div>

      <div class="pbrd-pricing-table">
        <div class="pbrd-table-header">
          <span>Payment method</span>
          <span>Region</span>
          <span>Transaction fee</span>
        </div>
        <div class="pbrd-table-body">
          ${render("all")}
        </div>
      </div>

      <div class="pbrd-pricing-cta">
        <p>Looking for volume pricing or a custom package?<br>We offer tailored rates for high-volume businesses.</p>
        <a href="/book-demo" class="pbrd-cta-button">Get a Custom Quote →</a>
        <br>
        <a href="/payment-methods" class="pbrd-cta-secondary">View all payment methods →</a>
      </div>

      <div class="pbrd-pricing-disclaimer">
        Fees shown are starting rates for the Essential plan. Final rates depend on volume, industry, and card type.<br>
        All fees are in EUR and exclude applicable taxes.
      </div>
    `;

    return section;
  }

  /* ─── Insert into Page ─── */
  function init() {
    // Find the pricing cards grid and insert after it
    const gridWrap = document.querySelector(".grid-2_wrap");
    if (!gridWrap) return;

    // Walk up to the nearest section-level parent
    let insertAfter = gridWrap;
    while (
      insertAfter.parentElement &&
      !insertAfter.parentElement.classList.contains("u-content-wrapper") &&
      insertAfter.parentElement.tagName !== "MAIN" &&
      insertAfter.parentElement.tagName !== "BODY"
    ) {
      insertAfter = insertAfter.parentElement;
    }

    const section = buildSection();

    // Animate in
    section.style.opacity = "0";
    section.style.transform = "translateY(24px)";
    insertAfter.parentElement.insertBefore(section, insertAfter.nextSibling);

    requestAnimationFrame(() => {
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    });

    // ─── Event Listeners ─── //

    // Category filter buttons
    section.querySelectorAll(".pbrd-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        section.querySelectorAll(".pbrd-filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        const body = section.querySelector(".pbrd-table-body");
        body.style.opacity = "0";
        body.style.transition = "opacity 0.15s ease";
        setTimeout(() => {
          body.innerHTML = render(cat);
          body.style.opacity = "1";
          bindCategoryToggles(section);
        }, 150);
      });
    });

    bindCategoryToggles(section);
  }

  function bindCategoryToggles(section) {
    section.querySelectorAll(".pbrd-category-header").forEach((header) => {
      // Remove existing listeners by cloning
      const newHeader = header.cloneNode(true);
      header.parentNode.replaceChild(newHeader, header);

      newHeader.addEventListener("click", () => {
        const group = newHeader.closest(".pbrd-category-group");
        group.classList.toggle("collapsed");
        const expanded = !group.classList.contains("collapsed");
        newHeader.setAttribute("aria-expanded", String(expanded));
      });

      newHeader.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          newHeader.click();
        }
      });
    });
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ═══════════════════════════════════════════════ */
  /* ─── POS Terminals Pricing Section ─── */
  /* ═══════════════════════════════════════════════ */

  const terminals = [
    {
      name: "Paybyrd Rawhide",
      model: "PAX A920 Pro",
      description: "Sleek portable terminal with high-res touchscreen, 4G & Wi-Fi. Perfect for restaurants, retail, and on-the-go.",
      image: "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/69d9242bbde99c4b80e41c84_paybyrd-pos-tab-04.avif",
      buyPrice: "€399",
      rentPrice: "€19.90",
      featured: true,
      specs: [
        "Android 10 · PCI 6 SRED",
        "5.5\" HD Touchscreen Display",
        "4G / Wi-Fi / Bluetooth",
        "Built-in Printer & Scanner",
        "All-day Battery Life",
      ],
    },
    {
      name: "Paybyrd Renegade",
      model: "PAX A77",
      description: "Compact handheld terminal built for speed and mobility. Ideal for delivery, events, and small businesses.",
      image: "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/69d9242bbde99c4b80e41c82_paybyrd-pos-tab-03.avif",
      buyPrice: "€299",
      rentPrice: "€14.90",
      featured: false,
      specs: [
        "Android 10 · PCI 5 SRED",
        "5.5\" HD Touchscreen Display",
        "4G / Wi-Fi Connectivity",
        "13MP Rear + 5MP Front Camera",
        "Professional Barcode Scanner",
      ],
    },
    {
      name: "Paybyrd Eagle",
      model: "PAX IM30",
      description: "All-in-one terminal designed for vending machines, kiosks, and unattended environments.",
      image: "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/69d9242bbde99c4b80e41c85_paybyrd-pos-tab-02.avif",
      buyPrice: "€499",
      rentPrice: "€24.90",
      featured: false,
      specs: [
        "Android 10 · PCI 6.x SRED",
        "5\" HD Touchscreen Display",
        "IP65 / IK09 Rated",
        "Seamless Kiosk Integration",
        "2MP Front Camera",
      ],
    },
  ];

  const checkSVG = `<svg viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function buildTerminalCard(terminal, mode) {
    const price = mode === "buy" ? terminal.buyPrice : terminal.rentPrice;
    const period = mode === "buy" ? "" : "/mo";
    const note = mode === "buy" ? "One-time purchase" : "Minimum 12 months";

    return `
      <div class="pbrd-terminal-card${terminal.featured ? " featured" : ""}">
        <div class="pbrd-terminal-img-wrap">
          <img src="${terminal.image}" alt="${terminal.name}" loading="lazy">
        </div>
        <div class="pbrd-terminal-body">
          <h3 class="pbrd-terminal-name">${terminal.name}</h3>
          <p class="pbrd-terminal-model">${terminal.model}</p>
          <p class="pbrd-terminal-desc">${terminal.description}</p>
          <div class="pbrd-terminal-price">
            <span class="pbrd-price-amount">${price}</span><span class="pbrd-price-period">${period}</span>
            <div class="pbrd-price-note">${note}</div>
          </div>
          <ul class="pbrd-terminal-specs">
            ${terminal.specs
              .map(
                (s) =>
                  `<li><span class="pbrd-spec-check">${checkSVG}</span>${s}</li>`
              )
              .join("")}
          </ul>
          <a href="/book-demo" class="pbrd-terminal-cta">${mode === "buy" ? "Order Now" : "Start Renting"}</a>
        </div>
      </div>`;
  }

  function renderTerminals(mode) {
    return terminals.map((t) => buildTerminalCard(t, mode)).join("");
  }

  function buildPOSSection() {
    const section = document.createElement("div");
    section.className = "pbrd-pos-section";
    section.id = "pos-pricing";

    section.innerHTML = `
      <div class="pbrd-pos-header">
        <h2>POS Terminals</h2>
        <p>Enterprise-grade payment terminals with Paybyrd software built in. Buy outright or rent monthly — your choice.</p>
      </div>

      <div class="pbrd-pos-toggle">
        <div class="pbrd-pos-toggle-inner">
          <button class="pbrd-toggle-btn active" data-mode="rent">Monthly Rental<span class="pbrd-toggle-badge">Flexible</span></button>
          <button class="pbrd-toggle-btn" data-mode="buy">Buy Outright</button>
        </div>
      </div>

      <div class="pbrd-pos-grid">
        ${renderTerminals("rent")}
      </div>

      <p class="pbrd-pos-note">
        All terminals include Paybyrd software, security updates, and technical support.<br>
        Rental includes free replacement in case of hardware failure. Prices exclude VAT.
      </p>
    `;

    return section;
  }

  function initPOS() {
    const pricingSection = document.getElementById("payment-methods-pricing");
    if (!pricingSection) return;

    const section = buildPOSSection();
    section.style.opacity = "0";
    section.style.transform = "translateY(24px)";
    pricingSection.parentElement.insertBefore(section, pricingSection.nextSibling);

    requestAnimationFrame(() => {
      section.style.transition = "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s";
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    });

    // Toggle buy/rent
    section.querySelectorAll(".pbrd-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        section.querySelectorAll(".pbrd-toggle-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.mode;
        const grid = section.querySelector(".pbrd-pos-grid");
        grid.style.opacity = "0";
        grid.style.transition = "opacity 0.2s ease";
        setTimeout(() => {
          grid.innerHTML = renderTerminals(mode);
          grid.style.opacity = "1";
        }, 200);
      });
    });
  }

  // The POS section depends on the payment methods section being inserted first
  // Use a small delay to ensure ordering
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(initPOS, 100));
  } else {
    setTimeout(initPOS, 100);
  }
})();
/* Paybyrd — Rewrite CTA button text and URLs */
(function () {
  "use strict";

  function init() {
    // Find all Webflow native buttons
    document.querySelectorAll("a.button-main_wrap").forEach(function (btn) {
      var textEl = btn.querySelector(".button-main_text");
      if (!textEl) return;
      var text = textEl.textContent.trim().toLowerCase();

      // Rewrite "Start Now", "Get Started", "Getting Started"
      if (text === "start now" || text === "get started" || text === "getting started") {
        textEl.textContent = "Start Risk-Free";
        btn.href = "https://beta.paybyrd.com";
      }
    });

    // Also fix the onboard.paybyrd.com links we injected
    document.querySelectorAll('a[href*="onboard.paybyrd.com"]').forEach(function (link) {
      link.href = "https://beta.paybyrd.com";
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — Mid-Page CTA Enhancement */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var checkSVG = '<svg class="pbrd-mid-cta-stat-icon" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5l-7 7L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function init() {
    var original = document.querySelector(".grid-1_button_wrap");
    if (!original) return;

    var section = document.createElement("div");
    section.className = "pbrd-mid-cta";

    section.innerHTML =
      '<div class="pbrd-mid-cta-card">' +
        '<div class="pbrd-mid-cta-text">' +
          '<h3>Try Paybyrd. Risk free.</h3>' +
          '<p>Not happy in the first 30 days? We\u2019ll refund every commission. No questions, no catches \u2014 just a team that\u2019s confident you\u2019ll stay.</p>' +
          '<div class="pbrd-mid-cta-stats">' +
            '<div class="pbrd-mid-cta-stat">' + checkSVG + '<span>30-day money-back guarantee</span></div>' +
            '<div class="pbrd-mid-cta-stat">' + checkSVG + '<span>Live in under 4 hours</span></div>' +
            '<div class="pbrd-mid-cta-stat">' + checkSVG + '<span>No contracts, cancel anytime</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-mid-cta-actions">' +
          '<a href="https://beta.paybyrd.com" class="pbrd-mid-cta-primary">Start Risk-Free \u2192</a>' +
          '<a href="/book-demo" class="pbrd-mid-cta-secondary">Talk to Sales</a>' +
        '</div>' +
      '</div>';

    // Insert where the old CTA was
    original.parentElement.insertBefore(section, original);
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — Hero Enhancement, Sticky CTA, Exit Intent */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ═══════════════════════════════════════════ */
  /* 1. Animated Gradient Mesh Background       */
  /* ═══════════════════════════════════════════ */

  function initFibers() {
    var container = document.createElement("div");
    container.className = "pbrd-hero-fibers";

    // Fibers spread across the full viewport height
    var fibers = [
      // Top cluster (hero area) — slightly brighter
      { top: 8, left: -5, width: 65, angle: 1.5, color: "rgba(140,120,220,0.35)", glow: "rgba(160,140,255,0.6)", dur: 4, travel: 3.5, delay: 0 },
      { top: 18, left: 10, width: 80, angle: -1.2, color: "rgba(100,130,240,0.3)", glow: "rgba(120,150,255,0.55)", dur: 5, travel: 4.2, delay: 1.2 },
      { top: 30, left: -8, width: 70, angle: 0.8, color: "rgba(150,100,220,0.25)", glow: "rgba(170,130,255,0.5)", dur: 6, travel: 5, delay: 0.5 },

      // Middle section
      { top: 38, left: 15, width: 55, angle: -1.8, color: "rgba(120,140,255,0.18)", glow: "rgba(140,160,255,0.4)", dur: 5.5, travel: 4.5, delay: 2 },
      { top: 46, left: -3, width: 75, angle: 1, color: "rgba(130,100,210,0.15)", glow: "rgba(160,130,240,0.35)", dur: 7, travel: 5.5, delay: 0.8 },
      { top: 54, left: 20, width: 50, angle: -0.5, color: "rgba(100,120,230,0.14)", glow: "rgba(130,150,255,0.3)", dur: 6, travel: 4.8, delay: 3 },

      // Lower section
      { top: 64, left: -6, width: 68, angle: 1.3, color: "rgba(140,110,220,0.12)", glow: "rgba(170,140,255,0.28)", dur: 5, travel: 5.2, delay: 1.5 },
      { top: 72, left: 12, width: 60, angle: -1.5, color: "rgba(110,130,240,0.1)", glow: "rgba(140,160,255,0.25)", dur: 6.5, travel: 6, delay: 2.5 },
      { top: 80, left: -2, width: 72, angle: 0.6, color: "rgba(130,100,220,0.1)", glow: "rgba(160,130,255,0.22)", dur: 7.5, travel: 5.8, delay: 4 },

      // Bottom
      { top: 88, left: 8, width: 55, angle: -0.8, color: "rgba(100,120,240,0.08)", glow: "rgba(130,150,255,0.2)", dur: 6, travel: 6.5, delay: 1 },
      { top: 94, left: -4, width: 65, angle: 1.2, color: "rgba(140,120,220,0.08)", glow: "rgba(160,140,255,0.18)", dur: 8, travel: 7, delay: 3.5 },
    ];

    fibers.forEach(function (f) {
      var el = document.createElement("div");
      el.className = "pbrd-fiber";
      el.style.cssText =
        "top:" + f.top + "%;" +
        "left:" + f.left + "%;" +
        "width:" + f.width + "%;" +
        "transform:rotate(" + f.angle + "deg);" +
        "--color:" + f.color + ";" +
        "--glow:" + f.glow + ";" +
        "--dur:" + f.dur + "s;" +
        "--travel:" + f.travel + "s;" +
        "--delay:" + f.delay + "s;";
      container.appendChild(el);
    });

    document.body.insertBefore(container, document.body.firstChild);
  }

  /* ═══════════════════════════════════════════ */
  /* 2. Live Transaction Ticker                 */
  /* ═══════════════════════════════════════════ */

  var tickerData = [
    { amount: "\u20AC47.90", method: "Visa", city: "Lisbon" },
    { amount: "\u20AC183.00", method: "Mastercard", city: "Amsterdam" },
    { amount: "\u20AC12.50", method: "MB Way", city: "Porto" },
    { amount: "\u20AC299.00", method: "Klarna", city: "Berlin" },
    { amount: "\u20AC64.30", method: "Apple Pay", city: "London" },
    { amount: "R$156.00", method: "PIX", city: "S\u00E3o Paulo" },
    { amount: "\u20AC421.80", method: "SEPA", city: "Munich" },
    { amount: "\u20AC38.90", method: "PayPal", city: "Paris" },
    { amount: "\u20AC89.00", method: "iDEAL", city: "Rotterdam" },
    { amount: "\u20AC1,240.00", method: "Amex", city: "Dubai" },
    { amount: "Kz45,000", method: "Multicaixa", city: "Luanda" },
    { amount: "\u20AC27.50", method: "Google Pay", city: "Madrid" }
  ];

  function initTicker() {
    var heroWrap = document.querySelector(".hero-main_layout") || document.querySelector(".hero-main_contain");
    if (!heroWrap) return;

    // Find the button wrapper to insert after
    var btnWrap = heroWrap.querySelector(".u-button-wrapper");
    if (!btnWrap) return;

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ticker-wrap";
    wrap.innerHTML =
      '<div class="pbrd-ticker">' +
        '<div class="pbrd-ticker-dot"></div>' +
        '<div class="pbrd-ticker-text"><span class="pbrd-ticker-item"></span></div>' +
        '<span class="pbrd-ticker-time">just now</span>' +
      '</div>';

    btnWrap.insertAdjacentElement("afterend", wrap);

    var textEl = wrap.querySelector(".pbrd-ticker-item");
    var timeEl = wrap.querySelector(".pbrd-ticker-time");
    var idx = 0;
    var times = ["just now", "2s ago", "5s ago", "just now", "1s ago", "3s ago"];

    function showNext() {
      var t = tickerData[idx % tickerData.length];
      textEl.className = "";
      void textEl.offsetWidth; // force reflow
      textEl.className = "pbrd-ticker-item";
      textEl.innerHTML = '<span class="pbrd-ticker-amount">' + t.amount + '</span> \u00B7 <span class="pbrd-ticker-method">' + t.method + '</span> \u00B7 ' + t.city;
      timeEl.textContent = times[idx % times.length];
      idx++;
    }

    showNext();
    setInterval(showNext, 2200);
  }

  /* ═══════════════════════════════════════════ */
  /* 3. Sticky CTA Bar                          */
  /* ═══════════════════════════════════════════ */

  function initStickyCTA() {
    var bar = document.createElement("div");
    bar.className = "pbrd-sticky-cta";
    bar.innerHTML =
      '<div class="pbrd-sticky-inner">' +
        '<div class="pbrd-sticky-text"><strong>Start processing payments today.</strong> No setup fees, no commitment.</div>' +
        '<a href="https://beta.paybyrd.com" class="pbrd-sticky-btn">Get Started Free</a>' +
        '<button class="pbrd-sticky-dismiss">\u00D7</button>' +
      '</div>';
    document.body.appendChild(bar);

    var dismissed = false;
    var heroHeight = 0;
    var hero = document.querySelector(".hero-main_contain");
    if (hero) heroHeight = hero.offsetTop + hero.offsetHeight;

    // Show after scrolling past the hero
    window.addEventListener("scroll", function () {
      if (dismissed) return;
      var scrollY = window.scrollY || window.pageYOffset;
      bar.classList.toggle("visible", scrollY > heroHeight);
    }, { passive: true });

    // Dismiss button
    bar.querySelector(".pbrd-sticky-dismiss").addEventListener("click", function () {
      dismissed = true;
      bar.classList.remove("visible");
      sessionStorage.setItem("pbrd-sticky-dismissed", "1");
    });

    // Check if already dismissed this session
    if (sessionStorage.getItem("pbrd-sticky-dismissed")) {
      dismissed = true;
    }
  }

  /* ═══════════════════════════════════════════ */
  /* 4. Exit Intent Popup                       */
  /* ═══════════════════════════════════════════ */

  function initExitIntent() {
    var shown = false;

    var overlay = document.createElement("div");
    overlay.className = "pbrd-exit-overlay";
    overlay.innerHTML =
      '<div class="pbrd-exit-card">' +
        '<div class="pbrd-exit-accent"></div>' +
        '<button class="pbrd-exit-close">\u00D7</button>' +
        '<div class="pbrd-exit-body">' +
          '<div class="pbrd-exit-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
          '<h3>Get a tailored payment proposal</h3>' +
          '<p class="pbrd-exit-subtitle">In 15 minutes, we\u2019ll show you exactly how much you can save and which payment methods will grow your revenue.</p>' +
          '<div class="pbrd-exit-proof">' +
            '<div class="pbrd-exit-proof-item"><span class="pbrd-exit-proof-val">98%</span><span class="pbrd-exit-proof-lbl">Approval rate</span></div>' +
            '<div class="pbrd-exit-proof-item"><span class="pbrd-exit-proof-val">24h</span><span class="pbrd-exit-proof-lbl">Setup time</span></div>' +
            '<div class="pbrd-exit-proof-item"><span class="pbrd-exit-proof-val">\u20AC0</span><span class="pbrd-exit-proof-lbl">Setup fee</span></div>' +
          '</div>' +
          '<a href="/book-demo" class="pbrd-exit-cta">Book a 15-Min Call \u2192</a>' +
          '<button class="pbrd-exit-skip">I\u2019ll come back later</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    function showPopup() {
      if (shown) return;
      if (sessionStorage.getItem("pbrd-exit-shown")) return;
      shown = true;
      sessionStorage.setItem("pbrd-exit-shown", "1");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closePopup() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    // Exit intent: mouse leaves viewport at the top
    document.addEventListener("mouseout", function (e) {
      if (e.clientY <= 0 && e.relatedTarget === null) {
        // Only trigger after user has been on the page for 5+ seconds
        showPopup();
      }
    });

    // Close handlers
    overlay.querySelector(".pbrd-exit-close").addEventListener("click", closePopup);
    overlay.querySelector(".pbrd-exit-skip").addEventListener("click", closePopup);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) closePopup();
    });

    // Delay activation — don't trigger exit intent in the first 5 seconds
    var activated = false;
    setTimeout(function () { activated = true; }, 5000);
    var origShow = showPopup;
    showPopup = function () {
      if (activated) origShow();
    };
  }

  /* ─── Init All ─── */
  function init() {
    initFibers();
    initTicker();
    initStickyCTA();
    initExitIntent();
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — Book Demo Page Enhancement */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/book-demo")) return;

  var LOGOS_CDN = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";
  // Image swapping is now handled by book-demo-visuals.js

  var lockSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M5 7V5a3 3 0 016 0v2M3 7h10a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  var checkSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5l-7 7L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var infoSVG = '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1"/><path d="M8 7v4M8 5.5v0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';

  // Step hints — contextual micro-copy
  var stepHints = {
    "Payment Channels": "This helps us tailor the demo to your exact setup \u2014 POS, online, or both.",
    "Message": "Even a one-liner helps. We\u2019ll prepare specific solutions for your call.",
    "Payment Volume": "Lets us show you the right pricing tier and volume discounts.",
    "Company Details": "We\u2019ll research your business beforehand so the call is 100% relevant.",
    "Person Details": "So we know who we\u2019re speaking with.",
    "Contact Details": "We\u2019ll send a calendar invite with a direct link. No spam, ever."
  };

  // Step names for counter
  var stepNames = ["Book a Call", "Payment Channels", "Message", "Payment Volume", "Company Details", "Person Details", "Contact Details"];
  var totalSteps = stepNames.length - 1; // exclude the landing step

  var logos = [
    LOGOS_CDN + "69d9242bbde99c4b80e41dcc_tap-logo.svg",
    LOGOS_CDN + "69d9242bbde99c4b80e41dce_vila-gale.svg",
    LOGOS_CDN + "69d9242bbde99c4b80e41dd2_decathlo-logo-02.svg",
    LOGOS_CDN + "69d9242bbde99c4b80e41dd1_WINK.svg",
    LOGOS_CDN + "69d9242bbde99c4b80e41dcb_kabuki.svg"
  ];

  function init() {
    var form = document.querySelector(".multi-02_form_element");
    if (!form) return;

    // ─── 1. Progress bar ─── //
    var progressWrap = document.createElement("div");
    progressWrap.className = "pbrd-demo-progress";
    progressWrap.innerHTML = '<div class="pbrd-demo-progress-fill"></div>';
    document.body.appendChild(progressWrap);
    var progressFill = progressWrap.querySelector(".pbrd-demo-progress-fill");

    // ─── 2. Social proof strip (below form area) ─── //
    var formWrap = document.querySelector(".multi-02_form_wrap");
    if (formWrap) {
      var proof = document.createElement("div");
      proof.className = "pbrd-demo-proof";
      proof.innerHTML =
        '<div class="pbrd-demo-proof-item">' + checkSVG + '<span>Free 15-min consultation</span></div>' +
        '<div class="pbrd-demo-proof-item">' + checkSVG + '<span>No commitment required</span></div>' +
        '<div class="pbrd-demo-proof-item">' + lockSVG + '<span>Your data is secure</span></div>';
      formWrap.appendChild(proof);

      // Customer logos
      var logosWrap = document.createElement("div");
      logosWrap.className = "pbrd-demo-logos";
      logosWrap.innerHTML = logos.map(function (src) {
        return '<img src="' + src + '" alt="" loading="lazy">';
      }).join("");
      formWrap.appendChild(logosWrap);
    }

    // ─── 3. Enhance each step with counter + hints ─── //
    var fieldsets = form.querySelectorAll("fieldset");

    fieldsets.forEach(function (fs, idx) {
      var stepName = fs.getAttribute("if-step");
      if (!stepName || stepName === "Book a Call") return;

      var stepNum = stepNames.indexOf(stepName);
      if (stepNum < 1) return;

      // Step counter
      var counter = document.createElement("div");
      counter.className = "pbrd-demo-step-count";
      counter.textContent = "Step " + stepNum + " of " + totalSteps;
      fs.insertBefore(counter, fs.firstChild);

      // Contextual hint
      if (stepHints[stepName]) {
        var hint = document.createElement("div");
        hint.className = "pbrd-demo-hint";
        hint.innerHTML = infoSVG + '<span>' + stepHints[stepName] + '</span>';
        // Insert before the button wrapper
        var btnWrap = fs.querySelector(".u-button-wrapper");
        if (btnWrap) {
          btnWrap.parentElement.insertBefore(hint, btnWrap);
        }
      }
    });

    // ─── 4. Override submit button text ─── //
    var submitText = document.querySelector(".submit_button_text");
    if (submitText) {
      submitText.textContent = "Book My Free Call";
    }

    // ─── 5. Override hero headline ─── //
    var heroH1 = form.querySelector("h1");
    if (heroH1) {
      heroH1.textContent = "Let\u2019s find you more revenue.";
    }
    var heroP = form.closest("fieldset");
    if (heroP) {
      var desc = heroP.querySelector(".u-rich-text p");
      if (desc) {
        desc.textContent = "A free 15-minute call to uncover hidden savings, boost approval rates, and build a payment setup that actually fits your business.";
      }
    }

    // ─── 6. Track step changes for progress bar ─── //
    var observer = new MutationObserver(function () {
      fieldsets.forEach(function (fs, idx) {
        var stepName = fs.getAttribute("if-step");
        var stepNum = stepNames.indexOf(stepName);
        if (stepNum < 0) return;

        var style = window.getComputedStyle(fs);
        if (style.display !== "none" && style.visibility !== "hidden") {
          var pct = stepNum === 0 ? 0 : (stepNum / totalSteps) * 100;
          progressFill.style.width = pct + "%";
        }
      });
    });

    observer.observe(form, { attributes: true, childList: true, subtree: true });

    // Also check on click of Next/Back buttons
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[if-element]");
      if (btn) {
        setTimeout(function () {
          observer.takeRecords();
          // Trigger a manual check
          var evt = document.createEvent("Event");
          evt.initEvent("change", true, true);
          form.dispatchEvent(evt);
        }, 100);
      }
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — Bento Grid: Fintech Visuals + Spotlight */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ─── Card 0: Conversion Rates — Bold approval chart ─── */
  var vizConversion =
    '<div class="pbrd-viz pbrd-viz-conversion">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both">' +
        '<div class="pbrd-bv-label">Approval Rate</div>' +
        '<div class="pbrd-bv-hero-row">' +
          '<span class="pbrd-bv-big">98.2<span class="pbrd-bv-unit">%</span></span>' +
          '<span class="pbrd-bv-trend-up">+12.4%</span>' +
        '</div>' +
        '<div class="pbrd-bv-chart">' +
          '<div class="pbrd-bv-bar" style="--h:35%;--d:0.1s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:52%;--d:0.15s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:45%;--d:0.2s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:68%;--d:0.25s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:60%;--d:0.3s"></div>' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-accent" style="--h:90%;--d:0.35s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:72%;--d:0.4s"></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 1: Pricing — Rate display ─── */
  var vizPricing =
    '<div class="pbrd-viz pbrd-viz-pricing">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both">' +
        '<div class="pbrd-bv-label">Transaction Fee</div>' +
        '<div class="pbrd-bv-big" style="margin:4px 0">1.50<span class="pbrd-bv-unit">%</span></div>' +
        '<div class="pbrd-bv-sublabel">+ \u20AC0.15 per transaction</div>' +
        '<div class="pbrd-bv-divider"></div>' +
        '<div class="pbrd-bv-row">' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">\u20AC0</span><span class="pbrd-bv-mini-lbl">Setup</span></div>' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">\u20AC0</span><span class="pbrd-bv-mini-lbl">Monthly</span></div>' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">T+1</span><span class="pbrd-bv-mini-lbl">Payout</span></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 2: Security — Shield with badges ─── */
  var vizSecurity =
    '<div class="pbrd-viz pbrd-viz-security">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;text-align:center">' +
        '<svg class="pbrd-bv-shield" viewBox="0 0 60 72" fill="none" style="width:48px;height:58px;margin:0 auto 12px">' +
          '<path d="M30 3L6 15v21c0 16.5 10.5 28.5 24 33 13.5-4.5 24-16.5 24-33V15L30 3z" stroke="rgba(120,255,180,0.4)" stroke-width="1.5" fill="rgba(120,255,180,0.03)"/>' +
          '<path class="pbrd-bv-check" d="M21 36l6 6 12-12" stroke="rgba(120,255,180,0.8)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
        '<div class="pbrd-bv-pills">' +
          '<span class="pbrd-bv-pill" style="--d:0.2s">PCI DSS</span>' +
          '<span class="pbrd-bv-pill" style="--d:0.3s">3DS2</span>' +
          '<span class="pbrd-bv-pill" style="--d:0.4s">Tokens</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 3: Business Intelligence — Heatmap + KPIs ─── */
  var heatCells = '';
  var heatData = [
    [0.1,0.3,0.4,0.5,0.6,0.8,0.3],
    [0.2,0.5,0.7,0.8,0.9,0.7,0.2],
    [0.15,0.4,0.6,0.9,1.0,0.6,0.15],
    [0.1,0.3,0.5,0.7,0.8,0.5,0.1]
  ];
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 7; c++) {
      heatCells += '<div class="pbrd-heat-cell" style="--op:' + heatData[r][c] + ';--d:' + (r*7+c)*0.02 + 's"></div>';
    }
  }

  var vizBI =
    '<div class="pbrd-viz pbrd-viz-bi">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;flex:1">' +
        '<div style="display:flex;gap:16px;align-items:flex-start">' +
          '<div style="flex:1">' +
            '<div class="pbrd-bv-label">Recurring Shoppers</div>' +
            '<div class="pbrd-bv-big" style="margin:4px 0;font-size:1.75rem">847</div>' +
            '<div class="pbrd-bv-sublabel">\u20AC142 avg. ticket</div>' +
            '<div style="margin-top:12px">' +
              '<div class="pbrd-bv-label">12-Week Trend</div>' +
              '<svg viewBox="0 0 120 28" style="width:100%;height:28px;margin-top:4px"><path d="M0 24 C10 22, 15 20, 20 18 S30 14, 40 16 S55 10, 65 8 S80 6, 90 4 S105 2, 120 1" stroke="rgba(120,180,255,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-dasharray="200" stroke-dashoffset="200" style="animation:pbrd-line-draw 1.5s 0.5s ease forwards"/><path d="M0 24 C10 22, 15 20, 20 18 S30 14, 40 16 S55 10, 65 8 S80 6, 90 4 S105 2, 120 1 V28 H0Z" fill="url(#pbrd-bv-spark)" opacity="0.3"/><defs><linearGradient id="pbrd-bv-spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(120,180,255,0.4)"/><stop offset="100%" stop-color="rgba(120,180,255,0)"/></linearGradient></defs></svg>' +
            '</div>' +
          '</div>' +
          '<div style="flex-shrink:0">' +
            '<div class="pbrd-bv-label" style="margin-bottom:6px">Activity</div>' +
            '<div class="pbrd-bv-heatgrid-sm">' + heatCells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 4: Loyalty — NPS arc + retention ─── */
  var vizLoyalty =
    '<div class="pbrd-viz pbrd-viz-loyalty2">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;flex:1">' +
        '<div style="display:flex;gap:20px;align-items:center">' +
          '<div style="flex-shrink:0;position:relative;width:90px;height:90px">' +
            '<svg viewBox="0 0 40 40" style="width:100%;height:100%"><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2.5"/><circle cx="20" cy="20" r="17" fill="none" stroke="url(#pbrd-bv-ring-g)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="107" stroke-dashoffset="107" transform="rotate(-90 20 20)" style="animation:pbrd-bv-ring 1.2s 0.4s ease forwards"/><defs><linearGradient id="pbrd-bv-ring-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="rgba(255,255,255,0.15)"/><stop offset="100%" stop-color="rgba(120,180,255,0.7)"/></linearGradient></defs></svg>' +
            '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><span style="font-size:1.25rem;font-weight:300;color:#fff;letter-spacing:-0.03em">94</span><span style="font-size:0.4375rem;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.08em">NPS</span></div>' +
          '</div>' +
          '<div style="flex:1">' +
            '<div class="pbrd-bv-label">Customer Loyalty</div>' +
            '<div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">' +
              '<div class="pbrd-bv-loyalty-row" style="animation:pbrd-fade-in 0.4s 0.3s both"><span class="pbrd-bv-loyalty-val">3.2\u00D7</span><span class="pbrd-bv-loyalty-lbl">Repeat purchase rate</span></div>' +
              '<div class="pbrd-bv-loyalty-row" style="animation:pbrd-fade-in 0.4s 0.45s both"><span class="pbrd-bv-loyalty-val">68%</span><span class="pbrd-bv-loyalty-lbl">Return within 30 days</span></div>' +
              '<div class="pbrd-bv-loyalty-row" style="animation:pbrd-fade-in 0.4s 0.6s both"><span class="pbrd-bv-loyalty-val">\u20AC218</span><span class="pbrd-bv-loyalty-lbl">Lifetime avg. spend</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var visuals = [vizConversion, vizPricing, vizSecurity, vizBI, vizLoyalty];

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

      if (textOverrides[idx]) {
        var ov = textOverrides[idx];
        var tag = card.querySelector(".tag_wrap-2");
        if (tag) tag.textContent = ov.tag;
        var h3 = card.querySelector(".card-1_content h3");
        if (h3) h3.textContent = ov.heading;
        var p = card.querySelector(".card-1_content .u-color-faded p");
        if (p) p.textContent = ov.desc;
      }

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
/* Paybyrd Webflow Overrides — Homepage Product Showcase */

(function () {
  "use strict";

  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ─── Custom visuals per tab ─── */

  var vizPlatform =
    '<div class="pbrd-sv">' +
      '<div class="pbrd-sv-row">' +
        '<div class="pbrd-sv-card pbrd-sv-card-hero" style="animation:pbrd-sv-up 0.5s ease both">' +
          '<div class="pbrd-sv-label">Total Volume</div>' +
          '<div class="pbrd-sv-big">\u20AC3,529,455<span class="pbrd-sv-unit">.09</span></div>' +
          '<div class="pbrd-sv-minis">' +
            '<div class="pbrd-sv-mini"><span class="pbrd-sv-mini-v">42,108</span><span class="pbrd-sv-mini-l">Transactions</span></div>' +
            '<div class="pbrd-sv-mini"><span class="pbrd-sv-mini-v">\u20AC83.82</span><span class="pbrd-sv-mini-l">Avg. Ticket</span></div>' +
            '<div class="pbrd-sv-mini"><span class="pbrd-sv-mini-v">97.8%</span><span class="pbrd-sv-mini-l">Approval</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-sv-row">' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.15s both;flex:1">' +
          '<div class="pbrd-sv-label">Revenue by Channel</div>' +
          '<div class="pbrd-sv-bars">' +
            '<div class="pbrd-sv-hbar"><span class="pbrd-sv-hbar-label">E-Commerce</span><div class="pbrd-sv-hbar-track"><div class="pbrd-sv-hbar-fill" style="width:72%;--d:0.3s"></div></div><span class="pbrd-sv-hbar-val">72%</span></div>' +
            '<div class="pbrd-sv-hbar"><span class="pbrd-sv-hbar-label">POS</span><div class="pbrd-sv-hbar-track"><div class="pbrd-sv-hbar-fill pbrd-sv-hbar-accent" style="width:22%;--d:0.4s"></div></div><span class="pbrd-sv-hbar-val">22%</span></div>' +
            '<div class="pbrd-sv-hbar"><span class="pbrd-sv-hbar-label">Pay-by-Link</span><div class="pbrd-sv-hbar-track"><div class="pbrd-sv-hbar-fill" style="width:6%;--d:0.5s"></div></div><span class="pbrd-sv-hbar-val">6%</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.25s both;flex:1">' +
          '<div class="pbrd-sv-label">Currencies</div>' +
          '<div class="pbrd-sv-pills">' +
            '<span class="pbrd-sv-pill pbrd-sv-pill-on">EUR</span><span class="pbrd-sv-pill">USD</span><span class="pbrd-sv-pill">GBP</span><span class="pbrd-sv-pill pbrd-sv-pill-on">BRL</span><span class="pbrd-sv-pill">AOA</span><span class="pbrd-sv-pill">CZK</span>' +
          '</div>' +
          '<div class="pbrd-sv-big" style="font-size:1.25rem;margin-top:8px">192+</div>' +
          '<div class="pbrd-sv-sublabel">supported currencies</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var vizDashboard =
    '<div class="pbrd-sv">' +
      '<div class="pbrd-sv-card pbrd-sv-card-hero" style="animation:pbrd-sv-up 0.5s ease both">' +
        '<div class="pbrd-sv-label">Dashboard Overview</div>' +
        '<div class="pbrd-sv-big">\u20AC1,449,898<span class="pbrd-sv-unit">.20</span></div>' +
        '<div class="pbrd-sv-chart-area">' +
          '<div class="pbrd-sv-vbar" style="--h:30%;--d:0.1s"></div>' +
          '<div class="pbrd-sv-vbar" style="--h:48%;--d:0.15s"></div>' +
          '<div class="pbrd-sv-vbar" style="--h:42%;--d:0.2s"></div>' +
          '<div class="pbrd-sv-vbar" style="--h:65%;--d:0.25s"></div>' +
          '<div class="pbrd-sv-vbar pbrd-sv-vbar-hi" style="--h:88%;--d:0.3s"></div>' +
          '<div class="pbrd-sv-vbar" style="--h:55%;--d:0.35s"></div>' +
          '<div class="pbrd-sv-vbar" style="--h:38%;--d:0.4s"></div>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-sv-row">' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.2s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem;color:rgba(120,255,180,0.8)">92%</div>' +
          '<div class="pbrd-sv-sublabel">Success Rate</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.3s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem">16,532</div>' +
          '<div class="pbrd-sv-sublabel">Transactions</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.4s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem">144</div>' +
          '<div class="pbrd-sv-sublabel">Refunds</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var vizTransactions =
    '<div class="pbrd-sv">' +
      '<div class="pbrd-sv-card pbrd-sv-card-hero" style="animation:pbrd-sv-up 0.5s ease both">' +
        '<div class="pbrd-sv-label">Latest Transactions</div>' +
        '<div class="pbrd-sv-txlist">' +
          '<div class="pbrd-sv-tx" style="--d:0.1s"><span class="pbrd-sv-tx-amount">\u20AC107.80</span><span class="pbrd-sv-tx-method">Visa</span><span class="pbrd-sv-tx-status pbrd-sv-tx-success">Success</span></div>' +
          '<div class="pbrd-sv-tx" style="--d:0.18s"><span class="pbrd-sv-tx-amount">\u20AC14.00</span><span class="pbrd-sv-tx-method">MB Way</span><span class="pbrd-sv-tx-status pbrd-sv-tx-processing">Processing</span></div>' +
          '<div class="pbrd-sv-tx" style="--d:0.26s"><span class="pbrd-sv-tx-amount">\u20AC12.50</span><span class="pbrd-sv-tx-method">Mastercard</span><span class="pbrd-sv-tx-status pbrd-sv-tx-success">Success</span></div>' +
          '<div class="pbrd-sv-tx" style="--d:0.34s"><span class="pbrd-sv-tx-amount">\u20AC299.00</span><span class="pbrd-sv-tx-method">Klarna</span><span class="pbrd-sv-tx-status pbrd-sv-tx-success">Success</span></div>' +
          '<div class="pbrd-sv-tx" style="--d:0.42s"><span class="pbrd-sv-tx-amount">\u20AC43.20</span><span class="pbrd-sv-tx-method">PayPal</span><span class="pbrd-sv-tx-status pbrd-sv-tx-success">Success</span></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var vizAnalytics =
    '<div class="pbrd-sv">' +
      '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease both">' +
        '<div class="pbrd-sv-label">Revenue by Time of Day</div>' +
        '<div class="pbrd-sv-big" style="margin-bottom:4px">\u20AC2,093,631<span class="pbrd-sv-unit">.60</span></div>' +
        '<div class="pbrd-sv-chart-area" style="height:72px">' +
          '<div class="pbrd-sv-vbar" style="--h:20%;--d:0.1s"></div>' +
          '<div class="pbrd-sv-vbar" style="--h:45%;--d:0.15s"></div>' +
          '<div class="pbrd-sv-vbar pbrd-sv-vbar-hi" style="--h:92%;--d:0.2s"></div>' +
          '<div class="pbrd-sv-vbar" style="--h:35%;--d:0.25s"></div>' +
        '</div>' +
        '<div class="pbrd-sv-chart-labels"><span>00-06</span><span>06-12</span><span>12-18</span><span>18-24</span></div>' +
      '</div>' +
      '<div class="pbrd-sv-row">' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.2s both;flex:1">' +
          '<div class="pbrd-sv-label">Status Breakdown</div>' +
          '<div class="pbrd-sv-status-bars">' +
            '<div class="pbrd-sv-sbar"><div class="pbrd-sv-sbar-fill" style="width:92%;background:rgba(120,255,180,0.5)"></div></div>' +
          '</div>' +
          '<div class="pbrd-sv-status-row"><span class="pbrd-sv-dot" style="background:rgba(120,255,180,0.6)"></span><span>Success</span><strong>11,832</strong></div>' +
          '<div class="pbrd-sv-status-row"><span class="pbrd-sv-dot" style="background:rgba(255,100,100,0.5)"></span><span>Failed</span><strong>772</strong></div>' +
          '<div class="pbrd-sv-status-row"><span class="pbrd-sv-dot" style="background:rgba(255,180,60,0.5)"></span><span>Pending</span><strong>257</strong></div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.3s both;flex:1">' +
          '<div class="pbrd-sv-label">By Method</div>' +
          '<div class="pbrd-sv-pills" style="margin-top:6px">' +
            '<span class="pbrd-sv-pill pbrd-sv-pill-on">Visa</span><span class="pbrd-sv-pill pbrd-sv-pill-on">Mastercard</span><span class="pbrd-sv-pill">MB Way</span><span class="pbrd-sv-pill">Multibanco</span><span class="pbrd-sv-pill">PayPal</span><span class="pbrd-sv-pill">+8 more</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var vizPOS =
    '<div class="pbrd-sv">' +
      '<div class="pbrd-sv-row">' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-label">Terminal Fleet</div>' +
          '<div class="pbrd-sv-big" style="font-size:2.5rem;margin:8px 0">3</div>' +
          '<div class="pbrd-sv-sublabel">Models available</div>' +
          '<div class="pbrd-sv-pills" style="margin-top:12px;justify-content:center">' +
            '<span class="pbrd-sv-pill pbrd-sv-pill-on">Rawhide</span><span class="pbrd-sv-pill">Renegade</span><span class="pbrd-sv-pill">Eagle</span>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.15s both;flex:1">' +
          '<div class="pbrd-sv-label">Specs</div>' +
          '<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">' +
            '<div class="pbrd-sv-spec"><span>Android 10</span><span class="pbrd-sv-spec-val">PCI 6</span></div>' +
            '<div class="pbrd-sv-spec"><span>5.5" HD</span><span class="pbrd-sv-spec-val">Touchscreen</span></div>' +
            '<div class="pbrd-sv-spec"><span>4G + Wi-Fi</span><span class="pbrd-sv-spec-val">Bluetooth</span></div>' +
            '<div class="pbrd-sv-spec"><span>Printer</span><span class="pbrd-sv-spec-val">Scanner</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.3s both">' +
        '<div class="pbrd-sv-minis">' +
          '<div class="pbrd-sv-mini"><span class="pbrd-sv-mini-v">\u20AC19.90</span><span class="pbrd-sv-mini-l">Rent / month</span></div>' +
          '<div class="pbrd-sv-mini"><span class="pbrd-sv-mini-v">\u20AC399</span><span class="pbrd-sv-mini-l">Buy outright</span></div>' +
          '<div class="pbrd-sv-mini"><span class="pbrd-sv-mini-v">\u20AC0</span><span class="pbrd-sv-mini-l">Replacement</span></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var vizPayments =
    '<div class="pbrd-sv">' +
      '<div class="pbrd-sv-card pbrd-sv-card-hero" style="animation:pbrd-sv-up 0.5s ease both">' +
        '<div class="pbrd-sv-label">Payment Methods</div>' +
        '<div class="pbrd-sv-method-grid">' +
          '<div class="pbrd-sv-method" style="--d:0.05s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/visa.png" alt="Visa"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.1s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/mastercard.png" alt="Mastercard"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.15s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/amex.png" alt="Amex"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.2s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/applepay.png" alt="Apple Pay"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.25s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/googlepay.png" alt="Google Pay"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.3s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/paypal.png" alt="PayPal"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.35s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/mbway.png" alt="MBWay"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.4s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/ideal.png" alt="iDEAL"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.45s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/klarna.png" alt="Klarna"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.5s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/discover.png" alt="Discover"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.55s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/diners.png" alt="Diners Club"></div>' +
          '<div class="pbrd-sv-method" style="--d:0.6s;--bg:#fff"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/multibanco.png" alt="Multibanco"></div>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-sv-row">' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.3s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem;color:rgba(120,180,255,0.8)">20+</div>' +
          '<div class="pbrd-sv-sublabel">Methods</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.35s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem;color:rgba(120,180,255,0.8)">40+</div>' +
          '<div class="pbrd-sv-sublabel">Countries</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.4s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem;color:rgba(120,180,255,0.8)">192+</div>' +
          '<div class="pbrd-sv-sublabel">Currencies</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Integrations — Ecosystem ─── */
  var vizIntegrations =
    '<div class="pbrd-sv">' +
      '<div class="pbrd-sv-card pbrd-sv-card-hero" style="animation:pbrd-sv-up 0.5s ease both">' +
        '<div class="pbrd-sv-label">Integration Ecosystem</div>' +
        '<div class="pbrd-sv-integration-grid">' +
          '<div class="pbrd-sv-integration" style="--d:0.05s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/woocommerce.svg" alt="WooCommerce"></div><span class="pbrd-sv-int-name">WooCommerce</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
          '<div class="pbrd-sv-integration" style="--d:0.1s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/magento.svg" alt="Magento"></div><span class="pbrd-sv-int-name">Magento</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
          '<div class="pbrd-sv-integration" style="--d:0.15s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/prestashop.svg" alt="PrestaShop"></div><span class="pbrd-sv-int-name">PrestaShop</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
          '<div class="pbrd-sv-integration" style="--d:0.2s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/moloni.svg" alt="Moloni"></div><span class="pbrd-sv-int-name">Moloni</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
          '<div class="pbrd-sv-integration" style="--d:0.25s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/host.png" alt="Host HMS"></div><span class="pbrd-sv-int-name">Host HMS</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
          '<div class="pbrd-sv-integration" style="--d:0.3s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/newhotel.svg" alt="Newhotel"></div><span class="pbrd-sv-int-name">Newhotel</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
          '<div class="pbrd-sv-integration" style="--d:0.35s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/oracle.svg" alt="Oracle"></div><span class="pbrd-sv-int-name">Oracle</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
          '<div class="pbrd-sv-integration" style="--d:0.4s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/whatsapp.svg" alt="WhatsApp"></div><span class="pbrd-sv-int-name">WhatsApp</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
          '<div class="pbrd-sv-integration" style="--d:0.45s"><div class="pbrd-sv-int-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/sap.svg" alt="SAP"></div><span class="pbrd-sv-int-name">SAP</span><span class="pbrd-sv-int-badge pbrd-sv-int-live">Live</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-sv-row">' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.3s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem;color:rgba(120,180,255,0.8)">9+</div>' +
          '<div class="pbrd-sv-sublabel">Plug-ins</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.35s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem;color:rgba(120,180,255,0.8)">&lt;1h</div>' +
          '<div class="pbrd-sv-sublabel">Setup Time</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.4s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-big" style="font-size:1.5rem;color:rgba(120,255,180,0.8)">REST</div>' +
          '<div class="pbrd-sv-sublabel">API Available</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Intelligence — Shopper Profiles ─── */
  var vizIntelligence =
    '<div class="pbrd-sv">' +
      '<div class="pbrd-sv-card pbrd-sv-card-hero" style="animation:pbrd-sv-up 0.5s ease both">' +
        '<div class="pbrd-sv-label">Top Customers \u2014 Auto-Identified</div>' +
        '<div class="pbrd-sv-customer-list">' +
          '<div class="pbrd-sv-customer" style="--d:0.1s">' +
            '<div class="pbrd-sv-cust-rank">1</div>' +
            '<div class="pbrd-sv-cust-info"><span class="pbrd-sv-cust-name">H\u00E9l\u00E8ne L.</span><span class="pbrd-sv-cust-meta">Mastercard \u2022 5 txns \u2022 <em class="pbrd-sv-returning">Returning</em></span></div>' +
            '<div class="pbrd-sv-cust-amount">\u20AC30,994.86</div>' +
          '</div>' +
          '<div class="pbrd-sv-customer" style="--d:0.2s">' +
            '<div class="pbrd-sv-cust-rank">2</div>' +
            '<div class="pbrd-sv-cust-info"><span class="pbrd-sv-cust-name">Cliente An\u00F3nimo</span><span class="pbrd-sv-cust-meta">Visa \u2022 349 txns \u2022 <em class="pbrd-sv-returning">Returning</em></span></div>' +
            '<div class="pbrd-sv-cust-amount">\u20AC74,244.02</div>' +
          '</div>' +
          '<div class="pbrd-sv-customer" style="--d:0.3s">' +
            '<div class="pbrd-sv-cust-rank">3</div>' +
            '<div class="pbrd-sv-cust-info"><span class="pbrd-sv-cust-name">Zackary C.</span><span class="pbrd-sv-cust-meta">Visa \u2022 1 txn</span></div>' +
            '<div class="pbrd-sv-cust-amount">\u20AC19,462.50</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-sv-row">' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.25s both;flex:1">' +
          '<div class="pbrd-sv-label">Shopper Profile</div>' +
          '<div style="margin-top:8px">' +
            '<div class="pbrd-sv-profile-row" style="animation:pbrd-fade-in 0.4s 0.35s both"><span class="pbrd-sv-profile-label">Total Spend</span><span class="pbrd-sv-profile-val">\u20AC30,994</span></div>' +
            '<div class="pbrd-sv-profile-row" style="animation:pbrd-fade-in 0.4s 0.4s both"><span class="pbrd-sv-profile-label">Avg. Ticket</span><span class="pbrd-sv-profile-val">\u20AC6,198</span></div>' +
            '<div class="pbrd-sv-profile-row" style="animation:pbrd-fade-in 0.4s 0.45s both"><span class="pbrd-sv-profile-label">Frequency</span><span class="pbrd-sv-profile-val pbrd-sv-freq-hot">Hot</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-sv-card" style="animation:pbrd-sv-up 0.5s ease 0.35s both;flex:1;text-align:center">' +
          '<div class="pbrd-sv-label">Returning Shoppers</div>' +
          '<div class="pbrd-sv-big" style="font-size:2rem;color:rgba(120,180,255,0.9);margin:6px 0">10</div>' +
          '<div class="pbrd-sv-sublabel">identified this week</div>' +
          '<div style="margin-top:8px;font-size:0.5625rem;color:rgba(120,255,180,0.6);font-weight:600">\u2191 Even from anonymous POS transactions</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var slideVisuals = [vizPlatform, vizDashboard, vizTransactions, vizAnalytics, vizIntelligence, vizPOS, vizPayments, vizIntegrations];

  var slides = [
    { tab: "Platform", number: "01", title: "Unified Omnichannel Platform", description: "POS, e-commerce, QR codes, kiosks, and pay-by-link \u2014 all managed through one powerful dashboard with real-time data and full control.", features: ["Single dashboard for all channels", "Real-time transaction monitoring", "Multi-store and multi-currency support"], link: "/e-commerce", linkText: "Explore the platform" },
    { tab: "Dashboard", number: "02", title: "Complete Control Over Your Payments", description: "Track \u20AC16M+ in volume, monitor success rates at 92%, and manage refunds \u2014 all from a beautifully designed mobile-first dashboard.", features: ["Revenue analytics by currency", "Success rate & transaction metrics", "Refund management in one tap"], link: "/e-commerce", linkText: "See the dashboard" },
    { tab: "Transactions", number: "03", title: "Review, Track, and Issue Refunds Instantly", description: "Every transaction at your fingertips. Filter by date, store, or status. Drill into details, process refunds, and resolve issues in seconds.", features: ["Advanced filtering and search", "One-click full or partial refunds", "Complete payment audit trail"], link: "/e-commerce", linkText: "Learn more" },
    { tab: "Analytics", number: "04", title: "Real-Time Business Intelligence", description: "Revenue breakdowns by time period, status analysis with 92% success rates, and volume distribution across Visa, Mastercard, MB Way, and more.", features: ["Revenue charts by time of day", "Status breakdown (success, failed, pending)", "Volume distribution by payment method"], link: "/e-commerce", linkText: "Explore analytics" },
    { tab: "Intelligence", number: "05", title: "Know Every Customer \u2014 Even the Anonymous Ones", description: "Paybyrd identifies returning shoppers across all channels automatically \u2014 even from anonymous in-store card transactions. See purchase history, frequency, spend patterns, and lifetime value without requiring logins or loyalty programs.", features: ["Auto-identify returning card holders across POS and online", "Purchase frequency scoring (cold, warm, hot)", "Top customer leaderboard with lifetime spend", "Works without apps, accounts, or loyalty sign-ups"], link: "/book-demo", linkText: "See it in action" },
    { tab: "POS", number: "06", title: "Enterprise-Grade POS Terminals", description: "Accept payments anywhere with Paybyrd-powered Android terminals. Portable, countertop, or kiosk-integrated \u2014 all running our software.", features: ["Android-based smart terminals", "Buy outright or rent monthly", "Built-in printer, scanner, and 4G"], link: "/pos", linkText: "View POS terminals" },
    { tab: "Payments", number: "07", title: "192+ Currencies and Every Method That Matters", description: "From Visa and Amex to Pix, MB Way, and Klarna. Multi-acquiring with intelligent routing ensures the highest approval rates globally.", features: ["20+ payment methods supported", "Multi-acquiring & smart routing", "Local methods for every market"], link: "/payment-methods", linkText: "See all payment methods" },
    { tab: "Integrations", number: "08", title: "Connect Your Entire Tech Stack in Minutes", description: "Pre-built plug-ins for WooCommerce, Magento, PrestaShop, and hospitality PMS systems like Oracle, Newhotel, and Host. Plus WhatsApp for Business, SAP, Moloni, and a full REST API for custom builds.", features: ["E-commerce: WooCommerce, Magento, PrestaShop", "Hospitality: Oracle, Newhotel, Host Hotel Systems", "Business: SAP, Moloni, WhatsApp for Business", "Full REST API with webhooks and sandbox"], link: "/book-demo", linkText: "Explore integrations" }
  ];

  var currentSlide = 0;
  var autoplayTimer = null;
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
            '<ul class="pbrd-showcase-features">' + s.features.map(function(f) { return '<li>' + f + '</li>'; }).join("") + '</ul>' +
            '<a href="' + s.link + '" class="pbrd-showcase-link">' + s.linkText + ' ' + arrowSVG + '</a>' +
          '</div>' +
          '<div class="pbrd-showcase-visual">' + slideVisuals[0] + '</div>' +
        '</div>' +
        '<div class="pbrd-showcase-progress">' + progressHTML + '</div>' +
      '</div>';

    return section;
  }

  function goTo(idx, section) {
    if (idx === currentSlide) return;
    var s = slides[idx];
    var textEl = section.querySelector(".pbrd-showcase-text");
    var vizEl = section.querySelector(".pbrd-showcase-visual");

    textEl.classList.add("fading");
    vizEl.style.opacity = "0";
    vizEl.style.transform = "translateY(8px)";
    vizEl.style.transition = "all 0.3s ease";

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
      textEl.querySelector("p").textContent = s.description;
      textEl.querySelector(".pbrd-showcase-features").innerHTML = s.features.map(function(f) { return '<li>' + f + '</li>'; }).join("");
      var link = textEl.querySelector(".pbrd-showcase-link");
      link.href = s.link;
      link.innerHTML = s.linkText + ' ' + arrowSVG;
      vizEl.innerHTML = slideVisuals[idx];
      textEl.classList.remove("fading");
      vizEl.style.opacity = "1";
      vizEl.style.transform = "translateY(0)";
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

      var section = buildSection();

      if (window.ScrollTrigger) {
        ScrollTrigger.getAll().forEach(function(st) {
          if (sliderWrap.contains(st.trigger) || st.trigger === sliderWrap) { st.kill(); }
        });
      }

      sliderWrap.replaceWith(section);

      if (window.ScrollTrigger) { ScrollTrigger.refresh(); }

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

  var showcaseDone = false;
  function tryInit() {
    if (showcaseDone) return;
    if (document.querySelector(".slider-2_wrap")) {
      showcaseDone = true;
      initShowcase();
    }
  }

  tryInit();
  document.addEventListener("DOMContentLoaded", tryInit);
  window.addEventListener("load", function() {
    tryInit();
    if (!showcaseDone) {
      var attempts = 0;
      var poll = setInterval(function() {
        tryInit();
        if (showcaseDone || ++attempts > 30) clearInterval(poll);
      }, 200);
    }
  });
})();
/* Paybyrd — Testimonials Section (Staggered Masonry + Scroll Animations) */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";
  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/customers/";

  var testimonials = [
    {
      name: "Jo\u00E3o Frias",
      title: "Head of Payments, TAP Air Portugal",
      logo: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg",
      quote: "Paybyrd gave us what no other provider could \u2014 a single integration handling 20+ payment methods across 90 markets, with approval rates that moved the needle on revenue. We\u2019re talking millions recovered from transactions that would have been declined elsewhere."
    },
    {
      name: "Carlos Rodrigues",
      title: "CFO, Vila Gal\u00E9",
      logo: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg",
      quote: "Managing payments across 40+ properties in four countries used to require a team just to reconcile. Paybyrd consolidated everything into one dashboard \u2014 my finance team can close the books in hours, not days."
    },
    {
      name: "Rita Faria",
      title: "CEO, KuantoKusta",
      logo: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg",
      quote: "Cart abandonment was our biggest leak. After implementing Paybyrd\u2019s checkout with Klarna and local methods like MBWay, we saw conversion jump meaningfully. The right payment method at the right moment makes all the difference."
    },
    {
      name: "Nelson Silva",
      title: "General Manager, Rede Expressos",
      logo: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png",
      quote: "Integrating Paybyrd into our ticketing platform was remarkably smooth. Online, at the counter, on mobile \u2014 every channel now runs through one system. Our passengers don\u2019t think about payments anymore. That\u2019s exactly how it should be."
    },
    {
      name: "Filipa Mu\u00F1oz de Oliveira",
      title: "CEO, Wi\u00F1k",
      logo: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg",
      quote: "We needed a payment partner who understood retail as well as we do. Paybyrd\u2019s real-time analytics showed us patterns we\u2019d been blind to \u2014 which stores convert, which customers return, and why. It\u2019s changed how we make decisions."
    },
    {
      name: "Victor Jardim",
      title: "General Manager, Kabuki",
      logo: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg",
      quote: "In a restaurant, speed is everything. Since switching to Paybyrd\u2019s terminals, our table turnover has improved and checkout complaints have dropped to near zero. The system just works \u2014 every single service."
    },
    {
      name: "Paulo Figueiredo",
      title: "COO, Onyria Resorts",
      logo: BASE + "onyria-logo.svg",
      quote: "Our guests expect a seamless experience from check-in to checkout. Paybyrd delivers exactly that \u2014 whether it\u2019s at the spa, the golf course, or the restaurant. The technology disappears, and only the experience remains."
    },
    {
      name: "Dr. Pl\u00EDnio Leal",
      title: "CEO, Andr\u00E9 \u00D3ticas",
      logo: BASE + "andreoticas-logo.png",
      quote: "For a premium retail brand, every touchpoint matters \u2014 including payment. Paybyrd gave us terminals that match our store experience and analytics that help us understand our customers better than ever before."
    }
  ];

  function buildCard(t) {
    return '<div class="pbrd-testimonial-card">' +
      '<div class="pbrd-testimonial-quote-mark">\u201C</div>' +
      '<p class="pbrd-testimonial-quote">' + t.quote + '</p>' +
      '<div class="pbrd-testimonial-divider"></div>' +
      '<div class="pbrd-testimonial-attribution">' +
        '<div class="pbrd-testimonial-person">' +
          '<p class="pbrd-testimonial-name">' + t.name + '</p>' +
          '<p class="pbrd-testimonial-title">' + t.title + '</p>' +
        '</div>' +
        '<img class="pbrd-testimonial-logo" src="' + t.logo + '" alt="' + t.title.split(", ").pop() + '" loading="lazy">' +
      '</div>' +
    '</div>';
  }

  function buildSection() {
    var section = document.createElement("section");
    section.className = "pbrd-testimonials";

    /* Split into 2 columns for masonry stagger */
    var left = [];
    var right = [];
    for (var i = 0; i < testimonials.length; i++) {
      if (i % 2 === 0) left.push(testimonials[i]);
      else right.push(testimonials[i]);
    }

    section.innerHTML =
      '<div class="pbrd-testimonials-header">' +
        '<h2>Payments that fit.<br>Partners that grow.</h2>' +
        '<p>Don\u2019t take our word for it. Here\u2019s what the people behind the brands have to say.</p>' +
      '</div>' +
      '<div class="pbrd-testimonials-grid">' +
        '<div class="pbrd-testimonials-col">' + left.map(buildCard).join("") + '</div>' +
        '<div class="pbrd-testimonials-col">' + right.map(buildCard).join("") + '</div>' +
      '</div>';

    return section;
  }

  /* ─── Scroll-triggered reveal ─── */
  function observeCards(section) {
    var cards = section.querySelectorAll(".pbrd-testimonial-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (c) { c.classList.add("pbrd-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          /* Stagger the animation based on card position */
          var card = entry.target;
          var idx = Array.prototype.indexOf.call(cards, card);
          setTimeout(function () {
            card.classList.add("pbrd-visible");
          }, idx * 100);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    cards.forEach(function (c) { observer.observe(c); });
  }

  function init() {
    var slider = document.querySelector('[data-slider="component"]');
    if (!slider) return;

    var target = slider.closest("section") || slider.closest(".u-section") || slider.parentElement;
    if (!target) return;

    var section = buildSection();
    target.replaceWith(section);

    /* Kick off scroll animations */
    observeCards(section);
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

  function getCardWidth() {
    if (window.innerWidth <= 480) return 240;
    if (window.innerWidth <= 768) return 260;
    return 340;
  }

  function goToCarousel(idx) {
    carouselIdx = idx;
    if (!lightbox) return;
    var track = lightbox.querySelector(".pbrd-carousel-track");
    var cards = lightbox.querySelectorAll(".pbrd-carousel-card");

    /* Calculate offset to center the target card in viewport */
    var cardW = getCardWidth();
    var gap = 20;
    var offset = (window.innerWidth / 2) - (cardW / 2) - (idx * (cardW + gap));

    track.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
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
/* Paybyrd — Book Demo: Dynamic Fintech Visuals per Step */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/book-demo")) return;

  /* ─── Visual HTML per step ─── */

  var visuals = {
    "Book a Call": /* Dashboard preview */
      '<div class="pbrd-dv-landing">' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">Total Volume Today</div>' +
          '<div class="pbrd-dv-volume-row">' +
            '<span class="pbrd-dv-value">\u20AC1,449,898</span>' +
            '<span class="pbrd-dv-volume-currency">EUR</span>' +
          '</div>' +
          '<div class="pbrd-dv-chart">' +
            '<div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-metrics-row">' +
            '<div class="pbrd-dv-metric"><span class="pbrd-dv-metric-val">16,532</span><span class="pbrd-dv-metric-lbl">Transactions</span></div>' +
            '<div class="pbrd-dv-metric"><span class="pbrd-dv-metric-val">92%</span><span class="pbrd-dv-metric-lbl">Success</span></div>' +
            '<div class="pbrd-dv-metric"><span class="pbrd-dv-metric-val">\u20AC142</span><span class="pbrd-dv-metric-lbl">Avg. Ticket</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-approval">' +
            '<svg class="pbrd-dv-approval-ring" viewBox="0 0 40 40"><circle class="pbrd-dv-approval-track" cx="20" cy="20" r="18"/><circle class="pbrd-dv-approval-fill" cx="20" cy="20" r="18"/></svg>' +
            '<div><div class="pbrd-dv-approval-text">98.2%</div><div class="pbrd-dv-approval-label">Approval Rate</div></div>' +
          '</div>' +
        '</div>' +
      '</div>',

    "Payment Channels": /* POS + Online visualization */
      '<div class="pbrd-dv-landing">' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">Channels</div>' +
          '<div class="pbrd-dv-metrics-row" style="margin-top:4px">' +
            '<div class="pbrd-dv-metric"><span class="pbrd-dv-metric-val" style="font-size:1.5rem">POS</span><span class="pbrd-dv-metric-lbl">In-Store</span></div>' +
            '<div class="pbrd-dv-metric"><span class="pbrd-dv-metric-val" style="font-size:1.5rem">WEB</span><span class="pbrd-dv-metric-lbl">Online</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">Supported Devices</div>' +
          '<div class="pbrd-dv-methods">' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">Smart POS</span>' +
            '<span class="pbrd-dv-pill">Kiosks</span>' +
            '<span class="pbrd-dv-pill">QR Codes</span>' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">E-Commerce</span>' +
            '<span class="pbrd-dv-pill">Pay-by-Link</span>' +
            '<span class="pbrd-dv-pill">In-App</span>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">Live Across</div>' +
          '<div class="pbrd-dv-value" style="font-size:2rem">40+</div>' +
          '<div style="font-size:0.625rem;color:rgba(255,255,255,0.3);letter-spacing:0.08em;text-transform:uppercase">Countries</div>' +
        '</div>' +
      '</div>',

    "Message": /* What you get */
      '<div class="pbrd-dv-landing">' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">Your Custom Proposal Includes</div>' +
          '<div style="display:flex;flex-direction:column;gap:10px;margin-top:12px">' +
            '<div class="pbrd-dv-card-sm" style="animation:pbrd-dv-slide-up 0.4s ease 0.1s both"><span style="font-size:0.75rem;color:rgba(255,255,255,0.7)">Rate comparison vs. your current provider</span></div>' +
            '<div class="pbrd-dv-card-sm" style="animation:pbrd-dv-slide-up 0.4s ease 0.2s both"><span style="font-size:0.75rem;color:rgba(255,255,255,0.7)">Approval rate optimization roadmap</span></div>' +
            '<div class="pbrd-dv-card-sm" style="animation:pbrd-dv-slide-up 0.4s ease 0.3s both"><span style="font-size:0.75rem;color:rgba(255,255,255,0.7)">Payment method recommendations</span></div>' +
            '<div class="pbrd-dv-card-sm" style="animation:pbrd-dv-slide-up 0.4s ease 0.4s both"><span style="font-size:0.75rem;color:rgba(255,255,255,0.7)">Revenue uplift estimate</span></div>' +
          '</div>' +
        '</div>' +
      '</div>',

    "Payment Volume": /* Volume tiers */
      '<div class="pbrd-dv-landing">' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">Volume-Based Savings</div>' +
          '<div class="pbrd-dv-chart" style="height:64px">' +
            '<div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div><div class="pbrd-dv-chart-bar"></div>' +
          '</div>' +
          '<div class="pbrd-dv-status-row" style="margin-top:12px">' +
            '<div class="pbrd-dv-status"><span class="pbrd-dv-dot pbrd-dv-dot-green"></span>Higher volume = lower rates</div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-metrics-row">' +
            '<div class="pbrd-dv-metric"><span class="pbrd-dv-metric-val">1.20%</span><span class="pbrd-dv-metric-lbl">From</span></div>' +
            '<div class="pbrd-dv-metric"><span class="pbrd-dv-metric-val">\u20AC0</span><span class="pbrd-dv-metric-lbl">Setup Fee</span></div>' +
            '<div class="pbrd-dv-metric"><span class="pbrd-dv-metric-val">T+1</span><span class="pbrd-dv-metric-lbl">Settlement</span></div>' +
          '</div>' +
        '</div>' +
      '</div>',

    "Company Details": /* Payment methods grid */
      '<div class="pbrd-dv-landing">' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">20+ Payment Methods</div>' +
          '<div class="pbrd-dv-methods" style="margin-top:10px">' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">Visa</span>' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">Mastercard</span>' +
            '<span class="pbrd-dv-pill">Amex</span>' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">Apple Pay</span>' +
            '<span class="pbrd-dv-pill">Google Pay</span>' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">MB Way</span>' +
            '<span class="pbrd-dv-pill">PayPal</span>' +
            '<span class="pbrd-dv-pill">Klarna</span>' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">SEPA</span>' +
            '<span class="pbrd-dv-pill">PIX</span>' +
            '<span class="pbrd-dv-pill">iDEAL</span>' +
            '<span class="pbrd-dv-pill">Multibanco</span>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-status-row">' +
            '<div class="pbrd-dv-status"><span class="pbrd-dv-dot pbrd-dv-dot-green"></span>192+ currencies</div>' +
            '<div class="pbrd-dv-status"><span class="pbrd-dv-dot pbrd-dv-dot-green"></span>Local routing</div>' +
          '</div>' +
        '</div>' +
      '</div>',

    "Person Details": /* Trust signals */
      '<div class="pbrd-dv-landing">' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">Security & Compliance</div>' +
          '<div class="pbrd-dv-methods" style="margin-top:10px">' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">PCI DSS L1</span>' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">3D Secure 2</span>' +
            '<span class="pbrd-dv-pill">Tokenization</span>' +
            '<span class="pbrd-dv-pill pbrd-dv-pill-active">Licensed PSP</span>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-approval">' +
            '<svg class="pbrd-dv-approval-ring" viewBox="0 0 40 40"><circle class="pbrd-dv-approval-track" cx="20" cy="20" r="18"/><circle class="pbrd-dv-approval-fill" cx="20" cy="20" r="18"/></svg>' +
            '<div><div class="pbrd-dv-approval-text">99.99%</div><div class="pbrd-dv-approval-label">Uptime SLA</div></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">Dedicated Support</div>' +
          '<div style="font-size:0.8125rem;color:rgba(255,255,255,0.6);margin-top:4px;line-height:1.5">Personal account manager + technical support team for your integration.</div>' +
        '</div>' +
      '</div>',

    "Contact Details": /* Confidence builder — last step */
      '<div class="pbrd-dv-landing">' +
        '<div class="pbrd-dv-card">' +
          '<div class="pbrd-dv-label">What happens next</div>' +
          '<div style="display:flex;flex-direction:column;gap:14px;margin-top:14px">' +
            '<div style="display:flex;gap:12px;align-items:flex-start;animation:pbrd-dv-slide-up 0.4s ease 0.1s both">' +
              '<div style="width:28px;height:28px;border-radius:50%;background:rgba(80,100,220,0.15);border:1px solid rgba(80,100,220,0.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.6875rem;font-weight:700;color:rgba(120,150,255,0.9)">1</div>' +
              '<div><div style="font-size:0.8125rem;color:rgba(255,255,255,0.8);font-weight:500">We\u2019ll call you within 24h</div><div style="font-size:0.6875rem;color:rgba(255,255,255,0.3);margin-top:2px">A payments expert reviews your setup</div></div>' +
            '</div>' +
            '<div style="display:flex;gap:12px;align-items:flex-start;animation:pbrd-dv-slide-up 0.4s ease 0.25s both">' +
              '<div style="width:28px;height:28px;border-radius:50%;background:rgba(80,100,220,0.15);border:1px solid rgba(80,100,220,0.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.6875rem;font-weight:700;color:rgba(120,150,255,0.9)">2</div>' +
              '<div><div style="font-size:0.8125rem;color:rgba(255,255,255,0.8);font-weight:500">Custom proposal in 48h</div><div style="font-size:0.6875rem;color:rgba(255,255,255,0.3);margin-top:2px">Rates, methods, and savings tailored to you</div></div>' +
            '</div>' +
            '<div style="display:flex;gap:12px;align-items:flex-start;animation:pbrd-dv-slide-up 0.4s ease 0.4s both">' +
              '<div style="width:28px;height:28px;border-radius:50%;background:rgba(120,255,180,0.1);border:1px solid rgba(120,255,180,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.6875rem;font-weight:700;color:rgba(120,255,180,0.8)">3</div>' +
              '<div><div style="font-size:0.8125rem;color:rgba(255,255,255,0.8);font-weight:500">Go live in under 4 hours</div><div style="font-size:0.6875rem;color:rgba(255,255,255,0.3);margin-top:2px">Same-day integration, zero downtime</div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-dv-card" style="animation:pbrd-dv-slide-up 0.5s ease 0.5s both">' +
          '<div class="pbrd-dv-approval">' +
            '<svg class="pbrd-dv-approval-ring" viewBox="0 0 40 40"><circle class="pbrd-dv-approval-track" cx="20" cy="20" r="18"/><circle class="pbrd-dv-approval-fill" cx="20" cy="20" r="18"/></svg>' +
            '<div><div class="pbrd-dv-approval-text">30 days</div><div class="pbrd-dv-approval-label">Money-back guarantee</div></div>' +
          '</div>' +
        '</div>' +
      '</div>'
  };

  var currentStep = "";

  function init() {
    var imageCol = document.querySelector(".u-layout-column-2.u-display-none-medium");
    if (!imageCol) return;
    imageCol.classList.add("pbrd-demo-image-col");

    // Create the visual container
    var vizWrap = document.createElement("div");
    vizWrap.className = "pbrd-demo-visual";
    vizWrap.innerHTML = visuals["Book a Call"];
    imageCol.appendChild(vizWrap);
    currentStep = "Book a Call";

    // Watch for step changes
    var form = document.querySelector(".multi-02_form_element");
    if (!form) return;

    var fieldsets = form.querySelectorAll("fieldset");

    function alignVisual() {
      if (window.innerWidth < 768) {
        vizWrap.style.marginTop = "0px";
        return;
      }
      /* Find the VISIBLE fieldset */
      var activeFs = null;
      for (var i = 0; i < fieldsets.length; i++) {
        var s = window.getComputedStyle(fieldsets[i]);
        if (s.display !== "none" && s.visibility !== "hidden") {
          activeFs = fieldsets[i];
          break;
        }
      }
      if (!activeFs) return;

      var colRect = imageCol.getBoundingClientRect();
      var counter = activeFs.querySelector(".pbrd-demo-step-count");

      if (counter) {
        /* Steps 1-6: align with the step counter */
        vizWrap.style.marginTop = Math.max(0, counter.getBoundingClientRect().top - colRect.top) + "px";
      } else {
        /* Landing step: align with just below the legend/title */
        var legend = activeFs.querySelector("legend, h1, h2, h3");
        if (legend) {
          vizWrap.style.marginTop = Math.max(0, legend.getBoundingClientRect().bottom - colRect.top + 24) + "px";
        } else {
          vizWrap.style.marginTop = "0px";
        }
      }
    }

    function updateVisual() {
      fieldsets.forEach(function (fs) {
        var stepName = fs.getAttribute("if-step");
        if (!stepName || !visuals[stepName]) return;

        var style = window.getComputedStyle(fs);
        if (style.display !== "none" && style.visibility !== "hidden" && stepName !== currentStep) {
          currentStep = stepName;
          // Fade out, swap, fade in
          vizWrap.style.opacity = "0";
          vizWrap.style.transform = "translateY(8px)";
          vizWrap.style.transition = "all 0.3s ease";
          setTimeout(function () {
            vizWrap.innerHTML = visuals[stepName];
            vizWrap.style.opacity = "1";
            vizWrap.style.transform = "translateY(0)";
            requestAnimationFrame(alignVisual);
          }, 300);
        }
      });
    }

    /* Initial alignment */
    requestAnimationFrame(alignVisual);

    // MutationObserver for step changes
    new MutationObserver(updateVisual).observe(form, { attributes: true, childList: true, subtree: true });

    // Also listen for clicks on next/back buttons
    document.addEventListener("click", function (e) {
      if (e.target.closest("[if-element]")) {
        setTimeout(updateVisual, 150);
      }
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — Omnichannel Page Enhancements */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/omnichannel")) return;

  var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";
  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/customers/";

  var checkSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ─── Reusable scroll-reveal ─── */
  function observeReveal(selector, staggerMs, root) {
    var els = (root || document).querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("pbrd-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var idx = Array.prototype.indexOf.call(els, el);
          setTimeout(function () { el.classList.add("pbrd-visible"); }, idx * (staggerMs || 100));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    els.forEach(function (e) { observer.observe(e); });
  }

  /* ═══════════════════════════════════════════ */
  /* Section 1: Hero Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heroH1 = document.querySelector(".hero-2_wrap h1, .hero-main_layout h1, [data-wf--section--theme] h1");
    if (!heroH1) return;

    /* Kicker above H1 */
    var kicker = document.createElement("div");
    kicker.className = "pbrd-oc-kicker";
    kicker.textContent = "The problem isn\u2019t your channels";
    heroH1.parentElement.insertBefore(kicker, heroH1);

    /* Enhanced subtitle below existing subtitle */
    var heroP = heroH1.parentElement.querySelector("p");
    if (heroP) {
      var sub = document.createElement("p");
      sub.className = "pbrd-oc-hero-sub";
      sub.textContent = "Your POS doesn\u2019t know your website. Your website doesn\u2019t know your store. Paybyrd connects them \u2014 so every customer is recognized, everywhere.";
      heroP.insertAdjacentElement("afterend", sub);
    }

    /* Connection animation */
    var posSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="7" r="1" fill="currentColor"/></svg>';
    var browserSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h20" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="5.5" r="1" fill="currentColor"/><circle cx="8.5" cy="5.5" r="1" fill="currentColor"/></svg>';
    var mobileSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M10 19h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

    var connHTML =
      '<div class="pbrd-oc-connection">' +
        '<div>' +
          '<div class="pbrd-oc-node">' + posSVG + '</div>' +
          '<span class="pbrd-oc-node-label">POS</span>' +
        '</div>' +
        '<div class="pbrd-oc-pulse-line"></div>' +
        '<div>' +
          '<div class="pbrd-oc-node">' + browserSVG + '</div>' +
          '<span class="pbrd-oc-node-label">Online</span>' +
        '</div>' +
        '<div class="pbrd-oc-pulse-line"></div>' +
        '<div>' +
          '<div class="pbrd-oc-node">' + mobileSVG + '</div>' +
          '<span class="pbrd-oc-node-label">Mobile</span>' +
        '</div>' +
      '</div>';

    /* Find a good insertion point — after the CTA buttons or after the subtitle */
    var ctaWrap = heroH1.closest(".hero-2_wrap, .hero-main_layout, [class*='hero']");
    if (ctaWrap) {
      var col = ctaWrap.querySelector(".u-layout-column-1, [class*='column-1']") || ctaWrap;
      col.insertAdjacentHTML("beforeend", connHTML);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 2: Social Proof Logos Strip        */
  /* ═══════════════════════════════════════════ */

  function buildLogos() {
    var logos = [
      { name: "TAP Air Portugal", src: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg" },
      { name: "Wi\u00F1k", src: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg" },
      { name: "Vila Gal\u00E9", src: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg" },
      { name: "KuantoKusta", src: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg" },
      { name: "Kabuki", src: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg" },
      { name: "Rede Expressos", src: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png" },
      { name: "Andr\u00E9 \u00D3ticas", src: BASE + "andreoticas-logo.png" },
      { name: "Onyria Resorts", src: BASE + "onyria-logo.svg" }
    ];

    var imgsHTML = logos.map(function (l) {
      return '<img src="' + l.src + '" alt="' + l.name + '" loading="lazy">';
    }).join("");

    var section = document.createElement("section");
    section.className = "pbrd-oc-logos";
    section.innerHTML =
      '<div class="pbrd-oc-logos-label">Trusted by industry leaders across Europe</div>' +
      '<div class="pbrd-oc-logos-track">' + imgsHTML + imgsHTML + '</div>';

    /* Insert after the hero section */
    var hero = document.querySelector(".hero-2_wrap, [class*='hero-2'], [data-wf--section--theme]");
    if (hero) {
      var heroSection = hero.closest("section") || hero.closest("[class*='section']") || hero;
      heroSection.insertAdjacentElement("afterend", section);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 3: Customer Journey Visualization  */
  /* ═══════════════════════════════════════════ */

  function buildJourney() {
    var posSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.5"/></svg>';
    var browserSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h20" stroke="currentColor" stroke-width="1.5"/></svg>';
    var profileSVG = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

    var lineSVG = '<svg viewBox="0 0 48 24"><line x1="0" y1="12" x2="48" y2="12"/></svg>';

    var section = document.createElement("section");
    section.className = "pbrd-oc-journey";

    section.innerHTML =
      '<div class="pbrd-oc-journey-inner">' +
        '<div class="pbrd-oc-journey-label">The Paybyrd Difference</div>' +
        '<h2>See the customer, not just the transaction.</h2>' +
        '<p>Other platforms show you payments. Paybyrd shows you people \u2014 recognized across every channel, without logins or loyalty cards.</p>' +

        '<div class="pbrd-oc-timeline">' +

          /* Step 1: In-store */
          '<div class="pbrd-oc-tx-card">' +
            '<div class="pbrd-oc-tx-step">Step 1 \u00B7 In-Store</div>' +
            '<div class="pbrd-oc-tx-icon">' + posSVG + '</div>' +
            '<div class="pbrd-oc-tx-title">Maria pays in-store</div>' +
            '<div class="pbrd-oc-tx-row"><span>Card</span><span>Visa \u2022\u2022\u2022\u2022 4821</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Amount</span><span>\u20AC89.00</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Location</span><span>Lisbon Store</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Status</span><span style="color:rgba(120,255,180,0.8)">Approved</span></div>' +
          '</div>' +

          /* Line 1 */
          '<div class="pbrd-oc-line pbrd-oc-line-animated">' + lineSVG + '</div>' +

          /* Step 2: Online */
          '<div class="pbrd-oc-tx-card">' +
            '<div class="pbrd-oc-tx-step">Step 2 \u00B7 Online</div>' +
            '<div class="pbrd-oc-badge">\u21BB Returning Customer</div>' +
            '<div class="pbrd-oc-tx-icon">' + browserSVG + '</div>' +
            '<div class="pbrd-oc-tx-title">Same card detected online</div>' +
            '<div class="pbrd-oc-tx-row"><span>Card</span><span>Visa \u2022\u2022\u2022\u2022 4821</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Amount</span><span>\u20AC127.00</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Purchase</span><span>3rd transaction</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Status</span><span style="color:rgba(120,255,180,0.8)">Approved</span></div>' +
          '</div>' +

          /* Line 2 */
          '<div class="pbrd-oc-line pbrd-oc-line-animated">' + lineSVG + '</div>' +

          /* Step 3: Unified Profile */
          '<div class="pbrd-oc-tx-card pbrd-oc-profile-card">' +
            '<div class="pbrd-oc-tx-step">Result \u00B7 Unified Profile</div>' +
            '<div class="pbrd-oc-tx-icon">' + profileSVG + '</div>' +
            '<div class="pbrd-oc-profile-name">Maria L.</div>' +
            '<div class="pbrd-oc-profile-meta">Auto-identified from card data \u2022 No login required</div>' +
            '<div class="pbrd-oc-profile-stats">' +
              '<div class="pbrd-oc-profile-stat"><span class="pbrd-oc-profile-stat-val">5</span><span class="pbrd-oc-profile-stat-lbl">Purchases</span></div>' +
              '<div class="pbrd-oc-profile-stat"><span class="pbrd-oc-profile-stat-val">\u20AC847</span><span class="pbrd-oc-profile-stat-lbl">Lifetime</span></div>' +
              '<div class="pbrd-oc-profile-stat"><span class="pbrd-oc-profile-stat-val pbrd-oc-freq-hot">Hot</span><span class="pbrd-oc-profile-stat-lbl">Frequency</span></div>' +
            '</div>' +
          '</div>' +

        '</div>' +

        /* Proof pills */
        '<div class="pbrd-oc-proofs">' +
          '<div class="pbrd-oc-proof">' + checkSVG + '<span>Cross-channel identification</span></div>' +
          '<div class="pbrd-oc-proof">' + checkSVG + '<span>No app or login required</span></div>' +
          '<div class="pbrd-oc-proof">' + checkSVG + '<span>Works with anonymous POS transactions</span></div>' +
        '</div>' +

      '</div>';

    /* Insert after logos section, or after hero */
    var logos = document.querySelector(".pbrd-oc-logos");
    if (logos) {
      logos.insertAdjacentElement("afterend", section);
    } else {
      var hero = document.querySelector(".hero-2_wrap, [class*='hero-2']");
      if (hero) {
        var heroSection = hero.closest("section") || hero;
        heroSection.insertAdjacentElement("afterend", section);
      }
    }

    /* Activate scroll reveals */
    observeReveal(".pbrd-oc-tx-card", 200, section);
    observeReveal(".pbrd-oc-proof", 120, section);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 4: Tab Carousel Enhancement        */
  /* ═══════════════════════════════════════════ */

  function enhanceCarousel() {
    var slideData = [
      {
        title: "Order online, collect in minutes.",
        desc: "Your customer browses online, pays instantly, and picks up in-store \u2014 with the transaction already reconciled. No duplicate entries, no manual syncing. One order, two channels, zero friction.",
        stat: "Reduce wait times by up to 40%"
      },
      {
        title: "Returns without the headache.",
        desc: "A customer bought online but wants to return in-store? Done in seconds. Paybyrd matches the original transaction across channels automatically \u2014 no receipt required, no manager override.",
        stat: "Cross-channel refunds in under 10 seconds"
      },
      {
        title: "QR code checkout \u2014 scan, pay, done.",
        desc: "Generate a dynamic QR code on any POS terminal. Your customer scans with their phone and pays using their preferred method \u2014 cards, wallets, BNPL. Perfect for queues, events, and tableside payments.",
        stat: "2.3s average completion time"
      },
      {
        title: "No card? Send a payment link.",
        desc: "Create a secure payment link and send it via SMS, WhatsApp, or email. Your customer pays from anywhere \u2014 phone orders, remote consultations, or outstanding invoices. Track every link in real-time.",
        stat: "78% of payment links paid within 5 minutes"
      },
      {
        title: "Self-service kiosks, fully connected.",
        desc: "Unattended terminals that feed the same dashboard as your staffed POS. Vending machines, parking, hotel check-in \u2014 every transaction tracked, every customer identifiable, every channel unified.",
        stat: "Same data depth as staffed terminals"
      },
      {
        title: "Loyalty that runs itself.",
        desc: "Forget apps and punch cards. Paybyrd identifies returning customers by their card data alone \u2014 across every channel. See who comes back, how often, and what they spend. Loyalty intelligence without the loyalty program.",
        stat: "Identify returning customers automatically"
      }
    ];

    /* Find all headings and text on the page that match slide content */
    var origTitles = [
      "Order Online, Pick up in-store",
      "Buy Online, Return in-store",
      "Pay with a QR code",
      "No Card? No Problem",
      "Self-Service Kiosk",
      "Automatic Loyalty"
    ];

    /* Walk ALL text nodes and headings on the page to find and replace */
    var allEls = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, div, legend, a");
    allEls.forEach(function (el) {
      var txt = el.textContent.trim();
      for (var i = 0; i < origTitles.length; i++) {
        /* Match heading text (partial match for flexibility) */
        if (txt.toLowerCase().includes(origTitles[i].toLowerCase().substring(0, 15)) && el.children.length === 0) {
          if (el.tagName === "H1" || el.tagName === "H2" || el.tagName === "H3" || el.tagName === "H4" || el.tagName === "LEGEND") {
            el.textContent = slideData[i].title;

            /* Find sibling or nearby paragraph for description */
            var parent = el.parentElement;
            if (parent) {
              var desc = parent.querySelector("p");
              if (desc) desc.textContent = slideData[i].desc;

              /* Add stat badge if not present */
              if (!parent.querySelector(".pbrd-oc-slide-stat")) {
                var badge = document.createElement("div");
                badge.className = "pbrd-oc-slide-stat";
                badge.innerHTML = checkSVG + '<span>' + slideData[i].stat + '</span>';
                parent.appendChild(badge);
              }
            }
          }
          break;
        }
      }

      /* Also override the main section heading */
      if (txt.toLowerCase().includes("make payments invisible") && el.tagName === "H2") {
        el.innerHTML = "Make payments invisible.<br>Focus on delivering great experiences.";
        var sub = el.parentElement ? el.parentElement.querySelector("p") : null;
        if (sub) {
          sub.textContent = "Six ways Paybyrd connects your channels into one seamless experience for your customers \u2014 and one unified dashboard for you.";
        }
      }
    });

    /* ─── Replace images with transparent versions ─── */
    var ASSET_BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/omnichannel/";
    var imageMap = {
      "69d9242bbde99c4b80e41c01": ASSET_BASE + "69d9242bbde99c4b80e41c01_paybyrd-tab-01-removebg.png",
      "69d9242bbde99c4b80e41bfb": ASSET_BASE + "69d9242bbde99c4b80e41bfb_paybyrd-tab-02-removebg.png",
      "69d9242bbde99c4b80e41c00": ASSET_BASE + "69d9242bbde99c4b80e41c00_paybyrd-tab-03-removebg.png",
      "69d9242bbde99c4b80e41bfd": ASSET_BASE + "69d9242bbde99c4b80e41bfd_paybyrd-tab-04-removebg.png",
      "69d9242bbde99c4b80e41bff": ASSET_BASE + "69d9242bbde99c4b80e41bff_paybyrd-tab-05-removebg.png",
      "69d9242bbde99c4b80e41bfc": ASSET_BASE + "69d9242bbde99c4b80e41bfc_paybyrd-tab-06-removebg.png"
    };

    /* Swap images AND add overlays in one pass */
    var swapped = 0;
    document.querySelectorAll("img").forEach(function (img) {
      var src = (img.getAttribute("src") || "") + " " + (img.getAttribute("srcset") || "");

      for (var id in imageMap) {
        if (src.indexOf(id) !== -1) {
          /* Replace the img element entirely to bypass Webflow's image handlers */
          var newImg = document.createElement("img");
          newImg.src = imageMap[id];
          newImg.alt = img.alt || "";
          newImg.style.cssText = "width:100%;height:100%;object-fit:contain;";
          newImg.loading = "eager";

          var parent = img.parentElement;
          /* If inside a <picture>, replace the whole picture */
          var picture = img.closest("picture");
          if (picture) {
            picture.replaceWith(newImg);
            parent = newImg.parentElement;
          } else {
            img.replaceWith(newImg);
          }

          /* Add overlay to image parent */
          var overlayIdx = imageMap[id].indexOf("tab-0") !== -1
            ? parseInt(imageMap[id].charAt(imageMap[id].indexOf("tab-0") + 5)) - 1
            : -1;

          if (overlayIdx >= 0 && overlayIdx < overlayCards.length && parent) {
            if (!parent.querySelector(".pbrd-oc-overlays")) {
              parent.style.position = "relative";
              parent.style.overflow = "visible";
              var wrap = document.createElement("div");
              wrap.className = "pbrd-oc-overlays";
              wrap.innerHTML = overlayCards[overlayIdx];
              parent.appendChild(wrap);
            }
          }
          swapped++;
          break;
        }
      }
    });

    /* Show Loyalty slide (index 5) first */
    var swiperEl = document.querySelector(".slider-4_content_wrap");
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.slideTo(5, 0);
    }

    console.log("[Paybyrd] Carousel: swapped " + swapped + " images with overlays");
  }

  /* Overlay card HTML per slide (used by enhanceCarousel) */
  var overlayCards = [
      /* 0: Click & Collect */
      '<div class="pbrd-oc-overlay-card" style="top:12%;right:8%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-success">\u2713 Order Confirmed</div>' +
        '<div class="pbrd-oc-overlay-row"><span>Order</span><span>#PB-4821</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Amount</span><span>\u20AC149.00</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Pickup</span><span>Ready in 15 min</span></div>' +
      '</div>' +
      '<div class="pbrd-oc-overlay-card pbrd-oc-overlay-sm" style="bottom:15%;right:12%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-info">\uD83D\uDCCD Lisbon Store</div>' +
        '<div style="font-size:0.625rem;color:rgba(255,255,255,0.5)">Customer arriving \u2022 Visa \u2022\u2022\u20224821</div>' +
      '</div>',

      /* 1: Cross-Channel Returns */
      '<div class="pbrd-oc-overlay-card" style="top:20%;left:5%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-warn">\u21BB Refund in progress</div>' +
        '<div class="pbrd-oc-overlay-row"><span>Original</span><span>Online \u2022 \u20AC89.00</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Return at</span><span>Porto Store POS</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Card match</span><span style="color:rgba(120,255,180,0.8)">\u2713 Verified</span></div>' +
      '</div>' +
      '<div class="pbrd-oc-overlay-card pbrd-oc-overlay-sm" style="bottom:20%;left:10%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-success">\u2713 \u20AC89.00 refunded</div>' +
        '<div style="font-size:0.5625rem;color:rgba(120,255,180,0.7)">No receipt needed \u2022 Auto-matched</div>' +
      '</div>',

      /* 2: QR Payments */
      '<div class="pbrd-oc-overlay-card" style="bottom:12%;left:8%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-success">\u2713 Payment received</div>' +
        '<div class="pbrd-oc-overlay-row"><span>Amount</span><span>\u20AC24.50</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Method</span><span>Apple Pay</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Time</span><span>2.1 seconds</span></div>' +
      '</div>',

      /* 3: Payment Links */
      '<div class="pbrd-oc-overlay-card pbrd-oc-overlay-msg" style="top:15%;right:8%">' +
        '<div style="font-size:0.5625rem;color:rgba(255,255,255,0.35);margin-bottom:6px">WhatsApp \u2022 Just now</div>' +
        '<div style="background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.2);border-radius:12px;padding:10px 12px;font-size:0.6875rem;color:rgba(255,255,255,0.8);line-height:1.5">' +
          'Hi! Here\u2019s your payment link for \u20AC245.00:<br>' +
          '<span style="color:rgba(120,180,255,0.9);text-decoration:underline">pay.paybyrd.com/k8xP2</span>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-oc-overlay-card pbrd-oc-overlay-sm" style="bottom:20%;right:12%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-success">\u2713 Paid \u2022 32 seconds ago</div>' +
      '</div>',

      /* 4: Self-Service Kiosk */
      '<div class="pbrd-oc-overlay-card" style="top:8%;right:6%">' +
        '<div style="font-size:0.5rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);font-weight:600;margin-bottom:8px">Live Feed \u2022 Kiosk #3</div>' +
        '<div class="pbrd-oc-overlay-row"><span>14:32</span><span>\u20AC3.50 \u2022 Parking</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>14:28</span><span>\u20AC12.00 \u2022 Check-in</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>14:15</span><span>\u20AC8.90 \u2022 Vending</span></div>' +
      '</div>',

      /* 5: Smart Loyalty */
      '<div class="pbrd-oc-overlay-card" style="bottom:10%;left:5%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-info">\u21BB Returning Customer</div>' +
        '<div style="font-size:0.875rem;font-weight:600;color:#fff;margin:8px 0 4px">Sofia M.</div>' +
        '<div class="pbrd-oc-overlay-row"><span>Visits</span><span>7</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Lifetime</span><span>\u20AC1,247</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Frequency</span><span class="pbrd-oc-freq-hot" style="font-size:0.625rem">Hot</span></div>' +
      '</div>'
    ];

  /* ═══════════════════════════════════════════ */
  /* Section 5: Dashboard Intelligence          */
  /* ═══════════════════════════════════════════ */

  function enhanceDashboard() {
    /* Find the dashboard section by heading text */
    var allH2 = document.querySelectorAll("h2");
    var dashSection = null;
    allH2.forEach(function (h) {
      var t = h.textContent.toLowerCase();
      if (t.includes("data knows") || t.includes("dashboard") || t.includes("next purchase")) {
        dashSection = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    if (!dashSection) return;

    /* Override the heading and subtitle */
    var heading = dashSection.querySelector("h2");
    if (heading) heading.innerHTML = "Your competitors are guessing.<br>You\u2019ll know.";

    var subtitle = dashSection.querySelector("h2 + p, h2 ~ p");
    if (!subtitle) {
      var allP = dashSection.querySelectorAll("p");
      allP.forEach(function (p) {
        if (p.textContent.length > 30) subtitle = p;
      });
    }
    if (subtitle) subtitle.textContent = "Every transaction across every channel feeds one intelligent dashboard. See what single-channel platforms can\u2019t \u2014 the complete picture of your business and your customers.";

    /* Build the full analytics showcase */
    var section = document.createElement("div");
    section.className = "pbrd-oc-analytics-wrap";
    section.innerHTML =

      /* Section header */
      '<div style="text-align:center;margin-bottom:40px">' +
        '<div class="pbrd-oc-journey-label" style="color:rgba(120,180,255,0.7)">Real-Time Intelligence</div>' +
        '<h3 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:600;letter-spacing:-0.02em;color:#fff;margin:0 0 12px">Your competitors are guessing. You\u2019ll know.</h3>' +
        '<p style="font-size:0.9375rem;color:rgba(255,255,255,0.4);max-width:480px;margin:0 auto;line-height:1.6">Every transaction across every channel feeds one intelligent dashboard. See what single-channel platforms can\u2019t.</p>' +
      '</div>' +

      /* Row 1: Big metrics */
      '<div class="pbrd-oc-dash-grid" style="grid-template-columns:1fr 1fr 1fr;margin-bottom:16px">' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big" style="font-size:2.5rem;font-weight:700">\u20AC1.4M</div>' +
          '<div class="pbrd-oc-dash-sub">Total Volume Today</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 18% vs. last month</div>' +
        '</div>' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big" style="font-size:2.5rem;font-weight:700;color:rgba(120,180,255,0.9)">92.7%</div>' +
          '<div class="pbrd-oc-dash-sub">Approval Rate</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 4.7% above industry avg</div>' +
        '</div>' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big" style="font-size:2.5rem;font-weight:700">847</div>' +
          '<div class="pbrd-oc-dash-sub">Returning Customers</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 12% identified this month</div>' +
        '</div>' +
      '</div>' +

      /* Row 2: Charts */
      '<div class="pbrd-oc-dash-grid">' +

        /* Card: Cross-Channel Revenue */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Revenue by Channel</div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">E-Commerce</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:62%;background:linear-gradient(90deg,rgba(80,100,220,0.4),rgba(80,100,220,0.7))"></div></div><span class="pbrd-oc-hbar-val">\u20AC868K</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">POS</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:31%;background:linear-gradient(90deg,rgba(120,180,255,0.3),rgba(120,180,255,0.6))"></div></div><span class="pbrd-oc-hbar-val">\u20AC434K</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">Pay-by-Link</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:7%;background:linear-gradient(90deg,rgba(120,255,180,0.3),rgba(120,255,180,0.5))"></div></div><span class="pbrd-oc-hbar-val">\u20AC98K</span></div>' +
          '<div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04);font-size:0.625rem;color:rgba(255,255,255,0.3)">All channels \u2022 One reconciliation \u2022 Real-time</div>' +
        '</div>' +

        /* Card: Buying Frequency */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Buying Frequency Distribution</div>' +
          '<div class="pbrd-oc-freq-bar" style="height:14px;border-radius:7px">' +
            '<div class="pbrd-oc-freq-seg" style="--seg-w:40%;background:rgba(255,255,255,0.08);border-radius:7px 0 0 7px"></div>' +
            '<div class="pbrd-oc-freq-seg" style="--seg-w:35%;background:rgba(120,180,255,0.35)"></div>' +
            '<div class="pbrd-oc-freq-seg" style="--seg-w:25%;background:rgba(255,100,50,0.5);border-radius:0 7px 7px 0"></div>' +
          '</div>' +
          '<div class="pbrd-oc-freq-legend">' +
            '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(255,255,255,0.15)"></div>Cold (1x) 40%</div>' +
            '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(120,180,255,0.5)"></div>Warm (2\u20134x) 35%</div>' +
            '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(255,100,50,0.6)"></div>Hot (5+x) 25%</div>' +
          '</div>' +
          '<div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04);font-size:0.625rem;color:rgba(120,180,255,0.6);font-weight:600">Hot customers spend 3.2\u00D7 more than cold</div>' +
        '</div>' +

        /* Card: Channel Overlap */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Cross-Channel Shoppers</div>' +
          '<div style="display:flex;align-items:center;gap:16px;margin:8px 0">' +
            '<div class="pbrd-oc-dash-big" style="font-size:2rem;color:rgba(120,180,255,0.9)">23%</div>' +
            '<div style="font-size:0.6875rem;color:rgba(255,255,255,0.4);line-height:1.5">of customers shop<br>across multiple channels</div>' +
          '</div>' +
          '<div class="pbrd-oc-hbar" style="margin-top:8px"><span class="pbrd-oc-hbar-label" style="width:60px;font-size:0.5625rem">Online only</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:52%;background:rgba(80,100,220,0.4)"></div></div><span class="pbrd-oc-hbar-val">\u20AC89</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label" style="width:60px;font-size:0.5625rem">Multi-channel</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:92%;background:linear-gradient(90deg,rgba(120,180,255,0.4),rgba(120,255,180,0.5))"></div></div><span class="pbrd-oc-hbar-val">\u20AC285</span></div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.6);font-weight:600">\u2191 Multi-channel AOV is 3.2\u00D7 higher</div>' +
        '</div>' +

        /* Card: Hourly Transaction Heatmap */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Peak Transaction Hours</div>' +
          '<div class="pbrd-oc-heatmap">' +
            '<div class="pbrd-oc-heatmap-row"><span class="pbrd-oc-heatmap-lbl">POS</span><div class="pbrd-oc-heatmap-cells">' +
              '<div class="pbrd-oc-hcell" style="opacity:0.15" title="06:00"></div><div class="pbrd-oc-hcell" style="opacity:0.2"></div><div class="pbrd-oc-hcell" style="opacity:0.5"></div><div class="pbrd-oc-hcell" style="opacity:0.9"></div><div class="pbrd-oc-hcell" style="opacity:1"></div><div class="pbrd-oc-hcell" style="opacity:0.7"></div><div class="pbrd-oc-hcell" style="opacity:0.4"></div><div class="pbrd-oc-hcell" style="opacity:0.15"></div>' +
            '</div></div>' +
            '<div class="pbrd-oc-heatmap-row"><span class="pbrd-oc-heatmap-lbl">Web</span><div class="pbrd-oc-heatmap-cells">' +
              '<div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.1"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.15"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.3"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.5"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.4"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.8"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:1"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.7"></div>' +
            '</div></div>' +
            '<div class="pbrd-oc-heatmap-times"><span>6am</span><span>9am</span><span>12pm</span><span>3pm</span><span>6pm</span><span>9pm</span><span>12am</span><span>3am</span></div>' +
          '</div>' +
          '<div style="margin-top:10px;font-size:0.625rem;color:rgba(255,255,255,0.3)">POS peaks at lunch \u2022 Web peaks evenings \u2022 Schedule staff accordingly</div>' +
        '</div>' +

      '</div>' +

      /* Row 3: Integration ecosystem */
      '<div class="pbrd-oc-dash-grid" style="grid-template-columns:1fr;margin-top:16px">' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-label">Integration Ecosystem</div>' +
          '<div style="display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin:16px 0">' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/woocommerce.svg" alt="WooCommerce" style="height:16px;width:auto">WooCommerce</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/magento.svg" alt="Magento" style="height:16px;width:auto">Magento</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/prestashop.svg" alt="PrestaShop" style="height:16px;width:auto">PrestaShop</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/sap.svg" alt="SAP" style="height:16px;width:auto">SAP</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/oracle.svg" alt="Oracle" style="height:16px;width:auto">Oracle</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/whatsapp.svg" alt="WhatsApp" style="height:16px;width:auto">WhatsApp</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/moloni.svg" alt="Moloni" style="height:16px;width:auto">Moloni</div>' +
            '<div class="pbrd-oc-int-pill" style="border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)">+ REST API</div>' +
          '</div>' +
          '<div style="font-size:0.6875rem;color:rgba(255,255,255,0.35)">Pre-built plug-ins \u2022 Same-day integration \u2022 Full API with webhooks and sandbox</div>' +
        '</div>' +
      '</div>';

    /* Hide ALL existing content inside the dashboard section */
    var children = dashSection.children;
    for (var c = 0; c < children.length; c++) {
      children[c].style.display = "none";
    }

    /* Add a light-themed intro header above the dark analytics block */
    var intro = document.createElement("div");
    intro.className = "pbrd-oc-dash-intro";
    intro.innerHTML =
      '<h2>One dashboard to rule them all.</h2>' +
      '<p>Stop switching between platforms. Paybyrd consolidates every channel, every transaction, and every customer into a single real-time view \u2014 so you can make decisions in minutes, not days.</p>';
    dashSection.appendChild(intro);

    /* Insert our analytics section */
    dashSection.appendChild(section);
    dashSection.style.padding = "80px 24px 60px";

    observeReveal(".pbrd-oc-dash-card", 100, section);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 6: Value Proposition Cards         */
  /* ═══════════════════════════════════════════ */

  function buildBenefits() {
    /* Find and replace the "More than numbers" section */
    var allH2 = document.querySelectorAll("h2");
    var valSection = null;
    allH2.forEach(function (h) {
      if (h.textContent.toLowerCase().includes("centralized") || h.textContent.toLowerCase().includes("more than numbers")) {
        valSection = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    if (!valSection) return;

    /* Override the bland heading */
    var valH2 = valSection.querySelector("h2");
    if (valH2) valH2.innerHTML = "Everything you need.<br>Nothing you don\u2019t.";

    var valP = valSection.querySelector("p");
    if (valP) valP.textContent = "No setup fees. No hidden costs. No contracts. Just a payment platform that connects every channel, recognizes every customer, and grows with your business.";

    /* Build the enhanced closing section */
    var closingWrap = document.createElement("div");
    closingWrap.className = "pbrd-oc-closing-wrap";

    var clockSVG = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    var shieldSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5.25-3.44 10.14-8 11.5C7.44 22.14 4 17.25 4 12V7l8-4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var rocketSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="currentColor" stroke-width="1.5"/><path d="M12 15l-3-3c1-4 4-7 9-9-2 5-5 8-9 9l3 3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var heartSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";

    closingWrap.innerHTML =
      '<div class="pbrd-oc-feature-grid">' +

        /* Card 1: Checkout — WIDE */
        '<div class="pbrd-oc-feature-card pbrd-oc-feature-wide">' +
          '<div class="pbrd-oc-feature-label">Checkout</div>' +
          '<h3>A checkout designed<br>to convert</h3>' +
          '<p>Fully white-labeled. Every payment method. Optimized for mobile. Your brand, your flow, our technology.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-checkout-mock">' +
              '<div class="pbrd-oc-chk-header">Select your payment method</div>' +
              '<div class="pbrd-oc-chk-methods">' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="0"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/mbway.png" alt="MB WAY"></div><div><div class="pbrd-oc-chk-name">MB WAY</div><div class="pbrd-oc-chk-sub">Pay with MB WAY</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="1"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/visa.png" alt="Card"></div><div><div class="pbrd-oc-chk-name">Credit Card</div><div class="pbrd-oc-chk-sub">Visa, Mastercard, and more</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="2"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/paypal.png" alt="PayPal"></div><div><div class="pbrd-oc-chk-name">PayPal</div><div class="pbrd-oc-chk-sub">Pay with your PayPal account</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="3"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/klarna.png" alt="Klarna"></div><div><div class="pbrd-oc-chk-name">Klarna</div><div class="pbrd-oc-chk-sub">Buy now, pay later</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="4"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/ideal.png" alt="iDEAL"></div><div><div class="pbrd-oc-chk-name">iDEAL</div><div class="pbrd-oc-chk-sub">Pay with your bank account</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="5"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/multibanco.png" alt="Multibanco"></div><div><div class="pbrd-oc-chk-name">Multibanco</div><div class="pbrd-oc-chk-sub">Pay via Multibanco reference</div></div></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Card 2: Setup */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Setup</div>' +
          '<h3>Go live in hours,<br>not months</h3>' +
          '<p>Pre-built plug-ins for 20+ platforms.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-setup-steps">' +
              '<div class="pbrd-oc-setup-step pbrd-oc-setup-done"><span>\u2713</span>Connect channels</div>' +
              '<div class="pbrd-oc-setup-step pbrd-oc-setup-done"><span>\u2713</span>Configure methods</div>' +
              '<div class="pbrd-oc-setup-step pbrd-oc-setup-done"><span>\u2713</span>Test & verify</div>' +
              '<div class="pbrd-oc-setup-step pbrd-oc-setup-active"><span>4</span>You\u2019re live!</div>' +
            '</div>' +
            '<div class="pbrd-oc-setup-time">Average: <strong>4 hours</strong></div>' +
          '</div>' +
        '</div>' +

        /* Card 3: Pricing */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Pricing</div>' +
          '<h3>Transparent pricing.<br>Zero surprises.</h3>' +
          '<p>Pay only for what you process.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-price-rows">' +
              '<div class="pbrd-oc-price-row"><span>Setup fee</span><span class="pbrd-oc-price-zero">\u20AC0</span></div>' +
              '<div class="pbrd-oc-price-row"><span>Monthly fee</span><span class="pbrd-oc-price-zero">\u20AC0</span></div>' +
              '<div class="pbrd-oc-price-row"><span>Lock-in</span><span class="pbrd-oc-price-zero">None</span></div>' +
              '<div class="pbrd-oc-price-row pbrd-oc-price-highlight"><span>Transaction</span><span>From 1.5% + \u20AC0.15</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Card 4: Acceptance Rate — WIDE */
        '<div class="pbrd-oc-feature-card pbrd-oc-feature-wide">' +
          '<div class="pbrd-oc-feature-label">Performance</div>' +
          '<h3>Acceptance rates that<br>move the needle</h3>' +
          '<p>Smart routing, local acquiring, and real-time retry logic that recovers revenue other platforms leave on the table.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-perf-layout">' +
              '<div class="pbrd-oc-perf-chart">' +
                '<div class="pbrd-oc-perf-big">92.7%</div>' +
                '<div class="pbrd-oc-perf-sub">Approval rate</div>' +
                '<div class="pbrd-oc-perf-bars">' +
                  '<div class="pbrd-oc-perf-bar-row"><span>Paybyrd</span><div class="pbrd-oc-perf-bar-track"><div class="pbrd-oc-perf-bar-fill" style="--bar-w:92.7%;background:linear-gradient(90deg,rgba(16,185,129,0.4),rgba(16,185,129,0.8))"></div></div><span>92.7%</span></div>' +
                  '<div class="pbrd-oc-perf-bar-row"><span>Industry avg</span><div class="pbrd-oc-perf-bar-track"><div class="pbrd-oc-perf-bar-fill" style="--bar-w:88%;background:rgba(26,26,46,0.12)"></div></div><span>88%</span></div>' +
                '</div>' +
              '</div>' +
              '<div class="pbrd-oc-perf-logos">' +
                '<div class="pbrd-oc-perf-logos-label">Trusted by</div>' +
                '<div class="pbrd-oc-perf-logos-row">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dcc_tap-logo.svg" alt="TAP">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dce_vila-gale.svg" alt="Vila Gal\u00E9">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dcd_kuanto-logo.svg" alt="KuantoKusta">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dd1_WINK.svg" alt="Wi\u00F1k">' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Card 5: Guarantee */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Guarantee</div>' +
          '<h3>30 days to decide.<br>Risk-free.</h3>' +
          '<p>Not happy? Full refund, no questions asked.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-guarantee">' +
              shieldSVG +
              '<div class="pbrd-oc-guarantee-text">' +
                '<div class="pbrd-oc-guarantee-title">Money-Back Guarantee</div>' +
                '<div class="pbrd-oc-guarantee-sub">Every commission refunded. No fine print.</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Card 6: Support */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Support</div>' +
          '<h3>A team that picks up<br>the phone</h3>' +
          '<p>Real humans. Based in Europe.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-support-metrics">' +
              '<div class="pbrd-oc-support-metric"><div class="pbrd-oc-support-val">&lt;2h</div><div class="pbrd-oc-support-lbl">Response</div></div>' +
              '<div class="pbrd-oc-support-metric"><div class="pbrd-oc-support-val">98%</div><div class="pbrd-oc-support-lbl">Satisfaction</div></div>' +
              '<div class="pbrd-oc-support-metric"><div class="pbrd-oc-support-val">24/7</div><div class="pbrd-oc-support-lbl">Monitoring</div></div>' +
            '</div>' +
            '<div class="pbrd-oc-support-note">' + heartSVG + 'Dedicated account manager included</div>' +
          '</div>' +
        '</div>' +

        /* Card 7: POS Terminals */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Terminals</div>' +
          '<h3>Enterprise-grade POS.<br>Your software built in.</h3>' +
          '<p>Buy or rent. Android-powered, PCI-certified, with Paybyrd baked in.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-terminal-grid">' +
              '<div class="pbrd-oc-terminal-item">' +
                '<img src="https://djangato.github.io/Webflow-Paybyrd/assets/product/A920_mockup.png" alt="Rawhide">' +
                '<div class="pbrd-oc-terminal-name">Rawhide</div>' +
                '<div class="pbrd-oc-terminal-price">From \u20AC19.90/mo</div>' +
              '</div>' +
              '<div class="pbrd-oc-terminal-item">' +
                '<img src="https://djangato.github.io/Webflow-Paybyrd/assets/product/A77.png" alt="Renegade">' +
                '<div class="pbrd-oc-terminal-name">Renegade</div>' +
                '<div class="pbrd-oc-terminal-price">From \u20AC14.90/mo</div>' +
              '</div>' +
              '<div class="pbrd-oc-terminal-item">' +
                '<img src="https://djangato.github.io/Webflow-Paybyrd/assets/product/IM30.png" alt="Eagle">' +
                '<div class="pbrd-oc-terminal-name">Eagle</div>' +
                '<div class="pbrd-oc-terminal-price">From \u20AC24.90/mo</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>';

    valSection.insertAdjacentElement("afterend", closingWrap);

    observeReveal(".pbrd-oc-feature-card", 120, closingWrap);

    /* Animate checkout — brand cycling + full payment flow */
    var chkContainer = closingWrap.querySelector(".pbrd-oc-checkout-mock");
    if (chkContainer) {
      var brands = [
        { name: "TAP Air Portugal", logo: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg", color: "#E4002B", cardholder: "Ana Ferreira" },
        { name: "Vila Gal\u00E9", logo: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg", color: "#1B5E20", cardholder: "Faisal bin Iskandar Al-Lawr" },
        { name: "KuantoKusta", logo: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg", color: "#FF6600", cardholder: "Sophie van Dijk" },
        { name: "Kabuki", logo: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg", color: "#1a1a2e", cardholder: "C. Munger" },
        { name: "Wi\u00F1k", logo: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg", color: "#6B21A8", cardholder: "Luca Bianchi" }
      ];
      var brandIdx = 0;

      /* Capture methods HTML WITHOUT brand bar */
      var methodsOnlyHTML = chkContainer.innerHTML;

      function setBrand(b) {
        chkContainer.style.setProperty("--chk-accent", b.color);
        chkContainer.style.setProperty("--chk-accent-bg", b.color + "0A");
        chkContainer.style.borderColor = b.color;
      }

      function brandBarHTML(b) {
        return '<div class="pbrd-oc-chk-brand"><img src="' + b.logo + '" alt="' + b.name + '"><span class="pbrd-oc-chk-brand-label">Powered by Paybyrd</span></div>';
      }

      function runCheckoutLoop() {
        var b = brands[brandIdx];
        brandIdx = (brandIdx + 1) % brands.length;
        chkContainer.innerHTML = brandBarHTML(b) + methodsOnlyHTML;
        setBrand(b);

        var methods = chkContainer.querySelectorAll("[data-chk-idx]");
        var step = 0;

        function browseTick() {
          if (step < 3) {
            methods.forEach(function (m) { m.classList.remove("pbrd-oc-chk-active"); });
            methods[step % methods.length].classList.add("pbrd-oc-chk-active");
            step++;
            setTimeout(browseTick, 1200);
          } else {
            /* Select Credit Card → show card form */
            methods.forEach(function (m) { m.classList.remove("pbrd-oc-chk-active"); });
            if (methods[1]) methods[1].classList.add("pbrd-oc-chk-active");
            setTimeout(function () {
              chkContainer.innerHTML =
                '<div class="pbrd-oc-chk-brand"><img src="' + b.logo + '" alt="' + b.name + '"><span class="pbrd-oc-chk-brand-label">Powered by Paybyrd</span></div>' +
                '<div class="pbrd-oc-chk-header">Enter card details</div>' +
                '<div class="pbrd-oc-chk-form">' +
                  '<div class="pbrd-oc-chk-field"><span class="pbrd-oc-chk-field-label">Name</span><span class="pbrd-oc-chk-field-val pbrd-oc-typing">' + b.cardholder + '</span></div>' +
                  '<div class="pbrd-oc-chk-field"><span class="pbrd-oc-chk-field-label">Card</span><span class="pbrd-oc-chk-field-val pbrd-oc-typing" style="animation-delay:0.8s">4821 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 7392</span></div>' +
                  '<div class="pbrd-oc-chk-field-row">' +
                    '<div class="pbrd-oc-chk-field"><span class="pbrd-oc-chk-field-label">Expiry</span><span class="pbrd-oc-chk-field-val pbrd-oc-typing" style="animation-delay:1.6s">09/28</span></div>' +
                    '<div class="pbrd-oc-chk-field"><span class="pbrd-oc-chk-field-label">CVV</span><span class="pbrd-oc-chk-field-val pbrd-oc-typing" style="animation-delay:2s">\u2022\u2022\u2022</span></div>' +
                  '</div>' +
                  '<div class="pbrd-oc-chk-amount"><span>Total</span><span>\u20AC50.00</span></div>' +
                  '<div class="pbrd-oc-chk-btn" style="background:' + b.color + '">Pay Now</div>' +
                '</div>';
              setBrand(b);

              /* Processing */
              setTimeout(function () {
                chkContainer.innerHTML =
                  '<div class="pbrd-oc-chk-brand"><img src="' + b.logo + '" alt="' + b.name + '"><span class="pbrd-oc-chk-brand-label">Powered by Paybyrd</span></div>' +
                  '<div style="text-align:center;padding:32px 0">' +
                    '<div class="pbrd-oc-chk-spinner" style="border-top-color:' + b.color + '"></div>' +
                    '<div style="font-size:0.8125rem;color:rgba(26,26,46,0.4);margin-top:16px">Processing payment\u2026</div>' +
                  '</div>';
                setBrand(b);

                /* Success */
                setTimeout(function () {
                  chkContainer.innerHTML =
                    '<div class="pbrd-oc-chk-brand"><img src="' + b.logo + '" alt="' + b.name + '"><span class="pbrd-oc-chk-brand-label">Powered by Paybyrd</span></div>' +
                    '<div style="text-align:center;padding:24px 0">' +
                      '<div class="pbrd-oc-chk-success-icon" style="background:' + b.color + '15">' + checkSVG + '</div>' +
                      '<div style="font-size:1rem;font-weight:600;color:' + b.color + ';margin-top:12px">Payment Successful</div>' +
                      '<div style="font-size:0.75rem;color:rgba(26,26,46,0.4);margin-top:4px">\u20AC50.00 \u2022 Visa \u2022\u2022\u2022\u2022 7392</div>' +
                    '</div>';
                  setBrand(b);
                  chkContainer.querySelector(".pbrd-oc-chk-success-icon svg").style.color = b.color;

                  /* Loop: next brand */
                  setTimeout(runCheckoutLoop, 2500);
                }, 1800);
              }, 2500);
            }, 1000);
          }
        }

        setTimeout(browseTick, 800);
      }

      setTimeout(runCheckoutLoop, 1500);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 7: Final CTA                      */
  /* ═══════════════════════════════════════════ */

  function buildCTA() {
    var section = document.createElement("section");
    section.className = "pbrd-oc-cta";

    section.innerHTML =
      '<div class="pbrd-oc-cta-inner">' +
        '<div class="pbrd-oc-journey-label" style="color:rgba(120,255,180,0.7)">Ready?</div>' +
        '<h2>Book a 15-minute call.<br>See your data come alive.</h2>' +
        '<p style="font-size:1rem;color:rgba(255,255,255,0.45);max-width:480px;margin:0 auto 32px;line-height:1.6">We\u2019ll show you exactly how Paybyrd connects your channels, identifies your customers, and surfaces insights you\u2019re currently missing. No pitch deck \u2014 just your data.</p>' +
        '<a href="/book-demo" class="pbrd-oc-cta-btn">Book a Free Demo \u2192</a>' +
        '<div style="margin-top:16px;margin-bottom:32px"><a href="/pricing" style="color:rgba(255,255,255,0.4);font-size:0.875rem;text-decoration:none;transition:color 0.2s">Or explore pricing first \u2192</a></div>' +
        '<div class="pbrd-oc-cta-proofs">' +
          '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>Free 15-min consultation</span></div>' +
          '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>No commitment required</span></div>' +
          '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>Live in under 4 hours</span></div>' +
        '</div>' +
      '</div>';

    /* Insert before the footer */
    var footer = document.querySelector("footer, [class*='footer']");
    if (footer) {
      footer.insertAdjacentElement("beforebegin", section);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                       */
  /* ═══════════════════════════════════════════ */

  function init() {
    try {
      /* Fix GSAP pin-spacer black gap on carousel */
      var pinSpacer = document.querySelector(".pin-spacer");
      if (pinSpacer) pinSpacer.style.background = "#fff";

      enhanceHero();
      buildLogos();
      buildJourney();
      enhanceCarousel();
      enhanceDashboard();
      buildBenefits();
      buildCTA();
      console.log("[Paybyrd] Omnichannel enhancements loaded");
    } catch (err) {
      console.error("[Paybyrd] Omnichannel error:", err);
    }
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — E-Commerce Page Enhancements */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/e-commerce")) return;

  var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";
  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/";
  var checkSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ─── Reusable scroll-reveal ─── */
  function observeReveal(selector, staggerMs, root) {
    var els = (root || document).querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("pbrd-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var idx = Array.prototype.indexOf.call(els, el);
          setTimeout(function () { el.classList.add("pbrd-visible"); }, idx * (staggerMs || 100));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    els.forEach(function (e) { observer.observe(e); });
  }

  /* ─── Helper: find section by heading text ─── */
  function findSectionByHeading(text) {
    var result = null;
    document.querySelectorAll("h2, h3").forEach(function (h) {
      if (h.textContent.toLowerCase().includes(text.toLowerCase())) {
        result = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    return result;
  }

  /* ─── Helper: override text by content match ─── */
  function overrideText(searchText, newText, tag) {
    var tags = tag || "h1, h2, h3, h4, h5, h6, p, legend";
    document.querySelectorAll(tags).forEach(function (el) {
      if (el.children.length === 0 && el.textContent.trim().toLowerCase().includes(searchText.toLowerCase().substring(0, 20))) {
        el.textContent = newText;
      }
    });
  }

  /* ─── Shared typing animation ─── */
  function typeText(el, text, delay, cb) {
    var i = 0;
    function tick() {
      if (i <= text.length) {
        el.textContent = text.substring(0, i);
        i++;
        setTimeout(tick, 60 + Math.random() * 40);
      } else if (cb) { setTimeout(cb, delay || 300); }
    }
    tick();
  }

  /* ═══════════════════════════════════════════ */
  /* Section 1: Hero Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heroH1 = document.querySelector("h1");
    if (!heroH1) return;

    /* Kicker */
    var kicker = document.createElement("div");
    kicker.className = "pbrd-ec-kicker";
    kicker.textContent = "Payment infrastructure for growth";
    heroH1.parentElement.insertBefore(kicker, heroH1);

    /* Override H1 */
    heroH1.textContent = "Stop losing customers at checkout.";

    /* Override subtitle */
    var heroP = heroH1.parentElement.querySelector("p");
    if (heroP) {
      heroP.textContent = "Every second of friction costs you revenue. Paybyrd\u2019s checkout loads in under 2 seconds, supports 35+ payment methods, and automatically adapts to each shopper\u2019s country, device, and preference \u2014 so they pay, not leave.";
    }

    /* Stat strip */
    var strip = document.createElement("div");
    strip.className = "pbrd-ec-stat-strip";
    strip.innerHTML =
      '<div class="pbrd-ec-stat-item"><strong>35+</strong> Methods</div>' +
      '<div class="pbrd-ec-stat-item"><strong>192</strong> Currencies</div>' +
      '<div class="pbrd-ec-stat-item"><strong>2.3s</strong> Avg Checkout</div>' +
      '<div class="pbrd-ec-stat-item"><strong>99.8%</strong> Uptime</div>';

    var ctaWrap = heroH1.closest("[class*='hero']");
    if (ctaWrap) {
      var col = ctaWrap.querySelector("[class*='column-1'], [class*='content']") || ctaWrap;
      col.appendChild(strip);
    }

    /* ─── Hero Dashboard Overlay ─── */
    /* Hero is full-bleed — attach dashboard to the hero section itself */
    var heroSection = heroH1.closest("section") || heroH1.closest("[class*='hero']") || heroH1.parentElement.parentElement;
    if (heroSection) {
      heroSection.style.position = "relative";
      heroSection.style.overflow = "visible";

      var dashboard = document.createElement("div");
      dashboard.className = "pbrd-ec-hero-dash";
      dashboard.innerHTML =
        /* Live metrics panel */
        '<div class="pbrd-ec-hero-panel">' +
          '<div class="pbrd-ec-hero-panel-header">' +
            '<div class="pbrd-ec-hero-live-dot"></div>' +
            '<span>Live Checkout Analytics</span>' +
          '</div>' +

          /* Conversion funnel mini */
          '<div class="pbrd-ec-hero-funnel">' +
            '<div class="pbrd-ec-hero-funnel-row">' +
              '<span>Visitors</span>' +
              '<div class="pbrd-ec-hero-funnel-bar"><div class="pbrd-ec-hero-funnel-fill" style="--bar-w:100%"></div></div>' +
              '<span>12,847</span>' +
            '</div>' +
            '<div class="pbrd-ec-hero-funnel-row">' +
              '<span>Cart</span>' +
              '<div class="pbrd-ec-hero-funnel-bar"><div class="pbrd-ec-hero-funnel-fill" style="--bar-w:68%"></div></div>' +
              '<span>8,736</span>' +
            '</div>' +
            '<div class="pbrd-ec-hero-funnel-row">' +
              '<span>Checkout</span>' +
              '<div class="pbrd-ec-hero-funnel-bar"><div class="pbrd-ec-hero-funnel-fill" style="--bar-w:52%;background:linear-gradient(90deg,rgba(120,180,255,0.4),rgba(120,180,255,0.7))"></div></div>' +
              '<span>6,680</span>' +
            '</div>' +
            '<div class="pbrd-ec-hero-funnel-row">' +
              '<span>Paid</span>' +
              '<div class="pbrd-ec-hero-funnel-bar"><div class="pbrd-ec-hero-funnel-fill" style="--bar-w:44%;background:linear-gradient(90deg,rgba(16,185,129,0.4),rgba(16,185,129,0.8))"></div></div>' +
              '<span>5,653</span>' +
            '</div>' +
          '</div>' +

          /* Bottom stats */
          '<div class="pbrd-ec-hero-stats">' +
            '<div class="pbrd-ec-hero-stat"><div class="pbrd-ec-hero-stat-val">92.7%</div><div class="pbrd-ec-hero-stat-lbl">Approval</div></div>' +
            '<div class="pbrd-ec-hero-stat"><div class="pbrd-ec-hero-stat-val">2.1s</div><div class="pbrd-ec-hero-stat-lbl">Avg Speed</div></div>' +
            '<div class="pbrd-ec-hero-stat"><div class="pbrd-ec-hero-stat-val">\u20AC142</div><div class="pbrd-ec-hero-stat-lbl">Avg Order</div></div>' +
          '</div>' +
        '</div>' +

        /* Floating success notification */
        '<div class="pbrd-ec-hero-notif">' +
          '<div style="display:flex;align-items:center;gap:8px">' +
            '<div class="pbrd-ec-hero-notif-icon">' + checkSVG + '</div>' +
            '<div>' +
              '<div style="font-size:0.6875rem;font-weight:600;color:#fff">\u20AC89.00 received</div>' +
              '<div style="font-size:0.5625rem;color:rgba(255,255,255,0.4)">Visa \u2022\u2022\u2022\u2022 4821 \u2022 just now</div>' +
            '</div>' +
          '</div>' +
        '</div>';

      heroSection.appendChild(dashboard);

      /* Animate funnel bars on load */
      setTimeout(function () {
        dashboard.querySelectorAll(".pbrd-ec-hero-funnel-fill").forEach(function (f) {
          f.classList.add("pbrd-ec-animate");
        });
      }, 500);

      /* Cycle the notification with different amounts */
      var notifEl = dashboard.querySelector(".pbrd-ec-hero-notif");
      var notifs = [
        { amount: "\u20AC89.00", method: "Visa \u2022\u2022\u2022\u2022 4821", time: "just now" },
        { amount: "\u20AC245.50", method: "Mastercard \u2022\u2022\u2022\u2022 9103", time: "2s ago" },
        { amount: "\u20AC32.00", method: "MBWay", time: "5s ago" },
        { amount: "\u20AC178.90", method: "PayPal", time: "8s ago" },
        { amount: "\u20AC67.00", method: "Klarna", time: "12s ago" }
      ];
      var notifIdx = 0;
      setInterval(function () {
        notifIdx = (notifIdx + 1) % notifs.length;
        var n = notifs[notifIdx];
        notifEl.style.opacity = "0";
        notifEl.style.transform = "translateY(8px)";
        setTimeout(function () {
          notifEl.querySelector("[style*='font-weight:600']").textContent = n.amount + " received";
          notifEl.querySelector("[style*='color:rgba']").textContent = n.method + " \u2022 " + n.time;
          notifEl.style.opacity = "1";
          notifEl.style.transform = "translateY(0)";
        }, 300);
      }, 3000);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 2: Social Proof Logos              */
  /* ═══════════════════════════════════════════ */

  function buildLogos() {
    var logos = [
      { name: "TAP Air Portugal", src: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg" },
      { name: "Wi\u00F1k", src: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg" },
      { name: "Vila Gal\u00E9", src: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg" },
      { name: "KuantoKusta", src: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg" },
      { name: "Kabuki", src: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg" },
      { name: "Rede Expressos", src: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png" },
      { name: "Andr\u00E9 \u00D3ticas", src: BASE + "customers/andreoticas-logo.png" },
      { name: "Onyria Resorts", src: BASE + "customers/onyria-logo.svg" }
    ];

    var imgsHTML = logos.map(function (l) {
      return '<img src="' + l.src + '" alt="' + l.name + '" loading="lazy">';
    }).join("");

    var section = document.createElement("section");
    section.className = "pbrd-oc-logos";
    section.innerHTML =
      '<div class="pbrd-oc-logos-label">Processing payments for industry leaders across Europe</div>' +
      '<div class="pbrd-oc-logos-track">' + imgsHTML + imgsHTML + '</div>';

    var hero = document.querySelector("[class*='hero']");
    if (hero) {
      var heroSection = hero.closest("section") || hero;
      heroSection.insertAdjacentElement("afterend", section);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 3: Problem Statement + Impact Cards*/
  /* ═══════════════════════════════════════════ */

  function enhanceProblem() {
    /* Find section first, then override within it */
    var section = findSectionByHeading("speed sells") || findSectionByHeading("friction kills");
    if (!section) return;

    /* Override the heading */
    var heading = section.querySelector("h2, h3");
    if (heading) heading.textContent = "Every abandoned cart is revenue walking out the door.";

    /* Override first paragraph, hide extras */
    var pCount = 0;
    section.querySelectorAll("p").forEach(function (p) {
      if (p.textContent.length > 20) {
        if (pCount === 0) {
          p.textContent = "Your customer found the product, added it to cart, entered their details \u2014 then left. Not because they changed their mind, but because your checkout was too slow, asked for too much, or didn\u2019t offer their preferred payment method. That\u2019s not a lost sale. That\u2019s a leak you can fix today.";
        } else {
          p.style.display = "none";
        }
        pCount++;
      }
    });

    /* ─── Tabbed Product Showcase ─── */
    var ICON = BASE + "icons/";
    var showcase = document.createElement("div");
    showcase.className = "pbrd-ec-showcase";

    var tabs = [
      {
        id: "launch",
        label: "Launch",
        icon: '<svg viewBox="0 0 20 20" fill="none"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="currentColor" stroke-width="1.2"/><path d="M12 15l-3-3c1-4 4-7 9-9-2 5-5 8-9 9l3 3z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        title: "Your checkout, live before lunch",
        desc: "Stop waiting on engineering sprints. Paybyrd connects to your stack with pre-built plugins or a clean API \u2014 and most merchants are processing real payments within the same business day.",
        viz:
          '<div class="pbrd-ec-viz-integrations">' +
            '<div class="pbrd-ec-viz-int-row">' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.1s"><img src="' + ICON + 'woocommerce.svg" alt="WooCommerce"><span>WooCommerce</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.15s"><img src="' + ICON + 'magento.svg" alt="Magento"><span>Magento</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.2s"><img src="' + ICON + 'prestashop.svg" alt="PrestaShop"><span>PrestaShop</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.25s"><img src="' + ICON + 'sap.svg" alt="SAP"><span>SAP</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-int-row">' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.3s"><img src="' + ICON + 'oracle.svg" alt="Oracle"><span>Oracle</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.35s"><img src="' + ICON + 'moloni.svg" alt="Moloni"><span>Moloni</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.4s"><img src="' + ICON + 'newhotel.svg" alt="Newhotel"><span>Newhotel</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.45s"><img src="' + ICON + 'whatsapp.svg" alt="WhatsApp"><span>WhatsApp</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-int-row">' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.5s;border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)"><span style="font-size:1rem;font-weight:700">{ }</span><span>REST API</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.55s;border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)"><span style="font-size:0.75rem;font-weight:700">&lt;/&gt;</span><span>Webhooks</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.6s;border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)"><span style="font-size:0.75rem;font-weight:700">SDK</span><span>Libraries</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-int-stat">Average integration time: <strong>4 hours</strong></div>' +
          '</div>'
      },
      {
        id: "convert",
        label: "Convert",
        icon: '<svg viewBox="0 0 20 20" fill="none"><path d="M16 4l-6 6M16 4h-5M16 4v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16l6-6M4 16h5M4 16v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        title: "The checkout where nobody leaves",
        desc: "Every payment method your customer trusts \u2014 auto-detected by country and device. Cards, wallets, BNPL, bank transfers. The right option is always one tap away.",
        viz:
          '<div class="pbrd-ec-viz-methods">' +
            '<div class="pbrd-ec-viz-method-row">' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.1s"><img src="' + ICON + 'visa.png" alt="Visa"><span>Visa</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.15s"><img src="' + ICON + 'mastercard.png" alt="Mastercard"><span>Mastercard</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-method-row">' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.2s"><img src="' + ICON + 'applepay.png" alt="Apple Pay"><span>Apple Pay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.25s"><img src="' + ICON + 'googlepay.png" alt="Google Pay"><span>Google Pay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-method-row">' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.3s"><img src="' + ICON + 'klarna.png" alt="Klarna"><span>Klarna</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.35s"><img src="' + ICON + 'mbway.png" alt="MBWay"><span>MBWay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-method-row">' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.4s"><img src="' + ICON + 'paypal.png" alt="PayPal"><span>PayPal</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.45s"><img src="' + ICON + 'ideal.png" alt="iDEAL"><span>iDEAL</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
          '</div>'
      },
      {
        id: "understand",
        label: "Understand",
        icon: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
        title: "Stop guessing why customers leave",
        desc: "See your entire conversion funnel in real time \u2014 by device, country, payment method, and campaign. Paybyrd doesn\u2019t just process payments. It tells you where the money is leaking.",
        viz:
          '<div class="pbrd-ec-viz-dashboard">' +
            '<div class="pbrd-ec-viz-dash-header"><span class="pbrd-ec-viz-dash-nav">Sales</span><span class="pbrd-ec-viz-dash-nav active">Conversion</span><span class="pbrd-ec-viz-dash-nav">Refunds</span></div>' +
            '<div class="pbrd-ec-viz-funnel">' +
              '<div class="pbrd-ec-viz-funnel-step"><span>Visitors</span><div class="pbrd-ec-viz-funnel-bar" style="--bar-w:100%"></div><span>12,847</span></div>' +
              '<div class="pbrd-ec-viz-funnel-step"><span>Add to Cart</span><div class="pbrd-ec-viz-funnel-bar" style="--bar-w:68%"></div><span>8,736</span></div>' +
              '<div class="pbrd-ec-viz-funnel-step"><span>Checkout</span><div class="pbrd-ec-viz-funnel-bar" style="--bar-w:52%;background:rgba(120,180,255,0.5)"></div><span>6,680</span></div>' +
              '<div class="pbrd-ec-viz-funnel-step"><span>Paid</span><div class="pbrd-ec-viz-funnel-bar" style="--bar-w:44%;background:rgba(16,185,129,0.6)"></div><span>5,653</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-dash-insight">' + checkSVG + ' Checkout \u2192 Paid conversion is <strong>84.6%</strong> \u2014 4.2% above your industry</div>' +
          '</div>'
      },
      {
        id: "control",
        label: "Control",
        icon: '<svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="7" cy="5" r="2" fill="currentColor"/><circle cx="13" cy="10" r="2" fill="currentColor"/><circle cx="9" cy="15" r="2" fill="currentColor"/></svg>',
        title: "Every euro accounted for. Instantly.",
        desc: "Refunds in one click. Chargebacks fought with data. Reconciliation that takes hours, not days. One screen for every transaction, every channel, every market.",
        viz:
          '<div class="pbrd-ec-viz-manage">' +
            '<div class="pbrd-ec-viz-tx-list">' +
              '<div class="pbrd-ec-viz-tx" style="--d:0.1s"><div class="pbrd-ec-viz-tx-status paid">Paid</div><span>\u20AC89.00</span><span>Visa \u2022\u20224821</span><span>2 min ago</span></div>' +
              '<div class="pbrd-ec-viz-tx" style="--d:0.2s"><div class="pbrd-ec-viz-tx-status refund">Refund</div><span>\u20AC32.50</span><span>MBWay</span><span>15 min ago</span></div>' +
              '<div class="pbrd-ec-viz-tx" style="--d:0.3s"><div class="pbrd-ec-viz-tx-status paid">Paid</div><span>\u20AC245.00</span><span>PayPal</span><span>22 min ago</span></div>' +
              '<div class="pbrd-ec-viz-tx" style="--d:0.4s"><div class="pbrd-ec-viz-tx-status paid">Paid</div><span>\u20AC67.90</span><span>Klarna</span><span>35 min ago</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-manage-stats">' +
              '<div class="pbrd-ec-viz-manage-stat"><span class="pbrd-ec-viz-manage-val">\u20AC1.4M</span><span class="pbrd-ec-viz-manage-lbl">Today\u2019s volume</span></div>' +
              '<div class="pbrd-ec-viz-manage-stat"><span class="pbrd-ec-viz-manage-val">0.12%</span><span class="pbrd-ec-viz-manage-lbl">Chargeback rate</span></div>' +
            '</div>' +
          '</div>'
      }
    ];

    var tabsHTML = tabs.map(function (t, i) {
      return '<button class="pbrd-ec-tab' + (i === 0 ? ' active' : '') + '" data-tab="' + t.id + '">' + t.icon + '<span>' + t.label + '</span></button>';
    }).join("");

    var panelsHTML = tabs.map(function (t, i) {
      return '<div class="pbrd-ec-panel' + (i === 0 ? ' active' : '') + '" data-panel="' + t.id + '">' +
        '<div class="pbrd-ec-panel-text">' +
          '<h3>' + t.title + '</h3>' +
          '<p>' + t.desc + '</p>' +
        '</div>' +
        '<div class="pbrd-ec-panel-viz">' + t.viz + '</div>' +
      '</div>';
    }).join("");

    showcase.innerHTML =
      '<div class="pbrd-ec-showcase-tabs">' + tabsHTML + '</div>' +
      '<div class="pbrd-ec-showcase-panels">' + panelsHTML + '</div>';

    var container = section.querySelector(".u-container, [class*='container']") || section;
    container.appendChild(showcase);

    /* Tab switching */
    showcase.querySelectorAll(".pbrd-ec-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        showcase.querySelectorAll(".pbrd-ec-tab").forEach(function (t) { t.classList.remove("active"); });
        showcase.querySelectorAll(".pbrd-ec-panel").forEach(function (p) { p.classList.remove("active"); });
        tab.classList.add("active");
        var panel = showcase.querySelector('[data-panel="' + tab.dataset.tab + '"]');
        if (panel) panel.classList.add("active");
      });
    });

    /* ─── Animations only run when showcase is visible ─── */
    var showcaseVisible = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        showcaseVisible = entries[0].isIntersecting;
      }, { threshold: 0.1 }).observe(showcase);
    } else {
      showcaseVisible = true;
    }

    /* ─── Scroll-triggered tab auto-advance ─── */
    var tabIds = tabs.map(function (t) { return t.id; });
    var scrollTabIdx = 0;
    var scrollTabPaused = false;
    var scrollTabTimer = null;

    function activateTab(idx) {
      var allTabs = showcase.querySelectorAll(".pbrd-ec-tab");
      var allPanels = showcase.querySelectorAll(".pbrd-ec-panel");
      allTabs.forEach(function (t) { t.classList.remove("active"); });
      allPanels.forEach(function (p) { p.classList.remove("active"); });
      if (allTabs[idx]) allTabs[idx].classList.add("active");
      var panel = showcase.querySelector('[data-panel="' + tabIds[idx] + '"]');
      if (panel) panel.classList.add("active");
      scrollTabIdx = idx;
    }

    /* Pause auto-scroll on manual click, resume after 8s */
    showcase.querySelectorAll(".pbrd-ec-tab").forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        scrollTabPaused = true;
        scrollTabIdx = i;
        clearTimeout(scrollTabTimer);
        scrollTabTimer = setTimeout(function () { scrollTabPaused = false; }, 8000);
      });
    });

    /* Advance tab every 4s while showcase is in view */
    setInterval(function () {
      if (!showcaseVisible || scrollTabPaused) return;
      scrollTabIdx = (scrollTabIdx + 1) % tabIds.length;
      activateTab(scrollTabIdx);
    }, 4000);

    /* Convert: toggles cycle */
    var toggles = showcase.querySelectorAll(".pbrd-ec-viz-toggle");
    var togIdx = 0;
    setInterval(function () {
      if (!showcaseVisible || !toggles.length) return;
      var t = toggles[togIdx % toggles.length];
      t.classList.remove("on");
      setTimeout(function () { t.classList.add("on"); }, 1200);
      togIdx++;
    }, 2500);

    /* Understand: funnel numbers tick up (capped) */
    var funnelNums = [12847, 8736, 6680, 5653];
    var funnelMax = [15000, 10000, 8000, 7000];
    setInterval(function () {
      if (!showcaseVisible) return;
      var steps = showcase.querySelectorAll(".pbrd-ec-viz-funnel-step");
      steps.forEach(function (step, i) {
        if (i >= funnelNums.length) return;
        if (funnelNums[i] < funnelMax[i]) funnelNums[i] += Math.floor(Math.random() * 30) + 5;
        else funnelNums[i] = funnelNums[i] - 2000 + Math.floor(Math.random() * 200); /* Reset */
        var numEl = step.querySelector("span:last-child");
        if (numEl) numEl.textContent = funnelNums[i].toLocaleString("en");
      });
    }, 4000);

    /* Control: transactions arrive — simple text swap, no DOM creation */
    var txRows = showcase.querySelectorAll("[data-panel='control'] .pbrd-ec-viz-tx");
    var txData = [
      { s: "paid", a: "\u20AC156.00", m: "Mastercard" },
      { s: "paid", a: "\u20AC42.50", m: "Apple Pay" },
      { s: "paid", a: "\u20AC318.00", m: "Visa \u2022\u20225847" },
      { s: "refund", a: "\u20AC19.90", m: "iDEAL" },
      { s: "paid", a: "\u20AC78.00", m: "Google Pay" },
      { s: "paid", a: "\u20AC205.50", m: "Klarna" },
      { s: "paid", a: "\u20AC93.20", m: "Multibanco" },
      { s: "paid", a: "\u20AC447.00", m: "PayPal" }
    ];
    var txI = 0;
    setInterval(function () {
      if (!showcaseVisible || !txRows.length) return;
      /* Shift existing rows down by updating their content */
      for (var r = txRows.length - 1; r > 0; r--) {
        txRows[r].innerHTML = txRows[r - 1].innerHTML;
      }
      /* New transaction at top */
      var t = txData[txI % txData.length]; txI++;
      var secs = Math.floor(Math.random() * 10) + 1;
      txRows[0].innerHTML =
        '<div class="pbrd-ec-viz-tx-status ' + t.s + '">' + (t.s === "paid" ? "Paid" : "Refund") + '</div>' +
        '<span>' + t.a + '</span><span>' + t.m + '</span><span>' + secs + 's ago</span>';
      txRows[0].style.opacity = "0";
      requestAnimationFrame(function () { txRows[0].style.transition = "opacity 0.4s"; txRows[0].style.opacity = "1"; });
    }, 3000);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 4: Benefits Grid Copy Override     */
  /* ═══════════════════════════════════════════ */

  function enhanceBenefits() {
    /* Find and replace the benefits section */
    var section = findSectionByHeading("built for the way");
    if (!section) return;

    /* Hide ALL original content */
    var children = section.children;
    for (var c = 0; c < children.length; c++) children[c].style.display = "none";

    var ICON = BASE + "icons/";
    var bento = document.createElement("div");
    bento.className = "pbrd-ec-bento-wrap";

    bento.innerHTML =
      '<div class="pbrd-ec-bento-header">' +
        '<h2>Everything your checkout needs.<br>Nothing it doesn\u2019t.</h2>' +
        '<p>From the first click to the final confirmation \u2014 every tool to maximize revenue and minimize friction.</p>' +
      '</div>' +

      '<div class="pbrd-ec-bento">' +

        /* Row 1: Checkout (large) + Dashboard (large) */
        '<div class="pbrd-ec-bento-card pbrd-ec-bento-lg">' +
          '<h3>Your brand. Their favorite way to pay.</h3>' +
          '<p>White-labeled checkout that auto-detects country and shows the right methods. Guest checkout, saved cards, one-tap wallets.</p>' +
          '<div class="pbrd-ec-bento-viz">' +
            '<div class="pbrd-ec-bv-checkout">' +
              '<div class="pbrd-ec-bv-chk-row"><img src="' + ICON + 'visa.png"><span>Visa</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-bv-chk-row"><img src="' + ICON + 'applepay.png"><span>Apple Pay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-bv-chk-row"><img src="' + ICON + 'klarna.png"><span>Klarna</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-bv-chk-row"><img src="' + ICON + 'mbway.png"><span>MBWay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="pbrd-ec-bento-card pbrd-ec-bento-lg">' +
          '<h3>Real-time transaction feed.</h3>' +
          '<p>Every payment, every channel, one screen. Search, filter, refund \u2014 in seconds.</p>' +
          '<div class="pbrd-ec-bento-viz">' +
            '<div class="pbrd-ec-bv-feed" id="pbrd-ec-bento-feed">' +
              '<div class="pbrd-ec-bv-tx"><div class="pbrd-ec-bv-status paid">Paid</div><span>\u20AC89.00</span><span>Visa \u2022\u20224821</span><span>just now</span></div>' +
              '<div class="pbrd-ec-bv-tx"><div class="pbrd-ec-bv-status paid">Paid</div><span>\u20AC245.50</span><span>PayPal</span><span>12s ago</span></div>' +
              '<div class="pbrd-ec-bv-tx"><div class="pbrd-ec-bv-status refund">Refund</div><span>\u20AC32.00</span><span>MBWay</span><span>28s ago</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Row 2: Pay Links + Security + Global */
        '<div class="pbrd-ec-bento-card pbrd-ec-bento-tall">' +
          '<h3>Send a link. Get paid.</h3>' +
          '<p>Payment links via WhatsApp, SMS, email. Perfect for phone orders and remote sales.</p>' +
          '<div class="pbrd-ec-bento-viz pbrd-ec-bv-link-viz">' +
            '<div class="pbrd-ec-bv-link-mock">' +
              '<div class="pbrd-ec-bv-link-success-icon">' + checkSVG + '</div>' +
              '<div class="pbrd-ec-bv-link-title">Link Created!</div>' +
              '<div class="pbrd-ec-bv-link-amount-row">EUR 64.00</div>' +
              '<div class="pbrd-ec-bv-link-url-box">' +
                '<div class="pbrd-ec-bv-link-url-label">Payment Link</div>' +
                '<div class="pbrd-ec-bv-link-url">https://link.paybyrd.com/chk9Dc</div>' +
              '</div>' +
              '<div class="pbrd-ec-bv-link-btn-copy">Copy Link</div>' +
              '<div class="pbrd-ec-bv-link-btn-share">Share via WhatsApp, Email\u2026</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="pbrd-ec-bento-card">' +
          '<h3>Fraud blocked.<br>Revenue protected.</h3>' +
          '<p>AI risk scoring. 3D Secure. Smart rules that learn your business.</p>' +
          '<div class="pbrd-ec-bento-viz">' +
            '<div class="pbrd-ec-bv-shield">' +
              '<div class="pbrd-ec-bv-shield-icon">' +
                '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5.25-3.44 10.14-8 11.5C7.44 22.14 4 17.25 4 12V7l8-4z" stroke="currentColor" stroke-width="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '</div>' +
              '<div class="pbrd-ec-bv-shield-stats">' +
                '<div><strong>0.12%</strong> chargeback rate</div>' +
                '<div><strong>92.7%</strong> approval rate</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="pbrd-ec-bento-card">' +
          '<h3>Go global.<br>Pay local.</h3>' +
          '<p>35+ methods across 192 currencies. Auto-detect shopper location.</p>' +
          '<div class="pbrd-ec-bento-viz">' +
            '<div class="pbrd-ec-bv-global">' +
              '<div class="pbrd-ec-bv-flag-row">' +
                '<span>\uD83C\uDDF5\uD83C\uDDF9</span><span>\uD83C\uDDF3\uD83C\uDDF1</span><span>\uD83C\uDDE9\uD83C\uDDEA</span><span>\uD83C\uDDEB\uD83C\uDDF7</span><span>\uD83C\uDDEA\uD83C\uDDF8</span><span>\uD83C\uDDEC\uD83C\uDDE7</span><span>\uD83C\uDDE7\uD83C\uDDF7</span><span>\uD83C\uDDE6\uD83C\uDDF4</span>' +
              '</div>' +
              '<div class="pbrd-ec-bv-global-stat"><strong>35+</strong> methods \u2022 <strong>192</strong> currencies</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Row 3: Subscriptions (wide) */
        '<div class="pbrd-ec-bento-card pbrd-ec-bento-wide">' +
          '<div class="pbrd-ec-bento-wide-inner">' +
            '<div>' +
              '<h3>Recurring revenue. Zero effort.</h3>' +
              '<p>Tokenized billing with automatic retries, dunning, and card updates. Reduce involuntary churn by up to 30%.</p>' +
            '</div>' +
            '<div class="pbrd-ec-bento-viz">' +
              '<div class="pbrd-ec-bv-sub">' +
                '<div class="pbrd-ec-bv-sub-icon">' + checkSVG + '</div>' +
                '<div class="pbrd-ec-bv-sub-text">Subscription Confirmed</div>' +
                '<div class="pbrd-ec-bv-sub-detail">\u20AC29.90/mo \u2022 Auto-renewal \u2022 Card on file</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>';

    section.appendChild(bento);

    observeReveal(".pbrd-ec-bento-card", 100, bento);

    /* Animate the bento feed — text swap only, no DOM creation */
    var bentoFeed = document.getElementById("pbrd-ec-bento-feed");
    if (bentoFeed) {
      var feedPool = [
        { s: "paid", a: "\u20AC156.00", m: "Mastercard" },
        { s: "paid", a: "\u20AC42.50", m: "Apple Pay" },
        { s: "paid", a: "\u20AC318.00", m: "Visa \u2022\u20225847" },
        { s: "refund", a: "\u20AC19.90", m: "iDEAL" },
        { s: "paid", a: "\u20AC78.00", m: "Google Pay" },
        { s: "paid", a: "\u20AC205.50", m: "Klarna" }
      ];
      var feedIdx = 0;
      var feedRows = bentoFeed.querySelectorAll(".pbrd-ec-bv-tx");
      var bentoVisible = false;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e) { bentoVisible = e[0].isIntersecting; }, { threshold: 0.1 }).observe(bentoFeed);
      } else { bentoVisible = true; }

      setInterval(function () {
        if (!bentoVisible || !feedRows.length) return;
        for (var r = feedRows.length - 1; r > 0; r--) {
          feedRows[r].innerHTML = feedRows[r - 1].innerHTML;
        }
        var f = feedPool[feedIdx % feedPool.length]; feedIdx++;
        feedRows[0].innerHTML = '<div class="pbrd-ec-bv-status ' + f.s + '">' + (f.s === "paid" ? "Paid" : "Refund") + '</div><span>' + f.a + '</span><span>' + f.m + '</span><span>just now</span>';
        feedRows[0].style.opacity = "0";
        requestAnimationFrame(function () { feedRows[0].style.transition = "opacity 0.4s"; feedRows[0].style.opacity = "1"; });
      }, 3500);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 5: Data Section — copy enhancement */
  /* ═══════════════════════════════════════════ */

  function enhanceDataSection() {
    var section = findSectionByHeading("data that drives");
    if (!section) return;

    /* Override the bullet point copy with action-oriented text */
    var copyMap = {
      "monitor drop": "See exactly where customers leave \u2014 and why",
      "spot failed": "Recover revenue from failed payments automatically",
      "track method": "Know which payment methods convert \u2014 and which cost you sales",
      "identify friction": "Catch problems before they become lost revenue",
      "test and iterate": "Optimize without writing a single line of code"
    };

    section.querySelectorAll("p, span, div").forEach(function (el) {
      if (el.children.length > 0) return;
      var txt = el.textContent.toLowerCase().trim();
      for (var key in copyMap) {
        if (txt.indexOf(key) === 0) {
          el.textContent = copyMap[key];
          break;
        }
      }
    });

    /* Add closing stat — insert before the integrations section */
    if (!document.querySelector(".pbrd-ec-data-stat")) {
      var intSection = findSectionByHeading("stack you already") || findSectionByHeading("plug in");
      if (intSection) {
        var stat = document.createElement("div");
        stat.className = "pbrd-ec-data-stat";
        stat.innerHTML = '<p>Merchants using Paybyrd analytics recover an average of <strong>12% more revenue</strong> within 60 days.</p>';
        intSection.insertAdjacentElement("beforebegin", stat);
      }
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 6: Integration Logos               */
  /* ═══════════════════════════════════════════ */

  function enhanceIntegrations() {
    var section = findSectionByHeading("stack you already");
    if (!section) return;

    /* Override heading */
    var h = section.querySelector("h2, h3");
    if (h) h.textContent = "Plug in today. Not next quarter.";

    /* Override only the first short paragraph */
    var overridden = false;
    section.querySelectorAll("p").forEach(function (p) {
      if (!overridden && p.textContent.length > 30 && p.textContent.length < 200) {
        p.textContent = "Pre-built integrations for every major e-commerce platform. Your developer spends hours, not months. Full REST API for custom builds.";
        overridden = true;
      }
    });

    /* Replace the oversized dashboard image with a live mockup */
    var imgCol = section.querySelector("[class*='column-2'], [class*='image']");
    if (!imgCol) {
      /* Try to find the image directly and use its parent */
      section.querySelectorAll("img").forEach(function (img) {
        var src = (img.getAttribute("src") || "").toLowerCase();
        if (src.indexOf("paybyrd") !== -1 || src.indexOf("dashboard") !== -1 || src.indexOf("statistic") !== -1) {
          imgCol = img.closest("[class*='column']") || img.parentElement;
        }
      });
    }
    if (imgCol) {
      /* Hide original content */
      Array.from(imgCol.children).forEach(function (c) { c.style.display = "none"; });

      var dash = document.createElement("div");
      dash.className = "pbrd-ec-live-dash";
      dash.innerHTML =
        /* Sidebar */
        '<div class="pbrd-ec-ld-sidebar">' +
          '<div class="pbrd-ec-ld-logo"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#8B5CF6"/></svg></div>' +
          '<div class="pbrd-ec-ld-sidebar-label">DASHBOARD</div>' +
          '<div class="pbrd-ec-ld-sidebar-item active"><svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg>Dashboard</div>' +
          '<div class="pbrd-ec-ld-sidebar-label">PAYMENTS</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M3 7h14M3 11h14M3 15h10" stroke-width="1.5" stroke-linecap="round"/></svg>Transactions</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M10 2v16M6 6l4-4 4 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Payouts</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><rect x="3" y="5" width="14" height="10" rx="2" stroke-width="1.5"/></svg>Orders</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M10 2l7 4v4c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" stroke-width="1.5"/></svg>Chargebacks</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M15 7l-5 5-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="10" r="8" stroke-width="1.5"/></svg>PayLink</div>' +
          '<div class="pbrd-ec-ld-sidebar-label">INSIGHTS</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M3 17l4-6 3 3 5-8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Business Intelligence</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><circle cx="10" cy="10" r="7" stroke-width="1.5"/><path d="M10 6v4l3 2" stroke-width="1.5" stroke-linecap="round"/></svg>Activity Log</div>' +
        '</div>' +

        /* Main */
        '<div class="pbrd-ec-ld-main">' +
          /* Top bar */
          '<div class="pbrd-ec-ld-topbar">' +
            '<div>' +
              '<div class="pbrd-ec-ld-greeting">Good morning, Ana Ferreira</div>' +
              '<div class="pbrd-ec-ld-sub">Here\u2019s your business overview.</div>' +
            '</div>' +
            '<div class="pbrd-ec-ld-search"><svg viewBox="0 0 16 16" fill="none" width="10" height="10"><circle cx="7" cy="7" r="5" stroke="#9CA3AF" stroke-width="1.5"/><path d="M11 11l3 3" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg>Search transactions, orders...</div>' +
          '</div>' +

          /* Volume cards row */
          '<div class="pbrd-ec-ld-cards">' +
            '<div class="pbrd-ec-ld-vol-card blue">' +
              '<div class="pbrd-ec-ld-vol-label">EUR Total Volume</div>' +
              '<div class="pbrd-ec-ld-vol-amount" id="pbrd-ec-ld-vol">\u20AC2,315,238.19</div>' +
              '<div class="pbrd-ec-ld-vol-metas">' +
                '<span>Transactions <strong>21,044</strong></span>' +
                '<span>Avg \u20AC110.02</span>' +
                '<span>Total <strong>22,979</strong></span>' +
              '</div>' +
            '</div>' +
            '<div class="pbrd-ec-ld-vol-card red">' +
              '<div class="pbrd-ec-ld-vol-label">EUR Refund Volume</div>' +
              '<div class="pbrd-ec-ld-vol-amount">\u20AC47,664.24</div>' +
              '<div class="pbrd-ec-ld-vol-metas">' +
                '<span><strong>200</strong></span>' +
                '<span>\u20AC2,357,175</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

          /* Currency volume counters */
          '<div class="pbrd-ec-ld-currencies">' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDEA\uD83C\uDDFA</span><span class="pbrd-ec-ld-cur-code">EUR</span><span class="pbrd-ec-ld-cur-val">\u20AC1,847,201</span></div>' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDE7\uD83C\uDDF7</span><span class="pbrd-ec-ld-cur-code">BRL</span><span class="pbrd-ec-ld-cur-val">R$312,445</span></div>' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDFA\uD83C\uDDF8</span><span class="pbrd-ec-ld-cur-code">USD</span><span class="pbrd-ec-ld-cur-val">$198,720</span></div>' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDE6\uD83C\uDDF4</span><span class="pbrd-ec-ld-cur-code">AOA</span><span class="pbrd-ec-ld-cur-val">Kz45,200k</span></div>' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDF5\uD83C\uDDF1</span><span class="pbrd-ec-ld-cur-code">PLN</span><span class="pbrd-ec-ld-cur-val">z\u014289,330</span></div>' +
          '</div>' +

          /* Bottom row: Latest Payments + Acceptance */
          '<div class="pbrd-ec-ld-bottom">' +
            '<div class="pbrd-ec-ld-panel">' +
              '<div class="pbrd-ec-ld-panel-header">Latest Payments</div>' +
              '<div class="pbrd-ec-ld-txs" id="pbrd-ec-ld-txs">' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#10b981"></span><span>VG Evora</span><span class="pbrd-ec-ld-tx-a">\u20AC22.20</span></div>' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#10b981"></span><span>VG Pal\u00E1cio dos Arcos</span><span class="pbrd-ec-ld-tx-a">\u20AC12.50</span></div>' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#10b981"></span><span>VG Collection Elvas</span><span class="pbrd-ec-ld-tx-a">\u20AC73.20</span></div>' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#f59e0b"></span><span>SMY St Eulalia</span><span class="pbrd-ec-ld-tx-a">\u20AC62.00</span></div>' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#10b981"></span><span>Vila Gal\u00E9 Cascais</span><span class="pbrd-ec-ld-tx-a">\u20AC128.60</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="pbrd-ec-ld-panel">' +
              '<div class="pbrd-ec-ld-panel-header">Payment Acceptance<span class="pbrd-ec-ld-badge">92.7%</span></div>' +
              '<div class="pbrd-ec-ld-accept">' +
                '<div class="pbrd-ec-ld-accept-row"><span>EUR</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:96%;background:#10b981"></div></div><span class="pbrd-ec-ld-pct green">96%</span></div>' +
                '<div class="pbrd-ec-ld-accept-row"><span>BRL</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:82%;background:#F59E0B"></div></div><span class="pbrd-ec-ld-pct yellow">82%</span></div>' +
                '<div class="pbrd-ec-ld-accept-row"><span>USD</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:88%;background:#EF4444"></div></div><span class="pbrd-ec-ld-pct red">88%</span></div>' +
                '<div class="pbrd-ec-ld-accept-row"><span>AOA</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:71%;background:#8B5CF6"></div></div><span class="pbrd-ec-ld-pct purple">71%</span></div>' +
                '<div class="pbrd-ec-ld-accept-row"><span>PLN</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:100%;background:#2B6FED"></div></div><span class="pbrd-ec-ld-pct blue">100%</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';

      imgCol.appendChild(dash);

      /* Animate volume counter */
      var volEl = document.getElementById("pbrd-ec-ld-vol");
      var vol = 3529455;
      setInterval(function () {
        vol += Math.floor(Math.random() * 800) + 100;
        if (volEl) volEl.textContent = "\u20AC" + vol.toLocaleString("en");
      }, 4000);

      /* Animate transactions */
      var ldTxs = document.getElementById("pbrd-ec-ld-txs");
      var ldPool = [
        { a: "\u20AC156.00", m: "Mastercard" }, { a: "\u20AC42.50", m: "Apple Pay" },
        { a: "\u20AC318.00", m: "Klarna" }, { a: "\u20AC78.00", m: "Google Pay" },
        { a: "\u20AC205.50", m: "iDEAL" }, { a: "\u20AC93.20", m: "Visa \u2022\u20225847" }
      ];
      var ldI = 0;
      if (ldTxs) {
        var ldRows = ldTxs.querySelectorAll(".pbrd-ec-ld-tx");
        setInterval(function () {
          var t = ldPool[ldI % ldPool.length]; ldI++;
          for (var r = ldRows.length - 1; r > 0; r--) ldRows[r].innerHTML = ldRows[r - 1].innerHTML;
          ldRows[0].innerHTML = '<span class="pbrd-ec-ld-tx-s paid">Paid</span><span class="pbrd-ec-ld-tx-a">' + t.a + '</span><span>' + t.m + '</span><span>just now</span>';
          ldRows[0].style.opacity = "0";
          requestAnimationFrame(function () { ldRows[0].style.transition = "opacity 0.4s"; ldRows[0].style.opacity = "1"; });
        }, 3500);
      }

      /* Animate acceptance bars */
      setTimeout(function () {
        dash.querySelectorAll(".pbrd-ec-ld-bar-fill").forEach(function (f) {
          f.style.width = f.style.getPropertyValue("--bar-w");
        });
      }, 500);

      /* Rotate greeting name */
      var greetNames = [
        "Ana Ferreira", "Faisal Al-Lawr",
        "Sophie van Dijk", "Charlie Munger", "Luca Bianchi"
      ];
      var greetIdx = 0;
      var greetEl = dash.querySelector(".pbrd-ec-ld-greeting");
      if (greetEl) {
        setInterval(function () {
          greetIdx = (greetIdx + 1) % greetNames.length;
          greetEl.style.opacity = "0";
          setTimeout(function () {
            greetEl.textContent = "Good morning, " + greetNames[greetIdx];
            greetEl.style.opacity = "1";
          }, 400);
        }, 3000);
      }
    }

    /* Add integration pills */
    var grid = document.createElement("div");
    grid.className = "pbrd-ec-integrations";
    grid.innerHTML =
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/woocommerce.svg" alt="WooCommerce" style="height:16px;width:auto">WooCommerce</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/magento.svg" alt="Magento" style="height:16px;width:auto">Magento</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/prestashop.svg" alt="PrestaShop" style="height:16px;width:auto">PrestaShop</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/sap.svg" alt="SAP" style="height:16px;width:auto">SAP</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/oracle.svg" alt="Oracle" style="height:16px;width:auto">Oracle</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/moloni.svg" alt="Moloni" style="height:16px;width:auto">Moloni</div>' +
      '<div class="pbrd-oc-int-pill" style="border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)">+ REST API</div>';

    var note = document.createElement("div");
    note.className = "pbrd-ec-int-note";
    note.textContent = "Average integration time: 4 hours \u2022 Full API with webhooks and sandbox";

    var container = section.querySelector(".u-container, [class*='container']") || section;
    container.appendChild(grid);
    container.appendChild(note);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 7: Checkout Experience (Mollie-style) */
  /* ═══════════════════════════════════════════ */

  function enhanceJourney() {
    var ICON = BASE + "icons/";

    /* Find the heading */
    var heading = null;
    document.querySelectorAll("h2").forEach(function (h) {
      if (h.textContent.toLowerCase().includes("every part of the journey")) heading = h;
    });
    if (!heading) return;

    /* Find the section and hide it entirely */
    var section = heading.closest("section") || heading.closest(".u-section") || heading.closest("[class*='section']");
    if (!section) return;
    section.style.display = "none";

    /* Also hide the wrapper div around it (Webflow wraps sections in divs) */
    var sectionParent = section.parentElement;
    if (sectionParent && sectionParent.tagName === "DIV" && sectionParent.children.length === 1) {
      sectionParent.style.display = "none";
    }

    /* Create a new standalone section and insert it where the old one was */
    var newSection = document.createElement("section");
    newSection.className = "pbrd-ec-checkout-section";
    newSection.style.background = "#fff";
    newSection.style.padding = "80px 0";
    var insertTarget = sectionParent && sectionParent.style.display === "none" ? sectionParent : section;
    insertTarget.insertAdjacentElement("afterend", newSection);

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ec-checkout";
    wrap.innerHTML =
      /* Section header */
      '<div class="pbrd-ec-chk-header">' +
        '<h2 class="pbrd-ec-chk-title">Offer every customer a seamless checkout experience</h2>' +
        '<p class="pbrd-ec-chk-sub">Create a branded checkout tailored to your customers\u2019 needs with our no-code solution and customisable checkout components.</p>' +
      '</div>' +

      /* Four cards — 2x2 grid */
      '<div class="pbrd-ec-chk-grid">' +

        /* Card 1: Prebuilt Checkout with TAP image */
        '<div class="pbrd-ec-chk-card pbrd-ec-reveal">' +
          '<div class="pbrd-ec-chk-card-visual pbrd-ec-chk-vis-checkout">' +
            '<img src="' + BASE + 'ecommerce/tapcheckout.png" alt="TAP Air Portugal" class="pbrd-ec-chk-bg-img">' +
            '<div class="pbrd-ec-chk-form-overlay">' +
              '<div class="pbrd-ec-paybyrd-chk" id="pbrd-ec-live-chk">' +
                '<div class="pbrd-ec-pchk-head">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dcc_tap-logo.svg" alt="TAP" style="height:11px;max-height:11px;width:auto;filter:brightness(10)">' +
                  '<div class="pbrd-ec-pchk-amount">\u20AC347.00</div>' +
                  '<div class="pbrd-ec-pchk-ref">Order #TAP-29471</div>' +
                '</div>' +
                '<div class="pbrd-ec-pchk-tabs">' +
                  '<div class="pbrd-ec-pchk-tab active"><img src="' + ICON + 'visa.png" style="height:12px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'applepay.png" style="height:12px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'mbway.png" style="height:12px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'paypal.png" style="height:12px"></div>' +
                '</div>' +
                '<div class="pbrd-ec-pchk-form">' +
                  '<div class="pbrd-ec-pchk-field"><label>Card number</label><div class="pbrd-ec-pchk-input" id="pbrd-pchk-card"></div></div>' +
                  '<div class="pbrd-ec-pchk-row">' +
                    '<div class="pbrd-ec-pchk-field"><label>Expiry</label><div class="pbrd-ec-pchk-input" id="pbrd-pchk-exp"></div></div>' +
                    '<div class="pbrd-ec-pchk-field"><label>CVC</label><div class="pbrd-ec-pchk-input" id="pbrd-pchk-cvc"></div></div>' +
                  '</div>' +
                  '<div class="pbrd-ec-pchk-field"><label>Name</label><div class="pbrd-ec-pchk-input" id="pbrd-pchk-name"></div></div>' +
                '</div>' +
                '<div class="pbrd-ec-pchk-btn" id="pbrd-pchk-btn">Pay \u20AC347.00</div>' +
                '<div class="pbrd-ec-pchk-powered">Powered by <strong>Paybyrd</strong></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-chk-card-body pbrd-ec-chk-body-glass">' +
            '<h3>Your brand, their preferred way to pay</h3>' +
            '<p>A fully branded checkout that feels native to your store. Auto-detects country, remembers returning shoppers, supports 35+ methods.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Launch in minutes, no developers needed</li>' +
              '<li>' + checkSVG + '23% higher conversion vs generic checkouts</li>' +
              '<li>' + checkSVG + 'Full brand control \u2014 colours, logo, domain</li>' +
            '</ul>' +
            '<a class="pbrd-ec-chk-link" href="/e-commerce">Explore hosted checkout <span>\u2192</span></a>' +
          '</div>' +
        '</div>' +

        /* Card 2: Custom Components */
        '<div class="pbrd-ec-chk-card pbrd-ec-reveal">' +
          '<div class="pbrd-ec-chk-card-visual">' +
            '<div class="pbrd-ec-chk-components" id="pbrd-ec-comp-vis">' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.1s">' +
                '<div class="pbrd-ec-chk-comp-label">Payment Method Selector</div>' +
                '<div class="pbrd-ec-chk-comp-methods" id="pbrd-comp-pills">' +
                  '<div class="pbrd-ec-chk-comp-pill active">Card</div>' +
                  '<div class="pbrd-ec-chk-comp-pill">MBWay</div>' +
                  '<div class="pbrd-ec-chk-comp-pill">PayPal</div>' +
                '</div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.25s">' +
                '<div class="pbrd-ec-chk-comp-label" id="pbrd-comp-field-label">Card Input</div>' +
                '<div class="pbrd-ec-chk-comp-input"><span id="pbrd-comp-input"></span></div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.4s">' +
                '<div class="pbrd-ec-chk-comp-label">Submit Button</div>' +
                '<div class="pbrd-ec-chk-comp-submit" id="pbrd-comp-submit">Pay now</div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-code pbrd-ec-chk-comp-pop" style="--d:0.55s" id="pbrd-comp-code">' +
                '<span class="pbrd-ec-chk-code-ln">1</span><span style="color:#c678dd">import</span> { PaybyrdCheckout } <span style="color:#c678dd">from</span> <span style="color:#98c379">\'@paybyrd/sdk\'</span>' +
                '<br><span class="pbrd-ec-chk-code-ln">2</span>' +
                '<br><span class="pbrd-ec-chk-code-ln">3</span><span style="color:#c678dd">const</span> checkout = <span style="color:#c678dd">new</span> <span style="color:#e5c07b">PaybyrdCheckout</span>({' +
                '<br><span class="pbrd-ec-chk-code-ln">4</span>  amount: <span style="color:#d19a66">34700</span>,' +
                '<br><span class="pbrd-ec-chk-code-ln">5</span>  currency: <span style="color:#98c379">\'EUR\'</span>' +
                '<br><span class="pbrd-ec-chk-code-ln">6</span>})' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-chk-card-body pbrd-ec-chk-body-glass">' +
            '<h3>Build your own with drop-in components</h3>' +
            '<p>Full control over every pixel. Drop pre-certified PCI components into your own UI \u2014 method selector, card fields, tokenisation \u2014 all from one SDK.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'PCI-compliant without the audit burden</li>' +
              '<li>' + checkSVG + 'Match your design system exactly</li>' +
              '<li>' + checkSVG + 'Tokenise cards for one-click repeat purchases</li>' +
            '</ul>' +
            '<a class="pbrd-ec-chk-link" href="/e-commerce">Explore components <span>\u2192</span></a>' +
          '</div>' +
        '</div>' +

        /* Card 3: Mobile-first / Thumb-friendly */
        '<div class="pbrd-ec-chk-card pbrd-ec-reveal">' +
          '<div class="pbrd-ec-chk-card-visual">' +
            '<div class="pbrd-ec-chk-mobile-visual">' +
              '<div class="pbrd-ec-chk-phone" id="pbrd-ec-mob-chk">' +
                '<div class="pbrd-ec-chk-phone-notch"></div>' +
                '<div class="pbrd-ec-chk-phone-screen">' +
                  /* Mini Paybyrd checkout inside phone */
                  '<div class="pbrd-ec-mob-head">' +
                    '<span class="pbrd-ec-mob-powered">Powered by <strong>Paybyrd</strong></span>' +
                    '<div class="pbrd-ec-mob-amount">\u20AC89.00</div>' +
                  '</div>' +
                  '<div class="pbrd-ec-mob-tabs">' +
                    '<div class="pbrd-ec-mob-tab" id="pbrd-mob-t0"><img src="' + ICON + 'visa.png" style="height:19px;width:auto"></div>' +
                    '<div class="pbrd-ec-mob-tab" id="pbrd-mob-t1"><img src="' + ICON + 'applepay.png" style="height:19px;width:auto"></div>' +
                    '<div class="pbrd-ec-mob-tab active" id="pbrd-mob-t2"><img src="' + ICON + 'mbway.png" style="height:19px;width:auto"></div>' +
                  '</div>' +
                  '<div class="pbrd-ec-mob-form" id="pbrd-mob-form">' +
                    '<div class="pbrd-ec-mob-field"><label>Phone number</label><div class="pbrd-ec-mob-input" id="pbrd-mob-phone"></div></div>' +
                  '</div>' +
                  '<div class="pbrd-ec-mob-btn" id="pbrd-mob-btn">Pay with MBWay</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-chk-card-body pbrd-ec-chk-body-glass">' +
            '<h3>Thumb-friendly payments that convert</h3>' +
            '<p>67% of e-commerce traffic is mobile. Your checkout should be built for thumbs, not mice. One-tap wallets, biometric auth, zero typing.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Apple Pay, Google Pay, MBWay in one tap</li>' +
              '<li>' + checkSVG + 'Auto-detects device and shows best option</li>' +
              '<li>' + checkSVG + 'Responsive down to 320px \u2014 every screen covered</li>' +
            '</ul>' +
            '<a class="pbrd-ec-chk-link" href="/e-commerce">See mobile experience <span>\u2192</span></a>' +
          '</div>' +
        '</div>' +

        /* Card 4: Recurring / Subscriptions */
        '<div class="pbrd-ec-chk-card pbrd-ec-reveal">' +
          '<div class="pbrd-ec-chk-card-visual">' +
            '<div class="pbrd-ec-chk-recurring-visual">' +
              '<div class="pbrd-ec-chk-rec-timeline">' +
                '<div class="pbrd-ec-chk-rec-event pbrd-ec-chk-comp-pop" style="--d:0.1s">' +
                  '<div class="pbrd-ec-chk-rec-dot green"></div>' +
                  '<div class="pbrd-ec-chk-rec-info"><strong>\u20AC29.99</strong> charged<span>Apr 1 \u2022 Visa \u2022\u20224821</span></div>' +
                '</div>' +
                '<div class="pbrd-ec-chk-rec-event pbrd-ec-chk-comp-pop" style="--d:0.25s">' +
                  '<div class="pbrd-ec-chk-rec-dot green"></div>' +
                  '<div class="pbrd-ec-chk-rec-info"><strong>\u20AC29.99</strong> charged<span>Mar 1 \u2022 Visa \u2022\u20224821</span></div>' +
                '</div>' +
                '<div class="pbrd-ec-chk-rec-event pbrd-ec-chk-comp-pop" style="--d:0.4s">' +
                  '<div class="pbrd-ec-chk-rec-dot yellow"></div>' +
                  '<div class="pbrd-ec-chk-rec-info"><strong>\u20AC29.99</strong> retry succeeded<span>Feb 3 \u2022 Auto-retry #2</span></div>' +
                '</div>' +
                '<div class="pbrd-ec-chk-rec-event pbrd-ec-chk-comp-pop" style="--d:0.55s">' +
                  '<div class="pbrd-ec-chk-rec-dot green"></div>' +
                  '<div class="pbrd-ec-chk-rec-info"><strong>\u20AC29.99</strong> charged<span>Jan 1 \u2022 Visa \u2022\u20224821</span></div>' +
                '</div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-rec-stat pbrd-ec-chk-comp-pop" style="--d:0.7s">' +
                '<div class="pbrd-ec-chk-rec-stat-val">97.3%</div>' +
                '<div class="pbrd-ec-chk-rec-stat-label">Collection rate</div>' +
                '<div class="pbrd-ec-chk-rec-stat-sub">\u2191 4.1% from smart retries</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-chk-card-body pbrd-ec-chk-body-glass">' +
            '<h3>Recurring revenue on autopilot</h3>' +
            '<p>Tokenised billing that handles retries, dunning, and card updates automatically. Stop losing subscribers to expired cards.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Smart retry logic recovers 30% of failed charges</li>' +
              '<li>' + checkSVG + 'Automatic card updater \u2014 never lose a subscriber</li>' +
              '<li>' + checkSVG + 'SCA-ready with 3DS2 built in</li>' +
            '</ul>' +
            '<a class="pbrd-ec-chk-link" href="/e-commerce">Explore subscriptions <span>\u2192</span></a>' +
          '</div>' +
        '</div>' +

      '</div>';

    newSection.appendChild(wrap);
    observeReveal(".pbrd-ec-reveal", 150, wrap);

    /* ─── Checkout form fill animation ─── */
    var chkEl = document.getElementById("pbrd-ec-live-chk");
    if (chkEl) {
      var cardEl = document.getElementById("pbrd-pchk-card");
      var expEl = document.getElementById("pbrd-pchk-exp");
      var cvcEl = document.getElementById("pbrd-pchk-cvc");
      var nameEl = document.getElementById("pbrd-pchk-name");
      var btnEl = document.getElementById("pbrd-pchk-btn");

      function runCheckoutAnim() {
        /* Reset */
        cardEl.textContent = "";
        expEl.textContent = "";
        cvcEl.textContent = "";
        nameEl.textContent = "";
        btnEl.textContent = "Pay \u20AC347.00";
        btnEl.style.background = "";
        chkEl.querySelector(".pbrd-ec-pchk-form").style.display = "";

        /* Type card → expiry → cvc → name → pay → success */
        setTimeout(function () {
          typeText(cardEl, "4821 3829 4455 7392", 400, function () {
            typeText(expEl, "09/28", 300, function () {
              typeText(cvcEl, "\u2022\u2022\u2022", 300, function () {
                typeText(nameEl, "Ana Ferreira", 600, function () {
                  /* Click pay */
                  btnEl.textContent = "Processing\u2026";
                  btnEl.style.opacity = "0.7";
                  setTimeout(function () {
                    btnEl.textContent = "\u2713 Payment successful";
                    btnEl.style.background = "#059669";
                    btnEl.style.opacity = "1";
                    /* Wait then restart */
                    setTimeout(runCheckoutAnim, 3000);
                  }, 1800);
                });
              });
            });
          });
        }, 800);
      }

      /* Only animate when visible */
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            runCheckoutAnim();
            this.disconnect();
          }
        }, { threshold: 0.3 }).observe(chkEl);
      }
    }

    /* ─── Mobile checkout animation ─── */
    var mobChk = document.getElementById("pbrd-ec-mob-chk");
    if (mobChk) {
      var mobPhone = document.getElementById("pbrd-mob-phone");
      var mobBtn = document.getElementById("pbrd-mob-btn");
      var mobForm = document.getElementById("pbrd-mob-form");
      var mobTabs = [document.getElementById("pbrd-mob-t0"), document.getElementById("pbrd-mob-t1"), document.getElementById("pbrd-mob-t2")];

      var mobMethods = [
        { tab: 2, label: "MBWay", field: "Phone number", value: "+351 912 345 678", btn: "Pay with MBWay" },
        { tab: 0, label: "Card", field: "Card number", value: "4821 3829 \u2022\u2022\u2022\u2022 7392", btn: "Pay \u20AC89.00" },
        { tab: 1, label: "Apple Pay", field: "", value: "", btn: "apple" }
      ];
      var mobIdx = 0;

      function runMobAnim() {
        var m = mobMethods[mobIdx % mobMethods.length];
        mobIdx++;

        /* Switch tab */
        mobTabs.forEach(function (t) { if (t) t.classList.remove("active"); });
        if (mobTabs[m.tab]) mobTabs[m.tab].classList.add("active");

        /* Update form */
        if (m.field) {
          mobForm.style.display = "";
          mobForm.innerHTML = '<div class="pbrd-ec-mob-field"><label>' + m.field + '</label><div class="pbrd-ec-mob-input" id="pbrd-mob-val"></div></div>';
          mobBtn.textContent = m.btn;
          mobBtn.style.background = "";
          var valEl = document.getElementById("pbrd-mob-val");
          setTimeout(function () {
            typeText(valEl, m.value, 500, function () {
              mobBtn.style.opacity = "0.7";
              mobBtn.textContent = "Processing\u2026";
              setTimeout(function () {
                mobBtn.textContent = "\u2713 Paid";
                mobBtn.style.background = "#059669";
                mobBtn.style.opacity = "1";
                setTimeout(runMobAnim, 2500);
              }, 1500);
            });
          }, 600);
        } else {
          /* Apple Pay — show dedicated Apple Pay button */
          mobForm.innerHTML = '<div class="pbrd-ec-mob-applepay-btn" id="pbrd-mob-apple-btn">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M17.72 7.54c-.48.56-1.27.99-2.04.93-.1-.77.28-1.59.72-2.1.48-.55 1.33-.96 2.02-.99.08.8-.23 1.59-.7 2.16zm.7 1.11c-1.13-.07-2.1.64-2.63.64-.54 0-1.35-.61-2.24-.59-1.15.02-2.22.67-2.81 1.7-1.2 2.08-.31 5.16.85 6.85.57.83 1.25 1.76 2.15 1.73.86-.04 1.18-.56 2.22-.56 1.04 0 1.33.56 2.23.54.93-.02 1.51-.84 2.08-1.68.65-.96.92-1.89.93-1.94-.02-.01-1.79-.69-1.81-2.73-.02-1.7 1.39-2.52 1.46-2.56-.8-1.18-2.04-1.31-2.48-1.34l.05-.06z"/></svg>' +
            ' Pay' +
          '</div>';
          mobForm.style.display = "";
          mobBtn.style.display = "none";
          setTimeout(function () {
            var appleBtn = document.getElementById("pbrd-mob-apple-btn");
            if (appleBtn) {
              appleBtn.style.opacity = "0.7";
              appleBtn.innerHTML = 'Processing\u2026';
            }
            setTimeout(function () {
              if (appleBtn) {
                appleBtn.innerHTML = '\u2713 Paid';
                appleBtn.style.background = "#059669";
                appleBtn.style.opacity = "1";
              }
              setTimeout(function () {
                mobBtn.style.display = "";
                runMobAnim();
              }, 2500);
            }, 1200);
          }, 1500);
        }
      }

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            runMobAnim();
            this.disconnect();
          }
        }, { threshold: 0.3 }).observe(mobChk);
      }
    }

    /* ─── Components card animation ─── */
    var compVis = document.getElementById("pbrd-ec-comp-vis");
    if (compVis) {
      var compPills = document.getElementById("pbrd-comp-pills");
      var compInput = document.getElementById("pbrd-comp-input");
      var compLabel = document.getElementById("pbrd-comp-field-label");
      var compSubmit = document.getElementById("pbrd-comp-submit");

      var compMethods = [
        { pill: 0, label: "Card Input", value: "4821 3829 \u2022\u2022\u2022\u2022 7392", btn: "Pay now" },
        { pill: 1, label: "Phone Number", value: "+351 912 345 678", btn: "Confirm with MBWay" },
        { pill: 2, label: "Email Address", value: "ana@ferreira.pt", btn: "Continue to PayPal" }
      ];
      var compIdx = 0;

      function runCompAnim() {
        var m = compMethods[compIdx % compMethods.length];
        compIdx++;

        /* Switch pill */
        var pills = compPills.querySelectorAll(".pbrd-ec-chk-comp-pill");
        pills.forEach(function (p) { p.classList.remove("active"); });
        if (pills[m.pill]) pills[m.pill].classList.add("active");

        /* Update label */
        compLabel.textContent = m.label;
        compInput.textContent = "";
        compSubmit.textContent = m.btn;
        compSubmit.style.background = "";
        compSubmit.style.color = "";

        /* Type value */
        setTimeout(function () {
          typeText(compInput, m.value, 500, function () {
            /* Submit */
            compSubmit.style.opacity = "0.7";
            compSubmit.textContent = "Processing\u2026";
            setTimeout(function () {
              compSubmit.textContent = "\u2713 Success";
              compSubmit.style.background = "#059669";
              compSubmit.style.color = "#fff";
              compSubmit.style.opacity = "1";
              setTimeout(runCompAnim, 2500);
            }, 1400);
          });
        }, 600);
      }

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            runCompAnim();
            this.disconnect();
          }
        }, { threshold: 0.3 }).observe(compVis);
      }
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 8: Expanded Testimonials           */
  /* ═══════════════════════════════════════════ */

  function buildTestimonials() {
    var CUST = BASE + "customers/";
    var testimonials = [
      {
        quote: "Paybyrd gave us what no other provider could \u2014 a single integration handling 20+ payment methods across 90 markets, with approval rates that recovered millions in revenue we were leaving on the table.",
        name: "Jo\u00E3o Frias",
        title: "Head of Payments",
        company: "TAP Air Portugal",
        tags: "#payments #aviation #global #20markets #revenuerecovery",
        logo: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg",
        video: CUST + "tap.mp4",
        poster: CUST + "tap-poster.jpg"
      },
      {
        quote: "Cart abandonment was our biggest leak. After implementing Paybyrd\u2019s checkout with Klarna and local methods like MBWay, we saw conversion jump meaningfully. The right payment method at the right moment changes everything.",
        name: "Rita Faria",
        title: "CEO",
        company: "KuantoKusta",
        tags: "#ecommerce #conversion #BNPL #checkout #MBWay",
        logo: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg",
        video: CUST + "kuantokusta.mp4",
        poster: CUST + "kuantokusta-poster.jpg"
      },
      {
        quote: "700+ routes, thousands of daily ticket purchases \u2014 and every single one needs to clear instantly. Paybyrd gave us the speed and reliability our passengers expect, with zero downtime during peak booking windows.",
        name: "Nelson Silva",
        title: "General Manager & IT Director",
        company: "Rede Expressos",
        tags: "#transport #ticketing #reliability #700routes #zerdowntime",
        logo: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png",
        video: CUST + "redeexpressos.mp4",
        poster: CUST + "redeexpressos-poster.jpg"
      }
    ];

    var existingTestimonial = findSectionByHeading("drop-off") || findSectionByHeading("testimonial");

    var section = document.createElement("section");
    section.className = "pbrd-ec-testimonials";

    var cardsHTML = testimonials.map(function (t, idx) {
      return '<div class="pbrd-ec-tvcard pbrd-ec-reveal" data-tv-idx="' + idx + '">' +
        /* IG header: avatar + name */
        '<div class="pbrd-ec-tv-ig-header">' +
          '<img src="' + t.logo + '" alt="' + t.company + '" class="pbrd-ec-tv-logo">' +
          '<div class="pbrd-ec-tv-ig-meta">' +
            '<div class="pbrd-ec-tv-name">' + t.name + '</div>' +
            '<div class="pbrd-ec-tv-title">' + t.title + ' \u2022 ' + t.company + '</div>' +
          '</div>' +
        '</div>' +
        /* Video area — autoplay */
        '<div class="pbrd-ec-tv-visual">' +
          '<video class="pbrd-ec-tv-vid" loop playsinline muted preload="none" poster="' + t.poster + '">' +
            '<source src="' + t.video + '" type="video/mp4">' +
          '</video>' +
        '</div>' +
        /* Caption area below */
        '<div class="pbrd-ec-tv-caption">' +
          '<div class="pbrd-ec-tv-quote"><strong>' + t.name.split(" ")[0].toLowerCase() + '</strong> \u201C' + t.quote + '\u201D</div>' +
          '<div class="pbrd-ec-tv-tags">' + t.tags + '</div>' +
        '</div>' +
      '</div>';
    }).join("");

    section.innerHTML =
      '<div class="pbrd-ec-testimonials-inner">' +
        '<div class="pbrd-ec-testimonials-header">' +
          '<h2>What merchants say.</h2>' +
          '<p>Don\u2019t take our word for it.</p>' +
        '</div>' +
        '<div class="pbrd-ec-tv-grid">' + cardsHTML + '</div>' +
      '</div>';

    if (existingTestimonial) {
      existingTestimonial.replaceWith(section);
    } else {
      var faq = findSectionByHeading("frequently asked");
      if (faq) faq.insertAdjacentElement("beforebegin", section);
    }

    observeReveal(".pbrd-ec-reveal", 150, section);

    /* ── Instagram-style lightbox modal ── */
    var modal = document.createElement("div");
    modal.className = "pbrd-ec-tv-modal";
    modal.innerHTML =
      '<div class="pbrd-ec-tv-modal-backdrop"></div>' +
      '<div class="pbrd-ec-tv-modal-content">' +
        '<div class="pbrd-ec-tv-modal-close">\u2715</div>' +
        /* Video side */
        '<div class="pbrd-ec-tv-modal-video">' +
          '<video id="pbrd-tv-modal-vid" playsinline loop preload="none"></video>' +
        '</div>' +
        /* IG right panel */
        '<div class="pbrd-ec-tv-modal-card">' +
          /* IG header */
          '<div class="pbrd-ec-tv-modal-ig-header">' +
            '<img id="pbrd-tv-modal-logo" alt="" class="pbrd-ec-tv-modal-avatar">' +
            '<div class="pbrd-ec-tv-modal-ig-meta">' +
              '<div id="pbrd-tv-modal-name" class="pbrd-ec-tv-modal-ig-name"></div>' +
              '<div id="pbrd-tv-modal-title" class="pbrd-ec-tv-modal-ig-title"></div>' +
            '</div>' +
          '</div>' +
          /* Caption */
          '<div class="pbrd-ec-tv-modal-caption">' +
            '<div class="pbrd-ec-tv-modal-quote" id="pbrd-tv-modal-quote"></div>' +
            '<div class="pbrd-ec-tv-modal-tags" id="pbrd-tv-modal-tags"></div>' +
          '</div>' +
          /* Bottom stats */
          '<div class="pbrd-ec-tv-modal-bottom">' +
            '<div class="pbrd-ec-tv-modal-stat" id="pbrd-tv-modal-stat"></div>' +
            '<div class="pbrd-ec-tv-modal-powered">Powered by <strong>Paybyrd</strong></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var modalVid = document.getElementById("pbrd-tv-modal-vid");

    function openModal(idx) {
      var t = testimonials[idx];
      modalVid.src = t.video;
      modalVid.poster = t.poster;
      document.getElementById("pbrd-tv-modal-logo").src = t.logo;
      document.getElementById("pbrd-tv-modal-name").textContent = t.name;
      document.getElementById("pbrd-tv-modal-title").textContent = t.title + " \u2022 " + t.company;
      document.getElementById("pbrd-tv-modal-quote").innerHTML = '<strong>' + t.name.split(" ")[0].toLowerCase() + '</strong> \u201C' + t.quote + '\u201D';
      document.getElementById("pbrd-tv-modal-tags").textContent = t.tags;
      document.getElementById("pbrd-tv-modal-stat").textContent = t.stat;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      modalVid.play().catch(function () {});
    }

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      modalVid.pause();
      modalVid.src = "";
    }

    modal.querySelector(".pbrd-ec-tv-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".pbrd-ec-tv-modal-backdrop").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
    });

    /* Click card to open modal */
    section.querySelectorAll(".pbrd-ec-tvcard").forEach(function (card) {
      card.addEventListener("click", function () {
        var idx = parseInt(card.getAttribute("data-tv-idx"), 10);
        openModal(idx);
      });
    });

    /* Autoplay card videos when visible */
    if ("IntersectionObserver" in window) {
      section.querySelectorAll(".pbrd-ec-tv-vid").forEach(function (vid) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            vid.play().catch(function () {});
          } else {
            vid.pause();
          }
        }, { threshold: 0.3 }).observe(vid);
      });
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 9: AI Support Enhancement         */
  /* ═══════════════════════════════════════════ */

  function enhanceAI() {
    var section = findSectionByHeading("let ai support");
    if (!section) return;

    var container = section.querySelector(".u-container, [class*='container']") || section;
    var children = container.children;
    for (var c = 0; c < children.length; c++) children[c].style.display = "none";

    var aiWrap = document.createElement("div");
    aiWrap.className = "pbrd-ec-ai-wrap";

    /* ── Chat scenarios ── */
    var chatScenarios = [
      { user: "I\u2019d like a refund for order #ORD-29471", lookup: "Let me look that up\u2026", oid: "#ORD-29471", amt: "\u20AC89.00", stat: "Delivered", offer: "Found it \u2014 delivered April 8. Want me to process the refund?", action: "Process Refund", success: "Refund of \u20AC89.00 processed. You\u2019ll see it in 3\u20135 business days.", newStat: "Refunded" },
      { user: "Where is my order #ORD-31205?", lookup: "Checking tracking now\u2026", oid: "#ORD-31205", amt: "\u20AC245.50", stat: "In Transit", offer: "Shipped via DHL. Currently in Amsterdam. ETA: April 14.", action: "Get Tracking Link", success: "Tracking link sent to your email.", newStat: "Tracked" },
      { user: "Change payment to PayPal for #ORD-30882", lookup: "Let me check\u2026", oid: "#ORD-30882", amt: "\u20AC156.00", stat: "Pending", offer: "This order hasn\u2019t been charged. I can switch to PayPal.", action: "Switch to PayPal", success: "Payment updated to PayPal. Confirmation email sent.", newStat: "Updated" }
    ];

    /* ── Search scenarios ── */
    var searchScenarios = [
      { query: "refunds over EUR 100 last week", hint: "Showing 4 refunds > \u20AC100, Apr 5\u201312", results: [
        { s: "refund", n: "Ana Ferreira", a: "\u20AC245.50", m: "Visa \u2022\u20224821", t: "Apr 11" },
        { s: "refund", n: "Lukas Weber", a: "\u20AC189.00", m: "PayPal", t: "Apr 10" },
        { s: "refund", n: "Sophie van Dijk", a: "\u20AC127.30", m: "iDEAL", t: "Apr 8" },
        { s: "refund", n: "Carlos Mendes", a: "\u20AC312.00", m: "Multibanco", t: "Apr 6" }
      ], detail: { id: "TXN-847291", a: "\u20AC245.50", cust: "Ana Ferreira", meth: "Visa \u2022\u20224821", stat: "Refunded", date: "April 11, 2026" } },
      { query: "failed payments today Klarna", hint: "2 failed Klarna transactions found today", results: [
        { s: "failed", n: "Emma Schmidt", a: "\u20AC67.90", m: "Klarna", t: "14:32" },
        { s: "failed", n: "Faisal Al-Lawr", a: "\u20AC156.00", m: "Klarna", t: "11:07" },
        { s: "paid", n: "Marta Silva", a: "\u20AC42.00", m: "Klarna", t: "09:45" },
        { s: "paid", n: "Jan de Vries", a: "\u20AC89.00", m: "Klarna", t: "08:21" }
      ], detail: { id: "TXN-847305", a: "\u20AC67.90", cust: "Emma Schmidt", meth: "Klarna", stat: "Failed", date: "April 12, 2026" } },
      { query: "top customers by volume this month", hint: "Ranked by total volume, April 2026", results: [
        { s: "paid", n: "Vila Gal\u00E9 Hotels", a: "\u20AC12,450", m: "Multi-method", t: "47 txns" },
        { s: "paid", n: "Porto Digital", a: "\u20AC8,320", m: "Multi-method", t: "31 txns" },
        { s: "paid", n: "Worten Online", a: "\u20AC6,180", m: "Multi-method", t: "28 txns" },
        { s: "paid", n: "Fnac Portugal", a: "\u20AC4,970", m: "Multi-method", t: "19 txns" }
      ], detail: { id: "CUST-00412", a: "\u20AC12,450", cust: "Vila Gal\u00E9 Hotels", meth: "Visa, PayPal, MBWay", stat: "Active", date: "Since Mar 2024" } }
    ];

    /* Build result rows HTML */
    var resultRowsHTML = "";
    for (var ri = 0; ri < 4; ri++) {
      resultRowsHTML +=
        '<div class="pbrd-ec-ai-result" id="pbrd-ai-r' + ri + '">' +
          '<span class="pbrd-ec-ai-r-dot" id="pbrd-ai-rs' + ri + '"></span>' +
          '<span class="pbrd-ec-ai-r-name" id="pbrd-ai-rn' + ri + '"></span>' +
          '<span class="pbrd-ec-ai-r-amt" id="pbrd-ai-ra' + ri + '"></span>' +
          '<span class="pbrd-ec-ai-r-meth" id="pbrd-ai-rm' + ri + '"></span>' +
          '<span class="pbrd-ec-ai-r-time" id="pbrd-ai-rt' + ri + '"></span>' +
        '</div>';
    }

    aiWrap.innerHTML =
      /* Header */
      '<div class="pbrd-ec-ai-header">' +
        '<h2>AI that turns support tickets into revenue</h2>' +
        '<p>Every refund request is a retention opportunity. Every search is buying intent. Paybyrd\u2019s AI handles both \u2014 instantly, 24/7, in 30+ languages.</p>' +
      '</div>' +

      '<div class="pbrd-ec-ai-grid">' +

        /* ── Card 1: Chat ── */
        '<div class="pbrd-ec-ai-card pbrd-ec-ai-dark pbrd-ec-reveal">' +
          '<div class="pbrd-ec-ai-visual">' +
            '<div class="pbrd-ec-ai-chat" id="pbrd-ai-chat">' +
              '<div class="pbrd-ec-ai-chat-head">' +
                '<div class="pbrd-ec-ai-chat-avatar">P</div>' +
                '<div><div class="pbrd-ec-ai-chat-name">Paybyrd Assistant</div>' +
                '<div class="pbrd-ec-ai-chat-status"><span class="pbrd-ec-ai-dot-live"></span>Online</div></div>' +
              '</div>' +
              '<div class="pbrd-ec-ai-chat-body">' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m0"><span>Hi! How can I help you today?</span></div>' +
                '<div class="pbrd-ec-ai-msg user" id="pbrd-ai-m1"><span id="pbrd-ai-m1t"></span></div>' +
                '<div class="pbrd-ec-ai-typing" id="pbrd-ai-typing"><span></span><span></span><span></span></div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m2"><span id="pbrd-ai-m2t"></span></div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m3">' +
                  '<div class="pbrd-ec-ai-order">' +
                    '<div class="pbrd-ec-ai-order-row"><span>Order</span><span id="pbrd-ai-oid"></span></div>' +
                    '<div class="pbrd-ec-ai-order-row"><span>Amount</span><span id="pbrd-ai-oamt"></span></div>' +
                    '<div class="pbrd-ec-ai-order-row"><span>Status</span><span id="pbrd-ai-ostat"></span></div>' +
                  '</div>' +
                '</div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m4"><span id="pbrd-ai-m4t"></span></div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m5"><div class="pbrd-ec-ai-action" id="pbrd-ai-act"></div></div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m6"><span class="pbrd-ec-ai-success-icon">' + checkSVG + '</span><span id="pbrd-ai-m6t"></span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-ai-body">' +
            '<h3>Conversational AI that resolves, not deflects</h3>' +
            '<p>Your AI assistant pulls live order data, processes refunds, and updates shipping \u2014 no agent needed. Handles 73% of tickets automatically.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Processes refunds and cancellations in real time</li>' +
              '<li>' + checkSVG + 'Pulls live order, payment, and shipping data</li>' +
              '<li>' + checkSVG + 'Escalates complex cases with full context</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

        /* ── Card 2: Search ── */
        '<div class="pbrd-ec-ai-card pbrd-ec-ai-light pbrd-ec-reveal">' +
          '<div class="pbrd-ec-ai-visual">' +
            '<div class="pbrd-ec-ai-search" id="pbrd-ai-search">' +
              '<div class="pbrd-ec-ai-search-bar">' +
                '<svg viewBox="0 0 16 16" fill="none" width="14" height="14"><circle cx="7" cy="7" r="5" stroke="#9CA3AF" stroke-width="1.5"/><path d="M11 11l3 3" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg>' +
                '<span id="pbrd-ai-sq"></span><span class="pbrd-ec-ai-cursor">|</span>' +
              '</div>' +
              '<div class="pbrd-ec-ai-hint" id="pbrd-ai-hint"></div>' +
              '<div class="pbrd-ec-ai-results">' + resultRowsHTML + '</div>' +
              '<div class="pbrd-ec-ai-detail" id="pbrd-ai-detail">' +
                '<div class="pbrd-ec-ai-detail-head"><strong id="pbrd-ai-dt"></strong></div>' +
                '<div class="pbrd-ec-ai-detail-rows">' +
                  '<div class="pbrd-ec-ai-detail-row"><span>ID</span><span id="pbrd-ai-did"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Amount</span><span id="pbrd-ai-da"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Customer</span><span id="pbrd-ai-dc"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Method</span><span id="pbrd-ai-dm"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Status</span><span id="pbrd-ai-ds"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Date</span><span id="pbrd-ai-dd"></span></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-ai-body">' +
            '<h3>Find any transaction in seconds</h3>' +
            '<p>Natural language search across millions of transactions. Ask \u201Crefunds over \u20AC100 last week\u201D and get instant results \u2014 no filters, no dropdowns.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Natural language \u2014 search like you think</li>' +
              '<li>' + checkSVG + 'Cross-references orders, customers, and payments</li>' +
              '<li>' + checkSVG + 'Instant drill-down with one-click actions</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

      '</div>';

    container.appendChild(aiWrap);
    section.style.background = "#fff";
    observeReveal(".pbrd-ec-reveal", 150, aiWrap);

    /* ── Chat animation ── */
    var chatIdx = 0;
    var msgs = ["pbrd-ai-m0","pbrd-ai-m1","pbrd-ai-m2","pbrd-ai-m3","pbrd-ai-m4","pbrd-ai-m5","pbrd-ai-m6"];

    function hideAllMsgs() {
      msgs.forEach(function (id) { var el = document.getElementById(id); if (el) el.style.opacity = "0"; });
      var typing = document.getElementById("pbrd-ai-typing");
      if (typing) typing.style.display = "none";
    }

    function showMsg(id) {
      var el = document.getElementById(id);
      if (el) el.style.opacity = "1";
    }

    function runChatAnim() {
      var s = chatScenarios[chatIdx % chatScenarios.length];
      chatIdx++;
      hideAllMsgs();

      var m1t = document.getElementById("pbrd-ai-m1t");
      var m2t = document.getElementById("pbrd-ai-m2t");
      var m4t = document.getElementById("pbrd-ai-m4t");
      var m6t = document.getElementById("pbrd-ai-m6t");
      var oid = document.getElementById("pbrd-ai-oid");
      var oamt = document.getElementById("pbrd-ai-oamt");
      var ostat = document.getElementById("pbrd-ai-ostat");
      var act = document.getElementById("pbrd-ai-act");
      var typing = document.getElementById("pbrd-ai-typing");
      if (m1t) m1t.textContent = "";
      if (m2t) m2t.textContent = "";
      if (m4t) m4t.textContent = "";
      if (m6t) m6t.textContent = "";

      var t = 0;
      /* Step 1: Show greeting */
      t += 600;
      setTimeout(function () { showMsg("pbrd-ai-m0"); }, t);

      /* Step 2: Show user msg bubble and type */
      t += 800;
      setTimeout(function () {
        showMsg("pbrd-ai-m1");
        if (m1t) typeText(m1t, s.user, 0, function () {
          /* Step 3: Typing dots */
          if (typing) { typing.style.display = "flex"; typing.style.opacity = "1"; }
          setTimeout(function () {
            if (typing) typing.style.display = "none";
            /* Step 4: Bot lookup */
            if (m2t) m2t.textContent = s.lookup;
            showMsg("pbrd-ai-m2");
            /* Step 5: Order card */
            setTimeout(function () {
              if (oid) oid.textContent = s.oid;
              if (oamt) oamt.textContent = s.amt;
              if (ostat) { ostat.textContent = s.stat; ostat.style.color = ""; }
              showMsg("pbrd-ai-m3");
              /* Step 6: Bot offer */
              setTimeout(function () {
                if (m4t) m4t.textContent = s.offer;
                showMsg("pbrd-ai-m4");
                /* Step 7: Action button */
                setTimeout(function () {
                  if (act) act.innerHTML = '<div class="pbrd-ec-ai-act-btn">' + s.action + '</div>';
                  showMsg("pbrd-ai-m5");
                  /* Step 8: Click button */
                  setTimeout(function () {
                    var btn = act ? act.querySelector(".pbrd-ec-ai-act-btn") : null;
                    if (btn) btn.style.background = "#059669";
                    /* Step 9: Success */
                    setTimeout(function () {
                      if (m6t) m6t.textContent = s.success;
                      if (ostat) { ostat.textContent = s.newStat; ostat.style.color = "#059669"; }
                      showMsg("pbrd-ai-m6");
                      setTimeout(runChatAnim, 3000);
                    }, 800);
                  }, 1500);
                }, 700);
              }, 800);
            }, 700);
          }, 1200);
        });
      }, t);
    }

    /* ── Search animation ── */
    var srchIdx = 0;

    function runSearchAnim() {
      var s = searchScenarios[srchIdx % searchScenarios.length];
      srchIdx++;

      var sq = document.getElementById("pbrd-ai-sq");
      var hint = document.getElementById("pbrd-ai-hint");
      var detail = document.getElementById("pbrd-ai-detail");
      if (sq) sq.textContent = "";
      if (hint) { hint.textContent = ""; hint.style.opacity = "0"; }
      if (detail) detail.style.opacity = "0";
      for (var i = 0; i < 4; i++) {
        var row = document.getElementById("pbrd-ai-r" + i);
        if (row) { row.style.opacity = "0"; row.classList.remove("active"); }
      }

      /* Type query */
      setTimeout(function () {
        typeText(sq, s.query, 400, function () {
          /* Show hint */
          if (hint) { hint.textContent = "AI: " + s.hint; hint.style.opacity = "1"; }
          /* Show results staggered */
          var rDelay = 300;
          s.results.forEach(function (r, idx) {
            setTimeout(function () {
              var row = document.getElementById("pbrd-ai-r" + idx);
              var dot = document.getElementById("pbrd-ai-rs" + idx);
              var rn = document.getElementById("pbrd-ai-rn" + idx);
              var ra = document.getElementById("pbrd-ai-ra" + idx);
              var rm = document.getElementById("pbrd-ai-rm" + idx);
              var rt = document.getElementById("pbrd-ai-rt" + idx);
              if (dot) { dot.className = "pbrd-ec-ai-r-dot " + r.s; }
              if (rn) rn.textContent = r.n;
              if (ra) ra.textContent = r.a;
              if (rm) rm.textContent = r.m;
              if (rt) rt.textContent = r.t;
              if (row) row.style.opacity = "1";
            }, rDelay * (idx + 1));
          });

          /* "Click" first result */
          setTimeout(function () {
            var firstRow = document.getElementById("pbrd-ai-r0");
            if (firstRow) firstRow.classList.add("active");
            /* Show detail */
            setTimeout(function () {
              var dt = document.getElementById("pbrd-ai-dt");
              var did = document.getElementById("pbrd-ai-did");
              var da = document.getElementById("pbrd-ai-da");
              var dc = document.getElementById("pbrd-ai-dc");
              var dm = document.getElementById("pbrd-ai-dm");
              var ds = document.getElementById("pbrd-ai-ds");
              var dd = document.getElementById("pbrd-ai-dd");
              if (dt) dt.textContent = s.detail.cust;
              if (did) did.textContent = s.detail.id;
              if (da) da.textContent = s.detail.a;
              if (dc) dc.textContent = s.detail.cust;
              if (dm) dm.textContent = s.detail.meth;
              if (ds) { ds.textContent = s.detail.stat; ds.className = "pbrd-ec-ai-r-dot " + (s.detail.stat === "Refunded" || s.detail.stat === "Failed" ? (s.detail.stat === "Failed" ? "failed" : "refund") : "paid"); }
              if (dd) dd.textContent = s.detail.date;
              if (detail) detail.style.opacity = "1";
              /* Wait then restart */
              setTimeout(runSearchAnim, 3500);
            }, 500);
          }, 2000);
        });
      }, 500);
    }

    /* ── Trigger on scroll ── */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          runChatAnim();
          runSearchAnim();
          this.disconnect();
        }
      }, { threshold: 0.15 }).observe(aiWrap);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 10: CTA Enhancement               */
  /* ═══════════════════════════════════════════ */

  /* ═══════════════════════════════════════════ */
  /* Section 10: FAQ Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceFAQ() {
    var section = findSectionByHeading("frequently asked");
    if (!section) return;

    var container = section.querySelector(".u-container, [class*='container']") || section;
    var children = container.children;
    for (var c = 0; c < children.length; c++) children[c].style.display = "none";

    var faqs = [
      {
        cat: "Integration",
        q: "Can I keep my current e-commerce stack?",
        a: "Absolutely. Paybyrd plugs directly into Magento, WooCommerce, PrestaShop and any custom stack via a single API. Most merchants go live in under 4 hours \u2014 no re-platforming, no retraining your team, no disruption to your existing workflows."
      },
      {
        cat: "Integration",
        q: "What payment methods do you support?",
        a: "Over 40 local and global methods \u2014 Visa, Mastercard, Apple Pay, Google Pay, Klarna, iDEAL, Sofort, MBWay, Pix, Boleto, OXXO and more. Paybyrd automatically surfaces the right methods per market so your customers always see a familiar checkout."
      },
      {
        cat: "Performance",
        q: "How do you improve my approval rates?",
        a: "Multi-acquirer routing sends each transaction to the acquirer most likely to approve it. Local acquiring means cards are processed in-country, not cross-border. The result: 4\u20137% higher authorization rates and 10\u201315% lower cross-border fees. We consistently outperform Adyen, Checkout.com and Nuvei in head-to-head comparisons."
      },
      {
        cat: "Performance",
        q: "How does Paybyrd reduce fraud and chargebacks?",
        a: "AI-powered screening with velocity checks, shared risk databases, and airtight 3D Secure flows catch fraud before it happens. Our merchants see up to a 16.8% reduction in chargebacks \u2014 meaning less revenue lost and lower processor risk fees."
      },
      {
        cat: "Performance",
        q: "Will Paybyrd help reduce my cart abandonment?",
        a: "Yes. The #1 cause of checkout abandonment is friction. Paybyrd provides embedded checkout forms, one-click payments, digital wallets and mobile-first flows that remove every unnecessary step. Faster checkout = higher conversion."
      },
      {
        cat: "Operations",
        q: "How do refunds work?",
        a: "Instant. With direct acquirer connectivity, refunds process immediately across most European issuers. Customers get an ARN reference as proof on the spot \u2014 fewer support tickets, fewer disputes, higher trust."
      },
      {
        cat: "Operations",
        q: "Can I reconcile all my channels in one place?",
        a: "Yes. Paybyrd\u2019s AI-powered dashboards unify reconciliation across D2C, marketplaces, BNPL and POS. Drill down by channel, SKU, market, or even shift. Gross settlement means predictable payouts \u2014 no more guessing what the fees were."
      },
      {
        cat: "Security",
        q: "How do you handle PCI compliance?",
        a: "Paybyrd\u2019s tokenized vault and modular APIs drastically reduce your PCI scope. Your checkout stays PCI-compliant without your team maintaining payment connections, sensitive card data, or regulatory burden. We handle PSD2, SCA, and GDPR so you don\u2019t have to."
      },
      {
        cat: "Growth",
        q: "Can I expand internationally without payment expertise?",
        a: "That\u2019s exactly what Paybyrd is built for. We process in 192+ currencies with local acquiring in key markets. Our building-block architecture means you can launch in a new country with the right payment methods, compliance and routing \u2014 all from the same API."
      },
      {
        cat: "Growth",
        q: "What makes Paybyrd different from Adyen or Stripe?",
        a: "We\u2019re not trying to be the biggest \u2014 we\u2019re built to be the best for merchants who need more than a generic solution. Premier partner approach: dedicated support, tailored routing strategies, and modular tech that adapts to your business. Our approval rates consistently beat the large processors by 1.7\u20134.9%."
      }
    ];

    var categories = ["All", "Integration", "Performance", "Operations", "Security", "Growth"];

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ec-faq-wrap";

    /* Header */
    var header = '<div class="pbrd-ec-faq-header">' +
      '<div class="pbrd-oc-journey-label" style="color:rgba(120,255,180,0.7)">FAQ</div>' +
      '<h2>Everything you need to know</h2>' +
      '<p>Get answers to the questions merchants ask most before switching to Paybyrd.</p>' +
    '</div>';

    /* Category filters */
    var filters = '<div class="pbrd-ec-faq-filters">';
    for (var f = 0; f < categories.length; f++) {
      filters += '<button class="pbrd-ec-faq-filter' + (f === 0 ? ' pbrd-ec-faq-filter--active' : '') + '" data-cat="' + categories[f] + '">' + categories[f] + '</button>';
    }
    filters += '</div>';

    /* FAQ items */
    var items = '<div class="pbrd-ec-faq-list">';
    for (var i = 0; i < faqs.length; i++) {
      var faq = faqs[i];
      items += '<div class="pbrd-ec-faq-item pbrd-ec-faq-reveal" data-cat="' + faq.cat + '">' +
        '<button class="pbrd-ec-faq-q">' +
          '<div class="pbrd-ec-faq-q-left">' +
            '<span class="pbrd-ec-faq-cat-dot pbrd-ec-faq-cat--' + faq.cat.toLowerCase() + '"></span>' +
            '<span>' + faq.q + '</span>' +
          '</div>' +
          '<svg class="pbrd-ec-faq-chevron" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
        '<div class="pbrd-ec-faq-a"><p>' + faq.a + '</p></div>' +
      '</div>';
    }
    items += '</div>';

    wrap.innerHTML = header + filters + items;
    container.appendChild(wrap);

    /* ── Accordion behaviour ── */
    var allItems = wrap.querySelectorAll(".pbrd-ec-faq-item");
    wrap.querySelectorAll(".pbrd-ec-faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var isOpen = item.classList.contains("pbrd-ec-faq-item--open");
        /* Close all */
        allItems.forEach(function (it) { it.classList.remove("pbrd-ec-faq-item--open"); });
        /* Toggle clicked */
        if (!isOpen) item.classList.add("pbrd-ec-faq-item--open");
      });
    });

    /* ── Category filter behaviour ── */
    var filterBtns = wrap.querySelectorAll(".pbrd-ec-faq-filter");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("pbrd-ec-faq-filter--active"); });
        btn.classList.add("pbrd-ec-faq-filter--active");
        var cat = btn.getAttribute("data-cat");
        allItems.forEach(function (item) {
          if (cat === "All" || item.getAttribute("data-cat") === cat) {
            item.style.display = "";
          } else {
            item.style.display = "none";
            item.classList.remove("pbrd-ec-faq-item--open");
          }
        });
      });
    });

    /* Auto-open first item */
    if (allItems.length) allItems[0].classList.add("pbrd-ec-faq-item--open");

    /* Scroll-reveal stagger */
    observeReveal(".pbrd-ec-faq-reveal", 80, wrap);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 11: CTA Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceCTA() {
    /* Find existing CTA banner */
    var ctaSection = findSectionByHeading("cut abandonment") || findSectionByHeading("boost conversions");
    if (!ctaSection) return;

    /* White space around CTA — island effect */
    ctaSection.style.background = "#fff";
    ctaSection.style.padding = "48px 24px";

    /* Replace its content */
    var container = ctaSection.querySelector(".u-container, [class*='container']") || ctaSection;

    /* Hide existing content */
    var children = container.children;
    for (var i = 0; i < children.length; i++) {
      children[i].style.display = "none";
    }

    var cta = document.createElement("div");
    cta.className = "pbrd-ec-cta";
    cta.innerHTML =
      '<div class="pbrd-oc-journey-label" style="color:rgba(120,255,180,0.7)">Ready?</div>' +
      '<h2>Your checkout is costing you customers.<br>Let\u2019s fix that.</h2>' +
      '<p>Book a 15-minute call. We\u2019ll show you exactly where your checkout loses conversions \u2014 and how to recover them. No pitch deck, just your data.</p>' +
      '<a href="/book-demo" class="pbrd-ec-cta-btn">Book a Free Demo \u2192</a>' +
      '<div style="margin-top:16px;margin-bottom:32px"><a href="/pricing" style="color:rgba(255,255,255,0.4);font-size:0.875rem;text-decoration:none">Or explore pricing first \u2192</a></div>' +
      '<div class="pbrd-ec-cta-proofs">' +
        '<div class="pbrd-ec-cta-proof">' + checkSVG + '<span>Free 15-min consultation</span></div>' +
        '<div class="pbrd-ec-cta-proof">' + checkSVG + '<span>Live in under 4 hours</span></div>' +
        '<div class="pbrd-ec-cta-proof">' + checkSVG + '<span>30-day money-back guarantee</span></div>' +
      '</div>';

    container.appendChild(cta);
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                       */
  /* ═══════════════════════════════════════════ */

  function init() {
    enhanceHero();
    buildLogos();
    enhanceProblem();
    enhanceBenefits();
    enhanceDataSection();
    enhanceIntegrations();
    enhanceJourney();
    buildTestimonials();
    enhanceAI();
    enhanceFAQ();
    enhanceCTA();
    console.log("[Paybyrd] E-commerce enhancements loaded");
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — POS Page Enhancements */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/pos")) return;

  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/pos/";
  var checkSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ─── Reusable scroll-reveal ─── */
  function observeReveal(selector, staggerMs, root) {
    var els = (root || document).querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("pbrd-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var idx = Array.prototype.indexOf.call(els, el);
          setTimeout(function () { el.classList.add("pbrd-visible"); }, idx * (staggerMs || 100));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    els.forEach(function (e) { observer.observe(e); });
  }

  /* ─── Helper: find section by heading text ─── */
  function findSectionByHeading(text) {
    var result = null;
    document.querySelectorAll("h1, h2, h3").forEach(function (h) {
      if (h.textContent.toLowerCase().includes(text.toLowerCase())) {
        result = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    return result;
  }

  /* ─── Helper: hide section children ─── */
  function hideChildren(container) {
    var children = container.children;
    for (var c = 0; c < children.length; c++) children[c].style.display = "none";
  }

  /* ─── Shared typing animation ─── */
  function typeText(el, text, delay, cb) {
    var i = 0;
    function tick() {
      if (i <= text.length) {
        el.textContent = text.substring(0, i);
        i++;
        setTimeout(tick, 50 + Math.random() * 30);
      } else if (cb) { setTimeout(cb, delay || 300); }
    }
    tick();
  }

  /* ═══════════════════════════════════════════ */
  /* Section 1: Hero                             */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var section = findSectionByHeading("evolve in-person");
    if (!section) return;

    section.style.background = "#000";
    var container = section.querySelector(".u-container, [class*='container']") || section;
    hideChildren(container);

    var wrap = document.createElement("div");
    wrap.className = "pbrd-pos-hero-wrap";

    /* Text column */
    var textCol = '<div class="pbrd-pos-hero-text">' +
      '<div class="pbrd-pos-kicker" id="pbrd-pos-kicker"></div>' +
      '<h1 id="pbrd-pos-h1">The terminal that thinks for itself.</h1>' +
      '<p class="pbrd-pos-hero-sub">Paybyrd pioneered Android-based payment terminals. Today, our smart POS ecosystem powers restaurants, retail, kiosks, and mobile businesses across Europe \u2014 with one platform, one dashboard, and zero compromise.</p>' +
      '<div class="pbrd-pos-stats">' +
        '<div class="pbrd-pos-stat" style="transition-delay:0.6s"><span class="pbrd-pos-stat-val">4</span><span class="pbrd-pos-stat-lbl">Models</span></div>' +
        '<div class="pbrd-pos-stat" style="transition-delay:0.7s"><span class="pbrd-pos-stat-val">100%</span><span class="pbrd-pos-stat-lbl">Android</span></div>' +
        '<div class="pbrd-pos-stat" style="transition-delay:0.8s"><span class="pbrd-pos-stat-val">A2A</span><span class="pbrd-pos-stat-lbl">App-to-App</span></div>' +
        '<div class="pbrd-pos-stat" style="transition-delay:0.9s"><span class="pbrd-pos-stat-val">Free</span><span class="pbrd-pos-stat-lbl">SIM Included</span></div>' +
      '</div>' +
      '<div class="pbrd-pos-ticker" id="pbrd-pos-ticker">' +
        '<span class="pbrd-pos-ticker-dot"></span>' +
        '<span class="pbrd-pos-ticker-amount">EUR 47.90</span>' +
        '<span class="pbrd-pos-ticker-method">Contactless</span>' +
      '</div>' +
    '</div>';

    /* Visual column */
    var visualCol = '<div class="pbrd-pos-hero-visual">' +
      '<video class="pbrd-pos-hero-video" id="pbrd-pos-hero-vid" autoplay muted loop playsinline preload="auto">' +
        '<source src="' + BASE + 'sunmi-v3-hero.mp4" type="video/mp4">' +
      '</video>' +
    '</div>';

    wrap.innerHTML = textCol + visualCol;
    container.appendChild(wrap);

    /* Animate in */
    setTimeout(function () {
      typeText(document.getElementById("pbrd-pos-kicker"), "THE FIRST PAYMENT PLATFORM ON ANDROID TERMINALS", 200, function () {
        var h1 = document.getElementById("pbrd-pos-h1");
        if (h1) h1.classList.add("pbrd-pos-in");
        /* Stats animate via CSS transition-delay */
        wrap.querySelectorAll(".pbrd-pos-stat").forEach(function (s) { s.classList.add("pbrd-pos-in"); });
        var vid = document.getElementById("pbrd-pos-hero-vid");
        if (vid) vid.classList.add("pbrd-pos-in");
        var ticker = document.getElementById("pbrd-pos-ticker");
        if (ticker) ticker.classList.add("pbrd-pos-in");
      });
    }, 300);

    /* Ticker cycling */
    var txns = [
      { amount: "EUR 47.90", method: "Contactless", loc: "Lisbon" },
      { amount: "EUR 128.50", method: "Chip & PIN", loc: "Amsterdam" },
      { amount: "EUR 23.00", method: "Apple Pay", loc: "Porto" },
      { amount: "EUR 89.99", method: "Google Pay", loc: "Berlin" },
      { amount: "EUR 312.00", method: "Visa", loc: "Madrid" },
      { amount: "EUR 15.50", method: "MBWay", loc: "Faro" }
    ];
    var txIdx = 0;
    setInterval(function () {
      txIdx = (txIdx + 1) % txns.length;
      var ticker = document.getElementById("pbrd-pos-ticker");
      if (!ticker) return;
      ticker.querySelector(".pbrd-pos-ticker-amount").textContent = txns[txIdx].amount;
      ticker.querySelector(".pbrd-pos-ticker-method").textContent = txns[txIdx].method;
    }, 2500);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 2: Terminal Lineup                  */
  /* ═══════════════════════════════════════════ */

  function buildLineup() {
    var section = findSectionByHeading("checkout counter") || findSectionByHeading("on mobile");
    if (!section) {
      /* Try finding the 3-card grid container */
      var cards = document.querySelectorAll("[data-large-columns='3']");
      if (cards.length) section = cards[0].closest("section") || cards[0].parentElement;
    }
    if (!section) return;

    section.style.background = "#fff";
    section.style.padding = "80px 0";
    var container = section.querySelector(".u-container, [class*='container']") || section;
    hideChildren(container);

    var terminals = [
      { name: "Paybyrd Rawhide", model: "PAX A920 Pro", video: "a920-video.mp4", poster: "a920-render.png", desc: "The all-rounder. Counter, table, delivery.", pills: ["Android 10", '5.5" HD', "4G + WiFi"] },
      { name: "Paybyrd Renegade", model: "PAX A77", video: "a77-video.mp4", poster: "a77-render.png", desc: "Compact powerhouse. Built for speed.", pills: ["Android 10", '5.5" HD', "Scanner"] },
      { name: "Paybyrd Maverick", model: "Sunmi V3", video: "sunmi-v3-video.mp4", poster: "sunmi-v3-render.png", desc: "Print receipts on the move.", pills: ["Android 12", "Printer", "NFC"] },
      { name: "Paybyrd Titan", model: "Sunmi T3 Pro", video: "titan-video.mp4", poster: "lineup-titan.png", desc: "Self-service desktop. Kiosk-ready.", pills: ["Android 12", '15.6" Touch', "IP65"] }
    ];

    var wrap = document.createElement("div");
    wrap.className = "pbrd-pos-lineup-wrap";

    var header = '<div class="pbrd-pos-lineup-header">' +
      '<div class="pbrd-pos-section-label">THE LINEUP</div>' +
      '<h2>Four terminals. Every scenario covered.</h2>' +
      '<p>From handheld mobility to desktop kiosks \u2014 choose the hardware that fits your business. All run the same Paybyrd platform.</p>' +
    '</div>';

    var grid = '<div class="pbrd-pos-lineup-grid">';
    for (var i = 0; i < terminals.length; i++) {
      var t = terminals[i];
      var pills = '';
      for (var p = 0; p < t.pills.length; p++) {
        pills += '<span class="pbrd-pos-tcard-pill">' + t.pills[p] + '</span>';
      }
      var media = t.video
        ? '<video autoplay muted loop playsinline preload="metadata" poster="' + BASE + t.poster + '" style="max-height:260px;width:auto;object-fit:contain"><source src="' + BASE + t.video + '" type="video/mp4"></video>'
        : '<img src="' + BASE + t.poster + '" alt="' + t.name + '" loading="lazy">';
      grid += '<div class="pbrd-pos-tcard pbrd-pos-reveal">' +
        '<div class="pbrd-pos-tcard-img">' + media + '</div>' +
        '<div class="pbrd-pos-tcard-body">' +
          '<div class="pbrd-pos-tcard-name">' + t.name + '</div>' +
          '<div class="pbrd-pos-tcard-model">' + t.model + '</div>' +
          '<p class="pbrd-pos-tcard-desc">' + t.desc + '</p>' +
          '<div class="pbrd-pos-tcard-pills">' + pills + '</div>' +
        '</div>' +
      '</div>';
    }
    grid += '</div>';

    wrap.innerHTML = header + grid;
    container.appendChild(wrap);
    observeReveal(".pbrd-pos-reveal", 150, wrap);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 3: Smart POS Platform               */
  /* ═══════════════════════════════════════════ */

  function enhancePlatform() {
    /* Find ALL sections with these headings and hide them */
    var found = [];
    document.querySelectorAll("h2, h3").forEach(function (h) {
      var txt = h.textContent.toLowerCase();
      if (txt.includes("smart pos") || txt.includes("versatile and adaptable") ||
          txt.includes("remote transaction") || txt.includes("achieve ideal") ||
          txt.includes("tokenisation") || txt.includes("customer insights")) {
        var sec = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
        if (sec && found.indexOf(sec) === -1) found.push(sec);
      }
    });

    /* Hide all found sections */
    found.forEach(function (s) { s.style.display = "none"; });

    /* Create new standalone section after the last hidden one */
    var anchor = found.length ? found[found.length - 1] : null;
    if (!anchor) { console.log("[Paybyrd] FAIL: enhancePlatform — no anchor found"); return; }

    var newSection = document.createElement("section");
    newSection.style.background = "#0a0a0f";
    newSection.style.padding = "80px 0";
    anchor.insertAdjacentElement("afterend", newSection);

    var appSVG = '<svg viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="M7 7h6M7 10h4M7 13h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
    var otaSVG = '<svg viewBox="0 0 20 20" fill="none"><path d="M10 2v8m0 0l-3-3m3 3l3-3M4 14v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var remoteSVG = '<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 17h6M10 13v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

    var wrap = document.createElement("div");
    wrap.className = "pbrd-pos-platform-wrap";

    /* ── Architecture diagram SVG ── */
    var architectureSVG =
      '<svg viewBox="0 0 440 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-pos-arch-svg">' +

        /* ── Central hub: Paybyrd SDK ── */
        '<rect x="160" y="140" width="120" height="60" rx="14" fill="rgba(99,25,240,0.12)" stroke="rgba(99,25,240,0.4)" stroke-width="1.5" class="pbrd-pos-arch-hub"/>' +
        '<text x="220" y="166" text-anchor="middle" fill="#6319f0" font-size="10" font-weight="700" font-family="system-ui">PAYBYRD SDK</text>' +
        '<text x="220" y="182" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="7" font-family="system-ui">Payment Engine</text>' +

        /* ── Top: Your POS App ── */
        '<rect x="170" y="20" width="100" height="44" rx="10" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" stroke-width="1"/>' +
        '<text x="220" y="40" text-anchor="middle" fill="rgba(59,130,246,0.9)" font-size="8" font-weight="600" font-family="system-ui">YOUR POS APP</text>' +
        '<text x="220" y="52" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="6" font-family="system-ui">Android Intent / JS SDK</text>' +
        /* Arrow down */
        '<line x1="220" y1="64" x2="220" y2="140" stroke="rgba(59,130,246,0.2)" stroke-width="1" stroke-dasharray="4 3"/>' +
        '<circle cx="220" cy="100" r="3" fill="rgba(59,130,246,0.6)" class="pbrd-pos-arch-dot pbrd-pos-arch-dot1"/>' +

        /* ── Left: Remote API (Cloud) ── */
        '<rect x="10" y="148" width="100" height="44" rx="10" fill="rgba(160,100,255,0.08)" stroke="rgba(160,100,255,0.25)" stroke-width="1"/>' +
        '<text x="60" y="167" text-anchor="middle" fill="rgba(160,100,255,0.8)" font-size="8" font-weight="600" font-family="system-ui">REMOTE API</text>' +
        '<text x="60" y="179" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="6" font-family="system-ui">Cloud \u2192 Any Terminal</text>' +
        /* Arrow right */
        '<line x1="110" y1="170" x2="160" y2="170" stroke="rgba(160,100,255,0.2)" stroke-width="1" stroke-dasharray="4 3"/>' +
        '<circle cx="135" cy="170" r="3" fill="rgba(160,100,255,0.6)" class="pbrd-pos-arch-dot pbrd-pos-arch-dot2"/>' +

        /* ── Right: Fleet Dashboard ── */
        '<rect x="330" y="148" width="100" height="44" rx="10" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.25)" stroke-width="1"/>' +
        '<text x="380" y="167" text-anchor="middle" fill="rgba(245,158,11,0.8)" font-size="8" font-weight="600" font-family="system-ui">DASHBOARD</text>' +
        '<text x="380" y="179" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="6" font-family="system-ui">OTA \u00b7 Config \u00b7 Monitor</text>' +
        /* Arrow left */
        '<line x1="330" y1="170" x2="280" y2="170" stroke="rgba(245,158,11,0.2)" stroke-width="1" stroke-dasharray="4 3"/>' +
        '<circle cx="305" cy="170" r="3" fill="rgba(245,158,11,0.6)" class="pbrd-pos-arch-dot pbrd-pos-arch-dot3"/>' +

        /* ── Bottom: Payment Methods fan ── */
        '<line x1="220" y1="200" x2="220" y2="240" stroke="rgba(99,25,240,0.15)" stroke-width="1"/>' +
        '<text x="220" y="258" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="7" font-weight="500" font-family="system-ui">PAYMENT METHODS</text>' +

        /* Method pills with mini icons */
        '<g transform="translate(45,270)">' +
          /* Card — credit card icon */
          '<rect x="0" y="0" width="56" height="26" rx="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m1"/>' +
          '<rect x="10" y="7" width="12" height="8" rx="1.5" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/><line x1="10" y1="11" x2="22" y2="11" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>' +
          '<text x="38" y="17" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" font-weight="600" font-family="system-ui">Card</text>' +

          /* MB WAY — phone icon */
          '<rect x="64" y="0" width="68" height="26" rx="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m2"/>' +
          '<rect x="74" y="6" width="8" height="13" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.7"/><circle cx="78" cy="16" r="1" fill="rgba(255,255,255,0.3)"/>' +
          '<text x="103" y="17" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" font-weight="600" font-family="system-ui">MB WAY</text>' +

          /* PayPal — P icon */
          '<rect x="140" y="0" width="60" height="26" rx="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m3"/>' +
          '<text x="154" y="18" fill="rgba(0,112,186,0.7)" font-size="11" font-weight="800" font-family="system-ui">P</text>' +
          '<text x="180" y="17" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" font-weight="600" font-family="system-ui">PayPal</text>' +

          /* Klarna — K badge */
          '<rect x="208" y="0" width="60" height="26" rx="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m4"/>' +
          '<circle cx="222" cy="13" r="6" fill="rgba(255,182,193,0.15)"/><text x="222" y="16" text-anchor="middle" fill="rgba(255,182,193,0.8)" font-size="8" font-weight="800" font-family="system-ui">K</text>' +
          '<text x="248" y="17" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" font-weight="600" font-family="system-ui">Klarna</text>' +

          /* SEPA — euro bank icon */
          '<rect x="276" y="0" width="54" height="26" rx="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m5"/>' +
          '<path d="M288 8 L292 6 L296 8 L296 18 L288 18 Z" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.7"/><line x1="287" y1="18" x2="297" y2="18" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>' +
          '<text x="313" y="17" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" font-weight="600" font-family="system-ui">SEPA</text>' +

          /* Second row */
          /* iDeal */
          '<rect x="30" y="34" width="54" height="26" rx="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m6"/>' +
          '<circle cx="44" cy="47" r="5" fill="none" stroke="rgba(204,0,102,0.5)" stroke-width="0.8"/><text x="44" y="50" text-anchor="middle" fill="rgba(204,0,102,0.6)" font-size="6" font-weight="800" font-family="system-ui">i</text>' +
          '<text x="68" y="51" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" font-weight="600" font-family="system-ui">iDeal</text>' +

          /* Revolut */
          '<rect x="92" y="34" width="66" height="26" rx="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m7"/>' +
          '<circle cx="106" cy="47" r="5" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/><text x="106" y="50" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="system-ui">R</text>' +
          '<text x="138" y="51" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" font-weight="600" font-family="system-ui">Revolut</text>' +

          /* Pay Link — link icon */
          '<rect x="166" y="34" width="66" height="26" rx="13" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m8"/>' +
          '<path d="M178 44 C178 41, 182 41, 182 44 M180 50 C180 53, 184 53, 184 50" stroke="rgba(99,25,240,0.5)" stroke-width="0.8" fill="none"/><line x1="181" y1="44" x2="181" y2="50" stroke="rgba(99,25,240,0.4)" stroke-width="0.6"/>' +
          '<text x="210" y="51" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" font-weight="600" font-family="system-ui">Pay Link</text>' +

          /* +More */
          '<rect x="240" y="34" width="50" height="26" rx="13" fill="rgba(99,25,240,0.08)" stroke="rgba(99,25,240,0.25)" stroke-width="0.8" class="pbrd-pos-arch-method pbrd-pos-arch-m9"/>' +
          '<text x="265" y="51" text-anchor="middle" fill="rgba(99,25,240,0.8)" font-size="8" font-weight="700" font-family="system-ui">+5 more</text>' +
        '</g>' +

        /* ── Transaction types — readable, white ── */
        '<g transform="translate(50,368)">' +
          '<rect x="0" y="-10" width="340" height="22" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>' +
          '<text x="25" y="4" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-size="7" font-weight="600" font-family="system-ui" letter-spacing="0.3">PAYMENT</text>' +
          '<text x="5" y="4" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="8" font-family="system-ui">\u00b7</text>' +
          '<text x="93" y="4" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-size="7" font-weight="600" font-family="system-ui" letter-spacing="0.3">PRE-AUTH</text>' +
          '<text x="60" y="4" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="8" font-family="system-ui">\u00b7</text>' +
          '<text x="161" y="4" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-size="7" font-weight="600" font-family="system-ui" letter-spacing="0.3">REFUND</text>' +
          '<text x="130" y="4" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="8" font-family="system-ui">\u00b7</text>' +
          '<text x="232" y="4" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-size="7" font-weight="600" font-family="system-ui" letter-spacing="0.3">CAPTURE</text>' +
          '<text x="199" y="4" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="8" font-family="system-ui">\u00b7</text>' +
          '<text x="310" y="4" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-size="7" font-weight="600" font-family="system-ui" letter-spacing="0.3">TOKENIZE</text>' +
          '<text x="273" y="4" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="8" font-family="system-ui">\u00b7</text>' +
        '</g>' +
      '</svg>';

    wrap.innerHTML =
      '<div class="pbrd-pos-platform-header">' +
        '<div class="pbrd-pos-section-label">PLATFORM INTELLIGENCE</div>' +
        '<h2>One app store. Infinite possibilities.</h2>' +
        '<p>Every Paybyrd terminal runs Android. Your POS, loyalty, and inventory apps live alongside our payment SDK on one device. No dongles, no external hardware.</p>' +
      '</div>' +
      '<div class="pbrd-pos-platform-grid">' +
        '<div class="pbrd-pos-features">' +
          '<div class="pbrd-pos-feature pbrd-pos-reveal"><div class="pbrd-pos-feature-icon">' + appSVG + '</div><div><h4>Android Payment SDK</h4><p>Your app calls our SDK via Android Intents or JavaScript. We handle PCI compliance, card reading, and authorization \u2014 you get a simple APPROVED/DECLINED callback. Also available as a JS SDK for web-based POS apps.</p></div></div>' +
          '<div class="pbrd-pos-feature pbrd-pos-reveal"><div class="pbrd-pos-feature-icon">' + remoteSVG + '</div><div><h4>Remote Transactions</h4><p>Trigger a payment on any terminal from the cloud. Just pass the serial number via REST API \u2014 the terminal prompts the cardholder, and you receive the result via webhook. No cables, no pairing.</p></div></div>' +
          '<div class="pbrd-pos-feature pbrd-pos-reveal"><div class="pbrd-pos-feature-icon">' + otaSVG + '</div><div><h4>OTA Fleet Management</h4><p>Push updates, deploy apps, and configure settings across your entire fleet from one dashboard. Every terminal stays current without a single site visit.</p></div></div>' +
          '<div class="pbrd-pos-feature pbrd-pos-reveal"><div class="pbrd-pos-feature-icon"><svg viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="2" width="7" height="7" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="11" width="7" height="7" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="11" width="7" height="7" rx="2" stroke="currentColor" stroke-width="1.5"/></svg></div><div><h4>10+ Payment Methods</h4><p>Card, MB WAY, SEPA, iDeal, PayPal, Klarna, Revolut Pay, Pay by Link, Floa, Multicaixa \u2014 all on one terminal. Pre-auth with partial capture, tokenization, and split payments included.</p></div></div>' +
        '</div>' +
        '<div class="pbrd-pos-diagram">' +
          architectureSVG +
        '</div>' +
      '</div>';

    newSection.appendChild(wrap);
    observeReveal(".pbrd-pos-reveal", 120, wrap);

    /* CSS handles all animations now */
  }

  /* ═══════════════════════════════════════════ */
  /* Section 4: Use Cases Bento                  */
  /* ═══════════════════════════════════════════ */

  function buildUseCases() {
    /* These sections were already hidden by enhancePlatform.
       Insert a new section after the platform section we just created. */
    var platformSection = document.querySelector(".pbrd-pos-platform-wrap");
    var anchor = platformSection ? platformSection.closest("section") : null;
    if (!anchor) { console.log("[Paybyrd] FAIL: buildUseCases — no anchor"); return; }

    var newSection = document.createElement("section");
    newSection.style.background = "#fff";
    newSection.style.padding = "80px 0";
    anchor.insertAdjacentElement("afterend", newSection);

    var wrap = document.createElement("div");
    wrap.className = "pbrd-pos-cases-wrap";

    wrap.innerHTML =
      '<div class="pbrd-pos-cases-header">' +
        '<div class="pbrd-pos-section-label">USE CASES</div>' +
        '<h2>Everywhere money changes hands.</h2>' +
        '<p>From busy restaurant floors to unattended kiosks \u2014 Paybyrd terminals adapt to how your business actually operates.</p>' +
      '</div>' +
      '<div class="pbrd-pos-bento">' +
        /* Row 1 */
        '<div class="pbrd-pos-bento-card pbrd-pos-bento-wide pbrd-pos-reveal">' +
          '<div class="pbrd-pos-bento-inner">' +
            '<div><h4>Restaurants & Hospitality</h4>' +
            '<p>Table payment, tip screen, split bills. Your waiter carries the terminal to the table \u2014 no folder, no waiting.</p>' +
            '<div class="pbrd-pos-bento-stats"><div class="pbrd-pos-bento-stat"><span class="pbrd-pos-bento-stat-val">+54%</span><span class="pbrd-pos-bento-stat-lbl">Higher tip rate</span></div><div class="pbrd-pos-bento-stat"><span class="pbrd-pos-bento-stat-val">12s</span><span class="pbrd-pos-bento-stat-lbl">Avg. pay time</span></div></div></div>' +
            '<div class="pbrd-pos-tip-mock">' +
              '<div style="font-size:0.625rem;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px">Add a tip?</div>' +
              '<div class="pbrd-pos-tip-amount" id="pbrd-pos-tip-amt">EUR 47.90</div>' +
              '<div class="pbrd-pos-tip-options">' +
                '<div class="pbrd-pos-tip-btn" data-pct="10">10%</div>' +
                '<div class="pbrd-pos-tip-btn pbrd-pos-tip-active" data-pct="15">15%</div>' +
                '<div class="pbrd-pos-tip-btn" data-pct="20">20%</div>' +
                '<div class="pbrd-pos-tip-btn" data-pct="0">No tip</div>' +
              '</div>' +
              '<div class="pbrd-pos-tip-total">Total: <span id="pbrd-pos-tip-total">EUR 55.09</span></div>' +
              '<div class="pbrd-pos-tip-bar"><div class="pbrd-pos-tip-bar-fill" style="width:78%"></div></div>' +
              '<div style="display:flex;justify-content:space-between;font-size:0.5625rem;color:rgba(255,255,255,0.25);margin-top:4px"><span>Subtotal EUR 47.90</span><span>Tip EUR 7.19</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-pos-bento-card pbrd-pos-reveal">' +
          '<h4>Retail</h4>' +
          '<p>Queue-busting. Staff walk the floor with handheld terminals and close sales on the spot.</p>' +
          '<div class="pbrd-pos-bento-txlist">' +
            '<div class="pbrd-pos-bento-tx">' + checkSVG + '<div><span class="pbrd-pos-bento-tx-amt">EUR 89.99</span><span class="pbrd-pos-bento-tx-method">Visa Contactless</span></div><span class="pbrd-pos-bento-tx-time">2s ago</span></div>' +
            '<div class="pbrd-pos-bento-tx">' + checkSVG + '<div><span class="pbrd-pos-bento-tx-amt">EUR 245.00</span><span class="pbrd-pos-bento-tx-method">Apple Pay</span></div><span class="pbrd-pos-bento-tx-time">14s ago</span></div>' +
            '<div class="pbrd-pos-bento-tx">' + checkSVG + '<div><span class="pbrd-pos-bento-tx-amt">EUR 32.50</span><span class="pbrd-pos-bento-tx-method">MBWay</span></div><span class="pbrd-pos-bento-tx-time">28s ago</span></div>' +
            '<div class="pbrd-pos-bento-tx">' + checkSVG + '<div><span class="pbrd-pos-bento-tx-amt">EUR 178.00</span><span class="pbrd-pos-bento-tx-method">Mastercard PIN</span></div><span class="pbrd-pos-bento-tx-time">41s ago</span></div>' +
          '</div>' +
        '</div>' +
        /* Row 2 */
        '<div class="pbrd-pos-bento-card pbrd-pos-reveal">' +
          '<h4>Self-Service Kiosks</h4>' +
          '<p>Unattended, 24/7. Parking, vending, hotel check-in \u2014 powered by the Titan desktop terminal.</p>' +
          '<div class="pbrd-pos-wave-wrap">' +
            '<div class="pbrd-pos-wave"><span class="pbrd-pos-wave-ring"></span></div>' +
          '</div>' +
          '<div style="text-align:center;font-size:0.625rem;color:rgba(255,255,255,0.35);font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-top:12px">Tap to Pay \u00b7 IP65 Rated</div>' +
        '</div>' +
        '<div class="pbrd-pos-bento-card pbrd-pos-reveal">' +
          '<h4>Events & Markets</h4>' +
          '<p>Pop-up stands, food trucks, festivals. Built-in 4G SIM means zero Wi-Fi dependency.</p>' +
          '<div class="pbrd-pos-signal" id="pbrd-pos-signal">' +
            '<div class="pbrd-pos-signal-bar" style="height:8px"></div>' +
            '<div class="pbrd-pos-signal-bar" style="height:12px"></div>' +
            '<div class="pbrd-pos-signal-bar" style="height:16px"></div>' +
            '<div class="pbrd-pos-signal-bar" style="height:20px"></div>' +
            '<span class="pbrd-pos-signal-label">4G Connected</span>' +
          '</div>' +
          '<div class="pbrd-pos-bento-stats" style="margin-top:16px"><div class="pbrd-pos-bento-stat"><span class="pbrd-pos-bento-stat-val">0</span><span class="pbrd-pos-bento-stat-lbl">Setup needed</span></div><div class="pbrd-pos-bento-stat"><span class="pbrd-pos-bento-stat-val">Free</span><span class="pbrd-pos-bento-stat-lbl">Data plan</span></div></div>' +
        '</div>' +
        '<div class="pbrd-pos-bento-card pbrd-pos-reveal">' +
          '<h4>Delivery & Mobility</h4>' +
          '<p>Payment at the door. Contactless, PIN, or QR \u2014 customer\u2019s choice. Receipt printed on the spot.</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px">' +
            '<div class="pbrd-pos-method-pill pbrd-pos-method-active">Contactless</div>' +
            '<div class="pbrd-pos-method-pill">Chip & PIN</div>' +
            '<div class="pbrd-pos-method-pill">QR Code</div>' +
            '<div class="pbrd-pos-method-pill">Google Pay</div>' +
            '<div class="pbrd-pos-method-pill">Apple Pay</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    newSection.appendChild(wrap);
    observeReveal(".pbrd-pos-reveal", 120, wrap);

    /* Animate signal bars */
    if ("IntersectionObserver" in window) {
      var sigWrap = document.getElementById("pbrd-pos-signal");
      if (sigWrap) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            var bars = sigWrap.querySelectorAll(".pbrd-pos-signal-bar");
            bars.forEach(function (bar, idx) {
              setTimeout(function () { bar.classList.add("pbrd-pos-sig-on"); }, idx * 200);
            });
            this.disconnect();
          }
        }, { threshold: 0.3 }).observe(sigWrap);
      }
    }

    /* Tip screen cycling */
    var tipAmounts = [
      { pct: "10%", total: "EUR 52.69", active: 0 },
      { pct: "15%", total: "EUR 55.09", active: 1 },
      { pct: "20%", total: "EUR 57.48", active: 2 }
    ];
    var tipIdx = 0;
    setInterval(function () {
      tipIdx = (tipIdx + 1) % tipAmounts.length;
      var btns = document.querySelectorAll(".pbrd-pos-tip-btn");
      var totalEl = document.getElementById("pbrd-pos-tip-total");
      if (!btns.length || !totalEl) return;
      btns.forEach(function (b, i) {
        b.classList.toggle("pbrd-pos-tip-active", i === tipAmounts[tipIdx].active);
      });
      totalEl.textContent = tipAmounts[tipIdx].total;
    }, 2000);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 5: Terminal Specs (Tabbed)          */
  /* ═══════════════════════════════════════════ */

  function buildSpecTabs() {
    /* Find and merge the three terminal detail sections */
    var secTab = findSectionByHeading("rawhide") || findSectionByHeading("pax a920");
    var secEagle = findSectionByHeading("eagle") || findSectionByHeading("pax im30");
    var secRenegade = findSectionByHeading("renegade") || findSectionByHeading("pax a77");
    var secOffer = findSectionByHeading("pos terminals offer");
    var secSlider = document.querySelector("[data-slider='component']");
    if (secSlider) {
      var sliderSection = secSlider.closest("section") || secSlider.parentElement;
      if (sliderSection) sliderSection.style.display = "none";
    }

    var target = secOffer || secTab || secEagle || secRenegade;
    if (!target) return;

    target.style.background = "#0a0a0f";
    var container = target.querySelector(".u-container, [class*='container']") || target;
    hideChildren(container);

    /* Hide other sections */
    [secTab, secEagle, secRenegade].forEach(function (s) {
      if (s && s !== target) s.style.display = "none";
    });

    var terminals = [
      {
        tab: "Rawhide", name: "Paybyrd Rawhide", model: "PAX A920 Pro",
        desc: "Combines sleek design with powerful performance. A beautiful portable solution with high-resolution touchscreen, 4G and Wi-Fi connectivity, supporting all payment types. Ideal for retail and hospitality.",
        img: "lineup-rawhide.png",
        specs: [
          ["OS", "Android 10"], ["Security", "PCI 6 SRED"], ["Display", '5.5" HD Touchscreen'],
          ["Connectivity", "4G / Wi-Fi / Bluetooth"], ["Camera", "8MP Rear"], ["Printer", "Built-in thermal"],
          ["Battery", "5150mAh"], ["NFC", "Contactless ready"]
        ]
      },
      {
        tab: "Renegade", name: "Paybyrd Renegade", model: "PAX A77",
        desc: "A compact, handheld payment terminal that delivers reliable performance on the go. 4G and Wi-Fi capabilities with a user-friendly interface, perfect for businesses that need mobile efficiency.",
        img: "lineup-renegade.png",
        specs: [
          ["OS", "Android 10"], ["Security", "PCI 5 SRED"], ["Display", '5.5" HD Touchscreen'],
          ["Connectivity", "4G / Wi-Fi / Bluetooth"], ["Camera", "13MP Rear / 5MP Front"], ["Scanner", "Professional barcode"],
          ["Battery", "4500mAh"], ["NFC", "Contactless ready"]
        ]
      },
      {
        tab: "Maverick", name: "Paybyrd Maverick", model: "Sunmi V3",
        desc: "Built for speed with an integrated high-speed printer. The go-to terminal for restaurants, delivery, and any business that needs receipts on the spot.",
        img: "lineup-maverick.png",
        specs: [
          ["OS", "Android 12"], ["Security", "PCI 5"], ["Display", '6" HD Touchscreen'],
          ["Connectivity", "4G / Wi-Fi / Bluetooth"], ["Printer", "High-speed thermal"], ["Camera", "Rear autofocus"],
          ["Battery", "5000mAh"], ["NFC", "Contactless ready"]
        ]
      },
      {
        tab: "Titan", name: "Paybyrd Titan", model: "Sunmi T3 Pro",
        desc: "A versatile, all-in-one desktop terminal designed for seamless integration with vending machines and self-service kiosks. Large touch screen with multiple connectivity options including contactless, chip, and magnetic stripe.",
        img: "lineup-titan.png",
        specs: [
          ["OS", "Android 12"], ["Security", "PCI 6.x SRED"], ["Display", '15.6" FHD Touchscreen'],
          ["Connectivity", "Ethernet / Wi-Fi / 4G"], ["Rating", "IP65 IK09"], ["Camera", "2MP Front"],
          ["Printer", "Built-in 80mm"], ["NFC", "Contactless ready"]
        ]
      }
    ];

    var wrap = document.createElement("div");
    wrap.className = "pbrd-pos-specs-wrap";

    var header = '<div class="pbrd-pos-specs-header">' +
      '<div class="pbrd-pos-section-label">SPECIFICATIONS</div>' +
      '<h2>Built to last. Built to perform.</h2>' +
      '<p>Every terminal in the lineup, with full specs and 3D views.</p>' +
    '</div>';

    var tabs = '<div class="pbrd-pos-tab-bar">';
    for (var t = 0; t < terminals.length; t++) {
      tabs += '<button class="pbrd-pos-tab' + (t === 0 ? ' pbrd-pos-tab--active' : '') + '" data-tab="' + t + '">' + terminals[t].tab + '</button>';
    }
    tabs += '</div>';

    var contents = '';
    for (var i = 0; i < terminals.length; i++) {
      var tm = terminals[i];
      var visual = '<img src="' + BASE + tm.img + '" alt="' + tm.name + '" loading="lazy">';

      var specRows = '';
      for (var s = 0; s < tm.specs.length; s++) {
        specRows += '<div class="pbrd-pos-spec-row"><span class="pbrd-pos-spec-key">' + tm.specs[s][0] + '</span><span class="pbrd-pos-spec-val">' + tm.specs[s][1] + '</span></div>';
      }

      contents += '<div class="pbrd-pos-tab-content' + (i === 0 ? ' pbrd-pos-tab-active' : '') + '" data-tab="' + i + '">' +
        '<div class="pbrd-pos-spec-visual">' + visual + '</div>' +
        '<div class="pbrd-pos-spec-info">' +
          '<h3>' + tm.name + '</h3>' +
          '<div class="pbrd-pos-spec-model">' + tm.model + '</div>' +
          '<p class="pbrd-pos-spec-desc">' + tm.desc + '</p>' +
          '<div class="pbrd-pos-spec-grid">' + specRows + '</div>' +
        '</div>' +
      '</div>';
    }

    wrap.innerHTML = header + tabs + contents;
    container.appendChild(wrap);

    /* Tab switching */
    wrap.querySelectorAll(".pbrd-pos-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = btn.getAttribute("data-tab");
        wrap.querySelectorAll(".pbrd-pos-tab").forEach(function (b) { b.classList.remove("pbrd-pos-tab--active"); });
        wrap.querySelectorAll(".pbrd-pos-tab-content").forEach(function (c) { c.classList.remove("pbrd-pos-tab-active"); });
        btn.classList.add("pbrd-pos-tab--active");
        var content = wrap.querySelector('.pbrd-pos-tab-content[data-tab="' + idx + '"]');
        if (content) content.classList.add("pbrd-pos-tab-active");
      });
    });
  }

  /* ═══════════════════════════════════════════ */
  /* Section 6: Rental                           */
  /* ═══════════════════════════════════════════ */

  function enhanceRental() {
    /* Hide original rental section */
    var origSection = findSectionByHeading("rental option");
    if (origSection) origSection.style.display = "none";

    /* Insert after specs section */
    var specsSection = document.querySelector(".pbrd-pos-specs-wrap");
    var anchor = specsSection ? specsSection.closest("section") : origSection;
    if (!anchor) { console.log("[Paybyrd] FAIL: enhanceRental — no anchor"); return; }

    var newSection = document.createElement("section");
    newSection.className = "pbrd-pos-pricing-section";
    newSection.style.padding = "80px 0";
    newSection.style.position = "relative";
    newSection.style.overflow = "hidden";
    anchor.insertAdjacentElement("afterend", newSection);

    /* Canvas for section-level constellation */
    var cvs = document.createElement("canvas");
    cvs.className = "pbrd-pos-pricing-canvas";
    cvs.id = "pbrd-pricing-canvas";
    newSection.appendChild(cvs);

    var wrap = document.createElement("div");
    wrap.className = "pbrd-pos-rental-wrap";

    wrap.innerHTML =
      '<div class="pbrd-pos-section-label">PRICING</div>' +
      '<h2>Choose one of our devices.<br>Or simply use your own.</h2>' +
      '<p>Buy outright, rent monthly, or turn your own phone into a payment terminal. Every option includes a free SIM with data plan.</p>' +

      /* ── Paybyrd Tap — two-panel SoftPOS showcase ── */
      '<div class="pbrd-pos-tap-heading pbrd-pos-reveal">' +
        '<h3>Tap to Pay on your device</h3>' +
        '<p>Turn any smartphone into a payment terminal. No hardware needed.</p>' +
      '</div>' +
      '<div class="pbrd-pos-tap-grid pbrd-pos-reveal">' +

        /* ══════ iPhone 17 panel ══════ */
        '<div class="pbrd-pos-tap-panel">' +
          '<div class="pbrd-pos-tap-visual">' +
            '<div class="pbrd-pos-tap-phone">' +
              '<svg viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-pos-tap-device pbrd-pos-tap-iphone">' +
                /* iPhone body — flat edges, titanium frame */
                '<rect x="8" y="8" width="204" height="424" rx="36" fill="#1a1a1e"/>' +
                '<rect x="8" y="8" width="204" height="424" rx="36" fill="none" stroke="rgba(180,180,190,0.3)" stroke-width="1.5"/>' +
                /* Screen */
                '<rect x="14" y="14" width="192" height="412" rx="32" fill="#000"/>' +
                /* Dynamic Island */
                '<rect x="78" y="22" width="64" height="22" rx="11" fill="#1a1a1e"/>' +
                /* Camera dot in island */
                '<circle cx="124" cy="33" r="4" fill="#0a0a0e" stroke="rgba(40,40,50,0.5)" stroke-width="0.5"/>' +

                /* ── Screen Step 1: Amount entry (visible 0-2s) ── */
                '<g class="pbrd-pos-txn-step pbrd-pos-txn-s1">' +
                  '<text x="110" y="110" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="10" font-family="system-ui" font-weight="500">CHARGE AMOUNT</text>' +
                  '<text x="110" y="175" text-anchor="middle" fill="#fff" font-size="42" font-weight="200" font-family="system-ui" letter-spacing="-1">\u20AC17.25</text>' +
                  /* iOS-style keypad hint */
                  '<g transform="translate(50,220)" fill="rgba(255,255,255,0.06)">' +
                    '<rect width="44" height="36" rx="6"/>' +
                    '<rect x="50" width="44" height="36" rx="6"/>' +
                    '<rect x="100" width="44" height="36" rx="6"/>' +
                    '<rect y="42" width="44" height="36" rx="6"/>' +
                    '<rect x="50" y="42" width="44" height="36" rx="6"/>' +
                    '<rect x="100" y="42" width="44" height="36" rx="6"/>' +
                  '</g>' +
                  '<text x="72" y="246" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="16" font-family="system-ui">1</text>' +
                  '<text x="122" y="246" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="16" font-family="system-ui">2</text>' +
                  '<text x="172" y="246" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="16" font-family="system-ui">3</text>' +
                  /* Charge button */
                  '<rect x="40" y="340" width="140" height="40" rx="20" fill="#6319f0"/>' +
                  '<text x="110" y="365" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="system-ui">Charge</text>' +
                '</g>' +

                /* ── Screen Step 2: Ready to tap (visible 2-4.5s) ── */
                '<g class="pbrd-pos-txn-step pbrd-pos-txn-s2">' +
                  '<text x="110" y="100" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10" font-family="system-ui" font-weight="500">TOTAL</text>' +
                  '<text x="110" y="130" text-anchor="middle" fill="#fff" font-size="32" font-weight="300" font-family="system-ui">\u20AC17.25</text>' +
                  /* NFC contactless icon — large */
                  '<g transform="translate(82,170)">' +
                    '<path d="M28 8 C34 14, 34 30, 28 36" stroke="rgba(99,25,240,0.7)" stroke-width="2" fill="none" class="pbrd-pos-nfc-wave1"/>' +
                    '<path d="M28 0 C40 12, 40 32, 28 44" stroke="rgba(99,25,240,0.5)" stroke-width="2" fill="none" class="pbrd-pos-nfc-wave2"/>' +
                    '<path d="M28 -6 C46 10, 46 36, 28 50" stroke="rgba(99,25,240,0.3)" stroke-width="2" fill="none" class="pbrd-pos-nfc-wave3"/>' +
                  '</g>' +
                  '<text x="110" y="260" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="11" font-family="system-ui">Hold card near iPhone</text>' +
                  /* Subtle bottom bar — iOS style */
                  '<rect x="60" y="390" width="100" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>' +
                '</g>' +

                /* ── Screen Step 3: Processing (visible 4.5-6s) ── */
                '<g class="pbrd-pos-txn-step pbrd-pos-txn-s3">' +
                  '<text x="110" y="140" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="11" font-family="system-ui">Processing\u2026</text>' +
                  /* Spinner ring */
                  '<circle cx="110" cy="200" r="24" fill="none" stroke="rgba(99,25,240,0.15)" stroke-width="2.5"/>' +
                  '<path d="M110 176 A24 24 0 0 1 134 200" stroke="#6319f0" stroke-width="2.5" fill="none" stroke-linecap="round" class="pbrd-pos-spinner"/>' +
                  '<text x="110" y="260" text-anchor="middle" fill="#fff" font-size="28" font-weight="300" font-family="system-ui">\u20AC17.25</text>' +
                '</g>' +

                /* ── Screen Step 4: Approved (visible 6-8s) ── */
                '<g class="pbrd-pos-txn-step pbrd-pos-txn-s4">' +
                  /* Large success circle */
                  '<circle cx="110" cy="175" r="40" fill="rgba(99,25,240,0.08)" stroke="#6319f0" stroke-width="2" class="pbrd-pos-success-ring"/>' +
                  '<path d="M94 175 L106 187 L128 163" stroke="#6319f0" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="pbrd-pos-checkmark"/>' +
                  '<text x="110" y="250" text-anchor="middle" fill="#fff" font-size="28" font-weight="300" font-family="system-ui">\u20AC17.25</text>' +
                  '<text x="110" y="278" text-anchor="middle" fill="rgba(99,25,240,0.8)" font-size="12" font-weight="600" font-family="system-ui">Approved</text>' +
                  /* Done button */
                  '<rect x="40" y="340" width="140" height="40" rx="20" fill="rgba(99,25,240,0.1)" stroke="rgba(99,25,240,0.3)" stroke-width="1"/>' +
                  '<text x="110" y="365" text-anchor="middle" fill="#6319f0" font-size="13" font-weight="600" font-family="system-ui">New Sale</text>' +
                '</g>' +

                /* Status bar */
                '<text x="30" y="47" fill="rgba(255,255,255,0.4)" font-size="9" font-weight="600" font-family="system-ui">9:41</text>' +
                '<g transform="translate(170,38)">' +
                  '<rect x="0" y="0" width="16" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>' +
                  '<rect x="1.5" y="1.5" width="10" height="5" rx="1" fill="rgba(255,255,255,0.3)"/>' +
                  '<rect x="16.5" y="2" width="1.5" height="4" rx="0.5" fill="rgba(255,255,255,0.2)"/>' +
                '</g>' +
              '</svg>' +
              /* Floating contactless card */
              '<svg viewBox="0 0 130 82" class="pbrd-pos-tap-card" xmlns="http://www.w3.org/2000/svg">' +
                '<rect width="130" height="82" rx="10" fill="#e8e4ef" stroke="rgba(0,0,0,0.06)" stroke-width="0.5"/>' +
                /* EMV chip */
                '<rect x="14" y="22" width="24" height="18" rx="3" fill="rgba(200,180,130,0.4)" stroke="rgba(180,160,100,0.5)" stroke-width="0.6"/>' +
                '<line x1="14" y1="28" x2="38" y2="28" stroke="rgba(180,160,100,0.3)" stroke-width="0.4"/>' +
                '<line x1="14" y1="34" x2="38" y2="34" stroke="rgba(180,160,100,0.3)" stroke-width="0.4"/>' +
                '<line x1="26" y1="22" x2="26" y2="40" stroke="rgba(180,160,100,0.3)" stroke-width="0.4"/>' +
                /* Contactless symbol on card */
                '<g transform="translate(96,20)">' +
                  '<path d="M8 4 C11 7, 11 13, 8 16" stroke="rgba(0,0,0,0.15)" stroke-width="1" fill="none"/>' +
                  '<path d="M8 1 C14 6, 14 14, 8 19" stroke="rgba(0,0,0,0.1)" stroke-width="1" fill="none"/>' +
                '</g>' +
                /* Card number dots */
                '<g fill="rgba(0,0,0,0.12)">' +
                  '<circle cx="14" cy="56" r="2"/><circle cx="20" cy="56" r="2"/><circle cx="26" cy="56" r="2"/><circle cx="32" cy="56" r="2"/>' +
                  '<text x="42" y="59" font-size="9" font-family="system-ui" fill="rgba(0,0,0,0.2)">4821</text>' +
                '</g>' +
                '<text x="14" y="74" font-size="7" font-family="system-ui" fill="rgba(0,0,0,0.15)" letter-spacing="0.5">J. ANDERSON</text>' +
              '</svg>' +
            '</div>' +
          '</div>' +
          '<h4>Tap to Pay on iPhone</h4>' +
          '<p>Accept contactless payments right on your iPhone. No terminal needed.</p>' +
          '<a href="/book-demo" class="pbrd-pos-tap-cta">Enable Tap to Pay on iPhone <span>\u203A</span></a>' +
        '</div>' +

        /* ══════ Samsung Galaxy panel ══════ */
        '<div class="pbrd-pos-tap-panel">' +
          '<div class="pbrd-pos-tap-visual">' +
            '<div class="pbrd-pos-tap-phone">' +
              '<svg viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-pos-tap-device pbrd-pos-tap-android">' +
                /* Galaxy body — slimmer bezels, subtle curve feel */
                '<rect x="6" y="6" width="208" height="428" rx="30" fill="#111114"/>' +
                '<rect x="6" y="6" width="208" height="428" rx="30" fill="none" stroke="rgba(150,150,160,0.2)" stroke-width="1"/>' +
                /* Screen — edge to edge */
                '<rect x="10" y="10" width="200" height="420" rx="28" fill="#0a0a10"/>' +
                /* Punch-hole camera — top center */
                '<circle cx="110" cy="26" r="5" fill="#111114" stroke="rgba(30,30,40,0.5)" stroke-width="0.5"/>' +

                /* ── Screen Step 1: Samsung Pay UI — amount (0-2s) ── */
                '<g class="pbrd-pos-txn-step pbrd-pos-txn-s1">' +
                  /* Samsung One UI style header */
                  '<text x="28" y="60" fill="rgba(255,255,255,0.5)" font-size="10" font-family="system-ui" font-weight="500">Paybyrd Terminal</text>' +
                  '<text x="110" y="120" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10" font-family="system-ui">Enter amount</text>' +
                  '<text x="110" y="170" text-anchor="middle" fill="#fff" font-size="44" font-weight="200" font-family="system-ui" letter-spacing="-1">\u20AC17.25</text>' +
                  /* Material-style numpad */
                  '<g transform="translate(30,210)">' +
                    '<circle cx="30" cy="20" r="22" fill="rgba(255,255,255,0.03)"/>' +
                    '<circle cx="80" cy="20" r="22" fill="rgba(255,255,255,0.03)"/>' +
                    '<circle cx="130" cy="20" r="22" fill="rgba(255,255,255,0.03)"/>' +
                    '<circle cx="30" cy="68" r="22" fill="rgba(255,255,255,0.03)"/>' +
                    '<circle cx="80" cy="68" r="22" fill="rgba(255,255,255,0.03)"/>' +
                    '<circle cx="130" cy="68" r="22" fill="rgba(255,255,255,0.03)"/>' +
                  '</g>' +
                  '<text x="60" y="236" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="16" font-family="system-ui">1</text>' +
                  '<text x="110" y="236" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="16" font-family="system-ui">2</text>' +
                  '<text x="160" y="236" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="16" font-family="system-ui">3</text>' +
                  /* Charge button — Samsung rounded rectangle */
                  '<rect x="30" y="350" width="160" height="44" rx="22" fill="#6319f0"/>' +
                  '<text x="110" y="377" text-anchor="middle" fill="#fff" font-size="14" font-weight="600" font-family="system-ui">Charge</text>' +
                '</g>' +

                /* ── Screen Step 2: NFC ready (2-4.5s) ── */
                '<g class="pbrd-pos-txn-step pbrd-pos-txn-s2">' +
                  '<text x="110" y="90" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10" font-family="system-ui" font-weight="500">\u20AC17.25</text>' +
                  /* Large NFC target area */
                  '<circle cx="110" cy="200" r="50" fill="rgba(99,25,240,0.04)" stroke="rgba(99,25,240,0.1)" stroke-width="1" stroke-dasharray="4 3"/>' +
                  '<circle cx="110" cy="200" r="30" fill="rgba(99,25,240,0.06)"/>' +
                  /* NFC waves from center */
                  '<g transform="translate(92,178)">' +
                    '<path d="M18 6 C24 12, 24 28, 18 34" stroke="rgba(99,25,240,0.6)" stroke-width="2" fill="none" class="pbrd-pos-nfc-wave1"/>' +
                    '<path d="M18 0 C30 10, 30 32, 18 42" stroke="rgba(99,25,240,0.4)" stroke-width="2" fill="none" class="pbrd-pos-nfc-wave2"/>' +
                  '</g>' +
                  '<text x="110" y="290" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="11" font-family="system-ui">Tap card or device</text>' +
                  /* Samsung nav bar */
                  '<rect x="85" y="410" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.12)"/>' +
                '</g>' +

                /* ── Screen Step 3: Reading card (4.5-6s) ── */
                '<g class="pbrd-pos-txn-step pbrd-pos-txn-s3">' +
                  '<text x="110" y="140" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="11" font-family="system-ui">Reading card\u2026</text>' +
                  /* Pulsing rings */
                  '<circle cx="110" cy="210" r="18" fill="none" stroke="rgba(99,25,240,0.5)" stroke-width="2" class="pbrd-pos-nfc-pulse1"/>' +
                  '<circle cx="110" cy="210" r="30" fill="none" stroke="rgba(99,25,240,0.3)" stroke-width="1.5" class="pbrd-pos-nfc-pulse2"/>' +
                  '<circle cx="110" cy="210" r="42" fill="none" stroke="rgba(99,25,240,0.15)" stroke-width="1" class="pbrd-pos-nfc-pulse3"/>' +
                  '<text x="110" y="280" text-anchor="middle" fill="#fff" font-size="28" font-weight="300" font-family="system-ui">\u20AC17.25</text>' +
                '</g>' +

                /* ── Screen Step 4: Approved (6-8s) ── */
                '<g class="pbrd-pos-txn-step pbrd-pos-txn-s4">' +
                  /* Success */
                  '<circle cx="110" cy="165" r="42" fill="rgba(99,25,240,0.06)" stroke="#6319f0" stroke-width="2" class="pbrd-pos-success-ring"/>' +
                  '<path d="M92 165 L106 179 L130 153" stroke="#6319f0" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="pbrd-pos-checkmark"/>' +
                  '<text x="110" y="240" text-anchor="middle" fill="#fff" font-size="30" font-weight="300" font-family="system-ui">\u20AC17.25</text>' +
                  '<text x="110" y="268" text-anchor="middle" fill="rgba(99,25,240,0.8)" font-size="12" font-weight="600" font-family="system-ui">Payment Successful</text>' +
                  /* Receipt / New sale buttons */
                  '<rect x="30" y="310" width="70" height="36" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>' +
                  '<text x="65" y="333" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="system-ui">Receipt</text>' +
                  '<rect x="120" y="310" width="70" height="36" rx="18" fill="rgba(99,25,240,0.1)" stroke="rgba(99,25,240,0.3)" stroke-width="0.8"/>' +
                  '<text x="155" y="333" text-anchor="middle" fill="#6319f0" font-size="10" font-weight="600" font-family="system-ui">New Sale</text>' +
                  /* Samsung nav bar */
                  '<rect x="85" y="410" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.12)"/>' +
                '</g>' +

                /* Status bar */
                '<text x="24" y="46" fill="rgba(255,255,255,0.35)" font-size="9" font-weight="500" font-family="system-ui">12:30</text>' +
                '<g transform="translate(170,38)">' +
                  '<rect x="0" y="0" width="16" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.7"/>' +
                  '<rect x="1.5" y="1.5" width="11" height="5" rx="1" fill="rgba(255,255,255,0.25)"/>' +
                '</g>' +
              '</svg>' +
              /* Floating digital wallet card */
              '<svg viewBox="0 0 110 70" class="pbrd-pos-tap-wallet-card" xmlns="http://www.w3.org/2000/svg">' +
                '<rect width="110" height="70" rx="10" fill="#1a1a2e" stroke="rgba(99,25,240,0.2)" stroke-width="0.8"/>' +
                /* Google Pay / wallet style */
                '<circle cx="22" cy="22" r="8" fill="rgba(99,25,240,0.15)" stroke="rgba(99,25,240,0.3)" stroke-width="0.6"/>' +
                '<text x="22" y="25" text-anchor="middle" fill="rgba(99,25,240,0.5)" font-size="8" font-weight="700" font-family="system-ui">G</text>' +
                '<text x="38" y="25" fill="rgba(255,255,255,0.4)" font-size="8" font-family="system-ui">Pay</text>' +
                '<text x="14" y="46" fill="rgba(255,255,255,0.2)" font-size="7" font-family="system-ui" letter-spacing="2">\u2022\u2022\u2022\u2022  4821</text>' +
                '<rect x="14" y="54" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>' +
              '</svg>' +
            '</div>' +
          '</div>' +
          '<h4>Tap to Pay on Android</h4>' +
          '<p>Accept card and digital wallet payments on your Android device, anywhere.</p>' +
          '<a href="/book-demo" class="pbrd-pos-tap-cta">Enable Android Tap to Pay <span>\u203A</span></a>' +
        '</div>' +
      '</div>' +

      /* ── Buy / Rent toggle ── */
      '<div class="pbrd-pos-mode-toggle" id="pbrd-pos-mode-toggle">' +
        '<button class="pbrd-pos-mode-btn pbrd-pos-mode--active" data-mode="buy">Purchase</button>' +
        '<button class="pbrd-pos-mode-btn" data-mode="rent">Rental</button>' +
      '</div>' +

      /* ── 4 terminal cards ── */
      '<div class="pbrd-pos-pricing-grid">' +

        /* Renegade */
        '<div class="pbrd-pos-pricing-card pbrd-pos-reveal">' +
          '<div class="pbrd-pos-pc-img-white"><img src="' + BASE + 'a77.png" alt="Renegade" loading="lazy"></div>' +
          '<div class="pbrd-pos-pc-body-white">' +
            '<h4>Renegade</h4>' +
            '<div class="pbrd-pos-pc-sub">Handheld Terminal</div>' +
            '<div class="pbrd-pos-pc-price-line"><span class="pbrd-pos-pc-price-main pbrd-pos-price-buy">\u20AC295</span><span class="pbrd-pos-pc-price-main pbrd-pos-price-rent" style="display:none">\u20AC18<span class="pbrd-pos-pc-period">/mo</span></span></div>' +
            '<a href="/book-demo" class="pbrd-pos-pc-btn-primary">Order now</a>' +
            '<ul class="pbrd-pos-pc-list">' +
              '<li>' + checkSVG + ' Accept cards and wallets</li>' +
              '<li>' + checkSVG + ' Always online 4G / WiFi</li>' +
              '<li>' + checkSVG + ' Front-facing NFC</li>' +
              '<li>' + checkSVG + ' Digital receipts via QR or email</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

        /* Rawhide */
        '<div class="pbrd-pos-pricing-card pbrd-pos-reveal">' +
          '<div class="pbrd-pos-pc-img-white"><img src="' + BASE + 'a920.png" alt="Rawhide" loading="lazy"></div>' +
          '<div class="pbrd-pos-pc-body-white">' +
            '<h4>Rawhide</h4>' +
            '<div class="pbrd-pos-pc-sub">Mobile POS Terminal</div>' +
            '<div class="pbrd-pos-pc-price-line"><span class="pbrd-pos-pc-price-main pbrd-pos-price-buy">\u20AC395</span><span class="pbrd-pos-pc-price-main pbrd-pos-price-rent" style="display:none">\u20AC22<span class="pbrd-pos-pc-period">/mo</span></span></div>' +
            '<a href="/book-demo" class="pbrd-pos-pc-btn-primary">Order now</a>' +
            '<ul class="pbrd-pos-pc-list">' +
              '<li>' + checkSVG + ' Embedded receipt printer</li>' +
              '<li>' + checkSVG + ' Lightweight and portable</li>' +
              '<li>' + checkSVG + ' 4G + Wi-Fi + Bluetooth</li>' +
              '<li>' + checkSVG + ' Starting \u20AC22/mo per active terminal</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

        /* Maverick */
        '<div class="pbrd-pos-pricing-card pbrd-pos-pricing-card--featured pbrd-pos-reveal">' +
          '<div class="pbrd-pos-pc-tag">Most popular</div>' +
          '<div class="pbrd-pos-pc-img-white"><img src="' + BASE + 'sunmi-v3.png" alt="Maverick" loading="lazy"></div>' +
          '<div class="pbrd-pos-pc-body-white">' +
            '<h4>Maverick</h4>' +
            '<div class="pbrd-pos-pc-sub">Mobile POS Terminal</div>' +
            '<div class="pbrd-pos-pc-price-line"><span class="pbrd-pos-pc-price-main pbrd-pos-price-buy">\u20AC450</span><span class="pbrd-pos-pc-price-main pbrd-pos-price-rent" style="display:none">\u20AC25<span class="pbrd-pos-pc-period">/mo</span></span></div>' +
            '<a href="/book-demo" class="pbrd-pos-pc-btn-primary">Order now</a>' +
            '<ul class="pbrd-pos-pc-list">' +
              '<li>' + checkSVG + ' High-speed thermal printer</li>' +
              '<li>' + checkSVG + ' Android 12</li>' +
              '<li>' + checkSVG + ' NFC contactless</li>' +
              '<li>' + checkSVG + ' Starting \u20AC25/mo per active terminal</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

        /* Titan */
        '<div class="pbrd-pos-pricing-card pbrd-pos-reveal">' +
          '<div class="pbrd-pos-pc-img-white"><img src="' + BASE + 't3-pro-front.png" alt="Titan" loading="lazy"></div>' +
          '<div class="pbrd-pos-pc-body-white">' +
            '<h4>Titan</h4>' +
            '<div class="pbrd-pos-pc-sub">Fixed POS Terminal</div>' +
            '<div class="pbrd-pos-pc-price-line"><span class="pbrd-pos-pc-price-main pbrd-pos-price-buy">\u20AC890</span><span class="pbrd-pos-pc-price-main pbrd-pos-price-rent" style="display:none">\u20AC45<span class="pbrd-pos-pc-period">/mo</span></span></div>' +
            '<a href="/book-demo" class="pbrd-pos-pc-btn-primary">Order now</a>' +
            '<ul class="pbrd-pos-pc-list">' +
              '<li>' + checkSVG + ' Ethernet for reliability</li>' +
              '<li>' + checkSVG + ' Vandal-proof and easy to mount</li>' +
              '<li>' + checkSVG + ' Ideal for kiosks and unattended payment</li>' +
              '<li>' + checkSVG + ' Starting \u20AC45/mo per active terminal</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

      '</div>';

    newSection.appendChild(wrap);
    observeReveal(".pbrd-pos-reveal", 150, wrap);

    /* Buy/Rent toggle */
    var toggleWrap = document.getElementById("pbrd-pos-mode-toggle");
    if (toggleWrap) {
      toggleWrap.querySelectorAll(".pbrd-pos-mode-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var mode = btn.getAttribute("data-mode");
          toggleWrap.querySelectorAll(".pbrd-pos-mode-btn").forEach(function (b) { b.classList.remove("pbrd-pos-mode--active"); });
          btn.classList.add("pbrd-pos-mode--active");
          wrap.querySelectorAll(".pbrd-pos-price-buy").forEach(function (el) { el.style.display = mode === "buy" ? "" : "none"; });
          wrap.querySelectorAll(".pbrd-pos-price-rent").forEach(function (el) { el.style.display = mode === "rent" ? "" : "none"; });
        });
      });
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 6b: Value-Add Services              */
  /* ═══════════════════════════════════════════ */

  function buildValueAdds() {
    var pricingWrap = document.querySelector(".pbrd-pos-rental-wrap");
    var anchor = pricingWrap ? pricingWrap.closest("section") : null;
    if (!anchor) return;

    var newSection = document.createElement("section");
    newSection.style.background = "#0a0a0f";
    newSection.style.padding = "80px 0";
    anchor.insertAdjacentElement("afterend", newSection);

    var wrap = document.createElement("div");
    wrap.className = "pbrd-pos-valueadd-wrap";

    /* ── SoftPOS animated graphic: phone + NFC waves + tapping card ── */
    var softposGraphic =
      '<svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-pos-va-graphic">' +
        /* Phone body */
        '<rect x="100" y="20" width="80" height="160" rx="12" fill="#1a1a2e" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>' +
        '<rect x="106" y="30" width="68" height="140" rx="8" fill="#111"/>' +
        /* Screen content */
        '<text x="140" y="80" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-family="system-ui">READY</text>' +
        '<text x="140" y="105" text-anchor="middle" fill="#fff" font-size="20" font-weight="400" font-family="system-ui">\u20AC9.50</text>' +
        /* NFC symbol on screen */
        '<g transform="translate(128,115)">' +
          '<path d="M12 3 C16 7, 16 17, 12 21" stroke="rgba(99,25,240,0.6)" stroke-width="1.2" fill="none" class="pbrd-pos-nfc-wave1"/>' +
          '<path d="M12 -1 C20 5, 20 19, 12 25" stroke="rgba(99,25,240,0.4)" stroke-width="1.2" fill="none" class="pbrd-pos-nfc-wave2"/>' +
          '<path d="M12 -5 C24 3, 24 21, 12 29" stroke="rgba(99,25,240,0.2)" stroke-width="1.2" fill="none" class="pbrd-pos-nfc-wave3"/>' +
        '</g>' +
        /* Punch hole camera */
        '<circle cx="140" cy="35" r="2.5" fill="#0a0a12" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>' +
        /* NFC pulse rings emanating from phone */
        '<circle cx="140" cy="100" r="55" fill="none" stroke="rgba(99,25,240,0.18)" stroke-width="1" class="pbrd-pos-va-pulse1"/>' +
        '<circle cx="140" cy="100" r="75" fill="none" stroke="rgba(99,25,240,0.12)" stroke-width="0.8" class="pbrd-pos-va-pulse2"/>' +
        '<circle cx="140" cy="100" r="95" fill="none" stroke="rgba(99,25,240,0.07)" stroke-width="0.8" class="pbrd-pos-va-pulse3"/>' +
        /* Contactless card floating in from left */
        '<g class="pbrd-pos-va-float-card">' +
          '<rect x="18" y="68" width="60" height="38" rx="5" fill="#fff" stroke="rgba(0,0,0,0.1)" stroke-width="0.8"/>' +
          '<rect x="24" y="76" width="14" height="10" rx="2" fill="rgba(200,180,130,0.5)" stroke="rgba(180,160,100,0.6)" stroke-width="0.5"/>' +
          '<rect x="24" y="94" width="30" height="2" rx="1" fill="rgba(0,0,0,0.06)"/>' +
          '<g transform="translate(56,70)">' +
            '<path d="M6 3 C8 5, 8 9, 6 11" stroke="rgba(255,255,255,0.15)" stroke-width="0.6" fill="none"/>' +
            '<path d="M6 1 C10 4, 10 10, 6 13" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" fill="none"/>' +
          '</g>' +
        '</g>' +
        /* Check animation after tap */
        '<circle cx="140" cy="200" r="8" fill="rgba(99,25,240,0.1)" class="pbrd-pos-va-done-dot"/>' +
        '<text x="140" y="204" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="9" font-family="system-ui" font-weight="600" class="pbrd-pos-va-done-dot">\u2713</text>' +
      '</svg>';

    /* ── DCC animated graphic: currency conversion wheel ── */
    var dccGraphic =
      '<svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-pos-va-graphic">' +
        /* Central amount */
        '<text x="140" y="98" text-anchor="middle" fill="#111" font-size="24" font-weight="600" font-family="system-ui" class="pbrd-pos-va-dcc-amount">\u20AC25.00</text>' +
        '<text x="140" y="116" text-anchor="middle" fill="#6319f0" font-size="8" font-weight="500" font-family="system-ui">ORIGINAL AMOUNT</text>' +
        /* Orbit ring */
        '<circle cx="140" cy="105" r="70" fill="none" stroke="rgba(99,25,240,0.15)" stroke-width="0.8" stroke-dasharray="3 4"/>' +
        '<circle cx="140" cy="105" r="90" fill="none" stroke="rgba(99,25,240,0.08)" stroke-width="0.5" stroke-dasharray="2 6"/>' +
        /* Orbiting currency symbols */
        '<g class="pbrd-pos-va-orbit" style="--orbit-r:70px;--orbit-cx:140px;--orbit-cy:105px">' +
          /* GBP */
          '<g class="pbrd-pos-va-currency pbrd-pos-va-cur1">' +
            '<circle r="18" fill="#fff" stroke="rgba(99,25,240,0.3)" stroke-width="1.2"/>' +
            '<text y="5" text-anchor="middle" fill="#6319f0" font-size="13" font-weight="700" font-family="system-ui">\u00A3</text>' +
          '</g>' +
          /* USD */
          '<g class="pbrd-pos-va-currency pbrd-pos-va-cur2">' +
            '<circle r="18" fill="#fff" stroke="rgba(99,25,240,0.3)" stroke-width="1.2"/>' +
            '<text y="5" text-anchor="middle" fill="#6319f0" font-size="13" font-weight="700" font-family="system-ui">$</text>' +
          '</g>' +
          /* JPY */
          '<g class="pbrd-pos-va-currency pbrd-pos-va-cur3">' +
            '<circle r="18" fill="#fff" stroke="rgba(99,25,240,0.3)" stroke-width="1.2"/>' +
            '<text y="5" text-anchor="middle" fill="#6319f0" font-size="13" font-weight="700" font-family="system-ui">\u00A5</text>' +
          '</g>' +
          /* CHF */
          '<g class="pbrd-pos-va-currency pbrd-pos-va-cur4">' +
            '<circle r="15" fill="#fff" stroke="rgba(99,25,240,0.2)" stroke-width="1"/>' +
            '<text y="4" text-anchor="middle" fill="rgba(99,25,240,0.7)" font-size="9" font-weight="700" font-family="system-ui">CHF</text>' +
          '</g>' +
          /* SEK */
          '<g class="pbrd-pos-va-currency pbrd-pos-va-cur5">' +
            '<circle r="14" fill="#fff" stroke="rgba(99,25,240,0.15)" stroke-width="0.8"/>' +
            '<text y="4" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="9" font-weight="700" font-family="system-ui">kr</text>' +
          '</g>' +
        '</g>' +
        /* Conversion arrow */
        '<g class="pbrd-pos-va-convert-arrow">' +
          '<path d="M140 130 L140 160" stroke="rgba(99,25,240,0.4)" stroke-width="1" stroke-dasharray="3 2"/>' +
          '<path d="M135 155 L140 163 L145 155" fill="rgba(99,25,240,0.4)"/>' +
        '</g>' +
        /* Converted amount that cycles */
        '<text x="140" y="185" text-anchor="middle" fill="#6319f0" font-size="16" font-weight="700" font-family="system-ui" class="pbrd-pos-va-converted">\u00A321.40</text>' +
        '<text x="140" y="200" text-anchor="middle" fill="rgba(0,0,0,0.35)" font-size="7" font-weight="500" font-family="system-ui" class="pbrd-pos-va-converted-label">CUSTOMER PAYS IN HOME CURRENCY</text>' +
      '</svg>';

    /* ── InstaTax animated graphic: receipt + refund flow ── */
    var instaTaxGraphic =
      '<svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-pos-va-graphic">' +
        /* Receipt on left */
        '<g class="pbrd-pos-va-receipt">' +
          '<rect x="30" y="30" width="90" height="130" rx="4" fill="#fff" stroke="rgba(0,0,0,0.1)" stroke-width="0.8"/>' +
          /* Zigzag bottom */
          '<path d="M30 160 L37 155 L44 160 L51 155 L58 160 L65 155 L72 160 L79 155 L86 160 L93 155 L100 160 L107 155 L114 160 L120 155" stroke="rgba(0,0,0,0.1)" stroke-width="0.8" fill="none"/>' +
          /* Receipt lines */
          '<text x="75" y="50" text-anchor="middle" fill="rgba(0,0,0,0.6)" font-size="6" font-family="system-ui" font-weight="600">PURCHASE</text>' +
          '<rect x="42" y="58" width="66" height="1" fill="rgba(0,0,0,0.08)"/>' +
          '<text x="44" y="72" fill="rgba(0,0,0,0.4)" font-size="6" font-family="system-ui">Items</text>' +
          '<text x="106" y="72" text-anchor="end" fill="rgba(0,0,0,0.6)" font-size="6" font-family="system-ui">\u20AC250.00</text>' +
          '<text x="44" y="84" fill="rgba(0,0,0,0.4)" font-size="6" font-family="system-ui">VAT (21%)</text>' +
          '<text x="106" y="84" text-anchor="end" fill="rgba(99,25,240,0.7)" font-size="6" font-weight="700" font-family="system-ui" class="pbrd-pos-va-tax-highlight">\u20AC52.50</text>' +
          '<rect x="42" y="90" width="66" height="1" fill="rgba(0,0,0,0.08)"/>' +
          '<text x="44" y="104" fill="rgba(0,0,0,0.7)" font-size="7" font-weight="600" font-family="system-ui">Total</text>' +
          '<text x="106" y="104" text-anchor="end" fill="#111" font-size="7" font-weight="700" font-family="system-ui">\u20AC302.50</text>' +
          /* Tourist card detected badge */
          '<rect x="42" y="115" width="66" height="18" rx="9" fill="rgba(99,25,240,0.12)" class="pbrd-pos-va-detect-badge"/>' +
          '<text x="75" y="127" text-anchor="middle" fill="rgba(99,25,240,0.8)" font-size="5.5" font-weight="600" font-family="system-ui" class="pbrd-pos-va-detect-badge">\uD83C\uDF0D Tourist Card Detected</text>' +
        '</g>' +

        /* Animated refund arrow — curves from receipt to tourist */
        '<g class="pbrd-pos-va-refund-flow">' +
          '<path d="M120 90 C155 90, 155 60, 170 55" stroke="rgba(99,25,240,0.4)" stroke-width="1.2" fill="none" stroke-dasharray="4 3" class="pbrd-pos-va-refund-path"/>' +
          '<circle r="4" fill="#6319f0" class="pbrd-pos-va-refund-dot">' +
            '<animateMotion dur="2s" repeatCount="indefinite" path="M120 90 C155 90, 155 60, 170 55" begin="0s"/>' +
          '</circle>' +
          /* Refund amount traveling */
          '<text x="150" y="68" text-anchor="middle" fill="rgba(99,25,240,0.9)" font-size="9" font-weight="700" font-family="system-ui" class="pbrd-pos-va-refund-amount">\u20AC52.50</text>' +
        '</g>' +

        /* Tourist / person icon on right */
        '<g transform="translate(178,20)" class="pbrd-pos-va-tourist">' +
          /* Person silhouette */
          '<circle cx="40" cy="18" r="14" fill="rgba(99,25,240,0.08)" stroke="rgba(99,25,240,0.2)" stroke-width="1"/>' +
          '<circle cx="40" cy="15" r="5" fill="rgba(0,0,0,0.15)"/>' +
          '<path d="M30 30 C30 22, 50 22, 50 30" fill="rgba(0,0,0,0.08)"/>' +
          /* Passport / flag hint */
          '<rect x="24" y="38" width="32" height="22" rx="2" fill="#fff" stroke="rgba(99,25,240,0.2)" stroke-width="0.6"/>' +
          '<text x="40" y="52" text-anchor="middle" fill="rgba(0,0,0,0.5)" font-size="6" font-family="system-ui">\uD83C\uDDEC\uD83C\uDDE7</text>' +
          /* Refund received — instant */
          '<rect x="10" y="72" width="60" height="28" rx="14" fill="rgba(99,25,240,0.12)" stroke="rgba(99,25,240,0.3)" stroke-width="0.8" class="pbrd-pos-va-refund-badge"/>' +
          '<text x="40" y="85" text-anchor="middle" fill="#6319f0" font-size="5" font-weight="700" font-family="system-ui" letter-spacing="0.5" class="pbrd-pos-va-refund-badge">\u26A1 INSTANT</text>' +
          '<text x="40" y="95" text-anchor="middle" fill="#6319f0" font-size="9" font-weight="700" font-family="system-ui" class="pbrd-pos-va-refund-badge">+\u20AC52.50</text>' +
        '</g>' +

        /* Bottom timeline */
        '<g transform="translate(30,180)">' +
          '<line x1="0" y1="5" x2="220" y2="5" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>' +
          /* Step dots */
          '<circle cx="20" cy="5" r="3" fill="rgba(99,25,240,0.5)" class="pbrd-pos-va-step1"/>' +
          '<text x="20" y="20" text-anchor="middle" fill="rgba(0,0,0,0.4)" font-size="5" font-family="system-ui">Purchase</text>' +
          '<circle cx="110" cy="5" r="3" fill="rgba(99,25,240,0.3)" class="pbrd-pos-va-step2"/>' +
          '<text x="110" y="20" text-anchor="middle" fill="rgba(0,0,0,0.4)" font-size="5" font-family="system-ui">Auto-detect</text>' +
          '<circle cx="200" cy="5" r="3" fill="rgba(99,25,240,0.3)" class="pbrd-pos-va-step3"/>' +
          '<text x="200" y="20" text-anchor="middle" fill="rgba(0,0,0,0.4)" font-size="5" font-family="system-ui">Instant refund</text>' +
          /* Animated progress line */
          '<line x1="20" y1="5" x2="200" y2="5" stroke="#6319f0" stroke-width="1.5" stroke-linecap="round" class="pbrd-pos-va-timeline-fill"/>' +
        '</g>' +
      '</svg>';

    wrap.innerHTML =
      '<div class="pbrd-pos-valueadd-header">' +
        '<div class="pbrd-pos-section-label">BEYOND PAYMENTS</div>' +
        '<h2>More than a terminal.</h2>' +
        '<p>Every Paybyrd terminal unlocks capabilities that turn payments into a revenue engine.</p>' +
      '</div>' +
      '<div class="pbrd-pos-valueadd-grid">' +

        /* ── SoftPOS card ── */
        '<div class="pbrd-pos-va-card pbrd-pos-reveal">' +
          '<div class="pbrd-pos-va-visual">' + softposGraphic + '</div>' +
          '<div class="pbrd-pos-va-body">' +
            '<div class="pbrd-pos-va-label">NEW</div>' +
            '<h4>SoftPOS</h4>' +
            '<p>Turn any NFC phone into a terminal. Zero hardware, 30-second setup.</p>' +
            '<div class="pbrd-pos-va-stats">' +
              '<div><span class="pbrd-pos-va-stat-val">\u20AC0</span><span class="pbrd-pos-va-stat-lbl">Hardware</span></div>' +
              '<div><span class="pbrd-pos-va-stat-val">30s</span><span class="pbrd-pos-va-stat-lbl">Setup</span></div>' +
              '<div><span class="pbrd-pos-va-stat-val">NFC</span><span class="pbrd-pos-va-stat-lbl">Tap to pay</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* ── DCC card ── */
        '<div class="pbrd-pos-va-card pbrd-pos-reveal">' +
          '<div class="pbrd-pos-va-visual">' + dccGraphic + '</div>' +
          '<div class="pbrd-pos-va-body">' +
            '<h4>Dynamic Currency Conversion</h4>' +
            '<p>Foreign cards auto-detected. Tourists pay in their currency. You earn up to 80% of the conversion margin.</p>' +
            '<div class="pbrd-pos-va-stats">' +
              '<div><span class="pbrd-pos-va-stat-val">80%</span><span class="pbrd-pos-va-stat-lbl">Revenue share</span></div>' +
              '<div><span class="pbrd-pos-va-stat-val">192+</span><span class="pbrd-pos-va-stat-lbl">Currencies</span></div>' +
              '<div><span class="pbrd-pos-va-stat-val">Auto</span><span class="pbrd-pos-va-stat-lbl">Detection</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* ── InstaTax card — full width ── */
        '<div class="pbrd-pos-va-card pbrd-pos-va-card-wide pbrd-pos-reveal">' +
          '<div class="pbrd-pos-va-visual pbrd-pos-va-visual-wide">' + instaTaxGraphic + '</div>' +
          '<div class="pbrd-pos-va-body">' +
            '<div class="pbrd-pos-va-label" style="background:rgba(99,25,240,0.12);color:#6319f0">EXCLUSIVE</div>' +
            '<h4>Paybyrd InstaTax\u2122</h4>' +
            '<p>Terminal auto-detects tourist cards, offers VAT refund on-screen. No apps, no paper, no staff training. Tourist gets an immediate refund at the point of sale. You unlock a new revenue stream.</p>' +
            '<div class="pbrd-pos-va-stats">' +
              '<div><span class="pbrd-pos-va-stat-val">50%</span><span class="pbrd-pos-va-stat-lbl">Higher revenue vs legacy</span></div>' +
              '<div><span class="pbrd-pos-va-stat-val">40%</span><span class="pbrd-pos-va-stat-lbl">Higher return rate</span></div>' +
              '<div><span class="pbrd-pos-va-stat-val">1M+</span><span class="pbrd-pos-va-stat-lbl">Tourists served</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>';

    newSection.appendChild(wrap);
    observeReveal(".pbrd-pos-reveal", 150, wrap);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 7: Contact Form Trust Badges        */
  /* ═══════════════════════════════════════════ */

  function enhanceContact() {
    var section = findSectionByHeading("sounds interesting") || findSectionByHeading("contact us today");
    if (!section) return;

    section.classList.add("pbrd-pos-contact-section");

    /* ── Rewrite the heading + copy ── */
    var headings = section.querySelectorAll("h1,h2,h3");
    headings.forEach(function(el) {
      if (el.textContent.toLowerCase().indexOf("sounds interesting") > -1 ||
          el.textContent.toLowerCase().indexOf("contact us") > -1) {
        el.innerHTML = 'Get your terminal<br>in 48 hours.';
        el.style.color = "#111";
      }
    });

    /* Replace the paragraph copy */
    section.querySelectorAll("p").forEach(function(el) {
      if (!el.closest("form") && el.textContent.indexOf("personalized") > -1) {
        el.innerHTML = 'Tell us about your business. We\u2019ll recommend the right device, handle the setup, and have you accepting payments by the end of the week.';
        el.style.color = "#555";
      }
    });

    /* Style labels */
    section.querySelectorAll("label").forEach(function(el) {
      el.style.color = "#333";
    });

    /* ── Insert trust + promise strip above form ── */
    var form = section.querySelector("form");
    if (!form) return;

    var trust = document.createElement("div");
    trust.className = "pbrd-pos-trust";
    trust.innerHTML =
      '<div class="pbrd-pos-trust-item">' +
        '<div class="pbrd-pos-trust-icon pbrd-pos-trust-icon--speed"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div><span class="pbrd-pos-trust-val">48h delivery</span><span class="pbrd-pos-trust-lbl">Terminal at your door</span></div>' +
      '</div>' +
      '<div class="pbrd-pos-trust-item">' +
        '<div class="pbrd-pos-trust-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="1.5"/></svg></div>' +
        '<div><span class="pbrd-pos-trust-val">Free consult</span><span class="pbrd-pos-trust-lbl">We\u2019ll call you back</span></div>' +
      '</div>' +
      '<div class="pbrd-pos-trust-item">' +
        '<div class="pbrd-pos-trust-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" stroke-width="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div><span class="pbrd-pos-trust-val">No commitment</span><span class="pbrd-pos-trust-lbl">Cancel anytime</span></div>' +
      '</div>';

    form.parentNode.insertBefore(trust, form);

    /* ── Style all form inputs via JS for guaranteed override ── */
    section.querySelectorAll("input:not([type=submit]):not([type=checkbox]):not([type=hidden]), textarea, select").forEach(function(el) {
      el.style.setProperty("background", "#f5f5f7", "important");
      el.style.setProperty("border", "1.5px solid #e0e0e5", "important");
      el.style.setProperty("border-radius", "10px", "important");
      el.style.setProperty("color", "#111", "important");
      el.style.setProperty("padding", "12px 16px", "important");
      el.addEventListener("focus", function() {
        el.style.setProperty("border-color", "#6319f0", "important");
        el.style.setProperty("box-shadow", "0 0 0 3px rgba(99,25,240,0.08)", "important");
        el.style.setProperty("background", "#fff", "important");
      });
      el.addEventListener("blur", function() {
        el.style.setProperty("border-color", "#e0e0e5", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("background", "#f5f5f7", "important");
      });
    });

    /* ── Find and restyle ALL buttons in the form area ── */
    section.querySelectorAll('input[type="submit"], button[type="submit"], .w-button, a.button, [data-wait], button, .w-slider-arrow-left, .w-slider-arrow-right').forEach(function(btn) {
      /* Skip if it's not visible or is a back/prev button */
      if (btn.offsetHeight === 0) return;
      var text = (btn.value || btn.textContent || "").toLowerCase().trim();
      if (text === "back" || text === "previous") return;

      btn.style.setProperty("background", "#6319f0", "important");
      btn.style.setProperty("color", "#fff", "important");
      btn.style.setProperty("border", "none", "important");
      btn.style.setProperty("border-radius", "100px", "important");
      btn.style.setProperty("padding", "12px 32px", "important");
      btn.style.setProperty("font-size", "0.875rem", "important");
      btn.style.setProperty("font-weight", "600", "important");
      btn.style.setProperty("cursor", "pointer", "important");
      btn.style.setProperty("white-space", "nowrap", "important");
      btn.style.setProperty("min-width", "auto", "important");
      btn.style.setProperty("width", "auto", "important");
      btn.style.setProperty("height", "auto", "important");
      btn.style.setProperty("line-height", "1.4", "important");
      btn.style.setProperty("display", "inline-flex", "important");
      btn.style.setProperty("align-items", "center", "important");
      btn.style.setProperty("justify-content", "center", "important");

      if (text === "next" || text === "submit" || text === "send") {
        if (btn.tagName === "INPUT") {
          btn.value = "Continue \u2192";
        } else {
          btn.textContent = "Continue \u2192";
        }
      }
    });

    /* ── Add bottom note under form ── */
    var note = document.createElement("p");
    note.className = "pbrd-pos-form-note";
    note.innerHTML = 'Typically responds within 2 hours during business days. Free SIM + data plan included with every terminal.';
    form.parentNode.insertBefore(note, form.nextSibling);
  }

  /* ═══════════════════════════════════════════ */
  /* Copy Fixes                                  */
  /* ═══════════════════════════════════════════ */

  function fixCopy() {
    /* Fix "Loyality" typo */
    document.querySelectorAll("h2, h3, h4, p").forEach(function (el) {
      if (el.textContent.includes("Loyality")) {
        el.textContent = el.textContent.replace("Loyality", "Loyalty");
      }
    });
    /* Fix rental section editorial note */
    document.querySelectorAll("p").forEach(function (el) {
      if (el.textContent.includes("Take out the part about insurance")) {
        el.textContent = el.textContent.replace(/\s*Take out the part about insurance\.\s*/g, " ").trim();
      }
    });
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                        */
  /* ═══════════════════════════════════════════ */

  /* ─── Pricing section — real constellation starfield ─── */
  function initPricingCanvas() {
    var canvas = document.getElementById("pbrd-pricing-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var W = 0, H = 0;

    function resize() {
      var section = canvas.parentElement;
      W = section.offsetWidth;
      H = section.offsetHeight;
      if (!W || !H) return;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* Delay initial resize to let section layout settle */
    setTimeout(resize, 300);
    window.addEventListener("resize", resize);

    /*
     * Real constellation patterns — normalized coords [0-1]
     * Each placed in a region of the section so they don't overlap content
     */
    var constellations = [
      /* ── Orion (top-left) ── */
      { ox: 0.03, oy: 0.02, scale: 0.16, stars: [
        { x: 0.3, y: 0.0, m: 1.8 },   /* Betelgeuse */
        { x: 0.7, y: 0.05, m: 1.4 },   /* Bellatrix */
        { x: 0.35, y: 0.4, m: 1.0 },   /* Belt 1 */
        { x: 0.5, y: 0.42, m: 1.2 },   /* Belt 2 (Alnilam) */
        { x: 0.65, y: 0.44, m: 1.0 },  /* Belt 3 */
        { x: 0.25, y: 0.85, m: 1.5 },  /* Saiph */
        { x: 0.75, y: 0.9, m: 1.9 },   /* Rigel */
      ], edges: [[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]] },

      /* ── Cassiopeia W (top-right) ── */
      { ox: 0.78, oy: 0.01, scale: 0.18, stars: [
        { x: 0.0, y: 0.3, m: 1.4 },
        { x: 0.22, y: 0.0, m: 1.6 },
        { x: 0.45, y: 0.35, m: 1.8 },  /* Gamma — brightest */
        { x: 0.68, y: 0.05, m: 1.3 },
        { x: 0.9, y: 0.4, m: 1.5 },
      ], edges: [[0,1],[1,2],[2,3],[3,4]] },

      /* ── Leo (mid-left edge) ── */
      { ox: 0.0, oy: 0.35, scale: 0.14, stars: [
        { x: 0.0, y: 0.5, m: 1.7 },    /* Regulus */
        { x: 0.25, y: 0.2, m: 1.1 },
        { x: 0.5, y: 0.0, m: 1.3 },
        { x: 0.7, y: 0.15, m: 1.0 },
        { x: 0.85, y: 0.4, m: 1.2 },
        { x: 0.6, y: 0.7, m: 1.0 },
        { x: 0.3, y: 0.8, m: 0.9 },
      ], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]] },

      /* ── Lyra (mid-right edge) ── */
      { ox: 0.86, oy: 0.38, scale: 0.11, stars: [
        { x: 0.5, y: 0.0, m: 2.0 },    /* Vega — very bright */
        { x: 0.3, y: 0.45, m: 0.9 },
        { x: 0.7, y: 0.45, m: 0.9 },
        { x: 0.2, y: 0.9, m: 0.8 },
        { x: 0.8, y: 0.9, m: 0.8 },
      ], edges: [[0,1],[0,2],[1,3],[2,4],[3,4]] },

      /* ── Crux / Southern Cross (bottom-left) ── */
      { ox: 0.08, oy: 0.72, scale: 0.10, stars: [
        { x: 0.5, y: 0.0, m: 1.6 },
        { x: 0.0, y: 0.5, m: 1.3 },
        { x: 1.0, y: 0.5, m: 1.3 },
        { x: 0.5, y: 1.0, m: 1.5 },
      ], edges: [[0,3],[1,2]] },

      /* ── Gemini (bottom-right) ── */
      { ox: 0.76, oy: 0.7, scale: 0.15, stars: [
        { x: 0.15, y: 0.0, m: 1.7 },   /* Castor */
        { x: 0.3, y: 0.05, m: 1.8 },   /* Pollux */
        { x: 0.1, y: 0.35, m: 0.9 },
        { x: 0.35, y: 0.4, m: 1.0 },
        { x: 0.0, y: 0.7, m: 0.8 },
        { x: 0.25, y: 0.75, m: 0.9 },
        { x: 0.45, y: 0.95, m: 1.1 },
      ], edges: [[0,2],[2,4],[1,3],[3,5],[5,6]] },

      /* ── Ursa Minor (center-top, very faint behind heading) ── */
      { ox: 0.4, oy: 0.05, scale: 0.12, stars: [
        { x: 0.9, y: 0.0, m: 1.9 },    /* Polaris */
        { x: 0.75, y: 0.3, m: 0.8 },
        { x: 0.6, y: 0.2, m: 0.7 },
        { x: 0.35, y: 0.5, m: 0.9 },
        { x: 0.2, y: 0.7, m: 0.8 },
        { x: 0.4, y: 0.85, m: 0.7 },
        { x: 0.15, y: 1.0, m: 0.9 },
      ], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
    ];

    /* Flatten into renderable arrays */
    var allStars = [];
    var allEdges = [];

    constellations.forEach(function(c) {
      var baseIdx = allStars.length;
      c.stars.forEach(function(s) {
        allStars.push({
          x: c.ox + s.x * c.scale,
          y: c.oy + s.y * c.scale,
          m: s.m,                        /* magnitude = brightness + size */
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.4 + Math.random() * 1.2,
          twinkleDepth: 0.6 + Math.random() * 0.35   /* deep fade — nearly invisible at min */
        });
      });
      c.edges.forEach(function(e) {
        allEdges.push({ a: baseIdx + e[0], b: baseIdx + e[1] });
      });
    });

    /* Ambient dust — tiny background stars */
    var dust = [];
    for (var d = 0; d < 60; d++) {
      dust.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5
      });
    }

    var time = 0;
    var running = true;

    function draw() {
      if (!running) return;
      if (!W || !H) { resize(); requestAnimationFrame(draw); return; }
      time += 0.016;
      ctx.clearRect(0, 0, W, H);

      /* ── Background dust — tiny twinkling specks ── */
      for (var dd = 0; dd < dust.length; dd++) {
        var dt = dust[dd];
        var da = 0.08 + 0.07 * Math.sin(time * dt.speed + dt.phase);
        ctx.beginPath();
        ctx.arc(dt.x * W, dt.y * H, dt.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,25,240," + da + ")";
        ctx.fill();
      }

      /* ── Constellation lines — ethereal hairlines ── */
      for (var e = 0; e < allEdges.length; e++) {
        var edge = allEdges[e];
        var sa = allStars[edge.a], sb = allStars[edge.b];
        var gA = 1 - allStars[edge.a].twinkleDepth * (0.5 + 0.5 * Math.sin(time * sa.twinkleSpeed + sa.phase));
        var gB = 1 - allStars[edge.b].twinkleDepth * (0.5 + 0.5 * Math.sin(time * sb.twinkleSpeed + sb.phase));
        var lineAlpha = Math.min(gA, gB) * 0.14;

        ctx.beginPath();
        ctx.moveTo(sa.x * W, sa.y * H);
        ctx.lineTo(sb.x * W, sb.y * H);
        ctx.strokeStyle = "rgba(99,25,240," + lineAlpha + ")";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      /* ── Stars — twinkle with glow halo ── */
      for (var s = 0; s < allStars.length; s++) {
        var star = allStars[s];
        var sx = star.x * W, sy = star.y * H;

        /* Twinkle: smooth sinusoidal oscillation */
        var brightness = 1 - star.twinkleDepth * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.phase));
        var baseAlpha = 0.25 + 0.35 * (star.m / 2.0);
        var alpha = baseAlpha * brightness;
        var radius = star.m * 0.9;

        /* Soft halo */
        var haloR = radius * 7;
        var halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, haloR);
        halo.addColorStop(0, "rgba(99,25,240," + (alpha * 0.6) + ")");
        halo.addColorStop(0.4, "rgba(99,25,240," + (alpha * 0.18) + ")");
        halo.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(sx, sy, haloR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        /* Star core */
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,25,240," + (alpha + 0.15) + ")";
        ctx.fill();

        /* Bright center pinpoint for major stars */
        if (star.m > 1.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, 0.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(130,60,255," + (alpha * 1.8) + ")";
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    }

    var observer = new IntersectionObserver(function(entries) {
      running = entries[0].isIntersecting;
      if (running) draw();
    }, { threshold: 0.05 });
    observer.observe(canvas.parentElement);

    draw();
  }

  function init() {
    fixCopy();
    enhanceHero();
    buildLineup();
    enhancePlatform();
    buildUseCases();
    buildSpecTabs();
    enhanceRental();
    buildValueAdds();
    enhanceContact();
    initPricingCanvas();
    console.log("[Paybyrd] POS enhancements loaded");
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — Payment Methods Page Enhancements */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/payment-methods")) return;

  var checkSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ─── Reusable scroll-reveal ─── */
  function observeReveal(selector, staggerMs, root) {
    var els = (root || document).querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("pbrd-visible"); });
      return;
    }
    var idx = 0;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var i = idx++;
          setTimeout(function () { entry.target.classList.add("pbrd-visible"); }, i * staggerMs);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(function (e) { observer.observe(e); });
  }

  /* ─── Find section by heading text ─── */
  function findSectionByHeading(text) {
    var found = null;
    document.querySelectorAll("h1, h2, h3").forEach(function (h) {
      if (!found && h.textContent.toLowerCase().includes(text.toLowerCase())) {
        found = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    return found;
  }

  /* ═══════════════════════════════════════════ */
  /* Section 1: Hero Enhancement                 */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heading = null;
    document.querySelectorAll("h1, h2").forEach(function (h) {
      if (!heading && h.textContent.toLowerCase().includes("all payment methods")) {
        heading = h;
      }
    });
    if (!heading) return;

    /* Insert kicker above heading */
    var kicker = document.createElement("div");
    kicker.className = "pbrd-pm-hero-kicker pbrd-pm-reveal";
    kicker.textContent = "PAYMENT METHODS";
    heading.parentNode.insertBefore(kicker, heading);

    /* Hide original Webflow kicker if it exists above our heading */
    var prev = heading.previousElementSibling;
    while (prev) {
      var pt = prev.textContent.toLowerCase().trim();
      if (pt === "payment methods" || pt.includes("payment method")) {
        prev.style.display = "none";
        break;
      }
      prev = prev.previousElementSibling;
    }

    /* Rewrite heading */
    heading.innerHTML = "Every way your customers<br>want to pay.";
    heading.style.color = "#fff";
    heading.style.marginBottom = "16px";

    /* Find subtitle — could be next sibling or inside a wrapper */
    var subtitle = heading.nextElementSibling;
    if (subtitle && subtitle.tagName === "P") {
      subtitle.textContent = "From global card networks to local wallets \u2014 accept payments however your customers prefer. One integration, worldwide coverage.";
      subtitle.style.color = "rgba(255,255,255,0.5)";
    } else {
      /* Create subtitle if none found */
      subtitle = document.createElement("p");
      subtitle.textContent = "From global card networks to local wallets \u2014 accept payments however your customers prefer. One integration, worldwide coverage.";
      subtitle.style.color = "rgba(255,255,255,0.5)";
      subtitle.style.fontSize = "1rem";
      subtitle.style.lineHeight = "1.6";
      subtitle.style.maxWidth = "600px";
      subtitle.style.margin = "12px auto 0";
      heading.parentNode.insertBefore(subtitle, heading.nextSibling);
    }

    /* Add stat strip */
    var stats = document.createElement("div");
    stats.className = "pbrd-pm-hero-stats";
    stats.innerHTML =
      '<div class="pbrd-pm-hero-stat pbrd-pm-reveal">' +
        '<span class="pbrd-pm-hero-stat-val">20+</span>' +
        '<span class="pbrd-pm-hero-stat-lbl">Payment Methods</span>' +
      '</div>' +
      '<div class="pbrd-pm-hero-stat pbrd-pm-reveal">' +
        '<span class="pbrd-pm-hero-stat-val">40+</span>' +
        '<span class="pbrd-pm-hero-stat-lbl">Countries</span>' +
      '</div>' +
      '<div class="pbrd-pm-hero-stat pbrd-pm-reveal">' +
        '<span class="pbrd-pm-hero-stat-val">Full</span>' +
        '<span class="pbrd-pm-hero-stat-lbl">Cards, Wallets & Local</span>' +
      '</div>' +
      '<div class="pbrd-pm-hero-stat pbrd-pm-reveal">' +
        '<span class="pbrd-pm-hero-stat-val">Instant</span>' +
        '<span class="pbrd-pm-hero-stat-lbl">Settlement</span>' +
      '</div>';

    /* Insert after subtitle or heading */
    var insertAfter = subtitle || heading;
    insertAfter.parentNode.insertBefore(stats, insertAfter.nextSibling);

    /* ── Animated payment icons floating behind heading ── */
    /* Find a real positioned ancestor — skip display:contents wrappers */
    var heroWrap = heading.parentElement;
    while (heroWrap && heroWrap.tagName !== "BODY") {
      var hcs = window.getComputedStyle(heroWrap);
      if (hcs.display !== "contents" && hcs.display !== "inline") break;
      heroWrap = heroWrap.parentElement;
    }
    if (heroWrap && heroWrap.tagName !== "BODY") {
      heroWrap.style.setProperty("position", "relative", "important");
      heroWrap.style.setProperty("overflow", "hidden", "important");

      var floatLayer = document.createElement("div");
      floatLayer.setAttribute("style",
        "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;"
      );

      var symbols = ["$", "\u20AC", "\u00A3", "\u00A5", "\u20BF", "NFC", "PAY", "\u26A1", "$", "\u20AC", "\u00A5", "\u20BF"];
      symbols.forEach(function(sym, i) {
        var el = document.createElement("span");
        el.textContent = sym;
        var size = 12 + Math.floor(Math.random() * 14);
        var left = 5 + Math.floor(Math.random() * 90);
        var dur = 10 + Math.floor(Math.random() * 8);
        var delay = i * 1.5;
        el.setAttribute("style",
          "position:absolute;bottom:-30px;font-weight:700;font-family:system-ui,sans-serif;" +
          "pointer-events:none;color:rgba(96,165,250,0.08);" +
          "font-size:" + size + "px;left:" + left + "%;" +
          "animation:pbrd-pm-float-up " + dur + "s linear " + delay + "s infinite;"
        );
        floatLayer.appendChild(el);
      });

      heroWrap.insertBefore(floatLayer, heroWrap.firstChild);

      /* Keep heading content above */
      heading.style.setProperty("position", "relative", "important");
      heading.style.setProperty("z-index", "1", "important");
      if (subtitle) {
        subtitle.style.setProperty("position", "relative", "important");
        subtitle.style.setProperty("z-index", "1", "important");
      }
      stats.style.setProperty("position", "relative", "important");
      stats.style.setProperty("z-index", "1", "important");
      kicker.style.setProperty("position", "relative", "important");
      kicker.style.setProperty("z-index", "1", "important");
    }

    observeReveal(".pbrd-pm-reveal", 100);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 2: Payment Grid Enhancement         */
  /* ═══════════════════════════════════════════ */

  function enhanceGrid() {
    /*
     * Elegant approach: find a leaf text node with exact payment method name,
     * then walk UP the DOM to find the level where siblings represent other
     * payment method cards. That parent = the grid.
     */
    var targetNames = ["Visa", "Mastercard", "Google Pay", "Apple Pay", "PayPal", "Klarna"];
    var gridContainer = null;
    var cards = [];

    /* Step 1: Find a leaf element whose trimmed text is exactly a payment method name */
    var seedEl = null;
    for (var n = 0; n < targetNames.length; n++) {
      if (seedEl) break;
      var allEls = document.querySelectorAll("div, span, p, h3, h4, h5");
      for (var e = 0; e < allEls.length; e++) {
        var el = allEls[e];
        /* Must be a leaf-ish element — few or no child elements */
        if (el.children.length > 2) continue;
        /* Text must match exactly (not a parent that contains it somewhere) */
        var directText = el.textContent.trim();
        if (directText === targetNames[n]) {
          seedEl = el;
          console.log("[Paybyrd] Seed found: '" + targetNames[n] + "' in <" + el.tagName + "> class='" + el.className + "'");
          break;
        }
      }
    }

    if (!seedEl) {
      console.log("[Paybyrd] No seed payment method element found");
      return;
    }

    /* Step 2: Walk up from seedEl. At each level, check if the parent's children
       collectively contain multiple different payment method names.
       The grid is where siblings each represent ONE card. */
    var walker = seedEl;
    for (var depth = 0; depth < 12; depth++) {
      var parent = walker.parentElement;
      if (!parent) break;
      var children = Array.prototype.slice.call(parent.children);

      /* Count how many children each contain EXACTLY ONE unique payment method name */
      var childMethodCount = 0;
      children.forEach(function(child) {
        var txt = child.textContent;
        var hasMethod = targetNames.some(function(name) { return txt.indexOf(name) > -1; });
        if (hasMethod) childMethodCount++;
      });

      console.log("[Paybyrd] Walkup depth=" + depth + " tag=" + parent.tagName +
        " class='" + (parent.className || "").substring(0, 40) + "'" +
        " children=" + children.length + " methodChildren=" + childMethodCount);

      /* The grid: multiple children contain payment method names, and there are many children.
         At depth 4 we see 20 children with 5 matches — that's our grid. */
      if (childMethodCount >= 4 && children.length >= 15) {
        gridContainer = parent;
        cards = children;
        console.log("[Paybyrd] Grid found at depth " + depth + "! " + cards.length + " cards.");
        break;
      }

      walker = parent;
    }

    if (!gridContainer || cards.length === 0) {
      console.log("[Paybyrd] Grid not found after walkup.");
      return;
    }

    /* ── Add missing payment methods: NuPay, Ethereum, Bitcoin ── */
    var newMethods = [
      { name: "NuPay", type: "Digital Wallet", region: "Worldwide",
        icon: '<img src="https://djangato.github.io/Webflow-Paybyrd/assets/pos/nupay.png" width="64" height="64" alt="NuPay" style="border-radius:14px;object-fit:contain;">' },
      { name: "Ethereum", type: "Cryptocurrency", region: "Worldwide",
        icon: '<svg viewBox="0 0 64 64" width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<rect width="64" height="64" rx="14" fill="#627EEA"/>' +
          '<path d="M32 8 L48 32 L32 42 L16 32 Z" fill="rgba(255,255,255,0.9)"/>' +
          '<path d="M32 42 L48 32 L32 56 L16 32 Z" fill="rgba(255,255,255,0.6)"/>' +
          '<path d="M32 8 L32 26 L46 32 Z" fill="rgba(255,255,255,0.7)"/>' +
          '<path d="M32 8 L32 26 L18 32 Z" fill="rgba(255,255,255,1)"/>' +
          '</svg>' },
      { name: "Bitcoin", type: "Cryptocurrency", region: "Worldwide",
        icon: '<svg viewBox="0 0 64 64" width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<rect width="64" height="64" rx="14" fill="#F7931A"/>' +
          '<path d="M42.5 28.2c.6-4-2.4-6.2-6.6-7.6l1.4-5.4-3.3-.8-1.3 5.3c-.9-.2-1.8-.4-2.6-.6l1.3-5.3-3.3-.8-1.4 5.4c-.7-.2-1.4-.3-2.1-.5l-4.5-1.1-.9 3.5s2.4.6 2.4.6c1.3.3 1.6 1.2 1.5 1.9l-1.5 6.2c.1 0 .2 0 .3.1l-.3-.1-2.2 8.7c-.2.4-.6 1.1-1.5.8 0 0-2.4-.6-2.4-.6l-1.7 3.8 4.3 1.1c.8.2 1.6.4 2.3.6l-1.4 5.5 3.3.8 1.4-5.4c.9.2 1.8.5 2.6.7l-1.3 5.4 3.3.8 1.4-5.5c5.7 1.1 10 .6 11.8-4.5 1.5-4.1-.1-6.5-3-8 2.1-.5 3.7-1.9 4.2-4.8Z" fill="#fff"/>' +
          '</svg>' }
    ];

    /* Clone a card to use as template */
    var templateCard = cards[0];
    newMethods.forEach(function(pm) {
      var newCard = templateCard.cloneNode(true);
      /* Clear and set content — find the text elements */
      var imgs = newCard.querySelectorAll("img");
      imgs.forEach(function(img) { img.style.display = "none"; });
      /* Insert SVG icon — match Webflow's 64px size */
      var imgWrap = newCard.querySelector("[class*='image']") || newCard.querySelector("img");
      if (imgWrap) {
        var iconDiv = document.createElement("div");
        iconDiv.innerHTML = pm.icon;
        iconDiv.style.width = "64px";
        iconDiv.style.height = "64px";
        iconDiv.style.flexShrink = "0";
        var parent = imgWrap.parentElement || imgWrap;
        parent.insertBefore(iconDiv, imgWrap);
      }
      /* Update text content */
      var allText = newCard.querySelectorAll("div, span, p");
      var nameSet = false, typeSet = false;
      allText.forEach(function(el) {
        if (el.children.length > 0) return;
        var t = el.textContent.trim();
        if (!nameSet && t.length > 0 && t.length < 30 && !t.includes("Coming") && !t.includes("Latest") && !t.includes("Worldwide") && !t.includes("Europe") && !t.includes("Mobile") && !t.includes("Credit")) {
          el.textContent = pm.name;
          nameSet = true;
        } else if (!typeSet && (t.includes("Mobile") || t.includes("Credit") || t.includes("Debit") || t.includes("Buy Now"))) {
          el.textContent = pm.type;
          typeSet = true;
        }
      });
      /* Hide badges on new cards (no badge needed) */
      newCard.querySelectorAll("[class*='tag'], [class*='badge'], [class*='gradient']").forEach(function(badge) {
        badge.style.display = "none";
      });
      gridContainer.appendChild(newCard);
      cards.push(newCard);
    });

    /* ── Categorize all cards ── */
    var categories = {
      "all": [],
      "cards": [],
      "wallets": [],
      "local": [],
      "bnpl": [],
      "crypto": []
    };

    var cardWalletNames = ["google pay", "samsung pay", "apple pay", "revolut pay", "paypal", "nupay"];
    var cardNetworkNames = ["visa", "mastercard", "american express", "discover", "diners club", "china union pay"];
    var localNames = ["mbway", "multibanco", "ideal", "multicaixa", "pix", "sepa"];
    var bnplNames = ["klarna", "floa"];
    var cryptoNames = ["ethereum", "bitcoin"];

    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      card.classList.add("pbrd-pm-card-enhanced");
      card.setAttribute("data-pm-cat", "all");
      categories.all.push(card);

      if (cardNetworkNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-cat", card.getAttribute("data-pm-cat") + " cards");
        categories.cards.push(card);
      }
      if (cardWalletNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-cat", card.getAttribute("data-pm-cat") + " wallets");
        categories.wallets.push(card);
      }
      if (localNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-cat", card.getAttribute("data-pm-cat") + " local");
        categories.local.push(card);
      }
      if (bnplNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-cat", card.getAttribute("data-pm-cat") + " bnpl");
        categories.bnpl.push(card);
      }
      if (cryptoNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-cat", card.getAttribute("data-pm-cat") + " crypto");
        categories.crypto.push(card);
      }

      /* Enhance badge styling — remove "Coming Soon", style "Latest" */
      card.querySelectorAll("[class*='tag'], [class*='badge'], [class*='gradient']").forEach(function (badge) {
        var bt = badge.textContent.toLowerCase().trim();
        if (bt.includes("coming soon")) {
          badge.style.display = "none";
        } else if (bt.includes("latest")) {
          badge.classList.add("pbrd-pm-badge-latest");
        }
      });
    });

    /* ── Build category tabs ── */
    var tabData = [
      { key: "all", label: "All (" + categories.all.length + ")" },
      { key: "cards", label: "Cards" },
      { key: "wallets", label: "Digital Wallets" },
      { key: "local", label: "Local Methods" },
      { key: "bnpl", label: "Buy Now Pay Later" },
      { key: "crypto", label: "Crypto" }
    ];

    var tabsWrap = document.createElement("div");
    tabsWrap.className = "pbrd-pm-tabs";

    var counterEl = document.createElement("div");
    counterEl.className = "pbrd-pm-counter";
    counterEl.textContent = "Showing " + categories.all.length + " of " + categories.all.length + " methods";

    tabData.forEach(function (t) {
      /* Skip empty categories */
      if (t.key !== "all" && categories[t.key] && categories[t.key].length === 0) return;

      var btn = document.createElement("button");
      btn.className = "pbrd-pm-tab" + (t.key === "all" ? " pbrd-pm-tab--active" : "");
      btn.textContent = t.label;

      btn.addEventListener("click", function () {
        tabsWrap.querySelectorAll(".pbrd-pm-tab").forEach(function (b) {
          b.classList.remove("pbrd-pm-tab--active");
        });
        btn.classList.add("pbrd-pm-tab--active");

        var visibleCount = 0;
        cards.forEach(function (card) {
          var cats = card.getAttribute("data-pm-cat") || "";
          if (t.key === "all" || cats.indexOf(t.key) > -1) {
            card.style.display = "";
            visibleCount++;
          } else {
            card.style.display = "none";
          }
        });

        counterEl.textContent = "Showing " + visibleCount + " of " + categories.all.length + " methods";
      });

      tabsWrap.appendChild(btn);
    });

    /* Insert tabs and counter ABOVE the grid.
       The grid lives inside: u-grid > u-grid-wrapper > u-layout-column > u-layout
       We need to go up to u-layout level and insert before it, because
       the intermediary wrappers use display:contents. */
    var layoutAncestor = gridContainer;
    var safety = 0;
    while (layoutAncestor && safety < 15) {
      safety++;
      var p = layoutAncestor.parentElement;
      if (!p || p.tagName === "BODY") break;
      /* Stop when we find a parent that is NOT display:contents and has meaningful layout */
      var pcs = window.getComputedStyle(p);
      if (pcs.display !== "contents" && p.children.length > 1) {
        break;
      }
      if (pcs.display !== "contents" && p.className && (p.className.indexOf("section") > -1 || p.className.indexOf("container") > -1)) {
        break;
      }
      layoutAncestor = p;
    }

    /* Create a wrapper div for tabs + counter so they don't get affected by parent grid */
    var filterWrap = document.createElement("div");
    filterWrap.setAttribute("style", "width:100%;grid-column:1/-1;margin-bottom:12px;");
    filterWrap.appendChild(tabsWrap);
    filterWrap.appendChild(counterEl);

    /* Insert before the layout ancestor */
    if (layoutAncestor && layoutAncestor.parentElement) {
      layoutAncestor.parentElement.insertBefore(filterWrap, layoutAncestor);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 3: Integration Enhancement          */
  /* ═══════════════════════════════════════════ */

  function enhanceIntegration() {
    var section = findSectionByHeading("seamless integration") || findSectionByHeading("systems you already trust");
    if (!section) return;

    /* Add stats + pills + CTA below the orbit */
    var footer = document.createElement("div");
    footer.className = "pbrd-pm-int-footer";

    footer.innerHTML =
      '<div class="pbrd-pm-int-stats">' +
        '<div class="pbrd-pm-int-stat pbrd-pm-reveal"><div class="pbrd-pm-int-stat-val">50+</div><div class="pbrd-pm-int-stat-lbl">Integrations</div></div>' +
        '<div class="pbrd-pm-int-stat pbrd-pm-reveal"><div class="pbrd-pm-int-stat-val">Plug & Play</div><div class="pbrd-pm-int-stat-lbl">Setup</div></div>' +
        '<div class="pbrd-pm-int-stat pbrd-pm-reveal"><div class="pbrd-pm-int-stat-val">REST API</div><div class="pbrd-pm-int-stat-lbl">Open Architecture</div></div>' +
      '</div>' +
      '<div class="pbrd-pm-int-pills pbrd-pm-reveal">' +
        '<span class="pbrd-pm-int-pill">Shopify</span>' +
        '<span class="pbrd-pm-int-pill">WooCommerce</span>' +
        '<span class="pbrd-pm-int-pill">Magento</span>' +
        '<span class="pbrd-pm-int-pill">SAP</span>' +
        '<span class="pbrd-pm-int-pill">Salesforce</span>' +
        '<span class="pbrd-pm-int-pill">Oracle</span>' +
        '<span class="pbrd-pm-int-pill">Custom API</span>' +
      '</div>' +
      '<div class="pbrd-pm-reveal">' +
        '<a href="/book-demo" class="pbrd-pm-int-cta">Explore integrations \u2192</a>' +
      '</div>';

    /* Find the orbit scene and insert after it */
    var orbitScene = section.querySelector("[class*='arc_scene'], [class*='orbit'], [class*='integration']");
    if (orbitScene) {
      orbitScene.parentNode.insertBefore(footer, orbitScene.nextSibling);
    } else {
      section.appendChild(footer);
    }

    observeReveal(".pbrd-pm-reveal", 120, section);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 4: Contact Form Polish              */
  /* ═══════════════════════════════════════════ */

  function enhanceContact() {
    var section = findSectionByHeading("missing a payment method") || findSectionByHeading("we've got you");
    if (!section) return;

    /* ── Detect if section bg is light or dark ── */
    var sectionBg = window.getComputedStyle(section).backgroundColor;
    var isLight = true;
    if (sectionBg) {
      var match = sectionBg.match(/\d+/g);
      if (match && match.length >= 3) {
        var brightness = (parseInt(match[0]) * 299 + parseInt(match[1]) * 587 + parseInt(match[2]) * 114) / 1000;
        isLight = brightness > 128;
      }
    }

    var textColor = isLight ? "#111" : "#fff";
    var subtextColor = isLight ? "#555" : "rgba(255,255,255,0.5)";
    var inputBg = isLight ? "#f5f5f7" : "rgba(255,255,255,0.05)";
    var inputBorder = isLight ? "#ddd" : "rgba(255,255,255,0.1)";
    var inputText = isLight ? "#111" : "#fff";
    var inputFocusBg = isLight ? "#fff" : "rgba(255,255,255,0.08)";
    var iconBg = isLight ? "rgba(37,99,235,0.08)" : "rgba(96,165,250,0.1)";
    var iconColor = isLight ? "#2563eb" : "#60a5fa";
    var trustValColor = isLight ? "#111" : "#fff";
    var trustLblColor = isLight ? "#888" : "rgba(255,255,255,0.4)";

    /* Rewrite heading */
    section.querySelectorAll("h1,h2,h3").forEach(function (h) {
      if (h.textContent.toLowerCase().includes("missing")) {
        h.innerHTML = "Need a specific payment method<br>or integration?";
        h.style.setProperty("color", textColor, "important");
      }
    });

    /* Rewrite subtitle */
    section.querySelectorAll("p").forEach(function (p) {
      if (p.textContent.toLowerCase().includes("open-source api") || p.textContent.toLowerCase().includes("tailored solution")) {
        p.textContent = "We add new payment methods every month. If yours isn\u2019t listed yet, our open REST API can connect anything \u2014 or we\u2019ll build the integration for you.";
        p.style.setProperty("color", subtextColor, "important");
      }
    });

    /* Labels */
    section.querySelectorAll("label").forEach(function (el) {
      el.style.setProperty("color", textColor, "important");
    });

    /* Style form inputs — adaptive to bg */
    section.querySelectorAll("input:not([type=submit]):not([type=checkbox]):not([type=radio]):not([type=hidden]), textarea, select").forEach(function (el) {
      el.style.setProperty("background", inputBg, "important");
      el.style.setProperty("border", "1.5px solid " + inputBorder, "important");
      el.style.setProperty("border-radius", "10px", "important");
      el.style.setProperty("color", inputText, "important");
      el.addEventListener("focus", function () {
        el.style.setProperty("border-color", "#2563eb", "important");
        el.style.setProperty("box-shadow", "0 0 0 3px rgba(37,99,235,0.1)", "important");
        el.style.setProperty("background", inputFocusBg, "important");
      });
      el.addEventListener("blur", function () {
        el.style.setProperty("border-color", inputBorder, "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("background", inputBg, "important");
      });
    });

    /* Style buttons */
    section.querySelectorAll("button, input[type=submit], .w-button").forEach(function (btn) {
      if (btn.offsetHeight === 0) return;
      var text = (btn.value || btn.textContent || "").toLowerCase().trim();
      if (text === "back" || text === "go back" || text === "previous") return;
      btn.style.setProperty("background", "#2563eb", "important");
      btn.style.setProperty("color", "#fff", "important");
      btn.style.setProperty("border", "none", "important");
      btn.style.setProperty("border-radius", "100px", "important");
      btn.style.setProperty("padding", "12px 32px", "important");
      btn.style.setProperty("font-weight", "600", "important");
      btn.style.setProperty("cursor", "pointer", "important");
      btn.style.setProperty("white-space", "nowrap", "important");
    });

    /* Insert trust badges — inline styles for guaranteed visibility */
    var form = section.querySelector("form");
    if (!form) return;

    var trust = document.createElement("div");
    trust.setAttribute("style", "display:flex;justify-content:center;gap:32px;margin-bottom:24px;flex-wrap:wrap;");

    var badges = [
      { icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', val: "99.9%", lbl: "Uptime SLA" },
      { icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" stroke-width="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', val: "PCI Level 1", lbl: "DSS Certified" },
      { icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5"/></svg>', val: "24/7", lbl: "Support" }
    ];

    badges.forEach(function(b) {
      var item = document.createElement("div");
      item.setAttribute("style", "display:flex;align-items:center;gap:10px;");
      item.innerHTML =
        '<div style="width:36px;height:36px;border-radius:10px;background:' + iconBg + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;color:' + iconColor + '">' +
          '<div style="width:18px;height:18px;">' + b.icon + '</div>' +
        '</div>' +
        '<div>' +
          '<div style="font-size:0.8125rem;font-weight:700;color:' + trustValColor + ';">' + b.val + '</div>' +
          '<div style="font-size:0.625rem;color:' + trustLblColor + ';">' + b.lbl + '</div>' +
        '</div>';
      trust.appendChild(item);
    });

    form.parentNode.insertBefore(trust, form);
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                        */
  /* ═══════════════════════════════════════════ */

  /* ═══════════════════════════════════════════ */
  /* Footer fix                                  */
  /* ═══════════════════════════════════════════ */

  function fixFooter() {
    /* Find footer by its unique heading text, or by footer tag */
    var footerSections = [];

    /* Method 1: find by "Finally, a payment provider" heading */
    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(function(h) {
      if (h.textContent.toLowerCase().indexOf("finally") > -1 && h.textContent.toLowerCase().indexOf("payment provider") > -1) {
        var sec = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
        if (sec) footerSections.push(sec);
      }
    });

    /* Method 2: footer tag */
    document.querySelectorAll("footer").forEach(function(f) {
      footerSections.push(f);
    });

    /* Method 3: sections containing privacy/terms links near bottom */
    document.querySelectorAll("a").forEach(function(a) {
      if (a.textContent.toLowerCase().indexOf("privacy policy") > -1) {
        var sec = a.closest("section") || a.closest("[class*='section']") || a.closest("footer");
        if (sec && footerSections.indexOf(sec) === -1) footerSections.push(sec);
      }
    });

    footerSections.forEach(function(footer) {
      /* Check if footer bg is dark — if so, fix text colors */
      var bg = window.getComputedStyle(footer).backgroundColor;
      var isDark = !bg || bg === "rgba(0, 0, 0, 0)" || bg.indexOf("rgb(0,") > -1 ||
                   bg.indexOf("rgb(10,") > -1 || bg.indexOf("rgb(17,") > -1 ||
                   bg.indexOf("rgb(8,") > -1;

      /* Also check: if most text is dark on a dark bg */
      footer.querySelectorAll("*").forEach(function(el) {
        if (el.children.length > 5) return; /* skip containers */
        var cs = window.getComputedStyle(el);
        var col = cs.color;
        /* Fix invisible text: very dark color on dark background */
        var isBlackText = col === "rgb(0, 0, 0)" || col.indexOf("rgb(17,") > -1 ||
                          col.indexOf("rgb(0, 0, 0)") > -1;
        if (isBlackText) {
          if (el.tagName === "A") {
            el.style.setProperty("color", "rgba(255,255,255,0.55)", "important");
          } else if (el.tagName === "H1" || el.tagName === "H2" || el.tagName === "H3" || el.tagName === "H4") {
            el.style.setProperty("color", "#fff", "important");
          } else {
            el.style.setProperty("color", "rgba(255,255,255,0.4)", "important");
          }
        }
      });
    });
  }

  function init() {
    enhanceHero();
    enhanceGrid();
    enhanceIntegration();
    enhanceContact();
    fixFooter();
    console.log("[Paybyrd] Payment Methods enhancements loaded");
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
/* Paybyrd — Airlines Page: Masterpiece Build */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/airlines")) return;

  function observeReveal(sel, ms, root) {
    var els = (root || document).querySelectorAll(sel);
    if (!("IntersectionObserver" in window)) { els.forEach(function(e){e.classList.add("pbrd-visible");}); return; }
    var i = 0;
    var o = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (en.isIntersecting) { var idx = i++; setTimeout(function(){en.target.classList.add("pbrd-visible");}, idx * ms); o.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(function(e) { o.observe(e); });
  }

  function findHeading(t) {
    var f = null;
    document.querySelectorAll("h1,h2,h3").forEach(function(h) {
      if (!f && h.textContent.toLowerCase().includes(t.toLowerCase())) f = h;
    }); return f;
  }

  function findSectionByHeading(t) {
    var h = findHeading(t);
    return h ? (h.closest("section") || h.closest("[class*='section']") || h.parentElement) : null;
  }

  function countUp(el, target, suffix, prefix) {
    suffix = suffix || ""; prefix = prefix || "";
    var dur = 1800, startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / dur, 1);
      el.textContent = prefix + Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════ */
  /* 1. HERO — Complete Takeover                 */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heading = findHeading("modern payments for airlines");
    if (!heading) return;
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    /* Hide the stock hero image and its column */
    section.querySelectorAll("img").forEach(function(img) {
      var wrap = img.closest("[class*='column'], [class*='layout-column']");
      if (wrap && !wrap.contains(heading)) {
        wrap.style.setProperty("display", "none", "important");
      }
      img.style.setProperty("display", "none", "important");
    });
    section.querySelectorAll("[class*='img_wrap'], [class*='image_wrap'], [class*='hero_img']").forEach(function(w) {
      w.style.setProperty("display", "none", "important");
    });

    /* Rewrite heading */
    heading.innerHTML = "The airline payment platform<br>that outperforms Adyen.";
    heading.style.setProperty("position", "relative", "important");
    heading.style.setProperty("z-index", "2", "important");

    /* Hide ALL old Webflow copy in the entire hero section */
    var parent = heading.parentElement;
    section.querySelectorAll("p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      if (t.includes("frictionless") || t.includes("future-proof") || t.includes("sacrificing") || t.includes("behind the scenes")) {
        p.style.setProperty("display", "none", "important");
      }
    });
    /* Also hide any paragraphs in heading's direct parent */
    parent.querySelectorAll("p").forEach(function(p) {
      p.style.setProperty("display", "none", "important");
    });

    /* Insert our own subtitle */
    var subtitle = document.createElement("p");
    subtitle.className = "pbrd-air-hero-sub";
    subtitle.innerHTML = "Higher approval rates. Lower fraud. Zero downtime.<br>Ask TAP Air Portugal.";
    parent.insertBefore(subtitle, heading.nextSibling);

    /* ── CTA row ── */
    var ctaRow = document.createElement("div");
    ctaRow.className = "pbrd-air-hero-actions pbrd-air-reveal";
    ctaRow.innerHTML =
      '<a href="/book-demo" class="pbrd-air-cta-primary">Book a 15-min Demo \u2192</a>' +
      '<a href="#benchmark" class="pbrd-air-cta-ghost">See the data \u2193</a>';
    parent.insertBefore(ctaRow, subtitle.nextSibling);

    /* ── Break out of Webflow's constrained column ── */
    /* The hero content is inside a layout column that caps width.
       We need to insert our viz OUTSIDE that column, at the section level. */
    var vizWrap = document.createElement("div");
    vizWrap.className = "pbrd-air-viz pbrd-air-reveal";

    /* SVG routes — from Lisbon hub outward */
    var LIS = "250,200";
    var routes = [
      { d: "M" + LIS + " Q340,110 440,120" },   /* LIS→LHR */
      { d: "M" + LIS + " Q160,100 70,110" },     /* LIS→JFK */
      { d: "M" + LIS + " Q350,140 460,150" },    /* LIS→FRA */
      { d: "M" + LIS + " Q190,280 140,330" },    /* LIS→GRU */
      { d: "M" + LIS + " Q400,160 560,190" },    /* LIS→DXB */
      { d: "M" + LIS + " Q310,280 360,310" },    /* LIS→LUA */
      { d: "M" + LIS + " Q450,80 620,130" },     /* LIS→NRT */
      { d: "M" + LIS + " Q400,240 430,290" },    /* LIS→MPM */
    ];

    var svgPaths = "";
    var svgDots = "";
    routes.forEach(function(r, i) {
      svgPaths +=
        '<path d="' + r.d + '" fill="none" stroke="rgba(14,165,233,0.18)" stroke-width="1.2" stroke-dasharray="4 4"/>' +
        '<circle r="4" fill="#0ea5e9" opacity="0">' +
          '<animateMotion dur="' + (3 + i * 0.5) + 's" begin="' + (i * 0.8) + 's" repeatCount="indefinite" path="' + r.d + '"/>' +
          '<animate attributeName="opacity" values="0;0.8;0.8;0" dur="' + (3 + i * 0.5) + 's" begin="' + (i * 0.8) + 's" repeatCount="indefinite"/>' +
        '</circle>';
    });

    /* City dots */
    var cities = [
      { x: 250, y: 200, n: "LIS", main: true },
      { x: 440, y: 120, n: "LHR" }, { x: 70, y: 110, n: "JFK" },
      { x: 460, y: 150, n: "FRA" }, { x: 140, y: 330, n: "GRU" },
      { x: 560, y: 190, n: "DXB" }, { x: 360, y: 310, n: "LUA" },
      { x: 620, y: 130, n: "NRT" }, { x: 430, y: 290, n: "MPM" },
    ];
    cities.forEach(function(c) {
      var r = c.main ? 6 : 3.5;
      var glow = c.main ? '<circle cx="' + c.x + '" cy="' + c.y + '" r="18" fill="rgba(14,165,233,0.08)"><animate attributeName="r" values="14;22;14" dur="3s" repeatCount="indefinite"/></circle>' : '';
      svgDots += glow +
        '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + r + '" fill="' + (c.main ? '#0ea5e9' : 'rgba(14,165,233,0.5)') + '"/>' +
        '<text x="' + (c.x + (c.main ? 10 : 6)) + '" y="' + (c.y - 6) + '" fill="rgba(255,255,255,' + (c.main ? '0.6' : '0.2') + ')" font-size="' + (c.main ? '9' : '7') + '" font-weight="600" font-family="system-ui">' + c.n + '</text>';
    });

    vizWrap.innerHTML =
      '<div class="pbrd-air-map-wrap">' +
        '<div class="pbrd-air-map-left">' +
        '<svg viewBox="0 0 700 380" fill="none" class="pbrd-air-map-svg" preserveAspectRatio="xMidYMid meet">' +
          svgPaths + svgDots +
        '</svg>' +
        '</div>' + /* close map-left */
        '<div class="pbrd-air-txn-feed">' +
          '<div class="pbrd-air-txn-feed-header"><div class="pbrd-air-txn-feed-dot"></div>LIVE TRANSACTIONS</div>' +
          '<div id="pbrd-air-feed"></div>' +
        '</div>' +
      '</div>';

    /* Insert viz at section level, positioned to overlap under the heading */
    section.style.setProperty("position", "relative", "important");
    section.style.setProperty("overflow", "visible", "important");
    section.style.setProperty("padding-bottom", "80px", "important");
    section.appendChild(vizWrap);

    var stats = ["+4.86% vs Checkout.com", "+3.16% vs Elavon", "+1.72% vs Adyen", "+4.92% vs Nuvei", "99.999% Uptime", "192+ Currencies", "16.8% Fewer Chargebacks"];
    var tickerHTML = stats.concat(stats).map(function(s) {
      return '<span class="pbrd-air-tick">' + s + '</span><span class="pbrd-air-tick-dot">\u00b7</span>';
    }).join("");
    var ticker = document.createElement("div");
    ticker.className = "pbrd-air-ticker-strip pbrd-air-reveal";
    ticker.innerHTML = '<div class="pbrd-air-ticker-track">' + tickerHTML + '</div>';
    section.appendChild(ticker);

    /* Init feed */
    setTimeout(initFeed, 600);
    observeReveal(".pbrd-air-reveal", 120);
  }

  /* ── Transaction feed ── */
  function initFeed() {
    var feed = document.getElementById("pbrd-air-feed");
    if (!feed) return;
    var txns = [
      { r: "LIS\u2192LHR", a: "\u20AC342", m: "Visa", t: "0.3s" },
      { r: "JFK\u2192LIS", a: "$1,247", m: "Amex", t: "0.4s" },
      { r: "CDG\u2192GRU", a: "\u20AC893", m: "MC", t: "0.2s" },
      { r: "FRA\u2192NRT", a: "\u00A5189k", m: "JCB", t: "0.5s" },
      { r: "LIS\u2192MPM", a: "\u20AC467", m: "MBWAY", t: "0.3s" },
      { r: "DXB\u2192SIN", a: "AED2.3k", m: "Visa", t: "0.2s" },
      { r: "LAX\u2192LHR", a: "$2,156", m: "PayPal", t: "0.4s" },
      { r: "LIS\u2192LUA", a: "\u20AC579", m: "MC", t: "0.3s" },
    ];
    var idx = 0;
    function add() {
      var t = txns[idx++ % txns.length];
      var el = document.createElement("div");
      el.className = "pbrd-air-txn pbrd-air-txn--in";
      el.innerHTML =
        '<span class="pbrd-air-txn-ok">\u2713</span>' +
        '<span class="pbrd-air-txn-r">' + t.r + '</span>' +
        '<span class="pbrd-air-txn-a">' + t.a + '</span>' +
        '<span class="pbrd-air-txn-m">' + t.m + '</span>' +
        '<span class="pbrd-air-txn-t">' + t.t + '</span>';
      feed.insertBefore(el, feed.firstChild);
      setTimeout(function() { el.classList.remove("pbrd-air-txn--in"); }, 50);
      while (feed.children.length > 6) feed.removeChild(feed.lastChild);
    }
    add(); setTimeout(add, 600);
    setInterval(add, 2800);
  }

  /* ═══════════════════════════════════════════ */
  /* 2. PROBLEM — Revenue Leakage Dashboard      */
  /* ═══════════════════════════════════════════ */

  function enhanceProblem() {
    var heading = findHeading("airline payments are complex");
    if (!heading) return;
    heading.innerHTML = "$1 billion lost to airline fraud.<br>Every year.";
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    section.querySelectorAll("p").forEach(function(p) {
      if (p.textContent.toLowerCase().includes("involving multiple") || p.textContent.toLowerCase().includes("outdated")) {
        p.textContent = "Fraud, failed transactions, currency friction, and cart abandonment drain airline revenue at every stage. Here\u2019s where the money goes \u2014 and how Paybyrd plugs the leaks:";
      }
      if (p.textContent.toLowerCase().includes("paybyrd simplifies")) p.style.display = "none";
    });

    /* Revenue leakage dashboard */
    var dash = document.createElement("div");
    dash.className = "pbrd-air-leak-dash pbrd-air-reveal";
    dash.innerHTML =
      '<div class="pbrd-air-leak-header">' +
        '<div class="pbrd-air-leak-dot pbrd-air-leak-dot--live"></div>' +
        '<span>Revenue Leakage Monitor</span>' +
        '<span class="pbrd-air-leak-tag">LIVE</span>' +
      '</div>' +
      '<div class="pbrd-air-leak-grid">' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--red pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#ef4444" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="79"/></svg><span class="pbrd-air-leak-pct" data-target="79">0%</span></div>' +
          '<h4>Cart Abandonment</h4>' +
          '<p>Travel\u2019s highest drop-off rate</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 Paybyrd recovers 15\u201320%</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--orange pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#f97316" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="30"/></svg><span class="pbrd-air-leak-pct" data-target="30">0%</span></div>' +
          '<h4>Missing Local Methods</h4>' +
          '<p>Sales lost without local options</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 192+ currencies, local routing</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--yellow pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#eab308" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="17"/></svg><span class="pbrd-air-leak-pct" data-target="17">0%</span></div>' +
          '<h4>Fraud & Chargebacks</h4>' +
          '<p>$1B+ lost industry-wide</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 AI screening: 16.8% reduction</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--blue pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="15"/></svg><span class="pbrd-air-leak-pct" data-target="15">0%</span></div>' +
          '<h4>Cross-Border Fees</h4>' +
          '<p>Excessive FX & routing charges</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 Local routing: 10\u201315% savings</div>' +
        '</div>' +
      '</div>';

    var paras = section.querySelectorAll("p");
    var lastP = null; paras.forEach(function(p) { if (p.style.display !== "none") lastP = p; });
    if (lastP) lastP.parentElement.insertBefore(dash, lastP.nextSibling);
    else section.appendChild(dash);

    /* Animate rings + counters on scroll */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          dash.querySelectorAll(".pbrd-air-ring-fill").forEach(function(ring) {
            var pct = parseInt(ring.getAttribute("data-pct"));
            var circ = 214; /* 2*PI*34 */
            setTimeout(function() {
              ring.style.strokeDashoffset = circ - (circ * pct / 100);
            }, 300);
          });
          dash.querySelectorAll(".pbrd-air-leak-pct").forEach(function(el) {
            countUp(el, parseInt(el.getAttribute("data-target")), "%");
          });
          this.disconnect();
        }
      }, { threshold: 0.2 }).observe(dash);
    }

    observeReveal(".pbrd-air-reveal", 150, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 3. FEATURES — Enhanced + Benchmark          */
  /* ═══════════════════════════════════════════ */

  function enhanceFeatures() {
    var heading = findHeading("built for the way airlines");
    if (!heading) return;
    heading.textContent = "Built for airlines. Proven in production.";
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    var updates = [
      { find: "global", text: "Process in 192+ currencies with local routing. 4\u20137% higher authorization rates. 10\u201315% lower cross-border fees." },
      { find: "dashboard", text: "Route-level filters, real-time reconciliation, role-based views. Track by country, channel, or payment method." },
      { find: "fraud", text: "AI velocity screening + shared fraud database. 3D Secure. Automated disputes. Result: 16.8% chargeback reduction." },
      { find: "flexibility", text: "Connects to Amadeus, IATA, GDS, BSP, NDC. Self-host modules or use full-stack. Like Lego blocks for payments." }
    ];
    section.querySelectorAll("p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      updates.forEach(function(u) { if (t.includes(u.find)) p.textContent = u.text; });
    });

    /* Benchmark chart */
    var bench = document.createElement("div");
    bench.className = "pbrd-air-benchmark pbrd-air-reveal";
    bench.id = "benchmark";
    bench.innerHTML =
      '<div class="pbrd-air-bench-header">' +
        '<div class="pbrd-air-section-label">APPROVAL RATE ADVANTAGE</div>' +
        '<h4>Paybyrd vs. the competition</h4>' +
        '<p>Production data from airline transactions</p>' +
      '</div>' +
      '<div class="pbrd-air-bench-rows">' +
        '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Adyen</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--1" data-w="35"></div></div><span class="pbrd-air-bench-val">+1.72%</span></div>' +
        '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Elavon</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--2" data-w="64"></div></div><span class="pbrd-air-bench-val">+3.16%</span></div>' +
        '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Checkout.com</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--3" data-w="98"></div></div><span class="pbrd-air-bench-val">+4.86%</span></div>' +
        '<div class="pbrd-air-bench-row pbrd-air-bench-row--top"><span class="pbrd-air-bench-name">vs Nuvei</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--4" data-w="100"></div></div><span class="pbrd-air-bench-val">+4.92%</span></div>' +
      '</div>' +
      '<div class="pbrd-air-bench-footer">' +
        '<a href="/book-demo" class="pbrd-air-cta-primary" style="margin-top:24px">See your projected uplift \u2192</a>' +
      '</div>';

    var grid = section.querySelector("[class*='grid']");
    var target = grid || heading;
    while (target.parentElement && window.getComputedStyle(target.parentElement).display === "contents") target = target.parentElement;
    if (target.parentElement) target.parentElement.insertBefore(bench, target.nextSibling);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          bench.querySelectorAll(".pbrd-air-bench-bar").forEach(function(bar, i) {
            setTimeout(function() { bar.style.width = bar.getAttribute("data-w") + "%"; }, 200 + i * 200);
          });
          this.disconnect();
        }
      }, { threshold: 0.3 }).observe(bench);
    }

    observeReveal(".pbrd-air-reveal", 100, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 4. TAP TESTIMONIAL                          */
  /* ═══════════════════════════════════════════ */

  function buildTestimonial() {
    var anchor = findSectionByHeading("designed for the passenger") || findSectionByHeading("works with your stack");
    if (!anchor) return;

    var s = document.createElement("section");
    s.className = "pbrd-air-test-section";
    s.innerHTML =
      '<div class="pbrd-air-test-wrap">' +
        '<div class="pbrd-air-section-label" style="text-align:center;margin-bottom:8px">CASE STUDY</div>' +
        '<div class="pbrd-air-test-card pbrd-air-reveal">' +
          '<div class="pbrd-air-test-left">' +
            '<div class="pbrd-air-test-metrics">' +
              '<div class="pbrd-air-test-metric"><span class="pbrd-air-test-mv">A77</span><span class="pbrd-air-test-ml">Terminal</span></div>' +
              '<div class="pbrd-air-test-metric"><span class="pbrd-air-test-mv">Gate</span><span class="pbrd-air-test-ml">Boarding Payments</span></div>' +
              '<div class="pbrd-air-test-metric"><span class="pbrd-air-test-mv">Real-time</span><span class="pbrd-air-test-ml">Reconciliation</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-air-test-right">' +
            '<blockquote class="pbrd-air-test-quote">\u201CThe A77 Terminal, developed in collaboration with Paybyrd, emerged as a true powerhouse, revolutionizing the entire process at Boarding Gates.\u201D</blockquote>' +
            '<div class="pbrd-air-test-author">' +
              '<div class="pbrd-air-test-avatar">JF</div>' +
              '<div><div class="pbrd-air-test-name">Jo\u00E3o Frias</div><div class="pbrd-air-test-role">Head of Payments, TAP Air Portugal</div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    anchor.parentNode.insertBefore(s, anchor);
    observeReveal(".pbrd-air-reveal", 100, s);
  }

  /* ═══════════════════════════════════════════ */
  /* 5. BOTTOM CTA                               */
  /* ═══════════════════════════════════════════ */

  function enhanceBottomCTA() {
    var heading = findHeading("turbulence");
    if (!heading) return;
    heading.innerHTML = "Set your airline free.<br>Let your money flow.";
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    section.querySelectorAll("p").forEach(function(p) {
      if (p.textContent.toLowerCase().includes("unlock") || p.textContent.toLowerCase().includes("revenue")) {
        p.textContent = "Join TAP Air Portugal and Europe\u2019s leading carriers. Most airlines see measurable results within 30 days.";
      }
    });

    section.querySelectorAll("a").forEach(function(a) {
      if (a.textContent.toLowerCase().includes("start now")) {
        a.textContent = "Book Your 15-Minute Demo \u2192";
        a.href = "/book-demo";
        a.style.setProperty("background", "#FF6B35", "important");
        a.style.setProperty("border-radius", "100px", "important");
        a.style.setProperty("padding", "14px 40px", "important");
        a.style.setProperty("font-weight", "600", "important");
      }
    });

    /* Add urgency note */
    var note = document.createElement("p");
    note.setAttribute("style", "text-align:center;font-size:0.75rem;color:rgba(255,255,255,0.3);margin-top:16px;");
    note.textContent = "No commitment required \u00b7 15-minute call \u00b7 Dedicated airline account manager included";
    var btn = section.querySelector("a[href*='book-demo'], a[href*='onboard']");
    if (btn && btn.parentElement) btn.parentElement.insertBefore(note, btn.nextSibling);
  }

  /* ═══════════════════════════════════════════ */
  /* 6. FAQ Enhancement                          */
  /* ═══════════════════════════════════════════ */

  function enhanceFAQ() {
    document.querySelectorAll("[class*='accordion'] p, [class*='faq'] p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      if (t.includes("reconciling ticket payments"))
        p.textContent = "Typically 2\u20134 weeks for full integration. Our modular architecture connects to Amadeus, IATA, GDS, BSP, NDC without disrupting live operations. TAP Air Portugal went live across all channels within weeks.";
      if (t.includes("smart routing and fx"))
        p.textContent = "Smart multi-acquiring routes each transaction to the optimal acquirer. Local routing through regional banks delivers 4\u20137% higher authorization. Airlines cut costs by up to 15%, with 10\u201315% reduction in cross-border fees.";
    });
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                        */
  /* ═══════════════════════════════════════════ */

  function init() {
    enhanceHero();
    enhanceProblem();
    enhanceFeatures();
    buildTestimonial();
    enhanceBottomCTA();
    enhanceFAQ();
    console.log("[Paybyrd] Airlines enhancements loaded");
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init);
})();
