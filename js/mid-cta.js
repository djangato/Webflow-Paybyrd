/* Paybyrd — Mid-Page CTA Enhancement */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var checkSVG = '<svg class="pbrd-mid-cta-stat-icon" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5l-7 7L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function init() {
    var original = document.querySelector(".grid-1_button_wrap");
    if (!original) return;

    var section = document.createElement("div");
    section.className = "pbrd-mid-cta";

    section.innerHTML =
      '<div class="pbrd-mid-cta-card">' +
        '<div class="pbrd-mid-cta-text">' +
          '<h3>Start accepting payments today</h3>' +
          '<p>Go live in under 4 hours. No setup fees, no long-term contracts. Just plug in and grow.</p>' +
          '<div class="pbrd-mid-cta-stats">' +
            '<div class="pbrd-mid-cta-stat">' + checkSVG + '<span>No setup fees</span></div>' +
            '<div class="pbrd-mid-cta-stat">' + checkSVG + '<span>Live in 4 hours</span></div>' +
            '<div class="pbrd-mid-cta-stat">' + checkSVG + '<span>Cancel anytime</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="pbrd-mid-cta-actions">' +
          '<a href="https://onboard.paybyrd.com/" class="pbrd-mid-cta-primary">Get Started Free \u2192</a>' +
          '<a href="/book-demo" class="pbrd-mid-cta-secondary">Talk to Sales</a>' +
        '</div>' +
      '</div>';

    // Insert where the old CTA was
    original.parentElement.insertBefore(section, original);
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
