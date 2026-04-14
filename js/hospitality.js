/* Paybyrd \u2014 Hospitality Page: Masterpiece Build */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/hospitality")) return;

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
  /* 1. HERO \u2014 Complete Takeover                 */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heading = findHeading("seamless payments");
    if (!heading) return;
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    /* Hero background image */
    section.style.setProperty("background-image", "url('https://djangato.github.io/Webflow-Paybyrd/assets/hospitality/hero-hotel.png')", "important");
    section.style.setProperty("background-size", "cover", "important");
    section.style.setProperty("background-position", "center", "important");
    section.style.setProperty("background-repeat", "no-repeat", "important");
    section.style.setProperty("position", "relative", "important");

    /* Dark overlay for text readability */
    var overlay = document.createElement("div");
    overlay.setAttribute("style", "position:absolute;inset:0;background:rgba(0,0,0,0.55);z-index:0;pointer-events:none;");
    section.insertBefore(overlay, section.firstChild);

    /* Ensure content sits above overlay */
    Array.prototype.forEach.call(section.children, function(child) {
      if (child !== overlay) child.style.setProperty("position", "relative", "important");
      if (child !== overlay) child.style.setProperty("z-index", "1", "important");
    });

    /* Hide only the hero image \u2014 be very targeted */
    section.querySelectorAll("img").forEach(function(img) {
      var src = (img.getAttribute("src") || "").toLowerCase();
      if (src.includes("hero") || src.includes("paybyrd-hero")) {
        img.style.setProperty("opacity", "0", "important");
        img.style.setProperty("height", "0", "important");
        img.style.setProperty("overflow", "hidden", "important");
      }
    });

    /* Rewrite heading */
    heading.innerHTML = "The hotel payment platform<br>that eliminates checkout friction.";
    heading.style.setProperty("position", "relative", "important");
    heading.style.setProperty("z-index", "2", "important");

    /* Hide ALL old Webflow copy in the hero section */
    var parent = heading.parentElement;
    section.querySelectorAll("p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      if (t.includes("seamless") || t.includes("elevated") || t.includes("guest") || t.includes("experience")) {
        p.style.setProperty("display", "none", "important");
      }
    });
    parent.querySelectorAll("p").forEach(function(p) {
      p.style.setProperty("display", "none", "important");
    });

    /* Insert our own subtitle \u2014 INLINE styles to guarantee visibility */
    var subtitle = document.createElement("p");
    subtitle.setAttribute("style",
      "font-size:1rem !important;color:rgba(255,255,255,0.55) !important;" +
      "line-height:1.6 !important;margin:16px 0 0 0 !important;" +
      "display:block !important;position:relative !important;z-index:2 !important;" +
      "max-width:420px !important;padding:0 !important;"
    );
    subtitle.innerHTML = "Faster check-in. Unified billing. Multi-property control.<br>Ask Vila Gal\u00e9.";
    parent.insertBefore(subtitle, heading.nextSibling);

    /* \u2500\u2500 CTA row \u2014 INLINE styles \u2500\u2500 */
    var ctaRow = document.createElement("div");
    ctaRow.setAttribute("style",
      "display:flex !important;align-items:center !important;gap:14px !important;" +
      "margin:20px 0 0 0 !important;flex-wrap:wrap !important;" +
      "position:relative !important;z-index:2 !important;"
    );
    ctaRow.innerHTML =
      '<a href="/book-demo" class="pbrd-hosp-cta-primary">Book a 15-min Demo \u2192</a>' +
      '<a href="#data" class="pbrd-hosp-cta-ghost">See the data \u2193</a>';
    parent.insertBefore(ctaRow, subtitle.nextSibling);

    /* Stat ticker strip at bottom of hero */
    var stats = ["99.999% Uptime", "192+ Currencies", "84% Abandonment Solved", "PCI Level 1", "DCC 80% Revenue Share", "4\u20137% Higher Auth Rates", "16.8% Fewer Chargebacks"];
    var tickerHTML = stats.concat(stats).map(function(st) {
      return '<span class="pbrd-hosp-tick">' + st + '</span><span class="pbrd-hosp-tick-dot">\u00b7</span>';
    }).join("");
    var ticker = document.createElement("div");
    ticker.className = "pbrd-hosp-ticker-strip pbrd-hosp-reveal";
    ticker.setAttribute("style", "position:relative;z-index:2;margin-top:32px;");
    ticker.innerHTML = '<div class="pbrd-hosp-ticker-track">' + tickerHTML + '</div>';
    section.appendChild(ticker);

    observeReveal(".pbrd-hosp-reveal", 120);
  }


  /* ═══════════════════════════════════════════ */
  /* 1b. COMMAND CENTER — Inserted after hero    */
  /* ═══════════════════════════════════════════ */

  function buildCommandCenter() {
    var heroHeading = findHeading("hotel payment platform");
    if (!heroHeading) heroHeading = findHeading("seamless payments");
    if (!heroHeading) return;
    var heroSection = heroHeading.closest("section") || heroHeading.closest("[class*='section']");
    if (!heroSection) return;

    var s = document.createElement("section");
    s.className = "pbrd-hosp-cmd-section";
    s.setAttribute("style", "padding:48px 0;background:#0a0a0f;overflow:hidden;");

    /* SVG hotel outlet map — central Dashboard hub with all outlets */
    var CX = 350, CY = 190;
    var outlets = [
      { name: "Front Desk",    icon: "\u{1F3E8}", x: 120, y: 60,  d: "M350,190 Q235,90 120,60" },
      { name: "Restaurant",    icon: "\u{1F37D}", x: 580, y: 60,  d: "M350,190 Q465,90 580,60" },
      { name: "Spa & Wellness",icon: "\u{1F9D6}", x: 60,  y: 190, d: "M350,190 Q205,190 60,190" },
      { name: "Bar & Lounge",  icon: "\u{1F378}", x: 640, y: 190, d: "M350,190 Q495,190 640,190" },
      { name: "Room Service",  icon: "\u{1F6CE}", x: 140, y: 320, d: "M350,190 Q245,270 140,320" },
      { name: "Pool & Beach",  icon: "\u{1F3CA}", x: 560, y: 320, d: "M350,190 Q455,270 560,320" },
      { name: "Concierge",     icon: "\u{1F511}", x: 350, y: 360, d: "M350,190 Q350,275 350,360" },
    ];

    var svgPaths = "";
    outlets.forEach(function(o, i) {
      svgPaths +=
        '<path d="' + o.d + '" fill="none" stroke="rgba(99,25,240,0.25)" stroke-width="1.2" stroke-dasharray="4 3"/>' +
        '<circle r="3.5" fill="#6319f0" opacity="0">' +
          '<animateMotion dur="' + (2.5 + i * 0.4) + 's" begin="' + (i * 0.6) + 's" repeatCount="indefinite" path="' + o.d + '"/>' +
          '<animate attributeName="opacity" values="0;0.7;0.7;0" dur="' + (2.5 + i * 0.4) + 's" begin="' + (i * 0.6) + 's" repeatCount="indefinite"/>' +
        '</circle>';
    });

    /* Central dashboard hub */
    var svgDots =
      '<circle cx="' + CX + '" cy="' + CY + '" r="24" fill="rgba(99,25,240,0.08)"><animate attributeName="r" values="20;28;20" dur="3s" repeatCount="indefinite"/></circle>' +
      '<circle cx="' + CX + '" cy="' + CY + '" r="8" fill="#6319f0"/>' +
      '<text x="' + CX + '" y="' + (CY - 16) + '" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="11" font-weight="700" font-family="system-ui">DASHBOARD</text>';

    /* Outlet nodes */
    outlets.forEach(function(o) {
      svgDots +=
        '<circle cx="' + o.x + '" cy="' + o.y + '" r="5.5" fill="rgba(99,25,240,0.5)"/>' +
        '<text x="' + o.x + '" y="' + (o.y - 14) + '" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="12" font-weight="600" font-family="system-ui">' + o.name + '</text>';
    });

    s.innerHTML =
      '<div class="pbrd-hosp-cmd-wrap">' +
        '<div class="pbrd-hosp-cmd-header pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-section-label">OPERATIONAL COMMAND CENTER</div>' +
          '<h2 class="pbrd-hosp-cmd-h2">Every outlet. Every transaction.<br>One real-time dashboard.</h2>' +
          '<p class="pbrd-hosp-cmd-sub">Front desk, restaurant, spa, bar, pool, room service \u2014 every revenue stream flows into a single dashboard. Full business intelligence to maximize revenue and drive guest satisfaction.</p>' +
        '</div>' +
        '<div class="pbrd-hosp-map-wrap pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-map-left">' +
            '<svg viewBox="0 0 700 390" fill="none" class="pbrd-hosp-map-svg" preserveAspectRatio="xMidYMid meet">' +
              svgPaths + svgDots +
            '</svg>' +
          '</div>' +
          '<div class="pbrd-hosp-txn-feed">' +
            '<div class="pbrd-hosp-txn-feed-header"><div class="pbrd-hosp-txn-feed-dot"></div>LIVE TRANSACTIONS</div>' +
            '<div id="pbrd-hosp-feed"></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    heroSection.insertAdjacentElement("afterend", s);

    setTimeout(initFeed, 600);
    observeReveal(".pbrd-hosp-reveal", 120, s);
  }

  /* \u2500\u2500 Transaction feed \u2500\u2500 */
  function initFeed() {
    var feed = document.getElementById("pbrd-hosp-feed");
    if (!feed) return;
    var txns = [
      { r: "Front Desk",  a: "\u20AC342",   m: "Visa",        t: "0.3s" },
      { r: "Room Service", a: "\u20AC89",   m: "Room Charge", t: "0.2s" },
      { r: "Spa",         a: "\u20AC195",   m: "Apple Pay",   t: "0.4s" },
      { r: "Restaurant",  a: "\u20AC267",   m: "MC",          t: "0.3s" },
      { r: "Minibar",     a: "\u20AC32",    m: "Room Charge", t: "0.1s" },
      { r: "Bar",         a: "\u20AC56",    m: "MB WAY",      t: "0.2s" },
      { r: "Check-out",   a: "\u20AC1,247", m: "Amex",        t: "0.5s" },
      { r: "Pool Bar",    a: "\u20AC28",    m: "Contactless", t: "0.2s" },
    ];
    var idx = 0;
    function add() {
      var t = txns[idx++ % txns.length];
      var el = document.createElement("div");
      el.className = "pbrd-hosp-txn";
      el.innerHTML =
        '<span class="pbrd-hosp-txn-route">' + t.r + '</span>' +
        '<span class="pbrd-hosp-txn-amount">' + t.a + '</span>' +
        '<span class="pbrd-hosp-txn-method">' + t.m + '</span>' +
        '<span class="pbrd-hosp-txn-time">' + t.t + '</span>';
      feed.insertBefore(el, feed.firstChild);
      setTimeout(function() { el.classList.add("pbrd-hosp-txn--in"); }, 50);
      while (feed.children.length > 6) feed.removeChild(feed.lastChild);
    }
    add(); setTimeout(add, 600);
    setInterval(add, 2800);
  }

  /* ═══════════════════════════════════════════ */
  /* 2. PAIN POINTS                              */
  /* ═══════════════════════════════════════════ */

  function enhancePainPoints() {
    var heading = findHeading("reduce delays");
    if (!heading) return;
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    /* Hide ALL Webflow children */
    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-hosp-drain-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-hosp-drain-wrap";

    /* Revenue drain data — based on \u20AC100M annual volume */
    var leaks = [
      { label: "Booking Abandonment", pct: 84, lost: "8.4M", color: "#ef4444", fix: "Optimized checkout recovers 15\u201320%" },
      { label: "Card Declines (LatAm ~60%)", pct: 7, lost: "7.0M", color: "#f97316", fix: "Multi-acquiring: 4\u20137% higher auth rates" },
      { label: "Fraud & Chargebacks", pct: 4.6, lost: "4.6M", color: "#eab308", fix: "AI velocity screening: 16.8% reduction" },
      { label: "Cross-Border & FX Fees", pct: 12, lost: "1.2M", color: "#6319f0", fix: "Local routing: 10\u201315% savings, DCC 80% share" }
    ];

    /* Build the waterfall bars */
    var waterfallHTML = leaks.map(function(l, i) {
      return '<div class="pbrd-hosp-drain-row pbrd-hosp-reveal">' +
        '<div class="pbrd-hosp-drain-row-top">' +
          '<span class="pbrd-hosp-drain-label">' + l.label + '</span>' +
          '<span class="pbrd-hosp-drain-lost" style="color:' + l.color + '">\u2212\u20AC' + l.lost + '</span>' +
        '</div>' +
        '<div class="pbrd-hosp-drain-bar-track">' +
          '<div class="pbrd-hosp-drain-bar" data-w="' + Math.min(l.pct, 100) + '" style="background:' + l.color + '"></div>' +
        '</div>' +
        '<div class="pbrd-hosp-drain-fix">' +
          '<svg viewBox="0 0 16 16" width="12" height="12"><path d="M12 2L6 14" stroke="' + l.color + '" stroke-width="2" stroke-linecap="round" opacity="0.4"/><path d="M2 8l3 3 5-5" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>' +
          '<span>' + l.fix + '</span>' +
        '</div>' +
      '</div>';
    }).join("");

    wrap.innerHTML =
      '<div class="pbrd-hosp-drain-header pbrd-hosp-reveal">' +
        '<div class="pbrd-hosp-section-label">THE REVENUE DRAIN</div>' +
        '<h2 class="pbrd-hosp-drain-h2">While you read this, your hotel<br>is losing money.</h2>' +
      '</div>' +

      /* Live counter */
      '<div class="pbrd-hosp-drain-counter pbrd-hosp-reveal">' +
        '<div class="pbrd-hosp-drain-counter-label">Revenue lost by hotels worldwide since you opened this page</div>' +
        '<div class="pbrd-hosp-drain-counter-value" id="pbrd-hosp-drain-tick">\u20AC0</div>' +
        '<div class="pbrd-hosp-drain-counter-sub">The global hotel industry hemorrhages \u20AC2.7M every day to fraud, abandonment, and payment friction</div>' +
      '</div>' +

      /* Waterfall drain visualization */
      '<div class="pbrd-hosp-drain-waterfall">' +
        '<div class="pbrd-hosp-drain-waterfall-head">' +
          '<span>YOUR HOTEL GROUP \u00b7 ANNUAL LOSSES PER \u20AC100M VOLUME</span>' +
          '<span class="pbrd-hosp-drain-live-dot"></span>' +
        '</div>' +
        waterfallHTML +
        '<div class="pbrd-hosp-drain-total pbrd-hosp-reveal">' +
          '<span class="pbrd-hosp-drain-total-label">Paybyrd recovers up to</span>' +
          '<span class="pbrd-hosp-drain-total-value" id="pbrd-hosp-drain-total">\u20AC0</span>' +
          '<span class="pbrd-hosp-drain-total-sub" style="font-size:0.6875rem;color:rgba(255,255,255,0.3);margin-left:8px;">per year on \u20AC100M volume</span>' +
        '</div>' +
      '</div>' +

      '<div class="pbrd-hosp-drain-cta pbrd-hosp-reveal">' +
        '<a href="/book-demo" class="pbrd-hosp-cta-primary" style="padding:14px 32px;">Calculate your exact savings \u2192</a>' +
      '</div>';

    section.appendChild(wrap);

    /* Animate on scroll */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          /* Animate drain bars */
          wrap.querySelectorAll(".pbrd-hosp-drain-bar").forEach(function(bar, i) {
            setTimeout(function() {
              bar.style.width = bar.getAttribute("data-w") + "%";
            }, 300 + i * 200);
          });

          /* Live ticking counter — $1B/year = ~$2.74M/day = ~$114K/hour = ~$1,900/min = ~$32/sec */
          var tickEl = document.getElementById("pbrd-hosp-drain-tick");
          if (tickEl) {
            var val = 0;
            var perTick = 31500; /* ~$31.5K per tick (every 1s) for dramatic effect */
            setInterval(function() {
              val += perTick + Math.round(Math.random() * 8000);
              tickEl.textContent = "\u20AC" + val.toLocaleString("de-DE");
            }, 1000);
          }

          /* Animate total recoverable */
          var totalEl = document.getElementById("pbrd-hosp-drain-total");
          if (totalEl) {
            var dur = 2000, target = 21200000, startTime = null;
            function stepTotal(ts) {
              if (!startTime) startTime = ts;
              var p = Math.min((ts - startTime) / dur, 1);
              var v = Math.round(target * (1 - Math.pow(1 - p, 3)));
              totalEl.textContent = "\u20AC" + v.toLocaleString("de-DE");
              if (p < 1) requestAnimationFrame(stepTotal);
            }
            setTimeout(function() { requestAnimationFrame(stepTotal); }, 1200);
          }

          this.disconnect();
        }
      }, { threshold: 0.15 }).observe(wrap);
    }

    observeReveal(".pbrd-hosp-reveal", 100, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 3. FEATURES                                 */
  /* ═══════════════════════════════════════════ */

  function enhanceFeatures() {
    var heading = findHeading("built for the way hospitality");
    if (!heading) return;
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    section.style.setProperty("padding", "24px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-hosp-feat-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var showcase = document.createElement("div");
    showcase.className = "pbrd-hosp-feat-wrap";
    showcase.innerHTML =
      '<div class="pbrd-hosp-feat-header">' +
        '<div class="pbrd-hosp-section-label pbrd-hosp-reveal">THE PAYBYRD ADVANTAGE</div>' +
        '<h2 class="pbrd-hosp-feat-h2 pbrd-hosp-reveal">Four pillars of hotel payment excellence.</h2>' +
        '<p class="pbrd-hosp-feat-sub pbrd-hosp-reveal">Each one solves a problem that costs hotel groups millions.</p>' +
      '</div>' +

      '<div class="pbrd-hosp-feat-grid">' +

        /* Card 1 — Unified Guest Folio: animated stay timeline */
        '<div class="pbrd-hosp-feat-card pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-feat-card-visual">' +
            '<svg viewBox="0 0 240 120" fill="none">' +
              /* Timeline bar */
              '<line x1="20" y1="55" x2="220" y2="55" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>' +
              '<line x1="20" y1="55" x2="220" y2="55" stroke="rgba(99,25,240,0.4)" stroke-width="2" stroke-dasharray="0 200"><animate attributeName="stroke-dasharray" values="0 200;200 0" dur="3s" fill="freeze"/></line>' +
              /* Touchpoints appear along the timeline */
              '<circle cx="40" cy="55" r="5" fill="#6319f0" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.3s" fill="freeze"/></circle>' +
              '<text x="40" y="42" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.3s" fill="freeze"/>Check-in</text>' +
              '<text x="40" y="72" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="5.5" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.3s" fill="freeze"/>\u20AC500</text>' +
              '<circle cx="90" cy="55" r="5" fill="#6319f0" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.9s" fill="freeze"/></circle>' +
              '<text x="90" y="42" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.9s" fill="freeze"/>Spa</text>' +
              '<text x="90" y="72" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="5.5" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.9s" fill="freeze"/>+\u20AC95</text>' +
              '<circle cx="130" cy="55" r="5" fill="#6319f0" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.4s" fill="freeze"/></circle>' +
              '<text x="130" y="42" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.4s" fill="freeze"/>Dinner</text>' +
              '<text x="130" y="72" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="5.5" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.4s" fill="freeze"/>+\u20AC187</text>' +
              '<circle cx="170" cy="55" r="5" fill="#6319f0" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.9s" fill="freeze"/></circle>' +
              '<text x="170" y="42" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.9s" fill="freeze"/>Minibar</text>' +
              '<text x="170" y="72" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="5.5" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.9s" fill="freeze"/>+\u20AC32</text>' +
              /* Checkout total */
              '<circle cx="210" cy="55" r="7" fill="#6319f0" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="2.5s" fill="freeze"/></circle>' +
              '<text x="210" y="42" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="2.5s" fill="freeze"/>Check-out</text>' +
              '<rect x="185" y="78" width="50" height="18" rx="4" fill="rgba(99,25,240,0.15)" stroke="#6319f0" stroke-width="1" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="2.8s" fill="freeze"/></rect>' +
              '<text x="210" y="90" text-anchor="middle" fill="#6319f0" font-size="7" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="2.8s" fill="freeze"/>\u20AC814</text>' +
            '</svg>' +
          '</div>' +
          '<h3>Unified Guest Folio</h3>' +
          '<p>Every charge \u2014 room, spa, dinner, minibar \u2014 flows into one folio in real time. At checkout, one tap. No line items missed, no billing disputes.</p>' +
        '</div>' +

        /* Card 2 — Multi-Property & Outlet Dashboard: live heatmap grid */
        '<div class="pbrd-hosp-feat-card pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-feat-card-visual">' +
            '<svg viewBox="0 0 240 120" fill="none">' +
              /* Grid of outlet cells — heatmap style */
              '<text x="10" y="18" fill="rgba(255,255,255,0.35)" font-size="6" font-weight="600" font-family="system-ui">LIVE REVENUE HEATMAP</text>' +
              /* Row labels */
              '<text x="8" y="42" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">Lisbon</text>' +
              '<text x="8" y="62" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">Algarve</text>' +
              '<text x="8" y="82" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">Porto</text>' +
              '<text x="8" y="102" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">Cascais</text>' +
              /* Col labels */
              '<text x="58" y="28" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Front Desk</text>' +
              '<text x="98" y="28" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Restaurant</text>' +
              '<text x="138" y="28" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Spa</text>' +
              '<text x="178" y="28" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Bar</text>' +
              '<text x="218" y="28" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Pool</text>' +
              /* Heatmap cells — varying purple intensity */
              '<rect x="40" y="34" width="32" height="14" rx="3" fill="rgba(99,25,240,0.5)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.2s" fill="freeze"/></rect>' +
              '<rect x="80" y="34" width="32" height="14" rx="3" fill="rgba(99,25,240,0.7)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.3s" fill="freeze"/></rect>' +
              '<rect x="120" y="34" width="32" height="14" rx="3" fill="rgba(99,25,240,0.3)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.4s" fill="freeze"/></rect>' +
              '<rect x="160" y="34" width="32" height="14" rx="3" fill="rgba(99,25,240,0.6)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.5s" fill="freeze"/></rect>' +
              '<rect x="200" y="34" width="32" height="14" rx="3" fill="rgba(99,25,240,0.2)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.6s" fill="freeze"/></rect>' +
              '<rect x="40" y="54" width="32" height="14" rx="3" fill="rgba(99,25,240,0.8)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.4s" fill="freeze"/></rect>' +
              '<rect x="80" y="54" width="32" height="14" rx="3" fill="rgba(99,25,240,0.4)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.5s" fill="freeze"/></rect>' +
              '<rect x="120" y="54" width="32" height="14" rx="3" fill="rgba(99,25,240,0.9)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.6s" fill="freeze"/></rect>' +
              '<rect x="160" y="54" width="32" height="14" rx="3" fill="rgba(99,25,240,0.3)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.7s" fill="freeze"/></rect>' +
              '<rect x="200" y="54" width="32" height="14" rx="3" fill="rgba(99,25,240,0.5)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.8s" fill="freeze"/></rect>' +
              '<rect x="40" y="74" width="32" height="14" rx="3" fill="rgba(99,25,240,0.35)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.6s" fill="freeze"/></rect>' +
              '<rect x="80" y="74" width="32" height="14" rx="3" fill="rgba(99,25,240,0.6)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.7s" fill="freeze"/></rect>' +
              '<rect x="120" y="74" width="32" height="14" rx="3" fill="rgba(99,25,240,0.2)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.8s" fill="freeze"/></rect>' +
              '<rect x="160" y="74" width="32" height="14" rx="3" fill="rgba(99,25,240,0.7)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.9s" fill="freeze"/></rect>' +
              '<rect x="200" y="74" width="32" height="14" rx="3" fill="rgba(99,25,240,0.4)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="1.0s" fill="freeze"/></rect>' +
              '<rect x="40" y="94" width="32" height="14" rx="3" fill="rgba(99,25,240,0.6)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.8s" fill="freeze"/></rect>' +
              '<rect x="80" y="94" width="32" height="14" rx="3" fill="rgba(99,25,240,0.45)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="0.9s" fill="freeze"/></rect>' +
              '<rect x="120" y="94" width="32" height="14" rx="3" fill="rgba(99,25,240,0.55)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="1.0s" fill="freeze"/></rect>' +
              '<rect x="160" y="94" width="32" height="14" rx="3" fill="rgba(99,25,240,0.8)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="1.1s" fill="freeze"/></rect>' +
              '<rect x="200" y="94" width="32" height="14" rx="3" fill="rgba(99,25,240,0.3)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.2s" begin="1.2s" fill="freeze"/></rect>' +
            '</svg>' +
          '</div>' +
          '<h3>Multi-Property & Outlet Dashboard</h3>' +
          '<p>Cross-property, cross-outlet BI at a glance. Filter by hotel, outlet, shift, or payment method. AI generates ad-hoc reports per channel in seconds.</p>' +
        '</div>' +

        /* Card 3 — Smart Payment Routing: animated approval funnel */
        '<div class="pbrd-hosp-feat-card pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-feat-card-visual">' +
            '<svg viewBox="0 0 240 120" fill="none">' +
              /* Funnel stages */
              '<rect x="10" y="20" width="50" height="80" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>' +
              '<text x="35" y="50" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="6" font-weight="600" font-family="system-ui">100</text>' +
              '<text x="35" y="60" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">transactions</text>' +
              /* Arrow */
              '<path d="M65,60 L80,60" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/><path d="M77,56 L83,60 L77,64" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>' +
              /* Competitor result */
              '<rect x="88" y="25" width="60" height="70" rx="6" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.15)" stroke-width="1"/>' +
              '<text x="118" y="45" text-anchor="middle" fill="rgba(239,68,68,0.6)" font-size="5" font-weight="600" font-family="system-ui">COMPETITORS</text>' +
              '<text x="118" y="62" text-anchor="middle" fill="rgba(239,68,68,0.8)" font-size="14" font-weight="700" font-family="system-ui">93</text>' +
              '<text x="118" y="74" text-anchor="middle" fill="rgba(239,68,68,0.4)" font-size="5" font-family="system-ui">approved</text>' +
              '<text x="118" y="86" text-anchor="middle" fill="rgba(239,68,68,0.3)" font-size="5" font-family="system-ui">7 declined</text>' +
              /* VS */
              '<text x="163" y="63" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="7" font-weight="700" font-family="system-ui">vs</text>' +
              /* Paybyrd result */
              '<rect x="172" y="25" width="60" height="70" rx="6" fill="rgba(99,25,240,0.08)" stroke="rgba(99,25,240,0.25)" stroke-width="1"/>' +
              '<text x="202" y="45" text-anchor="middle" fill="rgba(99,25,240,0.7)" font-size="5" font-weight="600" font-family="system-ui">PAYBYRD</text>' +
              '<text x="202" y="62" text-anchor="middle" fill="#6319f0" font-size="14" font-weight="700" font-family="system-ui">98</text>' +
              '<text x="202" y="74" text-anchor="middle" fill="rgba(99,25,240,0.5)" font-size="5" font-family="system-ui">approved</text>' +
              '<text x="202" y="86" text-anchor="middle" fill="rgba(99,25,240,0.3)" font-size="5" font-family="system-ui">+5 recovered</text>' +
            '</svg>' +
          '</div>' +
          '<h3>Smart Payment Routing</h3>' +
          '<p>Multi-acquirer routing retries declined transactions at a different or local acquirer. 192+ currencies. 4\u20137% higher auth rates. DCC revenue share up to 80%.</p>' +
        '</div>' +

        /* Card 4 — POS + PMS Integration: animated check-in flow */
        '<div class="pbrd-hosp-feat-card pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-feat-card-visual">' +
            '<svg viewBox="0 0 240 120" fill="none">' +
              /* Guest card → POS → PMS flow */
              '<rect x="8" y="35" width="48" height="50" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>' +
              '<text x="32" y="55" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="5" font-weight="600" font-family="system-ui">GUEST</text>' +
              '<text x="32" y="65" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">Card</text>' +
              '<path d="M56,60 Q72,60 72,60" stroke="rgba(99,25,240,0.4)" stroke-width="1.5" stroke-dasharray="0 30"><animate attributeName="stroke-dasharray" values="0 30;30 0" dur="0.8s" begin="0.5s" fill="freeze"/></path>' +
              /* POS terminal */
              '<rect x="76" y="30" width="48" height="60" rx="8" fill="rgba(99,25,240,0.1)" stroke="#6319f0" stroke-width="1.5"/>' +
              '<text x="100" y="52" text-anchor="middle" fill="#6319f0" font-size="6" font-weight="700" font-family="system-ui">A920</text>' +
              '<text x="100" y="63" text-anchor="middle" fill="rgba(99,25,240,0.5)" font-size="5" font-family="system-ui">Terminal</text>' +
              '<circle cx="100" cy="78" r="4" fill="none" stroke="#22c55e" stroke-width="1.5" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.2s" fill="freeze"/></circle>' +
              '<path d="M97,78 L99,80 L103,76" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.2s" fill="freeze"/></path>' +
              /* Arrow to vault */
              '<path d="M124,50 Q140,50 140,50" stroke="rgba(99,25,240,0.4)" stroke-width="1.5" stroke-dasharray="0 20"><animate attributeName="stroke-dasharray" values="0 20;20 0" dur="0.6s" begin="1.5s" fill="freeze"/></path>' +
              /* Card vault */
              '<rect x="144" y="30" width="44" height="30" rx="6" fill="rgba(99,25,240,0.06)" stroke="rgba(99,25,240,0.2)" stroke-width="1" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.8s" fill="freeze"/></rect>' +
              '<text x="166" y="47" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="5" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.8s" fill="freeze"/>VAULT</text>' +
              /* Arrow to PMS */
              '<path d="M124,70 Q140,70 140,70" stroke="rgba(99,25,240,0.4)" stroke-width="1.5" stroke-dasharray="0 20"><animate attributeName="stroke-dasharray" values="0 20;20 0" dur="0.6s" begin="1.5s" fill="freeze"/></path>' +
              /* PMS */
              '<rect x="144" y="62" width="44" height="30" rx="6" fill="rgba(99,25,240,0.06)" stroke="rgba(99,25,240,0.2)" stroke-width="1" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="2s" fill="freeze"/></rect>' +
              '<text x="166" y="80" text-anchor="middle" fill="rgba(99,25,240,0.6)" font-size="5" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="2s" fill="freeze"/>PMS</text>' +
              /* Auto-post label */
              '<text x="210" y="55" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.3s" fill="freeze"/>Card secured</text>' +
              '<text x="210" y="82" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.5s" fill="freeze"/>Folio updated</text>' +
            '</svg>' +
          '</div>' +
          '<h3>POS + PMS Integration</h3>' +
          '<p>Guest taps card at check-in \u2192 token stored in vault \u2192 folio auto-created in Opera, Mews, Protel, or Newhotel. Zero manual entry.</p>' +
        '</div>' +

      '</div>' +

      /* Benchmark section — framed as losses with each competitor */
      '<div class="pbrd-hosp-bench pbrd-hosp-reveal" id="data">' +
        '<div class="pbrd-hosp-bench-label">REVENUE LEFT ON THE TABLE \u00b7 PER \u20AC100M ANNUAL VOLUME</div>' +
        '<div class="pbrd-hosp-bench-sub-label">Lower approval rates mean lost bookings. Here\u2019s what each competitor costs you compared to Paybyrd:</div>' +
        '<div class="pbrd-hosp-bench-row">' +
          '<span class="pbrd-hosp-bench-name">Staying with Nuvei</span>' +
          '<div class="pbrd-hosp-bench-bar-wrap"><div class="pbrd-hosp-bench-bar--them" data-w="85"><span class="pbrd-hosp-bench-bar-label">\u2212\u20AC4.92M lost</span></div></div>' +
          '<span class="pbrd-hosp-bench-uplift">+4.92% with Paybyrd</span>' +
        '</div>' +
        '<div class="pbrd-hosp-bench-row">' +
          '<span class="pbrd-hosp-bench-name">Staying with Checkout.com</span>' +
          '<div class="pbrd-hosp-bench-bar-wrap"><div class="pbrd-hosp-bench-bar--them" data-w="80"><span class="pbrd-hosp-bench-bar-label">\u2212\u20AC4.86M lost</span></div></div>' +
          '<span class="pbrd-hosp-bench-uplift">+4.86% with Paybyrd</span>' +
        '</div>' +
        '<div class="pbrd-hosp-bench-row">' +
          '<span class="pbrd-hosp-bench-name">Staying with Elavon</span>' +
          '<div class="pbrd-hosp-bench-bar-wrap"><div class="pbrd-hosp-bench-bar--them" data-w="50"><span class="pbrd-hosp-bench-bar-label">\u2212\u20AC3.16M lost</span></div></div>' +
          '<span class="pbrd-hosp-bench-uplift">+3.16% with Paybyrd</span>' +
        '</div>' +
        '<div class="pbrd-hosp-bench-row">' +
          '<span class="pbrd-hosp-bench-name">Staying with Adyen</span>' +
          '<div class="pbrd-hosp-bench-bar-wrap"><div class="pbrd-hosp-bench-bar--them" data-w="25"><span class="pbrd-hosp-bench-bar-label">\u2212\u20AC1.72M lost</span></div></div>' +
          '<span class="pbrd-hosp-bench-uplift">+1.72% with Paybyrd</span>' +
        '</div>' +
      '</div>';

    section.appendChild(showcase);

    /* Animate benchmark bars on scroll */
    var bench = showcase.querySelector(".pbrd-hosp-bench");
    if ("IntersectionObserver" in window && bench) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          section.querySelectorAll(".pbrd-hosp-bench-bar--them, .pbrd-hosp-bench-bar--us").forEach(function(bar) {
            var w = bar.getAttribute("data-w");
            setTimeout(function() { bar.style.width = w + "%"; }, 400);
          });
          this.disconnect();
        }
      }, { threshold: 0.2 }).observe(bench);
    }

    observeReveal(".pbrd-hosp-reveal", 120, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 4. CTA (Stack Section)                      */
  /* ═══════════════════════════════════════════ */

  function enhanceCTA() {
    var section = findSectionByHeading("built to work with your hospitality");
    if (!section) return;

    section.style.setProperty("padding", "40px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-hosp-stack-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-hosp-stack-wrap";

    /* SVG icon helpers */
    var iconDatabase = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pbrd-hosp-stack-card-icon"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>';
    var iconChart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pbrd-hosp-stack-card-icon"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>';
    var iconGlobe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pbrd-hosp-stack-card-icon"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    var iconServer = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pbrd-hosp-stack-card-icon"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>';

    wrap.innerHTML =
      '<div class="pbrd-hosp-stack-header">' +
        '<div class="pbrd-hosp-section-label pbrd-hosp-reveal">INTEGRATION SPEED</div>' +
        '<h2 class="pbrd-hosp-stack-h2 pbrd-hosp-reveal">Other platforms take months.<br>We take days.</h2>' +
        '<p class="pbrd-hosp-stack-sub pbrd-hosp-reveal">Full PMS, ERP, and booking engine integration. New properties onboarded in days, not months.</p>' +
      '</div>' +

      '<div class="pbrd-hosp-stack-timeline pbrd-hosp-reveal">' +
        '<div class="pbrd-hosp-stack-tl-row">' +
          '<span class="pbrd-hosp-stack-tl-label">PROPERTY ONBOARDING</span>' +
          '<div class="pbrd-hosp-stack-tl-bars">' +
            '<div class="pbrd-hosp-stack-tl-bar pbrd-hosp-stack-tl--them" style="width:75%"><span>Competitors: 4\u20138 weeks</span></div>' +
            '<div class="pbrd-hosp-stack-tl-bar pbrd-hosp-stack-tl--us" data-w="10"><span>Paybyrd: Days</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-hosp-stack-tl-row">' +
          '<span class="pbrd-hosp-stack-tl-label">PMS INTEGRATION</span>' +
          '<div class="pbrd-hosp-stack-tl-bars">' +
            '<div class="pbrd-hosp-stack-tl-bar pbrd-hosp-stack-tl--them" style="width:60%"><span>Competitors: 6\u201312 weeks</span></div>' +
            '<div class="pbrd-hosp-stack-tl-bar pbrd-hosp-stack-tl--us" data-w="12"><span>Paybyrd: Pre-built</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-hosp-stack-tl-row">' +
          '<span class="pbrd-hosp-stack-tl-label">NEW PAYMENT METHOD</span>' +
          '<div class="pbrd-hosp-stack-tl-bars">' +
            '<div class="pbrd-hosp-stack-tl-bar pbrd-hosp-stack-tl--them" style="width:55%"><span>Competitors: 4\u20138 weeks</span></div>' +
            '<div class="pbrd-hosp-stack-tl-bar pbrd-hosp-stack-tl--us" data-w="8"><span>Paybyrd: 48h</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-hosp-stack-tl-row">' +
          '<span class="pbrd-hosp-stack-tl-label">MULTI-PROPERTY ROLLOUT</span>' +
          '<div class="pbrd-hosp-stack-tl-bars">' +
            '<div class="pbrd-hosp-stack-tl-bar pbrd-hosp-stack-tl--them" style="width:85%"><span>Competitors: 3\u20136 months</span></div>' +
            '<div class="pbrd-hosp-stack-tl-bar pbrd-hosp-stack-tl--us" data-w="15"><span>Paybyrd: Weeks</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="pbrd-hosp-stack-grid">' +
        '<div class="pbrd-hosp-stack-card pbrd-hosp-reveal">' +
          iconDatabase +
          '<h4>PMS Systems</h4>' +
          '<p>Opera, Mews, Protel, Newhotel. Pre-built connectors, room charge auto-posting.</p>' +
        '</div>' +
        '<div class="pbrd-hosp-stack-card pbrd-hosp-reveal">' +
          iconChart +
          '<h4>ERP & Finance</h4>' +
          '<p>SAP, Oracle, Dynamics. Direct API. Gross settlement for easy reconciliation.</p>' +
        '</div>' +
        '<div class="pbrd-hosp-stack-card pbrd-hosp-reveal">' +
          iconGlobe +
          '<h4>Booking Engines</h4>' +
          '<p>Direct booking, OTA reconciliation, channel manager integration. Virtual card auto-processing.</p>' +
        '</div>' +
        '<div class="pbrd-hosp-stack-card pbrd-hosp-reveal">' +
          iconServer +
          '<h4>Self-Hosted Option</h4>' +
          '<p>Run on your own infrastructure. Full PCI scope control. Zero vendor lock-in.</p>' +
        '</div>' +
      '</div>';

    section.appendChild(wrap);

    /* Animate Paybyrd bars on scroll */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          wrap.querySelectorAll(".pbrd-hosp-stack-tl--us").forEach(function(bar) {
            var w = bar.getAttribute("data-w");
            setTimeout(function() { bar.style.width = w + "%"; }, 400);
          });
          this.disconnect();
        }
      }, { threshold: 0.2 }).observe(wrap);
    }
    observeReveal(".pbrd-hosp-reveal", 120, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 5. GUEST JOURNEY                            */
  /* ═══════════════════════════════════════════ */

  function enhanceGuestJourney() {
    var section = findSectionByHeading("designed for the full guest");
    if (!section) return;

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    section.style.setProperty("overflow", "hidden", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-hosp-gj-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-hosp-gj-wrap";

    /* ── Chat scenarios for AI Agent ── */
    var chatScenarios = [
      {
        channel: "WhatsApp", channelIcon: "W",
        user: "Can I add a late checkout to my stay at Cascais?",
        lookup: "Checking your reservation\u2026",
        booking: { pnr: "HTL-X7K29", hotel: "Cascais Resort", room: "412 Suite", checkout: "Apr 20", guests: "2 Adults" },
        offer: "Late checkout until 4PM is available for \u20AC45. Shall I add it to your folio?",
        action: "Confirm Late Checkout",
        success: "Done! Late checkout confirmed until 4PM. Updated confirmation sent to your WhatsApp."
      },
      {
        channel: "Chat Widget", channelIcon: "C",
        user: "I want a refund for my cancelled booking HTL-M3R81",
        lookup: "Checking booking status\u2026",
        booking: { pnr: "HTL-M3R81", hotel: "Porto City Hotel", room: "207 Standard", checkout: "Apr 12-15", guests: "1 Adult" },
        offer: "Booking was cancelled within policy. Full refund of \u20AC480.00 is eligible.",
        action: "Process Refund",
        success: "Refund of \u20AC480.00 initiated. 3\u20135 business days. ARN confirmation sent via email."
      },
      {
        channel: "WhatsApp", channelIcon: "W",
        user: "Can I upgrade my room at the Algarve property?",
        lookup: "Searching available upgrades\u2026",
        booking: { pnr: "HTL-R9F44", hotel: "Algarve Beach", room: "Standard", checkout: "Apr 21-25", guests: "2 Adults" },
        offer: "Ocean View Suite available for \u20AC120/night extra. Includes breakfast and pool access. Pay now via link?",
        action: "Send Pay-by-Link",
        success: "Payment link sent! Once paid, your upgrade is instant. Enjoy the ocean view!"
      }
    ];

    /* ── Journey touchpoints data ── */
    var touchpoints = [
      { icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M3 9h18M9 3v18" stroke="currentColor" stroke-width="1.5"/></svg>',
        title: "Online Booking", sub: "Direct & OTA", stat: "38%", statLabel: "of revenue",
        txns: ["Suite \u20AC420", "Standard \u20AC195", "Package \u20AC680"] },
      { icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 10h20" stroke="currentColor" stroke-width="1.5"/><path d="M6 14h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
        title: "Front Desk", sub: "Check-in POS", stat: "100%", statLabel: "pre-auth rate",
        txns: ["Pre-auth \u20AC500", "Deposit \u20AC200", "Upgrade \u20AC120"] },
      { icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" stroke-width="1.5"/></svg>',
        title: "In-Stay", sub: "Spa \u00b7 Restaurant \u00b7 Bar", stat: "73%", statLabel: "revenue capture",
        txns: ["Spa \u20AC95", "Dinner \u20AC187", "Minibar \u20AC32"] },
      { icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.5"/></svg>',
        title: "Check-out", sub: "Unified billing", stat: "< 30s", statLabel: "checkout time",
        txns: ["Folio \u20AC1,247", "Express \u20AC890", "Group \u20AC4,320"] }
    ];

    wrap.innerHTML =
      '<div class="pbrd-hosp-gj-header pbrd-hosp-reveal">' +
        '<div class="pbrd-hosp-section-label">AI-POWERED GUEST JOURNEY</div>' +
        '<h2 class="pbrd-hosp-gj-h2">Every touchpoint is a revenue opportunity.<br>Our AI captures them all.</h2>' +
        '<p class="pbrd-hosp-gj-sub">From booking to checkout \u2014 an autonomous AI agent handles billing questions, refunds, room charges, and upsells across WhatsApp and your website chat. No human needed.</p>' +
      '</div>' +

      /* ── Two-card grid ── */
      '<div class="pbrd-hosp-gj-grid">' +

        /* Card 1: AI Chat Agent */
        '<div class="pbrd-hosp-gj-card pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-gj-visual">' +
            '<div class="pbrd-hosp-gj-chat" id="pbrd-hosp-chat">' +
              '<div class="pbrd-hosp-gj-chat-head">' +
                '<div class="pbrd-hosp-gj-chat-avatar">P</div>' +
                '<div>' +
                  '<div class="pbrd-hosp-gj-chat-name">Paybyrd AI Agent</div>' +
                  '<div class="pbrd-hosp-gj-chat-status"><span class="pbrd-hosp-gj-dot-live"></span><span id="pbrd-hosp-chat-channel">WhatsApp</span></div>' +
                '</div>' +
                '<div class="pbrd-hosp-gj-chat-badge" id="pbrd-hosp-chat-badge">AI</div>' +
              '</div>' +
              '<div class="pbrd-hosp-gj-chat-body" id="pbrd-hosp-chat-body">' +
                '<div class="pbrd-hosp-gj-msg bot" id="pbrd-hosp-cm0"><span>Hi! I\u2019m your hotel assistant. How can I help?</span></div>' +
                '<div class="pbrd-hosp-gj-msg user" id="pbrd-hosp-cm1"><span id="pbrd-hosp-cm1t"></span></div>' +
                '<div class="pbrd-hosp-gj-typing" id="pbrd-hosp-typing"><span></span><span></span><span></span></div>' +
                '<div class="pbrd-hosp-gj-msg bot" id="pbrd-hosp-cm2"><span id="pbrd-hosp-cm2t"></span></div>' +
                '<div class="pbrd-hosp-gj-msg bot" id="pbrd-hosp-cm3">' +
                  '<div class="pbrd-hosp-gj-booking">' +
                    '<div class="pbrd-hosp-gj-booking-row"><span>PNR</span><span id="pbrd-hosp-bpnr"></span></div>' +
                    '<div class="pbrd-hosp-gj-booking-row"><span>Hotel</span><span id="pbrd-hosp-bhotel"></span></div>' +
                    '<div class="pbrd-hosp-gj-booking-row"><span>Room</span><span id="pbrd-hosp-broom"></span></div>' +
                    '<div class="pbrd-hosp-gj-booking-row"><span>Check-out</span><span id="pbrd-hosp-bcheckout"></span></div>' +
                    '<div class="pbrd-hosp-gj-booking-row"><span>Guests</span><span id="pbrd-hosp-bguests"></span></div>' +
                  '</div>' +
                '</div>' +
                '<div class="pbrd-hosp-gj-msg bot" id="pbrd-hosp-cm4"><span id="pbrd-hosp-cm4t"></span></div>' +
                '<div class="pbrd-hosp-gj-msg bot" id="pbrd-hosp-cm5"><div class="pbrd-hosp-gj-action" id="pbrd-hosp-cact"></div></div>' +
                '<div class="pbrd-hosp-gj-msg bot" id="pbrd-hosp-cm6"><span class="pbrd-hosp-gj-success-icon"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3.5 3.5L13 5" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></span><span id="pbrd-hosp-cm6t"></span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-hosp-gj-body">' +
            '<h3>Autonomous AI agent across every channel</h3>' +
            '<p>Your AI handles the full guest lifecycle \u2014 refunds, upsells, room changes, and pay-by-links \u2014 via WhatsApp and website chat. 24/7, 30+ languages.</p>' +
            '<ul class="pbrd-hosp-gj-bullets">' +
              '<li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3.5 3.5L13 5" stroke="#6319f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>Processes refunds and cancellations in real time</li>' +
              '<li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3.5 3.5L13 5" stroke="#6319f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>Sends pay-by-links for upgrades and extras</li>' +
              '<li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3.5 3.5L13 5" stroke="#6319f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>Handles room changes and late checkouts autonomously</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

        /* Card 2: Journey Touchpoints with live data */
        '<div class="pbrd-hosp-gj-card pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-gj-visual">' +
            '<div class="pbrd-hosp-gj-journey" id="pbrd-hosp-journey">' +
              '<div class="pbrd-hosp-gj-j-flow">' +
                touchpoints.map(function(tp, idx) {
                  return '<div class="pbrd-hosp-gj-j-node" id="pbrd-hosp-jn' + idx + '">' +
                    '<div class="pbrd-hosp-gj-j-icon">' + tp.icon + '</div>' +
                    '<div class="pbrd-hosp-gj-j-title">' + tp.title + '</div>' +
                    '<div class="pbrd-hosp-gj-j-sub">' + tp.sub + '</div>' +
                    '<div class="pbrd-hosp-gj-j-stat"><span class="pbrd-hosp-gj-j-stat-v">' + tp.stat + '</span><span class="pbrd-hosp-gj-j-stat-l">' + tp.statLabel + '</span></div>' +
                    '<div class="pbrd-hosp-gj-j-txns" id="pbrd-hosp-jt' + idx + '">' +
                      tp.txns.map(function(t) { return '<div class="pbrd-hosp-gj-j-txn">' + t + '</div>'; }).join("") +
                    '</div>' +
                  '</div>' +
                  (idx < 3 ? '<div class="pbrd-hosp-gj-j-connector"><svg viewBox="0 0 40 24" width="40" height="24"><path d="M0 12h32" stroke="rgba(99,25,240,0.3)" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M28 6l8 6-8 6" fill="none" stroke="rgba(99,25,240,0.4)" stroke-width="1.5"/></svg></div>' : '');
                }).join("") +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-hosp-gj-body">' +
            '<h3>Every channel. One unified platform.</h3>' +
            '<p>Online bookings, front desk, in-stay charges, and checkout \u2014 every transaction flows through a single payment engine with real-time reconciliation.</p>' +
            '<ul class="pbrd-hosp-gj-bullets">' +
              '<li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3.5 3.5L13 5" stroke="#6319f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>Unified view across all sales channels</li>' +
              '<li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3.5 3.5L13 5" stroke="#6319f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>PMS integration for seamless folio management</li>' +
              '<li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3.5 3.5L13 5" stroke="#6319f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>POS captures spa, restaurant & bar revenue</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

      '</div>';

    section.appendChild(wrap);

    /* ═══ Chat animation ═══ */
    var chatIdx = 0;
    var chatRunning = false;
    function runChat() {
      if (chatRunning) return;
      chatRunning = true;
      var sc = chatScenarios[chatIdx % chatScenarios.length];
      chatIdx++;

      /* References */
      var body = document.getElementById("pbrd-hosp-chat-body");
      var channel = document.getElementById("pbrd-hosp-chat-channel");
      var cm0 = document.getElementById("pbrd-hosp-cm0");
      var cm1 = document.getElementById("pbrd-hosp-cm1");
      var cm1t = document.getElementById("pbrd-hosp-cm1t");
      var typing = document.getElementById("pbrd-hosp-typing");
      var cm2 = document.getElementById("pbrd-hosp-cm2");
      var cm2t = document.getElementById("pbrd-hosp-cm2t");
      var cm3 = document.getElementById("pbrd-hosp-cm3");
      var cm4 = document.getElementById("pbrd-hosp-cm4");
      var cm4t = document.getElementById("pbrd-hosp-cm4t");
      var cm5 = document.getElementById("pbrd-hosp-cm5");
      var cact = document.getElementById("pbrd-hosp-cact");
      var cm6 = document.getElementById("pbrd-hosp-cm6");
      var cm6t = document.getElementById("pbrd-hosp-cm6t");

      /* Reset all */
      [cm0, cm1, cm2, cm3, cm4, cm5, cm6].forEach(function(el) { el.style.opacity = "0"; });
      typing.style.display = "none";
      if (body) body.scrollTop = 0;

      channel.textContent = sc.channel;

      /* Step flow */
      setTimeout(function() { cm0.style.opacity = "1"; }, 400);
      setTimeout(function() {
        cm1t.textContent = sc.user;
        cm1.style.opacity = "1";
        if (body) body.scrollTop = body.scrollHeight;
      }, 1200);
      setTimeout(function() {
        typing.style.display = "flex";
        if (body) body.scrollTop = body.scrollHeight;
      }, 2200);
      setTimeout(function() {
        typing.style.display = "none";
        cm2t.textContent = sc.lookup;
        cm2.style.opacity = "1";
        if (body) body.scrollTop = body.scrollHeight;
      }, 3600);
      setTimeout(function() {
        document.getElementById("pbrd-hosp-bpnr").textContent = sc.booking.pnr;
        document.getElementById("pbrd-hosp-bhotel").textContent = sc.booking.hotel;
        document.getElementById("pbrd-hosp-broom").textContent = sc.booking.room;
        document.getElementById("pbrd-hosp-bcheckout").textContent = sc.booking.checkout;
        document.getElementById("pbrd-hosp-bguests").textContent = sc.booking.guests;
        cm3.style.opacity = "1";
        if (body) body.scrollTop = body.scrollHeight;
      }, 4600);
      setTimeout(function() {
        cm4t.textContent = sc.offer;
        cm4.style.opacity = "1";
        if (body) body.scrollTop = body.scrollHeight;
      }, 6000);
      setTimeout(function() {
        cact.textContent = sc.action;
        cact.className = "pbrd-hosp-gj-action";
        cm5.style.opacity = "1";
        if (body) body.scrollTop = body.scrollHeight;
      }, 7200);
      setTimeout(function() {
        cact.classList.add("pbrd-hosp-gj-action--done");
      }, 8600);
      setTimeout(function() {
        cm6t.textContent = sc.success;
        cm6.style.opacity = "1";
        if (body) body.scrollTop = body.scrollHeight;
      }, 9400);
      setTimeout(function() {
        chatRunning = false;
        runChat();
      }, 13000);
    }

    /* ═══ Journey node pulse animation ═══ */
    function animateJourney() {
      var nodes = document.querySelectorAll(".pbrd-hosp-gj-j-node");
      var txnEls = [];
      for (var i = 0; i < 4; i++) txnEls.push(document.getElementById("pbrd-hosp-jt" + i));

      /* Cycle active node */
      var activeIdx = 0;
      function cycleNode() {
        nodes.forEach(function(n, i) {
          if (i === activeIdx) {
            n.classList.add("pbrd-hosp-gj-j-node--active");
          } else {
            n.classList.remove("pbrd-hosp-gj-j-node--active");
          }
        });

        /* Animate txns in active node */
        var txnContainer = txnEls[activeIdx];
        if (txnContainer) {
          var items = txnContainer.querySelectorAll(".pbrd-hosp-gj-j-txn");
          items.forEach(function(item, idx) {
            item.style.opacity = "0";
            item.style.transform = "translateY(6px)";
            setTimeout(function() {
              item.style.transition = "opacity 0.4s, transform 0.4s";
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 300 + idx * 250);
          });
        }

        activeIdx = (activeIdx + 1) % nodes.length;
        setTimeout(cycleNode, 3000);
      }
      cycleNode();
    }

    /* ═══ Trigger on scroll ═══ */
    var gjObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (en.isIntersecting) {
          runChat();
          animateJourney();
          gjObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    gjObserver.observe(wrap);

    observeReveal(".pbrd-hosp-gj-wrap .pbrd-hosp-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 6. QUIVI POS                                */
  /* ═══════════════════════════════════════════ */

  function enhanceQuiviPOS() {
    var section = findSectionByHeading("hospitality-ready pos");
    if (!section) return;

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-hosp-quivi-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-hosp-quivi-wrap";

    /* Header */
    var header = document.createElement("div");
    header.className = "pbrd-hosp-quivi-header";
    header.innerHTML =
      '<span class="pbrd-hosp-section-label">TABLE ORDERING &amp; BILL SPLITTING</span>' +
      '<h2 class="pbrd-hosp-quivi-h2">Quivi turns every table into<br>a frictionless payment point.</h2>' +
      '<p class="pbrd-hosp-quivi-sub">Guests order from their phone, split bills instantly, and pay without waiting. Staff freed up to focus on hospitality, not transactions.</p>';
    wrap.appendChild(header);

    /* Two-column layout */
    var layout = document.createElement("div");
    layout.className = "pbrd-hosp-quivi-layout";

    /* Left: feature bullets */
    var checkSvg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="rgba(99,25,240,0.15)"/><path d="M5 8l2 2 4-4" stroke="#6319f0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var features = [
      "QR code table ordering \u2014 guests browse and order from their phone",
      "Bill splitting by item, person, or custom amounts",
      "Pay-at-table \u2014 no waiting for the check",
      "Kitchen & bar integration \u2014 orders route directly",
      "Multi-language \u2014 automatic detection from guest\u2019s phone",
      "Terminals reduce costs 6\u201310%, increase acceptance 4\u20136%"
    ];
    var ul = document.createElement("ul");
    ul.className = "pbrd-hosp-quivi-features";
    features.forEach(function(f) {
      var li = document.createElement("li");
      li.innerHTML = checkSvg + '<span>' + f + '</span>';
      ul.appendChild(li);
    });
    layout.appendChild(ul);

    /* Right: animated phone mockup */
    var menuItems = [
      { name: "Grilled Sea Bass", price: "\u20AC24.50" },
      { name: "Vinho Verde (bottle)", price: "\u20AC18.00" },
      { name: "Cr\u00e8me Br\u00fbl\u00e9e", price: "\u20AC8.50" }
    ];
    var phone = document.createElement("div");
    phone.className = "pbrd-hosp-quivi-phone";
    phone.innerHTML = '<div class="pbrd-hosp-quivi-phone-header">Table 7 \u00b7 Algarve Beach Restaurant</div>';
    menuItems.forEach(function(item) {
      var row = document.createElement("div");
      row.className = "pbrd-hosp-quivi-menu-item";
      row.innerHTML = '<span class="pbrd-hosp-quivi-menu-name">' + item.name + '</span><span class="pbrd-hosp-quivi-menu-price">' + item.price + '</span>';
      phone.appendChild(row);
    });
    var total = document.createElement("div");
    total.className = "pbrd-hosp-quivi-total";
    total.innerHTML = '<span>Total</span><span>\u20AC51.00</span>';
    phone.appendChild(total);
    var btn = document.createElement("div");
    btn.className = "pbrd-hosp-quivi-pay-btn";
    btn.textContent = "Split Bill";
    phone.appendChild(btn);

    var phoneWrap = document.createElement("div");
    phoneWrap.style.cssText = "display:flex;justify-content:center;";
    phoneWrap.appendChild(phone);
    layout.appendChild(phoneWrap);
    wrap.appendChild(layout);

    /* Phone animation via IntersectionObserver */
    var phoneAnimated = false;
    var phoneObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (en.isIntersecting && !phoneAnimated) {
          phoneAnimated = true;
          var items = phone.querySelectorAll(".pbrd-hosp-quivi-menu-item");
          items.forEach(function(it, idx) {
            setTimeout(function() { it.classList.add("pbrd-hosp-quivi-menu-item--show"); }, idx * 600);
          });
          setTimeout(function() { total.classList.add("pbrd-hosp-quivi-total--show"); }, items.length * 600 + 300);
          setTimeout(function() { btn.classList.add("pbrd-hosp-quivi-pay-btn--show"); }, items.length * 600 + 600);
          setTimeout(function() {
            btn.textContent = "Payment Successful \u2713";
            btn.classList.add("pbrd-hosp-quivi-pay-btn--done");
          }, 3000);
          phoneObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    phoneObserver.observe(phone);

    /* Terminal showcase strip */
    var terminals = [
      { img: "https://djangato.github.io/Webflow-Paybyrd/assets/product/A77.png", name: "A77", desc: "Portable \u2014 tableside & pool" },
      { img: "https://djangato.github.io/Webflow-Paybyrd/assets/product/A920_mockup.png", name: "A920", desc: "Countertop \u2014 front desk" },
      { img: "https://djangato.github.io/Webflow-Paybyrd/assets/product/IM30.png", name: "IM30", desc: "Unattended \u2014 self-service kiosk" }
    ];
    var termStrip = document.createElement("div");
    termStrip.className = "pbrd-hosp-terminals";
    terminals.forEach(function(t) {
      var card = document.createElement("div");
      card.className = "pbrd-hosp-terminal";
      card.innerHTML =
        '<img src="' + t.img + '" alt="' + t.name + '">' +
        '<div class="pbrd-hosp-terminal-name">' + t.name + '</div>' +
        '<div class="pbrd-hosp-terminal-desc">' + t.desc + '</div>';
      termStrip.appendChild(card);
    });
    wrap.appendChild(termStrip);

    section.appendChild(wrap);
    observeReveal(".pbrd-hosp-quivi-header, .pbrd-hosp-quivi-layout, .pbrd-hosp-terminals", 120, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 7. AI                                       */
  /* ═══════════════════════════════════════════ */

  function enhanceAI() {
    var section = findSectionByHeading("let ai support");
    if (!section) return;

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-hosp-ai-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-hosp-ai-wrap";

    /* Header */
    var header = document.createElement("div");
    header.className = "pbrd-hosp-ai-header";
    header.innerHTML =
      '<span class="pbrd-hosp-section-label">AI FOR HOSPITALITY</span>' +
      '<h2 class="pbrd-hosp-ai-h2">Your AI concierge never sleeps.<br>Neither does your fraud shield.</h2>' +
      '<p class="pbrd-hosp-ai-sub">Two AI systems working in parallel \u2014 one delights your guests, the other protects your revenue.</p>';
    wrap.appendChild(header);

    /* Two-card grid */
    var grid = document.createElement("div");
    grid.className = "pbrd-hosp-ai-grid";

    /* Card 1: AI Guest Support */
    var card1 = document.createElement("div");
    card1.className = "pbrd-hosp-ai-card";
    card1.innerHTML =
      '<div class="pbrd-hosp-ai-visual">' +
        '<div class="pbrd-hosp-ai-bubble pbrd-hosp-ai-bubble--1">What time is checkout?</div>' +
        '<div class="pbrd-hosp-ai-bubble pbrd-hosp-ai-bubble--2">Can I add breakfast?</div>' +
        '<div class="pbrd-hosp-ai-bubble pbrd-hosp-ai-bubble--3">73% resolved without staff</div>' +
      '</div>' +
      '<div class="pbrd-hosp-ai-body">' +
        '<h3>24/7 AI Guest Support</h3>' +
        '<p>Handles billing questions, room changes, late checkout requests, refund processing, and upsell suggestions. 30+ languages. AI reservation agent collects pay-by-links to prevent no-show losses.</p>' +
        '<span class="pbrd-hosp-ai-stat">73% of guest inquiries auto-resolved</span>' +
      '</div>';
    grid.appendChild(card1);

    /* Card 2: Fraud Prevention */
    var card2 = document.createElement("div");
    card2.className = "pbrd-hosp-ai-card";
    card2.innerHTML =
      '<div class="pbrd-hosp-ai-visual">' +
        '<div class="pbrd-hosp-ai-shield">' +
          '<svg viewBox="0 0 80 80" fill="none"><path d="M40 8L12 22v20c0 16.6 12 31.4 28 36 16-4.6 28-19.4 28-36V22L40 8z" stroke="#6319f0" stroke-width="2" fill="none"/><path class="pbrd-hosp-ai-shield-check" d="M28 40l8 8 16-16" stroke="#6319f0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></svg>' +
          '<div class="pbrd-hosp-ai-scan"></div>' +
          '<div class="pbrd-hosp-ai-scan" style="animation-delay:0.7s;"></div>' +
          '<div class="pbrd-hosp-ai-scan" style="animation-delay:1.4s;"></div>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-hosp-ai-body">' +
        '<h3>Intelligent Fraud Prevention</h3>' +
        '<p>3DS + AI velocity checks, no-show prediction, shared merchant fraud database, pre-authorization validation, guest pattern recognition. Cards automatically enter Paybyrd vault at check-in.</p>' +
        '<span class="pbrd-hosp-ai-stat">16.8% chargeback reduction</span>' +
      '</div>';
    grid.appendChild(card2);
    wrap.appendChild(grid);

    section.appendChild(wrap);

    /* Animate chat bubbles */
    var bubbleAnimated = false;
    var bubbleObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (en.isIntersecting && !bubbleAnimated) {
          bubbleAnimated = true;
          var bubbles = card1.querySelectorAll(".pbrd-hosp-ai-bubble");
          bubbles.forEach(function(b, idx) {
            setTimeout(function() { b.classList.add("pbrd-hosp-ai-bubble--show"); }, idx * 2000);
          });
          /* Show shield checkmark after scan */
          setTimeout(function() {
            var chk = card2.querySelector(".pbrd-hosp-ai-shield-check");
            if (chk) chk.setAttribute("opacity", "1");
          }, 4000);
          bubbleObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    bubbleObs.observe(grid);

    observeReveal(".pbrd-hosp-ai-header, .pbrd-hosp-ai-card", 120, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 8. TESTIMONIAL                              */
  /* ═══════════════════════════════════════════ */

  function enhanceTestimonial() {
    var heading = findHeading("payments used to slow us down");
    if (!heading) return;
    var section = heading.closest("section") || heading.closest("[class*='section']") || heading.parentElement;
    if (!section) return;

    /* Hide Webflow children */
    Array.prototype.forEach.call(section.children, function(c) {
      c.style.setProperty("display", "none", "important");
    });

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "linear-gradient(135deg, #0a0a0f, #1a1020)", "important");
    section.classList.add("pbrd-hosp-test-section");

    var wrap = document.createElement("div");
    wrap.className = "pbrd-hosp-test-wrap";

    /* Section label */
    var label = document.createElement("span");
    label.className = "pbrd-hosp-section-label";
    label.textContent = "CASE STUDY";
    wrap.appendChild(label);

    /* Big quote */
    var quote = document.createElement("p");
    quote.className = "pbrd-hosp-test-bigquote";
    quote.textContent = "Before Paybyrd, we were juggling multiple systems, dealing with high fraud, chargebacks, and clunky checkout flows. Now, everything\u2019s unified \u2014 from online bookings to front desk to POS \u2014 with a single platform that just works.";
    wrap.appendChild(quote);

    /* Author */
    var author = document.createElement("div");
    author.className = "pbrd-hosp-test-author";
    author.textContent = "Gon\u00e7alo Rebelo de Almeida";
    wrap.appendChild(author);

    var title = document.createElement("div");
    title.className = "pbrd-hosp-test-title";
    title.textContent = "Vila Gal\u00e9 Hotels";
    wrap.appendChild(title);

    /* Results */
    var results = document.createElement("div");
    results.className = "pbrd-hosp-test-results";

    var counters = [
      { val: 40, suffix: "+", label: "Properties Unified", countUp: true },
      { val: 16.8, suffix: "%", label: "Fewer Chargebacks", countUp: true },
      { val: 0, suffix: "", label: "Reconciliation", countUp: false, text: "Real-time" },
      { val: 192, suffix: "+", label: "Currencies Supported", countUp: true }
    ];

    counters.forEach(function(c, i) {
      if (i > 0) {
        var div = document.createElement("div");
        div.className = "pbrd-hosp-test-divider";
        results.appendChild(div);
      }
      var item = document.createElement("div");
      item.className = "pbrd-hosp-test-result";
      var rv = document.createElement("div");
      rv.className = "pbrd-hosp-test-rv";
      if (c.countUp) {
        rv.textContent = "0" + c.suffix;
      } else {
        rv.textContent = c.text;
      }
      rv.setAttribute("data-target", c.val);
      rv.setAttribute("data-suffix", c.suffix);
      rv.setAttribute("data-countup", c.countUp ? "1" : "0");
      if (c.text) rv.setAttribute("data-text", c.text);
      var rl = document.createElement("div");
      rl.className = "pbrd-hosp-test-rl";
      rl.textContent = c.label;
      item.appendChild(rv);
      item.appendChild(rl);
      results.appendChild(item);
    });

    wrap.appendChild(results);

    /* CTA */
    var cta = document.createElement("a");
    cta.href = "/book-demo";
    cta.className = "pbrd-hosp-cta-primary";
    cta.style.setProperty("margin-top", "32px", "important");
    cta.style.setProperty("display", "inline-flex", "important");
    cta.textContent = "Get results like Vila Gal\u00e9 \u2192";
    wrap.appendChild(cta);

    section.appendChild(wrap);

    /* Animate counters on scroll */
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(en) {
          if (en.isIntersecting) {
            results.querySelectorAll(".pbrd-hosp-test-rv").forEach(function(rv) {
              if (rv.getAttribute("data-countup") === "1") {
                var target = parseFloat(rv.getAttribute("data-target"));
                var suffix = rv.getAttribute("data-suffix");
                var isFloat = target % 1 !== 0;
                var dur = 1800, startTime = null;
                function step(ts) {
                  if (!startTime) startTime = ts;
                  var p = Math.min((ts - startTime) / dur, 1);
                  var current = target * (1 - Math.pow(1 - p, 3));
                  rv.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
                  if (p < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
              } else {
                rv.style.opacity = "1";
              }
            });
            obs.unobserve(en.target);
          }
        });
      }, { threshold: 0.2 });
      obs.observe(results);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* 9. FAQ                                      */
  /* ═══════════════════════════════════════════ */

  function enhanceFAQ() {
    var heading = findHeading("frequently asked");
    if (!heading) return;
    var section = heading.closest("section") || heading.closest("[class*='section']") || heading.parentElement;
    if (!section) return;

    /* Hide Webflow children */
    Array.prototype.forEach.call(section.children, function(c) {
      c.style.setProperty("display", "none", "important");
    });

    section.style.setProperty("padding", "60px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");

    var wrap = document.createElement("div");
    wrap.className = "pbrd-hosp-faq-wrap";

    /* Header */
    var header = document.createElement("div");
    header.className = "pbrd-hosp-faq-header";
    var labelEl = document.createElement("span");
    labelEl.className = "pbrd-hosp-section-label";
    labelEl.textContent = "FAQ";
    header.appendChild(labelEl);
    var h2 = document.createElement("h2");
    h2.className = "pbrd-hosp-faq-h2";
    h2.innerHTML = "Everything hotel executives ask<br>before switching to Paybyrd.";
    header.appendChild(h2);
    var sub = document.createElement("p");
    sub.className = "pbrd-hosp-faq-sub";
    sub.textContent = "The hard questions \u2014 answered with real data, not marketing speak.";
    header.appendChild(sub);
    wrap.appendChild(header);

    /* Categories */
    var categories = ["All", "Integration", "Operations", "Security", "Billing", "POS"];
    var dotColors = { Integration: "#6366F1", Operations: "#10B981", Security: "#8B5CF6", Billing: "#F59E0B", POS: "#6319f0" };

    var filters = document.createElement("div");
    filters.className = "pbrd-hosp-faq-filters";
    categories.forEach(function(cat) {
      var btn = document.createElement("button");
      btn.className = "pbrd-hosp-faq-filter" + (cat === "All" ? " pbrd-hosp-faq-filter--active" : "");
      btn.setAttribute("data-cat", cat);
      btn.textContent = cat;
      btn.addEventListener("click", function() {
        filters.querySelectorAll(".pbrd-hosp-faq-filter").forEach(function(b) { b.classList.remove("pbrd-hosp-faq-filter--active"); });
        btn.classList.add("pbrd-hosp-faq-filter--active");
        list.querySelectorAll(".pbrd-hosp-faq-item").forEach(function(item) {
          if (cat === "All" || item.getAttribute("data-cat") === cat) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
      filters.appendChild(btn);
    });
    wrap.appendChild(filters);

    /* FAQ items */
    var faqs = [
      { cat: "Integration", q: "How fast can we roll out Paybyrd across our hotel properties?", a: "2\u20134 weeks for full integration. Pre-built PMS connectors for Opera, Mews, Protel, and Newhotel. Phased rollout supported \u2014 start with one property, scale to your entire portfolio." },
      { cat: "Integration", q: "Can we consolidate payments from front desk, restaurant, spa, and online booking?", a: "Yes. Unified dashboard with real-time reconciliation across all outlets. Every transaction \u2014 whether POS, online, or pay-by-link \u2014 flows through one platform with consistent reporting." },
      { cat: "Operations", q: "How does the unified guest folio work?", a: "All charges (room, F&B, spa, minibar) consolidated into a single bill. Auto-posted from POS to PMS. Express checkout supported. No more end-of-stay billing surprises or manual reconciliation." },
      { cat: "Operations", q: "Do you support multi-property management?", a: "Yes. Centralized dashboard with property-level filtering, group-level reporting, per-outlet breakdowns, and role-based access per property. AI generates ad-hoc reports per channel, outlet, or shift." },
      { cat: "Billing", q: "How do you handle no-show chargebacks?", a: "Pre-authorization tokenization at booking, automated retry on saved cards, 3DS liability shift, and a shared cross-merchant fraud database. Our AI reservation agent also collects pay-by-links to prevent no-show losses." },
      { cat: "Billing", q: "Can guests pay through their phone?", a: "Yes \u2014 via Quivi (QR ordering + payment at table), pay-by-link via WhatsApp/SMS/email, and full mobile wallet support (Apple Pay, Google Pay, MB WAY). No app download required." },
      { cat: "POS", q: "What POS terminals do you offer for hotels?", a: "A77 (portable for tableside and pool), A920 (front desk countertop), IM30 (unattended/self-service kiosks). All Android-based with SoftPOS capability. Over-the-air updates, latest-gen contactless." },
      { cat: "POS", q: "Does Quivi integrate with our kitchen/bar systems?", a: "Yes. Orders route directly to kitchen/bar displays. Real-time status updates. Bill splitting by item, person, or custom amounts. Multi-language \u2014 automatic detection from the guest\u2019s phone." },
      { cat: "Security", q: "Are you PCI and GDPR compliant?", a: "PCI DSS Level 1 certified. Full GDPR compliance. TLS 1.3+ encryption, tokenization, zero-knowledge architecture. At check-in, all guest cards automatically enter the Paybyrd card vault. You focus on hospitality, we handle the regulations." },
      { cat: "Security", q: "What\u2019s your uptime guarantee?", a: "99.999% uptime through multi-instance, multi-acquiring infrastructure. If one acquirer goes down, transactions automatically route to alternates. For hotels where 1 hour of downtime can mean thousands in lost revenue, this redundancy is critical." }
    ];

    var list = document.createElement("div");
    list.className = "pbrd-hosp-faq-list";

    faqs.forEach(function(faq, idx) {
      var item = document.createElement("div");
      item.className = "pbrd-hosp-faq-item";
      item.setAttribute("data-cat", faq.cat);

      var qBtn = document.createElement("button");
      qBtn.className = "pbrd-hosp-faq-q";

      var qLeft = document.createElement("span");
      qLeft.className = "pbrd-hosp-faq-q-left";

      var dot = document.createElement("span");
      dot.className = "pbrd-hosp-faq-cat-dot";
      dot.style.background = dotColors[faq.cat] || "#fff";
      qLeft.appendChild(dot);
      qLeft.appendChild(document.createTextNode(faq.q));

      var chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      chevron.setAttribute("class", "pbrd-hosp-faq-chevron");
      chevron.setAttribute("viewBox", "0 0 24 24");
      chevron.setAttribute("fill", "none");
      chevron.setAttribute("stroke", "currentColor");
      chevron.setAttribute("stroke-width", "2");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M6 9l6 6 6-6");
      chevron.appendChild(path);

      qBtn.appendChild(qLeft);
      qBtn.appendChild(chevron);

      var aDiv = document.createElement("div");
      aDiv.className = "pbrd-hosp-faq-a";
      var aP = document.createElement("p");
      aP.textContent = faq.a;
      aDiv.appendChild(aP);

      qBtn.addEventListener("click", function() {
        var isOpen = item.classList.contains("pbrd-hosp-faq-item--open");
        list.querySelectorAll(".pbrd-hosp-faq-item--open").forEach(function(o) { o.classList.remove("pbrd-hosp-faq-item--open"); });
        if (!isOpen) item.classList.add("pbrd-hosp-faq-item--open");
      });

      item.appendChild(qBtn);
      item.appendChild(aDiv);
      list.appendChild(item);

      /* Auto-open first item */
      if (idx === 0) item.classList.add("pbrd-hosp-faq-item--open");
    });

    wrap.appendChild(list);
    section.appendChild(wrap);
  }

  /* ═══════════════════════════════════════════ */
  /* 10. BOTTOM CTA                              */
  /* ═══════════════════════════════════════════ */

  function enhanceBottomCTA() {
    var heading = findHeading("reduce queue time");
    if (!heading) return;
    heading.innerHTML = "Open the door to ambition.<br>Unify your payments.";
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;
    section.querySelectorAll("p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      if (t.includes("personalized demo") || t.includes("payment specialist")) {
        p.textContent = "Join Vila Gal\u00e9 and leading hotel groups. Get measurable results within 30 days.";
      }
    });
    /* Style the CTA button */
    section.querySelectorAll("a").forEach(function(a) {
      if (a.textContent.toLowerCase().includes("start now") || a.href.includes("onboard")) {
        a.textContent = "Book Your 15-Minute Demo \u2192";
        a.href = "/book-demo";
        a.style.setProperty("background", "#D4A574", "important");
        a.style.setProperty("color", "#1a1a2e", "important");
        a.style.setProperty("border-radius", "100px", "important");
        a.style.setProperty("padding", "14px 32px", "important");
        a.style.setProperty("font-weight", "600", "important");
      }
    });
    /* Add urgency note */
    var note = document.createElement("p");
    note.setAttribute("style", "text-align:center;font-size:0.75rem;color:rgba(255,255,255,0.35);margin-top:12px;");
    note.textContent = "Dedicated hospitality account manager included";
    var parent = heading.parentElement;
    var cta = parent.querySelector("a") || section.querySelector("a");
    if (cta) cta.parentElement.insertBefore(note, cta.nextSibling);
  }

  /* ═══════════════════════════════════════════ */
  /* 4a. DATA SECTION — Improve copy              */
  /* ═══════════════════════════════════════════ */

  function enhanceDataSection() {
    var heading = findHeading("data that drives");
    if (!heading) return;
    heading.innerHTML = "Intelligence that turns<br>guest data into revenue.";

    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    section.querySelectorAll("p").forEach(function(p) {
      var t = p.textContent.toLowerCase();
      if (t.includes("every interaction") || t.includes("opportunity to learn")) {
        p.textContent = "Returning guest recognition, peak-time demand forecasting, outlet performance heatmaps \u2014 Paybyrd turns every transaction into actionable intelligence.";
      }
    });
  }


  /* ═══════════════════════════════════════════ */
  /* 4b. BI SECTION — Inserted after data section */
  /* ═══════════════════════════════════════════ */

  function buildBISection() {
    var dataHeading = findHeading("intelligence that turns");
    if (!dataHeading) dataHeading = findHeading("data that drives");
    if (!dataHeading) return;
    var anchor = dataHeading.closest("section") || dataHeading.closest("[class*='section']");
    if (!anchor) return;

    var s = document.createElement("section");
    s.setAttribute("style", "padding:60px 0;background:#0a0a0f;overflow:hidden;");

    s.innerHTML =
      '<div class="pbrd-hosp-bi-wrap">' +

        '<div class="pbrd-hosp-bi-header pbrd-hosp-reveal">' +
          '<div class="pbrd-hosp-section-label">BUSINESS INTELLIGENCE</div>' +
          '<h2 class="pbrd-hosp-bi-h2">Your hotel\u2019s data, working harder<br>than your competitors\u2019.</h2>' +
          '<p class="pbrd-hosp-bi-sub">Real-time dashboards that predict demand, recognize returning guests, and reveal where revenue hides.</p>' +
        '</div>' +

        /* Three BI cards */
        '<div class="pbrd-hosp-bi-grid">' +

          /* Card 1: Returning Guest Recognition */
          '<div class="pbrd-hosp-bi-card pbrd-hosp-reveal">' +
            '<div class="pbrd-hosp-bi-card-viz">' +
              '<svg viewBox="0 0 280 140" fill="none">' +
                /* Guest profile appearing */
                '<circle cx="50" cy="50" r="20" fill="rgba(99,25,240,0.1)" stroke="rgba(99,25,240,0.3)" stroke-width="1.5"/>' +
                '<text x="50" y="46" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-weight="600" font-family="system-ui">GUEST</text>' +
                '<text x="50" y="57" text-anchor="middle" fill="#6319f0" font-size="6" font-weight="700" font-family="system-ui">VIP</text>' +
                /* Arrow */
                '<path d="M75,50 L100,50" stroke="rgba(99,25,240,0.3)" stroke-width="1.5" stroke-dasharray="4 3"/>' +
                /* Recognition box */
                '<rect x="105" y="20" width="170" height="100" rx="8" fill="rgba(99,25,240,0.04)" stroke="rgba(99,25,240,0.12)" stroke-width="1"/>' +
                '<text x="115" y="38" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="600" font-family="system-ui">RETURNING GUEST DETECTED</text>' +
                /* Data rows appearing */
                '<text x="115" y="55" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.5s" fill="freeze"/>Last stay: Ocean View Suite, 5 nights</text>' +
                '<text x="115" y="68" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.8s" fill="freeze"/>Preferred: Late checkout, extra pillows</text>' +
                '<text x="115" y="81" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.1s" fill="freeze"/>Lifetime value: \u20AC12,840</text>' +
                '<text x="115" y="94" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.4s" fill="freeze"/>Avg. spend per stay: \u20AC1,605</text>' +
                /* Upsell suggestion */
                '<rect x="115" y="100" width="100" height="14" rx="4" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.25)" stroke-width="1" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.8s" fill="freeze"/></rect>' +
                '<text x="120" y="110" fill="#22c55e" font-size="5.5" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.8s" fill="freeze"/>SUGGEST: Suite upgrade + spa package</text>' +
              '</svg>' +
            '</div>' +
            '<h3>Returning Guest Recognition</h3>' +
            '<p>Instantly recognize returning guests by card token. Surface their preferences, lifetime value, and AI-powered upsell suggestions before they reach the front desk.</p>' +
          '</div>' +

          /* Card 2: Peak-Time Demand Heatmap */
          '<div class="pbrd-hosp-bi-card pbrd-hosp-reveal">' +
            '<div class="pbrd-hosp-bi-card-viz">' +
              '<svg viewBox="0 0 280 140" fill="none">' +
                '<text x="10" y="15" fill="rgba(255,255,255,0.35)" font-size="6" font-weight="600" font-family="system-ui">WEEKLY DEMAND HEATMAP \u00b7 BY OUTLET</text>' +
                /* Y-axis labels */
                '<text x="8" y="38" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Restaurant</text>' +
                '<text x="8" y="56" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Spa</text>' +
                '<text x="8" y="74" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Bar</text>' +
                '<text x="8" y="92" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Pool</text>' +
                '<text x="8" y="110" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">Room Svc</text>' +
                /* X-axis (days) */
                '<text x="72" y="125" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">Mon</text>' +
                '<text x="102" y="125" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">Tue</text>' +
                '<text x="132" y="125" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">Wed</text>' +
                '<text x="162" y="125" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">Thu</text>' +
                '<text x="192" y="125" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">Fri</text>' +
                '<text x="222" y="125" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">Sat</text>' +
                '<text x="252" y="125" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">Sun</text>' +
                /* Heatmap cells — Restaurant row */
                '<rect x="58" y="30" width="26" height="14" rx="2" fill="rgba(99,25,240,0.2)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.1s" fill="freeze"/></rect>' +
                '<rect x="88" y="30" width="26" height="14" rx="2" fill="rgba(99,25,240,0.15)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.15s" fill="freeze"/></rect>' +
                '<rect x="118" y="30" width="26" height="14" rx="2" fill="rgba(99,25,240,0.3)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.2s" fill="freeze"/></rect>' +
                '<rect x="148" y="30" width="26" height="14" rx="2" fill="rgba(99,25,240,0.4)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.25s" fill="freeze"/></rect>' +
                '<rect x="178" y="30" width="26" height="14" rx="2" fill="rgba(99,25,240,0.8)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.3s" fill="freeze"/></rect>' +
                '<rect x="208" y="30" width="26" height="14" rx="2" fill="rgba(99,25,240,0.95)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.35s" fill="freeze"/></rect>' +
                '<rect x="238" y="30" width="26" height="14" rx="2" fill="rgba(99,25,240,0.9)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.4s" fill="freeze"/></rect>' +
                /* Spa row */
                '<rect x="58" y="48" width="26" height="14" rx="2" fill="rgba(99,25,240,0.35)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.2s" fill="freeze"/></rect>' +
                '<rect x="88" y="48" width="26" height="14" rx="2" fill="rgba(99,25,240,0.25)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.25s" fill="freeze"/></rect>' +
                '<rect x="118" y="48" width="26" height="14" rx="2" fill="rgba(99,25,240,0.3)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.3s" fill="freeze"/></rect>' +
                '<rect x="148" y="48" width="26" height="14" rx="2" fill="rgba(99,25,240,0.5)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.35s" fill="freeze"/></rect>' +
                '<rect x="178" y="48" width="26" height="14" rx="2" fill="rgba(99,25,240,0.7)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.4s" fill="freeze"/></rect>' +
                '<rect x="208" y="48" width="26" height="14" rx="2" fill="rgba(99,25,240,0.85)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.45s" fill="freeze"/></rect>' +
                '<rect x="238" y="48" width="26" height="14" rx="2" fill="rgba(99,25,240,0.6)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.5s" fill="freeze"/></rect>' +
                /* Bar row */
                '<rect x="58" y="66" width="26" height="14" rx="2" fill="rgba(99,25,240,0.1)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.3s" fill="freeze"/></rect>' +
                '<rect x="88" y="66" width="26" height="14" rx="2" fill="rgba(99,25,240,0.15)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.35s" fill="freeze"/></rect>' +
                '<rect x="118" y="66" width="26" height="14" rx="2" fill="rgba(99,25,240,0.2)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.4s" fill="freeze"/></rect>' +
                '<rect x="148" y="66" width="26" height="14" rx="2" fill="rgba(99,25,240,0.45)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.45s" fill="freeze"/></rect>' +
                '<rect x="178" y="66" width="26" height="14" rx="2" fill="rgba(99,25,240,0.9)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.5s" fill="freeze"/></rect>' +
                '<rect x="208" y="66" width="26" height="14" rx="2" fill="rgba(99,25,240,1)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.55s" fill="freeze"/></rect>' +
                '<rect x="238" y="66" width="26" height="14" rx="2" fill="rgba(99,25,240,0.85)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.6s" fill="freeze"/></rect>' +
                /* Pool row */
                '<rect x="58" y="84" width="26" height="14" rx="2" fill="rgba(99,25,240,0.4)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.4s" fill="freeze"/></rect>' +
                '<rect x="88" y="84" width="26" height="14" rx="2" fill="rgba(99,25,240,0.35)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.45s" fill="freeze"/></rect>' +
                '<rect x="118" y="84" width="26" height="14" rx="2" fill="rgba(99,25,240,0.3)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.5s" fill="freeze"/></rect>' +
                '<rect x="148" y="84" width="26" height="14" rx="2" fill="rgba(99,25,240,0.5)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.55s" fill="freeze"/></rect>' +
                '<rect x="178" y="84" width="26" height="14" rx="2" fill="rgba(99,25,240,0.75)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.6s" fill="freeze"/></rect>' +
                '<rect x="208" y="84" width="26" height="14" rx="2" fill="rgba(99,25,240,0.95)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.65s" fill="freeze"/></rect>' +
                '<rect x="238" y="84" width="26" height="14" rx="2" fill="rgba(99,25,240,0.8)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.7s" fill="freeze"/></rect>' +
                /* Room Service row */
                '<rect x="58" y="102" width="26" height="14" rx="2" fill="rgba(99,25,240,0.15)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.5s" fill="freeze"/></rect>' +
                '<rect x="88" y="102" width="26" height="14" rx="2" fill="rgba(99,25,240,0.1)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.55s" fill="freeze"/></rect>' +
                '<rect x="118" y="102" width="26" height="14" rx="2" fill="rgba(99,25,240,0.2)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.6s" fill="freeze"/></rect>' +
                '<rect x="148" y="102" width="26" height="14" rx="2" fill="rgba(99,25,240,0.25)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.65s" fill="freeze"/></rect>' +
                '<rect x="178" y="102" width="26" height="14" rx="2" fill="rgba(99,25,240,0.35)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.7s" fill="freeze"/></rect>' +
                '<rect x="208" y="102" width="26" height="14" rx="2" fill="rgba(99,25,240,0.5)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.75s" fill="freeze"/></rect>' +
                '<rect x="238" y="102" width="26" height="14" rx="2" fill="rgba(99,25,240,0.45)" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.15s" begin="0.8s" fill="freeze"/></rect>' +
              '</svg>' +
            '</div>' +
            '<h3>Peak-Time Demand Heatmap</h3>' +
            '<p>See exactly when each outlet peaks \u2014 by day, hour, and season. Staff ahead of demand, optimize pricing, and never get caught short on a Friday night rush.</p>' +
          '</div>' +

          /* Card 3: Revenue per Outlet Analytics */
          '<div class="pbrd-hosp-bi-card pbrd-hosp-reveal">' +
            '<div class="pbrd-hosp-bi-card-viz">' +
              '<svg viewBox="0 0 280 140" fill="none">' +
                '<text x="10" y="15" fill="rgba(255,255,255,0.35)" font-size="6" font-weight="600" font-family="system-ui">REVENUE BY OUTLET \u00b7 THIS MONTH</text>' +
                /* Horizontal bar chart — outlets ranked by revenue */
                '<text x="10" y="36" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui">Restaurant</text>' +
                '<rect x="75" y="28" width="0" height="12" rx="3" fill="#6319f0" opacity="0.8"><animate attributeName="width" values="0;170" dur="1s" begin="0.3s" fill="freeze"/></rect>' +
                '<text x="250" y="37" fill="rgba(255,255,255,0.4)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1s" fill="freeze"/>\u20AC48K</text>' +

                '<text x="10" y="56" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui">Front Desk</text>' +
                '<rect x="75" y="48" width="0" height="12" rx="3" fill="rgba(99,25,240,0.7)"><animate attributeName="width" values="0;145" dur="1s" begin="0.5s" fill="freeze"/></rect>' +
                '<text x="225" y="57" fill="rgba(255,255,255,0.4)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.2s" fill="freeze"/>\u20AC41K</text>' +

                '<text x="10" y="76" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui">Spa</text>' +
                '<rect x="75" y="68" width="0" height="12" rx="3" fill="rgba(99,25,240,0.55)"><animate attributeName="width" values="0;105" dur="1s" begin="0.7s" fill="freeze"/></rect>' +
                '<text x="185" y="77" fill="rgba(255,255,255,0.4)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.4s" fill="freeze"/>\u20AC29K</text>' +

                '<text x="10" y="96" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui">Bar</text>' +
                '<rect x="75" y="88" width="0" height="12" rx="3" fill="rgba(99,25,240,0.4)"><animate attributeName="width" values="0;80" dur="1s" begin="0.9s" fill="freeze"/></rect>' +
                '<text x="160" y="97" fill="rgba(255,255,255,0.4)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.6s" fill="freeze"/>\u20AC22K</text>' +

                '<text x="10" y="116" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui">Pool & Room Svc</text>' +
                '<rect x="75" y="108" width="0" height="12" rx="3" fill="rgba(99,25,240,0.25)"><animate attributeName="width" values="0;50" dur="1s" begin="1.1s" fill="freeze"/></rect>' +
                '<text x="130" y="117" fill="rgba(255,255,255,0.4)" font-size="6" font-weight="600" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.8s" fill="freeze"/>\u20AC14K</text>' +
              '</svg>' +
            '</div>' +
            '<h3>Revenue per Outlet Analytics</h3>' +
            '<p>Drill down by outlet, shift, payment method, or staff member. Generate AI reports per channel in seconds \u2014 no spreadsheets, no waiting for month-end.</p>' +
          '</div>' +

        '</div>' +
      '</div>';

    anchor.insertAdjacentElement("afterend", s);
    observeReveal(".pbrd-hosp-reveal", 100, s);
  }


  /* ═══════════════════════════════════════════ */
  /* Init                                        */
  /* ═══════════════════════════════════════════ */

  function init() {
    enhanceHero();
    buildCommandCenter();
    enhancePainPoints();
    enhanceFeatures();
    /* Section 4 (GSAP scroll-draw) — enhance copy + insert BI section after */
    enhanceDataSection();
    buildBISection();
    enhanceCTA();
    enhanceGuestJourney();
    enhanceQuiviPOS();
    enhanceAI();
    enhanceTestimonial();
    enhanceFAQ();
    enhanceBottomCTA();
    console.log("[Paybyrd] Hospitality enhancements loaded");
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init);
})();
