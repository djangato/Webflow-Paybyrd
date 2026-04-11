/* Paybyrd — E-Commerce Page Enhancements */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/e-commerce")) return;

  var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";
  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/";
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

  /* ─── Helper: find section by heading text ─── */
  function findSectionByHeading(text) {
    var result = null;
    document.querySelectorAll("h2, h3").forEach(function (h) {
      if (h.textContent.toLowerCase().includes(text.toLowerCase())) {
        result = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    return result;
  }

  /* ─── Helper: override text by content match ─── */
  function overrideText(searchText, newText, tag) {
    var tags = tag || "h1, h2, h3, h4, h5, h6, p, legend";
    document.querySelectorAll(tags).forEach(function (el) {
      if (el.children.length === 0 && el.textContent.trim().toLowerCase().includes(searchText.toLowerCase().substring(0, 20))) {
        el.textContent = newText;
      }
    });
  }

  /* ═══════════════════════════════════════════ */
  /* Section 1: Hero Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceHero() {
    var heroH1 = document.querySelector("h1");
    if (!heroH1) return;

    /* Kicker */
    var kicker = document.createElement("div");
    kicker.className = "pbrd-ec-kicker";
    kicker.textContent = "Payment infrastructure for growth";
    heroH1.parentElement.insertBefore(kicker, heroH1);

    /* Override H1 */
    heroH1.textContent = "Stop losing customers at checkout.";

    /* Override subtitle */
    var heroP = heroH1.parentElement.querySelector("p");
    if (heroP) {
      heroP.textContent = "Every second of friction costs you revenue. Paybyrd\u2019s checkout loads in under 2 seconds, supports 35+ payment methods, and automatically adapts to each shopper\u2019s country, device, and preference \u2014 so they pay, not leave.";
    }

    /* Stat strip */
    var strip = document.createElement("div");
    strip.className = "pbrd-ec-stat-strip";
    strip.innerHTML =
      '<div class="pbrd-ec-stat-item"><strong>35+</strong> Methods</div>' +
      '<div class="pbrd-ec-stat-item"><strong>192</strong> Currencies</div>' +
      '<div class="pbrd-ec-stat-item"><strong>2.3s</strong> Avg Checkout</div>' +
      '<div class="pbrd-ec-stat-item"><strong>99.8%</strong> Uptime</div>';

    var ctaWrap = heroH1.closest("[class*='hero']");
    if (ctaWrap) {
      var col = ctaWrap.querySelector("[class*='column-1'], [class*='content']") || ctaWrap;
      col.appendChild(strip);
    }

    /* ─── Hero Dashboard Overlay ─── */
    /* Hero is full-bleed — attach dashboard to the hero section itself */
    var heroSection = heroH1.closest("section") || heroH1.closest("[class*='hero']") || heroH1.parentElement.parentElement;
    if (heroSection) {
      heroSection.style.position = "relative";
      heroSection.style.overflow = "visible";

      var dashboard = document.createElement("div");
      dashboard.className = "pbrd-ec-hero-dash";
      dashboard.innerHTML =
        /* Live metrics panel */
        '<div class="pbrd-ec-hero-panel">' +
          '<div class="pbrd-ec-hero-panel-header">' +
            '<div class="pbrd-ec-hero-live-dot"></div>' +
            '<span>Live Checkout Analytics</span>' +
          '</div>' +

          /* Conversion funnel mini */
          '<div class="pbrd-ec-hero-funnel">' +
            '<div class="pbrd-ec-hero-funnel-row">' +
              '<span>Visitors</span>' +
              '<div class="pbrd-ec-hero-funnel-bar"><div class="pbrd-ec-hero-funnel-fill" style="--bar-w:100%"></div></div>' +
              '<span>12,847</span>' +
            '</div>' +
            '<div class="pbrd-ec-hero-funnel-row">' +
              '<span>Cart</span>' +
              '<div class="pbrd-ec-hero-funnel-bar"><div class="pbrd-ec-hero-funnel-fill" style="--bar-w:68%"></div></div>' +
              '<span>8,736</span>' +
            '</div>' +
            '<div class="pbrd-ec-hero-funnel-row">' +
              '<span>Checkout</span>' +
              '<div class="pbrd-ec-hero-funnel-bar"><div class="pbrd-ec-hero-funnel-fill" style="--bar-w:52%;background:linear-gradient(90deg,rgba(120,180,255,0.4),rgba(120,180,255,0.7))"></div></div>' +
              '<span>6,680</span>' +
            '</div>' +
            '<div class="pbrd-ec-hero-funnel-row">' +
              '<span>Paid</span>' +
              '<div class="pbrd-ec-hero-funnel-bar"><div class="pbrd-ec-hero-funnel-fill" style="--bar-w:44%;background:linear-gradient(90deg,rgba(16,185,129,0.4),rgba(16,185,129,0.8))"></div></div>' +
              '<span>5,653</span>' +
            '</div>' +
          '</div>' +

          /* Bottom stats */
          '<div class="pbrd-ec-hero-stats">' +
            '<div class="pbrd-ec-hero-stat"><div class="pbrd-ec-hero-stat-val">92.7%</div><div class="pbrd-ec-hero-stat-lbl">Approval</div></div>' +
            '<div class="pbrd-ec-hero-stat"><div class="pbrd-ec-hero-stat-val">2.1s</div><div class="pbrd-ec-hero-stat-lbl">Avg Speed</div></div>' +
            '<div class="pbrd-ec-hero-stat"><div class="pbrd-ec-hero-stat-val">\u20AC142</div><div class="pbrd-ec-hero-stat-lbl">Avg Order</div></div>' +
          '</div>' +
        '</div>' +

        /* Floating success notification */
        '<div class="pbrd-ec-hero-notif">' +
          '<div style="display:flex;align-items:center;gap:8px">' +
            '<div class="pbrd-ec-hero-notif-icon">' + checkSVG + '</div>' +
            '<div>' +
              '<div style="font-size:0.6875rem;font-weight:600;color:#fff">\u20AC89.00 received</div>' +
              '<div style="font-size:0.5625rem;color:rgba(255,255,255,0.4)">Visa \u2022\u2022\u2022\u2022 4821 \u2022 just now</div>' +
            '</div>' +
          '</div>' +
        '</div>';

      heroSection.appendChild(dashboard);

      /* Animate funnel bars on load */
      setTimeout(function () {
        dashboard.querySelectorAll(".pbrd-ec-hero-funnel-fill").forEach(function (f) {
          f.classList.add("pbrd-ec-animate");
        });
      }, 500);

      /* Cycle the notification with different amounts */
      var notifEl = dashboard.querySelector(".pbrd-ec-hero-notif");
      var notifs = [
        { amount: "\u20AC89.00", method: "Visa \u2022\u2022\u2022\u2022 4821", time: "just now" },
        { amount: "\u20AC245.50", method: "Mastercard \u2022\u2022\u2022\u2022 9103", time: "2s ago" },
        { amount: "\u20AC32.00", method: "MBWay", time: "5s ago" },
        { amount: "\u20AC178.90", method: "PayPal", time: "8s ago" },
        { amount: "\u20AC67.00", method: "Klarna", time: "12s ago" }
      ];
      var notifIdx = 0;
      setInterval(function () {
        notifIdx = (notifIdx + 1) % notifs.length;
        var n = notifs[notifIdx];
        notifEl.style.opacity = "0";
        notifEl.style.transform = "translateY(8px)";
        setTimeout(function () {
          notifEl.querySelector("[style*='font-weight:600']").textContent = n.amount + " received";
          notifEl.querySelector("[style*='color:rgba']").textContent = n.method + " \u2022 " + n.time;
          notifEl.style.opacity = "1";
          notifEl.style.transform = "translateY(0)";
        }, 300);
      }, 3000);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 2: Social Proof Logos              */
  /* ═══════════════════════════════════════════ */

  function buildLogos() {
    var logos = [
      { name: "TAP Air Portugal", src: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg" },
      { name: "Wi\u00F1k", src: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg" },
      { name: "Vila Gal\u00E9", src: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg" },
      { name: "KuantoKusta", src: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg" },
      { name: "Kabuki", src: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg" },
      { name: "Rede Expressos", src: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png" },
      { name: "Andr\u00E9 \u00D3ticas", src: BASE + "customers/andreoticas-logo.png" },
      { name: "Onyria Resorts", src: BASE + "customers/onyria-logo.svg" }
    ];

    var imgsHTML = logos.map(function (l) {
      return '<img src="' + l.src + '" alt="' + l.name + '" loading="lazy">';
    }).join("");

    var section = document.createElement("section");
    section.className = "pbrd-oc-logos";
    section.innerHTML =
      '<div class="pbrd-oc-logos-label">Processing payments for industry leaders across Europe</div>' +
      '<div class="pbrd-oc-logos-track">' + imgsHTML + imgsHTML + '</div>';

    var hero = document.querySelector("[class*='hero']");
    if (hero) {
      var heroSection = hero.closest("section") || hero;
      heroSection.insertAdjacentElement("afterend", section);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 3: Problem Statement + Impact Cards*/
  /* ═══════════════════════════════════════════ */

  function enhanceProblem() {
    /* Find section first, then override within it */
    var section = findSectionByHeading("speed sells") || findSectionByHeading("friction kills");
    if (!section) return;

    /* Override the heading */
    var heading = section.querySelector("h2, h3");
    if (heading) heading.textContent = "Every abandoned cart is revenue walking out the door.";

    /* Override first paragraph, hide extras */
    var pCount = 0;
    section.querySelectorAll("p").forEach(function (p) {
      if (p.textContent.length > 20) {
        if (pCount === 0) {
          p.textContent = "Your customer found the product, added it to cart, entered their details \u2014 then left. Not because they changed their mind, but because your checkout was too slow, asked for too much, or didn\u2019t offer their preferred payment method. That\u2019s not a lost sale. That\u2019s a leak you can fix today.";
        } else {
          p.style.display = "none";
        }
        pCount++;
      }
    });

    /* ─── Tabbed Product Showcase ─── */
    var ICON = BASE + "icons/";
    var showcase = document.createElement("div");
    showcase.className = "pbrd-ec-showcase";

    var tabs = [
      {
        id: "launch",
        label: "Launch",
        icon: '<svg viewBox="0 0 20 20" fill="none"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="currentColor" stroke-width="1.2"/><path d="M12 15l-3-3c1-4 4-7 9-9-2 5-5 8-9 9l3 3z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        title: "Your checkout, live before lunch",
        desc: "Stop waiting on engineering sprints. Paybyrd connects to your stack with pre-built plugins or a clean API \u2014 and most merchants are processing real payments within the same business day.",
        viz:
          '<div class="pbrd-ec-viz-integrations">' +
            '<div class="pbrd-ec-viz-int-row">' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.1s"><img src="' + ICON + 'woocommerce.svg" alt="WooCommerce"><span>WooCommerce</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.2s"><img src="' + ICON + 'magento.svg" alt="Magento"><span>Magento</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.3s"><img src="' + ICON + 'prestashop.svg" alt="PrestaShop"><span>PrestaShop</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-int-row">' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.4s"><img src="' + ICON + 'sap.svg" alt="SAP"><span>SAP</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.5s"><img src="' + ICON + 'oracle.svg" alt="Oracle"><span>Oracle</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.6s;border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)"><span style="font-size:1rem;font-weight:700">{ }</span><span>REST API</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-int-stat">Average integration time: <strong>4 hours</strong></div>' +
          '</div>'
      },
      {
        id: "convert",
        label: "Convert",
        icon: '<svg viewBox="0 0 20 20" fill="none"><path d="M16 4l-6 6M16 4h-5M16 4v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16l6-6M4 16h5M4 16v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        title: "The checkout where nobody leaves",
        desc: "Every payment method your customer trusts \u2014 auto-detected by country and device. Cards, wallets, BNPL, bank transfers. The right option is always one tap away.",
        viz:
          '<div class="pbrd-ec-viz-methods">' +
            '<div class="pbrd-ec-viz-method-row">' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.1s"><img src="' + ICON + 'visa.png" alt="Visa"><span>Visa</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.15s"><img src="' + ICON + 'mastercard.png" alt="Mastercard"><span>Mastercard</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-method-row">' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.2s"><img src="' + ICON + 'applepay.png" alt="Apple Pay"><span>Apple Pay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.25s"><img src="' + ICON + 'googlepay.png" alt="Google Pay"><span>Google Pay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-method-row">' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.3s"><img src="' + ICON + 'klarna.png" alt="Klarna"><span>Klarna</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.35s"><img src="' + ICON + 'mbway.png" alt="MBWay"><span>MBWay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-method-row">' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.4s"><img src="' + ICON + 'paypal.png" alt="PayPal"><span>PayPal</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-viz-method pbrd-ec-viz-pop" style="--d:0.45s"><img src="' + ICON + 'ideal.png" alt="iDEAL"><span>iDEAL</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
          '</div>'
      },
      {
        id: "understand",
        label: "Understand",
        icon: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
        title: "Stop guessing why customers leave",
        desc: "See your entire conversion funnel in real time \u2014 by device, country, payment method, and campaign. Paybyrd doesn\u2019t just process payments. It tells you where the money is leaking.",
        viz:
          '<div class="pbrd-ec-viz-dashboard">' +
            '<div class="pbrd-ec-viz-dash-header"><span class="pbrd-ec-viz-dash-nav">Sales</span><span class="pbrd-ec-viz-dash-nav active">Conversion</span><span class="pbrd-ec-viz-dash-nav">Refunds</span></div>' +
            '<div class="pbrd-ec-viz-funnel">' +
              '<div class="pbrd-ec-viz-funnel-step"><span>Visitors</span><div class="pbrd-ec-viz-funnel-bar" style="--bar-w:100%"></div><span>12,847</span></div>' +
              '<div class="pbrd-ec-viz-funnel-step"><span>Add to Cart</span><div class="pbrd-ec-viz-funnel-bar" style="--bar-w:68%"></div><span>8,736</span></div>' +
              '<div class="pbrd-ec-viz-funnel-step"><span>Checkout</span><div class="pbrd-ec-viz-funnel-bar" style="--bar-w:52%;background:rgba(120,180,255,0.5)"></div><span>6,680</span></div>' +
              '<div class="pbrd-ec-viz-funnel-step"><span>Paid</span><div class="pbrd-ec-viz-funnel-bar" style="--bar-w:44%;background:rgba(16,185,129,0.6)"></div><span>5,653</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-dash-insight">' + checkSVG + ' Checkout \u2192 Paid conversion is <strong>84.6%</strong> \u2014 4.2% above your industry</div>' +
          '</div>'
      },
      {
        id: "control",
        label: "Control",
        icon: '<svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="7" cy="5" r="2" fill="currentColor"/><circle cx="13" cy="10" r="2" fill="currentColor"/><circle cx="9" cy="15" r="2" fill="currentColor"/></svg>',
        title: "Every euro accounted for. Instantly.",
        desc: "Refunds in one click. Chargebacks fought with data. Reconciliation that takes hours, not days. One screen for every transaction, every channel, every market.",
        viz:
          '<div class="pbrd-ec-viz-manage">' +
            '<div class="pbrd-ec-viz-tx-list">' +
              '<div class="pbrd-ec-viz-tx" style="--d:0.1s"><div class="pbrd-ec-viz-tx-status paid">Paid</div><span>\u20AC89.00</span><span>Visa \u2022\u20224821</span><span>2 min ago</span></div>' +
              '<div class="pbrd-ec-viz-tx" style="--d:0.2s"><div class="pbrd-ec-viz-tx-status refund">Refund</div><span>\u20AC32.50</span><span>MBWay</span><span>15 min ago</span></div>' +
              '<div class="pbrd-ec-viz-tx" style="--d:0.3s"><div class="pbrd-ec-viz-tx-status paid">Paid</div><span>\u20AC245.00</span><span>PayPal</span><span>22 min ago</span></div>' +
              '<div class="pbrd-ec-viz-tx" style="--d:0.4s"><div class="pbrd-ec-viz-tx-status paid">Paid</div><span>\u20AC67.90</span><span>Klarna</span><span>35 min ago</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-manage-stats">' +
              '<div class="pbrd-ec-viz-manage-stat"><span class="pbrd-ec-viz-manage-val">\u20AC1.4M</span><span class="pbrd-ec-viz-manage-lbl">Today\u2019s volume</span></div>' +
              '<div class="pbrd-ec-viz-manage-stat"><span class="pbrd-ec-viz-manage-val">0.12%</span><span class="pbrd-ec-viz-manage-lbl">Chargeback rate</span></div>' +
            '</div>' +
          '</div>'
      }
    ];

    var tabsHTML = tabs.map(function (t, i) {
      return '<button class="pbrd-ec-tab' + (i === 0 ? ' active' : '') + '" data-tab="' + t.id + '">' + t.icon + '<span>' + t.label + '</span></button>';
    }).join("");

    var panelsHTML = tabs.map(function (t, i) {
      return '<div class="pbrd-ec-panel' + (i === 0 ? ' active' : '') + '" data-panel="' + t.id + '">' +
        '<div class="pbrd-ec-panel-text">' +
          '<h3>' + t.title + '</h3>' +
          '<p>' + t.desc + '</p>' +
        '</div>' +
        '<div class="pbrd-ec-panel-viz">' + t.viz + '</div>' +
      '</div>';
    }).join("");

    showcase.innerHTML =
      '<div class="pbrd-ec-showcase-tabs">' + tabsHTML + '</div>' +
      '<div class="pbrd-ec-showcase-panels">' + panelsHTML + '</div>';

    var container = section.querySelector(".u-container, [class*='container']") || section;
    container.appendChild(showcase);

    /* Tab switching */
    showcase.querySelectorAll(".pbrd-ec-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        showcase.querySelectorAll(".pbrd-ec-tab").forEach(function (t) { t.classList.remove("active"); });
        showcase.querySelectorAll(".pbrd-ec-panel").forEach(function (p) { p.classList.remove("active"); });
        tab.classList.add("active");
        var panel = showcase.querySelector('[data-panel="' + tab.dataset.tab + '"]');
        if (panel) panel.classList.add("active");
      });
    });
  }

  /* ═══════════════════════════════════════════ */
  /* Section 4: Benefits Grid Copy Override     */
  /* ═══════════════════════════════════════════ */

  function enhanceBenefits() {
    var benefitCopy = [
      {
        search: "omnichannel",
        title: "One integration, every channel",
        desc: "Connect your website, app, POS, and marketplaces to a single payment backend. One reconciliation, one dashboard, one source of truth.",
        pill: "Single API for all channels"
      },
      {
        search: "conversion",
        title: "A checkout your customers actually finish",
        desc: "White-labeled, mobile-optimized, pre-filled where possible. Guest checkout, saved cards, one-click payments. Reduce clicks, increase conversions.",
        pill: "23% higher conversion rate"
      },
      {
        search: "fraud",
        title: "Block fraud, not customers",
        desc: "AI-powered risk scoring that adapts to your business. Reduce chargebacks by up to 40% while keeping approval rates above 92%. Smart rules that learn.",
        pill: "-40% chargebacks"
      },
      {
        search: "optimi",
        title: "See what\u2019s working. Fix what isn\u2019t.",
        desc: "Real-time conversion funnels by device, country, payment method, and campaign. Know exactly where customers drop off \u2014 and why.",
        pill: "Real-time analytics"
      }
    ];

    var allH3 = document.querySelectorAll("h3, h4");
    allH3.forEach(function (h) {
      var txt = h.textContent.toLowerCase();
      benefitCopy.forEach(function (b) {
        if (txt.includes(b.search.toLowerCase()) && h.children.length === 0) {
          h.textContent = b.title;

          /* Find sibling paragraph */
          var parent = h.parentElement;
          if (parent) {
            var desc = parent.querySelector("p");
            if (desc) desc.textContent = b.desc;

            /* Add pill if not already present */
            if (!parent.querySelector(".pbrd-ec-pill")) {
              var pill = document.createElement("div");
              pill.className = "pbrd-ec-pill";
              pill.innerHTML = checkSVG + '<span>' + b.pill + '</span>';
              parent.appendChild(pill);
            }
          }
        }
      });
    });
  }

  /* ═══════════════════════════════════════════ */
  /* Section 6: Integration Logos               */
  /* ═══════════════════════════════════════════ */

  function enhanceIntegrations() {
    var section = findSectionByHeading("stack you already");
    if (!section) return;

    /* Override heading */
    var h = section.querySelector("h2, h3");
    if (h) h.textContent = "Plug in today. Not next quarter.";

    var paragraphs = section.querySelectorAll("p");
    paragraphs.forEach(function (p) {
      if (p.textContent.length > 30 && p.textContent.length < 200) {
        p.textContent = "Pre-built integrations for every major e-commerce platform. Your developer spends hours, not months. Full REST API for custom builds.";
      }
    });

    /* Add integration pills */
    var grid = document.createElement("div");
    grid.className = "pbrd-ec-integrations";
    grid.innerHTML =
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/woocommerce.svg" alt="WooCommerce" style="height:16px;width:auto">WooCommerce</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/magento.svg" alt="Magento" style="height:16px;width:auto">Magento</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/prestashop.svg" alt="PrestaShop" style="height:16px;width:auto">PrestaShop</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/sap.svg" alt="SAP" style="height:16px;width:auto">SAP</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/oracle.svg" alt="Oracle" style="height:16px;width:auto">Oracle</div>' +
      '<div class="pbrd-oc-int-pill"><img src="' + BASE + 'icons/moloni.svg" alt="Moloni" style="height:16px;width:auto">Moloni</div>' +
      '<div class="pbrd-oc-int-pill" style="border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)">+ REST API</div>';

    var note = document.createElement("div");
    note.className = "pbrd-ec-int-note";
    note.textContent = "Average integration time: 4 hours \u2022 Full API with webhooks and sandbox";

    var container = section.querySelector(".u-container, [class*='container']") || section;
    container.appendChild(grid);
    container.appendChild(note);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 7: Payment Journey Copy Override   */
  /* ═══════════════════════════════════════════ */

  function enhanceJourney() {
    var journeyCopy = [
      {
        search: "web checkout",
        title: "Your brand, their preferred way to pay",
        desc: "Fully customizable hosted checkout. Supports 35+ methods, auto-detects country, remembers returning shoppers. Conversion rates 23% higher than generic checkouts."
      },
      {
        search: "mobile",
        title: "Thumb-friendly payments that convert",
        desc: "Apple Pay, Google Pay, one-tap checkout. 67% of e-commerce traffic is mobile \u2014 your checkout should be built for thumbs, not mice."
      },
      {
        search: "customer service",
        title: "Turn support into revenue",
        desc: "Send payment links via WhatsApp, SMS, or email in seconds. Handle refunds, partial captures, and chargebacks from one screen."
      },
      {
        search: "subscription",
        title: "Recurring revenue on autopilot",
        desc: "Tokenized billing that handles retries, dunning, and card updates automatically. Reduce involuntary churn by up to 30%."
      }
    ];

    var allH3 = document.querySelectorAll("h3, h4");
    allH3.forEach(function (h) {
      var txt = h.textContent.toLowerCase();
      journeyCopy.forEach(function (j) {
        if (txt.includes(j.search.toLowerCase()) && h.children.length === 0) {
          h.textContent = j.title;
          var parent = h.parentElement;
          if (parent) {
            var desc = parent.querySelector("p");
            if (desc) desc.textContent = j.desc;
          }
        }
      });
    });
  }

  /* ═══════════════════════════════════════════ */
  /* Section 8: Expanded Testimonials           */
  /* ═══════════════════════════════════════════ */

  function buildTestimonials() {
    var testimonials = [
      {
        quote: "Paybyrd gave us what no other provider could \u2014 a single integration handling 20+ payment methods across 90 markets, with approval rates that recovered millions in revenue we were leaving on the table.",
        name: "Jo\u00E3o Frias",
        title: "Head of Payments, TAP Air Portugal",
        logo: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg"
      },
      {
        quote: "Cart abandonment was our biggest leak. After implementing Paybyrd\u2019s checkout with Klarna and local methods like MBWay, we saw conversion jump meaningfully. The right payment method at the right moment makes all the difference.",
        name: "Rita Faria",
        title: "CEO, KuantoKusta",
        logo: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg"
      },
      {
        quote: "Our drop-off rate used to spike at the final step. Since switching to Paybyrd, abandonment dropped 19% and support tickets fell by half. The checkout just works \u2014 fast, clean, and exactly how we want it to look.",
        name: "Pedro Estiv\u00E3o",
        title: "Revenue Manager, Alfagar",
        logo: ""
      }
    ];

    /* Find existing testimonial section and replace it */
    var existingTestimonial = findSectionByHeading("drop-off") || findSectionByHeading("testimonial");

    var section = document.createElement("section");
    section.className = "pbrd-ec-testimonials";

    var left = [testimonials[0], testimonials[2]];
    var right = [testimonials[1]];

    function buildCard(t) {
      var logoHTML = t.logo ? '<img class="pbrd-ec-tcard-logo" src="' + t.logo + '" alt="' + t.title.split(", ").pop() + '" loading="lazy">' : '';
      return '<div class="pbrd-ec-tcard">' +
        '<div class="pbrd-ec-tcard-quote">\u201C</div>' +
        '<p class="pbrd-ec-tcard-text">' + t.quote + '</p>' +
        '<div class="pbrd-ec-tcard-divider"></div>' +
        '<div class="pbrd-ec-tcard-attr">' +
          '<div><div class="pbrd-ec-tcard-name">' + t.name + '</div><div class="pbrd-ec-tcard-title">' + t.title + '</div></div>' +
          logoHTML +
        '</div>' +
      '</div>';
    }

    section.innerHTML =
      '<div class="pbrd-ec-testimonials-inner">' +
        '<div class="pbrd-ec-testimonials-header">' +
          '<h2>What merchants say.</h2>' +
          '<p>Don\u2019t take our word for it.</p>' +
        '</div>' +
        '<div class="pbrd-ec-testimonials-grid">' +
          '<div class="pbrd-ec-testimonials-col">' + left.map(buildCard).join("") + '</div>' +
          '<div class="pbrd-ec-testimonials-col">' + right.map(buildCard).join("") + '</div>' +
        '</div>' +
      '</div>';

    if (existingTestimonial) {
      existingTestimonial.replaceWith(section);
    } else {
      /* Insert before FAQ or footer */
      var faq = findSectionByHeading("frequently asked");
      if (faq) faq.insertAdjacentElement("beforebegin", section);
    }

    observeReveal(".pbrd-ec-tcard", 150, section);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 9: CTA Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceCTA() {
    /* Find existing CTA banner */
    var ctaSection = findSectionByHeading("cut abandonment") || findSectionByHeading("boost conversions");
    if (!ctaSection) return;

    /* Replace its content */
    var container = ctaSection.querySelector(".u-container, [class*='container']") || ctaSection;

    /* Hide existing content */
    var children = container.children;
    for (var i = 0; i < children.length; i++) {
      children[i].style.display = "none";
    }

    var cta = document.createElement("div");
    cta.className = "pbrd-ec-cta";
    cta.innerHTML =
      '<div class="pbrd-oc-journey-label" style="color:rgba(120,255,180,0.7)">Ready?</div>' +
      '<h2>Your checkout is costing you customers.<br>Let\u2019s fix that.</h2>' +
      '<p>Book a 15-minute call. We\u2019ll show you exactly where your checkout loses conversions \u2014 and how to recover them. No pitch deck, just your data.</p>' +
      '<a href="/book-demo" class="pbrd-ec-cta-btn">Book a Free Demo \u2192</a>' +
      '<div style="margin-top:16px;margin-bottom:32px"><a href="/pricing" style="color:rgba(255,255,255,0.4);font-size:0.875rem;text-decoration:none">Or explore pricing first \u2192</a></div>' +
      '<div class="pbrd-ec-cta-proofs">' +
        '<div class="pbrd-ec-cta-proof">' + checkSVG + '<span>Free 15-min consultation</span></div>' +
        '<div class="pbrd-ec-cta-proof">' + checkSVG + '<span>Live in under 4 hours</span></div>' +
        '<div class="pbrd-ec-cta-proof">' + checkSVG + '<span>30-day money-back guarantee</span></div>' +
      '</div>';

    container.appendChild(cta);
  }

  /* ═══════════════════════════════════════════ */
  /* Init                                       */
  /* ═══════════════════════════════════════════ */

  function init() {
    try {
      enhanceHero();
      buildLogos();
      enhanceProblem();
      enhanceBenefits();
      /* Section 5: "Data that drives" — DO NOT TOUCH */
      enhanceIntegrations();
      enhanceJourney();
      buildTestimonials();
      enhanceCTA();
      console.log("[Paybyrd] E-commerce enhancements loaded");
    } catch (err) {
      console.error("[Paybyrd] E-commerce error:", err);
    }
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
