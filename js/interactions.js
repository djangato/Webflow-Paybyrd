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
