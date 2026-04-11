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

      /* Row 1: Big metrics */
      '<div class="pbrd-oc-dash-grid" style="grid-template-columns:1fr 1fr 1fr;margin-bottom:16px">' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big" style="font-size:2.5rem;font-weight:700">\u20AC1.4M</div>' +
          '<div class="pbrd-oc-dash-sub">Total Volume Today</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 18% vs. last month</div>' +
        '</div>' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big" style="font-size:2.5rem;font-weight:700;color:rgba(120,180,255,0.9)">98.2%</div>' +
          '<div class="pbrd-oc-dash-sub">Approval Rate</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 2.1% above industry avg</div>' +
        '</div>' +
        '<div class="pbrd-oc-dash-card" style="text-align:center">' +
          '<div class="pbrd-oc-dash-big" style="font-size:2.5rem;font-weight:700">847</div>' +
          '<div class="pbrd-oc-dash-sub">Returning Customers</div>' +
          '<div style="margin-top:8px;font-size:0.625rem;color:rgba(120,255,180,0.7);font-weight:600">\u2191 12% identified this month</div>' +
        '</div>' +
      '</div>' +

      /* Row 2: Charts */
      '<div class="pbrd-oc-dash-grid">' +

        /* Card: Cross-Channel Revenue */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Revenue by Channel</div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">E-Commerce</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="width:62%;background:linear-gradient(90deg,rgba(80,100,220,0.4),rgba(80,100,220,0.7))"></div></div><span class="pbrd-oc-hbar-val">\u20AC868K</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">POS</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="width:31%;background:linear-gradient(90deg,rgba(120,180,255,0.3),rgba(120,180,255,0.6))"></div></div><span class="pbrd-oc-hbar-val">\u20AC434K</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label">Pay-by-Link</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="width:7%;background:linear-gradient(90deg,rgba(120,255,180,0.3),rgba(120,255,180,0.5))"></div></div><span class="pbrd-oc-hbar-val">\u20AC98K</span></div>' +
          '<div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04);font-size:0.625rem;color:rgba(255,255,255,0.3)">All channels \u2022 One reconciliation \u2022 Real-time</div>' +
        '</div>' +

        /* Card: Buying Frequency */
        '<div class="pbrd-oc-dash-card">' +
          '<div class="pbrd-oc-dash-label">Buying Frequency Distribution</div>' +
          '<div class="pbrd-oc-freq-bar" style="height:14px;border-radius:7px">' +
            '<div class="pbrd-oc-freq-seg" style="width:40%;background:rgba(255,255,255,0.08);border-radius:7px 0 0 7px"></div>' +
            '<div class="pbrd-oc-freq-seg" style="width:35%;background:rgba(120,180,255,0.35)"></div>' +
            '<div class="pbrd-oc-freq-seg" style="width:25%;background:rgba(255,100,50,0.5);border-radius:0 7px 7px 0"></div>' +
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
          '<div class="pbrd-oc-hbar" style="margin-top:8px"><span class="pbrd-oc-hbar-label" style="width:60px;font-size:0.5625rem">Online only</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="width:52%;background:rgba(80,100,220,0.4)"></div></div><span class="pbrd-oc-hbar-val">\u20AC89</span></div>' +
          '<div class="pbrd-oc-hbar"><span class="pbrd-oc-hbar-label" style="width:60px;font-size:0.5625rem">Multi-channel</span><div class="pbrd-oc-hbar-track"><div class="pbrd-oc-hbar-fill" style="width:92%;background:linear-gradient(90deg,rgba(120,180,255,0.4),rgba(120,255,180,0.5))"></div></div><span class="pbrd-oc-hbar-val">\u20AC285</span></div>' +
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

    /* Find a good spot inside the dashboard section */
    var container = dashSection.querySelector(".u-container, [class*='container']") || dashSection;
    container.appendChild(section);

    observeReveal(".pbrd-oc-dash-card", 100, section);
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
