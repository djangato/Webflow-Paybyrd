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

    section.style.background = "#0a0a0f";
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
      '<div class="pbrd-pos-hero-glow"></div>' +
      '<img class="pbrd-pos-hero-video" id="pbrd-pos-hero-vid" src="' + BASE + 'sunmi-v3-hero.gif" alt="Sunmi V3 Terminal">' +
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
      { name: "Paybyrd Titan", model: "Sunmi T3 Pro", video: null, poster: "t3-render.png", desc: "Self-service desktop. Kiosk-ready.", pills: ["Android 12", '15.6" Touch', "IP65"] }
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

    wrap.innerHTML =
      '<div class="pbrd-pos-platform-header">' +
        '<div class="pbrd-pos-section-label">PLATFORM INTELLIGENCE</div>' +
        '<h2>One app store. Infinite possibilities.</h2>' +
        '<p>Every Paybyrd terminal runs Android \u2014 your POS app, loyalty program, inventory system, and payment processing all live on one device. No external hardware. No dongles.</p>' +
      '</div>' +
      '<div class="pbrd-pos-platform-grid">' +
        '<div class="pbrd-pos-features">' +
          '<div class="pbrd-pos-feature pbrd-pos-reveal"><div class="pbrd-pos-feature-icon">' + appSVG + '</div><div><h4>App-to-App Integration</h4><p>Your POS software calls Paybyrd\u2019s payment SDK directly. One tap to pay, instant response back to your app.</p></div></div>' +
          '<div class="pbrd-pos-feature pbrd-pos-reveal"><div class="pbrd-pos-feature-icon">' + otaSVG + '</div><div><h4>Over-the-Air Updates</h4><p>New features, security patches, and Android updates push automatically. Your fleet stays current without a single site visit.</p></div></div>' +
          '<div class="pbrd-pos-feature pbrd-pos-reveal"><div class="pbrd-pos-feature-icon">' + remoteSVG + '</div><div><h4>Remote Fleet Management</h4><p>Configure, monitor, and troubleshoot every terminal from one dashboard. Push new apps across your entire fleet in seconds.</p></div></div>' +
        '</div>' +
        '<div class="pbrd-pos-diagram" id="pbrd-pos-diagram">' +
          '<div class="pbrd-pos-diagram-row">' +
            '<div class="pbrd-pos-app-icon pbrd-pos-app-pos" id="pbrd-pos-icon-pos"><svg viewBox="0 0 20 20" fill="none" style="width:20px;height:20px;color:rgba(255,255,255,0.5)"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 6h6M7 9h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg><div style="font-size:0.5rem;margin-top:4px">POS</div></div>' +
            '<div class="pbrd-pos-diagram-arrow"><div class="pbrd-pos-diagram-arrow-pulse" id="pbrd-pos-arrow"></div></div>' +
            '<div class="pbrd-pos-app-icon pbrd-pos-app-pbrd" id="pbrd-pos-icon-pbrd"><svg viewBox="0 0 20 20" fill="none" style="width:20px;height:20px;color:rgba(255,255,255,0.5)"><path d="M10 2l7 4v8l-7 4-7-4V6l7-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg><div style="font-size:0.5rem;margin-top:4px">PAYBYRD</div></div>' +
          '</div>' +
          '<div class="pbrd-pos-diagram-response" id="pbrd-pos-resp">' +
            checkSVG +
            '<span><strong>APPROVED</strong> \u00b7 Contactless \u00b7 0.8s</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    newSection.appendChild(wrap);
    observeReveal(".pbrd-pos-reveal", 120, wrap);

    /* Animate diagram loop */
    function runDiagramLoop() {
      var posIcon = document.getElementById("pbrd-pos-icon-pos");
      var pbrdIcon = document.getElementById("pbrd-pos-icon-pbrd");
      var arrow = document.getElementById("pbrd-pos-arrow");
      var resp = document.getElementById("pbrd-pos-resp");
      if (!posIcon || !arrow || !resp) return;

      /* Reset */
      posIcon.classList.remove("pbrd-pos-app-active");
      pbrdIcon.classList.remove("pbrd-pos-app-active");
      arrow.classList.remove("pbrd-pos-arrow-go");
      resp.classList.remove("pbrd-pos-resp-show");

      /* Step 1: POS icon glows */
      setTimeout(function () { posIcon.classList.add("pbrd-pos-app-active"); }, 200);
      /* Step 2: Arrow pulses */
      setTimeout(function () { void arrow.offsetWidth; arrow.classList.add("pbrd-pos-arrow-go"); }, 800);
      /* Step 3: Paybyrd icon glows */
      setTimeout(function () { pbrdIcon.classList.add("pbrd-pos-app-active"); }, 1400);
      /* Step 4: Response slides up */
      setTimeout(function () { resp.classList.add("pbrd-pos-resp-show"); }, 1800);
      /* Step 5: Reset and repeat */
      setTimeout(runDiagramLoop, 4500);
    }

    /* Trigger on scroll */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          runDiagramLoop();
          this.disconnect();
        }
      }, { threshold: 0.2 }).observe(wrap);
    }
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
    newSection.style.background = "#fff";
    newSection.style.padding = "80px 0";
    anchor.insertAdjacentElement("afterend", newSection);

    var wrap = document.createElement("div");
    wrap.className = "pbrd-pos-rental-wrap";

    var perk = function (text) {
      return '<div class="pbrd-pos-rental-perk">' + checkSVG + '<span>' + text + '</span></div>';
    };

    wrap.innerHTML =
      '<div class="pbrd-pos-section-label">PRICING</div>' +
      '<h2>Own it or rent it. Your call.</h2>' +
      '<p>Whether you need terminals for a season or a lifetime \u2014 flexible options that scale with your business.</p>' +
      '<div class="pbrd-pos-rental-cards">' +
        '<div class="pbrd-pos-rental-card pbrd-pos-reveal">' +
          '<h4>Purchase</h4>' +
          '<p>One-time investment, long-term value. Full ownership of your terminal fleet.</p>' +
          '<div class="pbrd-pos-rental-perks">' +
            perk("One-time purchase") +
            perk("Lifetime OTA updates") +
            perk("Full device ownership") +
            perk("Free SIM + data plan") +
          '</div>' +
        '</div>' +
        '<div class="pbrd-pos-rental-card pbrd-pos-reveal">' +
          '<h4>Rental</h4>' +
          '<p>Ideal for festivals, conferences, seasonal peaks, or testing new locations.</p>' +
          '<div class="pbrd-pos-rental-perks">' +
            perk("Flexible monthly terms") +
            perk("Free replacement if damaged") +
            perk("Cancel anytime") +
            perk("Free SIM + data plan") +
          '</div>' +
        '</div>' +
      '</div>' +
      '<a href="/book-demo" class="pbrd-pos-rental-cta">Get a Quote \u2192</a>';

    newSection.appendChild(wrap);
    observeReveal(".pbrd-pos-reveal", 150, wrap);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 7: Contact Form Trust Badges        */
  /* ═══════════════════════════════════════════ */

  function enhanceContact() {
    var section = findSectionByHeading("sounds interesting") || findSectionByHeading("contact us today");
    if (!section) return;

    section.style.background = "#0a0a0f";
    var form = section.querySelector("form");
    if (!form) return;

    /* Insert trust badges before the form */
    var trust = document.createElement("div");
    trust.className = "pbrd-pos-trust";
    trust.innerHTML =
      '<div class="pbrd-pos-trust-item">' + checkSVG + '<span>Android POS pioneer since 2016</span></div>' +
      '<div class="pbrd-pos-trust-item">' + checkSVG + '<span>10,000+ terminals deployed</span></div>' +
      '<div class="pbrd-pos-trust-item">' + checkSVG + '<span>PCI DSS Level 1 certified</span></div>';

    form.parentNode.insertBefore(trust, form);
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

  function init() {
    fixCopy();
    enhanceHero();
    buildLineup();
    enhancePlatform();
    buildUseCases();
    buildSpecTabs();
    enhanceRental();
    enhanceContact();
    console.log("[Paybyrd] POS enhancements loaded");
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
