/* Paybyrd — Hero Enhancement, Sticky CTA, Exit Intent */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ═══════════════════════════════════════════ */
  /* 1. Animated Gradient Mesh Background       */
  /* ═══════════════════════════════════════════ */

  function initFibers() {
    var container = document.createElement("div");
    container.className = "pbrd-hero-fibers";

    // Fibers spread across the full viewport height
    var fibers = [
      // Top cluster (hero area) — slightly brighter
      { top: 8, left: -5, width: 65, angle: 1.5, color: "rgba(140,120,220,0.35)", glow: "rgba(160,140,255,0.6)", dur: 4, travel: 3.5, delay: 0 },
      { top: 18, left: 10, width: 80, angle: -1.2, color: "rgba(100,130,240,0.3)", glow: "rgba(120,150,255,0.55)", dur: 5, travel: 4.2, delay: 1.2 },
      { top: 30, left: -8, width: 70, angle: 0.8, color: "rgba(150,100,220,0.25)", glow: "rgba(170,130,255,0.5)", dur: 6, travel: 5, delay: 0.5 },

      // Middle section
      { top: 38, left: 15, width: 55, angle: -1.8, color: "rgba(120,140,255,0.18)", glow: "rgba(140,160,255,0.4)", dur: 5.5, travel: 4.5, delay: 2 },
      { top: 46, left: -3, width: 75, angle: 1, color: "rgba(130,100,210,0.15)", glow: "rgba(160,130,240,0.35)", dur: 7, travel: 5.5, delay: 0.8 },
      { top: 54, left: 20, width: 50, angle: -0.5, color: "rgba(100,120,230,0.14)", glow: "rgba(130,150,255,0.3)", dur: 6, travel: 4.8, delay: 3 },

      // Lower section
      { top: 64, left: -6, width: 68, angle: 1.3, color: "rgba(140,110,220,0.12)", glow: "rgba(170,140,255,0.28)", dur: 5, travel: 5.2, delay: 1.5 },
      { top: 72, left: 12, width: 60, angle: -1.5, color: "rgba(110,130,240,0.1)", glow: "rgba(140,160,255,0.25)", dur: 6.5, travel: 6, delay: 2.5 },
      { top: 80, left: -2, width: 72, angle: 0.6, color: "rgba(130,100,220,0.1)", glow: "rgba(160,130,255,0.22)", dur: 7.5, travel: 5.8, delay: 4 },

      // Bottom
      { top: 88, left: 8, width: 55, angle: -0.8, color: "rgba(100,120,240,0.08)", glow: "rgba(130,150,255,0.2)", dur: 6, travel: 6.5, delay: 1 },
      { top: 94, left: -4, width: 65, angle: 1.2, color: "rgba(140,120,220,0.08)", glow: "rgba(160,140,255,0.18)", dur: 8, travel: 7, delay: 3.5 },
    ];

    fibers.forEach(function (f) {
      var el = document.createElement("div");
      el.className = "pbrd-fiber";
      el.style.cssText =
        "top:" + f.top + "%;" +
        "left:" + f.left + "%;" +
        "width:" + f.width + "%;" +
        "transform:rotate(" + f.angle + "deg);" +
        "--color:" + f.color + ";" +
        "--glow:" + f.glow + ";" +
        "--dur:" + f.dur + "s;" +
        "--travel:" + f.travel + "s;" +
        "--delay:" + f.delay + "s;";
      container.appendChild(el);
    });

    document.body.insertBefore(container, document.body.firstChild);
  }

  /* ═══════════════════════════════════════════ */
  /* 2. Live Transaction Ticker                 */
  /* ═══════════════════════════════════════════ */

  var tickerData = [
    { amount: "\u20AC47.90", method: "Visa", city: "Lisbon" },
    { amount: "\u20AC183.00", method: "Mastercard", city: "Amsterdam" },
    { amount: "\u20AC12.50", method: "MB Way", city: "Porto" },
    { amount: "\u20AC299.00", method: "Klarna", city: "Berlin" },
    { amount: "\u20AC64.30", method: "Apple Pay", city: "London" },
    { amount: "R$156.00", method: "PIX", city: "S\u00E3o Paulo" },
    { amount: "\u20AC421.80", method: "SEPA", city: "Munich" },
    { amount: "\u20AC38.90", method: "PayPal", city: "Paris" },
    { amount: "\u20AC89.00", method: "iDEAL", city: "Rotterdam" },
    { amount: "\u20AC1,240.00", method: "Amex", city: "Dubai" },
    { amount: "Kz45,000", method: "Multicaixa", city: "Luanda" },
    { amount: "\u20AC27.50", method: "Google Pay", city: "Madrid" }
  ];

  function initTicker() {
    var heroWrap = document.querySelector(".hero-main_layout") || document.querySelector(".hero-main_contain");
    if (!heroWrap) return;

    // Find the button wrapper to insert after
    var btnWrap = heroWrap.querySelector(".u-button-wrapper");
    if (!btnWrap) return;

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ticker-wrap";
    wrap.innerHTML =
      '<div class="pbrd-ticker">' +
        '<div class="pbrd-ticker-dot"></div>' +
        '<div class="pbrd-ticker-text"><span class="pbrd-ticker-item"></span></div>' +
        '<span class="pbrd-ticker-time">just now</span>' +
      '</div>';

    btnWrap.insertAdjacentElement("afterend", wrap);

    var textEl = wrap.querySelector(".pbrd-ticker-item");
    var timeEl = wrap.querySelector(".pbrd-ticker-time");
    var idx = 0;
    var times = ["just now", "2s ago", "5s ago", "just now", "1s ago", "3s ago"];

    function showNext() {
      var t = tickerData[idx % tickerData.length];
      textEl.className = "";
      void textEl.offsetWidth; // force reflow
      textEl.className = "pbrd-ticker-item";
      textEl.innerHTML = '<span class="pbrd-ticker-amount">' + t.amount + '</span> \u00B7 <span class="pbrd-ticker-method">' + t.method + '</span> \u00B7 ' + t.city;
      timeEl.textContent = times[idx % times.length];
      idx++;
    }

    showNext();
    setInterval(showNext, 2200);
  }

  /* ═══════════════════════════════════════════ */
  /* 3. Sticky CTA Bar                          */
  /* ═══════════════════════════════════════════ */

  function initStickyCTA() {
    var bar = document.createElement("div");
    bar.className = "pbrd-sticky-cta";
    bar.innerHTML =
      '<div class="pbrd-sticky-inner">' +
        '<div class="pbrd-sticky-text"><strong>Start processing payments today.</strong> No setup fees, no commitment.</div>' +
        '<a href="https://beta.paybyrd.com" class="pbrd-sticky-btn">Get Started Free</a>' +
        '<button class="pbrd-sticky-dismiss">\u00D7</button>' +
      '</div>';
    document.body.appendChild(bar);

    var dismissed = false;
    var heroHeight = 0;
    var hero = document.querySelector(".hero-main_contain");
    if (hero) heroHeight = hero.offsetTop + hero.offsetHeight;

    // Show after scrolling past the hero
    window.addEventListener("scroll", function () {
      if (dismissed) return;
      var scrollY = window.scrollY || window.pageYOffset;
      bar.classList.toggle("visible", scrollY > heroHeight);
    }, { passive: true });

    // Dismiss button
    bar.querySelector(".pbrd-sticky-dismiss").addEventListener("click", function () {
      dismissed = true;
      bar.classList.remove("visible");
      sessionStorage.setItem("pbrd-sticky-dismissed", "1");
    });

    // Check if already dismissed this session
    if (sessionStorage.getItem("pbrd-sticky-dismissed")) {
      dismissed = true;
    }
  }

  /* ═══════════════════════════════════════════ */
  /* 4. Exit Intent Popup                       */
  /* ═══════════════════════════════════════════ */

  function initExitIntent() {
    var shown = false;

    var overlay = document.createElement("div");
    overlay.className = "pbrd-exit-overlay";
    overlay.innerHTML =
      '<div class="pbrd-exit-card">' +
        '<div class="pbrd-exit-accent"></div>' +
        '<button class="pbrd-exit-close">\u00D7</button>' +
        '<div class="pbrd-exit-body">' +
          '<div class="pbrd-exit-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
          '<h3>Get a tailored payment proposal</h3>' +
          '<p class="pbrd-exit-subtitle">In 15 minutes, we\u2019ll show you exactly how much you can save and which payment methods will grow your revenue.</p>' +
          '<div class="pbrd-exit-proof">' +
            '<div class="pbrd-exit-proof-item"><span class="pbrd-exit-proof-val">98%</span><span class="pbrd-exit-proof-lbl">Approval rate</span></div>' +
            '<div class="pbrd-exit-proof-item"><span class="pbrd-exit-proof-val">24h</span><span class="pbrd-exit-proof-lbl">Setup time</span></div>' +
            '<div class="pbrd-exit-proof-item"><span class="pbrd-exit-proof-val">\u20AC0</span><span class="pbrd-exit-proof-lbl">Setup fee</span></div>' +
          '</div>' +
          '<a href="/book-demo" class="pbrd-exit-cta">Book a 15-Min Call \u2192</a>' +
          '<button class="pbrd-exit-skip">I\u2019ll come back later</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    function showPopup() {
      if (shown) return;
      if (sessionStorage.getItem("pbrd-exit-shown")) return;
      shown = true;
      sessionStorage.setItem("pbrd-exit-shown", "1");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closePopup() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    // Exit intent: mouse leaves viewport at the top
    document.addEventListener("mouseout", function (e) {
      if (e.clientY <= 0 && e.relatedTarget === null) {
        // Only trigger after user has been on the page for 5+ seconds
        showPopup();
      }
    });

    // Close handlers
    overlay.querySelector(".pbrd-exit-close").addEventListener("click", closePopup);
    overlay.querySelector(".pbrd-exit-skip").addEventListener("click", closePopup);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) closePopup();
    });

    // Delay activation — don't trigger exit intent in the first 5 seconds
    var activated = false;
    setTimeout(function () { activated = true; }, 5000);
    var origShow = showPopup;
    showPopup = function () {
      if (activated) origShow();
    };
  }

  /* ─── Init All ─── */
  function init() {
    initFibers();
    initTicker();
    initStickyCTA();
    initExitIntent();
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
