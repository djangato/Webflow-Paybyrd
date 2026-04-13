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
        icon: '<svg viewBox="0 0 64 64" width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<rect width="64" height="64" rx="14" fill="#820AD1"/>' +
          '<path d="M18 44V20h4.5l13 16.5V20H40v24h-4.5L22.5 27.5V44H18Z" fill="#fff"/>' +
          '</svg>' },
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

    section.classList.add("pbrd-pm-contact-section");

    /* Rewrite heading */
    section.querySelectorAll("h1,h2,h3").forEach(function (h) {
      if (h.textContent.toLowerCase().includes("missing")) {
        h.innerHTML = "Need a specific payment method<br>or integration?";
      }
    });

    /* Rewrite subtitle */
    section.querySelectorAll("p").forEach(function (p) {
      if (p.textContent.toLowerCase().includes("open-source api") || p.textContent.toLowerCase().includes("tailored solution")) {
        p.textContent = "We add new payment methods every month. If yours isn\u2019t listed yet, our open REST API can connect anything \u2014 or we\u2019ll build the integration for you.";
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

  /* ═══════════════════════════════════════════ */
  /* Footer fix                                  */
  /* ═══════════════════════════════════════════ */

  function fixFooter() {
    /* Find all footer-like sections at the bottom of the page */
    var footers = document.querySelectorAll("footer, [class*='footer'], [class*='Footer']");
    if (footers.length === 0) {
      /* Try the last section on the page */
      var allSections = document.querySelectorAll("section, [class*='section']");
      if (allSections.length > 0) {
        var lastSection = allSections[allSections.length - 1];
        if (lastSection.textContent.toLowerCase().indexOf("privacy") > -1 ||
            lastSection.textContent.toLowerCase().indexOf("terms") > -1 ||
            lastSection.textContent.toLowerCase().indexOf("copyright") > -1) {
          footers = [lastSection];
        }
      }
    }

    footers.forEach(function(footer) {
      /* Force all text to be visible */
      footer.querySelectorAll("*").forEach(function(el) {
        var cs = window.getComputedStyle(el);
        var r = parseInt(cs.color);
        /* If text color is very dark (near black) on what's likely a dark bg */
        if (cs.color.indexOf("rgb(0,") === 0 || cs.color === "rgb(0, 0, 0)" ||
            cs.color.indexOf("rgba(0,") === 0) {
          if (el.tagName === "A") {
            el.style.setProperty("color", "rgba(255,255,255,0.5)", "important");
          } else {
            el.style.setProperty("color", "rgba(255,255,255,0.35)", "important");
          }
        }
      });

      /* Make sure footer has decent padding and separation */
      footer.style.setProperty("border-top", "1px solid rgba(255,255,255,0.06)", "important");
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
