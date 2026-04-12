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

  /* ─── Shared typing animation ─── */
  function typeText(el, text, delay, cb) {
    var i = 0;
    function tick() {
      if (i <= text.length) {
        el.textContent = text.substring(0, i);
        i++;
        setTimeout(tick, 60 + Math.random() * 40);
      } else if (cb) { setTimeout(cb, delay || 300); }
    }
    tick();
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
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.15s"><img src="' + ICON + 'magento.svg" alt="Magento"><span>Magento</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.2s"><img src="' + ICON + 'prestashop.svg" alt="PrestaShop"><span>PrestaShop</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.25s"><img src="' + ICON + 'sap.svg" alt="SAP"><span>SAP</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-int-row">' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.3s"><img src="' + ICON + 'oracle.svg" alt="Oracle"><span>Oracle</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.35s"><img src="' + ICON + 'moloni.svg" alt="Moloni"><span>Moloni</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.4s"><img src="' + ICON + 'newhotel.svg" alt="Newhotel"><span>Newhotel</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.45s"><img src="' + ICON + 'whatsapp.svg" alt="WhatsApp"><span>WhatsApp</span></div>' +
            '</div>' +
            '<div class="pbrd-ec-viz-int-row">' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.5s;border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)"><span style="font-size:1rem;font-weight:700">{ }</span><span>REST API</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.55s;border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)"><span style="font-size:0.75rem;font-weight:700">&lt;/&gt;</span><span>Webhooks</span></div>' +
              '<div class="pbrd-ec-viz-int-item pbrd-ec-viz-pop" style="--d:0.6s;border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)"><span style="font-size:0.75rem;font-weight:700">SDK</span><span>Libraries</span></div>' +
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

    /* ─── Animations only run when showcase is visible ─── */
    var showcaseVisible = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        showcaseVisible = entries[0].isIntersecting;
      }, { threshold: 0.1 }).observe(showcase);
    } else {
      showcaseVisible = true;
    }

    /* ─── Scroll-triggered tab auto-advance ─── */
    var tabIds = tabs.map(function (t) { return t.id; });
    var scrollTabIdx = 0;
    var scrollTabPaused = false;
    var scrollTabTimer = null;

    function activateTab(idx) {
      var allTabs = showcase.querySelectorAll(".pbrd-ec-tab");
      var allPanels = showcase.querySelectorAll(".pbrd-ec-panel");
      allTabs.forEach(function (t) { t.classList.remove("active"); });
      allPanels.forEach(function (p) { p.classList.remove("active"); });
      if (allTabs[idx]) allTabs[idx].classList.add("active");
      var panel = showcase.querySelector('[data-panel="' + tabIds[idx] + '"]');
      if (panel) panel.classList.add("active");
      scrollTabIdx = idx;
    }

    /* Pause auto-scroll on manual click, resume after 8s */
    showcase.querySelectorAll(".pbrd-ec-tab").forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        scrollTabPaused = true;
        scrollTabIdx = i;
        clearTimeout(scrollTabTimer);
        scrollTabTimer = setTimeout(function () { scrollTabPaused = false; }, 8000);
      });
    });

    /* Advance tab every 4s while showcase is in view */
    setInterval(function () {
      if (!showcaseVisible || scrollTabPaused) return;
      scrollTabIdx = (scrollTabIdx + 1) % tabIds.length;
      activateTab(scrollTabIdx);
    }, 4000);

    /* Convert: toggles cycle */
    var toggles = showcase.querySelectorAll(".pbrd-ec-viz-toggle");
    var togIdx = 0;
    setInterval(function () {
      if (!showcaseVisible || !toggles.length) return;
      var t = toggles[togIdx % toggles.length];
      t.classList.remove("on");
      setTimeout(function () { t.classList.add("on"); }, 1200);
      togIdx++;
    }, 2500);

    /* Understand: funnel numbers tick up (capped) */
    var funnelNums = [12847, 8736, 6680, 5653];
    var funnelMax = [15000, 10000, 8000, 7000];
    setInterval(function () {
      if (!showcaseVisible) return;
      var steps = showcase.querySelectorAll(".pbrd-ec-viz-funnel-step");
      steps.forEach(function (step, i) {
        if (i >= funnelNums.length) return;
        if (funnelNums[i] < funnelMax[i]) funnelNums[i] += Math.floor(Math.random() * 30) + 5;
        else funnelNums[i] = funnelNums[i] - 2000 + Math.floor(Math.random() * 200); /* Reset */
        var numEl = step.querySelector("span:last-child");
        if (numEl) numEl.textContent = funnelNums[i].toLocaleString("en");
      });
    }, 4000);

    /* Control: transactions arrive — simple text swap, no DOM creation */
    var txRows = showcase.querySelectorAll("[data-panel='control'] .pbrd-ec-viz-tx");
    var txData = [
      { s: "paid", a: "\u20AC156.00", m: "Mastercard" },
      { s: "paid", a: "\u20AC42.50", m: "Apple Pay" },
      { s: "paid", a: "\u20AC318.00", m: "Visa \u2022\u20225847" },
      { s: "refund", a: "\u20AC19.90", m: "iDEAL" },
      { s: "paid", a: "\u20AC78.00", m: "Google Pay" },
      { s: "paid", a: "\u20AC205.50", m: "Klarna" },
      { s: "paid", a: "\u20AC93.20", m: "Multibanco" },
      { s: "paid", a: "\u20AC447.00", m: "PayPal" }
    ];
    var txI = 0;
    setInterval(function () {
      if (!showcaseVisible || !txRows.length) return;
      /* Shift existing rows down by updating their content */
      for (var r = txRows.length - 1; r > 0; r--) {
        txRows[r].innerHTML = txRows[r - 1].innerHTML;
      }
      /* New transaction at top */
      var t = txData[txI % txData.length]; txI++;
      var secs = Math.floor(Math.random() * 10) + 1;
      txRows[0].innerHTML =
        '<div class="pbrd-ec-viz-tx-status ' + t.s + '">' + (t.s === "paid" ? "Paid" : "Refund") + '</div>' +
        '<span>' + t.a + '</span><span>' + t.m + '</span><span>' + secs + 's ago</span>';
      txRows[0].style.opacity = "0";
      requestAnimationFrame(function () { txRows[0].style.transition = "opacity 0.4s"; txRows[0].style.opacity = "1"; });
    }, 3000);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 4: Benefits Grid Copy Override     */
  /* ═══════════════════════════════════════════ */

  function enhanceBenefits() {
    /* Find and replace the benefits section */
    var section = findSectionByHeading("built for the way");
    if (!section) return;

    /* Hide ALL original content */
    var children = section.children;
    for (var c = 0; c < children.length; c++) children[c].style.display = "none";

    var ICON = BASE + "icons/";
    var bento = document.createElement("div");
    bento.className = "pbrd-ec-bento-wrap";

    bento.innerHTML =
      '<div class="pbrd-ec-bento-header">' +
        '<h2>Everything your checkout needs.<br>Nothing it doesn\u2019t.</h2>' +
        '<p>From the first click to the final confirmation \u2014 every tool to maximize revenue and minimize friction.</p>' +
      '</div>' +

      '<div class="pbrd-ec-bento">' +

        /* Row 1: Checkout (large) + Dashboard (large) */
        '<div class="pbrd-ec-bento-card pbrd-ec-bento-lg">' +
          '<h3>Your brand. Their favorite way to pay.</h3>' +
          '<p>White-labeled checkout that auto-detects country and shows the right methods. Guest checkout, saved cards, one-tap wallets.</p>' +
          '<div class="pbrd-ec-bento-viz">' +
            '<div class="pbrd-ec-bv-checkout">' +
              '<div class="pbrd-ec-bv-chk-row"><img src="' + ICON + 'visa.png"><span>Visa</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-bv-chk-row"><img src="' + ICON + 'applepay.png"><span>Apple Pay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-bv-chk-row"><img src="' + ICON + 'klarna.png"><span>Klarna</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
              '<div class="pbrd-ec-bv-chk-row"><img src="' + ICON + 'mbway.png"><span>MBWay</span><div class="pbrd-ec-viz-toggle on"></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="pbrd-ec-bento-card pbrd-ec-bento-lg">' +
          '<h3>Real-time transaction feed.</h3>' +
          '<p>Every payment, every channel, one screen. Search, filter, refund \u2014 in seconds.</p>' +
          '<div class="pbrd-ec-bento-viz">' +
            '<div class="pbrd-ec-bv-feed" id="pbrd-ec-bento-feed">' +
              '<div class="pbrd-ec-bv-tx"><div class="pbrd-ec-bv-status paid">Paid</div><span>\u20AC89.00</span><span>Visa \u2022\u20224821</span><span>just now</span></div>' +
              '<div class="pbrd-ec-bv-tx"><div class="pbrd-ec-bv-status paid">Paid</div><span>\u20AC245.50</span><span>PayPal</span><span>12s ago</span></div>' +
              '<div class="pbrd-ec-bv-tx"><div class="pbrd-ec-bv-status refund">Refund</div><span>\u20AC32.00</span><span>MBWay</span><span>28s ago</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Row 2: Pay Links + Security + Global */
        '<div class="pbrd-ec-bento-card pbrd-ec-bento-tall">' +
          '<h3>Send a link. Get paid.</h3>' +
          '<p>Payment links via WhatsApp, SMS, email. Perfect for phone orders and remote sales.</p>' +
          '<div class="pbrd-ec-bento-viz pbrd-ec-bv-link-viz">' +
            '<div class="pbrd-ec-bv-link-mock">' +
              '<div class="pbrd-ec-bv-link-success-icon">' + checkSVG + '</div>' +
              '<div class="pbrd-ec-bv-link-title">Link Created!</div>' +
              '<div class="pbrd-ec-bv-link-amount-row">EUR 64.00</div>' +
              '<div class="pbrd-ec-bv-link-url-box">' +
                '<div class="pbrd-ec-bv-link-url-label">Payment Link</div>' +
                '<div class="pbrd-ec-bv-link-url">https://link.paybyrd.com/chk9Dc</div>' +
              '</div>' +
              '<div class="pbrd-ec-bv-link-btn-copy">Copy Link</div>' +
              '<div class="pbrd-ec-bv-link-btn-share">Share via WhatsApp, Email\u2026</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="pbrd-ec-bento-card">' +
          '<h3>Fraud blocked.<br>Revenue protected.</h3>' +
          '<p>AI risk scoring. 3D Secure. Smart rules that learn your business.</p>' +
          '<div class="pbrd-ec-bento-viz">' +
            '<div class="pbrd-ec-bv-shield">' +
              '<div class="pbrd-ec-bv-shield-icon">' +
                '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5.25-3.44 10.14-8 11.5C7.44 22.14 4 17.25 4 12V7l8-4z" stroke="currentColor" stroke-width="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '</div>' +
              '<div class="pbrd-ec-bv-shield-stats">' +
                '<div><strong>0.12%</strong> chargeback rate</div>' +
                '<div><strong>92.7%</strong> approval rate</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="pbrd-ec-bento-card">' +
          '<h3>Go global.<br>Pay local.</h3>' +
          '<p>35+ methods across 192 currencies. Auto-detect shopper location.</p>' +
          '<div class="pbrd-ec-bento-viz">' +
            '<div class="pbrd-ec-bv-global">' +
              '<div class="pbrd-ec-bv-flag-row">' +
                '<span>\uD83C\uDDF5\uD83C\uDDF9</span><span>\uD83C\uDDF3\uD83C\uDDF1</span><span>\uD83C\uDDE9\uD83C\uDDEA</span><span>\uD83C\uDDEB\uD83C\uDDF7</span><span>\uD83C\uDDEA\uD83C\uDDF8</span><span>\uD83C\uDDEC\uD83C\uDDE7</span><span>\uD83C\uDDE7\uD83C\uDDF7</span><span>\uD83C\uDDE6\uD83C\uDDF4</span>' +
              '</div>' +
              '<div class="pbrd-ec-bv-global-stat"><strong>35+</strong> methods \u2022 <strong>192</strong> currencies</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Row 3: Subscriptions (wide) */
        '<div class="pbrd-ec-bento-card pbrd-ec-bento-wide">' +
          '<div class="pbrd-ec-bento-wide-inner">' +
            '<div>' +
              '<h3>Recurring revenue. Zero effort.</h3>' +
              '<p>Tokenized billing with automatic retries, dunning, and card updates. Reduce involuntary churn by up to 30%.</p>' +
            '</div>' +
            '<div class="pbrd-ec-bento-viz">' +
              '<div class="pbrd-ec-bv-sub">' +
                '<div class="pbrd-ec-bv-sub-icon">' + checkSVG + '</div>' +
                '<div class="pbrd-ec-bv-sub-text">Subscription Confirmed</div>' +
                '<div class="pbrd-ec-bv-sub-detail">\u20AC29.90/mo \u2022 Auto-renewal \u2022 Card on file</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>';

    section.appendChild(bento);

    observeReveal(".pbrd-ec-bento-card", 100, bento);

    /* Animate the bento feed — text swap only, no DOM creation */
    var bentoFeed = document.getElementById("pbrd-ec-bento-feed");
    if (bentoFeed) {
      var feedPool = [
        { s: "paid", a: "\u20AC156.00", m: "Mastercard" },
        { s: "paid", a: "\u20AC42.50", m: "Apple Pay" },
        { s: "paid", a: "\u20AC318.00", m: "Visa \u2022\u20225847" },
        { s: "refund", a: "\u20AC19.90", m: "iDEAL" },
        { s: "paid", a: "\u20AC78.00", m: "Google Pay" },
        { s: "paid", a: "\u20AC205.50", m: "Klarna" }
      ];
      var feedIdx = 0;
      var feedRows = bentoFeed.querySelectorAll(".pbrd-ec-bv-tx");
      var bentoVisible = false;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e) { bentoVisible = e[0].isIntersecting; }, { threshold: 0.1 }).observe(bentoFeed);
      } else { bentoVisible = true; }

      setInterval(function () {
        if (!bentoVisible || !feedRows.length) return;
        for (var r = feedRows.length - 1; r > 0; r--) {
          feedRows[r].innerHTML = feedRows[r - 1].innerHTML;
        }
        var f = feedPool[feedIdx % feedPool.length]; feedIdx++;
        feedRows[0].innerHTML = '<div class="pbrd-ec-bv-status ' + f.s + '">' + (f.s === "paid" ? "Paid" : "Refund") + '</div><span>' + f.a + '</span><span>' + f.m + '</span><span>just now</span>';
        feedRows[0].style.opacity = "0";
        requestAnimationFrame(function () { feedRows[0].style.transition = "opacity 0.4s"; feedRows[0].style.opacity = "1"; });
      }, 3500);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 5: Data Section — copy enhancement */
  /* ═══════════════════════════════════════════ */

  function enhanceDataSection() {
    var section = findSectionByHeading("data that drives");
    if (!section) return;

    /* Override the bullet point copy with action-oriented text */
    var copyMap = {
      "monitor drop": "See exactly where customers leave \u2014 and why",
      "spot failed": "Recover revenue from failed payments automatically",
      "track method": "Know which payment methods convert \u2014 and which cost you sales",
      "identify friction": "Catch problems before they become lost revenue",
      "test and iterate": "Optimize without writing a single line of code"
    };

    section.querySelectorAll("p, span, div").forEach(function (el) {
      if (el.children.length > 0) return;
      var txt = el.textContent.toLowerCase().trim();
      for (var key in copyMap) {
        if (txt.indexOf(key) === 0) {
          el.textContent = copyMap[key];
          break;
        }
      }
    });

    /* Add closing stat — insert before the integrations section */
    if (!document.querySelector(".pbrd-ec-data-stat")) {
      var intSection = findSectionByHeading("stack you already") || findSectionByHeading("plug in");
      if (intSection) {
        var stat = document.createElement("div");
        stat.className = "pbrd-ec-data-stat";
        stat.innerHTML = '<p>Merchants using Paybyrd analytics recover an average of <strong>12% more revenue</strong> within 60 days.</p>';
        intSection.insertAdjacentElement("beforebegin", stat);
      }
    }
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

    /* Override only the first short paragraph */
    var overridden = false;
    section.querySelectorAll("p").forEach(function (p) {
      if (!overridden && p.textContent.length > 30 && p.textContent.length < 200) {
        p.textContent = "Pre-built integrations for every major e-commerce platform. Your developer spends hours, not months. Full REST API for custom builds.";
        overridden = true;
      }
    });

    /* Replace the oversized dashboard image with a live mockup */
    var imgCol = section.querySelector("[class*='column-2'], [class*='image']");
    if (!imgCol) {
      /* Try to find the image directly and use its parent */
      section.querySelectorAll("img").forEach(function (img) {
        var src = (img.getAttribute("src") || "").toLowerCase();
        if (src.indexOf("paybyrd") !== -1 || src.indexOf("dashboard") !== -1 || src.indexOf("statistic") !== -1) {
          imgCol = img.closest("[class*='column']") || img.parentElement;
        }
      });
    }
    if (imgCol) {
      /* Hide original content */
      Array.from(imgCol.children).forEach(function (c) { c.style.display = "none"; });

      var dash = document.createElement("div");
      dash.className = "pbrd-ec-live-dash";
      dash.innerHTML =
        /* Sidebar */
        '<div class="pbrd-ec-ld-sidebar">' +
          '<div class="pbrd-ec-ld-logo"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#8B5CF6"/></svg></div>' +
          '<div class="pbrd-ec-ld-sidebar-label">DASHBOARD</div>' +
          '<div class="pbrd-ec-ld-sidebar-item active"><svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg>Dashboard</div>' +
          '<div class="pbrd-ec-ld-sidebar-label">PAYMENTS</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M3 7h14M3 11h14M3 15h10" stroke-width="1.5" stroke-linecap="round"/></svg>Transactions</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M10 2v16M6 6l4-4 4 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Payouts</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><rect x="3" y="5" width="14" height="10" rx="2" stroke-width="1.5"/></svg>Orders</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M10 2l7 4v4c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" stroke-width="1.5"/></svg>Chargebacks</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M15 7l-5 5-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="10" r="8" stroke-width="1.5"/></svg>PayLink</div>' +
          '<div class="pbrd-ec-ld-sidebar-label">INSIGHTS</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><path d="M3 17l4-6 3 3 5-8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Business Intelligence</div>' +
          '<div class="pbrd-ec-ld-sidebar-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><circle cx="10" cy="10" r="7" stroke-width="1.5"/><path d="M10 6v4l3 2" stroke-width="1.5" stroke-linecap="round"/></svg>Activity Log</div>' +
        '</div>' +

        /* Main */
        '<div class="pbrd-ec-ld-main">' +
          /* Top bar */
          '<div class="pbrd-ec-ld-topbar">' +
            '<div>' +
              '<div class="pbrd-ec-ld-greeting">Good morning, Ana Ferreira</div>' +
              '<div class="pbrd-ec-ld-sub">Here\u2019s your business overview.</div>' +
            '</div>' +
            '<div class="pbrd-ec-ld-search"><svg viewBox="0 0 16 16" fill="none" width="10" height="10"><circle cx="7" cy="7" r="5" stroke="#9CA3AF" stroke-width="1.5"/><path d="M11 11l3 3" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg>Search transactions, orders...</div>' +
          '</div>' +

          /* Volume cards row */
          '<div class="pbrd-ec-ld-cards">' +
            '<div class="pbrd-ec-ld-vol-card blue">' +
              '<div class="pbrd-ec-ld-vol-label">EUR Total Volume</div>' +
              '<div class="pbrd-ec-ld-vol-amount" id="pbrd-ec-ld-vol">\u20AC2,315,238.19</div>' +
              '<div class="pbrd-ec-ld-vol-metas">' +
                '<span>Transactions <strong>21,044</strong></span>' +
                '<span>Avg \u20AC110.02</span>' +
                '<span>Total <strong>22,979</strong></span>' +
              '</div>' +
            '</div>' +
            '<div class="pbrd-ec-ld-vol-card red">' +
              '<div class="pbrd-ec-ld-vol-label">EUR Refund Volume</div>' +
              '<div class="pbrd-ec-ld-vol-amount">\u20AC47,664.24</div>' +
              '<div class="pbrd-ec-ld-vol-metas">' +
                '<span><strong>200</strong></span>' +
                '<span>\u20AC2,357,175</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

          /* Currency volume counters */
          '<div class="pbrd-ec-ld-currencies">' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDEA\uD83C\uDDFA</span><span class="pbrd-ec-ld-cur-code">EUR</span><span class="pbrd-ec-ld-cur-val">\u20AC1,847,201</span></div>' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDE7\uD83C\uDDF7</span><span class="pbrd-ec-ld-cur-code">BRL</span><span class="pbrd-ec-ld-cur-val">R$312,445</span></div>' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDFA\uD83C\uDDF8</span><span class="pbrd-ec-ld-cur-code">USD</span><span class="pbrd-ec-ld-cur-val">$198,720</span></div>' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDE6\uD83C\uDDF4</span><span class="pbrd-ec-ld-cur-code">AOA</span><span class="pbrd-ec-ld-cur-val">Kz45,200k</span></div>' +
            '<div class="pbrd-ec-ld-cur"><span class="pbrd-ec-ld-cur-flag">\uD83C\uDDF5\uD83C\uDDF1</span><span class="pbrd-ec-ld-cur-code">PLN</span><span class="pbrd-ec-ld-cur-val">z\u014289,330</span></div>' +
          '</div>' +

          /* Bottom row: Latest Payments + Acceptance */
          '<div class="pbrd-ec-ld-bottom">' +
            '<div class="pbrd-ec-ld-panel">' +
              '<div class="pbrd-ec-ld-panel-header">Latest Payments</div>' +
              '<div class="pbrd-ec-ld-txs" id="pbrd-ec-ld-txs">' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#10b981"></span><span>VG Evora</span><span class="pbrd-ec-ld-tx-a">\u20AC22.20</span></div>' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#10b981"></span><span>VG Pal\u00E1cio dos Arcos</span><span class="pbrd-ec-ld-tx-a">\u20AC12.50</span></div>' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#10b981"></span><span>VG Collection Elvas</span><span class="pbrd-ec-ld-tx-a">\u20AC73.20</span></div>' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#f59e0b"></span><span>SMY St Eulalia</span><span class="pbrd-ec-ld-tx-a">\u20AC62.00</span></div>' +
                '<div class="pbrd-ec-ld-tx"><span class="pbrd-ec-ld-tx-dot" style="background:#10b981"></span><span>Vila Gal\u00E9 Cascais</span><span class="pbrd-ec-ld-tx-a">\u20AC128.60</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="pbrd-ec-ld-panel">' +
              '<div class="pbrd-ec-ld-panel-header">Payment Acceptance<span class="pbrd-ec-ld-badge">92.7%</span></div>' +
              '<div class="pbrd-ec-ld-accept">' +
                '<div class="pbrd-ec-ld-accept-row"><span>EUR</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:96%;background:#10b981"></div></div><span class="pbrd-ec-ld-pct green">96%</span></div>' +
                '<div class="pbrd-ec-ld-accept-row"><span>BRL</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:82%;background:#F59E0B"></div></div><span class="pbrd-ec-ld-pct yellow">82%</span></div>' +
                '<div class="pbrd-ec-ld-accept-row"><span>USD</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:88%;background:#EF4444"></div></div><span class="pbrd-ec-ld-pct red">88%</span></div>' +
                '<div class="pbrd-ec-ld-accept-row"><span>AOA</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:71%;background:#8B5CF6"></div></div><span class="pbrd-ec-ld-pct purple">71%</span></div>' +
                '<div class="pbrd-ec-ld-accept-row"><span>PLN</span><div class="pbrd-ec-ld-bar"><div class="pbrd-ec-ld-bar-fill" style="--bar-w:100%;background:#2B6FED"></div></div><span class="pbrd-ec-ld-pct blue">100%</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';

      imgCol.appendChild(dash);

      /* Animate volume counter */
      var volEl = document.getElementById("pbrd-ec-ld-vol");
      var vol = 3529455;
      setInterval(function () {
        vol += Math.floor(Math.random() * 800) + 100;
        if (volEl) volEl.textContent = "\u20AC" + vol.toLocaleString("en");
      }, 4000);

      /* Animate transactions */
      var ldTxs = document.getElementById("pbrd-ec-ld-txs");
      var ldPool = [
        { a: "\u20AC156.00", m: "Mastercard" }, { a: "\u20AC42.50", m: "Apple Pay" },
        { a: "\u20AC318.00", m: "Klarna" }, { a: "\u20AC78.00", m: "Google Pay" },
        { a: "\u20AC205.50", m: "iDEAL" }, { a: "\u20AC93.20", m: "Visa \u2022\u20225847" }
      ];
      var ldI = 0;
      if (ldTxs) {
        var ldRows = ldTxs.querySelectorAll(".pbrd-ec-ld-tx");
        setInterval(function () {
          var t = ldPool[ldI % ldPool.length]; ldI++;
          for (var r = ldRows.length - 1; r > 0; r--) ldRows[r].innerHTML = ldRows[r - 1].innerHTML;
          ldRows[0].innerHTML = '<span class="pbrd-ec-ld-tx-s paid">Paid</span><span class="pbrd-ec-ld-tx-a">' + t.a + '</span><span>' + t.m + '</span><span>just now</span>';
          ldRows[0].style.opacity = "0";
          requestAnimationFrame(function () { ldRows[0].style.transition = "opacity 0.4s"; ldRows[0].style.opacity = "1"; });
        }, 3500);
      }

      /* Animate acceptance bars */
      setTimeout(function () {
        dash.querySelectorAll(".pbrd-ec-ld-bar-fill").forEach(function (f) {
          f.style.width = f.style.getPropertyValue("--bar-w");
        });
      }, 500);

      /* Rotate greeting name */
      var greetNames = [
        "Ana Ferreira", "Faisal Al-Lawr",
        "Sophie van Dijk", "Charlie Munger", "Luca Bianchi"
      ];
      var greetIdx = 0;
      var greetEl = dash.querySelector(".pbrd-ec-ld-greeting");
      if (greetEl) {
        setInterval(function () {
          greetIdx = (greetIdx + 1) % greetNames.length;
          greetEl.style.opacity = "0";
          setTimeout(function () {
            greetEl.textContent = "Good morning, " + greetNames[greetIdx];
            greetEl.style.opacity = "1";
          }, 400);
        }, 3000);
      }
    }

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
  /* Section 7: Checkout Experience (Mollie-style) */
  /* ═══════════════════════════════════════════ */

  function enhanceJourney() {
    var ICON = BASE + "icons/";

    /* Find the heading */
    var heading = null;
    document.querySelectorAll("h2").forEach(function (h) {
      if (h.textContent.toLowerCase().includes("every part of the journey")) heading = h;
    });
    if (!heading) return;

    /* Find the section and hide it entirely */
    var section = heading.closest("section") || heading.closest(".u-section") || heading.closest("[class*='section']");
    if (!section) return;
    section.style.display = "none";

    /* Also hide the wrapper div around it (Webflow wraps sections in divs) */
    var sectionParent = section.parentElement;
    if (sectionParent && sectionParent.tagName === "DIV" && sectionParent.children.length === 1) {
      sectionParent.style.display = "none";
    }

    /* Create a new standalone section and insert it where the old one was */
    var newSection = document.createElement("section");
    newSection.className = "pbrd-ec-checkout-section";
    newSection.style.background = "#fff";
    newSection.style.padding = "80px 0";
    var insertTarget = sectionParent && sectionParent.style.display === "none" ? sectionParent : section;
    insertTarget.insertAdjacentElement("afterend", newSection);

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ec-checkout";
    wrap.innerHTML =
      /* Section header */
      '<div class="pbrd-ec-chk-header">' +
        '<h2 class="pbrd-ec-chk-title">Offer every customer a seamless checkout experience</h2>' +
        '<p class="pbrd-ec-chk-sub">Create a branded checkout tailored to your customers\u2019 needs with our no-code solution and customisable checkout components.</p>' +
      '</div>' +

      /* Four cards — 2x2 grid */
      '<div class="pbrd-ec-chk-grid">' +

        /* Card 1: Prebuilt Checkout with TAP image */
        '<div class="pbrd-ec-chk-card pbrd-ec-reveal">' +
          '<div class="pbrd-ec-chk-card-visual pbrd-ec-chk-vis-checkout">' +
            '<img src="' + BASE + 'ecommerce/tapcheckout.png" alt="TAP Air Portugal" class="pbrd-ec-chk-bg-img">' +
            '<div class="pbrd-ec-chk-form-overlay">' +
              '<div class="pbrd-ec-paybyrd-chk" id="pbrd-ec-live-chk">' +
                '<div class="pbrd-ec-pchk-head">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dcc_tap-logo.svg" alt="TAP" style="height:11px;max-height:11px;width:auto;filter:brightness(10)">' +
                  '<div class="pbrd-ec-pchk-amount">\u20AC347.00</div>' +
                  '<div class="pbrd-ec-pchk-ref">Order #TAP-29471</div>' +
                '</div>' +
                '<div class="pbrd-ec-pchk-tabs">' +
                  '<div class="pbrd-ec-pchk-tab active"><img src="' + ICON + 'visa.png" style="height:12px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'applepay.png" style="height:12px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'mbway.png" style="height:12px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'paypal.png" style="height:12px"></div>' +
                '</div>' +
                '<div class="pbrd-ec-pchk-form">' +
                  '<div class="pbrd-ec-pchk-field"><label>Card number</label><div class="pbrd-ec-pchk-input" id="pbrd-pchk-card"></div></div>' +
                  '<div class="pbrd-ec-pchk-row">' +
                    '<div class="pbrd-ec-pchk-field"><label>Expiry</label><div class="pbrd-ec-pchk-input" id="pbrd-pchk-exp"></div></div>' +
                    '<div class="pbrd-ec-pchk-field"><label>CVC</label><div class="pbrd-ec-pchk-input" id="pbrd-pchk-cvc"></div></div>' +
                  '</div>' +
                  '<div class="pbrd-ec-pchk-field"><label>Name</label><div class="pbrd-ec-pchk-input" id="pbrd-pchk-name"></div></div>' +
                '</div>' +
                '<div class="pbrd-ec-pchk-btn" id="pbrd-pchk-btn">Pay \u20AC347.00</div>' +
                '<div class="pbrd-ec-pchk-powered">Powered by <strong>Paybyrd</strong></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-chk-card-body pbrd-ec-chk-body-glass">' +
            '<h3>Your brand, their preferred way to pay</h3>' +
            '<p>A fully branded checkout that feels native to your store. Auto-detects country, remembers returning shoppers, supports 35+ methods.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Launch in minutes, no developers needed</li>' +
              '<li>' + checkSVG + '23% higher conversion vs generic checkouts</li>' +
              '<li>' + checkSVG + 'Full brand control \u2014 colours, logo, domain</li>' +
            '</ul>' +
            '<a class="pbrd-ec-chk-link" href="/e-commerce">Explore hosted checkout <span>\u2192</span></a>' +
          '</div>' +
        '</div>' +

        /* Card 2: Custom Components */
        '<div class="pbrd-ec-chk-card pbrd-ec-reveal">' +
          '<div class="pbrd-ec-chk-card-visual">' +
            '<div class="pbrd-ec-chk-components" id="pbrd-ec-comp-vis">' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.1s">' +
                '<div class="pbrd-ec-chk-comp-label">Payment Method Selector</div>' +
                '<div class="pbrd-ec-chk-comp-methods" id="pbrd-comp-pills">' +
                  '<div class="pbrd-ec-chk-comp-pill active">Card</div>' +
                  '<div class="pbrd-ec-chk-comp-pill">MBWay</div>' +
                  '<div class="pbrd-ec-chk-comp-pill">PayPal</div>' +
                '</div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.25s">' +
                '<div class="pbrd-ec-chk-comp-label" id="pbrd-comp-field-label">Card Input</div>' +
                '<div class="pbrd-ec-chk-comp-input"><span id="pbrd-comp-input"></span></div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.4s">' +
                '<div class="pbrd-ec-chk-comp-label">Submit Button</div>' +
                '<div class="pbrd-ec-chk-comp-submit" id="pbrd-comp-submit">Pay now</div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-code pbrd-ec-chk-comp-pop" style="--d:0.55s" id="pbrd-comp-code">' +
                '<span class="pbrd-ec-chk-code-ln">1</span><span style="color:#c678dd">import</span> { PaybyrdCheckout } <span style="color:#c678dd">from</span> <span style="color:#98c379">\'@paybyrd/sdk\'</span>' +
                '<br><span class="pbrd-ec-chk-code-ln">2</span>' +
                '<br><span class="pbrd-ec-chk-code-ln">3</span><span style="color:#c678dd">const</span> checkout = <span style="color:#c678dd">new</span> <span style="color:#e5c07b">PaybyrdCheckout</span>({' +
                '<br><span class="pbrd-ec-chk-code-ln">4</span>  amount: <span style="color:#d19a66">34700</span>,' +
                '<br><span class="pbrd-ec-chk-code-ln">5</span>  currency: <span style="color:#98c379">\'EUR\'</span>' +
                '<br><span class="pbrd-ec-chk-code-ln">6</span>})' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-chk-card-body pbrd-ec-chk-body-glass">' +
            '<h3>Build your own with drop-in components</h3>' +
            '<p>Full control over every pixel. Drop pre-certified PCI components into your own UI \u2014 method selector, card fields, tokenisation \u2014 all from one SDK.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'PCI-compliant without the audit burden</li>' +
              '<li>' + checkSVG + 'Match your design system exactly</li>' +
              '<li>' + checkSVG + 'Tokenise cards for one-click repeat purchases</li>' +
            '</ul>' +
            '<a class="pbrd-ec-chk-link" href="/e-commerce">Explore components <span>\u2192</span></a>' +
          '</div>' +
        '</div>' +

        /* Card 3: Mobile-first / Thumb-friendly */
        '<div class="pbrd-ec-chk-card pbrd-ec-reveal">' +
          '<div class="pbrd-ec-chk-card-visual">' +
            '<div class="pbrd-ec-chk-mobile-visual">' +
              '<div class="pbrd-ec-chk-phone" id="pbrd-ec-mob-chk">' +
                '<div class="pbrd-ec-chk-phone-notch"></div>' +
                '<div class="pbrd-ec-chk-phone-screen">' +
                  /* Mini Paybyrd checkout inside phone */
                  '<div class="pbrd-ec-mob-head">' +
                    '<span class="pbrd-ec-mob-powered">Powered by <strong>Paybyrd</strong></span>' +
                    '<div class="pbrd-ec-mob-amount">\u20AC89.00</div>' +
                  '</div>' +
                  '<div class="pbrd-ec-mob-tabs">' +
                    '<div class="pbrd-ec-mob-tab" id="pbrd-mob-t0"><img src="' + ICON + 'visa.png" style="height:19px;width:auto"></div>' +
                    '<div class="pbrd-ec-mob-tab" id="pbrd-mob-t1"><img src="' + ICON + 'applepay.png" style="height:19px;width:auto"></div>' +
                    '<div class="pbrd-ec-mob-tab active" id="pbrd-mob-t2"><img src="' + ICON + 'mbway.png" style="height:19px;width:auto"></div>' +
                  '</div>' +
                  '<div class="pbrd-ec-mob-form" id="pbrd-mob-form">' +
                    '<div class="pbrd-ec-mob-field"><label>Phone number</label><div class="pbrd-ec-mob-input" id="pbrd-mob-phone"></div></div>' +
                  '</div>' +
                  '<div class="pbrd-ec-mob-btn" id="pbrd-mob-btn">Pay with MBWay</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-chk-card-body pbrd-ec-chk-body-glass">' +
            '<h3>Thumb-friendly payments that convert</h3>' +
            '<p>67% of e-commerce traffic is mobile. Your checkout should be built for thumbs, not mice. One-tap wallets, biometric auth, zero typing.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Apple Pay, Google Pay, MBWay in one tap</li>' +
              '<li>' + checkSVG + 'Auto-detects device and shows best option</li>' +
              '<li>' + checkSVG + 'Responsive down to 320px \u2014 every screen covered</li>' +
            '</ul>' +
            '<a class="pbrd-ec-chk-link" href="/e-commerce">See mobile experience <span>\u2192</span></a>' +
          '</div>' +
        '</div>' +

        /* Card 4: Recurring / Subscriptions */
        '<div class="pbrd-ec-chk-card pbrd-ec-reveal">' +
          '<div class="pbrd-ec-chk-card-visual">' +
            '<div class="pbrd-ec-chk-recurring-visual">' +
              '<div class="pbrd-ec-chk-rec-timeline">' +
                '<div class="pbrd-ec-chk-rec-event pbrd-ec-chk-comp-pop" style="--d:0.1s">' +
                  '<div class="pbrd-ec-chk-rec-dot green"></div>' +
                  '<div class="pbrd-ec-chk-rec-info"><strong>\u20AC29.99</strong> charged<span>Apr 1 \u2022 Visa \u2022\u20224821</span></div>' +
                '</div>' +
                '<div class="pbrd-ec-chk-rec-event pbrd-ec-chk-comp-pop" style="--d:0.25s">' +
                  '<div class="pbrd-ec-chk-rec-dot green"></div>' +
                  '<div class="pbrd-ec-chk-rec-info"><strong>\u20AC29.99</strong> charged<span>Mar 1 \u2022 Visa \u2022\u20224821</span></div>' +
                '</div>' +
                '<div class="pbrd-ec-chk-rec-event pbrd-ec-chk-comp-pop" style="--d:0.4s">' +
                  '<div class="pbrd-ec-chk-rec-dot yellow"></div>' +
                  '<div class="pbrd-ec-chk-rec-info"><strong>\u20AC29.99</strong> retry succeeded<span>Feb 3 \u2022 Auto-retry #2</span></div>' +
                '</div>' +
                '<div class="pbrd-ec-chk-rec-event pbrd-ec-chk-comp-pop" style="--d:0.55s">' +
                  '<div class="pbrd-ec-chk-rec-dot green"></div>' +
                  '<div class="pbrd-ec-chk-rec-info"><strong>\u20AC29.99</strong> charged<span>Jan 1 \u2022 Visa \u2022\u20224821</span></div>' +
                '</div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-rec-stat pbrd-ec-chk-comp-pop" style="--d:0.7s">' +
                '<div class="pbrd-ec-chk-rec-stat-val">97.3%</div>' +
                '<div class="pbrd-ec-chk-rec-stat-label">Collection rate</div>' +
                '<div class="pbrd-ec-chk-rec-stat-sub">\u2191 4.1% from smart retries</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-chk-card-body pbrd-ec-chk-body-glass">' +
            '<h3>Recurring revenue on autopilot</h3>' +
            '<p>Tokenised billing that handles retries, dunning, and card updates automatically. Stop losing subscribers to expired cards.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Smart retry logic recovers 30% of failed charges</li>' +
              '<li>' + checkSVG + 'Automatic card updater \u2014 never lose a subscriber</li>' +
              '<li>' + checkSVG + 'SCA-ready with 3DS2 built in</li>' +
            '</ul>' +
            '<a class="pbrd-ec-chk-link" href="/e-commerce">Explore subscriptions <span>\u2192</span></a>' +
          '</div>' +
        '</div>' +

      '</div>';

    newSection.appendChild(wrap);
    observeReveal(".pbrd-ec-reveal", 150, wrap);

    /* ─── Checkout form fill animation ─── */
    var chkEl = document.getElementById("pbrd-ec-live-chk");
    if (chkEl) {
      var cardEl = document.getElementById("pbrd-pchk-card");
      var expEl = document.getElementById("pbrd-pchk-exp");
      var cvcEl = document.getElementById("pbrd-pchk-cvc");
      var nameEl = document.getElementById("pbrd-pchk-name");
      var btnEl = document.getElementById("pbrd-pchk-btn");

      function runCheckoutAnim() {
        /* Reset */
        cardEl.textContent = "";
        expEl.textContent = "";
        cvcEl.textContent = "";
        nameEl.textContent = "";
        btnEl.textContent = "Pay \u20AC347.00";
        btnEl.style.background = "";
        chkEl.querySelector(".pbrd-ec-pchk-form").style.display = "";

        /* Type card → expiry → cvc → name → pay → success */
        setTimeout(function () {
          typeText(cardEl, "4821 3829 4455 7392", 400, function () {
            typeText(expEl, "09/28", 300, function () {
              typeText(cvcEl, "\u2022\u2022\u2022", 300, function () {
                typeText(nameEl, "Ana Ferreira", 600, function () {
                  /* Click pay */
                  btnEl.textContent = "Processing\u2026";
                  btnEl.style.opacity = "0.7";
                  setTimeout(function () {
                    btnEl.textContent = "\u2713 Payment successful";
                    btnEl.style.background = "#059669";
                    btnEl.style.opacity = "1";
                    /* Wait then restart */
                    setTimeout(runCheckoutAnim, 3000);
                  }, 1800);
                });
              });
            });
          });
        }, 800);
      }

      /* Only animate when visible */
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            runCheckoutAnim();
            this.disconnect();
          }
        }, { threshold: 0.3 }).observe(chkEl);
      }
    }

    /* ─── Mobile checkout animation ─── */
    var mobChk = document.getElementById("pbrd-ec-mob-chk");
    if (mobChk) {
      var mobPhone = document.getElementById("pbrd-mob-phone");
      var mobBtn = document.getElementById("pbrd-mob-btn");
      var mobForm = document.getElementById("pbrd-mob-form");
      var mobTabs = [document.getElementById("pbrd-mob-t0"), document.getElementById("pbrd-mob-t1"), document.getElementById("pbrd-mob-t2")];

      var mobMethods = [
        { tab: 2, label: "MBWay", field: "Phone number", value: "+351 912 345 678", btn: "Pay with MBWay" },
        { tab: 0, label: "Card", field: "Card number", value: "4821 3829 \u2022\u2022\u2022\u2022 7392", btn: "Pay \u20AC89.00" },
        { tab: 1, label: "Apple Pay", field: "", value: "", btn: "apple" }
      ];
      var mobIdx = 0;

      function runMobAnim() {
        var m = mobMethods[mobIdx % mobMethods.length];
        mobIdx++;

        /* Switch tab */
        mobTabs.forEach(function (t) { if (t) t.classList.remove("active"); });
        if (mobTabs[m.tab]) mobTabs[m.tab].classList.add("active");

        /* Update form */
        if (m.field) {
          mobForm.style.display = "";
          mobForm.innerHTML = '<div class="pbrd-ec-mob-field"><label>' + m.field + '</label><div class="pbrd-ec-mob-input" id="pbrd-mob-val"></div></div>';
          mobBtn.textContent = m.btn;
          mobBtn.style.background = "";
          var valEl = document.getElementById("pbrd-mob-val");
          setTimeout(function () {
            typeText(valEl, m.value, 500, function () {
              mobBtn.style.opacity = "0.7";
              mobBtn.textContent = "Processing\u2026";
              setTimeout(function () {
                mobBtn.textContent = "\u2713 Paid";
                mobBtn.style.background = "#059669";
                mobBtn.style.opacity = "1";
                setTimeout(runMobAnim, 2500);
              }, 1500);
            });
          }, 600);
        } else {
          /* Apple Pay — show dedicated Apple Pay button */
          mobForm.innerHTML = '<div class="pbrd-ec-mob-applepay-btn" id="pbrd-mob-apple-btn">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M17.72 7.54c-.48.56-1.27.99-2.04.93-.1-.77.28-1.59.72-2.1.48-.55 1.33-.96 2.02-.99.08.8-.23 1.59-.7 2.16zm.7 1.11c-1.13-.07-2.1.64-2.63.64-.54 0-1.35-.61-2.24-.59-1.15.02-2.22.67-2.81 1.7-1.2 2.08-.31 5.16.85 6.85.57.83 1.25 1.76 2.15 1.73.86-.04 1.18-.56 2.22-.56 1.04 0 1.33.56 2.23.54.93-.02 1.51-.84 2.08-1.68.65-.96.92-1.89.93-1.94-.02-.01-1.79-.69-1.81-2.73-.02-1.7 1.39-2.52 1.46-2.56-.8-1.18-2.04-1.31-2.48-1.34l.05-.06z"/></svg>' +
            ' Pay' +
          '</div>';
          mobForm.style.display = "";
          mobBtn.style.display = "none";
          setTimeout(function () {
            var appleBtn = document.getElementById("pbrd-mob-apple-btn");
            if (appleBtn) {
              appleBtn.style.opacity = "0.7";
              appleBtn.innerHTML = 'Processing\u2026';
            }
            setTimeout(function () {
              if (appleBtn) {
                appleBtn.innerHTML = '\u2713 Paid';
                appleBtn.style.background = "#059669";
                appleBtn.style.opacity = "1";
              }
              setTimeout(function () {
                mobBtn.style.display = "";
                runMobAnim();
              }, 2500);
            }, 1200);
          }, 1500);
        }
      }

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            runMobAnim();
            this.disconnect();
          }
        }, { threshold: 0.3 }).observe(mobChk);
      }
    }

    /* ─── Components card animation ─── */
    var compVis = document.getElementById("pbrd-ec-comp-vis");
    if (compVis) {
      var compPills = document.getElementById("pbrd-comp-pills");
      var compInput = document.getElementById("pbrd-comp-input");
      var compLabel = document.getElementById("pbrd-comp-field-label");
      var compSubmit = document.getElementById("pbrd-comp-submit");

      var compMethods = [
        { pill: 0, label: "Card Input", value: "4821 3829 \u2022\u2022\u2022\u2022 7392", btn: "Pay now" },
        { pill: 1, label: "Phone Number", value: "+351 912 345 678", btn: "Confirm with MBWay" },
        { pill: 2, label: "Email Address", value: "ana@ferreira.pt", btn: "Continue to PayPal" }
      ];
      var compIdx = 0;

      function runCompAnim() {
        var m = compMethods[compIdx % compMethods.length];
        compIdx++;

        /* Switch pill */
        var pills = compPills.querySelectorAll(".pbrd-ec-chk-comp-pill");
        pills.forEach(function (p) { p.classList.remove("active"); });
        if (pills[m.pill]) pills[m.pill].classList.add("active");

        /* Update label */
        compLabel.textContent = m.label;
        compInput.textContent = "";
        compSubmit.textContent = m.btn;
        compSubmit.style.background = "";
        compSubmit.style.color = "";

        /* Type value */
        setTimeout(function () {
          typeText(compInput, m.value, 500, function () {
            /* Submit */
            compSubmit.style.opacity = "0.7";
            compSubmit.textContent = "Processing\u2026";
            setTimeout(function () {
              compSubmit.textContent = "\u2713 Success";
              compSubmit.style.background = "#059669";
              compSubmit.style.color = "#fff";
              compSubmit.style.opacity = "1";
              setTimeout(runCompAnim, 2500);
            }, 1400);
          });
        }, 600);
      }

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            runCompAnim();
            this.disconnect();
          }
        }, { threshold: 0.3 }).observe(compVis);
      }
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 8: Expanded Testimonials           */
  /* ═══════════════════════════════════════════ */

  function buildTestimonials() {
    var CUST = BASE + "customers/";
    var testimonials = [
      {
        quote: "Paybyrd gave us what no other provider could \u2014 a single integration handling 20+ payment methods across 90 markets, with approval rates that recovered millions in revenue we were leaving on the table.",
        name: "Jo\u00E3o Frias",
        title: "Head of Payments",
        company: "TAP Air Portugal",
        tags: "#payments #aviation #global #20markets #revenuerecovery",
        logo: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg",
        video: CUST + "tap.mp4",
        poster: CUST + "tap-poster.jpg"
      },
      {
        quote: "Cart abandonment was our biggest leak. After implementing Paybyrd\u2019s checkout with Klarna and local methods like MBWay, we saw conversion jump meaningfully. The right payment method at the right moment changes everything.",
        name: "Rita Faria",
        title: "CEO",
        company: "KuantoKusta",
        tags: "#ecommerce #conversion #BNPL #checkout #MBWay",
        logo: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg",
        video: CUST + "kuantokusta.mp4",
        poster: CUST + "kuantokusta-poster.jpg"
      },
      {
        quote: "700+ routes, thousands of daily ticket purchases \u2014 and every single one needs to clear instantly. Paybyrd gave us the speed and reliability our passengers expect, with zero downtime during peak booking windows.",
        name: "Nelson Silva",
        title: "General Manager & IT Director",
        company: "Rede Expressos",
        tags: "#transport #ticketing #reliability #700routes #zerdowntime",
        logo: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png",
        video: CUST + "redeexpressos.mp4",
        poster: CUST + "redeexpressos-poster.jpg"
      }
    ];

    var existingTestimonial = findSectionByHeading("drop-off") || findSectionByHeading("testimonial");

    var section = document.createElement("section");
    section.className = "pbrd-ec-testimonials";

    var cardsHTML = testimonials.map(function (t, idx) {
      return '<div class="pbrd-ec-tvcard pbrd-ec-reveal" data-tv-idx="' + idx + '">' +
        /* IG header: avatar + name */
        '<div class="pbrd-ec-tv-ig-header">' +
          '<img src="' + t.logo + '" alt="' + t.company + '" class="pbrd-ec-tv-logo">' +
          '<div class="pbrd-ec-tv-ig-meta">' +
            '<div class="pbrd-ec-tv-name">' + t.name + '</div>' +
            '<div class="pbrd-ec-tv-title">' + t.title + ' \u2022 ' + t.company + '</div>' +
          '</div>' +
        '</div>' +
        /* Video area — autoplay */
        '<div class="pbrd-ec-tv-visual">' +
          '<video class="pbrd-ec-tv-vid" loop playsinline muted preload="none" poster="' + t.poster + '">' +
            '<source src="' + t.video + '" type="video/mp4">' +
          '</video>' +
        '</div>' +
        /* Caption area below */
        '<div class="pbrd-ec-tv-caption">' +
          '<div class="pbrd-ec-tv-quote"><strong>' + t.name.split(" ")[0].toLowerCase() + '</strong> \u201C' + t.quote + '\u201D</div>' +
          '<div class="pbrd-ec-tv-tags">' + t.tags + '</div>' +
        '</div>' +
      '</div>';
    }).join("");

    section.innerHTML =
      '<div class="pbrd-ec-testimonials-inner">' +
        '<div class="pbrd-ec-testimonials-header">' +
          '<h2>What merchants say.</h2>' +
          '<p>Don\u2019t take our word for it.</p>' +
        '</div>' +
        '<div class="pbrd-ec-tv-grid">' + cardsHTML + '</div>' +
      '</div>';

    if (existingTestimonial) {
      existingTestimonial.replaceWith(section);
    } else {
      var faq = findSectionByHeading("frequently asked");
      if (faq) faq.insertAdjacentElement("beforebegin", section);
    }

    observeReveal(".pbrd-ec-reveal", 150, section);

    /* ── Instagram-style lightbox modal ── */
    var modal = document.createElement("div");
    modal.className = "pbrd-ec-tv-modal";
    modal.innerHTML =
      '<div class="pbrd-ec-tv-modal-backdrop"></div>' +
      '<div class="pbrd-ec-tv-modal-content">' +
        '<div class="pbrd-ec-tv-modal-close">\u2715</div>' +
        /* Video side */
        '<div class="pbrd-ec-tv-modal-video">' +
          '<video id="pbrd-tv-modal-vid" playsinline loop preload="none"></video>' +
        '</div>' +
        /* IG right panel */
        '<div class="pbrd-ec-tv-modal-card">' +
          /* IG header */
          '<div class="pbrd-ec-tv-modal-ig-header">' +
            '<img id="pbrd-tv-modal-logo" alt="" class="pbrd-ec-tv-modal-avatar">' +
            '<div class="pbrd-ec-tv-modal-ig-meta">' +
              '<div id="pbrd-tv-modal-name" class="pbrd-ec-tv-modal-ig-name"></div>' +
              '<div id="pbrd-tv-modal-title" class="pbrd-ec-tv-modal-ig-title"></div>' +
            '</div>' +
          '</div>' +
          /* Caption */
          '<div class="pbrd-ec-tv-modal-caption">' +
            '<div class="pbrd-ec-tv-modal-quote" id="pbrd-tv-modal-quote"></div>' +
            '<div class="pbrd-ec-tv-modal-tags" id="pbrd-tv-modal-tags"></div>' +
          '</div>' +
          /* Bottom stats */
          '<div class="pbrd-ec-tv-modal-bottom">' +
            '<div class="pbrd-ec-tv-modal-stat" id="pbrd-tv-modal-stat"></div>' +
            '<div class="pbrd-ec-tv-modal-powered">Powered by <strong>Paybyrd</strong></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var modalVid = document.getElementById("pbrd-tv-modal-vid");

    function openModal(idx) {
      var t = testimonials[idx];
      modalVid.src = t.video;
      modalVid.poster = t.poster;
      document.getElementById("pbrd-tv-modal-logo").src = t.logo;
      document.getElementById("pbrd-tv-modal-name").textContent = t.name;
      document.getElementById("pbrd-tv-modal-title").textContent = t.title + " \u2022 " + t.company;
      document.getElementById("pbrd-tv-modal-quote").innerHTML = '<strong>' + t.name.split(" ")[0].toLowerCase() + '</strong> \u201C' + t.quote + '\u201D';
      document.getElementById("pbrd-tv-modal-tags").textContent = t.tags;
      document.getElementById("pbrd-tv-modal-stat").textContent = t.stat;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      modalVid.play().catch(function () {});
    }

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      modalVid.pause();
      modalVid.src = "";
    }

    modal.querySelector(".pbrd-ec-tv-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".pbrd-ec-tv-modal-backdrop").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
    });

    /* Click card to open modal */
    section.querySelectorAll(".pbrd-ec-tvcard").forEach(function (card) {
      card.addEventListener("click", function () {
        var idx = parseInt(card.getAttribute("data-tv-idx"), 10);
        openModal(idx);
      });
    });

    /* Autoplay card videos when visible */
    if ("IntersectionObserver" in window) {
      section.querySelectorAll(".pbrd-ec-tv-vid").forEach(function (vid) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            vid.play().catch(function () {});
          } else {
            vid.pause();
          }
        }, { threshold: 0.3 }).observe(vid);
      });
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 9: AI Support Enhancement         */
  /* ═══════════════════════════════════════════ */

  function enhanceAI() {
    var section = findSectionByHeading("let ai support");
    if (!section) return;

    var container = section.querySelector(".u-container, [class*='container']") || section;
    var children = container.children;
    for (var c = 0; c < children.length; c++) children[c].style.display = "none";

    var aiWrap = document.createElement("div");
    aiWrap.className = "pbrd-ec-ai-wrap";

    /* ── Chat scenarios ── */
    var chatScenarios = [
      { user: "I\u2019d like a refund for order #ORD-29471", lookup: "Let me look that up\u2026", oid: "#ORD-29471", amt: "\u20AC89.00", stat: "Delivered", offer: "Found it \u2014 delivered April 8. Want me to process the refund?", action: "Process Refund", success: "Refund of \u20AC89.00 processed. You\u2019ll see it in 3\u20135 business days.", newStat: "Refunded" },
      { user: "Where is my order #ORD-31205?", lookup: "Checking tracking now\u2026", oid: "#ORD-31205", amt: "\u20AC245.50", stat: "In Transit", offer: "Shipped via DHL. Currently in Amsterdam. ETA: April 14.", action: "Get Tracking Link", success: "Tracking link sent to your email.", newStat: "Tracked" },
      { user: "Change payment to PayPal for #ORD-30882", lookup: "Let me check\u2026", oid: "#ORD-30882", amt: "\u20AC156.00", stat: "Pending", offer: "This order hasn\u2019t been charged. I can switch to PayPal.", action: "Switch to PayPal", success: "Payment updated to PayPal. Confirmation email sent.", newStat: "Updated" }
    ];

    /* ── Search scenarios ── */
    var searchScenarios = [
      { query: "refunds over EUR 100 last week", hint: "Showing 4 refunds > \u20AC100, Apr 5\u201312", results: [
        { s: "refund", n: "Ana Ferreira", a: "\u20AC245.50", m: "Visa \u2022\u20224821", t: "Apr 11" },
        { s: "refund", n: "Lukas Weber", a: "\u20AC189.00", m: "PayPal", t: "Apr 10" },
        { s: "refund", n: "Sophie van Dijk", a: "\u20AC127.30", m: "iDEAL", t: "Apr 8" },
        { s: "refund", n: "Carlos Mendes", a: "\u20AC312.00", m: "Multibanco", t: "Apr 6" }
      ], detail: { id: "TXN-847291", a: "\u20AC245.50", cust: "Ana Ferreira", meth: "Visa \u2022\u20224821", stat: "Refunded", date: "April 11, 2026" } },
      { query: "failed payments today Klarna", hint: "2 failed Klarna transactions found today", results: [
        { s: "failed", n: "Emma Schmidt", a: "\u20AC67.90", m: "Klarna", t: "14:32" },
        { s: "failed", n: "Faisal Al-Lawr", a: "\u20AC156.00", m: "Klarna", t: "11:07" },
        { s: "paid", n: "Marta Silva", a: "\u20AC42.00", m: "Klarna", t: "09:45" },
        { s: "paid", n: "Jan de Vries", a: "\u20AC89.00", m: "Klarna", t: "08:21" }
      ], detail: { id: "TXN-847305", a: "\u20AC67.90", cust: "Emma Schmidt", meth: "Klarna", stat: "Failed", date: "April 12, 2026" } },
      { query: "top customers by volume this month", hint: "Ranked by total volume, April 2026", results: [
        { s: "paid", n: "Vila Gal\u00E9 Hotels", a: "\u20AC12,450", m: "Multi-method", t: "47 txns" },
        { s: "paid", n: "Porto Digital", a: "\u20AC8,320", m: "Multi-method", t: "31 txns" },
        { s: "paid", n: "Worten Online", a: "\u20AC6,180", m: "Multi-method", t: "28 txns" },
        { s: "paid", n: "Fnac Portugal", a: "\u20AC4,970", m: "Multi-method", t: "19 txns" }
      ], detail: { id: "CUST-00412", a: "\u20AC12,450", cust: "Vila Gal\u00E9 Hotels", meth: "Visa, PayPal, MBWay", stat: "Active", date: "Since Mar 2024" } }
    ];

    /* Build result rows HTML */
    var resultRowsHTML = "";
    for (var ri = 0; ri < 4; ri++) {
      resultRowsHTML +=
        '<div class="pbrd-ec-ai-result" id="pbrd-ai-r' + ri + '">' +
          '<span class="pbrd-ec-ai-r-dot" id="pbrd-ai-rs' + ri + '"></span>' +
          '<span class="pbrd-ec-ai-r-name" id="pbrd-ai-rn' + ri + '"></span>' +
          '<span class="pbrd-ec-ai-r-amt" id="pbrd-ai-ra' + ri + '"></span>' +
          '<span class="pbrd-ec-ai-r-meth" id="pbrd-ai-rm' + ri + '"></span>' +
          '<span class="pbrd-ec-ai-r-time" id="pbrd-ai-rt' + ri + '"></span>' +
        '</div>';
    }

    aiWrap.innerHTML =
      /* Header */
      '<div class="pbrd-ec-ai-header">' +
        '<h2>AI that turns support tickets into revenue</h2>' +
        '<p>Every refund request is a retention opportunity. Every search is buying intent. Paybyrd\u2019s AI handles both \u2014 instantly, 24/7, in 30+ languages.</p>' +
      '</div>' +

      '<div class="pbrd-ec-ai-grid">' +

        /* ── Card 1: Chat ── */
        '<div class="pbrd-ec-ai-card pbrd-ec-ai-dark pbrd-ec-reveal">' +
          '<div class="pbrd-ec-ai-visual">' +
            '<div class="pbrd-ec-ai-chat" id="pbrd-ai-chat">' +
              '<div class="pbrd-ec-ai-chat-head">' +
                '<div class="pbrd-ec-ai-chat-avatar">P</div>' +
                '<div><div class="pbrd-ec-ai-chat-name">Paybyrd Assistant</div>' +
                '<div class="pbrd-ec-ai-chat-status"><span class="pbrd-ec-ai-dot-live"></span>Online</div></div>' +
              '</div>' +
              '<div class="pbrd-ec-ai-chat-body">' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m0"><span>Hi! How can I help you today?</span></div>' +
                '<div class="pbrd-ec-ai-msg user" id="pbrd-ai-m1"><span id="pbrd-ai-m1t"></span></div>' +
                '<div class="pbrd-ec-ai-typing" id="pbrd-ai-typing"><span></span><span></span><span></span></div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m2"><span id="pbrd-ai-m2t"></span></div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m3">' +
                  '<div class="pbrd-ec-ai-order">' +
                    '<div class="pbrd-ec-ai-order-row"><span>Order</span><span id="pbrd-ai-oid"></span></div>' +
                    '<div class="pbrd-ec-ai-order-row"><span>Amount</span><span id="pbrd-ai-oamt"></span></div>' +
                    '<div class="pbrd-ec-ai-order-row"><span>Status</span><span id="pbrd-ai-ostat"></span></div>' +
                  '</div>' +
                '</div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m4"><span id="pbrd-ai-m4t"></span></div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m5"><div class="pbrd-ec-ai-action" id="pbrd-ai-act"></div></div>' +
                '<div class="pbrd-ec-ai-msg bot" id="pbrd-ai-m6"><span class="pbrd-ec-ai-success-icon">' + checkSVG + '</span><span id="pbrd-ai-m6t"></span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-ai-body">' +
            '<h3>Conversational AI that resolves, not deflects</h3>' +
            '<p>Your AI assistant pulls live order data, processes refunds, and updates shipping \u2014 no agent needed. Handles 73% of tickets automatically.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Processes refunds and cancellations in real time</li>' +
              '<li>' + checkSVG + 'Pulls live order, payment, and shipping data</li>' +
              '<li>' + checkSVG + 'Escalates complex cases with full context</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

        /* ── Card 2: Search ── */
        '<div class="pbrd-ec-ai-card pbrd-ec-ai-light pbrd-ec-reveal">' +
          '<div class="pbrd-ec-ai-visual">' +
            '<div class="pbrd-ec-ai-search" id="pbrd-ai-search">' +
              '<div class="pbrd-ec-ai-search-bar">' +
                '<svg viewBox="0 0 16 16" fill="none" width="14" height="14"><circle cx="7" cy="7" r="5" stroke="#9CA3AF" stroke-width="1.5"/><path d="M11 11l3 3" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg>' +
                '<span id="pbrd-ai-sq"></span><span class="pbrd-ec-ai-cursor">|</span>' +
              '</div>' +
              '<div class="pbrd-ec-ai-hint" id="pbrd-ai-hint"></div>' +
              '<div class="pbrd-ec-ai-results">' + resultRowsHTML + '</div>' +
              '<div class="pbrd-ec-ai-detail" id="pbrd-ai-detail">' +
                '<div class="pbrd-ec-ai-detail-head"><strong id="pbrd-ai-dt"></strong></div>' +
                '<div class="pbrd-ec-ai-detail-rows">' +
                  '<div class="pbrd-ec-ai-detail-row"><span>ID</span><span id="pbrd-ai-did"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Amount</span><span id="pbrd-ai-da"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Customer</span><span id="pbrd-ai-dc"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Method</span><span id="pbrd-ai-dm"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Status</span><span id="pbrd-ai-ds"></span></div>' +
                  '<div class="pbrd-ec-ai-detail-row"><span>Date</span><span id="pbrd-ai-dd"></span></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pbrd-ec-ai-body">' +
            '<h3>Find any transaction in seconds</h3>' +
            '<p>Natural language search across millions of transactions. Ask \u201Crefunds over \u20AC100 last week\u201D and get instant results \u2014 no filters, no dropdowns.</p>' +
            '<ul class="pbrd-ec-chk-bullets">' +
              '<li>' + checkSVG + 'Natural language \u2014 search like you think</li>' +
              '<li>' + checkSVG + 'Cross-references orders, customers, and payments</li>' +
              '<li>' + checkSVG + 'Instant drill-down with one-click actions</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

      '</div>';

    container.appendChild(aiWrap);
    section.style.background = "#fff";
    observeReveal(".pbrd-ec-reveal", 150, aiWrap);

    /* ── Chat animation ── */
    var chatIdx = 0;
    var msgs = ["pbrd-ai-m0","pbrd-ai-m1","pbrd-ai-m2","pbrd-ai-m3","pbrd-ai-m4","pbrd-ai-m5","pbrd-ai-m6"];

    function hideAllMsgs() {
      msgs.forEach(function (id) { var el = document.getElementById(id); if (el) el.style.opacity = "0"; });
      var typing = document.getElementById("pbrd-ai-typing");
      if (typing) typing.style.display = "none";
    }

    function showMsg(id) {
      var el = document.getElementById(id);
      if (el) el.style.opacity = "1";
    }

    function runChatAnim() {
      var s = chatScenarios[chatIdx % chatScenarios.length];
      chatIdx++;
      hideAllMsgs();

      var m1t = document.getElementById("pbrd-ai-m1t");
      var m2t = document.getElementById("pbrd-ai-m2t");
      var m4t = document.getElementById("pbrd-ai-m4t");
      var m6t = document.getElementById("pbrd-ai-m6t");
      var oid = document.getElementById("pbrd-ai-oid");
      var oamt = document.getElementById("pbrd-ai-oamt");
      var ostat = document.getElementById("pbrd-ai-ostat");
      var act = document.getElementById("pbrd-ai-act");
      var typing = document.getElementById("pbrd-ai-typing");
      if (m1t) m1t.textContent = "";
      if (m2t) m2t.textContent = "";
      if (m4t) m4t.textContent = "";
      if (m6t) m6t.textContent = "";

      var t = 0;
      /* Step 1: Show greeting */
      t += 600;
      setTimeout(function () { showMsg("pbrd-ai-m0"); }, t);

      /* Step 2: Show user msg bubble and type */
      t += 800;
      setTimeout(function () {
        showMsg("pbrd-ai-m1");
        if (m1t) typeText(m1t, s.user, 0, function () {
          /* Step 3: Typing dots */
          if (typing) { typing.style.display = "flex"; typing.style.opacity = "1"; }
          setTimeout(function () {
            if (typing) typing.style.display = "none";
            /* Step 4: Bot lookup */
            if (m2t) m2t.textContent = s.lookup;
            showMsg("pbrd-ai-m2");
            /* Step 5: Order card */
            setTimeout(function () {
              if (oid) oid.textContent = s.oid;
              if (oamt) oamt.textContent = s.amt;
              if (ostat) { ostat.textContent = s.stat; ostat.style.color = ""; }
              showMsg("pbrd-ai-m3");
              /* Step 6: Bot offer */
              setTimeout(function () {
                if (m4t) m4t.textContent = s.offer;
                showMsg("pbrd-ai-m4");
                /* Step 7: Action button */
                setTimeout(function () {
                  if (act) act.innerHTML = '<div class="pbrd-ec-ai-act-btn">' + s.action + '</div>';
                  showMsg("pbrd-ai-m5");
                  /* Step 8: Click button */
                  setTimeout(function () {
                    var btn = act ? act.querySelector(".pbrd-ec-ai-act-btn") : null;
                    if (btn) btn.style.background = "#059669";
                    /* Step 9: Success */
                    setTimeout(function () {
                      if (m6t) m6t.textContent = s.success;
                      if (ostat) { ostat.textContent = s.newStat; ostat.style.color = "#059669"; }
                      showMsg("pbrd-ai-m6");
                      setTimeout(runChatAnim, 3000);
                    }, 800);
                  }, 1500);
                }, 700);
              }, 800);
            }, 700);
          }, 1200);
        });
      }, t);
    }

    /* ── Search animation ── */
    var srchIdx = 0;

    function runSearchAnim() {
      var s = searchScenarios[srchIdx % searchScenarios.length];
      srchIdx++;

      var sq = document.getElementById("pbrd-ai-sq");
      var hint = document.getElementById("pbrd-ai-hint");
      var detail = document.getElementById("pbrd-ai-detail");
      if (sq) sq.textContent = "";
      if (hint) { hint.textContent = ""; hint.style.opacity = "0"; }
      if (detail) detail.style.opacity = "0";
      for (var i = 0; i < 4; i++) {
        var row = document.getElementById("pbrd-ai-r" + i);
        if (row) { row.style.opacity = "0"; row.classList.remove("active"); }
      }

      /* Type query */
      setTimeout(function () {
        typeText(sq, s.query, 400, function () {
          /* Show hint */
          if (hint) { hint.textContent = "AI: " + s.hint; hint.style.opacity = "1"; }
          /* Show results staggered */
          var rDelay = 300;
          s.results.forEach(function (r, idx) {
            setTimeout(function () {
              var row = document.getElementById("pbrd-ai-r" + idx);
              var dot = document.getElementById("pbrd-ai-rs" + idx);
              var rn = document.getElementById("pbrd-ai-rn" + idx);
              var ra = document.getElementById("pbrd-ai-ra" + idx);
              var rm = document.getElementById("pbrd-ai-rm" + idx);
              var rt = document.getElementById("pbrd-ai-rt" + idx);
              if (dot) { dot.className = "pbrd-ec-ai-r-dot " + r.s; }
              if (rn) rn.textContent = r.n;
              if (ra) ra.textContent = r.a;
              if (rm) rm.textContent = r.m;
              if (rt) rt.textContent = r.t;
              if (row) row.style.opacity = "1";
            }, rDelay * (idx + 1));
          });

          /* "Click" first result */
          setTimeout(function () {
            var firstRow = document.getElementById("pbrd-ai-r0");
            if (firstRow) firstRow.classList.add("active");
            /* Show detail */
            setTimeout(function () {
              var dt = document.getElementById("pbrd-ai-dt");
              var did = document.getElementById("pbrd-ai-did");
              var da = document.getElementById("pbrd-ai-da");
              var dc = document.getElementById("pbrd-ai-dc");
              var dm = document.getElementById("pbrd-ai-dm");
              var ds = document.getElementById("pbrd-ai-ds");
              var dd = document.getElementById("pbrd-ai-dd");
              if (dt) dt.textContent = s.detail.cust;
              if (did) did.textContent = s.detail.id;
              if (da) da.textContent = s.detail.a;
              if (dc) dc.textContent = s.detail.cust;
              if (dm) dm.textContent = s.detail.meth;
              if (ds) { ds.textContent = s.detail.stat; ds.className = "pbrd-ec-ai-r-dot " + (s.detail.stat === "Refunded" || s.detail.stat === "Failed" ? (s.detail.stat === "Failed" ? "failed" : "refund") : "paid"); }
              if (dd) dd.textContent = s.detail.date;
              if (detail) detail.style.opacity = "1";
              /* Wait then restart */
              setTimeout(runSearchAnim, 3500);
            }, 500);
          }, 2000);
        });
      }, 500);
    }

    /* ── Trigger on scroll ── */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          runChatAnim();
          runSearchAnim();
          this.disconnect();
        }
      }, { threshold: 0.15 }).observe(aiWrap);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 10: CTA Enhancement               */
  /* ═══════════════════════════════════════════ */

  /* ═══════════════════════════════════════════ */
  /* Section 10: FAQ Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceFAQ() {
    var section = findSectionByHeading("frequently asked");
    if (!section) return;

    var container = section.querySelector(".u-container, [class*='container']") || section;
    var children = container.children;
    for (var c = 0; c < children.length; c++) children[c].style.display = "none";

    var faqs = [
      {
        cat: "Integration",
        q: "Can I keep my current e-commerce stack?",
        a: "Absolutely. Paybyrd plugs directly into Magento, WooCommerce, PrestaShop and any custom stack via a single API. Most merchants go live in under 4 hours \u2014 no re-platforming, no retraining your team, no disruption to your existing workflows."
      },
      {
        cat: "Integration",
        q: "What payment methods do you support?",
        a: "Over 40 local and global methods \u2014 Visa, Mastercard, Apple Pay, Google Pay, Klarna, iDEAL, Sofort, MBWay, Pix, Boleto, OXXO and more. Paybyrd automatically surfaces the right methods per market so your customers always see a familiar checkout."
      },
      {
        cat: "Performance",
        q: "How do you improve my approval rates?",
        a: "Multi-acquirer routing sends each transaction to the acquirer most likely to approve it. Local acquiring means cards are processed in-country, not cross-border. The result: 4\u20137% higher authorization rates and 10\u201315% lower cross-border fees. We consistently outperform Adyen, Checkout.com and Nuvei in head-to-head comparisons."
      },
      {
        cat: "Performance",
        q: "How does Paybyrd reduce fraud and chargebacks?",
        a: "AI-powered screening with velocity checks, shared risk databases, and airtight 3D Secure flows catch fraud before it happens. Our merchants see up to a 16.8% reduction in chargebacks \u2014 meaning less revenue lost and lower processor risk fees."
      },
      {
        cat: "Performance",
        q: "Will Paybyrd help reduce my cart abandonment?",
        a: "Yes. The #1 cause of checkout abandonment is friction. Paybyrd provides embedded checkout forms, one-click payments, digital wallets and mobile-first flows that remove every unnecessary step. Faster checkout = higher conversion."
      },
      {
        cat: "Operations",
        q: "How do refunds work?",
        a: "Instant. With direct acquirer connectivity, refunds process immediately across most European issuers. Customers get an ARN reference as proof on the spot \u2014 fewer support tickets, fewer disputes, higher trust."
      },
      {
        cat: "Operations",
        q: "Can I reconcile all my channels in one place?",
        a: "Yes. Paybyrd\u2019s AI-powered dashboards unify reconciliation across D2C, marketplaces, BNPL and POS. Drill down by channel, SKU, market, or even shift. Gross settlement means predictable payouts \u2014 no more guessing what the fees were."
      },
      {
        cat: "Security",
        q: "How do you handle PCI compliance?",
        a: "Paybyrd\u2019s tokenized vault and modular APIs drastically reduce your PCI scope. Your checkout stays PCI-compliant without your team maintaining payment connections, sensitive card data, or regulatory burden. We handle PSD2, SCA, and GDPR so you don\u2019t have to."
      },
      {
        cat: "Growth",
        q: "Can I expand internationally without payment expertise?",
        a: "That\u2019s exactly what Paybyrd is built for. We process in 192+ currencies with local acquiring in key markets. Our building-block architecture means you can launch in a new country with the right payment methods, compliance and routing \u2014 all from the same API."
      },
      {
        cat: "Growth",
        q: "What makes Paybyrd different from Adyen or Stripe?",
        a: "We\u2019re not trying to be the biggest \u2014 we\u2019re built to be the best for merchants who need more than a generic solution. Premier partner approach: dedicated support, tailored routing strategies, and modular tech that adapts to your business. Our approval rates consistently beat the large processors by 1.7\u20134.9%."
      }
    ];

    var categories = ["All", "Integration", "Performance", "Operations", "Security", "Growth"];

    var wrap = document.createElement("div");
    wrap.className = "pbrd-ec-faq-wrap";

    /* Header */
    var header = '<div class="pbrd-ec-faq-header">' +
      '<div class="pbrd-oc-journey-label" style="color:rgba(120,255,180,0.7)">FAQ</div>' +
      '<h2>Everything you need to know</h2>' +
      '<p>Get answers to the questions merchants ask most before switching to Paybyrd.</p>' +
    '</div>';

    /* Category filters */
    var filters = '<div class="pbrd-ec-faq-filters">';
    for (var f = 0; f < categories.length; f++) {
      filters += '<button class="pbrd-ec-faq-filter' + (f === 0 ? ' pbrd-ec-faq-filter--active' : '') + '" data-cat="' + categories[f] + '">' + categories[f] + '</button>';
    }
    filters += '</div>';

    /* FAQ items */
    var items = '<div class="pbrd-ec-faq-list">';
    for (var i = 0; i < faqs.length; i++) {
      var faq = faqs[i];
      items += '<div class="pbrd-ec-faq-item pbrd-ec-faq-reveal" data-cat="' + faq.cat + '">' +
        '<button class="pbrd-ec-faq-q">' +
          '<div class="pbrd-ec-faq-q-left">' +
            '<span class="pbrd-ec-faq-cat-dot pbrd-ec-faq-cat--' + faq.cat.toLowerCase() + '"></span>' +
            '<span>' + faq.q + '</span>' +
          '</div>' +
          '<svg class="pbrd-ec-faq-chevron" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
        '<div class="pbrd-ec-faq-a"><p>' + faq.a + '</p></div>' +
      '</div>';
    }
    items += '</div>';

    wrap.innerHTML = header + filters + items;
    container.appendChild(wrap);

    /* ── Accordion behaviour ── */
    var allItems = wrap.querySelectorAll(".pbrd-ec-faq-item");
    wrap.querySelectorAll(".pbrd-ec-faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var isOpen = item.classList.contains("pbrd-ec-faq-item--open");
        /* Close all */
        allItems.forEach(function (it) { it.classList.remove("pbrd-ec-faq-item--open"); });
        /* Toggle clicked */
        if (!isOpen) item.classList.add("pbrd-ec-faq-item--open");
      });
    });

    /* ── Category filter behaviour ── */
    var filterBtns = wrap.querySelectorAll(".pbrd-ec-faq-filter");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("pbrd-ec-faq-filter--active"); });
        btn.classList.add("pbrd-ec-faq-filter--active");
        var cat = btn.getAttribute("data-cat");
        allItems.forEach(function (item) {
          if (cat === "All" || item.getAttribute("data-cat") === cat) {
            item.style.display = "";
          } else {
            item.style.display = "none";
            item.classList.remove("pbrd-ec-faq-item--open");
          }
        });
      });
    });

    /* Auto-open first item */
    if (allItems.length) allItems[0].classList.add("pbrd-ec-faq-item--open");

    /* Scroll-reveal stagger */
    observeReveal(".pbrd-ec-faq-reveal", 80, wrap);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 11: CTA Enhancement                */
  /* ═══════════════════════════════════════════ */

  function enhanceCTA() {
    /* Find existing CTA banner */
    var ctaSection = findSectionByHeading("cut abandonment") || findSectionByHeading("boost conversions");
    if (!ctaSection) return;

    /* White space around CTA — island effect */
    ctaSection.style.background = "#fff";
    ctaSection.style.padding = "48px 24px";

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
    enhanceHero();
    buildLogos();
    enhanceProblem();
    enhanceBenefits();
    enhanceDataSection();
    enhanceIntegrations();
    enhanceJourney();
    buildTestimonials();
    enhanceAI();
    enhanceFAQ();
    enhanceCTA();
    console.log("[Paybyrd] E-commerce enhancements loaded");
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
