/* Paybyrd — Airlines Page Enhancements */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/airlines")) return;

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

  function findSectionByHeading(text) {
    var found = null;
    document.querySelectorAll("h1, h2, h3").forEach(function (h) {
      if (!found && h.textContent.toLowerCase().includes(text.toLowerCase())) {
        found = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    return found;
  }

  function findHeading(text) {
    var found = null;
    document.querySelectorAll("h1, h2, h3").forEach(function (h) {
      if (!found && h.textContent.toLowerCase().includes(text.toLowerCase())) {
        found = h;
      }
    });
    return found;
  }

  /* ─── Counter animation ─── */
  function animateCounter(el, target, suffix) {
    suffix = suffix || "";
    var duration = 1500;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      var current = Math.round(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════ */
  /* 1. Hero Enhancement                         */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heading = findHeading("modern payments for airlines");
    if (!heading) return;

    heading.innerHTML = "The airline payment platform<br>that outperforms Adyen.";

    /* Find subtitle */
    var subtitle = heading.nextElementSibling;
    if (subtitle && subtitle.tagName === "P") {
      subtitle.textContent = "Higher approval rates. Lower fraud. Zero downtime. Ask TAP Air Portugal.";
    }

    /* Add CTA button */
    var cta = document.createElement("a");
    cta.href = "/book-demo";
    cta.className = "pbrd-air-hero-cta pbrd-air-reveal";
    cta.textContent = "Book a 15-min Demo \u2192";
    var ctaParent = subtitle ? subtitle.parentElement : heading.parentElement;
    if (subtitle) {
      ctaParent.insertBefore(cta, subtitle.nextSibling);
    } else {
      ctaParent.insertBefore(cta, heading.nextSibling);
    }

    /* Social proof line */
    var proof = document.createElement("div");
    proof.className = "pbrd-air-hero-proof pbrd-air-reveal";
    proof.textContent = "Trusted by TAP Air Portugal and Europe\u2019s leading carriers";
    ctaParent.insertBefore(proof, cta.nextSibling);

    /* Stat ticker — competitor comparisons */
    var tickerData = [
      { val: "+4.86%", lbl: "higher approval rate vs Checkout.com" },
      { val: "+3.16%", lbl: "higher approval rate vs Elavon" },
      { val: "+1.72%", lbl: "higher approval rate vs Adyen" },
      { val: "+4.92%", lbl: "higher approval rate vs Nuvei" },
      { val: "99.999%", lbl: "uptime \u2014 zero revenue lost to downtime" },
      { val: "192+", lbl: "currencies with local routing" }
    ];

    var ticker = document.createElement("div");
    ticker.className = "pbrd-air-ticker pbrd-air-reveal";

    var dotsWrap = document.createElement("div");
    dotsWrap.className = "pbrd-air-ticker-dots";

    tickerData.forEach(function (d, i) {
      var item = document.createElement("div");
      item.className = "pbrd-air-ticker-item" + (i === 0 ? " pbrd-air-ticker--active" : "");
      item.innerHTML = '<span class="pbrd-air-ticker-val">' + d.val + '</span><span class="pbrd-air-ticker-lbl">' + d.lbl + '</span>';
      ticker.appendChild(item);

      var dot = document.createElement("div");
      dot.className = "pbrd-air-ticker-dot" + (i === 0 ? " pbrd-air-ticker--active" : "");
      dotsWrap.appendChild(dot);
    });

    ctaParent.insertBefore(ticker, proof.nextSibling);
    ctaParent.insertBefore(dotsWrap, ticker.nextSibling);

    /* Auto-rotate ticker */
    var currentTick = 0;
    setInterval(function () {
      var items = ticker.querySelectorAll(".pbrd-air-ticker-item");
      var dots = dotsWrap.querySelectorAll(".pbrd-air-ticker-dot");
      items[currentTick].classList.remove("pbrd-air-ticker--active");
      dots[currentTick].classList.remove("pbrd-air-ticker--active");
      currentTick = (currentTick + 1) % tickerData.length;
      items[currentTick].classList.add("pbrd-air-ticker--active");
      dots[currentTick].classList.add("pbrd-air-ticker--active");
    }, 3000);

    observeReveal(".pbrd-air-reveal", 120);
  }

  /* ═══════════════════════════════════════════ */
  /* 2. Problem Section — $1B Stat Cards         */
  /* ═══════════════════════════════════════════ */

  function enhanceProblem() {
    var heading = findHeading("airline payments are complex");
    if (!heading) return;

    heading.innerHTML = "$1 billion lost to fraud annually.<br>Airlines deserve better.";

    /* Add stat cards after the existing paragraphs */
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    var grid = document.createElement("div");
    grid.className = "pbrd-air-problem-grid";

    var stats = [
      { val: "$1B+", num: 1, lbl: "Annual airline fraud losses", suffix: "" },
      { val: "79%", num: 79, lbl: "Cart abandonment at checkout", suffix: "%" },
      { val: "20-30%", num: 25, lbl: "Sales lost without local payment methods", suffix: "%" },
      { val: "1hr", num: 0, lbl: "Of downtime = millions in lost revenue", suffix: "" }
    ];

    stats.forEach(function (s) {
      var card = document.createElement("div");
      card.className = "pbrd-air-problem-card pbrd-air-reveal";
      card.innerHTML =
        '<div class="pbrd-air-problem-val">' + s.val + '</div>' +
        '<div class="pbrd-air-problem-lbl">' + s.lbl + '</div>';
      grid.appendChild(card);
    });

    /* Find the last paragraph in the section and insert grid after it */
    var paragraphs = section.querySelectorAll("p");
    var lastP = paragraphs[paragraphs.length - 1];
    if (lastP) {
      lastP.parentElement.insertBefore(grid, lastP.nextSibling);
    } else {
      section.appendChild(grid);
    }

    observeReveal(".pbrd-air-reveal", 150, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 3. Features Grid — Benchmark + Enhanced     */
  /* ═══════════════════════════════════════════ */

  function enhanceFeatures() {
    var heading = findHeading("built for the way airlines");
    if (!heading) return;

    heading.textContent = "Built for airlines. Proven in production.";

    /* Enhance card descriptions with specific stats */
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    var cardTexts = [
      { find: "global", replace: "Process in 192+ currencies with local routing. Transactions clear through regional acquirers for 4\u20137% higher authorization rates and 10\u201315% lower cross-border fees." },
      { find: "dashboard", replace: "Route-level filters, real-time reconciliation, and role-based views for finance, ops, and customer service. See performance by country, channel, or payment method." },
      { find: "fraud", replace: "AI velocity screening with shared fraud database. 3D Secure, advanced transaction screening, and automated dispute handling. Result: 16.8% chargeback reduction." },
      { find: "flexibility", replace: "Modular architecture connects directly to Amadeus, IATA, GDS, BSP, and NDC systems. Self-host payment modules or use our full-stack solution." }
    ];

    section.querySelectorAll("p").forEach(function (p) {
      var text = p.textContent.toLowerCase();
      cardTexts.forEach(function (ct) {
        if (text.includes(ct.find)) {
          p.textContent = ct.replace;
        }
      });
    });

    /* Add benchmark table AFTER the card grid */
    var cardGrid = section.querySelector("[class*='grid']");
    if (!cardGrid) return;

    var bench = document.createElement("div");
    bench.className = "pbrd-air-benchmark pbrd-air-reveal";

    bench.innerHTML =
      '<div class="pbrd-air-bench-header">' +
        '<h4>Approval Rate Advantage vs Competitors</h4>' +
        '<p>Based on production data from airline transactions</p>' +
      '</div>' +
      '<div class="pbrd-air-bench-row">' +
        '<span class="pbrd-air-bench-name">vs Adyen</span>' +
        '<div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar" data-width="35"></div></div>' +
        '<span class="pbrd-air-bench-val">+1.72%</span>' +
      '</div>' +
      '<div class="pbrd-air-bench-row">' +
        '<span class="pbrd-air-bench-name">vs Elavon</span>' +
        '<div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar" data-width="64"></div></div>' +
        '<span class="pbrd-air-bench-val">+3.16%</span>' +
      '</div>' +
      '<div class="pbrd-air-bench-row">' +
        '<span class="pbrd-air-bench-name">vs Checkout.com</span>' +
        '<div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar" data-width="98"></div></div>' +
        '<span class="pbrd-air-bench-val">+4.86%</span>' +
      '</div>' +
      '<div class="pbrd-air-bench-row">' +
        '<span class="pbrd-air-bench-name">vs Nuvei</span>' +
        '<div class="pbrd-air-bench-bar-wrap"><div class="pbrd-air-bench-bar" data-width="100"></div></div>' +
        '<span class="pbrd-air-bench-val">+4.92%</span>' +
      '</div>';

    /* Walk up from cardGrid to find insertion point */
    var insertTarget = cardGrid;
    while (insertTarget.parentElement && window.getComputedStyle(insertTarget.parentElement).display === "contents") {
      insertTarget = insertTarget.parentElement;
    }
    insertTarget.parentElement.insertBefore(bench, insertTarget.nextSibling);

    /* Animate bars on scroll */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          bench.querySelectorAll(".pbrd-air-bench-bar").forEach(function (bar) {
            var w = bar.getAttribute("data-width");
            setTimeout(function () { bar.style.width = w + "%"; }, 300);
          });
          this.disconnect();
        }
      }, { threshold: 0.3 }).observe(bench);
    }

    observeReveal(".pbrd-air-reveal", 100, section);
  }

  /* ═══════════════════════════════════════════ */
  /* 4. TAP Testimonial — NEW Section            */
  /* ═══════════════════════════════════════════ */

  function buildTestimonial() {
    /* Insert after the features/data sections, before passenger journey */
    var passengerSection = findSectionByHeading("designed for the passenger") || findSectionByHeading("works with your stack");
    if (!passengerSection) return;

    var newSection = document.createElement("section");
    newSection.style.padding = "60px 0";
    newSection.style.position = "relative";

    var wrap = document.createElement("div");
    wrap.className = "pbrd-air-testimonial-wrap";

    wrap.innerHTML =
      '<div class="pbrd-air-section-label" style="text-align:center;margin-bottom:32px;">TRUSTED BY INDUSTRY LEADERS</div>' +
      '<div class="pbrd-air-testimonial pbrd-air-reveal">' +
        '<p class="pbrd-air-testimonial-quote">The A77 Terminal, developed in collaboration with Paybyrd, emerged as a true powerhouse, revolutionizing the entire process at Boarding Gates.</p>' +
        '<div class="pbrd-air-testimonial-author">' +
          '<div class="pbrd-air-testimonial-avatar">JF</div>' +
          '<div class="pbrd-air-testimonial-info">' +
            '<div class="pbrd-air-testimonial-name">Jo\u00E3o Frias</div>' +
            '<div class="pbrd-air-testimonial-role">Head of Payments</div>' +
            '<div class="pbrd-air-testimonial-logo">TAP Air Portugal</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    newSection.appendChild(wrap);
    passengerSection.parentNode.insertBefore(newSection, passengerSection);

    observeReveal(".pbrd-air-reveal", 100, wrap);
  }

  /* ═══════════════════════════════════════════ */
  /* 5. Bottom CTA Rewrite                       */
  /* ═══════════════════════════════════════════ */

  function enhanceBottomCTA() {
    var heading = findHeading("turbulence");
    if (!heading) return;

    heading.innerHTML = "Set your airline free.<br>Let your money flow.";

    /* Find subtitle */
    var section = heading.closest("section") || heading.closest("[class*='section']");
    if (!section) return;

    section.querySelectorAll("p").forEach(function (p) {
      if (p.textContent.toLowerCase().includes("unlock") || p.textContent.toLowerCase().includes("revenue potential")) {
        p.textContent = "Join TAP Air Portugal and Europe\u2019s leading carriers. Most airlines see results within 30 days.";
      }
    });

    /* Style the CTA button */
    section.querySelectorAll("a").forEach(function (a) {
      if (a.textContent.toLowerCase().includes("start now")) {
        a.textContent = "Book Your 15-Minute Demo \u2192";
        a.href = "/book-demo";
        a.style.setProperty("background", "#FF6B35", "important");
        a.style.setProperty("color", "#fff", "important");
        a.style.setProperty("border-radius", "100px", "important");
        a.style.setProperty("padding", "14px 36px", "important");
        a.style.setProperty("font-weight", "600", "important");
        a.style.setProperty("text-decoration", "none", "important");
      }
    });
  }

  /* ═══════════════════════════════════════════ */
  /* 6. FAQ Enhancement                          */
  /* ═══════════════════════════════════════════ */

  function enhanceFAQ() {
    /* Update FAQ answers with real data */
    document.querySelectorAll("[class*='accordion'] p, [class*='faq'] p").forEach(function (p) {
      var text = p.textContent.toLowerCase();
      if (text.includes("reconciling ticket payments")) {
        p.textContent = "Typically 2\u20134 weeks for full integration. We connect to your existing stack (Amadeus, IATA, GDS) without disrupting live operations. TAP Air Portugal went live across all channels within weeks.";
      }
      if (text.includes("smart routing and fx")) {
        p.textContent = "Our platform uses smart multi-acquiring and FX optimization to lower fees. Airlines using Paybyrd have cut transaction costs by up to 15%, with 10\u201315% reduction in cross-border fees through local routing.";
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

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
