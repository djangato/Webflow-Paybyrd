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

    /* Hide only the hero image — be very targeted to avoid hiding other sections */
    section.querySelectorAll("img").forEach(function(img) {
      /* Only hide images that are direct children of this hero section's layout */
      var src = (img.getAttribute("src") || "").toLowerCase();
      if (src.includes("hero") || src.includes("paybyrd-hero")) {
        img.style.setProperty("opacity", "0", "important");
        img.style.setProperty("height", "0", "important");
        img.style.setProperty("overflow", "hidden", "important");
      }
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

    /* Insert our own subtitle — INLINE styles to guarantee visibility */
    var subtitle = document.createElement("p");
    subtitle.setAttribute("style",
      "font-size:1rem !important;color:rgba(255,255,255,0.55) !important;" +
      "line-height:1.6 !important;margin:16px 0 0 0 !important;" +
      "display:block !important;position:relative !important;z-index:2 !important;" +
      "max-width:420px !important;padding:0 !important;"
    );
    subtitle.innerHTML = "Higher approval rates. Lower fraud. Zero downtime.<br>Ask TAP Air Portugal.";
    parent.insertBefore(subtitle, heading.nextSibling);

    /* ── CTA row — INLINE styles ── */
    var ctaRow = document.createElement("div");
    ctaRow.setAttribute("style",
      "display:flex !important;align-items:center !important;gap:14px !important;" +
      "margin:20px 0 0 0 !important;flex-wrap:wrap !important;" +
      "position:relative !important;z-index:2 !important;"
    );
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
        '<path d="' + r.d + '" fill="none" stroke="rgba(99,25,240,0.35)" stroke-width="1.5" stroke-dasharray="5 4"/>' +
        '<circle r="4" fill="#6319f0" opacity="0">' +
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
      var glow = c.main ? '<circle cx="' + c.x + '" cy="' + c.y + '" r="18" fill="rgba(99,25,240,0.1)"><animate attributeName="r" values="14;22;14" dur="3s" repeatCount="indefinite"/></circle>' : '';
      svgDots += glow +
        '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + r + '" fill="' + (c.main ? '#6319f0' : 'rgba(99,25,240,0.5)') + '"/>' +
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
    section.style.setProperty("padding-bottom", "0", "important");
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
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#ef4444" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="79"/></svg><span class="pbrd-air-leak-pct" data-target="79">0%</span></div>' +
          '<h4>Cart Abandonment</h4>' +
          '<p>Travel\u2019s highest drop-off rate</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 Paybyrd recovers 15\u201320%</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--orange pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#f97316" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="30"/></svg><span class="pbrd-air-leak-pct" data-target="30">0%</span></div>' +
          '<h4>Missing Local Methods</h4>' +
          '<p>Sales lost without local options</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 192+ currencies, local routing</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--yellow pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#eab308" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="17"/></svg><span class="pbrd-air-leak-pct" data-target="17">0%</span></div>' +
          '<h4>Fraud & Chargebacks</h4>' +
          '<p>$1B+ lost industry-wide</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 AI screening: 16.8% reduction</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--blue pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#6319f0" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="15"/></svg><span class="pbrd-air-leak-pct" data-target="15">0%</span></div>' +
          '<h4>Cross-Border Fees</h4>' +
          '<p>Excessive FX & routing charges</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 Local routing: 10\u201315% savings</div>' +
        '</div>' +
      '</div>' +
      /* Summary footer with CTA */
      '<div class="pbrd-air-leak-footer">' +
        '<div class="pbrd-air-leak-summary">' +
          '<span class="pbrd-air-leak-summary-txt">Combined, these issues cost the average airline <strong>millions per year</strong>. Paybyrd addresses all four simultaneously.</span>' +
          '<a href="/book-demo" class="pbrd-air-cta-primary" style="padding:10px 24px;font-size:0.8125rem;">Calculate your savings \u2192</a>' +
        '</div>' +
      '</div>';

    var paras = section.querySelectorAll("p");
    var lastP = null; paras.forEach(function(p) { if (p.style.display !== "none") lastP = p; });
    if (lastP) lastP.parentElement.insertBefore(dash, lastP.nextSibling);
    else section.appendChild(dash);

    /* Add plane + trail at SECTION level so it flies freely */
    section.style.setProperty("position", "relative", "important");
    section.style.setProperty("overflow", "visible", "important");

    var plane = document.createElement("div");
    plane.className = "pbrd-air-plane";
    plane.innerHTML = '<img src="https://djangato.github.io/Webflow-Paybyrd/assets/pos/paybyrd-plane.png" alt="Paybyrd" style="width:100%;height:auto;">';
    section.appendChild(plane);

    /* Randomize flight path each loop */
    var paths = [
      "M-150,200 C0,80 150,250 350,100 C500,10 650,150 950,60",
      "M-150,100 C50,200 200,50 400,180 C550,80 700,200 950,100",
      "M-150,250 C100,50 300,200 500,80 C600,180 800,30 950,120",
      "M-150,150 C0,250 200,30 350,200 C500,50 750,180 950,80",
    ];
    var pathIdx = 0;
    setInterval(function() {
      pathIdx = (pathIdx + 1) % paths.length;
      var p = paths[pathIdx];
      plane.style.offsetPath = 'path("' + p + '")';
      /* Update trail too */
      var trailPath = trail.querySelector("path");
      if (trailPath) trailPath.setAttribute("d", p);
    }, 14000);

    var trail = document.createElement("div");
    trail.className = "pbrd-air-trail";
    trail.innerHTML = '<svg viewBox="0 0 950 250" preserveAspectRatio="none"><path d="M-150,200 C0,80 150,250 350,100 C500,10 650,150 950,60" fill="none" stroke="rgba(99,25,240,0.04)" stroke-width="1.5" stroke-dasharray="6 4" class="pbrd-air-trail-path"/></svg>';
    section.appendChild(trail);

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
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    /* Hide existing Webflow cards + heading + CTA */
    section.querySelectorAll("[class*='card-8'], [class*='card_8']").forEach(function(el) {
      el.style.setProperty("display", "none", "important");
    });
    heading.style.setProperty("display", "none", "important");
    section.querySelectorAll("a").forEach(function(a) {
      if (a.textContent.toLowerCase().includes("book consultation")) a.style.setProperty("display", "none", "important");
    });
    /* Hide the grid wrapper too */
    section.querySelectorAll("[class*='grid-1'], [class*='grid_1']").forEach(function(el) {
      el.style.setProperty("display", "none", "important");
    });

    var showcase = document.createElement("div");
    showcase.className = "pbrd-air-feat-wrap";
    showcase.innerHTML =
      '<div class="pbrd-air-feat-header pbrd-air-reveal" style="text-align:center;margin-bottom:40px;">' +
        '<div class="pbrd-air-section-label">THE PAYBYRD ADVANTAGE</div>' +
        '<h2 style="font-size:clamp(1.75rem,3.5vw,2.5rem);font-weight:700;color:#fff;margin:8px 0 12px;letter-spacing:-0.02em;">Four engines powering your payments.</h2>' +
        '<p style="font-size:1rem;color:rgba(255,255,255,0.4);max-width:500px;margin:0 auto;">Each one solves a problem that costs airlines millions.</p>' +
      '</div>' +
      '<div class="pbrd-air-feat-grid">' +
        /* 1. Smart Routing */
        '<div class="pbrd-air-feat-card pbrd-air-reveal">' +
          '<div class="pbrd-air-feat-visual">' +
            '<svg viewBox="0 0 240 140" fill="none" class="pbrd-air-feat-svg">' +
              '<text x="120" y="18" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="7" font-family="system-ui" font-weight="600">TRANSACTION \u20ac342.50</text>' +
              '<rect x="80" y="28" width="80" height="24" rx="6" fill="rgba(99,25,240,0.1)" stroke="rgba(99,25,240,0.3)" stroke-width="1"/>' +
              '<text x="120" y="44" text-anchor="middle" fill="#6319f0" font-size="8" font-weight="600" font-family="system-ui">SMART ROUTER</text>' +
              '<line x1="90" y1="52" x2="40" y2="82" stroke="rgba(239,68,68,0.2)" stroke-width="1" stroke-dasharray="3 3"/>' +
              '<line x1="120" y1="52" x2="120" y2="82" stroke="rgba(34,197,94,0.4)" stroke-width="1.5"/>' +
              '<line x1="150" y1="52" x2="200" y2="82" stroke="rgba(239,68,68,0.2)" stroke-width="1" stroke-dasharray="3 3"/>' +
              '<rect x="15" y="82" width="50" height="18" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.6"/>' +
              '<text x="40" y="94" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="6" font-family="system-ui">Acquirer A</text>' +
              '<rect x="95" y="82" width="50" height="18" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.25)" stroke-width="0.8"/>' +
              '<text x="120" y="94" text-anchor="middle" fill="rgba(34,197,94,0.8)" font-size="6" font-weight="600" font-family="system-ui">Local Bank \u2713</text>' +
              '<rect x="175" y="82" width="50" height="18" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.6"/>' +
              '<text x="200" y="94" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="6" font-family="system-ui">Acquirer C</text>' +
              '<text x="120" y="120" text-anchor="middle" fill="rgba(34,197,94,0.7)" font-size="7" font-weight="600" font-family="system-ui">\u2713 Routed locally \u2192 4\u20137% higher auth</text>' +
              '<circle r="3" fill="#22c55e" opacity="0.8"><animateMotion dur="1.5s" repeatCount="indefinite" path="M120,52 L120,82"/><animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite"/></circle>' +
            '</svg>' +
          '</div>' +
          '<h4>Smart Multi-Acquirer Routing</h4>' +
          '<p>Each transaction routes to the optimal local acquirer. 192+ currencies. 4\u20137% higher authorization. 10\u201315% lower fees.</p>' +
        '</div>' +
        /* 2. Fraud Shield */
        '<div class="pbrd-air-feat-card pbrd-air-reveal">' +
          '<div class="pbrd-air-feat-visual">' +
            '<svg viewBox="0 0 240 140" fill="none" class="pbrd-air-feat-svg">' +
              '<path d="M120 15 L160 35 L160 75 C160 100 140 115 120 125 C100 115 80 100 80 75 L80 35 Z" fill="rgba(99,25,240,0.06)" stroke="rgba(99,25,240,0.25)" stroke-width="1.2"/>' +
              '<path d="M108 70 L116 78 L134 58" stroke="#6319f0" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
              '<circle cx="50" cy="45" r="4" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.4)" stroke-width="0.8"><animate attributeName="cx" values="50;75;50" dur="3s" repeatCount="indefinite"/></circle>' +
              '<text x="50" y="48" text-anchor="middle" fill="rgba(239,68,68,0.5)" font-size="5" font-family="system-ui">\u2718</text>' +
              '<circle cx="190" cy="60" r="4" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.4)" stroke-width="0.8"><animate attributeName="cx" values="190;165;190" dur="2.5s" repeatCount="indefinite"/></circle>' +
              '<circle cx="65" cy="90" r="3" fill="rgba(239,68,68,0.1)"><animate attributeName="cx" values="65;82;65" dur="3.5s" repeatCount="indefinite"/></circle>' +
              '<text x="120" y="135" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="7" font-weight="600" font-family="system-ui">16.8% chargeback reduction</text>' +
            '</svg>' +
          '</div>' +
          '<h4>Paybyrd Antifraud Engine</h4>' +
          '<p>Real-time scoring on every transaction. Configurable rule engine, velocity counters, IP/email intelligence, and AI-assisted case review. 16.8% chargeback reduction.</p>' +
        '</div>' +
        /* 3. Dashboard */
        '<div class="pbrd-air-feat-card pbrd-air-reveal">' +
          '<div class="pbrd-air-feat-visual">' +
            '<svg viewBox="0 0 240 140" fill="none" class="pbrd-air-feat-svg">' +
              '<rect x="20" y="10" width="200" height="110" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>' +
              '<rect x="20" y="10" width="200" height="20" rx="8" fill="rgba(255,255,255,0.04)"/>' +
              '<circle cx="34" cy="20" r="3" fill="rgba(239,68,68,0.4)"/><circle cx="44" cy="20" r="3" fill="rgba(245,158,11,0.4)"/><circle cx="54" cy="20" r="3" fill="rgba(34,197,94,0.4)"/>' +
              '<text x="120" y="23" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="6" font-family="system-ui">Paybyrd Dashboard</text>' +
              '<rect x="35" y="90" width="14" height="20" rx="2" fill="rgba(99,25,240,0.3)"><animate attributeName="height" values="20;35;20" dur="3s" repeatCount="indefinite"/><animate attributeName="y" values="90;75;90" dur="3s" repeatCount="indefinite"/></rect>' +
              '<rect x="55" y="80" width="14" height="30" rx="2" fill="rgba(99,25,240,0.4)"><animate attributeName="height" values="30;22;30" dur="2.5s" repeatCount="indefinite"/><animate attributeName="y" values="80;88;80" dur="2.5s" repeatCount="indefinite"/></rect>' +
              '<rect x="75" y="70" width="14" height="40" rx="2" fill="rgba(99,25,240,0.5)"><animate attributeName="height" values="40;45;40" dur="3.2s" repeatCount="indefinite"/><animate attributeName="y" values="70;65;70" dur="3.2s" repeatCount="indefinite"/></rect>' +
              '<rect x="95" y="60" width="14" height="50" rx="2" fill="rgba(99,25,240,0.6)"><animate attributeName="height" values="50;38;50" dur="2.8s" repeatCount="indefinite"/><animate attributeName="y" values="60;72;60" dur="2.8s" repeatCount="indefinite"/></rect>' +
              '<rect x="115" y="55" width="14" height="55" rx="2" fill="#6319f0"><animate attributeName="height" values="55;60;55" dur="3s" repeatCount="indefinite"/><animate attributeName="y" values="55;50;55" dur="3s" repeatCount="indefinite"/></rect>' +
              '<rect x="145" y="55" width="65" height="22" rx="4" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.15)" stroke-width="0.6"/>' +
              '<text x="178" y="68" text-anchor="middle" fill="rgba(34,197,94,0.8)" font-size="7" font-weight="600" font-family="system-ui">98.4% auth</text>' +
              '<rect x="145" y="82" width="65" height="22" rx="4" fill="rgba(99,25,240,0.06)" stroke="rgba(99,25,240,0.15)" stroke-width="0.6"/>' +
              '<text x="178" y="95" text-anchor="middle" fill="rgba(99,25,240,0.7)" font-size="7" font-weight="600" font-family="system-ui">\u20ac2.4M today</text>' +
            '</svg>' +
          '</div>' +
          '<h4>Real-Time Analytics</h4>' +
          '<p>Route-level filters, live reconciliation, role-based views for finance, ops, and support. Track by country, channel, or method.</p>' +
        '</div>' +
        /* 4. Modular Architecture */
        '<div class="pbrd-air-feat-card pbrd-air-reveal">' +
          '<div class="pbrd-air-feat-visual">' +
            '<svg viewBox="0 0 240 140" fill="none" class="pbrd-air-feat-svg">' +
              '<rect x="85" y="50" width="70" height="30" rx="8" fill="rgba(99,25,240,0.1)" stroke="rgba(99,25,240,0.3)" stroke-width="1"/>' +
              '<text x="120" y="69" text-anchor="middle" fill="#6319f0" font-size="7" font-weight="700" font-family="system-ui">PAYBYRD</text>' +
              '<rect x="10" y="10" width="55" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6"/>' +
              '<text x="38" y="23" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui">Amadeus</text>' +
              '<line x1="65" y1="30" x2="90" y2="50" stroke="rgba(99,25,240,0.2)" stroke-width="0.8" stroke-dasharray="3 2"/>' +
              '<rect x="175" y="10" width="55" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6"/>' +
              '<text x="203" y="23" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui">IATA</text>' +
              '<line x1="175" y1="30" x2="150" y2="50" stroke="rgba(99,25,240,0.2)" stroke-width="0.8" stroke-dasharray="3 2"/>' +
              '<rect x="10" y="100" width="40" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6"/>' +
              '<text x="30" y="113" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui">GDS</text>' +
              '<line x1="50" y1="100" x2="90" y2="80" stroke="rgba(99,25,240,0.2)" stroke-width="0.8" stroke-dasharray="3 2"/>' +
              '<rect x="80" y="100" width="40" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6"/>' +
              '<text x="100" y="113" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui">BSP</text>' +
              '<line x1="100" y1="100" x2="110" y2="80" stroke="rgba(99,25,240,0.2)" stroke-width="0.8" stroke-dasharray="3 2"/>' +
              '<rect x="150" y="100" width="40" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6"/>' +
              '<text x="170" y="113" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui">NDC</text>' +
              '<line x1="150" y1="100" x2="140" y2="80" stroke="rgba(99,25,240,0.2)" stroke-width="0.8" stroke-dasharray="3 2"/>' +
              '<rect x="185" y="55" width="50" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6"/>' +
              '<text x="210" y="68" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui">Custom</text>' +
              '<line x1="185" y1="65" x2="155" y2="65" stroke="rgba(99,25,240,0.2)" stroke-width="0.8" stroke-dasharray="3 2"/>' +
              '<circle r="2" fill="#6319f0" opacity="0"><animateMotion dur="2s" begin="0s" repeatCount="indefinite" path="M38,30 L90,50"/><animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite"/></circle>' +
              '<circle r="2" fill="#6319f0" opacity="0"><animateMotion dur="2.5s" begin="0.5s" repeatCount="indefinite" path="M203,30 L150,50"/><animate attributeName="opacity" values="0;0.6;0" dur="2.5s" repeatCount="indefinite"/></circle>' +
              '<circle r="2" fill="#6319f0" opacity="0"><animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M30,100 L90,80"/><animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite"/></circle>' +
            '</svg>' +
          '</div>' +
          '<h4>Modular Architecture</h4>' +
          '<p>Connects to Amadeus, IATA, GDS, BSP, NDC. Self-host modules or use full-stack. Like Lego blocks for payments.</p>' +
        '</div>' +
      '</div>' +
      /* Benchmark */
      '<div class="pbrd-air-benchmark pbrd-air-reveal" id="benchmark">' +
        '<div class="pbrd-air-bench-header">' +
          '<div class="pbrd-air-section-label">APPROVAL RATE ADVANTAGE</div>' +
          '<h4>Paybyrd vs. the competition</h4>' +
          '<p>Production data from airline transactions \u00b7 Impact shown on \u20AC10M annual volume</p>' +
        '</div>' +
        '<div class="pbrd-air-bench-rows">' +
          '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Adyen</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--1" data-w="35"></div></div><span class="pbrd-air-bench-val">+1.72%</span><span class="pbrd-air-bench-money">\u2212\u20AC172K lost</span></div>' +
          '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Elavon</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--2" data-w="64"></div></div><span class="pbrd-air-bench-val">+3.16%</span><span class="pbrd-air-bench-money">\u2212\u20AC316K lost</span></div>' +
          '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Checkout.com</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--3" data-w="98"></div></div><span class="pbrd-air-bench-val">+4.86%</span><span class="pbrd-air-bench-money">\u2212\u20AC486K lost</span></div>' +
          '<div class="pbrd-air-bench-row pbrd-air-bench-row--top"><span class="pbrd-air-bench-name">vs Nuvei</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--4" data-w="100"></div></div><span class="pbrd-air-bench-val">+4.92%</span><span class="pbrd-air-bench-money">\u2212\u20AC492K lost</span></div>' +
        '</div>' +
        '<div class="pbrd-air-bench-footer">' +
          '<a href="/book-demo" class="pbrd-air-cta-primary" style="margin-top:20px">See your projected uplift \u2192</a>' +
        '</div>' +
      '</div>';

    section.appendChild(showcase);

    /* Animate benchmark bars */
    if ("IntersectionObserver" in window) {
      var bench = showcase.querySelector(".pbrd-air-benchmark");
      if (bench) {
        new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) {
            bench.querySelectorAll(".pbrd-air-bench-bar").forEach(function(bar, i) {
              setTimeout(function() { bar.style.width = bar.getAttribute("data-w") + "%"; }, 200 + i * 200);
            });
            this.disconnect();
          }
        }, { threshold: 0.3 }).observe(bench);
      }
    }

    observeReveal(".pbrd-air-reveal", 150, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 3b. FRAUD PLATFORM — Dedicated Section      */
  /* ═══════════════════════════════════════════ */

  function buildFraudSection() {
    /* Insert after the features section OR after the scroll-draw section */
    var featWrap = document.querySelector(".pbrd-air-feat-wrap");
    var anchor = featWrap ? (featWrap.closest("section") || featWrap.parentElement) : null;

    /* Fallback: find the scroll-draw section or CTA section */
    if (!anchor) {
      anchor = findSectionByHeading("data that moves") || findSectionByHeading("works with your stack");
    }

    if (!anchor) {
      console.log("[Paybyrd] Fraud section: no anchor found");
      return;
    }
    console.log("[Paybyrd] Fraud section anchor: " + anchor.tagName + " class=" + (anchor.className || "").substring(0, 40));

    var s = document.createElement("section");
    s.className = "pbrd-air-fraud-section";

    s.innerHTML =
      '<div class="pbrd-air-fraud-wrap">' +

        /* Header */
        '<div class="pbrd-air-fraud-header pbrd-air-reveal">' +
          '<div class="pbrd-air-section-label">FRAUD PREVENTION</div>' +
          '<h2 class="pbrd-air-fraud-h2">Your shield against the $1B threat.</h2>' +
          '<p class="pbrd-air-fraud-sub">Real-time transaction scoring, configurable rules, and AI-powered case review \u2014 all in one platform.</p>' +
        '</div>' +

        /* ── Main visualization: Live Threat Monitor ── */
        '<div class="pbrd-air-fraud-monitor pbrd-air-reveal">' +
          '<div class="pbrd-air-fraud-mon-header">' +
            '<div class="pbrd-air-fraud-mon-dot"></div>' +
            '<span>Threat Detection Monitor</span>' +
            '<span class="pbrd-air-fraud-mon-live">LIVE</span>' +
          '</div>' +
          '<div class="pbrd-air-fraud-mon-body">' +

            /* Left: SVG threat visualization */
            '<div class="pbrd-air-fraud-viz">' +
              '<svg viewBox="0 0 400 240" fill="none" class="pbrd-air-fraud-svg">' +

                /* Incoming transactions from left */
                '<text x="10" y="15" fill="rgba(255,255,255,0.2)" font-size="7" font-weight="600" font-family="system-ui">INCOMING</text>' +
                '<circle r="4" fill="#22c55e" opacity="0"><animateMotion dur="2.5s" begin="0s" repeatCount="indefinite" path="M0,40 L130,40 L200,120"/><animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.5s" repeatCount="indefinite"/></circle>' +
                '<circle r="4" fill="#22c55e" opacity="0"><animateMotion dur="3s" begin="0.8s" repeatCount="indefinite" path="M0,70 L130,70 L200,120"/><animate attributeName="opacity" values="0;0.8;0.8;0" dur="3s" repeatCount="indefinite"/></circle>' +
                '<circle r="4" fill="#ef4444" opacity="0"><animateMotion dur="2.8s" begin="1.5s" repeatCount="indefinite" path="M0,100 L130,100"/><animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.8s" repeatCount="indefinite"/></circle>' +
                '<circle r="4" fill="#22c55e" opacity="0"><animateMotion dur="3.2s" begin="2s" repeatCount="indefinite" path="M0,130 L130,130 L200,120"/><animate attributeName="opacity" values="0;0.8;0.8;0" dur="3.2s" repeatCount="indefinite"/></circle>' +
                '<circle r="4" fill="#ef4444" opacity="0"><animateMotion dur="2.6s" begin="0.5s" repeatCount="indefinite" path="M0,160 L130,160"/><animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.6s" repeatCount="indefinite"/></circle>' +
                '<circle r="4" fill="#22c55e" opacity="0"><animateMotion dur="3s" begin="1.2s" repeatCount="indefinite" path="M0,190 L130,190 L200,120"/><animate attributeName="opacity" values="0;0.8;0.8;0" dur="3s" repeatCount="indefinite"/></circle>' +

                /* Shield / filter barrier */
                '<rect x="125" y="20" width="8" height="200" rx="4" fill="rgba(99,25,240,0.15)" stroke="rgba(99,25,240,0.3)" stroke-width="1">' +
                  '<animate attributeName="fill" values="rgba(99,25,240,0.1);rgba(99,25,240,0.2);rgba(99,25,240,0.1)" dur="2s" repeatCount="indefinite"/>' +
                '</rect>' +
                '<text x="129" y="12" text-anchor="middle" fill="rgba(99,25,240,0.5)" font-size="6" font-weight="700" font-family="system-ui">SHIELD</text>' +

                /* Scoring engine */
                '<rect x="160" y="85" width="80" height="70" rx="10" fill="rgba(99,25,240,0.06)" stroke="rgba(99,25,240,0.15)" stroke-width="0.8"/>' +
                '<text x="200" y="105" text-anchor="middle" fill="#6319f0" font-size="8" font-weight="700" font-family="system-ui">SCORING</text>' +
                '<text x="200" y="118" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="6" font-family="system-ui">Rules \u00b7 Velocity \u00b7 AI</text>' +

                /* Score gauge */
                '<circle cx="200" cy="140" r="10" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3"/>' +
                '<circle cx="200" cy="140" r="10" fill="none" stroke="#22c55e" stroke-width="3" stroke-dasharray="20 43" stroke-linecap="round" transform="rotate(-90,200,140)"><animate attributeName="stroke-dasharray" values="20 43;40 23;15 48;30 33" dur="4s" repeatCount="indefinite"/><animate attributeName="stroke" values="#22c55e;#eab308;#ef4444;#22c55e" dur="4s" repeatCount="indefinite"/></circle>' +

                /* Output: approved transactions exit right */
                '<text x="300" y="85" fill="rgba(34,197,94,0.5)" font-size="7" font-weight="600" font-family="system-ui">APPROVED</text>' +
                '<circle r="3" fill="#22c55e" opacity="0"><animateMotion dur="1.5s" begin="2.5s" repeatCount="indefinite" path="M200,120 L320,95"/><animate attributeName="opacity" values="0;0.6;0" dur="1.5s" repeatCount="indefinite"/></circle>' +
                '<circle r="3" fill="#22c55e" opacity="0"><animateMotion dur="1.5s" begin="3.3s" repeatCount="indefinite" path="M200,120 L320,105"/><animate attributeName="opacity" values="0;0.6;0" dur="1.5s" repeatCount="indefinite"/></circle>' +
                '<circle r="3" fill="#22c55e" opacity="0"><animateMotion dur="1.5s" begin="2.8s" repeatCount="indefinite" path="M200,120 L320,115"/><animate attributeName="opacity" values="0;0.6;0" dur="1.5s" repeatCount="indefinite"/></circle>' +

                /* Declined: red dots deflected down */
                '<text x="160" y="195" fill="rgba(239,68,68,0.4)" font-size="6" font-weight="600" font-family="system-ui">BLOCKED</text>' +
                '<circle r="2.5" fill="#ef4444" opacity="0"><animateMotion dur="1.5s" begin="1.5s" repeatCount="indefinite" path="M130,100 L160,200"/><animate attributeName="opacity" values="0;0.5;0" dur="1.5s" repeatCount="indefinite"/></circle>' +
                '<circle r="2.5" fill="#ef4444" opacity="0"><animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite" path="M130,160 L170,210"/><animate attributeName="opacity" values="0;0.5;0" dur="1.5s" repeatCount="indefinite"/></circle>' +

                /* Connection lines (faint) */
                '<line x1="0" y1="40" x2="125" y2="40" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
                '<line x1="0" y1="70" x2="125" y2="70" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
                '<line x1="0" y1="100" x2="125" y2="100" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
                '<line x1="0" y1="130" x2="125" y2="130" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
                '<line x1="0" y1="160" x2="125" y2="160" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
                '<line x1="0" y1="190" x2="125" y2="190" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +

              '</svg>' +
            '</div>' +

            /* Right: live stats panel */
            '<div class="pbrd-air-fraud-stats">' +
              '<div class="pbrd-air-fraud-stat">' +
                '<div class="pbrd-air-fraud-stat-v pbrd-air-fraud-countup" data-target="98.7" data-suffix="%" data-prefix="">0%</div>' +
                '<div class="pbrd-air-fraud-stat-l">Legitimate Traffic</div>' +
              '</div>' +
              '<div class="pbrd-air-fraud-stat">' +
                '<div class="pbrd-air-fraud-stat-v" style="color:#ef4444;">1.3%</div>' +
                '<div class="pbrd-air-fraud-stat-l">Threats Blocked</div>' +
              '</div>' +
              '<div class="pbrd-air-fraud-stat">' +
                '<div class="pbrd-air-fraud-stat-v" style="color:#6319f0;">< 50ms</div>' +
                '<div class="pbrd-air-fraud-stat-l">Scoring Latency</div>' +
              '</div>' +
              '<div class="pbrd-air-fraud-stat">' +
                '<div class="pbrd-air-fraud-stat-v">16.8%</div>' +
                '<div class="pbrd-air-fraud-stat-l">Chargeback Reduction</div>' +
              '</div>' +
            '</div>' +

          '</div>' +
        '</div>' +

        /* ── Capabilities grid ── */
        '<div class="pbrd-air-fraud-caps">' +
          '<div class="pbrd-air-fraud-cap pbrd-air-reveal">' +
            '<div class="pbrd-air-fraud-cap-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" stroke-width="1.5"/></svg></div>' +
            '<h5>Configurable Rule Engine</h5>' +
            '<p>15+ condition types: velocity, pattern matching, geo-distance, BIN analysis, temporal triggers, ML scores. Visual builder \u2014 no coding.</p>' +
          '</div>' +
          '<div class="pbrd-air-fraud-cap pbrd-air-reveal">' +
            '<div class="pbrd-air-fraud-cap-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div>' +
            '<h5>Real-Time Enrichment</h5>' +
            '<p>IP geolocation, proxy detection, email reputation, phone validation, billing/shipping distance \u2014 all resolved instantly per transaction.</p>' +
          '</div>' +
          '<div class="pbrd-air-fraud-cap pbrd-air-reveal">' +
            '<div class="pbrd-air-fraud-cap-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.5"/></svg></div>' +
            '<h5>Shadow Mode Testing</h5>' +
            '<p>Run new rules in parallel without affecting live decisions. See impact on approval rates and false positives before activation.</p>' +
          '</div>' +
          '<div class="pbrd-air-fraud-cap pbrd-air-reveal">' +
            '<div class="pbrd-air-fraud-cap-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5"/></svg></div>' +
            '<h5>AI Case Review</h5>' +
            '<p>AI analyzes every flagged transaction: fraud type, risk indicators, recommended action. Analysts decide \u2014 not dig.</p>' +
          '</div>' +
          '<div class="pbrd-air-fraud-cap pbrd-air-reveal">' +
            '<div class="pbrd-air-fraud-cap-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M3 3h18v18H3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 9h18M9 3v18" stroke="currentColor" stroke-width="1.5"/></svg></div>' +
            '<h5>Analytics Dashboard</h5>' +
            '<p>12+ real-time widgets: country heatmaps, rule leaderboards, scheme breakdowns, merchant risk profiles, peer benchmarks.</p>' +
          '</div>' +
          '<div class="pbrd-air-fraud-cap pbrd-air-reveal">' +
            '<div class="pbrd-air-fraud-cap-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5"/></svg></div>' +
            '<h5>Multi-Tenant Hierarchy</h5>' +
            '<p>Partner \u2192 Merchant \u2192 Store. Shared rule sets cascade down. Each workspace fully isolated with role-based access.</p>' +
          '</div>' +
        '</div>' +

      '</div>';

    anchor.insertAdjacentElement("afterend", s);

    /* Animate counters */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          s.querySelectorAll(".pbrd-air-fraud-countup").forEach(function(el) {
            var target = parseFloat(el.getAttribute("data-target"));
            var suffix = el.getAttribute("data-suffix") || "";
            var dur = 1800, startTime = null;
            function step(ts) {
              if (!startTime) startTime = ts;
              var p = Math.min((ts - startTime) / dur, 1);
              el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(1) + suffix;
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
          this.disconnect();
        }
      }, { threshold: 0.2 }).observe(s);
    }

    observeReveal(".pbrd-air-reveal", 120, s);
  }

  /* 4. TAP TESTIMONIAL                          */
  /* ═══════════════════════════════════════════ */

  function buildTestimonial() {
    /* Insert after the leakage dashboard's parent section */
    var dash = document.querySelector(".pbrd-air-leak-dash");
    var anchor = dash ? (dash.closest("section") || dash.closest("[class*='section']")) : null;

    /* Fallback: try finding any section after the features */
    if (!anchor) {
      var bench = document.querySelector(".pbrd-air-benchmark");
      anchor = bench ? (bench.closest("section") || bench.closest("[class*='section']")) : null;
    }

    /* Nuclear fallback: just find the 3rd section on the page */
    if (!anchor) {
      var allSections = document.querySelectorAll("section, [class*='section']");
      if (allSections.length > 3) anchor = allSections[3];
    }

    if (!anchor) {
      console.log("[Paybyrd] Testimonial: no anchor found");
      return;
    }

    var s = document.createElement("section");
    s.className = "pbrd-air-test-section";
    s.innerHTML =
      '<div class="pbrd-air-test-wrap">' +

        /* ── Top: large cinematic quote ── */
        '<div class="pbrd-air-test-hero pbrd-air-reveal">' +
          '<div class="pbrd-air-test-label">CASE STUDY</div>' +
          '<div class="pbrd-air-test-airline">TAP Air Portugal</div>' +
          '<blockquote class="pbrd-air-test-bigquote">' +
            '\u201CWe used to spend hours reconciling ticket payments from different regions and systems. With Paybyrd, that\u2019s now handled in real time. Our costs dropped, and our team got their hours back.\u201D' +
          '</blockquote>' +
          '<div class="pbrd-air-test-author">' +
            '<div class="pbrd-air-test-avatar">JF</div>' +
            '<div>' +
              '<div class="pbrd-air-test-name">Jo\u00E3o Frias</div>' +
              '<div class="pbrd-air-test-role">Head of Payments</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* ── Bottom: animated results strip ── */
        '<div class="pbrd-air-test-results pbrd-air-reveal">' +
          '<div class="pbrd-air-test-result">' +
            '<div class="pbrd-air-test-rv pbrd-air-test-countup" data-target="4.2" data-suffix="%" data-prefix="+">+0%</div>' +
            '<div class="pbrd-air-test-rl">Authorization<br>Rate Uplift</div>' +
          '</div>' +
          '<div class="pbrd-air-test-divider"></div>' +
          '<div class="pbrd-air-test-result">' +
            '<div class="pbrd-air-test-rv pbrd-air-test-countup" data-target="15" data-suffix="%" data-prefix="">0%</div>' +
            '<div class="pbrd-air-test-rl">Lower Transaction<br>Costs</div>' +
          '</div>' +
          '<div class="pbrd-air-test-divider"></div>' +
          '<div class="pbrd-air-test-result">' +
            '<div class="pbrd-air-test-rv">Real-time</div>' +
            '<div class="pbrd-air-test-rl">Multi-Channel<br>Reconciliation</div>' +
          '</div>' +
          '<div class="pbrd-air-test-divider"></div>' +
          '<div class="pbrd-air-test-result">' +
            '<div class="pbrd-air-test-rv pbrd-air-test-countup" data-target="192" data-suffix="+" data-prefix="">0+</div>' +
            '<div class="pbrd-air-test-rl">Currencies<br>Supported</div>' +
          '</div>' +
        '</div>' +

        /* ── CTA ── */
        '<div class="pbrd-air-test-cta pbrd-air-reveal">' +
          '<a href="/book-demo" class="pbrd-air-cta-primary">Get results like TAP \u2192</a>' +
        '</div>' +
      '</div>';

    anchor.parentNode.insertBefore(s, anchor);

    /* Animate counters on scroll */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          s.querySelectorAll(".pbrd-air-test-countup").forEach(function(el) {
            var target = parseFloat(el.getAttribute("data-target"));
            var suffix = el.getAttribute("data-suffix") || "";
            var prefix = el.getAttribute("data-prefix") || "";
            var isFloat = target % 1 !== 0;
            var dur = 1800, startTime = null;
            function step(ts) {
              if (!startTime) startTime = ts;
              var p = Math.min((ts - startTime) / dur, 1);
              var eased = 1 - Math.pow(1 - p, 3);
              var val = target * eased;
              el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
          this.disconnect();
        }
      }, { threshold: 0.3 }).observe(s);
    }

    observeReveal(".pbrd-air-reveal", 150, s);
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
  /* 7. Data Section — Visual Enrichment         */
  /* ═══════════════════════════════════════════ */

  function enhanceDataSection() {
    var section = findSectionByHeading("data that moves");
    if (!section) return;

    /* Add floating data particles behind the draw-scroll area */
    var drawWrap = section.querySelector("[class*='draw_scroll'], [class*='draw-scroll']") || section;
    drawWrap.style.setProperty("position", "relative", "important");
    drawWrap.style.setProperty("overflow", "hidden", "important");

    /* Particle layer */
    var particles = document.createElement("div");
    particles.setAttribute("style",
      "position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden;"
    );

    var particleData = [
      { x: 8, dur: 12, delay: 0, size: 3 },
      { x: 22, dur: 15, delay: 2, size: 2 },
      { x: 38, dur: 10, delay: 1, size: 4 },
      { x: 55, dur: 14, delay: 3, size: 2 },
      { x: 70, dur: 11, delay: 0.5, size: 3 },
      { x: 85, dur: 13, delay: 1.5, size: 2 },
      { x: 15, dur: 16, delay: 4, size: 2 },
      { x: 48, dur: 12, delay: 2.5, size: 3 },
      { x: 92, dur: 14, delay: 1, size: 2 },
      { x: 62, dur: 11, delay: 3.5, size: 4 },
    ];

    particleData.forEach(function(p) {
      var dot = document.createElement("div");
      dot.setAttribute("style",
        "position:absolute;width:" + p.size + "px;height:" + p.size + "px;" +
        "border-radius:50%;background:rgba(99,25,240,0.15);" +
        "left:" + p.x + "%;bottom:-10px;" +
        "animation:pbrd-air-data-float " + p.dur + "s linear " + p.delay + "s infinite;"
      );
      particles.appendChild(dot);
    });

    drawWrap.insertBefore(particles, drawWrap.firstChild);

    /* Add stat badges next to each visual_text item */
    var stats = [
      { find: "forecasts", badge: "12+ dashboard widgets" },
      { find: "conversion", badge: "By country \u00b7 method \u00b7 channel" },
      { find: "clarity", badge: "Role-based views" },
      { find: "revenue leaks", badge: "Real-time alerts" },
    ];

    section.querySelectorAll("[class*='visual_text'], [class*='draw'] p, [class*='scroll'] p").forEach(function(el) {
      var txt = el.textContent.toLowerCase();
      stats.forEach(function(s) {
        if (txt.includes(s.find)) {
          var badge = document.createElement("span");
          badge.setAttribute("style",
            "display:inline-block;margin-top:8px;padding:4px 12px;" +
            "border-radius:100px;background:rgba(99,25,240,0.08);" +
            "color:#6319f0;font-size:0.625rem;font-weight:600;" +
            "letter-spacing:0.02em;"
          );
          badge.textContent = s.badge;
          el.appendChild(badge);
        }
      });
    });

    /* Add a section subtitle enhancement */
    var heading = findHeading("data that moves");
    if (heading) {
      var nextP = heading.nextElementSibling;
      if (nextP && nextP.tagName === "P") {
        nextP.textContent = "Every touchpoint is a transaction. Paybyrd turns payment data into real-time intelligence that drives decisions.";
      }
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                        */
  /* ═══════════════════════════════════════════ */

  function init() {
    enhanceHero();
    enhanceProblem();
    enhanceFeatures();
    buildFraudSection();
    buildTestimonial();
    enhanceDataSection();
    enhanceBottomCTA();
    enhanceFAQ();
    console.log("[Paybyrd] Airlines enhancements loaded");
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init);
})();
