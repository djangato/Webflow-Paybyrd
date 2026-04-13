/* Paybyrd — Airlines Page: Artisan-Level Enhancement */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/airlines")) return;

  /* ─── Utilities ─── */
  function observeReveal(selector, staggerMs, root) {
    var els = (root || document).querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) { els.forEach(function(e){e.classList.add("pbrd-visible");}); return; }
    var idx = 0;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { var i = idx++; setTimeout(function(){entry.target.classList.add("pbrd-visible");}, i * staggerMs); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(function(e) { obs.observe(e); });
  }

  function findHeading(text) {
    var found = null;
    document.querySelectorAll("h1,h2,h3").forEach(function(h) {
      if (!found && h.textContent.toLowerCase().includes(text.toLowerCase())) found = h;
    });
    return found;
  }

  function findSectionByHeading(text) {
    var h = findHeading(text);
    return h ? (h.closest("section") || h.closest("[class*='section']") || h.parentElement) : null;
  }

  /* ─── Animated counter ─── */
  function countUp(el, target, suffix, prefix) {
    suffix = suffix || ""; prefix = prefix || "";
    var dur = 1800, start = 0, startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(start + (target - start) * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════ */
  /* 1. HERO — Globe + Live Transaction Feed     */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heading = findHeading("modern payments for airlines");
    if (!heading) return;

    heading.innerHTML = "The airline payment platform<br>that outperforms Adyen.";

    var subtitle = heading.nextElementSibling;
    if (subtitle && subtitle.tagName === "P") {
      subtitle.innerHTML = "Higher approval rates. Lower fraud. Zero downtime.<br>Ask TAP Air Portugal.";
    }

    var parent = subtitle ? subtitle.parentElement : heading.parentElement;

    /* ── CTA + social proof ── */
    var ctaWrap = document.createElement("div");
    ctaWrap.className = "pbrd-air-hero-actions pbrd-air-reveal";
    ctaWrap.innerHTML =
      '<a href="/book-demo" class="pbrd-air-hero-cta">Book a 15-min Demo \u2192</a>' +
      '<span class="pbrd-air-hero-proof">Trusted by TAP Air Portugal & Europe\u2019s leading carriers</span>';
    parent.insertBefore(ctaWrap, (subtitle || heading).nextSibling);

    /* ── Live Transaction Feed (no canvas — pure HTML) ── */
    var globeWrap = document.createElement("div");
    globeWrap.className = "pbrd-air-globe-wrap pbrd-air-reveal";
    globeWrap.innerHTML =
      '<div class="pbrd-air-txn-feed" id="pbrd-air-txn-feed"></div>';
    parent.insertBefore(globeWrap, ctaWrap.nextSibling);

    /* ── Competitor ticker strip ── */
    var ticker = document.createElement("div");
    ticker.className = "pbrd-air-ticker-strip pbrd-air-reveal";
    ticker.innerHTML =
      '<div class="pbrd-air-ticker-track">' +
        '<span class="pbrd-air-tick">+4.86% vs Checkout.com</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">+3.16% vs Elavon</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">+1.72% vs Adyen</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">+4.92% vs Nuvei</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">99.999% Uptime</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">192+ Currencies</span>' +
        /* Duplicate for seamless loop */
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">+4.86% vs Checkout.com</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">+3.16% vs Elavon</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">+1.72% vs Adyen</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">+4.92% vs Nuvei</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">99.999% Uptime</span>' +
        '<span class="pbrd-air-tick-dot">\u00b7</span>' +
        '<span class="pbrd-air-tick">192+ Currencies</span>' +
      '</div>';
    parent.insertBefore(ticker, globeWrap.nextSibling);

    /* ── Init transaction feed ── */
    setTimeout(function() { initTransactionFeed(); }, 500);

    observeReveal(".pbrd-air-reveal", 120);
  }

  /* ── Live transaction feed — simulated airline payments ── */
  function initTransactionFeed() {
    var feed = document.getElementById("pbrd-air-txn-feed");
    if (!feed) return;

    var txns = [
      { route: "LIS \u2192 LHR", amount: "\u20AC342.50", method: "Visa", time: "0.3s" },
      { route: "JFK \u2192 LIS", amount: "$1,247.00", method: "Amex", time: "0.4s" },
      { route: "CDG \u2192 GRU", amount: "\u20AC892.75", method: "MC", time: "0.2s" },
      { route: "FRA \u2192 NRT", amount: "\u00A5189,400", method: "JCB", time: "0.5s" },
      { route: "LIS \u2192 MPM", amount: "\u20AC467.20", method: "MB WAY", time: "0.3s" },
      { route: "DXB \u2192 SIN", amount: "AED 2,340", method: "Visa", time: "0.2s" },
      { route: "LAX \u2192 LHR", amount: "$2,156.00", method: "PayPal", time: "0.4s" },
      { route: "LIS \u2192 LUA", amount: "\u20AC578.90", method: "MC", time: "0.3s" },
    ];

    var idx = 0;
    function addTxn() {
      var t = txns[idx % txns.length]; idx++;
      var el = document.createElement("div");
      el.className = "pbrd-air-txn-item pbrd-air-txn--enter";
      el.innerHTML =
        '<span class="pbrd-air-txn-check">\u2713</span>' +
        '<span class="pbrd-air-txn-route">' + t.route + '</span>' +
        '<span class="pbrd-air-txn-amount">' + t.amount + '</span>' +
        '<span class="pbrd-air-txn-method">' + t.method + '</span>' +
        '<span class="pbrd-air-txn-time">' + t.time + '</span>';
      feed.insertBefore(el, feed.firstChild);
      setTimeout(function() { el.classList.remove("pbrd-air-txn--enter"); }, 50);
      /* Remove old items */
      while (feed.children.length > 4) {
        var last = feed.lastChild;
        last.classList.add("pbrd-air-txn--exit");
        setTimeout(function() { if (last.parentElement) last.parentElement.removeChild(last); }, 400);
      }
    }
    addTxn();
    setTimeout(addTxn, 800);
    setInterval(addTxn, 2500);
  }

  /* ═══════════════════════════════════════════ */
  /* 2. PROBLEM — Revenue Leakage Funnel         */
  /* ═══════════════════════════════════════════ */

  function enhanceProblem() {
    var heading = findHeading("airline payments are complex");
    if (!heading) return;

    heading.innerHTML = "$1 billion lost to airline fraud.<br>Every year.";

    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    /* Update paragraph */
    section.querySelectorAll("p").forEach(function(p) {
      if (p.textContent.toLowerCase().includes("involving multiple") || p.textContent.toLowerCase().includes("outdated infrastructure")) {
        p.textContent = "Fraud, failed transactions, currency friction, and cart abandonment drain airline revenue at every stage. Here\u2019s where the money goes:";
      }
      if (p.textContent.toLowerCase().includes("paybyrd simplifies")) {
        p.style.display = "none";
      }
    });

    /* ── Revenue leakage funnel ── */
    var funnel = document.createElement("div");
    funnel.className = "pbrd-air-funnel pbrd-air-reveal";

    funnel.innerHTML =
      /* Funnel stages */
      '<div class="pbrd-air-funnel-stage pbrd-air-funnel-s1">' +
        '<div class="pbrd-air-funnel-bar"></div>' +
        '<div class="pbrd-air-funnel-content">' +
          '<span class="pbrd-air-funnel-val" data-target="79">0%</span>' +
          '<span class="pbrd-air-funnel-lbl">Cart Abandonment</span>' +
          '<span class="pbrd-air-funnel-fix">Paybyrd: Optimized checkout \u2192 recover 15-20%</span>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-air-funnel-stage pbrd-air-funnel-s2">' +
        '<div class="pbrd-air-funnel-bar"></div>' +
        '<div class="pbrd-air-funnel-content">' +
          '<span class="pbrd-air-funnel-val" data-target="30">0%</span>' +
          '<span class="pbrd-air-funnel-lbl">Missing Local Methods</span>' +
          '<span class="pbrd-air-funnel-fix">Paybyrd: 192+ currencies, local methods globally</span>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-air-funnel-stage pbrd-air-funnel-s3">' +
        '<div class="pbrd-air-funnel-bar"></div>' +
        '<div class="pbrd-air-funnel-content">' +
          '<span class="pbrd-air-funnel-val" data-target="17">0%</span>' +
          '<span class="pbrd-air-funnel-lbl">Fraud & Chargebacks</span>' +
          '<span class="pbrd-air-funnel-fix">Paybyrd: AI screening \u2192 16.8% reduction</span>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-air-funnel-stage pbrd-air-funnel-s4">' +
        '<div class="pbrd-air-funnel-bar"></div>' +
        '<div class="pbrd-air-funnel-content">' +
          '<span class="pbrd-air-funnel-val" data-target="15">0%</span>' +
          '<span class="pbrd-air-funnel-lbl">Cross-Border Fees</span>' +
          '<span class="pbrd-air-funnel-fix">Paybyrd: Local routing \u2192 10-15% fee reduction</span>' +
        '</div>' +
      '</div>';

    /* Find last visible paragraph and insert after */
    var paras = section.querySelectorAll("p");
    var lastP = null;
    paras.forEach(function(p) { if (p.style.display !== "none") lastP = p; });
    if (lastP) lastP.parentElement.insertBefore(funnel, lastP.nextSibling);
    else section.appendChild(funnel);

    /* Animate counters on scroll */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          funnel.querySelectorAll(".pbrd-air-funnel-val").forEach(function(el) {
            var target = parseInt(el.getAttribute("data-target"));
            countUp(el, target, "%");
          });
          funnel.classList.add("pbrd-air-funnel--visible");
          this.disconnect();
        }
      }, { threshold: 0.3 }).observe(funnel);
    }

    observeReveal(".pbrd-air-reveal", 150, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 3. FEATURES — Live Dashboard + Benchmark    */
  /* ═══════════════════════════════════════════ */

  function enhanceFeatures() {
    var heading = findHeading("built for the way airlines");
    if (!heading) return;
    heading.textContent = "Built for airlines. Proven in production.";

    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    /* Enhance card copy */
    var cardUpdates = [
      { find: "global", text: "Process in 192+ currencies with local routing. Transactions clear through regional acquirers for 4\u20137% higher authorization rates and 10\u201315% lower cross-border fees." },
      { find: "dashboard", text: "Route-level filters, real-time reconciliation, and role-based views for finance, ops, and customer service. Track performance by country, channel, or payment method." },
      { find: "fraud", text: "AI velocity screening with shared fraud database across all merchants. 3D Secure, automated dispute handling. Result: 16.8% chargeback reduction." },
      { find: "flexibility", text: "Modular architecture connects to Amadeus, IATA, GDS, BSP, and NDC. Self-host payment modules or use our full-stack platform." }
    ];
    section.querySelectorAll("p").forEach(function(p) {
      var txt = p.textContent.toLowerCase();
      cardUpdates.forEach(function(u) { if (txt.includes(u.find)) p.textContent = u.text; });
    });

    /* ── Benchmark race chart ── */
    var bench = document.createElement("div");
    bench.className = "pbrd-air-benchmark pbrd-air-reveal";
    bench.innerHTML =
      '<div class="pbrd-air-bench-header">' +
        '<div class="pbrd-air-section-label">APPROVAL RATE ADVANTAGE</div>' +
        '<h4>Paybyrd vs. the competition</h4>' +
        '<p>Production data from airline transactions</p>' +
      '</div>' +
      '<div class="pbrd-air-bench-row">' +
        '<span class="pbrd-air-bench-name">vs Adyen</span>' +
        '<div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar" data-width="35" style="background:linear-gradient(90deg,#0ea5e9,#38bdf8)"></div></div>' +
        '<span class="pbrd-air-bench-val">+1.72%</span>' +
      '</div>' +
      '<div class="pbrd-air-bench-row">' +
        '<span class="pbrd-air-bench-name">vs Elavon</span>' +
        '<div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar" data-width="64" style="background:linear-gradient(90deg,#0ea5e9,#06b6d4)"></div></div>' +
        '<span class="pbrd-air-bench-val">+3.16%</span>' +
      '</div>' +
      '<div class="pbrd-air-bench-row">' +
        '<span class="pbrd-air-bench-name">vs Checkout.com</span>' +
        '<div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar" data-width="98" style="background:linear-gradient(90deg,#0ea5e9,#0891b2)"></div></div>' +
        '<span class="pbrd-air-bench-val">+4.86%</span>' +
      '</div>' +
      '<div class="pbrd-air-bench-row pbrd-air-bench-row--highlight">' +
        '<span class="pbrd-air-bench-name">vs Nuvei</span>' +
        '<div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar" data-width="100" style="background:linear-gradient(90deg,#0ea5e9,#0e7490)"></div></div>' +
        '<span class="pbrd-air-bench-val">+4.92%</span>' +
      '</div>';

    /* Insert after card grid */
    var cardGrid = section.querySelector("[class*='grid']");
    var insertTarget = cardGrid || heading;
    while (insertTarget.parentElement && window.getComputedStyle(insertTarget.parentElement).display === "contents") {
      insertTarget = insertTarget.parentElement;
    }
    if (insertTarget.parentElement) {
      insertTarget.parentElement.insertBefore(bench, insertTarget.nextSibling);
    }

    /* Animate bars on scroll */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          bench.querySelectorAll(".pbrd-air-bench-bar").forEach(function(bar, i) {
            var w = bar.getAttribute("data-width");
            setTimeout(function() { bar.style.width = w + "%"; }, 200 + i * 150);
          });
          this.disconnect();
        }
      }, { threshold: 0.3 }).observe(bench);
    }

    observeReveal(".pbrd-air-reveal", 100, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 4. TAP TESTIMONIAL — Premium Card           */
  /* ═══════════════════════════════════════════ */

  function buildTestimonial() {
    var anchor = findSectionByHeading("designed for the passenger") || findSectionByHeading("works with your stack");
    if (!anchor) return;

    var newSection = document.createElement("section");
    newSection.style.padding = "60px 0";

    var wrap = document.createElement("div");
    wrap.className = "pbrd-air-testimonial-wrap";
    wrap.innerHTML =
      '<div class="pbrd-air-section-label" style="text-align:center;margin-bottom:24px">TRUSTED BY INDUSTRY LEADERS</div>' +
      '<div class="pbrd-air-testimonial pbrd-air-reveal">' +
        '<p class="pbrd-air-testimonial-quote">The A77 Terminal, developed in collaboration with Paybyrd, emerged as a true powerhouse, revolutionizing the entire process at Boarding Gates.</p>' +
        '<div class="pbrd-air-testimonial-author">' +
          '<div class="pbrd-air-testimonial-avatar">JF</div>' +
          '<div class="pbrd-air-testimonial-info">' +
            '<div class="pbrd-air-testimonial-name">Jo\u00E3o Frias</div>' +
            '<div class="pbrd-air-testimonial-role">Head of Payments, TAP Air Portugal</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    newSection.appendChild(wrap);
    anchor.parentNode.insertBefore(newSection, anchor);
    observeReveal(".pbrd-air-reveal", 100, wrap);
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
      if (p.textContent.toLowerCase().includes("unlock") || p.textContent.toLowerCase().includes("revenue potential")) {
        p.textContent = "Join TAP Air Portugal and Europe\u2019s leading carriers. Most airlines see measurable results within 30 days.";
      }
    });

    section.querySelectorAll("a").forEach(function(a) {
      if (a.textContent.toLowerCase().includes("start now")) {
        a.textContent = "Book Your 15-Minute Demo \u2192";
        a.href = "/book-demo";
        a.style.setProperty("background", "#FF6B35", "important");
        a.style.setProperty("border-radius", "100px", "important");
        a.style.setProperty("padding", "14px 36px", "important");
        a.style.setProperty("font-weight", "600", "important");
      }
    });
  }

  /* ═══════════════════════════════════════════ */
  /* 6. FAQ Enhancement                          */
  /* ═══════════════════════════════════════════ */

  function enhanceFAQ() {
    document.querySelectorAll("[class*='accordion'] p, [class*='faq'] p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      if (t.includes("reconciling ticket payments")) {
        p.textContent = "Typically 2\u20134 weeks for full integration. Our modular architecture connects directly to Amadeus, IATA, GDS, BSP, and NDC without disrupting live operations. TAP Air Portugal went live across all channels within weeks.";
      }
      if (t.includes("smart routing and fx")) {
        p.textContent = "Smart multi-acquiring routes each transaction to the optimal acquirer. Local routing processes through regional banks for 4\u20137% higher authorization. Airlines using Paybyrd have cut transaction costs by up to 15%, with 10\u201315% reduction in cross-border fees.";
      }
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
