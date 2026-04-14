/* Paybyrd Webflow Overrides — Interactions */
/* Payment Methods Pricing Table */

(function () {
  "use strict";

  // Only run on the pricing page
  if (!window.location.pathname.includes("/pricing")) return;

  /* ─── CDN base for icons ─── */
  const iconBase = "https://djangato.github.io/Webflow-Paybyrd/assets/icons/";

  /* ─── Payment Methods Data (Online) ─── */
  const paymentMethods = [
    // Cards
    { name: "Visa", category: "cards", fee: "1.25% + \u20AC0.08", img: "visa.png" },
    { name: "Mastercard", category: "cards", fee: "1.25% + \u20AC0.08", img: "mastercard.png" },
    { name: "American Express", category: "cards", fee: "2.50% + \u20AC0.08", img: "amex.png" },
    { name: "Discover", category: "cards", fee: "2.50% + \u20AC0.15", img: "discover.png" },
    { name: "Diners Club", category: "cards", fee: "2.40% + \u20AC0.15", img: "diners.png" },
    { name: "China Union Pay", category: "cards", fee: "2.80% + \u20AC0.15", img: "unionpay.png" },

    // Digital Wallets
    { name: "Apple Pay", category: "wallets", fee: "Card rate applies", img: "applepay.png" },
    { name: "Google Pay", category: "wallets", fee: "Card rate applies", img: "googlepay.png" },
    { name: "Samsung Pay", category: "wallets", fee: "Card rate applies", icon: "SP", iconBg: "#1428A0" },
    { name: "PayPal", category: "wallets", fee: "PayPal rate + \u20AC0.05", img: "paypal.png" },
    { name: "Revolut Pay", category: "wallets", fee: "1.00% + \u20AC0.20", icon: "REV", iconBg: "#0075EB" },

    // Bank Transfers & Direct Debit
    { name: "SEPA Direct Debit", category: "bank", fee: "\u20AC0.15", icon: "SEPA", iconBg: "#2D6CA2" },
    { name: "SEPA Instant", category: "bank", fee: "\u20AC0.20", icon: "SEPA", iconBg: "#2D6CA2" },
    { name: "iDEAL", category: "bank", fee: "\u20AC0.20", img: "ideal.png" },
    { name: "Multibanco Reference", category: "bank", fee: "1.50% + \u20AC0.10", img: "multibanco.png" },

    // Buy Now Pay Later
    { name: "Klarna", category: "bnpl", fee: "3.29% + \u20AC0.35", img: "klarna.png" },
    { name: "Floa", category: "bnpl", fee: "2.99% + \u20AC0.35", icon: "FL", iconBg: "#00D26A" },

    // Local Payment Methods
    { name: "MBWay", category: "local", fee: "0.60% + \u20AC0.05", img: "mbway.png" },
    { name: "PIX", category: "local", fee: "1.50% + \u20AC0.10", icon: "PIX", iconBg: "#32BCAD" },
    { name: "Multicaixa", category: "local", fee: "Contact us", icon: "MCX", iconBg: "#E3242B" },
    { name: "Multicaixa Express", category: "local", fee: "Contact us", icon: "MCX", iconBg: "#E3242B" },
  ];

  /* ─── Card Present Payment Methods ─── */
  const cpMethods = [
    { name: "Visa", category: "cards", fee: "1.11% + \u20AC0.05", img: "visa.png" },
    { name: "Mastercard", category: "cards", fee: "1.11% + \u20AC0.05", img: "mastercard.png" },
    { name: "American Express", category: "cards", fee: "2.50% + \u20AC0.05", img: "amex.png" },
    { name: "Discover", category: "cards", fee: "2.50% + \u20AC0.10", img: "discover.png" },
    { name: "Diners Club", category: "cards", fee: "2.40% + \u20AC0.10", img: "diners.png" },
    { name: "China Union Pay", category: "cards", fee: "2.80% + \u20AC0.10", img: "unionpay.png" },
    { name: "Apple Pay", category: "wallets", fee: "Card rate applies", img: "applepay.png" },
    { name: "Google Pay", category: "wallets", fee: "Card rate applies", img: "googlepay.png" },
    { name: "Samsung Pay", category: "wallets", fee: "Card rate applies", icon: "SP", iconBg: "#1428A0" },
    { name: "MBWay", category: "local", fee: "0.60% + \u20AC0.05", img: "mbway.png" },
  ];

  let currentChannel = "online";

  function getActiveMethods() {
    return currentChannel === "online" ? paymentMethods : cpMethods;
  }

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
    if (method.img) {
      return `<div class="pbrd-method-icon pbrd-method-icon-img"><img src="${iconBase}${method.img}" alt="${method.name}" loading="lazy"></div>`;
    }
    return `<div class="pbrd-method-icon" style="background:${method.iconBg}"><span style="color:#fff;font-size:0.5rem;font-weight:800;letter-spacing:0.02em;line-height:1">${method.icon}</span></div>`;
  }

  function buildMethodRow(method) {
    return `
      <div class="pbrd-method-row" data-category="${method.category}">
        <div class="pbrd-method-info">
          ${buildMethodIcon(method)}
          <span class="pbrd-method-name">${method.name}</span>
        </div>
        <span class="pbrd-method-fee">${method.fee}</span>
      </div>`;
  }

  function buildCategoryGroup(catId, methodsList) {
    const filtered = methodsList.filter((m) => m.category === catId);
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
    const allMethods = getActiveMethods();
    const methods = filteredCategory === "all"
      ? allMethods
      : allMethods.filter((m) => m.category === filteredCategory);

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
        <p>Transparent pricing across all payment methods. No hidden fees, no surprises \u2014 just simple, competitive rates.</p>
      </div>

      <div class="pbrd-channel-toggle">
        <button class="pbrd-channel-btn pbrd-channel-btn--active" data-channel="online">Online Payments</button>
        <button class="pbrd-channel-btn" data-channel="cp">Card Present Payments</button>
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
          <span>Transaction fee</span>
        </div>
        <div class="pbrd-table-body" id="pbrd-pricing-body">
          ${render("all")}
        </div>
      </div>

      <div class="pbrd-pricing-cards">

        <div class="pbrd-pricing-info-card">
          <div class="pbrd-pricing-info-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3>Free daily payouts</h3>
          <p>No payout fees \u2014 ever. Whether you process \u20AC1,000 or \u20AC10,000,000 a month, daily payouts are always free.</p>
          <ul>
            <li><span class="pbrd-info-check">\u2713</span>Daily payouts at no extra cost</li>
            <li><span class="pbrd-info-check">\u2713</span>Gross settlement \u2014 full monthly volume paid out</li>
            <li><span class="pbrd-info-check">\u2713</span>No commission deductions from payouts</li>
            <li><span class="pbrd-info-check">\u2713</span>Easy accounting reconciliation</li>
          </ul>
        </div>

        <div class="pbrd-pricing-info-card">
          <div class="pbrd-pricing-info-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <h3>No currency surcharges</h3>
          <p>Receive payouts in major currencies without any FX surcharge or conversion fee.</p>
          <div class="pbrd-currency-pills">
            <span class="pbrd-currency-pill">EUR</span>
            <span class="pbrd-currency-pill">USD</span>
            <span class="pbrd-currency-pill">GBP</span>
            <span class="pbrd-currency-pill">DKK</span>
            <span class="pbrd-currency-pill">SEK</span>
          </div>
          <p class="pbrd-info-note">Zero surcharges on payouts in these currencies. Other currencies available on request.</p>
        </div>

        <div class="pbrd-pricing-info-card pbrd-pricing-info-card--highlight">
          <div class="pbrd-pricing-info-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h3>Volume pricing</h3>
          <p>Processing more than \u20AC80,000 per month? Unlock tailored rates designed for your scale.</p>
          <ul>
            <li><span class="pbrd-info-check">\u2713</span>Dedicated account manager</li>
            <li><span class="pbrd-info-check">\u2713</span>IC++ pricing available</li>
            <li><span class="pbrd-info-check">\u2713</span>Volume-based discounts</li>
            <li><span class="pbrd-info-check">\u2713</span>Multi-product bundling</li>
          </ul>
          <a href="/book-demo" class="pbrd-info-cta">Talk to sales \u2192</a>
        </div>

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

    // Channel toggle (Online / Card Present)
    section.querySelectorAll(".pbrd-channel-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        section.querySelectorAll(".pbrd-channel-btn").forEach((b) => b.classList.remove("pbrd-channel-btn--active"));
        btn.classList.add("pbrd-channel-btn--active");
        currentChannel = btn.dataset.channel;
        // Reset category filter to "all"
        section.querySelectorAll(".pbrd-filter-btn").forEach((b) => b.classList.remove("active"));
        const allBtn = section.querySelector('.pbrd-filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.add("active");
        // Hide category filters that don't apply to CP
        const filterWrap = section.querySelector(".pbrd-category-filters");
        if (filterWrap) filterWrap.style.display = currentChannel === "cp" ? "none" : "";
        // Re-render
        const body = section.querySelector(".pbrd-table-body");
        body.style.opacity = "0";
        body.style.transition = "opacity 0.15s ease";
        setTimeout(() => {
          body.innerHTML = render("all");
          body.style.opacity = "1";
          bindCategoryToggles(section);
        }, 150);
      });
    });

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

  const posImgBase = "https://djangato.github.io/Webflow-Paybyrd/assets/pos/";
  const terminals = [
    {
      name: "Paybyrd Rawhide",
      model: "PAX A920 Pro",
      description: "Sleek portable terminal with high-res touchscreen, 4G & Wi-Fi. Perfect for restaurants, retail, and on-the-go.",
      image: posImgBase + "lineup-rawhide.png",
      buyPrice: "\u20AC399",
      rentPrice: "\u20AC19.90",
      featured: true,
      specs: [
        "Android 10 \u00B7 PCI 6 SRED",
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
      image: posImgBase + "lineup-renegade.png",
      buyPrice: "\u20AC299",
      rentPrice: "\u20AC14.90",
      featured: false,
      specs: [
        "Android 10 \u00B7 PCI 5 SRED",
        "5.5\" HD Touchscreen Display",
        "4G / Wi-Fi Connectivity",
        "13MP Rear + 5MP Front Camera",
        "Professional Barcode Scanner",
      ],
    },
    {
      name: "Paybyrd Maverick",
      model: "Sunmi V3",
      description: "Built for speed with an integrated high-speed printer. The go-to terminal for restaurants, delivery, and receipts on the spot.",
      image: posImgBase + "lineup-maverick.png",
      buyPrice: "\u20AC349",
      rentPrice: "\u20AC17.90",
      featured: false,
      specs: [
        "Android 12 \u00B7 PCI 5",
        "6\" HD Touchscreen Display",
        "4G / Wi-Fi / Bluetooth",
        "High-speed Thermal Printer",
        "Rear Autofocus Camera",
      ],
    },
    {
      name: "Paybyrd Titan",
      model: "Sunmi T3 Pro",
      description: "All-in-one desktop terminal for self-service kiosks, vending machines, and unattended environments. Large touchscreen with full connectivity.",
      image: posImgBase + "lineup-titan.png",
      buyPrice: "\u20AC699",
      rentPrice: "\u20AC34.90",
      featured: false,
      specs: [
        "Android 12 \u00B7 PCI 6.x SRED",
        "15.6\" FHD Touchscreen",
        "Ethernet / Wi-Fi / 4G",
        "IP65 / IK09 Rated",
        "Built-in 80mm Printer",
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

    // Horizontal scroll with mouse wheel / trackpad
    const grid = section.querySelector(".pbrd-pos-grid");
    if (grid) {
      grid.addEventListener("wheel", function (e) {
        var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (delta === 0) return;
        e.preventDefault();
        grid.scrollLeft += delta * 1.5;
      }, { passive: false });
    }
  }

  // The POS section depends on the payment methods section being inserted first
  // Use a small delay to ensure ordering
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(initPOS, 100));
  } else {
    setTimeout(initPOS, 100);
  }
})();
