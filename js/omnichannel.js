/* Paybyrd — Omnichannel Page Enhancements */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/omnichannel")) return;

  var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";
  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/customers/";

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

  /* ═══════════════════════════════════════════ */
  /* Section 1: Hero Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heroH1 = document.querySelector(".hero-2_wrap h1, .hero-main_layout h1, [data-wf--section--theme] h1");
    if (!heroH1) return;

    /* Kicker above H1 */
    var kicker = document.createElement("div");
    kicker.className = "pbrd-oc-kicker";
    kicker.textContent = "The problem isn\u2019t your channels";
    heroH1.parentElement.insertBefore(kicker, heroH1);

    /* Enhanced subtitle below existing subtitle */
    var heroP = heroH1.parentElement.querySelector("p");
    if (heroP) {
      var sub = document.createElement("p");
      sub.className = "pbrd-oc-hero-sub";
      sub.textContent = "Your POS doesn\u2019t know your website. Your website doesn\u2019t know your store. Paybyrd connects them \u2014 so every customer is recognized, everywhere.";
      heroP.insertAdjacentElement("afterend", sub);
    }

    /* Connection animation */
    var posSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="7" r="1" fill="currentColor"/></svg>';
    var browserSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h20" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="5.5" r="1" fill="currentColor"/><circle cx="8.5" cy="5.5" r="1" fill="currentColor"/></svg>';
    var mobileSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M10 19h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

    var connHTML =
      '<div class="pbrd-oc-connection">' +
        '<div>' +
          '<div class="pbrd-oc-node">' + posSVG + '</div>' +
          '<span class="pbrd-oc-node-label">POS</span>' +
        '</div>' +
        '<div class="pbrd-oc-pulse-line"></div>' +
        '<div>' +
          '<div class="pbrd-oc-node">' + browserSVG + '</div>' +
          '<span class="pbrd-oc-node-label">Online</span>' +
        '</div>' +
        '<div class="pbrd-oc-pulse-line"></div>' +
        '<div>' +
          '<div class="pbrd-oc-node">' + mobileSVG + '</div>' +
          '<span class="pbrd-oc-node-label">Mobile</span>' +
        '</div>' +
      '</div>';

    /* Find a good insertion point — after the CTA buttons or after the subtitle */
    var ctaWrap = heroH1.closest(".hero-2_wrap, .hero-main_layout, [class*='hero']");
    if (ctaWrap) {
      var col = ctaWrap.querySelector(".u-layout-column-1, [class*='column-1']") || ctaWrap;
      col.insertAdjacentHTML("beforeend", connHTML);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 2: Social Proof Logos Strip        */
  /* ═══════════════════════════════════════════ */

  function buildLogos() {
    var logos = [
      { name: "TAP Air Portugal", src: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg" },
      { name: "Wi\u00F1k", src: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg" },
      { name: "Vila Gal\u00E9", src: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg" },
      { name: "KuantoKusta", src: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg" },
      { name: "Kabuki", src: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg" },
      { name: "Rede Expressos", src: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png" },
      { name: "Andr\u00E9 \u00D3ticas", src: BASE + "andreoticas-logo.png" },
      { name: "Onyria Resorts", src: BASE + "onyria-logo.svg" }
    ];

    var imgsHTML = logos.map(function (l) {
      return '<img src="' + l.src + '" alt="' + l.name + '" loading="lazy">';
    }).join("");

    var section = document.createElement("section");
    section.className = "pbrd-oc-logos";
    section.innerHTML =
      '<div class="pbrd-oc-logos-label">Trusted by industry leaders across Europe</div>' +
      '<div class="pbrd-oc-logos-track">' + imgsHTML + imgsHTML + '</div>';

    /* Insert after the hero section */
    var hero = document.querySelector(".hero-2_wrap, [class*='hero-2'], [data-wf--section--theme]");
    if (hero) {
      var heroSection = hero.closest("section") || hero.closest("[class*='section']") || hero;
      heroSection.insertAdjacentElement("afterend", section);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 3: Customer Journey Visualization  */
  /* ═══════════════════════════════════════════ */

  function buildJourney() {
    var posSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.5"/></svg>';
    var browserSVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h20" stroke="currentColor" stroke-width="1.5"/></svg>';
    var profileSVG = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

    var lineSVG = '<svg viewBox="0 0 48 24"><line x1="0" y1="12" x2="48" y2="12"/></svg>';

    var section = document.createElement("section");
    section.className = "pbrd-oc-journey";

    section.innerHTML =
      '<div class="pbrd-oc-journey-inner">' +
        '<div class="pbrd-oc-journey-label">The Paybyrd Difference</div>' +
        '<h2>See the customer, not just the transaction.</h2>' +
        '<p>Other platforms show you payments. Paybyrd shows you people \u2014 recognized across every channel, without logins or loyalty cards.</p>' +

        '<div class="pbrd-oc-timeline">' +

          /* Step 1: In-store */
          '<div class="pbrd-oc-tx-card">' +
            '<div class="pbrd-oc-tx-step">Step 1 \u00B7 In-Store</div>' +
            '<div class="pbrd-oc-tx-icon">' + posSVG + '</div>' +
            '<div class="pbrd-oc-tx-title">Maria pays in-store</div>' +
            '<div class="pbrd-oc-tx-row"><span>Card</span><span>Visa \u2022\u2022\u2022\u2022 4821</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Amount</span><span>\u20AC89.00</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Location</span><span>Lisbon Store</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Status</span><span style="color:rgba(120,255,180,0.8)">Approved</span></div>' +
          '</div>' +

          /* Line 1 */
          '<div class="pbrd-oc-line pbrd-oc-line-animated">' + lineSVG + '</div>' +

          /* Step 2: Online */
          '<div class="pbrd-oc-tx-card">' +
            '<div class="pbrd-oc-tx-step">Step 2 \u00B7 Online</div>' +
            '<div class="pbrd-oc-badge">\u21BB Returning Customer</div>' +
            '<div class="pbrd-oc-tx-icon">' + browserSVG + '</div>' +
            '<div class="pbrd-oc-tx-title">Same card detected online</div>' +
            '<div class="pbrd-oc-tx-row"><span>Card</span><span>Visa \u2022\u2022\u2022\u2022 4821</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Amount</span><span>\u20AC127.00</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Purchase</span><span>3rd transaction</span></div>' +
            '<div class="pbrd-oc-tx-row"><span>Status</span><span style="color:rgba(120,255,180,0.8)">Approved</span></div>' +
          '</div>' +

          /* Line 2 */
          '<div class="pbrd-oc-line pbrd-oc-line-animated">' + lineSVG + '</div>' +

          /* Step 3: Unified Profile */
          '<div class="pbrd-oc-tx-card pbrd-oc-profile-card">' +
            '<div class="pbrd-oc-tx-step">Result \u00B7 Unified Profile</div>' +
            '<div class="pbrd-oc-tx-icon">' + profileSVG + '</div>' +
            '<div class="pbrd-oc-profile-name">Maria L.</div>' +
            '<div class="pbrd-oc-profile-meta">Auto-identified from card data \u2022 No login required</div>' +
            '<div class="pbrd-oc-profile-stats">' +
              '<div class="pbrd-oc-profile-stat"><span class="pbrd-oc-profile-stat-val">5</span><span class="pbrd-oc-profile-stat-lbl">Purchases</span></div>' +
              '<div class="pbrd-oc-profile-stat"><span class="pbrd-oc-profile-stat-val">\u20AC847</span><span class="pbrd-oc-profile-stat-lbl">Lifetime</span></div>' +
              '<div class="pbrd-oc-profile-stat"><span class="pbrd-oc-profile-stat-val pbrd-oc-freq-hot">Hot</span><span class="pbrd-oc-profile-stat-lbl">Frequency</span></div>' +
            '</div>' +
          '</div>' +

        '</div>' +

        /* Proof pills */
        '<div class="pbrd-oc-proofs">' +
          '<div class="pbrd-oc-proof">' + checkSVG + '<span>Cross-channel identification</span></div>' +
          '<div class="pbrd-oc-proof">' + checkSVG + '<span>No app or login required</span></div>' +
          '<div class="pbrd-oc-proof">' + checkSVG + '<span>Works with anonymous POS transactions</span></div>' +
        '</div>' +

      '</div>';

    /* Insert after logos section, or after hero */
    var logos = document.querySelector(".pbrd-oc-logos");
    if (logos) {
      logos.insertAdjacentElement("afterend", section);
    } else {
      var hero = document.querySelector(".hero-2_wrap, [class*='hero-2']");
      if (hero) {
        var heroSection = hero.closest("section") || hero;
        heroSection.insertAdjacentElement("afterend", section);
      }
    }

    /* Activate scroll reveals */
    observeReveal(".pbrd-oc-tx-card", 200, section);
    observeReveal(".pbrd-oc-proof", 120, section);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 5: Dashboard Intelligence          */
  /* ═══════════════════════════════════════════ */

  function enhanceDashboard() {
    /* Find the dashboard section by heading text */
    var allH2 = document.querySelectorAll("h2");
    var dashSection = null;
    allH2.forEach(function (h) {
      if (h.textContent.toLowerCase().includes("dashboard") || h.textContent.toLowerCase().includes("data knows")) {
        dashSection = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    if (!dashSection) return;

    var grid = document.createElement("div");
    grid.className = "pbrd-oc-dash-grid";

    grid.innerHTML =
      /* Card 1: Cross-Channel Revenue */
      '<div class="pbrd-oc-dash-card">' +
        '<div class="pbrd-oc-dash-label">Cross-Channel Revenue</div>' +
        '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">E-Commerce</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="width:62%;background:rgba(80,100,220,0.6)"></div></div><span class="pbrd-oc-hbar-val">62%</span></div>' +
        '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">POS</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="width:31%;background:rgba(120,180,255,0.5)"></div></div><span class="pbrd-oc-hbar-val">31%</span></div>' +
        '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">Pay-by-Link</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="width:7%;background:rgba(120,255,180,0.4)"></div></div><span class="pbrd-oc-hbar-val">7%</span></div>' +
      '</div>' +

      /* Card 2: Returning Customers */
      '<div class="pbrd-oc-dash-card">' +
        '<div class="pbrd-oc-dash-label">Returning Customers</div>' +
        '<div class="pbrd-oc-dash-big">847</div>' +
        '<div class="pbrd-oc-dash-sub">identified this month \u2022 <span style="color:rgba(120,255,180,0.7);font-weight:600">\u2191 12%</span></div>' +
      '</div>' +

      /* Card 3: Buying Frequency */
      '<div class="pbrd-oc-dash-card">' +
        '<div class="pbrd-oc-dash-label">Buying Frequency</div>' +
        '<div class="pbrd-oc-freq-bar">' +
          '<div class="pbrd-oc-freq-seg" style="width:40%;background:rgba(255,255,255,0.08)"></div>' +
          '<div class="pbrd-oc-freq-seg" style="width:35%;background:rgba(120,180,255,0.35)"></div>' +
          '<div class="pbrd-oc-freq-seg" style="width:25%;background:rgba(255,100,50,0.5)"></div>' +
        '</div>' +
        '<div class="pbrd-oc-freq-legend">' +
          '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(255,255,255,0.15)"></div>Cold (1 visit) 40%</div>' +
          '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(120,180,255,0.5)"></div>Warm (2\u20134) 35%</div>' +
          '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(255,100,50,0.6)"></div>Hot (5+) 25%</div>' +
        '</div>' +
      '</div>' +

      /* Card 4: Channel Overlap */
      '<div class="pbrd-oc-dash-card">' +
        '<div class="pbrd-oc-dash-label">Channel Overlap</div>' +
        '<div class="pbrd-oc-dash-big" style="color:rgba(120,180,255,0.9)">23%</div>' +
        '<div class="pbrd-oc-dash-sub">of online customers also buy in-store</div>' +
        '<div style="margin-top:12px;font-size:0.6875rem;color:rgba(120,255,180,0.6);font-weight:600">\u2191 Cross-channel revenue per customer is 3.2\u00D7 higher</div>' +
      '</div>';

    /* Find a good spot inside the dashboard section */
    var container = dashSection.querySelector(".u-container, [class*='container']") || dashSection;
    container.appendChild(grid);

    observeReveal(".pbrd-oc-dash-card", 120, grid);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 6: Value Proposition Cards         */
  /* ═══════════════════════════════════════════ */

  function buildBenefits() {
    /* Find "More than numbers" or "Centralized control" section */
    var allH2 = document.querySelectorAll("h2");
    var valSection = null;
    allH2.forEach(function (h) {
      if (h.textContent.toLowerCase().includes("centralized") || h.textContent.toLowerCase().includes("more than numbers")) {
        valSection = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    if (!valSection) return;

    var refundSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M3 10l4-4m0 0l4 4M7 6v8a4 4 0 004 4h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var userSVG = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    var chartSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M3 20l5-8 4 4 6-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var benefits = document.createElement("div");
    benefits.className = "pbrd-oc-benefits";

    benefits.innerHTML =
      '<div class="pbrd-oc-benefit">' +
        '<div class="pbrd-oc-benefit-icon">' + refundSVG + '</div>' +
        '<h3>One refund, any channel</h3>' +
        '<p>Bought online? Return in-store. Paid via link? Refund at the terminal. Cross-channel refunds without manual reconciliation.</p>' +
      '</div>' +
      '<div class="pbrd-oc-benefit">' +
        '<div class="pbrd-oc-benefit-icon">' + userSVG + '</div>' +
        '<h3>Customers recognized, not numbered</h3>' +
        '<p>Automatic shopper identification from card data alone \u2014 across POS and online. No loyalty apps, no logins, no friction.</p>' +
      '</div>' +
      '<div class="pbrd-oc-benefit">' +
        '<div class="pbrd-oc-benefit-icon">' + chartSVG + '</div>' +
        '<h3>Intelligence that compounds</h3>' +
        '<p>Every transaction enriches the picture. See patterns that single-channel platforms miss \u2014 frequency, lifetime value, channel preferences.</p>' +
      '</div>';

    valSection.insertAdjacentElement("afterend", benefits);

    observeReveal(".pbrd-oc-benefit", 150, benefits);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 7: Final CTA                      */
  /* ═══════════════════════════════════════════ */

  function buildCTA() {
    var section = document.createElement("section");
    section.className = "pbrd-oc-cta";

    section.innerHTML =
      '<h2>See your customer journey in 15 minutes.</h2>' +
      '<a href="/book-demo" class="pbrd-oc-cta-btn">Book a Free Demo \u2192</a>' +
      '<div class="pbrd-oc-cta-proofs">' +
        '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>30-day money-back guarantee</span></div>' +
        '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>Live in under 4 hours</span></div>' +
        '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>No contracts, cancel anytime</span></div>' +
      '</div>';

    /* Insert before the footer */
    var footer = document.querySelector("footer, [class*='footer']");
    if (footer) {
      footer.insertAdjacentElement("beforebegin", section);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                       */
  /* ═══════════════════════════════════════════ */

  function init() {
    try {
      enhanceHero();
      buildLogos();
      buildJourney();
      enhanceDashboard();
      buildBenefits();
      buildCTA();
      console.log("[Paybyrd] Omnichannel enhancements loaded");
    } catch (err) {
      console.error("[Paybyrd] Omnichannel error:", err);
    }
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
