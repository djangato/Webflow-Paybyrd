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
              '<div class="pbrd-ec-paybyrd-chk">' +
                /* Dark header with logo + amount */
                '<div class="pbrd-ec-pchk-head">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dcc_tap-logo.svg" alt="TAP" style="height:16px;filter:brightness(10)">' +
                  '<div class="pbrd-ec-pchk-amount">\u20AC347.00</div>' +
                  '<div class="pbrd-ec-pchk-ref">Order #TAP-29471</div>' +
                '</div>' +
                /* Payment method tabs */
                '<div class="pbrd-ec-pchk-tabs">' +
                  '<div class="pbrd-ec-pchk-tab active"><img src="' + ICON + 'visa.png" style="height:14px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'applepay.png" style="height:14px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'mbway.png" style="height:14px"></div>' +
                  '<div class="pbrd-ec-pchk-tab"><img src="' + ICON + 'paypal.png" style="height:14px"></div>' +
                '</div>' +
                /* Card form */
                '<div class="pbrd-ec-pchk-form">' +
                  '<div class="pbrd-ec-pchk-field"><label>Card number</label><div class="pbrd-ec-pchk-input">4821 3829 \u2022\u2022\u2022\u2022 7392</div></div>' +
                  '<div class="pbrd-ec-pchk-row">' +
                    '<div class="pbrd-ec-pchk-field"><label>Expiry</label><div class="pbrd-ec-pchk-input">09 / 28</div></div>' +
                    '<div class="pbrd-ec-pchk-field"><label>CVC</label><div class="pbrd-ec-pchk-input">\u2022\u2022\u2022</div></div>' +
                  '</div>' +
                  '<div class="pbrd-ec-pchk-field"><label>Cardholder name</label><div class="pbrd-ec-pchk-input">Ana Ferreira</div></div>' +
                '</div>' +
                '<div class="pbrd-ec-pchk-btn">Pay \u20AC347.00</div>' +
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
            '<div class="pbrd-ec-chk-components">' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.1s">' +
                '<div class="pbrd-ec-chk-comp-label">Payment Method Selector</div>' +
                '<div class="pbrd-ec-chk-comp-methods">' +
                  '<div class="pbrd-ec-chk-comp-pill active">Card</div>' +
                  '<div class="pbrd-ec-chk-comp-pill">MBWay</div>' +
                  '<div class="pbrd-ec-chk-comp-pill">PayPal</div>' +
                '</div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.25s">' +
                '<div class="pbrd-ec-chk-comp-label">Card Input</div>' +
                '<div class="pbrd-ec-chk-comp-input"><span>4821 3829 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022</span></div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-block pbrd-ec-chk-comp-pop" style="--d:0.4s">' +
                '<div class="pbrd-ec-chk-comp-label">Submit Button</div>' +
                '<div class="pbrd-ec-chk-comp-submit">Pay now</div>' +
              '</div>' +
              '<div class="pbrd-ec-chk-comp-code pbrd-ec-chk-comp-pop" style="--d:0.55s">' +
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
              '<div class="pbrd-ec-chk-phone">' +
                '<div class="pbrd-ec-chk-phone-notch"></div>' +
                '<div class="pbrd-ec-chk-phone-screen">' +
                  '<div class="pbrd-ec-chk-phone-header">Checkout</div>' +
                  '<div class="pbrd-ec-chk-phone-wallet pbrd-ec-chk-comp-pop" style="--d:0.2s">' +
                    '<img src="' + ICON + 'applepay.png" alt="Apple Pay" style="height:20px">' +
                    '<span>Apple Pay</span>' +
                    '<span class="pbrd-ec-chk-phone-check">\u2713</span>' +
                  '</div>' +
                  '<div class="pbrd-ec-chk-phone-wallet pbrd-ec-chk-comp-pop" style="--d:0.35s">' +
                    '<img src="' + ICON + 'googlepay.png" alt="Google Pay" style="height:20px">' +
                    '<span>Google Pay</span>' +
                  '</div>' +
                  '<div class="pbrd-ec-chk-phone-wallet pbrd-ec-chk-comp-pop" style="--d:0.5s">' +
                    '<img src="' + ICON + 'mbway.png" alt="MBWay" style="height:20px">' +
                    '<span>MBWay</span>' +
                  '</div>' +
                  '<div class="pbrd-ec-chk-phone-total pbrd-ec-chk-comp-pop" style="--d:0.65s">' +
                    '<span>Total</span><strong>\u20AC89.00</strong>' +
                  '</div>' +
                  '<div class="pbrd-ec-chk-phone-btn pbrd-ec-chk-comp-pop" style="--d:0.8s">Pay with Apple Pay</div>' +
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
    enhanceHero();
    buildLogos();
    enhanceProblem();
    enhanceBenefits();
    enhanceDataSection();
    enhanceIntegrations();
    enhanceJourney();
    buildTestimonials();
    enhanceCTA();
    console.log("[Paybyrd] E-commerce enhancements loaded");
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
