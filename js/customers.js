/* Paybyrd — Customer Showcase with Video Cards */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/customers/";

  var customers = [
    {
      name: "TAP Air Portugal",
      industry: "Airlines",
      desc: "Global and local transaction processing, maximizing approval rates and reducing fraud. Unlocking millions in additional payment volume.",
      video: BASE + "tap.mp4",
      poster: BASE + "tap-poster.jpg"
    },
    {
      name: "Wink",
      industry: "Retail",
      desc: "Real-time visibility across own stores and franchise network, boosting loyalty and returning customers.",
      video: BASE + "wink.mp4",
      poster: BASE + "wink-poster.jpg"
    },
    {
      name: "Vila Gal\u00E9",
      industry: "Hospitality",
      desc: "Seamless omnichannel payments across one of the largest hotel groups in Portugal and Brazil.",
      video: BASE + "vilagale.mp4",
      poster: BASE + "vilagale-poster.jpg"
    },
    {
      name: "KuantoKusta",
      industry: "E-Commerce",
      desc: "High-performance checkouts and multi-payment method strategy with BNPL and local payment methods.",
      video: BASE + "kuantokusta.mp4",
      poster: BASE + "kuantokusta-poster.jpg"
    },
    {
      name: "Kabuki",
      industry: "Restaurants",
      desc: "Bespoke payment experience with tailored terminals and customer loyalty visibility.",
      video: BASE + "kabuki.mp4",
      poster: BASE + "kabuki-poster.jpg"
    }
  ];

  var playSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M4 2l10 6-10 6V2z" fill="rgba(255,255,255,0.9)"/></svg>';
  var arrowSVG = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function buildCard(c) {
    return '<div class="pbrd-customer-card">' +
      '<video class="pbrd-customer-video" muted loop playsinline preload="none" poster="' + c.poster + '">' +
        '<source src="' + c.video + '" type="video/mp4">' +
      '</video>' +
      '<div class="pbrd-customer-overlay"></div>' +
      '<div class="pbrd-customer-tag">' + c.industry + '</div>' +
      '<div class="pbrd-customer-content">' +
        '<h3 class="pbrd-customer-name">' + c.name + '</h3>' +
        '<p class="pbrd-customer-desc">' + c.desc + '</p>' +
      '</div>' +
    '</div>';
  }

  function init() {
    // Find the "Trusted by" marquee section
    var marquee = document.querySelector('[data-wf--section-partner-marquee--section-theme]');
    if (!marquee) return;

    var section = document.createElement("section");
    section.className = "pbrd-customers";

    section.innerHTML =
      '<div class="pbrd-customers-inner">' +
        '<div class="pbrd-customers-header">' +
          '<span class="pbrd-customers-label">Trusted by industry leaders</span>' +
          '<h2>Powering payments for businesses that demand more.</h2>' +
        '</div>' +
      '</div>' +
      '<div class="pbrd-customers-track">' +
        customers.map(buildCard).join("") +
      '</div>' +
      '<div class="pbrd-customers-inner">' +
        '<div class="pbrd-customers-cta">' +
          '<a href="/book-demo">See all customer stories ' + arrowSVG + '</a>' +
        '</div>' +
      '</div>';

    // Replace marquee
    marquee.replaceWith(section);

    // Video hover: play on mouseenter, pause on mouseleave
    section.querySelectorAll(".pbrd-customer-card").forEach(function (card) {
      var video = card.querySelector("video");

      card.addEventListener("mouseenter", function () {
        if (video) {
          video.currentTime = 0;
          video.play().catch(function() {});
        }
      });

      card.addEventListener("mouseleave", function () {
        if (video) {
          video.pause();
        }
      });
    });

    // Lazy load videos when they scroll into view
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var video = entry.target.querySelector("video");
            if (video && video.preload === "none") {
              video.preload = "metadata";
            }
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: "200px" });

      section.querySelectorAll(".pbrd-customer-card").forEach(function (card) {
        obs.observe(card);
      });
    }
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
