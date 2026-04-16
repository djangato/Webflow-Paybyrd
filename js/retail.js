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

    section.style.setProperty("background-image", "url('https://djangato.github.io/Webflow-Paybyrd/assets/retail/hero-retail.jpg')", "important");
    section.style.setProperty("background-size", "cover", "important");
    section.style.setProperty("background-position", "center", "important");
    section.style.setProperty("background-repeat", "no-repeat", "important");
    section.style.setProperty("position", "relative", "important");

    /* Dark overlay for text readability */
    var overlay = document.createElement("div");
    overlay.setAttribute("style", "position:absolute;inset:0;background:rgba(0,0,0,0.45);z-index:0;pointer-events:none;");
    section.insertBefore(overlay, section.firstChild);

    /* Keep Webflow layout structure but make children relative for z-index */
    Array.prototype.forEach.call(section.children, function(child) {
      if (child !== overlay) {
        child.style.setProperty("position", "relative", "important");
        child.style.setProperty("z-index", "1", "important");
      }
    });

    /* Hide the Webflow content wrapper that contains the old text, but NOT spacers */
    var contentWrap = heading.closest(".u-content-wrapper") || heading.closest(".u-container") || heading.parentElement;
    if (contentWrap) contentWrap.style.setProperty("display", "none", "important");
    /* Also hide any hero images */
    section.querySelectorAll("img").forEach(function(img) { img.style.setProperty("display", "none", "important"); });
    /* Hide image wrappers */
    section.querySelectorAll(".u-image-wrapper").forEach(function(el) { el.style.setProperty("display", "none", "important"); });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-hero-wrap";

    wrap.innerHTML =
      '<div class="pbrd-ret-hero-content pbrd-ret-reveal">' +
        '<h1 class="pbrd-ret-hero-h1">Turn every transaction<br>into intelligence.</h1>' +
        '<p class="pbrd-ret-hero-sub">Real-time insights across POS, e-commerce, mobile, and kiosk. One platform. Zero blind spots.</p>' +
        '<div class="pbrd-ret-hero-ctas">' +
          '<a href="/book-demo" class="pbrd-ret-cta-primary">Book a 15-min Demo \u2192</a>' +
          '<a href="#pbrd-ret-heatmap" class="pbrd-ret-cta-ghost">See the dashboard</a>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-ret-ticker pbrd-ret-reveal">' +
        '<span>4\u20137% Higher Auth</span><span class="pbrd-ret-ticker-sep">\u00b7</span>' +
        '<span>39% Less Queue Drop-off</span><span class="pbrd-ret-ticker-sep">\u00b7</span>' +
        '<span>16.8% Fewer Chargebacks</span><span class="pbrd-ret-ticker-sep">\u00b7</span>' +
        '<span>PCI Level 1</span>' +
      '</div>';

    section.appendChild(wrap);

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

      '<div class="pbrd-ret-pain-dashboard pbrd-ret-reveal">' +
        '<div class="pbrd-ret-heatmap" id="pbrd-ret-heatmap">' +
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
        '<div class="pbrd-ret-txn-feed" id="pbrd-ret-txn-feed">' +
          '<div class="pbrd-ret-txn-head"><span class="pbrd-ret-txn-dot"></span>Live Transactions</div>' +
        '</div>' +
      '</div>' +

      '<div class="pbrd-ret-pain-stats pbrd-ret-reveal">' +

        /* Card 1: Checkout Abandonment — funnel visualization */
        '<div class="pbrd-ret-pain-card">' +
          '<div class="pbrd-ret-pain-card-viz">' +
            '<svg viewBox="0 0 200 80" fill="none" style="width:100%;height:auto">' +
              '<rect x="0" y="0" width="200" height="16" rx="3" fill="rgba(99,25,240,0.4)"/>' +
              '<text x="100" y="11" text-anchor="middle" fill="#fff" font-size="6" font-weight="600" font-family="system-ui">100 shoppers start checkout</text>' +
              '<path d="M30,16 L50,30 L150,30 L170,16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
              '<rect x="30" y="30" width="140" height="16" rx="3" fill="rgba(245,158,11,0.35)"/>' +
              '<text x="100" y="41" text-anchor="middle" fill="#fff" font-size="6" font-weight="600" font-family="system-ui">75 reach payment step</text>' +
              '<path d="M55,46 L70,60 L130,60 L145,46" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
              '<rect x="50" y="60" width="100" height="16" rx="3" fill="rgba(239,68,68,0.4)"/>' +
              '<text x="100" y="71" text-anchor="middle" fill="#fff" font-size="6" font-weight="600" font-family="system-ui">Only 75 complete \u2014 25 lost</text>' +
            '</svg>' +
          '</div>' +
          '<div class="pbrd-ret-pain-card-body">' +
            '<div class="pbrd-ret-pain-card-big" style="color:#ef4444">25%</div>' +
            '<div class="pbrd-ret-pain-card-label">abandon at checkout</div>' +
            '<div class="pbrd-ret-pain-card-fix">\u2192 Paybyrd\u2019s one-click checkout recovers 15\u201320%</div>' +
          '</div>' +
        '</div>' +

        /* Card 2: Peak Hour Drop-offs — queue visualization */
        '<div class="pbrd-ret-pain-card">' +
          '<div class="pbrd-ret-pain-card-viz">' +
            '<svg viewBox="0 0 200 80" fill="none" style="width:100%;height:auto">' +
              '<text x="6" y="10" fill="rgba(255,255,255,0.3)" font-size="5" font-weight="600" font-family="system-ui">QUEUE LENGTH \u00b7 PEAK HOUR</text>' +
              '<rect x="6" y="18" width="0" height="10" rx="2" fill="rgba(245,158,11,0.5)"><animate attributeName="width" values="0;160" dur="1.2s" begin="0.3s" fill="freeze"/></rect>' +
              '<text x="170" y="26" fill="rgba(255,255,255,0.6)" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.2s" fill="freeze"/>8 min wait</text>' +
              '<rect x="6" y="34" width="0" height="10" rx="2" fill="rgba(245,158,11,0.35)"><animate attributeName="width" values="0;120" dur="1.2s" begin="0.5s" fill="freeze"/></rect>' +
              '<text x="130" y="42" fill="rgba(255,255,255,0.6)" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.4s" fill="freeze"/>6 min wait</text>' +
              '<text x="6" y="60" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">WITH PAYBYRD CONTACTLESS</text>' +
              '<rect x="6" y="66" width="0" height="10" rx="2" fill="rgba(16,185,129,0.5)"><animate attributeName="width" values="0;30" dur="1s" begin="0.7s" fill="freeze"/></rect>' +
              '<text x="40" y="74" fill="#10b981" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1.5s" fill="freeze"/>< 30s</text>' +
            '</svg>' +
          '</div>' +
          '<div class="pbrd-ret-pain-card-body">' +
            '<div class="pbrd-ret-pain-card-big" style="color:#f59e0b">39%</div>' +
            '<div class="pbrd-ret-pain-card-label">walk away during peak queues</div>' +
            '<div class="pbrd-ret-pain-card-fix">\u2192 Tap-to-pay + mobile POS eliminates queues entirely</div>' +
          '</div>' +
        '</div>' +

        /* Card 3: Reconciliation — before/after */
        '<div class="pbrd-ret-pain-card">' +
          '<div class="pbrd-ret-pain-card-viz">' +
            '<svg viewBox="0 0 200 80" fill="none" style="width:100%;height:auto">' +
              '<text x="6" y="10" fill="rgba(255,255,255,0.3)" font-size="5" font-weight="600" font-family="system-ui">MONTHLY RECONCILIATION</text>' +
              '<text x="6" y="28" fill="rgba(239,68,68,0.7)" font-size="5.5" font-weight="600" font-family="system-ui">Before</text>' +
              '<rect x="40" y="20" width="0" height="12" rx="2" fill="rgba(239,68,68,0.3)"><animate attributeName="width" values="0;150" dur="1s" begin="0.3s" fill="freeze"/></rect>' +
              '<text x="194" y="29" text-anchor="end" fill="rgba(255,255,255,0.5)" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1s" fill="freeze"/>15+ hours</text>' +
              '<text x="6" y="50" fill="rgba(16,185,129,0.7)" font-size="5.5" font-weight="600" font-family="system-ui">After</text>' +
              '<rect x="40" y="42" width="0" height="12" rx="2" fill="rgba(16,185,129,0.4)"><animate attributeName="width" values="0;8" dur="0.6s" begin="0.5s" fill="freeze"/></rect>' +
              '<text x="54" y="51" fill="#10b981" font-size="6" font-weight="700" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.3s" begin="1s" fill="freeze"/>Seconds</text>' +
              '<text x="6" y="72" fill="rgba(255,255,255,0.15)" font-size="5" font-family="system-ui" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.3s" fill="freeze"/>AI matches every transaction automatically</text>' +
            '</svg>' +
          '</div>' +
          '<div class="pbrd-ret-pain-card-body">' +
            '<div class="pbrd-ret-pain-card-big" style="color:#eab308">15+ hrs</div>' +
            '<div class="pbrd-ret-pain-card-label">wasted on manual reconciliation</div>' +
            '<div class="pbrd-ret-pain-card-fix">\u2192 AI reconciliation closes books in seconds</div>' +
          '</div>' +
        '</div>' +

      '</div>' +

      '<p class="pbrd-ret-pain-footer pbrd-ret-reveal">Paybyrd shows you exactly when and where you\u2019re losing revenue \u2014 and fixes it.</p>';

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
      if (items.length >= 6) { var old = items[items.length - 1]; old.style.opacity = "0"; setTimeout(function() { if (old.parentNode) old.parentNode.removeChild(old); }, 300); }
      var headEl = feed.querySelector(".pbrd-ret-txn-head");
      if (headEl && headEl.nextSibling) feed.insertBefore(el, headEl.nextSibling);
      else feed.appendChild(el);
      setTimeout(function() { el.style.opacity = "1"; }, 50);
      setTimeout(addTxn, 1800);
    }
    new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) { addTxn(); this.disconnect(); } }, { threshold: 0.1 }).observe(wrap);

    observeReveal(".pbrd-ret-pain-wrap .pbrd-ret-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 2b. SOLUTIONS — "More ways to get paid"     */
  /* ═══════════════════════════════════════════ */

  function buildSolutions() {
    /* Insert after the pain points section */
    var painSection = findSectionByHeading("retail moves fast");
    if (!painSection) return;

    var solSection = document.createElement("div");
    solSection.className = "pbrd-ret-sol-section";

    var CDN = "https://djangato.github.io/Webflow-Paybyrd/assets/";

    solSection.innerHTML =
      '<div class="pbrd-ret-sol-wrap">' +
        '<div class="pbrd-ret-sol-header pbrd-ret-reveal">' +
          '<h2 class="pbrd-ret-sol-h2">More ways to sell.<br>More ways to grow.</h2>' +
          '<p class="pbrd-ret-sol-sub">Accept payments everywhere your customers are \u2014 in-store, online, on the go, or over the phone. One platform powers them all.</p>' +
        '</div>' +

        '<div class="pbrd-ret-sol-grid">' +

          /* Card 1: In-Store POS — retail terminals image */
          '<div class="pbrd-ret-sol-card pbrd-ret-sol-card--wide pbrd-ret-reveal">' +
            '<div class="pbrd-ret-sol-card-img">' +
              '<img src="' + CDN + 'retail/retail-terminals.jpg" alt="Paybyrd POS terminals" loading="lazy">' +
            '</div>' +
            '<div class="pbrd-ret-sol-card-body">' +
              '<div class="pbrd-ret-sol-tag">In-Store POS</div>' +
              '<h3>Accept every card, every wallet, every time</h3>' +
              '<p>Latest-gen terminals with contactless, chip, and mobile payments. Over-the-air updates. PCI compliant out of the box.</p>' +
            '</div>' +
          '</div>' +

          /* Card 2: PayLink — animated multi-step flow */
          '<div class="pbrd-ret-sol-card pbrd-ret-reveal">' +
            '<div class="pbrd-ret-sol-card-viz">' +
              '<div class="pbrd-ret-sol-paylink">' +

                /* Step 1: Amount input (0-2.5s) */
                '<div class="pbrd-ret-pl-step pbrd-ret-pl-s1">' +
                  '<div class="pbrd-ret-sol-paylink-label">Amount</div>' +
                  '<div class="pbrd-ret-sol-paylink-input">' +
                    '<span class="pbrd-ret-pl-cursor"></span>' +
                    '<span class="pbrd-ret-pl-typing" data-text="139.90">QAR </span>' +
                  '</div>' +
                  '<div class="pbrd-ret-sol-paylink-label" style="margin-top:8px">Description</div>' +
                  '<div class="pbrd-ret-sol-paylink-input pbrd-ret-pl-desc-input">' +
                    '<span class="pbrd-ret-pl-typing2" data-text="Nike Air Max 90">Nike Air Max 90</span>' +
                  '</div>' +
                '</div>' +

                /* Step 2: Phone number (2.5-5s) */
                '<div class="pbrd-ret-pl-step pbrd-ret-pl-s2">' +
                  '<div class="pbrd-ret-sol-paylink-amount">QAR 139.90</div>' +
                  '<div class="pbrd-ret-sol-paylink-desc">Nike Air Max 90</div>' +
                  '<div class="pbrd-ret-sol-paylink-label" style="margin-top:10px">Send to</div>' +
                  '<div class="pbrd-ret-sol-paylink-input pbrd-ret-pl-phone-input">' +
                    '<span style="color:#999;margin-right:4px">\uD83C\uDDF6\uD83C\uDDE6 +974</span>' +
                    '<span class="pbrd-ret-pl-typing3">5512 8834</span>' +
                  '</div>' +
                  '<div class="pbrd-ret-sol-paylink-methods">' +
                    '<span>Visa</span><span>MC</span><span>Apple Pay</span>' +
                  '</div>' +
                '</div>' +

                /* Step 3: Pay Now button press (5-6.5s) */
                '<div class="pbrd-ret-pl-step pbrd-ret-pl-s3">' +
                  '<div class="pbrd-ret-sol-paylink-amount">QAR 139.90</div>' +
                  '<div class="pbrd-ret-sol-paylink-desc">Nike Air Max 90</div>' +
                  '<div class="pbrd-ret-sol-paylink-phone-display">\uD83C\uDDF6\uD83C\uDDE6 +974 5512 8834</div>' +
                  '<div class="pbrd-ret-sol-paylink-btn pbrd-ret-pl-btn-pulse">Send PayLink</div>' +
                  '<div class="pbrd-ret-sol-paylink-sending">Sending\u2026</div>' +
                '</div>' +

                /* Step 4: Success (6.5-8s) */
                '<div class="pbrd-ret-pl-step pbrd-ret-pl-s4">' +
                  '<div class="pbrd-ret-pl-success-icon">\u2713</div>' +
                  '<div class="pbrd-ret-pl-success-text">PayLink Sent!</div>' +
                  '<div class="pbrd-ret-sol-paylink-phone-display">\uD83C\uDDF6\uD83C\uDDE6 +974 5512 8834</div>' +
                  '<div class="pbrd-ret-sol-paylink-url">pay.paybyrd.com/r/<span class="pbrd-ret-sol-paylink-id">x7k29</span></div>' +
                  '<div class="pbrd-ret-sol-paylink-sent">' +
                    '<span class="pbrd-ret-sol-paylink-check">\u2713</span> Delivered via SMS' +
                  '</div>' +
                '</div>' +

              '</div>' +
            '</div>' +
            '<div class="pbrd-ret-sol-card-body">' +
              '<div class="pbrd-ret-sol-tag">PayLink</div>' +
              '<h3>Sell anywhere \u2014 no checkout required</h3>' +
              '<p>Generate a payment link in seconds. Share via SMS, WhatsApp, email, or social. Perfect for phone orders and remote sales.</p>' +
            '</div>' +
          '</div>' +

          /* Card 3: Tap on Phone — reuse POS page iPhone visualization */
          '<div class="pbrd-ret-sol-card pbrd-ret-reveal">' +
            '<div class="pbrd-ret-sol-card-viz" style="background:#f0edf5;position:relative;overflow:hidden">' +
              '<div style="position:relative;width:120px;margin:0 auto">' +
                '<svg viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-pos-tap-device pbrd-pos-tap-iphone" style="width:100%;height:auto;filter:drop-shadow(0 8px 24px rgba(0,0,0,0.15))">' +
                  '<rect x="8" y="8" width="204" height="424" rx="36" fill="#1a1a1e"/>' +
                  '<rect x="8" y="8" width="204" height="424" rx="36" fill="none" stroke="rgba(180,180,190,0.3)" stroke-width="1.5"/>' +
                  '<rect x="14" y="14" width="192" height="412" rx="32" fill="#000"/>' +
                  '<rect x="78" y="22" width="64" height="22" rx="11" fill="#1a1a1e"/>' +
                  '<circle cx="124" cy="33" r="4" fill="#0a0a0e" stroke="rgba(40,40,50,0.5)" stroke-width="0.5"/>' +
                  '<g class="pbrd-pos-txn-step pbrd-pos-txn-s1">' +
                    '<text x="110" y="110" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="10" font-family="system-ui" font-weight="500">CHARGE AMOUNT</text>' +
                    '<text x="110" y="175" text-anchor="middle" fill="#fff" font-size="42" font-weight="200" font-family="system-ui" letter-spacing="-1">\u20AC24.90</text>' +
                    '<g transform="translate(50,220)" fill="rgba(255,255,255,0.06)">' +
                      '<rect width="44" height="36" rx="6"/><rect x="50" width="44" height="36" rx="6"/><rect x="100" width="44" height="36" rx="6"/>' +
                      '<rect y="42" width="44" height="36" rx="6"/><rect x="50" y="42" width="44" height="36" rx="6"/><rect x="100" y="42" width="44" height="36" rx="6"/>' +
                    '</g>' +
                    '<rect x="40" y="340" width="140" height="40" rx="20" fill="#6319f0"/>' +
                    '<text x="110" y="365" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="system-ui">Charge</text>' +
                  '</g>' +
                  '<g class="pbrd-pos-txn-step pbrd-pos-txn-s2">' +
                    '<text x="110" y="100" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10" font-family="system-ui" font-weight="500">TOTAL</text>' +
                    '<text x="110" y="130" text-anchor="middle" fill="#fff" font-size="32" font-weight="300" font-family="system-ui">\u20AC24.90</text>' +
                    '<g transform="translate(82,170)">' +
                      '<path d="M28 8 C34 14, 34 30, 28 36" stroke="rgba(99,25,240,0.7)" stroke-width="2" fill="none" class="pbrd-pos-nfc-wave1"/>' +
                      '<path d="M28 0 C40 12, 40 32, 28 44" stroke="rgba(99,25,240,0.5)" stroke-width="2" fill="none" class="pbrd-pos-nfc-wave2"/>' +
                      '<path d="M28 -6 C46 10, 46 36, 28 50" stroke="rgba(99,25,240,0.3)" stroke-width="2" fill="none" class="pbrd-pos-nfc-wave3"/>' +
                    '</g>' +
                    '<text x="110" y="260" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="11" font-family="system-ui">Hold card near iPhone</text>' +
                    '<rect x="60" y="390" width="100" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>' +
                  '</g>' +
                  '<g class="pbrd-pos-txn-step pbrd-pos-txn-s3">' +
                    '<text x="110" y="140" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="11" font-family="system-ui">Processing\u2026</text>' +
                    '<circle cx="110" cy="200" r="24" fill="none" stroke="rgba(99,25,240,0.15)" stroke-width="2.5"/>' +
                    '<path d="M110 176 A24 24 0 0 1 134 200" stroke="#6319f0" stroke-width="2.5" fill="none" stroke-linecap="round" class="pbrd-pos-spinner"/>' +
                    '<text x="110" y="260" text-anchor="middle" fill="#fff" font-size="28" font-weight="300" font-family="system-ui">\u20AC24.90</text>' +
                  '</g>' +
                  '<g class="pbrd-pos-txn-step pbrd-pos-txn-s4">' +
                    '<circle cx="110" cy="175" r="40" fill="rgba(99,25,240,0.08)" stroke="#6319f0" stroke-width="2" class="pbrd-pos-success-ring"/>' +
                    '<path d="M94 175 L106 187 L128 163" stroke="#6319f0" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="pbrd-pos-checkmark"/>' +
                    '<text x="110" y="250" text-anchor="middle" fill="#fff" font-size="28" font-weight="300" font-family="system-ui">\u20AC24.90</text>' +
                    '<text x="110" y="278" text-anchor="middle" fill="rgba(99,25,240,0.8)" font-size="12" font-weight="600" font-family="system-ui">Approved</text>' +
                    '<rect x="40" y="340" width="140" height="40" rx="20" fill="rgba(99,25,240,0.1)" stroke="rgba(99,25,240,0.3)" stroke-width="1"/>' +
                    '<text x="110" y="365" text-anchor="middle" fill="#6319f0" font-size="13" font-weight="600" font-family="system-ui">New Sale</text>' +
                  '</g>' +
                  '<text x="30" y="47" fill="rgba(255,255,255,0.4)" font-size="9" font-weight="600" font-family="system-ui">9:41</text>' +
                  '<g transform="translate(170,38)">' +
                    '<rect x="0" y="0" width="16" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>' +
                    '<rect x="1.5" y="1.5" width="10" height="5" rx="1" fill="rgba(255,255,255,0.3)"/>' +
                    '<rect x="16.5" y="2" width="1.5" height="4" rx="0.5" fill="rgba(255,255,255,0.2)"/>' +
                  '</g>' +
                '</svg>' +
                '<svg viewBox="0 0 130 82" class="pbrd-pos-tap-card" style="position:absolute;bottom:15%;right:-30px;width:80px" xmlns="http://www.w3.org/2000/svg">' +
                  '<rect width="130" height="82" rx="10" fill="#e8e4ef" stroke="rgba(0,0,0,0.06)" stroke-width="0.5"/>' +
                  '<rect x="14" y="22" width="24" height="18" rx="3" fill="rgba(200,180,130,0.4)" stroke="rgba(180,160,100,0.5)" stroke-width="0.6"/>' +
                  '<line x1="14" y1="28" x2="38" y2="28" stroke="rgba(180,160,100,0.3)" stroke-width="0.4"/>' +
                  '<line x1="14" y1="34" x2="38" y2="34" stroke="rgba(180,160,100,0.3)" stroke-width="0.4"/>' +
                  '<line x1="26" y1="22" x2="26" y2="40" stroke="rgba(180,160,100,0.3)" stroke-width="0.4"/>' +
                  '<g transform="translate(96,20)"><path d="M8 4 C11 7, 11 13, 8 16" stroke="rgba(0,0,0,0.15)" stroke-width="1" fill="none"/><path d="M8 1 C14 6, 14 14, 8 19" stroke="rgba(0,0,0,0.1)" stroke-width="1" fill="none"/></g>' +
                  '<g fill="rgba(0,0,0,0.12)"><circle cx="14" cy="56" r="2"/><circle cx="20" cy="56" r="2"/><circle cx="26" cy="56" r="2"/><circle cx="32" cy="56" r="2"/><text x="42" y="59" font-size="9" font-family="system-ui" fill="rgba(0,0,0,0.2)">4821</text></g>' +
                  '<text x="14" y="74" font-size="7" font-family="system-ui" fill="rgba(0,0,0,0.15)" letter-spacing="0.5">J. ANDERSON</text>' +
                '</svg>' +
              '</div>' +
            '</div>' +
            '<div class="pbrd-ret-sol-card-body">' +
              '<div class="pbrd-ret-sol-tag">Tap on Phone</div>' +
              '<h3>Turn any phone into a terminal</h3>' +
              '<p>Accept contactless payments with just a smartphone. No hardware needed. Perfect for pop-ups, markets, and delivery.</p>' +
            '</div>' +
          '</div>' +

          /* Card 4: Real-time Dashboard */
          '<div class="pbrd-ret-sol-card pbrd-ret-reveal">' +
            '<div class="pbrd-ret-sol-card-viz">' +
              '<div class="pbrd-ret-sol-dash">' +
                '<div class="pbrd-ret-sol-dash-row"><span class="pbrd-ret-sol-dash-label">Today\u2019s revenue</span><span class="pbrd-ret-sol-dash-val" id="pbrd-ret-sol-rev">\u20AC0</span></div>' +
                '<div class="pbrd-ret-sol-dash-row"><span class="pbrd-ret-sol-dash-label">Transactions</span><span class="pbrd-ret-sol-dash-val" id="pbrd-ret-sol-txns">0</span></div>' +
                '<div class="pbrd-ret-sol-dash-row"><span class="pbrd-ret-sol-dash-label">Avg. ticket</span><span class="pbrd-ret-sol-dash-val">\u20AC47.80</span></div>' +
                '<div class="pbrd-ret-sol-dash-bar">' +
                  '<div class="pbrd-ret-sol-dash-seg" style="flex:62;background:rgba(99,25,240,0.6)"><span>POS 62%</span></div>' +
                  '<div class="pbrd-ret-sol-dash-seg" style="flex:28;background:rgba(99,25,240,0.35)"><span>Web 28%</span></div>' +
                  '<div class="pbrd-ret-sol-dash-seg" style="flex:10;background:rgba(99,25,240,0.15)"><span>Mobile</span></div>' +
                '</div>' +
                '<div class="pbrd-ret-sol-dash-live"><span class="pbrd-ret-txn-dot"></span>Updating in real time</div>' +
              '</div>' +
            '</div>' +
            '<div class="pbrd-ret-sol-card-body">' +
              '<div class="pbrd-ret-sol-tag">Live Dashboard</div>' +
              '<h3>Every store. Every channel. One screen.</h3>' +
              '<p>See revenue, transactions, and channel mix across all locations in real time. AI-powered insights included.</p>' +
            '</div>' +
          '</div>' +

          /* Card 5: Omnichannel */
          '<div class="pbrd-ret-sol-card pbrd-ret-reveal">' +
            '<div class="pbrd-ret-sol-card-viz">' +
              '<div class="pbrd-ret-sol-omni">' +
                '<svg viewBox="0 0 200 100" fill="none" style="width:100%;height:auto">' +
                  '<circle cx="100" cy="50" r="22" fill="rgba(99,25,240,0.08)" stroke="rgba(99,25,240,0.3)" stroke-width="1.5"/>' +
                  '<text x="100" y="48" text-anchor="middle" fill="#6319f0" font-size="6" font-weight="700" font-family="system-ui">PAYBYRD</text>' +
                  '<text x="100" y="57" text-anchor="middle" fill="rgba(99,25,240,0.5)" font-size="4" font-family="system-ui">Unified</text>' +
                  '<text x="30" y="25" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="5" font-weight="600" font-family="system-ui">POS</text>' +
                  '<text x="170" y="25" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="5" font-weight="600" font-family="system-ui">Online</text>' +
                  '<text x="30" y="82" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="5" font-weight="600" font-family="system-ui">Mobile</text>' +
                  '<text x="170" y="82" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="5" font-weight="600" font-family="system-ui">Kiosk</text>' +
                  '<path d="M78,40 L38,28" stroke="rgba(99,25,240,0.2)" stroke-width="1" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite"/></path>' +
                  '<path d="M122,40 L162,28" stroke="rgba(99,25,240,0.2)" stroke-width="1" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.8s" repeatCount="indefinite"/></path>' +
                  '<path d="M78,60 L38,75" stroke="rgba(99,25,240,0.2)" stroke-width="1" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite"/></path>' +
                  '<path d="M122,60 L162,75" stroke="rgba(99,25,240,0.2)" stroke-width="1" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.7s" repeatCount="indefinite"/></path>' +
                '</svg>' +
              '</div>' +
            '</div>' +
            '<div class="pbrd-ret-sol-card-body">' +
              '<div class="pbrd-ret-sol-tag">Omnichannel</div>' +
              '<h3>One customer. One view. Every channel.</h3>' +
              '<p>Unified commerce means your POS, e-commerce, mobile, and kiosk all share one payment engine, one reconciliation, one dashboard.</p>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</div>';

    painSection.parentNode.insertBefore(solSection, painSection.nextSibling);

    /* Animate dashboard counters */
    var revEl = document.getElementById("pbrd-ret-sol-rev");
    var txnEl = document.getElementById("pbrd-ret-sol-txns");
    if (revEl && txnEl) {
      var rev = 8420, txn = 176;
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          setInterval(function() {
            rev += Math.floor(Math.random() * 80) + 20;
            txn += Math.floor(Math.random() * 3) + 1;
            revEl.textContent = "\u20AC" + rev.toLocaleString();
            txnEl.textContent = txn.toLocaleString();
          }, 2000);
          this.disconnect();
        }
      }, { threshold: 0.2 }).observe(solSection);
    }

    observeReveal(".pbrd-ret-sol-section .pbrd-ret-reveal", 120);
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

    section.style.setProperty("padding", "80px 0", "important");
    section.style.setProperty("background", "#0a0a0f", "important");
    Array.prototype.forEach.call(section.children, function(child) {
      if (!child.classList || !child.classList.contains("pbrd-ret-bi-wrap")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ret-bi-wrap";

    /* ── SVG phone frame helper ── */
    function phoneFrame(id, screenContent) {
      return '<div class="pbrd-ret-bi-phone" id="' + id + '">' +
        '<svg viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg" class="pbrd-ret-bi-device">' +
          '<rect x="8" y="8" width="204" height="424" rx="36" fill="#1a1a1e"/>' +
          '<rect x="8" y="8" width="204" height="424" rx="36" fill="none" stroke="rgba(180,180,190,0.25)" stroke-width="1.5"/>' +
          '<rect x="14" y="14" width="192" height="412" rx="32" fill="#0a0a10"/>' +
          '<rect x="78" y="22" width="64" height="22" rx="11" fill="#1a1a1e"/>' +
          '<circle cx="124" cy="33" r="4" fill="#0a0a0e" stroke="rgba(40,40,50,0.5)" stroke-width="0.5"/>' +
          '<text x="30" y="47" fill="rgba(255,255,255,0.4)" font-size="9" font-weight="600" font-family="system-ui">9:41</text>' +
          '<g transform="translate(170,38)"><rect x="0" y="0" width="16" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/><rect x="1.5" y="1.5" width="10" height="5" rx="1" fill="rgba(255,255,255,0.3)"/></g>' +
          screenContent +
        '</svg>' +
      '</div>';
    }

    /* ── Phone 1: Dashboard overview ── */
    var phone1 = phoneFrame("pbrd-ret-bi-p1",
      /* Header */
      '<g transform="translate(24,60)">' +
        '<text x="0" y="0" fill="rgba(255,255,255,0.4)" font-size="8" font-family="system-ui" font-weight="500">\u21B3 Paybyrd</text>' +
        '<text x="0" y="16" fill="rgba(255,255,255,0.5)" font-size="7" font-family="system-ui">Welcome back,</text>' +
        '<text x="0" y="32" fill="#fff" font-size="18" font-weight="700" font-family="system-ui">Hugo</text>' +
        '<circle cx="160" cy="18" r="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>' +
        '<text x="160" y="22" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10" font-family="system-ui">H</text>' +
      '</g>' +
      /* Period tabs */
      '<g transform="translate(24,108)">' +
        '<rect x="0" y="0" width="38" height="18" rx="9" fill="rgba(255,255,255,0.04)"/><text x="19" y="12" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="7" font-family="system-ui">Today</text>' +
        '<rect x="44" y="0" width="38" height="18" rx="9" fill="#6319f0"/><text x="63" y="12" text-anchor="middle" fill="#fff" font-size="7" font-weight="600" font-family="system-ui">7 days</text>' +
        '<rect x="88" y="0" width="42" height="18" rx="9" fill="rgba(255,255,255,0.04)"/><text x="109" y="12" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="7" font-family="system-ui">30 days</text>' +
      '</g>' +
      /* Main volume card */
      '<g transform="translate(24,138)">' +
        '<rect x="0" y="0" width="172" height="82" rx="12" fill="rgba(99,25,240,0.12)" stroke="rgba(99,25,240,0.2)" stroke-width="0.5"/>' +
        '<text x="12" y="18" fill="rgba(255,255,255,0.4)" font-size="7" font-family="system-ui">EUR Total Volume</text>' +
        '<rect x="124" y="6" width="38" height="14" rx="7" fill="rgba(99,25,240,0.3)"/><text x="143" y="16" text-anchor="middle" fill="#fff" font-size="6" font-weight="600" font-family="system-ui">7 days</text>' +
        '<text x="12" y="42" fill="#fff" font-size="16" font-weight="800" font-family="system-ui" class="pbrd-ret-bi-vol">\u20AC 2,093,631</text>' +
        '<g transform="translate(12,52)">' +
          '<text x="0" y="10" fill="rgba(255,255,255,0.35)" font-size="6.5" font-family="system-ui">Transactions</text>' +
          '<text x="60" y="10" fill="rgba(255,255,255,0.35)" font-size="6.5" font-family="system-ui">Success Rate</text>' +
          '<text x="120" y="10" fill="rgba(255,255,255,0.35)" font-size="6.5" font-family="system-ui">Avg. Tx</text>' +
          '<text x="0" y="24" fill="#fff" font-size="10" font-weight="700" font-family="system-ui">16,532</text>' +
          '<text x="60" y="24" fill="#fff" font-size="10" font-weight="700" font-family="system-ui">92%</text>' +
          '<text x="120" y="24" fill="#fff" font-size="10" font-weight="700" font-family="system-ui">\u20AC142</text>' +
        '</g>' +
      '</g>' +
      /* Other currencies */
      '<g transform="translate(24,232)">' +
        '<text x="0" y="0" fill="rgba(255,255,255,0.25)" font-size="6.5" font-weight="600" letter-spacing="0.5" font-family="system-ui">OTHER CURRENCIES</text>' +
        '<g transform="translate(0,10)">' +
          '<rect x="0" y="0" width="52" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
          '<text x="8" y="12" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">AOA</text>' +
          '<text x="8" y="28" fill="#fff" font-size="8" font-weight="700" font-family="system-ui">Kz783.0M</text>' +
          '<rect x="58" y="0" width="52" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
          '<text x="66" y="12" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">BRL</text>' +
          '<text x="66" y="28" fill="#fff" font-size="8" font-weight="700" font-family="system-ui">R$60.0M</text>' +
          '<rect x="116" y="0" width="52" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
          '<text x="124" y="12" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">CZK</text>' +
          '<text x="124" y="28" fill="#fff" font-size="8" font-weight="700" font-family="system-ui">K\u010D3.6M</text>' +
        '</g>' +
      '</g>' +
      /* Bottom metrics */
      '<g transform="translate(24,290)">' +
        '<rect x="0" y="0" width="80" height="46" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
        '<circle cx="12" cy="14" r="5" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="0.8"/>' +
        '<path d="M9.5 14 L11 15.5 L14.5 12" stroke="#10b981" stroke-width="0.8" fill="none" stroke-linecap="round"/>' +
        '<text x="12" y="30" fill="rgba(255,255,255,0.3)" font-size="6" font-family="system-ui">Success Rate</text>' +
        '<text x="12" y="42" fill="#fff" font-size="12" font-weight="800" font-family="system-ui">92%</text>' +
        '<rect x="88" y="0" width="80" height="46" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
        '<text x="100" y="14" fill="rgba(255,255,255,0.3)" font-size="6" font-family="system-ui">Refunds</text>' +
        '<text x="100" y="30" fill="#fff" font-size="12" font-weight="800" font-family="system-ui">2,639</text>' +
      '</g>'
    );

    /* ── Phone 2: Analytics ── */
    var phone2 = phoneFrame("pbrd-ret-bi-p2",
      /* Revenue chart card */
      '<g transform="translate(24,60)">' +
        '<rect x="0" y="0" width="172" height="110" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
        /* Currency tabs */
        '<rect x="8" y="8" width="32" height="14" rx="7" fill="#2d3748"/><text x="24" y="18" text-anchor="middle" fill="#fff" font-size="5.5" font-weight="600" font-family="system-ui">EUR</text>' +
        '<text x="50" y="18" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">AOA</text>' +
        '<text x="72" y="18" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">BRL</text>' +
        '<text x="94" y="18" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">CZK</text>' +
        '<text x="8" y="36" fill="rgba(255,255,255,0.35)" font-size="6" font-family="system-ui">Total Revenue</text>' +
        '<text x="105" y="36" fill="#fff" font-size="9" font-weight="700" font-family="system-ui" text-anchor="end">\u20AC 2,093,631</text>' +
        /* Bar chart */
        '<g transform="translate(12,44)">' +
          '<rect x="0" y="48" width="30" height="12" rx="2" fill="rgba(147,130,220,0.25)"/><text x="15" y="46" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">\u20AC158.0K</text>' +
          '<rect x="38" y="28" width="30" height="32" rx="2" fill="rgba(147,130,220,0.4)"/><text x="53" y="26" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">\u20AC649.4K</text>' +
          '<rect x="76" y="6" width="30" height="54" rx="2" fill="rgba(99,25,240,0.7)"/><text x="91" y="4" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="5" font-weight="600" font-family="system-ui">\u20AC1.2M</text>' +
          '<rect x="114" y="46" width="30" height="14" rx="2" fill="rgba(147,130,220,0.2)"/><text x="129" y="44" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="5" font-family="system-ui">\u20AC132.7K</text>' +
          '<text x="15" y="68" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">00-06</text>' +
          '<text x="53" y="68" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">06-12</text>' +
          '<text x="91" y="68" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">12-18</text>' +
          '<text x="129" y="68" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="5" font-family="system-ui">18-24</text>' +
        '</g>' +
      '</g>' +

      /* Status Breakdown */
      '<g transform="translate(24,184)">' +
        '<text x="0" y="0" fill="#fff" font-size="10" font-weight="700" font-family="system-ui">Status Breakdown</text>' +
        /* Stacked bar */
        '<g transform="translate(0,12)">' +
          '<rect x="0" y="0" width="172" height="10" rx="5" fill="rgba(255,255,255,0.04)"/>' +
          '<rect x="0" y="0" width="140" height="10" rx="5" fill="#10b981"/>' +
          '<rect x="140" y="0" width="18" height="10" fill="#ef4444"/>' +
          '<rect x="158" y="0" width="14" height="10" rx="0 5 5 0" fill="#f59e0b"/>' +
        '</g>' +
        '<g transform="translate(0,32)">' +
          '<circle cx="5" cy="5" r="4" fill="#10b981"/><text x="14" y="9" fill="rgba(255,255,255,0.5)" font-size="7" font-family="system-ui">Success</text>' +
          '<text x="108" y="9" fill="#fff" font-size="8" font-weight="700" font-family="system-ui">11,832</text>' +
          '<text x="148" y="9" fill="rgba(255,255,255,0.3)" font-size="7" font-family="system-ui">(92%)</text>' +
        '</g>' +
        '<g transform="translate(0,50)">' +
          '<circle cx="5" cy="5" r="4" fill="#ef4444"/><text x="14" y="9" fill="rgba(255,255,255,0.5)" font-size="7" font-family="system-ui">Failed</text>' +
          '<text x="108" y="9" fill="#fff" font-size="8" font-weight="700" font-family="system-ui">772</text>' +
          '<text x="148" y="9" fill="rgba(255,255,255,0.3)" font-size="7" font-family="system-ui">(6%)</text>' +
        '</g>' +
        '<g transform="translate(0,68)">' +
          '<circle cx="5" cy="5" r="4" fill="#f59e0b"/><text x="14" y="9" fill="rgba(255,255,255,0.5)" font-size="7" font-family="system-ui">Pending</text>' +
          '<text x="108" y="9" fill="#fff" font-size="8" font-weight="700" font-family="system-ui">257</text>' +
          '<text x="148" y="9" fill="rgba(255,255,255,0.3)" font-size="7" font-family="system-ui">(2%)</text>' +
        '</g>' +
      '</g>' +

      /* Total Volume card */
      '<g transform="translate(24,300)">' +
        '<rect x="0" y="0" width="172" height="66" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
        '<text x="12" y="18" fill="rgba(255,255,255,0.35)" font-size="7" font-family="system-ui">Total Volume</text>' +
        '<text x="160" y="18" text-anchor="end" fill="#fff" font-size="10" font-weight="800" font-family="system-ui">\u20AC 2,282,684</text>' +
        /* Payment method bar */
        '<g transform="translate(12,28)">' +
          '<rect x="0" y="0" width="148" height="8" rx="4" fill="rgba(255,255,255,0.04)"/>' +
          '<rect x="0" y="0" width="52" height="8" rx="4" fill="#3b5bdb"/>' +
          '<rect x="52" y="0" width="38" height="8" fill="#10b981"/>' +
          '<rect x="90" y="0" width="24" height="8" fill="#f59e0b"/>' +
          '<rect x="114" y="0" width="16" height="8" fill="#ef4444"/>' +
          '<rect x="130" y="0" width="10" height="8" fill="#6366f1"/>' +
          '<rect x="140" y="0" width="8" height="8" rx="0 4 4 0" fill="#a855f7"/>' +
        '</g>' +
        '<g transform="translate(12,44)">' +
          '<circle cx="3" cy="3" r="2.5" fill="#3b5bdb"/><text x="9" y="6" fill="rgba(255,255,255,0.35)" font-size="5" font-family="system-ui">VISA</text>' +
          '<circle cx="36" cy="3" r="2.5" fill="#10b981"/><text x="42" y="6" fill="rgba(255,255,255,0.35)" font-size="5" font-family="system-ui">MASTER</text>' +
          '<circle cx="80" cy="3" r="2.5" fill="#f59e0b"/><text x="86" y="6" fill="rgba(255,255,255,0.35)" font-size="5" font-family="system-ui">MBWAY</text>' +
        '</g>' +
        '<g transform="translate(12,54)">' +
          '<circle cx="3" cy="3" r="2.5" fill="#6366f1"/><text x="9" y="6" fill="rgba(255,255,255,0.35)" font-size="5" font-family="system-ui">KLARNA</text>' +
          '<circle cx="48" cy="3" r="2.5" fill="#a855f7"/><text x="54" y="6" fill="rgba(255,255,255,0.35)" font-size="5" font-family="system-ui">PAYPAL</text>' +
          '<text x="92" y="6" fill="rgba(255,255,255,0.25)" font-size="5" font-family="system-ui">+8 more</text>' +
        '</g>' +
      '</g>'
    );

    /* ── Phone 3: Transactions ── */
    var phone3 = phoneFrame("pbrd-ret-bi-p3",
      '<g transform="translate(24,56)">' +
        '<text x="0" y="0" fill="#fff" font-size="14" font-weight="700" font-family="system-ui">Transactions</text>' +
        /* Filter pills */
        '<g transform="translate(0,14)">' +
          '<rect x="0" y="0" width="36" height="14" rx="7" fill="#6319f0"/><text x="18" y="10" text-anchor="middle" fill="#fff" font-size="5.5" font-weight="600" font-family="system-ui">Today</text>' +
          '<rect x="40" y="0" width="46" height="14" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/><text x="63" y="10" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">All Stores</text>' +
          '<rect x="92" y="0" width="36" height="14" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/><text x="110" y="10" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">Filters</text>' +
        '</g>' +
      '</g>' +
      /* Transaction rows */
      '<g transform="translate(24,100)">' +
        /* Row 1 */
        '<circle cx="8" cy="8" r="7" fill="rgba(16,185,129,0.12)"/><path d="M5 8 L7 10 L11 6" stroke="#10b981" stroke-width="1" fill="none" stroke-linecap="round"/>' +
        '<text x="22" y="6" fill="#fff" font-size="7" font-weight="600" font-family="system-ui">\u20AC 9.45</text>' +
        '<text x="22" y="14" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">NONE</text>' +
        '<text x="156" y="10" text-anchor="end" fill="rgba(255,255,255,0.2)" font-size="5.5" font-family="system-ui">09:45</text>' +
        '<line x1="0" y1="22" x2="168" y2="22" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
        /* Row 2 */
        '<circle cx="8" cy="34" r="7" fill="rgba(16,185,129,0.12)"/><path d="M5 34 L7 36 L11 32" stroke="#10b981" stroke-width="1" fill="none" stroke-linecap="round"/>' +
        '<text x="22" y="32" fill="#fff" font-size="7" font-weight="600" font-family="system-ui">\u20AC 41.21</text>' +
        '<text x="22" y="40" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">APPLE PAY</text>' +
        '<text x="156" y="36" text-anchor="end" fill="rgba(255,255,255,0.2)" font-size="5.5" font-family="system-ui">09:41</text>' +
        '<line x1="0" y1="48" x2="168" y2="48" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
        /* Row 3 */
        '<circle cx="8" cy="60" r="7" fill="rgba(16,185,129,0.12)"/><path d="M5 60 L7 62 L11 58" stroke="#10b981" stroke-width="1" fill="none" stroke-linecap="round"/>' +
        '<text x="22" y="58" fill="#fff" font-size="7" font-weight="600" font-family="system-ui">\u20AC 9.90</text>' +
        '<text x="22" y="66" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">VISA</text>' +
        '<text x="156" y="62" text-anchor="end" fill="rgba(255,255,255,0.2)" font-size="5.5" font-family="system-ui">09:38</text>' +
        '<line x1="0" y1="74" x2="168" y2="74" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
        /* Row 4 */
        '<circle cx="8" cy="86" r="7" fill="rgba(245,158,11,0.12)"/><text x="8" y="90" text-anchor="middle" fill="#f59e0b" font-size="7" font-family="system-ui">\u2022</text>' +
        '<text x="22" y="84" fill="#fff" font-size="7" font-weight="600" font-family="system-ui">\u20AC 16,306.68</text>' +
        '<text x="22" y="92" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">MULTIBANCO</text>' +
        '<text x="156" y="88" text-anchor="end" fill="rgba(255,255,255,0.2)" font-size="5.5" font-family="system-ui">09:32</text>' +
        '<line x1="0" y1="100" x2="168" y2="100" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
        /* Row 5 */
        '<circle cx="8" cy="112" r="7" fill="rgba(16,185,129,0.12)"/><path d="M5 112 L7 114 L11 110" stroke="#10b981" stroke-width="1" fill="none" stroke-linecap="round"/>' +
        '<text x="22" y="110" fill="#fff" font-size="7" font-weight="600" font-family="system-ui">\u20AC 87.50</text>' +
        '<text x="22" y="118" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">MASTERCARD</text>' +
        '<text x="156" y="114" text-anchor="end" fill="rgba(255,255,255,0.2)" font-size="5.5" font-family="system-ui">09:28</text>' +
        '<line x1="0" y1="126" x2="168" y2="126" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>' +
        /* Row 6 */
        '<circle cx="8" cy="138" r="7" fill="rgba(239,68,68,0.12)"/><text x="8" y="141" text-anchor="middle" fill="#ef4444" font-size="6" font-weight="700" font-family="system-ui">\u2715</text>' +
        '<text x="22" y="136" fill="#fff" font-size="7" font-weight="600" font-family="system-ui">\u20AC 234.00</text>' +
        '<text x="22" y="144" fill="rgba(255,255,255,0.3)" font-size="5.5" font-family="system-ui">VISA</text>' +
        '<text x="156" y="140" text-anchor="end" fill="rgba(255,255,255,0.2)" font-size="5.5" font-family="system-ui">09:15</text>' +
      '</g>' +

      /* Transaction detail overlay — slides in */
      '<g class="pbrd-ret-bi-detail">' +
        '<rect x="14" y="120" width="192" height="300" rx="16" fill="#0e0e18" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
        '<rect x="14" y="120" width="192" height="80" rx="16" fill="#6319f0"/>' +
        '<rect x="14" y="184" width="192" height="16" fill="#6319f0"/>' +
        '<text x="110" y="152" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="7" font-family="system-ui">Transaction</text>' +
        '<text x="110" y="180" text-anchor="middle" fill="#fff" font-size="24" font-weight="700" font-family="system-ui">\u20AC 47.94</text>' +
        '<rect x="88" y="190" width="44" height="14" rx="7" fill="rgba(16,185,129,0.15)"/><text x="110" y="200" text-anchor="middle" fill="#10b981" font-size="6" font-weight="600" font-family="system-ui">CAPTURED</text>' +
        '<text x="34" y="226" fill="rgba(255,255,255,0.3)" font-size="6" font-family="system-ui">Refund Transaction</text>' +
        '<rect x="34" y="232" width="152" height="22" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>' +
        '<text x="34" y="262" fill="rgba(255,255,255,0.3)" font-size="6" font-family="system-ui">Payment Info</text>' +
        '<text x="34" y="276" fill="rgba(255,255,255,0.5)" font-size="6.5" font-family="system-ui">VISA \u2022\u2022\u2022\u2022 4582 \u00b7 3DS Secured</text>' +
      '</g>'
    );

    /* ── Context pills ── */
    var pills =
      '<div class="pbrd-ret-bi-pills pbrd-ret-reveal">' +
        '<div class="pbrd-ret-bi-pill"><span class="pbrd-ret-bi-pill-icon">\uD83C\uDFE2</span>At the store</div>' +
        '<div class="pbrd-ret-bi-pill"><span class="pbrd-ret-bi-pill-icon">\u2708\uFE0F</span>On holiday</div>' +
        '<div class="pbrd-ret-bi-pill"><span class="pbrd-ret-bi-pill-icon">\uD83C\uDFE0</span>At home</div>' +
        '<div class="pbrd-ret-bi-pill"><span class="pbrd-ret-bi-pill-icon">\uD83D\uDCF1</span>On the go</div>' +
      '</div>';

    wrap.innerHTML =
      '<div class="pbrd-ret-bi-header pbrd-ret-reveal">' +
        '<div class="pbrd-ret-section-label">REAL-TIME INTELLIGENCE</div>' +
        '<h2 class="pbrd-ret-bi-h2">Your entire business.<br>Always in your pocket.</h2>' +
        '<p class="pbrd-ret-bi-sub">Revenue, transactions, refunds, status breakdowns, payment methods \u2014 every data point that matters, updating in real time. Whether you\u2019re behind the counter or on the other side of the world.</p>' +
      '</div>' +
      pills +
      '<div class="pbrd-ret-bi-phones pbrd-ret-reveal">' +
        phone1 + phone2 + phone3 +
      '</div>' +
      '<div class="pbrd-ret-bi-dots pbrd-ret-reveal">' +
        '<div class="pbrd-ret-bi-dot pbrd-ret-bi-dot--active" data-idx="0"></div>' +
        '<div class="pbrd-ret-bi-dot" data-idx="1"></div>' +
        '<div class="pbrd-ret-bi-dot" data-idx="2"></div>' +
      '</div>' +
      '<div class="pbrd-ret-bi-label pbrd-ret-reveal">Dashboard Overview</div>' +
      '<p class="pbrd-ret-bi-footer pbrd-ret-reveal">Not a single second of your business-critical data goes unseen.</p>';

    section.appendChild(wrap);

    /* ── Carousel rotation ── */
    var phones = wrap.querySelectorAll(".pbrd-ret-bi-phone");
    var dots = wrap.querySelectorAll(".pbrd-ret-bi-dot");
    var label = wrap.querySelector(".pbrd-ret-bi-label");
    var labels = ["Dashboard Overview", "Revenue Analytics", "Live Transactions"];
    var current = 0;

    function showPhone(idx) {
      phones.forEach(function(p, i) {
        p.classList.remove("pbrd-ret-bi-phone--active", "pbrd-ret-bi-phone--prev", "pbrd-ret-bi-phone--next");
        if (i === idx) p.classList.add("pbrd-ret-bi-phone--active");
        else if (i === (idx - 1 + 3) % 3) p.classList.add("pbrd-ret-bi-phone--prev");
        else p.classList.add("pbrd-ret-bi-phone--next");
      });
      dots.forEach(function(d, i) {
        d.classList.toggle("pbrd-ret-bi-dot--active", i === idx);
      });
      if (label) label.textContent = labels[idx];
      current = idx;
    }

    showPhone(0);

    /* Auto-rotate every 4s */
    var autoTimer = setInterval(function() {
      showPhone((current + 1) % 3);
    }, 4000);

    /* Click dots to jump */
    dots.forEach(function(dot) {
      dot.addEventListener("click", function() {
        clearInterval(autoTimer);
        showPhone(parseInt(dot.getAttribute("data-idx")));
        autoTimer = setInterval(function() {
          showPhone((current + 1) % 3);
        }, 4000);
      });
    });

    observeReveal(".pbrd-ret-bi-wrap .pbrd-ret-reveal", 150);
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
    if (quoteWrap) {
      quoteWrap.style.setProperty("padding", "0", "important");
      quoteWrap.style.setProperty("margin", "0", "important");
      quoteWrap.style.setProperty("display", "contents", "important");
      /* Kill whitespace gap between quote_wrap and next section */
      var nextSib = quoteWrap.nextElementSibling;
      if (nextSib) { nextSib.style.setProperty("margin-top", "0", "important"); nextSib.style.setProperty("padding-top", "0", "important"); }
    }
    /* Also collapse spacers inside testimonial section */
    section.querySelectorAll(".u-section-spacer").forEach(function(sp) { sp.style.setProperty("display", "none", "important"); });

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
    buildSolutions();
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
