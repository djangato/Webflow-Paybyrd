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

    /* Hide the stock hero image and its column */
    section.querySelectorAll("img").forEach(function(img) {
      var wrap = img.closest("[class*='column'], [class*='layout-column']");
      if (wrap && !wrap.contains(heading)) {
        wrap.style.setProperty("display", "none", "important");
      }
      img.style.setProperty("display", "none", "important");
    });
    section.querySelectorAll("[class*='img_wrap'], [class*='image_wrap'], [class*='hero_img']").forEach(function(w) {
      w.style.setProperty("display", "none", "important");
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
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#ef4444" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="79"/></svg><span class="pbrd-air-leak-pct" data-target="79">0%</span></div>' +
          '<h4>Cart Abandonment</h4>' +
          '<p>Travel\u2019s highest drop-off rate</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 Paybyrd recovers 15\u201320%</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--orange pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#f97316" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="30"/></svg><span class="pbrd-air-leak-pct" data-target="30">0%</span></div>' +
          '<h4>Missing Local Methods</h4>' +
          '<p>Sales lost without local options</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 192+ currencies, local routing</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--yellow pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#eab308" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="17"/></svg><span class="pbrd-air-leak-pct" data-target="17">0%</span></div>' +
          '<h4>Fraud & Chargebacks</h4>' +
          '<p>$1B+ lost industry-wide</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 AI screening: 16.8% reduction</div>' +
        '</div>' +
        '<div class="pbrd-air-leak-card pbrd-air-leak--blue pbrd-air-reveal">' +
          '<div class="pbrd-air-leak-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/><circle cx="40" cy="40" r="34" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="214" stroke-linecap="round" class="pbrd-air-ring-fill" data-pct="15"/></svg><span class="pbrd-air-leak-pct" data-target="15">0%</span></div>' +
          '<h4>Cross-Border Fees</h4>' +
          '<p>Excessive FX & routing charges</p>' +
          '<div class="pbrd-air-leak-fix">\u2192 Local routing: 10\u201315% savings</div>' +
        '</div>' +
      '</div>';

    var paras = section.querySelectorAll("p");
    var lastP = null; paras.forEach(function(p) { if (p.style.display !== "none") lastP = p; });
    if (lastP) lastP.parentElement.insertBefore(dash, lastP.nextSibling);
    else section.appendChild(dash);

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
    heading.textContent = "Built for airlines. Proven in production.";
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    var updates = [
      { find: "global", text: "Process in 192+ currencies with local routing. 4\u20137% higher authorization rates. 10\u201315% lower cross-border fees." },
      { find: "dashboard", text: "Route-level filters, real-time reconciliation, role-based views. Track by country, channel, or payment method." },
      { find: "fraud", text: "AI velocity screening + shared fraud database. 3D Secure. Automated disputes. Result: 16.8% chargeback reduction." },
      { find: "flexibility", text: "Connects to Amadeus, IATA, GDS, BSP, NDC. Self-host modules or use full-stack. Like Lego blocks for payments." }
    ];
    section.querySelectorAll("p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      updates.forEach(function(u) { if (t.includes(u.find)) p.textContent = u.text; });
    });

    /* Benchmark chart */
    var bench = document.createElement("div");
    bench.className = "pbrd-air-benchmark pbrd-air-reveal";
    bench.id = "benchmark";
    bench.innerHTML =
      '<div class="pbrd-air-bench-header">' +
        '<div class="pbrd-air-section-label">APPROVAL RATE ADVANTAGE</div>' +
        '<h4>Paybyrd vs. the competition</h4>' +
        '<p>Production data from airline transactions</p>' +
      '</div>' +
      '<div class="pbrd-air-bench-rows">' +
        '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Adyen</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--1" data-w="35"></div></div><span class="pbrd-air-bench-val">+1.72%</span></div>' +
        '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Elavon</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--2" data-w="64"></div></div><span class="pbrd-air-bench-val">+3.16%</span></div>' +
        '<div class="pbrd-air-bench-row"><span class="pbrd-air-bench-name">vs Checkout.com</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--3" data-w="98"></div></div><span class="pbrd-air-bench-val">+4.86%</span></div>' +
        '<div class="pbrd-air-bench-row pbrd-air-bench-row--top"><span class="pbrd-air-bench-name">vs Nuvei</span><div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar pbrd-air-bench-bar--4" data-w="100"></div></div><span class="pbrd-air-bench-val">+4.92%</span></div>' +
      '</div>' +
      '<div class="pbrd-air-bench-footer">' +
        '<a href="/book-demo" class="pbrd-air-cta-primary" style="margin-top:24px">See your projected uplift \u2192</a>' +
      '</div>';

    var grid = section.querySelector("[class*='grid']");
    var target = grid || heading;
    while (target.parentElement && window.getComputedStyle(target.parentElement).display === "contents") target = target.parentElement;
    if (target.parentElement) target.parentElement.insertBefore(bench, target.nextSibling);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          bench.querySelectorAll(".pbrd-air-bench-bar").forEach(function(bar, i) {
            setTimeout(function() { bar.style.width = bar.getAttribute("data-w") + "%"; }, 200 + i * 200);
          });
          this.disconnect();
        }
      }, { threshold: 0.3 }).observe(bench);
    }

    observeReveal(".pbrd-air-reveal", 100, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 4. TAP TESTIMONIAL                          */
  /* ═══════════════════════════════════════════ */

  function buildTestimonial() {
    var anchor = findSectionByHeading("designed for the passenger") || findSectionByHeading("works with your stack");
    if (!anchor) return;

    var s = document.createElement("section");
    s.className = "pbrd-air-test-section";
    s.innerHTML =
      '<div class="pbrd-air-test-wrap">' +
        '<div class="pbrd-air-section-label" style="text-align:center;margin-bottom:8px">CASE STUDY</div>' +
        '<div class="pbrd-air-test-card pbrd-air-reveal">' +
          '<div class="pbrd-air-test-left">' +
            '<div class="pbrd-air-test-metrics">' +
              '<div class="pbrd-air-test-metric"><span class="pbrd-air-test-mv">A77</span><span class="pbrd-air-test-ml">Terminal</span></div>' +
              '<div class="pbrd-air-test-metric"><span class="pbrd-air-test-mv">Gate</span><span class="pbrd-air-test-ml">Boarding Payments</span></div>' +
              '<div class="pbrd-air-test-metric"><span class="pbrd-air-test-mv">Real-time</span><span class="pbrd-air-test-ml">Reconciliation</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-air-test-right">' +
            '<blockquote class="pbrd-air-test-quote">\u201CThe A77 Terminal, developed in collaboration with Paybyrd, emerged as a true powerhouse, revolutionizing the entire process at Boarding Gates.\u201D</blockquote>' +
            '<div class="pbrd-air-test-author">' +
              '<div class="pbrd-air-test-avatar">JF</div>' +
              '<div><div class="pbrd-air-test-name">Jo\u00E3o Frias</div><div class="pbrd-air-test-role">Head of Payments, TAP Air Portugal</div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    anchor.parentNode.insertBefore(s, anchor);
    observeReveal(".pbrd-air-reveal", 100, s);
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
