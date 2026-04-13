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
      '<svg viewBox="0 0 440 380" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-pos-arch-svg">' +

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

        /* Method pills */
        '<g transform="translate(45,270)">' +
          '<rect x="0" y="0" width="50" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m1"/>' +
          '<text x="25" y="15" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">Card</text>' +

          '<rect x="58" y="0" width="58" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m2"/>' +
          '<text x="87" y="15" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">MB WAY</text>' +

          '<rect x="124" y="0" width="52" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m3"/>' +
          '<text x="150" y="15" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">PayPal</text>' +

          '<rect x="184" y="0" width="52" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m4"/>' +
          '<text x="210" y="15" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">Klarna</text>' +

          '<rect x="244" y="0" width="54" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m5"/>' +
          '<text x="271" y="15" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">SEPA</text>' +

          '<rect x="306" y="0" width="44" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m6"/>' +
          '<text x="328" y="15" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">iDeal</text>' +

          /* Second row */
          '<rect x="60" y="30" width="62" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m7"/>' +
          '<text x="91" y="45" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">Revolut</text>' +

          '<rect x="130" y="30" width="56" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m8"/>' +
          '<text x="158" y="45" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">Pay Link</text>' +

          '<rect x="194" y="30" width="44" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.6" class="pbrd-pos-arch-method pbrd-pos-arch-m9"/>' +
          '<text x="216" y="45" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="500" font-family="system-ui">Floa</text>' +

          '<rect x="246" y="30" width="44" height="22" rx="11" fill="rgba(99,25,240,0.1)" stroke="rgba(99,25,240,0.25)" stroke-width="0.6"/>' +
          '<text x="268" y="45" text-anchor="middle" fill="rgba(99,25,240,0.7)" font-size="7" font-weight="600" font-family="system-ui">+4</text>' +
        '</g>' +

        /* ── Transaction types along the bottom ── */
        '<g transform="translate(65,360)">' +
          '<text x="0" y="0" fill="rgba(255,255,255,0.2)" font-size="6" font-family="system-ui" letter-spacing="0.5">PAYMENT</text>' +
          '<text x="60" y="0" fill="rgba(255,255,255,0.2)" font-size="6" font-family="system-ui" letter-spacing="0.5">PRE-AUTH</text>' +
          '<text x="120" y="0" fill="rgba(255,255,255,0.2)" font-size="6" font-family="system-ui" letter-spacing="0.5">REFUND</text>' +
          '<text x="175" y="0" fill="rgba(255,255,255,0.2)" font-size="6" font-family="system-ui" letter-spacing="0.5">CAPTURE</text>' +
          '<text x="240" y="0" fill="rgba(255,255,255,0.2)" font-size="6" font-family="system-ui" letter-spacing="0.5">TOKENIZE</text>' +
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
