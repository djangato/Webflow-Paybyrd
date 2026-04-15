/* Paybyrd — Retail Page: Complete Override */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/retail")) return;

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
    document.querySelectorAll("h1,h2,h3,h4,legend").forEach(function(h) {
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
      var v = target % 1 === 0 ? Math.round(target * (1 - Math.pow(1 - p, 3))) : (target * (1 - Math.pow(1 - p, 3))).toFixed(1);
      el.textContent = prefix + v + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════ */
  /* 1. HERO                                     */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heading = findHeading("payments that work in store");
    if (!heading) heading = findHeading("everywhere in between");
    if (!heading) return;
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    section.style.setProperty("padding", "0", "important");
    section.style.setProperty("margin", "0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-ret-hero-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-hero-wrap";
    wrap.style.setProperty("padding-top", "140px", "important");
    wrap.style.setProperty("padding-bottom", "60px", "important");

    wrap.innerHTML =
      '<div class="pbrd-ret-hero-content pbrd-ret-reveal">' +
        '<h1 class="pbrd-ret-hero-h1">Turn every transaction<br>into intelligence.</h1>' +
        '<p class="pbrd-ret-hero-sub">Real-time insights across POS, e-commerce, mobile, and kiosk. One platform. Zero blind spots.</p>' +
        '<div class="pbrd-ret-hero-ctas">' +
          '<a href="/book-demo" class="pbrd-ret-cta-primary">Book a 15-min Demo \u2192</a>' +
          '<a href="#pbrd-ret-heatmap" class="pbrd-ret-cta-ghost">See the dashboard</a>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-ret-hero-viz pbrd-ret-reveal">' +
        '<div class="pbrd-ret-txn-feed" id="pbrd-ret-txn-feed">' +
          '<div class="pbrd-ret-txn-head"><span class="pbrd-ret-txn-dot"></span>Live Transactions</div>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-ret-ticker pbrd-ret-reveal">' +
        '<span>4\u20137% Higher Auth</span><span class="pbrd-ret-ticker-sep">\u00b7</span>' +
        '<span>39% Less Queue Drop-off</span><span class="pbrd-ret-ticker-sep">\u00b7</span>' +
        '<span>16.8% Fewer Chargebacks</span><span class="pbrd-ret-ticker-sep">\u00b7</span>' +
        '<span>PCI Level 1</span>' +
      '</div>';

    section.appendChild(wrap);

    /* Live transaction feed */
    var txns = [
      { store: "Store Lisboa", amount: "\u20AC87.50", method: "Visa", color: "#1A1F71" },
      { store: "Online", amount: "\u20AC234.00", method: "Mastercard", color: "#EB001B" },
      { store: "Kiosk Porto", amount: "\u20AC12.90", method: "Apple Pay", color: "#333" },
      { store: "Store Faro", amount: "\u20AC156.00", method: "MB Way", color: "#D4002A" },
      { store: "Online", amount: "\u20AC67.80", method: "Google Pay", color: "#4285F4" },
      { store: "Store Cascais", amount: "\u20AC342.00", method: "Visa", color: "#1A1F71" },
      { store: "Mobile", amount: "\u20AC29.90", method: "Mastercard", color: "#EB001B" },
      { store: "Store Braga", amount: "\u20AC198.50", method: "Visa", color: "#1A1F71" }
    ];
    var txnIdx = 0;
    var feed = document.getElementById("pbrd-ret-txn-feed");
    function addTxn() {
      if (!feed) return;
      var t = txns[txnIdx % txns.length]; txnIdx++;
      var el = document.createElement("div");
      el.className = "pbrd-ret-txn-item";
      el.style.opacity = "0";
      el.innerHTML = '<span class="pbrd-ret-txn-method" style="background:' + t.color + '">' + t.method.charAt(0) + '</span>' +
        '<span class="pbrd-ret-txn-store">' + t.store + '</span>' +
        '<span class="pbrd-ret-txn-amount">' + t.amount + '</span>' +
        '<span class="pbrd-ret-txn-status">\u2713</span>';
      var items = feed.querySelectorAll(".pbrd-ret-txn-item");
      if (items.length >= 5) { var old = items[items.length - 1]; old.style.opacity = "0"; setTimeout(function() { if (old.parentNode) old.parentNode.removeChild(old); }, 300); }
      feed.appendChild(el);
      var headEl = feed.querySelector(".pbrd-ret-txn-head");
      if (headEl && headEl.nextSibling) feed.insertBefore(el, headEl.nextSibling);
      setTimeout(function() { el.style.opacity = "1"; }, 50);
      setTimeout(addTxn, 1800);
    }
    new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) { addTxn(); this.disconnect(); } }, { threshold: 0.1 }).observe(wrap);

    observeReveal(".pbrd-ret-hero-wrap .pbrd-ret-reveal", 150);
  }

  /* ═══════════════════════════════════════════ */
  /* 2. PAIN POINTS — Peak Hours Heatmap         */
  /* ═══════════════════════════════════════════ */

  function enhancePainPoints() {
    var section = findSectionByHeading("retail moves fast");
    if (!section) return;

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-ret-pain-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-pain-wrap";

    /* Heatmap data — realistic retail pattern */
    var heatData = [
      /* Sun */ [0.05,0.02,0.02,0.01,0.01,0.02,0.05,0.10,0.20,0.35,0.50,0.65,0.70,0.65,0.55,0.50,0.55,0.60,0.55,0.45,0.35,0.25,0.15,0.08],
      /* Mon */ [0.03,0.02,0.01,0.01,0.01,0.03,0.08,0.20,0.45,0.60,0.65,0.75,0.90,0.80,0.55,0.50,0.60,0.80,0.85,0.70,0.50,0.30,0.15,0.05],
      /* Tue */ [0.03,0.02,0.01,0.01,0.01,0.03,0.08,0.22,0.48,0.62,0.68,0.78,0.95,0.82,0.55,0.52,0.62,0.82,0.88,0.72,0.52,0.32,0.15,0.05],
      /* Wed */ [0.03,0.02,0.01,0.01,0.01,0.03,0.08,0.20,0.45,0.60,0.65,0.75,0.88,0.78,0.52,0.48,0.58,0.78,0.82,0.68,0.48,0.28,0.14,0.05],
      /* Thu */ [0.03,0.02,0.01,0.01,0.01,0.03,0.08,0.22,0.48,0.65,0.70,0.80,0.92,0.82,0.58,0.55,0.65,0.85,0.90,0.75,0.55,0.35,0.18,0.06],
      /* Fri */ [0.04,0.03,0.02,0.01,0.01,0.03,0.10,0.25,0.50,0.68,0.75,0.85,1.00,0.90,0.65,0.60,0.70,0.90,0.95,0.85,0.70,0.50,0.30,0.12],
      /* Sat */ [0.05,0.03,0.02,0.01,0.01,0.02,0.08,0.18,0.35,0.55,0.70,0.85,0.95,0.90,0.80,0.75,0.70,0.65,0.55,0.45,0.35,0.25,0.15,0.08]
    ];
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    var heatCells = "";
    for (var r = 0; r < 7; r++) {
      for (var c = 0; c < 24; c++) {
        var intensity = heatData[r][c];
        var dur = (2 + ((r * 5 + c * 3) % 5)).toFixed(1);
        var begin = ((r * 3 + c * 2) % 7 * 0.3).toFixed(1);
        heatCells += '<div class="pbrd-ret-hm-cell" style="--op:' + intensity + ';--dur:' + dur + 's;--begin:' + begin + 's"></div>';
      }
    }

    var hourLabels = "";
    for (var h = 0; h < 24; h++) {
      hourLabels += '<span>' + (h < 10 ? "0" : "") + h + '</span>';
    }

    var dayLabels = days.map(function(d) { return '<span>' + d + '</span>'; }).join("");

    wrap.innerHTML =
      '<div class="pbrd-ret-pain-header pbrd-ret-reveal">' +
        '<div class="pbrd-ret-section-label">PEAK HOURS INTELLIGENCE</div>' +
        '<h2 class="pbrd-ret-pain-h2">Your busiest hour is your leakiest.<br>Here\u2019s the proof.</h2>' +
      '</div>' +

      '<div class="pbrd-ret-heatmap pbrd-ret-reveal" id="pbrd-ret-heatmap">' +
        '<div class="pbrd-ret-hm-title">Peak Transaction Hours</div>' +
        '<div class="pbrd-ret-hm-subtitle">When your customers pay \u2014 optimize staffing and promotions</div>' +
        '<div class="pbrd-ret-hm-hours">' + hourLabels + '</div>' +
        '<div class="pbrd-ret-hm-body">' +
          '<div class="pbrd-ret-hm-days">' + dayLabels + '</div>' +
          '<div class="pbrd-ret-hm-grid">' + heatCells + '</div>' +
        '</div>' +
        '<div class="pbrd-ret-hm-legend">' +
          '<span>Less</span>' +
          '<div class="pbrd-ret-hm-legend-bar"></div>' +
          '<span>More</span>' +
        '</div>' +
      '</div>' +

      '<div class="pbrd-ret-pain-stats pbrd-ret-reveal">' +
        '<div class="pbrd-ret-pain-stat">' +
          '<svg viewBox="0 0 40 40" class="pbrd-ret-pain-ring"><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2.5"/><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(239,68,68,0.6)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="107" stroke-dashoffset="107" transform="rotate(-90 20 20)" class="pbrd-ret-ring-fill" data-offset="80"/></svg>' +
          '<div class="pbrd-ret-pain-stat-val" data-target="25" data-suffix="%">0%</div>' +
          '<div class="pbrd-ret-pain-stat-lbl">checkout abandonment</div>' +
        '</div>' +
        '<div class="pbrd-ret-pain-stat">' +
          '<svg viewBox="0 0 40 40" class="pbrd-ret-pain-ring"><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2.5"/><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(245,158,11,0.6)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="107" stroke-dashoffset="107" transform="rotate(-90 20 20)" class="pbrd-ret-ring-fill" data-offset="65"/></svg>' +
          '<div class="pbrd-ret-pain-stat-val" data-target="39" data-suffix="%">0%</div>' +
          '<div class="pbrd-ret-pain-stat-lbl">peak-hour drop-offs</div>' +
        '</div>' +
        '<div class="pbrd-ret-pain-stat">' +
          '<svg viewBox="0 0 40 40" class="pbrd-ret-pain-ring"><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2.5"/><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(234,179,8,0.6)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="107" stroke-dashoffset="107" transform="rotate(-90 20 20)" class="pbrd-ret-ring-fill" data-offset="55"/></svg>' +
          '<div class="pbrd-ret-pain-stat-val" data-target="15" data-suffix="+ hrs">0+ hrs</div>' +
          '<div class="pbrd-ret-pain-stat-lbl">monthly reconciliation waste</div>' +
        '</div>' +
      '</div>' +

      '<p class="pbrd-ret-pain-footer pbrd-ret-reveal">Paybyrd shows you exactly when and where you\u2019re losing revenue \u2014 in real time.</p>';

    section.appendChild(wrap);

    /* Animate rings + counters on scroll */
    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        wrap.querySelectorAll(".pbrd-ret-ring-fill").forEach(function(ring) {
          var off = ring.getAttribute("data-offset");
          ring.style.transition = "stroke-dashoffset 1.2s ease";
          ring.style.strokeDashoffset = off;
        });
        wrap.querySelectorAll(".pbrd-ret-pain-stat-val").forEach(function(el) {
          var t = parseInt(el.getAttribute("data-target"));
          var s = el.getAttribute("data-suffix");
          countUp(el, t, s);
        });
        this.disconnect();
      }
    }, { threshold: 0.2 }).observe(wrap);

    observeReveal(".pbrd-ret-pain-wrap .pbrd-ret-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 3. FEATURES — 4 Cards with Live Viz         */
  /* ═══════════════════════════════════════════ */

  function enhanceFeatures() {
    var section = findSectionByHeading("built for the way retail");
    if (!section) return;

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-ret-feat-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-feat-wrap";

    wrap.innerHTML =
      '<div class="pbrd-ret-feat-header pbrd-ret-reveal">' +
        '<div class="pbrd-ret-section-label">CAPABILITIES</div>' +
        '<h2 class="pbrd-ret-feat-h2">Four pillars of retail<br>payment intelligence</h2>' +
      '</div>' +

      '<div class="pbrd-ret-feat-grid">' +

        /* Card 1: Unified Commerce */
        '<div class="pbrd-ret-feat-card pbrd-ret-reveal">' +
          '<div class="pbrd-ret-feat-viz">' +
            '<svg viewBox="0 0 260 120" fill="none" style="width:100%;height:100%">' +
              '<rect x="10" y="30" width="40" height="55" rx="4" stroke="rgba(99,25,240,0.3)" stroke-width="1" fill="rgba(99,25,240,0.05)"/>' +
              '<text x="30" y="55" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="5" font-family="system-ui">POS</text>' +
              '<rect x="70" y="35" width="50" height="35" rx="3" stroke="rgba(99,25,240,0.3)" stroke-width="1" fill="rgba(99,25,240,0.05)"/>' +
              '<text x="95" y="55" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="5" font-family="system-ui">E-COM</text>' +
              '<rect x="25" y="95" width="25" height="15" rx="6" stroke="rgba(99,25,240,0.3)" stroke-width="1" fill="rgba(99,25,240,0.05)"/>' +
              '<text x="38" y="105" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="4" font-family="system-ui">MOBILE</text>' +
              '<path d="M50,58 L155,58" stroke="rgba(99,25,240,0.15)" stroke-width="1" stroke-dasharray="4 3"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite"/></path>' +
              '<path d="M120,52 L155,52" stroke="rgba(99,25,240,0.15)" stroke-width="1" stroke-dasharray="4 3"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="2.5s" repeatCount="indefinite"/></path>' +
              '<path d="M50,102 L155,65" stroke="rgba(99,25,240,0.15)" stroke-width="1" stroke-dasharray="4 3"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="3s" repeatCount="indefinite"/></path>' +
              '<rect x="155" y="35" width="90" height="50" rx="8" stroke="rgba(99,25,240,0.4)" stroke-width="1.5" fill="rgba(99,25,240,0.06)"/>' +
              '<text x="200" y="55" text-anchor="middle" fill="#6319f0" font-size="6" font-weight="700" font-family="system-ui">DASHBOARD</text>' +
              '<text x="200" y="68" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="4" font-family="system-ui">Unified View</text>' +
            '</svg>' +
          '</div>' +
          '<h3>Every channel. One view.</h3>' +
          '<p>POS, e-commerce, mobile, kiosk \u2014 all transactions flow into a single real-time dashboard.</p>' +
        '</div>' +

        /* Card 2: Smart Routing */
        '<div class="pbrd-ret-feat-card pbrd-ret-reveal">' +
          '<div class="pbrd-ret-feat-viz">' +
            '<div class="pbrd-ret-bench">' +
              '<div class="pbrd-ret-bench-row"><span class="pbrd-ret-bench-name">Nuvei</span><div class="pbrd-ret-bench-bar-wrap"><div class="pbrd-ret-bench-bar pbrd-ret-bench-them" style="width:0" data-w="65%"></div></div><span class="pbrd-ret-bench-loss">\u22124.92%</span></div>' +
              '<div class="pbrd-ret-bench-row"><span class="pbrd-ret-bench-name">Checkout.com</span><div class="pbrd-ret-bench-bar-wrap"><div class="pbrd-ret-bench-bar pbrd-ret-bench-them" style="width:0" data-w="70%"></div></div><span class="pbrd-ret-bench-loss">\u22124.86%</span></div>' +
              '<div class="pbrd-ret-bench-row"><span class="pbrd-ret-bench-name">Elavon</span><div class="pbrd-ret-bench-bar-wrap"><div class="pbrd-ret-bench-bar pbrd-ret-bench-them" style="width:0" data-w="80%"></div></div><span class="pbrd-ret-bench-loss">\u22123.16%</span></div>' +
              '<div class="pbrd-ret-bench-row"><span class="pbrd-ret-bench-name">Adyen</span><div class="pbrd-ret-bench-bar-wrap"><div class="pbrd-ret-bench-bar pbrd-ret-bench-them" style="width:0" data-w="88%"></div></div><span class="pbrd-ret-bench-loss">\u22121.72%</span></div>' +
              '<div class="pbrd-ret-bench-row"><span class="pbrd-ret-bench-name">Paybyrd</span><div class="pbrd-ret-bench-bar-wrap"><div class="pbrd-ret-bench-bar pbrd-ret-bench-us" style="width:0" data-w="98%"></div></div><span class="pbrd-ret-bench-val">98.2%</span></div>' +
            '</div>' +
          '</div>' +
          '<h3>Higher approval. Lower cost.</h3>' +
          '<p>Multi-acquirer routing sends each transaction to the best acquirer. 4\u20137% higher auth rates.</p>' +
        '</div>' +

        /* Card 3: Customer Intelligence */
        '<div class="pbrd-ret-feat-card pbrd-ret-reveal">' +
          '<div class="pbrd-ret-feat-viz">' +
            '<div class="pbrd-ret-cust-feed" id="pbrd-ret-cust-feed">' +
              '<div class="pbrd-ret-cust-head">Top Customers</div>' +
            '</div>' +
          '</div>' +
          '<h3>Know your customers before they pay.</h3>' +
          '<p>Returning customer detection, purchase frequency, lifetime value \u2014 all from card tokens.</p>' +
        '</div>' +

        /* Card 4: Reconciliation */
        '<div class="pbrd-ret-feat-card pbrd-ret-reveal">' +
          '<div class="pbrd-ret-feat-viz">' +
            '<div class="pbrd-ret-recon">' +
              '<div class="pbrd-ret-recon-counter">' +
                '<span class="pbrd-ret-recon-val" id="pbrd-ret-recon-count">0</span>' +
                '<span class="pbrd-ret-recon-lbl">transactions reconciled</span>' +
              '</div>' +
              '<div class="pbrd-ret-recon-bar"><div class="pbrd-ret-recon-fill" id="pbrd-ret-recon-bar"></div></div>' +
              '<div class="pbrd-ret-recon-badges">' +
                '<span class="pbrd-ret-recon-badge">Gross settlement</span>' +
                '<span class="pbrd-ret-recon-badge">Daily payouts</span>' +
                '<span class="pbrd-ret-recon-badge">Zero deductions</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<h3>Close the books in seconds.</h3>' +
          '<p>AI-powered reconciliation per channel, outlet, and shift. Gross settlement means easy accounting.</p>' +
        '</div>' +

      '</div>';

    section.appendChild(wrap);

    /* Animate benchmark bars */
    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        wrap.querySelectorAll(".pbrd-ret-bench-bar").forEach(function(bar) {
          var w = bar.getAttribute("data-w");
          setTimeout(function() { bar.style.transition = "width 1s ease"; bar.style.width = w; }, 300);
        });
        this.disconnect();
      }
    }, { threshold: 0.2 }).observe(wrap);

    /* Customer feed */
    var customers = [
      { name: "Maria Santos", txns: "142", spend: "\u20AC18,420", returning: true },
      { name: "Jo\u00e3o Silva", txns: "87", spend: "\u20AC9,340", returning: true },
      { name: "Ana Costa", txns: "203", spend: "\u20AC31,200", returning: true },
      { name: "Pedro Oliveira", txns: "56", spend: "\u20AC4,890", returning: false },
      { name: "Sofia Martins", txns: "178", spend: "\u20AC22,100", returning: true }
    ];
    var custIdx = 0;
    var custFeed = document.getElementById("pbrd-ret-cust-feed");
    function addCust() {
      if (!custFeed) return;
      var c = customers[custIdx % customers.length]; custIdx++;
      var el = document.createElement("div");
      el.className = "pbrd-ret-cust-row";
      el.style.opacity = "0";
      el.innerHTML = '<span class="pbrd-ret-cust-avatar">' + c.name.charAt(0) + '</span>' +
        '<span class="pbrd-ret-cust-name">' + c.name + '</span>' +
        (c.returning ? '<span class="pbrd-ret-cust-badge">Returning</span>' : '') +
        '<span class="pbrd-ret-cust-spend">' + c.spend + '</span>';
      var items = custFeed.querySelectorAll(".pbrd-ret-cust-row");
      if (items.length >= 3) { var old = items[items.length - 1]; old.style.opacity = "0"; setTimeout(function() { if (old.parentNode) old.parentNode.removeChild(old); }, 300); }
      var headEl = custFeed.querySelector(".pbrd-ret-cust-head");
      if (headEl && headEl.nextSibling) custFeed.insertBefore(el, headEl.nextSibling);
      else custFeed.appendChild(el);
      setTimeout(function() { el.style.opacity = "1"; }, 50);
      setTimeout(addCust, 3000);
    }
    new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) { addCust(); this.disconnect(); } }, { threshold: 0.2 }).observe(custFeed);

    /* Reconciliation counter */
    var reconCount = 0;
    var reconEl = document.getElementById("pbrd-ret-recon-count");
    var reconBar = document.getElementById("pbrd-ret-recon-bar");
    function tickRecon() {
      reconCount += Math.floor(Math.random() * 12) + 3;
      if (reconEl) reconEl.textContent = reconCount.toLocaleString();
      if (reconBar) reconBar.style.width = Math.min(100, (reconCount / 500) * 100) + "%";
      setTimeout(tickRecon, 800);
    }
    new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) { tickRecon(); this.disconnect(); } }, { threshold: 0.2 }).observe(wrap);

    observeReveal(".pbrd-ret-feat-wrap .pbrd-ret-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 4. DATA SECTION — GSAP copy + BI cards      */
  /* ═══════════════════════════════════════════ */

  function enhanceDataSection() {
    var heading = findHeading("spot friction");
    if (!heading) heading = findHeading("act faster");
    if (!heading) return;
    heading.innerHTML = "Intelligence that turns<br>foot traffic into revenue.";
    heading.style.setProperty("margin-bottom", "24px", "important");

    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    var existingSub = heading.nextElementSibling;
    if (existingSub && existingSub.tagName === "P") {
      existingSub.textContent = "Every tap, swipe, and scan tells a story. Paybyrd reads it before your competitors do.";
      existingSub.style.setProperty("font-size", "1rem", "important");
      existingSub.style.setProperty("color", "#888", "important");
      existingSub.style.setProperty("max-width", "560px", "important");
      existingSub.style.setProperty("margin", "24px auto 0", "important");
      existingSub.style.setProperty("line-height", "1.6", "important");
      existingSub.style.setProperty("text-align", "center", "important");
    }

    /* Replace repeated text blocks with BI cards */
    var biCards = [
      { title: "Top Transactions",
        desc: "Real-time feed of your highest-value sales across all channels.",
        svg: '<svg viewBox="0 0 260 110" fill="none">' +
          '<text x="6" y="12" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="700" font-family="system-ui">TOP TRANSACTIONS</text>' +
          '<text x="6" y="32" fill="rgba(255,255,255,0.4)" font-size="5.5" font-family="system-ui">Store Lisboa \u00b7 Visa</text><text x="230" y="32" text-anchor="end" fill="rgba(255,255,255,0.8)" font-size="6" font-weight="600" font-family="system-ui">\u20AC342.00</text>' +
          '<rect x="6" y="38" width="248" height="0.5" fill="rgba(255,255,255,0.04)"/>' +
          '<text x="6" y="52" fill="rgba(255,255,255,0.4)" font-size="5.5" font-family="system-ui">Online \u00b7 Mastercard</text><text x="230" y="52" text-anchor="end" fill="rgba(255,255,255,0.8)" font-size="6" font-weight="600" font-family="system-ui">\u20AC234.00</text>' +
          '<rect x="6" y="58" width="248" height="0.5" fill="rgba(255,255,255,0.04)"/>' +
          '<text x="6" y="72" fill="rgba(255,255,255,0.4)" font-size="5.5" font-family="system-ui">Kiosk Porto \u00b7 Apple Pay</text><text x="230" y="72" text-anchor="end" fill="rgba(255,255,255,0.8)" font-size="6" font-weight="600" font-family="system-ui">\u20AC198.50</text>' +
          '<rect x="6" y="78" width="248" height="0.5" fill="rgba(255,255,255,0.04)"/>' +
          '<text x="6" y="92" fill="rgba(255,255,255,0.4)" font-size="5.5" font-family="system-ui">Store Faro \u00b7 MB Way</text><text x="230" y="92" text-anchor="end" fill="rgba(255,255,255,0.8)" font-size="6" font-weight="600" font-family="system-ui">\u20AC156.00</text>' +
        '</svg>' },
      { title: "Customer Detail",
        desc: "Purchase frequency, spend trend, and lifetime value per customer.",
        svg: '<svg viewBox="0 0 260 110" fill="none">' +
          '<circle cx="20" cy="22" r="12" fill="rgba(99,25,240,0.15)" stroke="rgba(99,25,240,0.3)" stroke-width="1"/>' +
          '<text x="20" y="25" text-anchor="middle" fill="#6319f0" font-size="8" font-weight="700" font-family="system-ui">M</text>' +
          '<text x="40" y="19" fill="rgba(255,255,255,0.8)" font-size="6" font-weight="600" font-family="system-ui">Murilo Leite</text>' +
          '<text x="40" y="29" fill="rgba(255,255,255,0.3)" font-size="4.5" font-family="system-ui">90 transactions \u00b7 \u20AC73,670</text>' +
          '<rect x="6" y="42" width="248" height="0.5" fill="rgba(255,255,255,0.06)"/>' +
          '<text x="6" y="56" fill="rgba(255,255,255,0.3)" font-size="4.5" font-weight="600" font-family="system-ui">SPEND TREND</text>' +
          '<path d="M6 95 C30 90, 50 85, 70 80 S100 70, 120 65 S150 60, 170 62 S200 58, 220 55 S240 52, 254 50" stroke="rgba(99,25,240,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round"><animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" fill="freeze"/></path>' +
          '<text x="6" y="108" fill="rgba(255,255,255,0.25)" font-size="4" font-family="system-ui">Mar</text><text x="128" y="108" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="4" font-family="system-ui">Apr</text><text x="250" y="108" text-anchor="end" fill="rgba(255,255,255,0.25)" font-size="4" font-family="system-ui">May</text>' +
        '</svg>' },
      { title: "Revenue by Channel",
        desc: "See which channels drive the most revenue and optimize accordingly.",
        svg: '<svg viewBox="0 0 260 100" fill="none">' +
          '<text x="6" y="10" fill="rgba(255,255,255,0.5)" font-size="5.5" font-weight="700" font-family="system-ui">REVENUE BY CHANNEL</text>' +
          '<text x="6" y="30" fill="rgba(255,255,255,0.4)" font-size="5.5" font-family="system-ui">POS In-Store</text>' +
          '<rect x="68" y="22" width="0" height="12" rx="3" fill="#6319f0" opacity="0.85"><animate attributeName="width" values="0;155" dur="1s" begin="0.3s" fill="freeze"/></rect>' +
          '<text x="230" y="31" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1s" fill="freeze"/>62%</text>' +
          '<text x="6" y="55" fill="rgba(255,255,255,0.4)" font-size="5.5" font-family="system-ui">E-Commerce</text>' +
          '<rect x="68" y="47" width="0" height="12" rx="3" fill="rgba(99,25,240,0.6)"><animate attributeName="width" values="0;70" dur="1s" begin="0.5s" fill="freeze"/></rect>' +
          '<text x="145" y="56" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.2s" fill="freeze"/>28%</text>' +
          '<text x="6" y="80" fill="rgba(255,255,255,0.4)" font-size="5.5" font-family="system-ui">Mobile</text>' +
          '<rect x="68" y="72" width="0" height="12" rx="3" fill="rgba(99,25,240,0.35)"><animate attributeName="width" values="0;25" dur="1s" begin="0.7s" fill="freeze"/></rect>' +
          '<text x="100" y="81" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.4s" fill="freeze"/>10%</text>' +
        '</svg>' }
    ];

    var biIdx = 0;
    section.querySelectorAll("p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      if ((t.includes("every interaction") || t.includes("opportunity to learn") || t.includes("make the most")) && biIdx < 3) {
        var card = biCards[biIdx];
        p.innerHTML =
          '<div style="background:#0e0e18;border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid rgba(99,25,240,0.1);">' + card.svg + '</div>' +
          '<strong style="font-size:0.9375rem;color:#111;display:block;margin-bottom:4px;">' + card.title + '</strong>' +
          '<span style="font-size:0.8125rem;color:#666;line-height:1.5;">' + card.desc + '</span>';
        biIdx++;
      }
    });
  }

  /* ═══════════════════════════════════════════ */
  /* 5. INTEGRATION — Speed Comparison           */
  /* ═══════════════════════════════════════════ */

  function enhanceIntegrations() {
    var section = findSectionByHeading("works with the stack");
    if (!section) return;

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-ret-stack-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-stack-wrap";

    var iconEcom = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="pbrd-ret-stack-icon"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>';
    var iconAPI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="pbrd-ret-stack-icon"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>';
    var iconPOS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="pbrd-ret-stack-icon"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20"/></svg>';
    var iconERP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="pbrd-ret-stack-icon"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>';

    wrap.innerHTML =
      '<div class="pbrd-ret-stack-header pbrd-ret-reveal">' +
        '<div class="pbrd-ret-section-label">INTEGRATION SPEED</div>' +
        '<h2 class="pbrd-ret-stack-h2">Your competitors spent months integrating.<br>You won\u2019t.</h2>' +
        '<p class="pbrd-ret-stack-sub">Pre-built connectors for every major platform. Custom API for everything else.</p>' +
      '</div>' +

      '<div class="pbrd-ret-stack-timeline pbrd-ret-reveal">' +
        '<div class="pbrd-ret-stack-tl-row"><span class="pbrd-ret-stack-tl-label">E-COMMERCE SETUP</span><div class="pbrd-ret-stack-tl-bars"><div class="pbrd-ret-stack-tl-bar pbrd-ret-stack-tl--them" style="width:75%"><span>Competitors: 4\u20138 weeks</span></div><div class="pbrd-ret-stack-tl-bar pbrd-ret-stack-tl--us" data-w="22"><span>Paybyrd: Pre-built</span></div></div></div>' +
        '<div class="pbrd-ret-stack-tl-row"><span class="pbrd-ret-stack-tl-label">POS INTEGRATION</span><div class="pbrd-ret-stack-tl-bars"><div class="pbrd-ret-stack-tl-bar pbrd-ret-stack-tl--them" style="width:65%"><span>Competitors: 6\u201312 weeks</span></div><div class="pbrd-ret-stack-tl-bar pbrd-ret-stack-tl--us" data-w="20"><span>Paybyrd: Days</span></div></div></div>' +
        '<div class="pbrd-ret-stack-tl-row"><span class="pbrd-ret-stack-tl-label">ERP CONNECTION</span><div class="pbrd-ret-stack-tl-bars"><div class="pbrd-ret-stack-tl-bar pbrd-ret-stack-tl--them" style="width:85%"><span>Competitors: 3\u20136 months</span></div><div class="pbrd-ret-stack-tl-bar pbrd-ret-stack-tl--us" data-w="24"><span>Paybyrd: Weeks</span></div></div></div>' +
        '<div class="pbrd-ret-stack-tl-row"><span class="pbrd-ret-stack-tl-label">MULTI-STORE ROLLOUT</span><div class="pbrd-ret-stack-tl-bars"><div class="pbrd-ret-stack-tl-bar pbrd-ret-stack-tl--them" style="width:90%"><span>Competitors: 3\u20136 months</span></div><div class="pbrd-ret-stack-tl-bar pbrd-ret-stack-tl--us" data-w="22"><span>Paybyrd: Days</span></div></div></div>' +
      '</div>' +

      '<div class="pbrd-ret-stack-grid pbrd-ret-reveal">' +
        '<div class="pbrd-ret-stack-card">' + iconEcom + '<h4>E-Commerce</h4><p>WooCommerce, Magento, PrestaShop, nopCommerce. Pre-built plugins.</p></div>' +
        '<div class="pbrd-ret-stack-card">' + iconERP + '<h4>ERP & Finance</h4><p>SAP, Oracle, Dynamics. Direct API for instant reconciliation.</p></div>' +
        '<div class="pbrd-ret-stack-card">' + iconPOS + '<h4>POS Systems</h4><p>Any terminal, cloud or local. Latest-gen with OTA updates.</p></div>' +
        '<div class="pbrd-ret-stack-card">' + iconAPI + '<h4>Custom API</h4><p>RESTful APIs, webhooks, SDK. Build anything, connect everything.</p></div>' +
      '</div>';

    section.appendChild(wrap);

    /* Animate Paybyrd bars */
    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        wrap.querySelectorAll(".pbrd-ret-stack-tl--us").forEach(function(bar) {
          var w = bar.getAttribute("data-w");
          setTimeout(function() { bar.style.width = w + "%"; }, 400);
        });
        this.disconnect();
      }
    }, { threshold: 0.2 }).observe(wrap);

    observeReveal(".pbrd-ret-stack-wrap .pbrd-ret-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 6. TOUCHPOINTS — Tab Explorer               */
  /* ═══════════════════════════════════════════ */

  function enhanceTouchpoints() {
    var section = findSectionByHeading("retail payments that power");
    if (!section) section = findSectionByHeading("every part of the experience");
    if (!section) return;

    section.style.setProperty("padding", "80px 0", "important");
    section.style.setProperty("background", "#ffffff", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-ret-gj-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-gj-wrap";

    var steps = [
      { num: "01", title: "Web Checkout", sub: "E-commerce",
        head: "CHECKOUT CONFIRMED", headColor: "#10b981",
        lines: [
          { l: "Product", r: "Nike Air Max 90" }, { l: "Size", r: "42 EU" }, { l: "Qty", r: "1" },
          { l: "", r: "", divider: true },
          { l: "Subtotal", r: "\u20AC139.90" }, { l: "Shipping", r: "Free" },
          { l: "", r: "", divider: true },
          { l: "Total", r: "\u20AC139.90", bold: true }
        ], foot: "VISA \u2022\u2022\u2022\u20224582 \u00b7 3DS Secured" },
      { num: "02", title: "In-Store POS", sub: "Contactless",
        head: "TERMINAL \u00b7 STORE LISBOA", headColor: "#6319f0",
        lines: [
          { l: "Amount", r: "\u20AC87.50" }, { l: "Method", r: "Apple Pay (NFC)" },
          { l: "", r: "", divider: true },
          { l: "Card detected", r: "", step: true }, { l: "PIN not required", r: "", step: true },
          { l: "APPROVED", r: "\u2713", step: true, green: true }, { l: "Receipt sent to phone", r: "", step: true }
        ], foot: "Transaction time: 1.2 seconds" },
      { num: "03", title: "Click & Collect", sub: "Omnichannel",
        head: "ORDER STATUS", headColor: "#f59e0b",
        lines: [
          { l: "Order", r: "#RET-7291" }, { l: "Store", r: "Cascais" },
          { l: "", r: "", divider: true },
          { l: "Paid online", r: "\u2713", step: true, green: true }, { l: "Items picked", r: "\u2713", step: true, green: true },
          { l: "Ready for collection", r: "\u2713", step: true, green: true }, { l: "Customer notified", r: "\u2713", step: true, green: true }
        ], foot: "Paid \u2192 Ready in 12 minutes" },
      { num: "04", title: "Self-Service Kiosk", sub: "Unattended",
        head: "KIOSK \u00b7 QUICK ORDER", headColor: "#8b5cf6",
        lines: [
          { l: "Scan item", r: "\u20AC24.90" }, { l: "Scan item", r: "\u20AC12.50" }, { l: "Scan item", r: "\u20AC8.90" },
          { l: "", r: "", divider: true },
          { l: "Total (3 items)", r: "\u20AC46.30", bold: true },
          { l: "", r: "", divider: true },
          { l: "Tap to pay", r: "", step: true }, { l: "APPROVED", r: "\u2713", step: true, green: true }
        ], foot: "Checkout completed in 18 seconds" },
      { num: "05", title: "Mobile", sub: "On-the-go",
        head: "MOBILE CHECKOUT", headColor: "#06b6d4",
        lines: [
          { l: "Product", r: "Wireless Headphones" }, { l: "Price", r: "\u20AC79.90" },
          { l: "", r: "", divider: true },
          { l: "Apple Pay", r: "", step: true }, { l: "Face ID confirmed", r: "", step: true },
          { l: "APPROVED", r: "\u2713", step: true, green: true }
        ], foot: "One-tap checkout \u00b7 Zero friction" },
      { num: "06", title: "Customer Service", sub: "PayByLink",
        head: "PAYBYLINK \u00b7 REFUND", headColor: "#ef4444",
        lines: [
          { l: "Order", r: "#RET-4921" }, { l: "Item", r: "Jacket \u2014 returned" }, { l: "Amount", r: "\u20AC189.00" },
          { l: "", r: "", divider: true },
          { l: "Policy check", r: "\u2713 Within 14 days", step: true, green: true },
          { l: "Refund initiated", r: "\u2713", step: true, green: true },
          { l: "ARN", r: "74829301847291", step: true }
        ], foot: "Instant refund \u00b7 ARN proof sent to customer" }
    ];

    var tabsHTML = steps.map(function(s, i) {
      return '<div class="pbrd-ret-gj-tab' + (i === 0 ? ' pbrd-ret-gj-tab--active' : '') + '" data-idx="' + i + '">' +
        '<span class="pbrd-ret-gj-tab-num">' + s.num + '</span>' +
        '<div class="pbrd-ret-gj-tab-info"><span class="pbrd-ret-gj-tab-title">' + s.title + '</span><span class="pbrd-ret-gj-tab-sub">' + s.sub + '</span></div>' +
      '</div>';
    }).join("");

    function buildScene(s, idx) {
      var linesHTML = s.lines.map(function(ln, li) {
        if (ln.divider) return '<div class="pbrd-ret-gj-sc-div pbrd-ret-gj-sc-a' + (li+1) + '"></div>';
        var cls = "pbrd-ret-gj-sc-row pbrd-ret-gj-sc-a" + (li+1);
        if (ln.bold) cls += " pbrd-ret-gj-sc-row--bold";
        if (ln.step) cls += " pbrd-ret-gj-sc-row--step";
        var right = ln.r;
        if (ln.green) right = '<span style="color:#10b981">' + ln.r + '</span>';
        return '<div class="' + cls + '"><span>' + ln.l + '</span><span>' + right + '</span></div>';
      }).join("");
      return '<div class="pbrd-ret-gj-scene' + (idx === 0 ? ' pbrd-ret-gj-scene--active' : '') + '" data-scene="' + idx + '">' +
        '<div class="pbrd-ret-gj-sc-head" style="color:' + s.headColor + '"><span class="pbrd-ret-gj-sc-dot" style="background:' + s.headColor + '"></span>' + s.head + '</div>' +
        linesHTML +
        '<div class="pbrd-ret-gj-sc-foot pbrd-ret-gj-sc-a10">' + s.foot + '</div>' +
      '</div>';
    }

    var scenesHTML = steps.map(function(s, i) { return buildScene(s, i); }).join("");

    wrap.innerHTML =
      '<div class="pbrd-ret-gj-header pbrd-ret-reveal">' +
        '<div class="pbrd-ret-section-label" style="color:#6319f0">RETAIL TOUCHPOINTS</div>' +
        '<h2 class="pbrd-ret-gj-h2">Six touchpoints. One platform.<br>Zero revenue left behind.</h2>' +
        '<p class="pbrd-ret-gj-sub">From web checkout to customer service \u2014 every payment flows through Paybyrd.</p>' +
      '</div>' +
      '<div class="pbrd-ret-gj-interactive pbrd-ret-reveal">' +
        '<div class="pbrd-ret-gj-tabs">' + tabsHTML + '</div>' +
        '<div class="pbrd-ret-gj-stage"><div class="pbrd-ret-gj-stage-inner">' + scenesHTML + '</div><div class="pbrd-ret-gj-progress"><div class="pbrd-ret-gj-progress-bar"></div></div></div>' +
      '</div>' +
      '<div class="pbrd-ret-gj-stats pbrd-ret-reveal">' +
        '<div class="pbrd-ret-gj-stat-item"><span class="pbrd-ret-gj-stat-v">100%</span><span class="pbrd-ret-gj-stat-l">of retail spend captured</span></div>' +
        '<div class="pbrd-ret-gj-stat-item"><span class="pbrd-ret-gj-stat-v">< 2s</span><span class="pbrd-ret-gj-stat-l">checkout time</span></div>' +
        '<div class="pbrd-ret-gj-stat-item"><span class="pbrd-ret-gj-stat-v">24/7</span><span class="pbrd-ret-gj-stat-l">AI support</span></div>' +
        '<div class="pbrd-ret-gj-stat-item"><span class="pbrd-ret-gj-stat-v">1 dashboard</span><span class="pbrd-ret-gj-stat-l">for all channels</span></div>' +
      '</div>';

    section.appendChild(wrap);

    /* Tab switching + auto-rotate */
    var activeStep = 0, autoTimer = null, INTERVAL = 5000;
    var tabs = wrap.querySelectorAll(".pbrd-ret-gj-tab");
    var scenes = wrap.querySelectorAll(".pbrd-ret-gj-scene");
    var progressBar = wrap.querySelector(".pbrd-ret-gj-progress-bar");

    function setActive(idx) {
      activeStep = idx;
      tabs.forEach(function(t, i) { t.classList.toggle("pbrd-ret-gj-tab--active", i === idx); });
      scenes.forEach(function(s, i) { s.classList.toggle("pbrd-ret-gj-scene--active", i === idx); });
      if (progressBar) { progressBar.style.transition = "none"; progressBar.style.width = "0%"; setTimeout(function() { progressBar.style.transition = "width " + INTERVAL + "ms linear"; progressBar.style.width = "100%"; }, 50); }
    }
    function startRotation() { clearInterval(autoTimer); autoTimer = setInterval(function() { setActive((activeStep + 1) % 6); }, INTERVAL); }
    tabs.forEach(function(tab) { tab.addEventListener("click", function() { setActive(parseInt(tab.getAttribute("data-idx"))); startRotation(); }); });
    new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) { setActive(0); startRotation(); this.disconnect(); } }, { threshold: 0.15 }).observe(wrap);

    observeReveal(".pbrd-ret-gj-wrap .pbrd-ret-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 7. AI — Chat + Reconciliation               */
  /* ═══════════════════════════════════════════ */

  function enhanceAI() {
    var section = findSectionByHeading("ai tools");
    if (!section) section = findSectionByHeading("streamline retail");
    if (!section) return;

    section.style.setProperty("padding", "80px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-ret-ai-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-ai-wrap";
    var checkSvg = '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3.5 3.5L13 5" stroke="#6319f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';

    wrap.innerHTML =
      '<div class="pbrd-ret-ai-header pbrd-ret-reveal">' +
        '<div class="pbrd-ret-section-label">AI FOR RETAIL</div>' +
        '<h2 class="pbrd-ret-ai-h2">Your AI assistant handles payments.<br>Your team handles customers.</h2>' +
        '<p class="pbrd-ret-ai-sub">Two AI systems working in parallel \u2014 one serves your team, the other reconciles your revenue.</p>' +
      '</div>' +

      '<div class="pbrd-ret-ai-grid">' +
        '<div class="pbrd-ret-ai-card pbrd-ret-reveal">' +
          '<div class="pbrd-ret-ai-visual">' +
            '<div class="pbrd-ret-ai-chat" id="pbrd-ret-chat">' +
              '<div class="pbrd-ret-ai-chat-head"><div class="pbrd-ret-ai-chat-avatar">P</div><div><div class="pbrd-ret-ai-chat-name">Paybyrd AI</div><div class="pbrd-ret-ai-chat-status"><span class="pbrd-ret-ai-dot-live"></span>Online</div></div><div class="pbrd-ret-ai-chat-badge">AI</div></div>' +
              '<div class="pbrd-ret-ai-chat-body" id="pbrd-ret-chat-body">' +
                '<div class="pbrd-ret-ai-msg bot" id="pbrd-ret-cm0"><span>Hi! How can I help your store today?</span></div>' +
                '<div class="pbrd-ret-ai-msg user" id="pbrd-ret-cm1"><span id="pbrd-ret-cm1t"></span></div>' +
                '<div class="pbrd-ret-ai-typing" id="pbrd-ret-typing"><span></span><span></span><span></span></div>' +
                '<div class="pbrd-ret-ai-msg bot" id="pbrd-ret-cm2"><span id="pbrd-ret-cm2t"></span></div>' +
                '<div class="pbrd-ret-ai-msg bot" id="pbrd-ret-cm3"><div class="pbrd-ret-ai-booking"><div class="pbrd-ret-ai-booking-row"><span>Order</span><span id="pbrd-ret-bpnr"></span></div><div class="pbrd-ret-ai-booking-row"><span>Item</span><span id="pbrd-ret-bitem"></span></div><div class="pbrd-ret-ai-booking-row"><span>Amount</span><span id="pbrd-ret-bamt"></span></div></div></div>' +
                '<div class="pbrd-ret-ai-msg bot" id="pbrd-ret-cm4"><span id="pbrd-ret-cm4t"></span></div>' +
                '<div class="pbrd-ret-ai-msg bot" id="pbrd-ret-cm5"><div class="pbrd-ret-ai-act-btn" id="pbrd-ret-cact"></div></div>' +
                '<div class="pbrd-ret-ai-msg bot" id="pbrd-ret-cm6"><span style="color:#10b981;margin-right:4px">\u2713</span><span id="pbrd-ret-cm6t"></span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ret-ai-body"><h3>AI Retail Assistant</h3><p>Generates payment links, processes refunds, and answers data questions. 24/7, instant.</p>' +
            '<ul class="pbrd-ret-ai-bullets"><li>' + checkSvg + 'PayByLink for phone orders and social sales</li><li>' + checkSvg + 'Instant refunds with ARN tracking</li><li>' + checkSvg + 'Real-time sales analytics on demand</li></ul></div>' +
        '</div>' +

        '<div class="pbrd-ret-ai-card pbrd-ret-reveal">' +
          '<div class="pbrd-ret-ai-visual">' +
            '<div class="pbrd-ret-ai-recon" id="pbrd-ret-recon-feed">' +
              '<div class="pbrd-ret-ai-recon-head"><span class="pbrd-ret-ai-dot-live"></span>RECONCILIATION \u00b7 LIVE</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ret-ai-body"><h3>Smart Reconciliation</h3><p>Every transaction matched, every payout calculated, every discrepancy flagged \u2014 automatically.</p>' +
            '<ul class="pbrd-ret-ai-bullets"><li>' + checkSvg + 'Gross settlement \u2014 full daily payouts</li><li>' + checkSvg + 'AI matching per channel, outlet, and shift</li><li>' + checkSvg + 'Zero manual reconciliation needed</li></ul></div>' +
        '</div>' +
      '</div>';

    section.appendChild(wrap);

    /* Chat animation */
    var chatScenarios = [
      { user: "Send a payment link for Nike Air Max size 42", lookup: "Creating PayByLink\u2026", pnr: "PLK-8847", item: "Nike Air Max 90 (42)", amt: "\u20AC139.90", offer: "Payment link ready. Send via SMS or WhatsApp?", action: "Send via SMS", success: "Payment link sent! Customer will receive it in seconds." },
      { user: "Refund order #RET-4921 \u2014 jacket returned", lookup: "Checking order\u2026", pnr: "#RET-4921", item: "Jacket \u2014 Black (M)", amt: "\u20AC189.00", offer: "Return within policy. Full refund eligible.", action: "Process Refund", success: "Refund of \u20AC189.00 initiated. ARN: 74829301847291" },
      { user: "What\u2019s our top payment method this week?", lookup: "Analyzing data\u2026", pnr: "This week", item: "All stores", amt: "2,847 txns", offer: "Apple Pay leads with 34%, followed by Visa (28%) and MC (22%). Contactless up 12% vs last week.", action: "Export Report", success: "Report exported to dashboard. Available in Analytics \u2192 Methods." }
    ];
    var chatIdx = 0;
    var msgIds = ["pbrd-ret-cm0","pbrd-ret-cm1","pbrd-ret-cm2","pbrd-ret-cm3","pbrd-ret-cm4","pbrd-ret-cm5","pbrd-ret-cm6"];
    function hideChat() { msgIds.forEach(function(id) { var el = document.getElementById(id); if (el) el.style.opacity = "0"; }); var ty = document.getElementById("pbrd-ret-typing"); if (ty) ty.style.display = "none"; }
    function showChat(id) { var el = document.getElementById(id); if (el) el.style.opacity = "1"; }

    function runChat() {
      var sc = chatScenarios[chatIdx % chatScenarios.length]; chatIdx++;
      hideChat();
      var body = document.getElementById("pbrd-ret-chat-body");
      if (body) body.scrollTop = 0;
      var t = 0;
      t += 400; setTimeout(function() { showChat("pbrd-ret-cm0"); }, t);
      t += 800; setTimeout(function() { var el = document.getElementById("pbrd-ret-cm1t"); if (el) el.textContent = sc.user; showChat("pbrd-ret-cm1"); if (body) body.scrollTop = body.scrollHeight; }, t);
      t += 1200; setTimeout(function() { var ty = document.getElementById("pbrd-ret-typing"); if (ty) ty.style.display = "flex"; if (body) body.scrollTop = body.scrollHeight; }, t);
      t += 1400; setTimeout(function() { var ty = document.getElementById("pbrd-ret-typing"); if (ty) ty.style.display = "none"; var el = document.getElementById("pbrd-ret-cm2t"); if (el) el.textContent = sc.lookup; showChat("pbrd-ret-cm2"); if (body) body.scrollTop = body.scrollHeight; }, t);
      t += 800; setTimeout(function() { document.getElementById("pbrd-ret-bpnr").textContent = sc.pnr; document.getElementById("pbrd-ret-bitem").textContent = sc.item; document.getElementById("pbrd-ret-bamt").textContent = sc.amt; showChat("pbrd-ret-cm3"); if (body) body.scrollTop = body.scrollHeight; }, t);
      t += 900; setTimeout(function() { var el = document.getElementById("pbrd-ret-cm4t"); if (el) el.textContent = sc.offer; showChat("pbrd-ret-cm4"); if (body) body.scrollTop = body.scrollHeight; }, t);
      t += 800; setTimeout(function() { var btn = document.getElementById("pbrd-ret-cact"); if (btn) { btn.textContent = sc.action; btn.style.background = "#6319f0"; } showChat("pbrd-ret-cm5"); if (body) body.scrollTop = body.scrollHeight; }, t);
      t += 1500; setTimeout(function() { var btn = document.getElementById("pbrd-ret-cact"); if (btn) btn.style.background = "#10b981"; }, t);
      t += 800; setTimeout(function() { var el = document.getElementById("pbrd-ret-cm6t"); if (el) el.textContent = sc.success; showChat("pbrd-ret-cm6"); if (body) body.scrollTop = body.scrollHeight; }, t);
      t += 3000; setTimeout(runChat, t);
    }

    /* Reconciliation feed */
    var reconTxns = [
      { store: "Store Lisboa", method: "Visa", amount: "\u20AC87.50", ok: true },
      { store: "Online", method: "MC", amount: "\u20AC234.00", ok: true },
      { store: "Kiosk", method: "Apple Pay", amount: "\u20AC12.90", ok: true },
      { store: "Store Faro", method: "MB Way", amount: "\u20AC156.00", ok: true },
      { store: "DAILY PAYOUT", method: "", amount: "\u20AC12,847.30", ok: "summary" },
      { store: "Online", method: "Google Pay", amount: "\u20AC67.80", ok: true },
      { store: "Store Braga", method: "Visa", amount: "\u20AC198.50", ok: true }
    ];
    var reconIdx = 0;
    function addReconEntry() {
      var feed = document.getElementById("pbrd-ret-recon-feed");
      if (!feed) return;
      var txn = reconTxns[reconIdx % reconTxns.length]; reconIdx++;
      var el = document.createElement("div");
      el.className = "pbrd-ret-ai-recon-item" + (txn.ok === "summary" ? " pbrd-ret-ai-recon-summary" : "");
      el.style.opacity = "0";
      if (txn.ok === "summary") {
        el.innerHTML = '<span class="pbrd-ret-ai-recon-ok">\u2713</span><span>' + txn.store + '</span><span class="pbrd-ret-ai-recon-amt">' + txn.amount + '</span><span class="pbrd-ret-ai-recon-tag">0 discrepancies</span>';
      } else {
        el.innerHTML = '<span class="pbrd-ret-ai-recon-ok">\u2713</span><span>' + txn.store + ' \u00b7 ' + txn.method + '</span><span class="pbrd-ret-ai-recon-amt">' + txn.amount + '</span>';
      }
      var items = feed.querySelectorAll(".pbrd-ret-ai-recon-item");
      if (items.length >= 5) { var old = items[items.length - 1]; old.style.opacity = "0"; setTimeout(function() { if (old.parentNode) old.parentNode.removeChild(old); }, 300); }
      var headEl = feed.querySelector(".pbrd-ret-ai-recon-head");
      if (headEl && headEl.nextSibling) feed.insertBefore(el, headEl.nextSibling);
      else feed.appendChild(el);
      setTimeout(function() { el.style.opacity = "1"; }, 50);
      setTimeout(addReconEntry, txn.ok === "summary" ? 4000 : 2000);
    }

    new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) { runChat(); addReconEntry(); this.disconnect(); } }, { threshold: 0.15 }).observe(wrap);
    observeReveal(".pbrd-ret-ai-wrap .pbrd-ret-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 8. TESTIMONIAL                              */
  /* ═══════════════════════════════════════════ */

  function enhanceTestimonial() {
    var heading = findHeading("customers stopped waiting");
    if (!heading) heading = findHeading("staff stopped apologizing");
    if (!heading) return;
    var section = heading.closest("section") || heading.closest("[class*='section']") || heading.parentElement;
    if (!section) return;

    Array.prototype.forEach.call(section.children, function(c) { c.style.setProperty("display", "none", "important"); });
    section.style.setProperty("padding", "40px 0", "important");
    section.style.setProperty("margin", "0", "important");
    section.style.setProperty("background", "linear-gradient(135deg, #0a0a0f, #1a1020)", "important");
    var quoteWrap = section.closest(".quote_wrap");
    if (quoteWrap) { quoteWrap.style.setProperty("padding", "0", "important"); quoteWrap.style.setProperty("margin", "0", "important"); }

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-test-wrap";
    wrap.innerHTML =
      '<span class="pbrd-ret-section-label">CASE STUDY</span>' +
      '<p class="pbrd-ret-test-bigquote">Paybyrd turned our payments from a headache into a growth driver. Fraud dropped, approval rates went up, and checkout feels invisible to our customers. Best of all, it\u2019s embedded directly into the e-commerce systems we already use \u2014 no retraining, no disruption, just smarter payments from day one.</p>' +
      '<div class="pbrd-ret-test-author">Sergio Figueiredo</div>' +
      '<div class="pbrd-ret-test-title">Prozis</div>' +
      '<div class="pbrd-ret-test-results" id="pbrd-ret-test-results">' +
        '<div class="pbrd-ret-test-result"><div class="pbrd-ret-test-rv" data-target="4" data-suffix="-7%" data-countup="1">0%</div><div class="pbrd-ret-test-rl">Higher Auth Rates</div></div>' +
        '<div class="pbrd-ret-test-divider"></div>' +
        '<div class="pbrd-ret-test-result"><div class="pbrd-ret-test-rv" data-target="16.8" data-suffix="%" data-countup="1">0%</div><div class="pbrd-ret-test-rl">Fewer Chargebacks</div></div>' +
        '<div class="pbrd-ret-test-divider"></div>' +
        '<div class="pbrd-ret-test-result"><div class="pbrd-ret-test-rv" data-text="Real-time" data-countup="0">Real-time</div><div class="pbrd-ret-test-rl">Reconciliation</div></div>' +
        '<div class="pbrd-ret-test-divider"></div>' +
        '<div class="pbrd-ret-test-result"><div class="pbrd-ret-test-rv" data-target="192" data-suffix="+" data-countup="1">0+</div><div class="pbrd-ret-test-rl">Currencies</div></div>' +
      '</div>' +
      '<a href="/book-demo" class="pbrd-ret-cta-primary" style="margin-top:32px;display:inline-flex">Get results like Prozis \u2192</a>';

    section.appendChild(wrap);

    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        wrap.querySelectorAll(".pbrd-ret-test-rv").forEach(function(rv) {
          if (rv.getAttribute("data-countup") === "1") {
            var t = parseFloat(rv.getAttribute("data-target"));
            var s = rv.getAttribute("data-suffix");
            countUp(rv, t, s);
          }
        });
        this.disconnect();
      }
    }, { threshold: 0.3 }).observe(wrap);
  }

  /* ═══════════════════════════════════════════ */
  /* 9. FAQ                                      */
  /* ═══════════════════════════════════════════ */

  function enhanceFAQ() {
    var section = findSectionByHeading("frequently asked");
    if (!section) return;

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-ret-faq-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var faqs = [
      { cat: "pos", q: "Can I use the same platform for in-store and online?", a: "Yes. Paybyrd unifies POS, e-commerce, mobile, and kiosk payments into a single platform with one dashboard, one reconciliation engine, and one set of reports." },
      { cat: "security", q: "How does Paybyrd prevent retail fraud?", a: "AI-powered screening, 3DS authentication, velocity checks, and a shared merchant fraud database. Result: ~16.8% reduction in chargebacks." },
      { cat: "ecommerce", q: "Which e-commerce platforms do you integrate with?", a: "WooCommerce, Magento, PrestaShop, and nopCommerce with pre-built plugins. Custom integrations via RESTful API and webhooks." },
      { cat: "integration", q: "How long does integration take?", a: "Pre-built connectors: days. Custom API integration: 1\u20132 weeks. Multi-store rollout: days, not months." },
      { cat: "pos", q: "What POS terminals do you support?", a: "PAX A920 Pro (Rawhide), PAX A77 (Renegade), Sunmi V3 (Maverick), and Sunmi T3 Pro (Titan). All run Paybyrd software natively with over-the-air updates." },
      { cat: "data", q: "What analytics and insights do I get?", a: "Peak transaction hours heatmap, top customers with returning detection, revenue by channel, AI reconciliation per outlet and shift, and custom reports." },
      { cat: "security", q: "Are you PCI DSS compliant?", a: "Yes, PCI Level 1 \u2014 the highest certification. All card data is stored in Paybyrd\u2019s encrypted vault. Your PCI scope is minimal." },
      { cat: "ecommerce", q: "Do you support local payment methods?", a: "Yes \u2014 20+ methods including iDEAL, MB Way, Multibanco, Klarna, Apple Pay, Google Pay, and more. Methods are activated per market automatically." },
      { cat: "integration", q: "Can I self-host the payment infrastructure?", a: "Yes. Paybyrd\u2019s modular architecture allows full self-hosting for merchants who need complete control over their payment stack." },
      { cat: "data", q: "How does reconciliation work?", a: "Gross settlement: your full monthly volume is paid out daily with zero commission deductions. AI matches every transaction per channel, outlet, and shift in seconds." }
    ];
    var cats = [{ id: "all", label: "All" }, { id: "pos", label: "POS" }, { id: "ecommerce", label: "E-commerce" }, { id: "security", label: "Security" }, { id: "integration", label: "Integration" }, { id: "data", label: "Data" }];

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-faq-wrap";

    var catHTML = cats.map(function(c) { return '<button class="pbrd-ret-faq-cat' + (c.id === "all" ? ' pbrd-ret-faq-cat--active' : '') + '" data-cat="' + c.id + '">' + c.label + '</button>'; }).join("");
    var faqHTML = faqs.map(function(f) {
      return '<div class="pbrd-ret-faq-item" data-cat="' + f.cat + '">' +
        '<div class="pbrd-ret-faq-q"><span>' + f.q + '</span><svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></div>' +
        '<div class="pbrd-ret-faq-a"><p>' + f.a + '</p></div></div>';
    }).join("");

    wrap.innerHTML =
      '<div class="pbrd-ret-faq-header pbrd-ret-reveal"><h2 class="pbrd-ret-faq-h2">Frequently asked questions</h2></div>' +
      '<div class="pbrd-ret-faq-cats pbrd-ret-reveal">' + catHTML + '</div>' +
      '<div class="pbrd-ret-faq-list pbrd-ret-reveal">' + faqHTML + '</div>';

    section.appendChild(wrap);

    /* Category filter */
    wrap.querySelectorAll(".pbrd-ret-faq-cat").forEach(function(btn) {
      btn.addEventListener("click", function() {
        wrap.querySelectorAll(".pbrd-ret-faq-cat").forEach(function(b) { b.classList.remove("pbrd-ret-faq-cat--active"); });
        btn.classList.add("pbrd-ret-faq-cat--active");
        var cat = btn.getAttribute("data-cat");
        wrap.querySelectorAll(".pbrd-ret-faq-item").forEach(function(item) {
          item.style.display = (cat === "all" || item.getAttribute("data-cat") === cat) ? "" : "none";
        });
      });
    });

    /* Accordion */
    wrap.querySelectorAll(".pbrd-ret-faq-q").forEach(function(q) {
      q.addEventListener("click", function() {
        var item = q.parentElement;
        var wasOpen = item.classList.contains("pbrd-ret-faq-item--open");
        wrap.querySelectorAll(".pbrd-ret-faq-item--open").forEach(function(i) { i.classList.remove("pbrd-ret-faq-item--open"); });
        if (!wasOpen) item.classList.add("pbrd-ret-faq-item--open");
      });
    });

    observeReveal(".pbrd-ret-faq-wrap .pbrd-ret-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 10. BOTTOM CTA                              */
  /* ═══════════════════════════════════════════ */

  function enhanceBottomCTA() {
    var heading = findHeading("reduce queue time");
    if (!heading) heading = findHeading("boost conversion");
    if (!heading) heading = findHeading("optimize every checkout");
    if (!heading) return;
    heading.textContent = "Transform every checkout into intelligence.";
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;
    section.querySelectorAll("p").forEach(function(p) {
      if (p.textContent.toLowerCase().includes("personalized demo") || p.textContent.toLowerCase().includes("payment specialist") || p.textContent.toLowerCase().includes("retail specialist")) {
        p.textContent = "Join Prozis and leading retailers. See measurable results within 30 days.";
      }
    });
    section.querySelectorAll("a").forEach(function(a) {
      if (a.textContent.toLowerCase().includes("start now") || a.href.includes("onboard")) {
        a.textContent = "Book Your 15-Minute Demo \u2192";
        a.href = "/book-demo";
      }
    });
  }

  /* ═══════════════════════════════════════════ */
  /* INIT                                        */
  /* ═══════════════════════════════════════════ */

  function init() {
    enhanceHero();
    enhancePainPoints();
    enhanceFeatures();
    enhanceDataSection();
    enhanceIntegrations();
    enhanceTouchpoints();
    enhanceAI();
    enhanceTestimonial();
    enhanceFAQ();
    enhanceBottomCTA();
    console.log("[Paybyrd] Retail enhancements loaded");
    pbrdReady();
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init);
})();
