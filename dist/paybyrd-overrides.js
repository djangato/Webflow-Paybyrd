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

    // Use the actual rendered position of the target card to center it
    // First, reset transform so we can measure true positions
    track.style.transition = "none";
    track.style.transform = "translateX(0)";

    // Force layout recalc
    void track.offsetHeight;

    // Get the target card's center position relative to the track
    var targetCard = cards[idx];
    var trackRect = track.getBoundingClientRect();
    var cardRect = targetCard.getBoundingClientRect();
    var cardCenter = cardRect.left - trackRect.left + (cardRect.width / 2);

    // Calculate offset to center this card in the viewport
    var offset = (window.innerWidth / 2) - cardCenter;

    // Re-enable transition and apply
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
          '<div class="pbrd-sv-method" style="--d:0.05s;--bg:#1A1F71">VISA</div>' +
          '<div class="pbrd-sv-method" style="--d:0.1s;--bg:#EB001B">MC</div>' +
          '<div class="pbrd-sv-method" style="--d:0.15s;--bg:#006FCF">AMEX</div>' +
          '<div class="pbrd-sv-method" style="--d:0.2s;--bg:#000">AP</div>' +
          '<div class="pbrd-sv-method" style="--d:0.25s;--bg:#4285F4">GP</div>' +
          '<div class="pbrd-sv-method" style="--d:0.3s;--bg:#003087">PP</div>' +
          '<div class="pbrd-sv-method" style="--d:0.35s;--bg:#D4002A">MBW</div>' +
          '<div class="pbrd-sv-method" style="--d:0.4s;--bg:#CC0066">iD</div>' +
          '<div class="pbrd-sv-method" style="--d:0.45s;--bg:#32BCAD">PIX</div>' +
          '<div class="pbrd-sv-method" style="--d:0.5s;--bg:#FFB3C7">K</div>' +
          '<div class="pbrd-sv-method" style="--d:0.55s;--bg:#2D6CA2">SEPA</div>' +
          '<div class="pbrd-sv-method" style="--d:0.6s;--bg:#1F3B7A">MB</div>' +
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

  var slideVisuals = [vizPlatform, vizDashboard, vizTransactions, vizAnalytics, vizIntelligence, vizPOS, vizPayments];

  var slides = [
    { tab: "Platform", number: "01", title: "Unified Omnichannel Platform", description: "POS, e-commerce, QR codes, kiosks, and pay-by-link \u2014 all managed through one powerful dashboard with real-time data and full control.", features: ["Single dashboard for all channels", "Real-time transaction monitoring", "Multi-store and multi-currency support"], link: "/e-commerce", linkText: "Explore the platform" },
    { tab: "Dashboard", number: "02", title: "Complete Control Over Your Payments", description: "Track \u20AC16M+ in volume, monitor success rates at 92%, and manage refunds \u2014 all from a beautifully designed mobile-first dashboard.", features: ["Revenue analytics by currency", "Success rate & transaction metrics", "Refund management in one tap"], link: "/e-commerce", linkText: "See the dashboard" },
    { tab: "Transactions", number: "03", title: "Review, Track, and Issue Refunds Instantly", description: "Every transaction at your fingertips. Filter by date, store, or status. Drill into details, process refunds, and resolve issues in seconds.", features: ["Advanced filtering and search", "One-click full or partial refunds", "Complete payment audit trail"], link: "/e-commerce", linkText: "Learn more" },
    { tab: "Analytics", number: "04", title: "Real-Time Business Intelligence", description: "Revenue breakdowns by time period, status analysis with 92% success rates, and volume distribution across Visa, Mastercard, MB Way, and more.", features: ["Revenue charts by time of day", "Status breakdown (success, failed, pending)", "Volume distribution by payment method"], link: "/e-commerce", linkText: "Explore analytics" },
    { tab: "Intelligence", number: "05", title: "Know Every Customer \u2014 Even the Anonymous Ones", description: "Paybyrd identifies returning shoppers across all channels automatically \u2014 even from anonymous in-store card transactions. See purchase history, frequency, spend patterns, and lifetime value without requiring logins or loyalty programs.", features: ["Auto-identify returning card holders across POS and online", "Purchase frequency scoring (cold, warm, hot)", "Top customer leaderboard with lifetime spend", "Works without apps, accounts, or loyalty sign-ups"], link: "/book-demo", linkText: "See it in action" },
    { tab: "POS", number: "06", title: "Enterprise-Grade POS Terminals", description: "Accept payments anywhere with Paybyrd-powered Android terminals. Portable, countertop, or kiosk-integrated \u2014 all running our software.", features: ["Android-based smart terminals", "Buy outright or rent monthly", "Built-in printer, scanner, and 4G"], link: "/pos", linkText: "View POS terminals" },
    { tab: "Payments", number: "07", title: "192+ Currencies and Every Method That Matters", description: "From Visa and Amex to Pix, MB Way, and Klarna. Multi-acquiring with intelligent routing ensures the highest approval rates globally.", features: ["20+ payment methods supported", "Multi-acquiring & smart routing", "Local methods for every market"], link: "/payment-methods", linkText: "See all payment methods" }
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
          }, 300);
        }
      });
    }

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
