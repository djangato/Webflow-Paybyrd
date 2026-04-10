/* Paybyrd — Hero Enhancement, Sticky CTA, Exit Intent */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ═══════════════════════════════════════════ */
  /* 1. Animated Gradient Mesh Background       */
  /* ═══════════════════════════════════════════ */

  function initMesh() {
    var mesh = document.createElement("div");
    mesh.className = "pbrd-hero-mesh";
    mesh.innerHTML = '<div class="pbrd-mesh-blob"></div><div class="pbrd-mesh-blob"></div><div class="pbrd-mesh-blob"></div>';
    document.body.insertBefore(mesh, document.body.firstChild);

    // Fade out mesh on scroll
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY || window.pageYOffset;
          var opacity = Math.max(0, 1 - scrollY / 600);
          mesh.style.opacity = String(opacity);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
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
    setInterval(showNext, 3500);
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
        '<a href="https://onboard.paybyrd.com/" class="pbrd-sticky-btn">Get Started Free</a>' +
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
        '<button class="pbrd-exit-close">\u00D7</button>' +
        '<div class="pbrd-exit-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<h3>Before you go\u2026</h3>' +
        '<p>See how Paybyrd can increase your approval rates and reduce payment costs with a free, no-commitment consultation.</p>' +
        '<a href="/book-demo" class="pbrd-exit-cta">Book a Free Consultation</a>' +
        '<button class="pbrd-exit-skip">No thanks, I\u2019ll explore on my own</button>' +
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
    initMesh();
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
