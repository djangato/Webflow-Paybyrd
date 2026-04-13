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

    observeReveal(".pbrd-pm-reveal", 100);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 2: Payment Grid Enhancement         */
  /* ═══════════════════════════════════════════ */

  function enhanceGrid() {
    /* Strategy: find the grid that contains payment method cards.
       Look for the first u-grid (or grid-like container) in the first section
       that has children containing known payment method names. */
    var knownMethods = ["visa", "mastercard", "paypal", "google pay", "apple pay", "klarna", "sepa"];
    var gridContainer = null;
    var cards = [];

    document.querySelectorAll("[class*='grid']").forEach(function(g) {
      if (gridContainer) return;
      var children = g.children;
      if (children.length < 5) return; /* payment grid should have many items */
      var text = g.textContent.toLowerCase();
      var matches = knownMethods.filter(function(m) { return text.includes(m); });
      if (matches.length >= 3) {
        gridContainer = g;
        cards = Array.prototype.slice.call(children);
      }
    });

    if (!gridContainer || cards.length === 0) {
      console.log("[Paybyrd] Payment grid not found");
      return;
    }

    /* Categorize cards by reading their content */
    var categories = {
      "all": [],
      "cards": [],
      "wallets": [],
      "local": [],
      "bnpl": []
    };

    var cardWalletNames = ["google pay", "samsung pay", "apple pay", "revolut pay", "paypal"];
    var cardNames = ["visa", "mastercard", "american express", "discover", "diners club", "china union pay"];
    var localNames = ["mbway", "multibanco", "ideal", "multicaixa", "pix", "sepa"];
    var bnplNames = ["klarna", "floa"];

    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      card.classList.add("pbrd-pm-card-enhanced");
      card.classList.add("pbrd-pm-reveal");
      card.setAttribute("data-pm-category", "all");
      categories.all.push(card);

      if (cardNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-category", card.getAttribute("data-pm-category") + " cards");
        categories.cards.push(card);
      }
      if (cardWalletNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-category", card.getAttribute("data-pm-category") + " wallets");
        categories.wallets.push(card);
      }
      if (localNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-category", card.getAttribute("data-pm-category") + " local");
        categories.local.push(card);
      }
      if (bnplNames.some(function (n) { return text.includes(n); })) {
        card.setAttribute("data-pm-category", card.getAttribute("data-pm-category") + " bnpl");
        categories.bnpl.push(card);
      }

      /* Enhance badge styling */
      card.querySelectorAll("[class*='tag'], [class*='badge']").forEach(function (badge) {
        var bt = badge.textContent.toLowerCase();
        if (bt.includes("latest")) badge.classList.add("pbrd-pm-badge-latest");
        if (bt.includes("coming")) badge.classList.add("pbrd-pm-badge-coming");
      });
    });

    /* Build category tabs */
    var tabData = [
      { key: "all", label: "All", count: categories.all.length },
      { key: "cards", label: "Cards", count: categories.cards.length },
      { key: "wallets", label: "Digital Wallets", count: categories.wallets.length },
      { key: "local", label: "Local Methods", count: categories.local.length },
      { key: "bnpl", label: "Buy Now Pay Later", count: categories.bnpl.length }
    ];

    var tabsWrap = document.createElement("div");
    tabsWrap.className = "pbrd-pm-tabs pbrd-pm-reveal";

    var counterEl = document.createElement("div");
    counterEl.className = "pbrd-pm-counter";
    counterEl.textContent = "Showing " + categories.all.length + " of " + categories.all.length + " methods";

    tabData.forEach(function (t) {
      var btn = document.createElement("button");
      btn.className = "pbrd-pm-tab" + (t.key === "all" ? " pbrd-pm-tab--active" : "");
      btn.textContent = t.label;
      btn.setAttribute("data-filter", t.key);

      btn.addEventListener("click", function () {
        /* Update active tab */
        tabsWrap.querySelectorAll(".pbrd-pm-tab").forEach(function (b) {
          b.classList.remove("pbrd-pm-tab--active");
        });
        btn.classList.add("pbrd-pm-tab--active");

        /* Filter cards */
        var visibleCount = 0;
        cards.forEach(function (card) {
          var cats = card.getAttribute("data-pm-category") || "";
          if (t.key === "all" || cats.includes(t.key)) {
            card.classList.remove("pbrd-pm-card-hidden");
            visibleCount++;
          } else {
            card.classList.add("pbrd-pm-card-hidden");
          }
        });

        counterEl.textContent = "Showing " + visibleCount + " of " + categories.all.length + " methods";
      });

      tabsWrap.appendChild(btn);
    });

    /* Insert tabs and counter before the grid */
    gridContainer.parentNode.insertBefore(tabsWrap, gridContainer);
    gridContainer.parentNode.insertBefore(counterEl, gridContainer);

    observeReveal(".pbrd-pm-reveal", 80);
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

    section.classList.add("pbrd-pm-contact-section");

    /* Rewrite heading */
    section.querySelectorAll("h1,h2,h3").forEach(function (h) {
      if (h.textContent.toLowerCase().includes("missing")) {
        h.innerHTML = "Can\u2019t find what you need?";
      }
    });

    /* Rewrite subtitle */
    section.querySelectorAll("p").forEach(function (p) {
      if (p.textContent.toLowerCase().includes("open-source api") || p.textContent.toLowerCase().includes("tailored solution")) {
        p.textContent = "Our open API supports any payment method or integration. Tell us what you need \u2014 we\u2019ll make it happen.";
      }
    });

    /* Style form inputs via JS for dark theme */
    section.querySelectorAll("input:not([type=submit]):not([type=checkbox]):not([type=radio]):not([type=hidden]), textarea, select").forEach(function (el) {
      el.style.setProperty("background", "rgba(255,255,255,0.05)", "important");
      el.style.setProperty("border", "1.5px solid rgba(255,255,255,0.1)", "important");
      el.style.setProperty("border-radius", "10px", "important");
      el.style.setProperty("color", "#fff", "important");
      el.addEventListener("focus", function () {
        el.style.setProperty("border-color", "#60a5fa", "important");
        el.style.setProperty("box-shadow", "0 0 0 3px rgba(96,165,250,0.1)", "important");
        el.style.setProperty("background", "rgba(255,255,255,0.08)", "important");
      });
      el.addEventListener("blur", function () {
        el.style.setProperty("border-color", "rgba(255,255,255,0.1)", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("background", "rgba(255,255,255,0.05)", "important");
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

    /* Insert trust badges */
    var form = section.querySelector("form");
    if (!form) return;

    var trust = document.createElement("div");
    trust.className = "pbrd-pm-trust";
    trust.innerHTML =
      '<div class="pbrd-pm-trust-item">' +
        '<div class="pbrd-pm-trust-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div>' +
        '<div><span class="pbrd-pm-trust-val">99.9%</span><span class="pbrd-pm-trust-lbl">Uptime SLA</span></div>' +
      '</div>' +
      '<div class="pbrd-pm-trust-item">' +
        '<div class="pbrd-pm-trust-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" stroke-width="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div><span class="pbrd-pm-trust-val">PCI Level 1</span><span class="pbrd-pm-trust-lbl">DSS Certified</span></div>' +
      '</div>' +
      '<div class="pbrd-pm-trust-item">' +
        '<div class="pbrd-pm-trust-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5"/></svg></div>' +
        '<div><span class="pbrd-pm-trust-val">24/7</span><span class="pbrd-pm-trust-lbl">Support</span></div>' +
      '</div>';

    form.parentNode.insertBefore(trust, form);
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                        */
  /* ═══════════════════════════════════════════ */

  function init() {
    enhanceHero();
    enhanceGrid();
    enhanceIntegration();
    enhanceContact();
    console.log("[Paybyrd] Payment Methods enhancements loaded");
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
