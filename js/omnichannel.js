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
  /* Section 4: Tab Carousel Enhancement        */
  /* ═══════════════════════════════════════════ */

  function enhanceCarousel() {
    var slideData = [
      {
        title: "Order online, collect in minutes.",
        desc: "Your customer browses online, pays instantly, and picks up in-store \u2014 with the transaction already reconciled. No duplicate entries, no manual syncing. One order, two channels, zero friction.",
        stat: "Reduce wait times by up to 40%"
      },
      {
        title: "Returns without the headache.",
        desc: "A customer bought online but wants to return in-store? Done in seconds. Paybyrd matches the original transaction across channels automatically \u2014 no receipt required, no manager override.",
        stat: "Cross-channel refunds in under 10 seconds"
      },
      {
        title: "QR code checkout \u2014 scan, pay, done.",
        desc: "Generate a dynamic QR code on any POS terminal. Your customer scans with their phone and pays using their preferred method \u2014 cards, wallets, BNPL. Perfect for queues, events, and tableside payments.",
        stat: "2.3s average completion time"
      },
      {
        title: "No card? Send a payment link.",
        desc: "Create a secure payment link and send it via SMS, WhatsApp, or email. Your customer pays from anywhere \u2014 phone orders, remote consultations, or outstanding invoices. Track every link in real-time.",
        stat: "78% of payment links paid within 5 minutes"
      },
      {
        title: "Self-service kiosks, fully connected.",
        desc: "Unattended terminals that feed the same dashboard as your staffed POS. Vending machines, parking, hotel check-in \u2014 every transaction tracked, every customer identifiable, every channel unified.",
        stat: "Same data depth as staffed terminals"
      },
      {
        title: "Loyalty that runs itself.",
        desc: "Forget apps and punch cards. Paybyrd identifies returning customers by their card data alone \u2014 across every channel. See who comes back, how often, and what they spend. Loyalty intelligence without the loyalty program.",
        stat: "Identify returning customers automatically"
      }
    ];

    /* Find all headings and text on the page that match slide content */
    var origTitles = [
      "Order Online, Pick up in-store",
      "Buy Online, Return in-store",
      "Pay with a QR code",
      "No Card? No Problem",
      "Self-Service Kiosk",
      "Automatic Loyalty"
    ];

    /* Walk ALL text nodes and headings on the page to find and replace */
    var allEls = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, div, legend, a");
    allEls.forEach(function (el) {
      var txt = el.textContent.trim();
      for (var i = 0; i < origTitles.length; i++) {
        /* Match heading text (partial match for flexibility) */
        if (txt.toLowerCase().includes(origTitles[i].toLowerCase().substring(0, 15)) && el.children.length === 0) {
          if (el.tagName === "H1" || el.tagName === "H2" || el.tagName === "H3" || el.tagName === "H4" || el.tagName === "LEGEND") {
            el.textContent = slideData[i].title;

            /* Find sibling or nearby paragraph for description */
            var parent = el.parentElement;
            if (parent) {
              var desc = parent.querySelector("p");
              if (desc) desc.textContent = slideData[i].desc;

              /* Add stat badge if not present */
              if (!parent.querySelector(".pbrd-oc-slide-stat")) {
                var badge = document.createElement("div");
                badge.className = "pbrd-oc-slide-stat";
                badge.innerHTML = checkSVG + '<span>' + slideData[i].stat + '</span>';
                parent.appendChild(badge);
              }
            }
          }
          break;
        }
      }

      /* Also override the main section heading */
      if (txt.toLowerCase().includes("make payments invisible") && el.tagName === "H2") {
        el.innerHTML = "Make payments invisible.<br>Focus on delivering great experiences.";
        var sub = el.parentElement ? el.parentElement.querySelector("p") : null;
        if (sub) {
          sub.textContent = "Six ways Paybyrd connects your channels into one seamless experience for your customers \u2014 and one unified dashboard for you.";
        }
      }
    });

    /* ─── Replace images with transparent versions ─── */
    var ASSET_BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/omnichannel/";
    var imageMap = {
      "69d9242bbde99c4b80e41c01": ASSET_BASE + "69d9242bbde99c4b80e41c01_paybyrd-tab-01-removebg.png",
      "69d9242bbde99c4b80e41bfb": ASSET_BASE + "69d9242bbde99c4b80e41bfb_paybyrd-tab-02-removebg.png",
      "69d9242bbde99c4b80e41c00": ASSET_BASE + "69d9242bbde99c4b80e41c00_paybyrd-tab-03-removebg.png",
      "69d9242bbde99c4b80e41bfd": ASSET_BASE + "69d9242bbde99c4b80e41bfd_paybyrd-tab-04-removebg.png",
      "69d9242bbde99c4b80e41bff": ASSET_BASE + "69d9242bbde99c4b80e41bff_paybyrd-tab-05-removebg.png",
      "69d9242bbde99c4b80e41bfc": ASSET_BASE + "69d9242bbde99c4b80e41bfc_paybyrd-tab-06-removebg.png"
    };

    /* Swap images AND add overlays in one pass */
    var swapped = 0;
    document.querySelectorAll("img").forEach(function (img) {
      var src = (img.getAttribute("src") || "") + " " + (img.getAttribute("srcset") || "");

      for (var id in imageMap) {
        if (src.indexOf(id) !== -1) {
          /* Replace the img element entirely to bypass Webflow's image handlers */
          var newImg = document.createElement("img");
          newImg.src = imageMap[id];
          newImg.alt = img.alt || "";
          newImg.style.cssText = "width:100%;height:100%;object-fit:contain;";
          newImg.loading = "eager";

          var parent = img.parentElement;
          /* If inside a <picture>, replace the whole picture */
          var picture = img.closest("picture");
          if (picture) {
            picture.replaceWith(newImg);
            parent = newImg.parentElement;
          } else {
            img.replaceWith(newImg);
          }

          /* Add overlay to image parent */
          var overlayIdx = imageMap[id].indexOf("tab-0") !== -1
            ? parseInt(imageMap[id].charAt(imageMap[id].indexOf("tab-0") + 5)) - 1
            : -1;

          if (overlayIdx >= 0 && overlayIdx < overlayCards.length && parent) {
            if (!parent.querySelector(".pbrd-oc-overlays")) {
              parent.style.position = "relative";
              parent.style.overflow = "visible";
              var wrap = document.createElement("div");
              wrap.className = "pbrd-oc-overlays";
              wrap.innerHTML = overlayCards[overlayIdx];
              parent.appendChild(wrap);
            }
          }
          swapped++;
          break;
        }
      }
    });

    /* Show Loyalty slide (index 5) first */
    var swiperEl = document.querySelector(".slider-4_content_wrap");
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.slideTo(5, 0);
    }

    console.log("[Paybyrd] Carousel: swapped " + swapped + " images with overlays");
  }

  /* Overlay card HTML per slide (used by enhanceCarousel) */
  var overlayCards = [
      /* 0: Click & Collect */
      '<div class="pbrd-oc-overlay-card" style="top:12%;right:8%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-success">\u2713 Order Confirmed</div>' +
        '<div class="pbrd-oc-overlay-row"><span>Order</span><span>#PB-4821</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Amount</span><span>\u20AC149.00</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Pickup</span><span>Ready in 15 min</span></div>' +
      '</div>' +
      '<div class="pbrd-oc-overlay-card pbrd-oc-overlay-sm" style="bottom:15%;right:12%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-info">\uD83D\uDCCD Lisbon Store</div>' +
        '<div style="font-size:0.625rem;color:rgba(255,255,255,0.5)">Customer arriving \u2022 Visa \u2022\u2022\u20224821</div>' +
      '</div>',

      /* 1: Cross-Channel Returns */
      '<div class="pbrd-oc-overlay-card" style="top:20%;left:5%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-warn">\u21BB Refund in progress</div>' +
        '<div class="pbrd-oc-overlay-row"><span>Original</span><span>Online \u2022 \u20AC89.00</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Return at</span><span>Porto Store POS</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Card match</span><span style="color:rgba(120,255,180,0.8)">\u2713 Verified</span></div>' +
      '</div>' +
      '<div class="pbrd-oc-overlay-card pbrd-oc-overlay-sm" style="bottom:20%;left:10%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-success">\u2713 \u20AC89.00 refunded</div>' +
        '<div style="font-size:0.5625rem;color:rgba(120,255,180,0.7)">No receipt needed \u2022 Auto-matched</div>' +
      '</div>',

      /* 2: QR Payments */
      '<div class="pbrd-oc-overlay-card" style="bottom:12%;left:8%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-success">\u2713 Payment received</div>' +
        '<div class="pbrd-oc-overlay-row"><span>Amount</span><span>\u20AC24.50</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Method</span><span>Apple Pay</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Time</span><span>2.1 seconds</span></div>' +
      '</div>',

      /* 3: Payment Links */
      '<div class="pbrd-oc-overlay-card pbrd-oc-overlay-msg" style="top:15%;right:8%">' +
        '<div style="font-size:0.5625rem;color:rgba(255,255,255,0.35);margin-bottom:6px">WhatsApp \u2022 Just now</div>' +
        '<div style="background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.2);border-radius:12px;padding:10px 12px;font-size:0.6875rem;color:rgba(255,255,255,0.8);line-height:1.5">' +
          'Hi! Here\u2019s your payment link for \u20AC245.00:<br>' +
          '<span style="color:rgba(120,180,255,0.9);text-decoration:underline">pay.paybyrd.com/k8xP2</span>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-oc-overlay-card pbrd-oc-overlay-sm" style="bottom:20%;right:12%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-success">\u2713 Paid \u2022 32 seconds ago</div>' +
      '</div>',

      /* 4: Self-Service Kiosk */
      '<div class="pbrd-oc-overlay-card" style="top:8%;right:6%">' +
        '<div style="font-size:0.5rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);font-weight:600;margin-bottom:8px">Live Feed \u2022 Kiosk #3</div>' +
        '<div class="pbrd-oc-overlay-row"><span>14:32</span><span>\u20AC3.50 \u2022 Parking</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>14:28</span><span>\u20AC12.00 \u2022 Check-in</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>14:15</span><span>\u20AC8.90 \u2022 Vending</span></div>' +
      '</div>',

      /* 5: Smart Loyalty */
      '<div class="pbrd-oc-overlay-card" style="bottom:10%;left:5%">' +
        '<div class="pbrd-oc-overlay-badge pbrd-oc-overlay-info">\u21BB Returning Customer</div>' +
        '<div style="font-size:0.875rem;font-weight:600;color:#fff;margin:8px 0 4px">Sofia M.</div>' +
        '<div class="pbrd-oc-overlay-row"><span>Visits</span><span>7</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Lifetime</span><span>\u20AC1,247</span></div>' +
        '<div class="pbrd-oc-overlay-row"><span>Frequency</span><span class="pbrd-oc-freq-hot" style="font-size:0.625rem">Hot</span></div>' +
      '</div>'
    ];

  /* ═══════════════════════════════════════════ */
  /* Section 5: Dashboard Intelligence          */
  /* ═══════════════════════════════════════════ */

  function enhanceDashboard() {
    /* Find the dashboard section by heading text */
    var allH2 = document.querySelectorAll("h2");
    var dashSection = null;
    allH2.forEach(function (h) {
      var t = h.textContent.toLowerCase();
      if (t.includes("data knows") || t.includes("dashboard") || t.includes("next purchase")) {
        dashSection = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    if (!dashSection) return;

    /* Override the heading and subtitle */
    var heading = dashSection.querySelector("h2");
    if (heading) heading.innerHTML = "Your competitors are guessing.<br>You\u2019ll know.";

    var subtitle = dashSection.querySelector("h2 + p, h2 ~ p");
    if (!subtitle) {
      var allP = dashSection.querySelectorAll("p");
      allP.forEach(function (p) {
        if (p.textContent.length > 30) subtitle = p;
      });
    }
    if (subtitle) subtitle.textContent = "Every transaction across every channel feeds one intelligent dashboard. See what single-channel platforms can\u2019t \u2014 the complete picture of your business and your customers.";

    /* Build the full analytics showcase */
    var section = document.createElement("div");
    section.className = "pbrd-oc-analytics-wrap";
    section.innerHTML =

      /* Section header */
      '<div style="text-align:center;margin-bottom:40px">' +
        '<div class="pbrd-oc-journey-label" style="color:rgba(120,180,255,0.7)">Real-Time Intelligence</div>' +
        '<h3 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:600;letter-spacing:-0.02em;color:#fff;margin:0 0 12px">Your competitors are guessing. You\u2019ll know.</h3>' +
        '<p style="font-size:0.9375rem;color:rgba(255,255,255,0.4);max-width:480px;margin:0 auto;line-height:1.6">Every transaction across every channel feeds one intelligent dashboard. See what single-channel platforms can\u2019t.</p>' +
      '</div>' +

      /* Row 1: Big metrics — animated counters */
      '<div class="pbrd-oc-dash-grid" style="grid-template-columns:1fr 1fr 1fr;margin-bottom:16px">' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big pbrd-oc-countup" data-prefix="\u20AC" data-target="1400000" data-format="volume" style="font-size:2.5rem;font-weight:700">\u20AC0</div>' +
          '<div class="pbrd-oc-dash-sub">Total Volume Today</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 18% vs. last month</div>' +
        '</div>' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big pbrd-oc-countup" data-target="92.7" data-suffix="%" data-decimals="1" style="font-size:2.5rem;font-weight:700;color:rgba(120,180,255,0.9)">0%</div>' +
          '<div class="pbrd-oc-dash-sub">Approval Rate</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 4.7% above industry avg</div>' +
        '</div>' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big pbrd-oc-countup" data-target="847" style="font-size:2.5rem;font-weight:700">0</div>' +
          '<div class="pbrd-oc-dash-sub">Returning Customers</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 12% identified this month</div>' +
        '</div>' +
      '</div>' +

      /* Row 2: Charts */
      '<div class="pbrd-oc-dash-grid">' +

        /* Card: Cross-Channel Revenue */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Revenue by Channel</div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">E-Commerce</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:62%;background:linear-gradient(90deg,rgba(80,100,220,0.4),rgba(80,100,220,0.7))"></div></div><span class="pbrd-oc-hbar-val">\u20AC868K</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">POS</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:31%;background:linear-gradient(90deg,rgba(120,180,255,0.3),rgba(120,180,255,0.6))"></div></div><span class="pbrd-oc-hbar-val">\u20AC434K</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">Pay-by-Link</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:7%;background:linear-gradient(90deg,rgba(120,255,180,0.3),rgba(120,255,180,0.5))"></div></div><span class="pbrd-oc-hbar-val">\u20AC98K</span></div>' +
          '<div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04);font-size:0.625rem;color:rgba(255,255,255,0.3)">All channels \u2022 One reconciliation \u2022 Real-time</div>' +
        '</div>' +

        /* Card: Buying Frequency */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Buying Frequency Distribution</div>' +
          '<div class="pbrd-oc-freq-bar" style="height:14px;border-radius:7px">' +
            '<div class="pbrd-oc-freq-seg" style="--seg-w:40%;background:rgba(255,255,255,0.08);border-radius:7px 0 0 7px"></div>' +
            '<div class="pbrd-oc-freq-seg" style="--seg-w:35%;background:rgba(120,180,255,0.35)"></div>' +
            '<div class="pbrd-oc-freq-seg" style="--seg-w:25%;background:rgba(255,100,50,0.5);border-radius:0 7px 7px 0"></div>' +
          '</div>' +
          '<div class="pbrd-oc-freq-legend">' +
            '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(255,255,255,0.15)"></div>Cold (1x) 40%</div>' +
            '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(120,180,255,0.5)"></div>Warm (2\u20134x) 35%</div>' +
            '<div class="pbrd-oc-freq-item"><div class="pbrd-oc-freq-dot" style="background:rgba(255,100,50,0.6)"></div>Hot (5+x) 25%</div>' +
          '</div>' +
          '<div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04);font-size:0.625rem;color:rgba(120,180,255,0.6);font-weight:600">Hot customers spend 3.2\u00D7 more than cold</div>' +
        '</div>' +

        /* Card: Channel Overlap */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Cross-Channel Shoppers</div>' +
          '<div style="display:flex;align-items:center;gap:16px;margin:8px 0">' +
            '<div class="pbrd-oc-dash-big" style="font-size:2rem;color:rgba(120,180,255,0.9)">23%</div>' +
            '<div style="font-size:0.6875rem;color:rgba(255,255,255,0.4);line-height:1.5">of customers shop<br>across multiple channels</div>' +
          '</div>' +
          '<div class="pbrd-oc-hbar" style="margin-top:8px"><span class="pbrd-oc-hbar-label" style="width:60px;font-size:0.5625rem">Online only</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:52%;background:rgba(80,100,220,0.4)"></div></div><span class="pbrd-oc-hbar-val">\u20AC89</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label" style="width:60px;font-size:0.5625rem">Multi-channel</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="--bar-w:92%;background:linear-gradient(90deg,rgba(120,180,255,0.4),rgba(120,255,180,0.5))"></div></div><span class="pbrd-oc-hbar-val">\u20AC285</span></div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.6);font-weight:600">\u2191 Multi-channel AOV is 3.2\u00D7 higher</div>' +
        '</div>' +

        /* Card: Hourly Transaction Heatmap */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Peak Transaction Hours</div>' +
          '<div class="pbrd-oc-heatmap">' +
            '<div class="pbrd-oc-heatmap-row"><span class="pbrd-oc-heatmap-lbl">POS</span><div class="pbrd-oc-heatmap-cells">' +
              '<div class="pbrd-oc-hcell" style="opacity:0.15" title="06:00"></div><div class="pbrd-oc-hcell" style="opacity:0.2"></div><div class="pbrd-oc-hcell" style="opacity:0.5"></div><div class="pbrd-oc-hcell" style="opacity:0.9"></div><div class="pbrd-oc-hcell" style="opacity:1"></div><div class="pbrd-oc-hcell" style="opacity:0.7"></div><div class="pbrd-oc-hcell" style="opacity:0.4"></div><div class="pbrd-oc-hcell" style="opacity:0.15"></div>' +
            '</div></div>' +
            '<div class="pbrd-oc-heatmap-row"><span class="pbrd-oc-heatmap-lbl">Web</span><div class="pbrd-oc-heatmap-cells">' +
              '<div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.1"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.15"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.3"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.5"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.4"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.8"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:1"></div><div class="pbrd-oc-hcell pbrd-oc-hcell-web" style="opacity:0.7"></div>' +
            '</div></div>' +
            '<div class="pbrd-oc-heatmap-times"><span>6am</span><span>9am</span><span>12pm</span><span>3pm</span><span>6pm</span><span>9pm</span><span>12am</span><span>3am</span></div>' +
          '</div>' +
          '<div style="margin-top:10px;font-size:0.625rem;color:rgba(255,255,255,0.3)">POS peaks at lunch \u2022 Web peaks evenings \u2022 Schedule staff accordingly</div>' +
        '</div>' +

      '</div>' +

      /* Row 3: Integration ecosystem */
      '<div class="pbrd-oc-dash-grid" style="grid-template-columns:1fr;margin-top:16px">' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-label">Integration Ecosystem</div>' +
          '<div style="display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin:16px 0">' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/woocommerce.svg" alt="WooCommerce" style="height:16px;width:auto">WooCommerce</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/magento.svg" alt="Magento" style="height:16px;width:auto">Magento</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/prestashop.svg" alt="PrestaShop" style="height:16px;width:auto">PrestaShop</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/sap.svg" alt="SAP" style="height:16px;width:auto">SAP</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/oracle.svg" alt="Oracle" style="height:16px;width:auto">Oracle</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/whatsapp.svg" alt="WhatsApp" style="height:16px;width:auto">WhatsApp</div>' +
            '<div class="pbrd-oc-int-pill"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/moloni.svg" alt="Moloni" style="height:16px;width:auto">Moloni</div>' +
            '<div class="pbrd-oc-int-pill" style="border-color:rgba(120,180,255,0.2);color:rgba(120,180,255,0.8)">+ REST API</div>' +
          '</div>' +
          '<div style="font-size:0.6875rem;color:rgba(255,255,255,0.35)">Pre-built plug-ins \u2022 Same-day integration \u2022 Full API with webhooks and sandbox</div>' +
        '</div>' +
      '</div>';

    /* ── Animate on scroll ── */
    function animateDash() {
      /* Count-up animation */
      section.querySelectorAll(".pbrd-oc-countup").forEach(function(el) {
        var target = parseFloat(el.getAttribute("data-target"));
        var prefix = el.getAttribute("data-prefix") || "";
        var suffix = el.getAttribute("data-suffix") || "";
        var decimals = parseInt(el.getAttribute("data-decimals")) || 0;
        var format = el.getAttribute("data-format");
        var start = 0;
        var duration = 1800;
        var startTime = null;

        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 3);
          var val = start + (target - start) * ease;

          if (format === "volume") {
            if (val >= 1000000) el.textContent = prefix + (val / 1000000).toFixed(1) + "M";
            else if (val >= 1000) el.textContent = prefix + Math.round(val / 1000) + "K";
            else el.textContent = prefix + Math.round(val);
          } else if (decimals > 0) {
            el.textContent = prefix + val.toFixed(decimals) + suffix;
          } else {
            el.textContent = prefix + Math.round(val).toLocaleString("en") + suffix;
          }

          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });

      /* Animate horizontal bars from 0 */
      section.querySelectorAll(".pbrd-oc-hbar-fill").forEach(function(bar) {
        var targetW = bar.style.getPropertyValue("--bar-w");
        bar.style.width = "0";
        setTimeout(function() {
          bar.style.transition = "width 1.2s cubic-bezier(.22,1,.36,1)";
          bar.style.width = targetW;
        }, 300);
      });

      /* Animate frequency segments from 0 */
      section.querySelectorAll(".pbrd-oc-freq-seg").forEach(function(seg, i) {
        var targetW = seg.style.getPropertyValue("--seg-w");
        seg.style.width = "0";
        setTimeout(function() {
          seg.style.transition = "width 1s cubic-bezier(.22,1,.36,1)";
          seg.style.width = targetW;
        }, 300 + i * 150);
      });

      /* Pulse heatmap cells randomly */
      var hcells = section.querySelectorAll(".pbrd-oc-hcell");
      function pulseRandom() {
        var idx = Math.floor(Math.random() * hcells.length);
        var cell = hcells[idx];
        var origOpacity = cell.style.opacity;
        cell.style.transition = "opacity 0.4s, transform 0.4s";
        cell.style.opacity = "1";
        cell.style.transform = "scale(1.3)";
        setTimeout(function() {
          cell.style.opacity = origOpacity;
          cell.style.transform = "scale(1)";
        }, 600);
      }
      setInterval(pulseRandom, 1200);

      /* Live volume ticker — slowly increment the main volume */
      var volEl = section.querySelector('[data-format="volume"]');
      if (volEl) {
        var currentVol = 1400000;
        setInterval(function() {
          currentVol += Math.floor(Math.random() * 800) + 200;
          if (currentVol >= 1000000) volEl.textContent = "\u20AC" + (currentVol / 1000000).toFixed(1) + "M";
        }, 3000);
      }
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          animateDash();
          this.disconnect();
        }
      }, { threshold: 0.15 }).observe(section);
    } else {
      animateDash();
    }

    /* Hide ALL existing content inside the dashboard section */
    var children = dashSection.children;
    for (var c = 0; c < children.length; c++) {
      children[c].style.display = "none";
    }

    /* Add a light-themed intro header above the dark analytics block */
    var intro = document.createElement("div");
    intro.className = "pbrd-oc-dash-intro";
    intro.innerHTML =
      '<h2>One dashboard to rule them all.</h2>' +
      '<p>Stop switching between platforms. Paybyrd consolidates every channel, every transaction, and every customer into a single real-time view \u2014 so you can make decisions in minutes, not days.</p>';
    dashSection.appendChild(intro);

    /* Insert our analytics section */
    dashSection.appendChild(section);
    dashSection.style.padding = "80px 24px 60px";

    observeReveal(".pbrd-oc-dash-card", 100, section);
  }

  /* ═══════════════════════════════════════════ */
  /* Section 6: Value Proposition Cards         */
  /* ═══════════════════════════════════════════ */

  function buildBenefits() {
    /* Find and replace the "More than numbers" section */
    var allH2 = document.querySelectorAll("h2");
    var valSection = null;
    allH2.forEach(function (h) {
      if (h.textContent.toLowerCase().includes("centralized") || h.textContent.toLowerCase().includes("more than numbers")) {
        valSection = h.closest("section") || h.closest("[class*='section']") || h.parentElement;
      }
    });
    if (!valSection) return;

    /* Override the bland heading */
    var valH2 = valSection.querySelector("h2");
    if (valH2) valH2.innerHTML = "Everything you need.<br>Nothing you don\u2019t.";

    var valP = valSection.querySelector("p");
    if (valP) valP.textContent = "No setup fees. No hidden costs. No contracts. Just a payment platform that connects every channel, recognizes every customer, and grows with your business.";

    /* Build the enhanced closing section */
    var closingWrap = document.createElement("div");
    closingWrap.className = "pbrd-oc-closing-wrap";

    var clockSVG = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    var shieldSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5.25-3.44 10.14-8 11.5C7.44 22.14 4 17.25 4 12V7l8-4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var rocketSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="currentColor" stroke-width="1.5"/><path d="M12 15l-3-3c1-4 4-7 9-9-2 5-5 8-9 9l3 3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var heartSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";

    closingWrap.innerHTML =
      '<div class="pbrd-oc-feature-grid">' +

        /* Card 1: Checkout — WIDE */
        '<div class="pbrd-oc-feature-card pbrd-oc-feature-wide">' +
          '<div class="pbrd-oc-feature-label">Checkout</div>' +
          '<h3>A checkout designed<br>to convert</h3>' +
          '<p>Fully white-labeled. Every payment method. Optimized for mobile. Your brand, your flow, our technology.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-checkout-mock">' +
              '<div class="pbrd-oc-chk-header">Select your payment method</div>' +
              '<div class="pbrd-oc-chk-methods">' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="0"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/mbway.png" alt="MB WAY"></div><div><div class="pbrd-oc-chk-name">MB WAY</div><div class="pbrd-oc-chk-sub">Pay with MB WAY</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="1"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/visa.png" alt="Card"></div><div><div class="pbrd-oc-chk-name">Credit Card</div><div class="pbrd-oc-chk-sub">Visa, Mastercard, and more</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="2"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/paypal.png" alt="PayPal"></div><div><div class="pbrd-oc-chk-name">PayPal</div><div class="pbrd-oc-chk-sub">Pay with your PayPal account</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="3"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/klarna.png" alt="Klarna"></div><div><div class="pbrd-oc-chk-name">Klarna</div><div class="pbrd-oc-chk-sub">Buy now, pay later</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="4"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/ideal.png" alt="iDEAL"></div><div><div class="pbrd-oc-chk-name">iDEAL</div><div class="pbrd-oc-chk-sub">Pay with your bank account</div></div></div>' +
                '<div class="pbrd-oc-chk-method" data-chk-idx="5"><div class="pbrd-oc-chk-icon"><img src="https://djangato.github.io/Webflow-Paybyrd/assets/icons/multibanco.png" alt="Multibanco"></div><div><div class="pbrd-oc-chk-name">Multibanco</div><div class="pbrd-oc-chk-sub">Pay via Multibanco reference</div></div></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Card 2: Setup */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Setup</div>' +
          '<h3>Go live in hours,<br>not months</h3>' +
          '<p>Pre-built plug-ins for 20+ platforms.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-setup-steps">' +
              '<div class="pbrd-oc-setup-step pbrd-oc-setup-done"><span>\u2713</span>Connect channels</div>' +
              '<div class="pbrd-oc-setup-step pbrd-oc-setup-done"><span>\u2713</span>Configure methods</div>' +
              '<div class="pbrd-oc-setup-step pbrd-oc-setup-done"><span>\u2713</span>Test & verify</div>' +
              '<div class="pbrd-oc-setup-step pbrd-oc-setup-active"><span>4</span>You\u2019re live!</div>' +
            '</div>' +
            '<div class="pbrd-oc-setup-time">Average: <strong>4 hours</strong></div>' +
          '</div>' +
        '</div>' +

        /* Card 3: Pricing */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Pricing</div>' +
          '<h3>Transparent pricing.<br>Zero surprises.</h3>' +
          '<p>Pay only for what you process.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-price-rows">' +
              '<div class="pbrd-oc-price-row"><span>Setup fee</span><span class="pbrd-oc-price-zero">\u20AC0</span></div>' +
              '<div class="pbrd-oc-price-row"><span>Monthly fee</span><span class="pbrd-oc-price-zero">\u20AC0</span></div>' +
              '<div class="pbrd-oc-price-row"><span>Lock-in</span><span class="pbrd-oc-price-zero">None</span></div>' +
              '<div class="pbrd-oc-price-row pbrd-oc-price-highlight"><span>Transaction</span><span>From 1.25% + \u20AC0.08</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Card 4: Acceptance Rate — WIDE */
        '<div class="pbrd-oc-feature-card pbrd-oc-feature-wide">' +
          '<div class="pbrd-oc-feature-label">Performance</div>' +
          '<h3>Acceptance rates that<br>move the needle</h3>' +
          '<p>Smart routing, local acquiring, and real-time retry logic that recovers revenue other platforms leave on the table.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-perf-layout">' +
              '<div class="pbrd-oc-perf-chart">' +
                '<div class="pbrd-oc-perf-big">92.7%</div>' +
                '<div class="pbrd-oc-perf-sub">Approval rate</div>' +
                '<div class="pbrd-oc-perf-bars">' +
                  '<div class="pbrd-oc-perf-bar-row"><span>Paybyrd</span><div class="pbrd-oc-perf-bar-track"><div class="pbrd-oc-perf-bar-fill" style="--bar-w:92.7%;background:linear-gradient(90deg,rgba(16,185,129,0.4),rgba(16,185,129,0.8))"></div></div><span>92.7%</span></div>' +
                  '<div class="pbrd-oc-perf-bar-row"><span>Industry avg</span><div class="pbrd-oc-perf-bar-track"><div class="pbrd-oc-perf-bar-fill" style="--bar-w:88%;background:rgba(26,26,46,0.12)"></div></div><span>88%</span></div>' +
                '</div>' +
              '</div>' +
              '<div class="pbrd-oc-perf-logos">' +
                '<div class="pbrd-oc-perf-logos-label">Trusted by</div>' +
                '<div class="pbrd-oc-perf-logos-row">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dcc_tap-logo.svg" alt="TAP">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dce_vila-gale.svg" alt="Vila Gal\u00E9">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dcd_kuanto-logo.svg" alt="KuantoKusta">' +
                  '<img src="' + LOGOS + '69d9242bbde99c4b80e41dd1_WINK.svg" alt="Wi\u00F1k">' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Card 5: Guarantee */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Guarantee</div>' +
          '<h3>30 days to decide.<br>Risk-free.</h3>' +
          '<p>Not happy? Full refund, no questions asked.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-guarantee">' +
              shieldSVG +
              '<div class="pbrd-oc-guarantee-text">' +
                '<div class="pbrd-oc-guarantee-title">Money-Back Guarantee</div>' +
                '<div class="pbrd-oc-guarantee-sub">Every commission refunded. No fine print.</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Card 6: Support */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Support</div>' +
          '<h3>A team that picks up<br>the phone</h3>' +
          '<p>Real humans. Based in Europe.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-support-metrics">' +
              '<div class="pbrd-oc-support-metric"><div class="pbrd-oc-support-val">&lt;2h</div><div class="pbrd-oc-support-lbl">Response</div></div>' +
              '<div class="pbrd-oc-support-metric"><div class="pbrd-oc-support-val">98%</div><div class="pbrd-oc-support-lbl">Satisfaction</div></div>' +
              '<div class="pbrd-oc-support-metric"><div class="pbrd-oc-support-val">24/7</div><div class="pbrd-oc-support-lbl">Monitoring</div></div>' +
            '</div>' +
            '<div class="pbrd-oc-support-note">' + heartSVG + 'Dedicated account manager included</div>' +
          '</div>' +
        '</div>' +

        /* Card 7: POS Terminals — lineup images, no pricing */
        '<div class="pbrd-oc-feature-card">' +
          '<div class="pbrd-oc-feature-label">Terminals</div>' +
          '<h3>Enterprise-grade POS.<br>Your software built in.</h3>' +
          '<p>Buy or rent. Android-powered, PCI-certified, with Paybyrd baked in.</p>' +
          '<div class="pbrd-oc-feature-viz">' +
            '<div class="pbrd-oc-terminal-grid">' +
              '<div class="pbrd-oc-terminal-item">' +
                '<img src="https://djangato.github.io/Webflow-Paybyrd/assets/pos/lineup-rawhide.png" alt="Rawhide">' +
                '<div class="pbrd-oc-terminal-name">Rawhide</div>' +
              '</div>' +
              '<div class="pbrd-oc-terminal-item">' +
                '<img src="https://djangato.github.io/Webflow-Paybyrd/assets/pos/lineup-renegade.png" alt="Renegade">' +
                '<div class="pbrd-oc-terminal-name">Renegade</div>' +
              '</div>' +
              '<div class="pbrd-oc-terminal-item">' +
                '<img src="https://djangato.github.io/Webflow-Paybyrd/assets/pos/lineup-maverick.png" alt="Maverick">' +
                '<div class="pbrd-oc-terminal-name">Maverick</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>';

    valSection.insertAdjacentElement("afterend", closingWrap);

    observeReveal(".pbrd-oc-feature-card", 120, closingWrap);

    /* Animate checkout — brand cycling + full payment flow */
    var chkContainer = closingWrap.querySelector(".pbrd-oc-checkout-mock");
    if (chkContainer) {
      var brands = [
        { name: "TAP Air Portugal", logo: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg", color: "#E4002B", cardholder: "Ana Ferreira" },
        { name: "Vila Gal\u00E9", logo: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg", color: "#1B5E20", cardholder: "Faisal bin Iskandar Al-Lawr" },
        { name: "KuantoKusta", logo: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg", color: "#FF6600", cardholder: "Sophie van Dijk" },
        { name: "Kabuki", logo: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg", color: "#1a1a2e", cardholder: "C. Munger" },
        { name: "Wi\u00F1k", logo: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg", color: "#6B21A8", cardholder: "Luca Bianchi" }
      ];
      var brandIdx = 0;

      /* Capture methods HTML WITHOUT brand bar */
      var methodsOnlyHTML = chkContainer.innerHTML;

      function setBrand(b) {
        chkContainer.style.setProperty("--chk-accent", b.color);
        chkContainer.style.setProperty("--chk-accent-bg", b.color + "0A");
        chkContainer.style.borderColor = b.color;
      }

      function brandBarHTML(b) {
        return '<div class="pbrd-oc-chk-brand"><img src="' + b.logo + '" alt="' + b.name + '"><span class="pbrd-oc-chk-brand-label">Powered by Paybyrd</span></div>';
      }

      function runCheckoutLoop() {
        var b = brands[brandIdx];
        brandIdx = (brandIdx + 1) % brands.length;
        chkContainer.innerHTML = brandBarHTML(b) + methodsOnlyHTML;
        setBrand(b);

        var methods = chkContainer.querySelectorAll("[data-chk-idx]");
        var step = 0;

        function browseTick() {
          if (step < 3) {
            methods.forEach(function (m) { m.classList.remove("pbrd-oc-chk-active"); });
            methods[step % methods.length].classList.add("pbrd-oc-chk-active");
            step++;
            setTimeout(browseTick, 1200);
          } else {
            /* Select Credit Card → show card form */
            methods.forEach(function (m) { m.classList.remove("pbrd-oc-chk-active"); });
            if (methods[1]) methods[1].classList.add("pbrd-oc-chk-active");
            setTimeout(function () {
              chkContainer.innerHTML =
                '<div class="pbrd-oc-chk-brand"><img src="' + b.logo + '" alt="' + b.name + '"><span class="pbrd-oc-chk-brand-label">Powered by Paybyrd</span></div>' +
                '<div class="pbrd-oc-chk-header">Enter card details</div>' +
                '<div class="pbrd-oc-chk-form">' +
                  '<div class="pbrd-oc-chk-field"><span class="pbrd-oc-chk-field-label">Name</span><span class="pbrd-oc-chk-field-val pbrd-oc-typing">' + b.cardholder + '</span></div>' +
                  '<div class="pbrd-oc-chk-field"><span class="pbrd-oc-chk-field-label">Card</span><span class="pbrd-oc-chk-field-val pbrd-oc-typing" style="animation-delay:0.8s">4821 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 7392</span></div>' +
                  '<div class="pbrd-oc-chk-field-row">' +
                    '<div class="pbrd-oc-chk-field"><span class="pbrd-oc-chk-field-label">Expiry</span><span class="pbrd-oc-chk-field-val pbrd-oc-typing" style="animation-delay:1.6s">09/28</span></div>' +
                    '<div class="pbrd-oc-chk-field"><span class="pbrd-oc-chk-field-label">CVV</span><span class="pbrd-oc-chk-field-val pbrd-oc-typing" style="animation-delay:2s">\u2022\u2022\u2022</span></div>' +
                  '</div>' +
                  '<div class="pbrd-oc-chk-amount"><span>Total</span><span>\u20AC50.00</span></div>' +
                  '<div class="pbrd-oc-chk-btn" style="background:' + b.color + '">Pay Now</div>' +
                '</div>';
              setBrand(b);

              /* Processing */
              setTimeout(function () {
                chkContainer.innerHTML =
                  '<div class="pbrd-oc-chk-brand"><img src="' + b.logo + '" alt="' + b.name + '"><span class="pbrd-oc-chk-brand-label">Powered by Paybyrd</span></div>' +
                  '<div style="text-align:center;padding:32px 0">' +
                    '<div class="pbrd-oc-chk-spinner" style="border-top-color:' + b.color + '"></div>' +
                    '<div style="font-size:0.8125rem;color:rgba(26,26,46,0.4);margin-top:16px">Processing payment\u2026</div>' +
                  '</div>';
                setBrand(b);

                /* Success */
                setTimeout(function () {
                  chkContainer.innerHTML =
                    '<div class="pbrd-oc-chk-brand"><img src="' + b.logo + '" alt="' + b.name + '"><span class="pbrd-oc-chk-brand-label">Powered by Paybyrd</span></div>' +
                    '<div style="text-align:center;padding:24px 0">' +
                      '<div class="pbrd-oc-chk-success-icon" style="background:' + b.color + '15">' + checkSVG + '</div>' +
                      '<div style="font-size:1rem;font-weight:600;color:' + b.color + ';margin-top:12px">Payment Successful</div>' +
                      '<div style="font-size:0.75rem;color:rgba(26,26,46,0.4);margin-top:4px">\u20AC50.00 \u2022 Visa \u2022\u2022\u2022\u2022 7392</div>' +
                    '</div>';
                  setBrand(b);
                  chkContainer.querySelector(".pbrd-oc-chk-success-icon svg").style.color = b.color;

                  /* Loop: next brand */
                  setTimeout(runCheckoutLoop, 2500);
                }, 1800);
              }, 2500);
            }, 1000);
          }
        }

        setTimeout(browseTick, 800);
      }

      setTimeout(runCheckoutLoop, 1500);
    }
  }

  /* ═══════════════════════════════════════════ */
  /* Section 7: Final CTA                      */
  /* ═══════════════════════════════════════════ */

  function buildCTA() {
    var section = document.createElement("section");
    section.className = "pbrd-oc-cta";

    section.innerHTML =
      '<div class="pbrd-oc-cta-inner">' +
        '<div class="pbrd-oc-journey-label" style="color:rgba(120,255,180,0.7)">Ready?</div>' +
        '<h2>Book a 15-minute call.<br>See your data come alive.</h2>' +
        '<p style="font-size:1rem;color:rgba(255,255,255,0.45);max-width:480px;margin:0 auto 32px;line-height:1.6">We\u2019ll show you exactly how Paybyrd connects your channels, identifies your customers, and surfaces insights you\u2019re currently missing. No pitch deck \u2014 just your data.</p>' +
        '<a href="/book-demo" class="pbrd-oc-cta-btn">Book a Free Demo \u2192</a>' +
        '<div style="margin-top:16px;margin-bottom:32px"><a href="/pricing" style="color:rgba(255,255,255,0.4);font-size:0.875rem;text-decoration:none;transition:color 0.2s">Or explore pricing first \u2192</a></div>' +
        '<div class="pbrd-oc-cta-proofs">' +
          '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>Free 15-min consultation</span></div>' +
          '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>No commitment required</span></div>' +
          '<div class="pbrd-oc-cta-proof">' + checkSVG + '<span>Live in under 4 hours</span></div>' +
        '</div>' +
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
      /* Fix GSAP pin-spacer black gap on carousel */
      var pinSpacer = document.querySelector(".pin-spacer");
      if (pinSpacer) pinSpacer.style.background = "#fff";

      enhanceHero();
      buildLogos();
      buildJourney();
      enhanceCarousel();
      enhanceDashboard();
      buildBenefits();
      buildCTA();
      console.log("[Paybyrd] Omnichannel enhancements loaded");
      pbrdReady();
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
