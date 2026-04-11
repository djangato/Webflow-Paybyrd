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
    /* Override heading and subtitle */
    overrideText("speed sells", "Every abandoned cart is revenue walking out the door.", "h2, h3");

    var section = findSectionByHeading("abandoned cart") || findSectionByHeading("friction kills");
    if (!section) return;

    /* Override subtitle paragraph */
    var paragraphs = section.querySelectorAll("p");
    paragraphs.forEach(function (p) {
      if (p.textContent.length > 40 && p.textContent.length < 300) {
        p.textContent = "68% of online carts are abandoned. The #1 reason? A checkout that\u2019s too slow, too complex, or doesn\u2019t offer the right payment method. Fix the checkout, fix the revenue.";
      }
    });

    /* Add impact stat cards */
    var grid = document.createElement("div");
    grid.className = "pbrd-ec-impact-grid";
    grid.innerHTML =
      '<div class="pbrd-ec-impact-card">' +
        '<div class="pbrd-ec-impact-num">2.3s</div>' +
        '<div class="pbrd-ec-impact-text">Average checkout time. Industry average is 4.2s. <strong>Every second above 3s costs you 7% in conversions.</strong></div>' +
      '</div>' +
      '<div class="pbrd-ec-impact-card">' +
        '<div class="pbrd-ec-impact-num">35+</div>' +
        '<div class="pbrd-ec-impact-text">Payment methods from one integration. Cards, wallets, BNPL, local methods, bank transfers \u2014 <strong>your customer always finds their preference.</strong></div>' +
      '</div>' +
      '<div class="pbrd-ec-impact-card">' +
        '<div class="pbrd-ec-impact-num">-19%</div>' +
        '<div class="pbrd-ec-impact-text">Average cart abandonment reduction within 30 days of switching. <strong>That\u2019s real revenue recovered.</strong></div>' +
      '</div>';

    var container = section.querySelector(".u-container, [class*='container']") || section;
    container.appendChild(grid);

    observeReveal(".pbrd-ec-impact-card", 150, grid);
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
