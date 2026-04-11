/* Paybyrd — Rewrite CTA button text and URLs */
(function () {
  "use strict";

  function init() {
    // Find all Webflow native buttons
    document.querySelectorAll("a.button-main_wrap").forEach(function (btn) {
      var textEl = btn.querySelector(".button-main_text");
      if (!textEl) return;
      var text = textEl.textContent.trim().toLowerCase();

      // Rewrite "Start Now", "Get Started", "Getting Started"
      if (text === "start now" || text === "get started" || text === "getting started") {
        textEl.textContent = "Start Risk-Free";
        btn.href = "https://beta.paybyrd.com";
      }
    });

    // Also fix the onboard.paybyrd.com links we injected
    document.querySelectorAll('a[href*="onboard.paybyrd.com"]').forEach(function (link) {
      link.href = "https://beta.paybyrd.com";
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
