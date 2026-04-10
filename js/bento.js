/* Paybyrd — Bento Grid: Custom Animated Visuals + Spotlight */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ─── Card 0: Conversion Rates — Animated bar chart ─── */
  var vizConversion = '<div class="pbrd-viz pbrd-viz-conversion">' +
    '<div class="pbrd-viz-chart">' +
      '<div class="pbrd-bar" style="--h:35%;--d:0s"><div class="pbrd-bar-fill"></div><span>72%</span></div>' +
      '<div class="pbrd-bar" style="--h:55%;--d:0.15s"><div class="pbrd-bar-fill"></div><span>81%</span></div>' +
      '<div class="pbrd-bar" style="--h:48%;--d:0.3s"><div class="pbrd-bar-fill"></div><span>77%</span></div>' +
      '<div class="pbrd-bar" style="--h:72%;--d:0.45s"><div class="pbrd-bar-fill"></div><span>89%</span></div>' +
      '<div class="pbrd-bar" style="--h:65%;--d:0.6s"><div class="pbrd-bar-fill"></div><span>85%</span></div>' +
      '<div class="pbrd-bar pbrd-bar-accent" style="--h:90%;--d:0.75s"><div class="pbrd-bar-fill"></div><span>98%</span></div>' +
    '</div>' +
    '<div class="pbrd-viz-label">Approval Rate</div>' +
    '<div class="pbrd-viz-trend">+12.4% <svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 8l4-4 4 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></div>' +
  '</div>';

  /* ─── Card 1: Pricing — Fee ticker display ─── */
  var vizPricing = '<div class="pbrd-viz pbrd-viz-pricing">' +
    '<div class="pbrd-fee-row" style="--d:0.1s">' +
      '<div class="pbrd-fee-icon"><svg viewBox="0 0 20 20" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.2" fill="none"/><line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="1.2"/></svg></div>' +
      '<span class="pbrd-fee-name">Visa / Mastercard</span>' +
      '<span class="pbrd-fee-amount">1.50%</span>' +
    '</div>' +
    '<div class="pbrd-fee-row" style="--d:0.25s">' +
      '<div class="pbrd-fee-icon"><svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg></div>' +
      '<span class="pbrd-fee-name">SEPA Direct Debit</span>' +
      '<span class="pbrd-fee-amount">\u20AC0.30</span>' +
    '</div>' +
    '<div class="pbrd-fee-row" style="--d:0.4s">' +
      '<div class="pbrd-fee-icon"><svg viewBox="0 0 20 20" width="20" height="20"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="10" cy="15" r="1" fill="currentColor"/></svg></div>' +
      '<span class="pbrd-fee-name">Apple Pay</span>' +
      '<span class="pbrd-fee-amount">Card rate</span>' +
    '</div>' +
    '<div class="pbrd-fee-row pbrd-fee-highlight" style="--d:0.55s">' +
      '<div class="pbrd-fee-icon"><svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2l2.5 5h5.5l-4.5 3.5 1.5 5.5-5-3.5-5 3.5 1.5-5.5L2 7h5.5z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg></div>' +
      '<span class="pbrd-fee-name">No hidden fees</span>' +
      '<span class="pbrd-fee-amount">\u20AC0.00</span>' +
    '</div>' +
  '</div>';

  /* ─── Card 2: Security — Shield with pulse ─── */
  var vizSecurity = '<div class="pbrd-viz pbrd-viz-security">' +
    '<div class="pbrd-shield-wrap">' +
      '<div class="pbrd-shield-pulse"></div>' +
      '<div class="pbrd-shield-pulse pbrd-pulse-2"></div>' +
      '<svg class="pbrd-shield-svg" viewBox="0 0 80 96" fill="none">' +
        '<path d="M40 4L8 20v28c0 22 14 38 32 44 18-6 32-22 32-44V20L40 4z" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="rgba(255,255,255,0.03)"/>' +
        '<path class="pbrd-shield-check" d="M28 48l8 8 16-16" stroke="rgba(120,255,180,0.8)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
    '</div>' +
    '<div class="pbrd-security-badges">' +
      '<span class="pbrd-sec-badge" style="--d:0.3s">PCI DSS</span>' +
      '<span class="pbrd-sec-badge" style="--d:0.5s">3D Secure</span>' +
      '<span class="pbrd-sec-badge" style="--d:0.7s">Tokenization</span>' +
    '</div>' +
  '</div>';

  /* ─── Card 3: Integrations — Connected nodes ─── */
  var vizIntegrations = '<div class="pbrd-viz pbrd-viz-integrations">' +
    '<svg class="pbrd-nodes-svg" viewBox="0 0 280 160">' +
      '<line class="pbrd-node-line" x1="140" y1="80" x2="50" y2="35" style="--d:0.2s"/>' +
      '<line class="pbrd-node-line" x1="140" y1="80" x2="230" y2="35" style="--d:0.3s"/>' +
      '<line class="pbrd-node-line" x1="140" y1="80" x2="50" y2="125" style="--d:0.4s"/>' +
      '<line class="pbrd-node-line" x1="140" y1="80" x2="230" y2="125" style="--d:0.5s"/>' +
      '<line class="pbrd-node-line" x1="140" y1="80" x2="140" y2="20" style="--d:0.35s"/>' +
      '<line class="pbrd-node-line" x1="140" y1="80" x2="140" y2="145" style="--d:0.45s"/>' +
      '<!-- Center node -->' +
      '<circle class="pbrd-node pbrd-node-center" cx="140" cy="80" r="16" style="--d:0s"/>' +
      '<text x="140" y="84" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="8" font-weight="700">API</text>' +
      '<!-- Outer nodes -->' +
      '<circle class="pbrd-node" cx="50" cy="35" r="11" style="--d:0.2s"/>' +
      '<text x="50" y="39" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="600">WOO</text>' +
      '<circle class="pbrd-node" cx="230" cy="35" r="11" style="--d:0.3s"/>' +
      '<text x="230" y="39" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="600">SHOP</text>' +
      '<circle class="pbrd-node" cx="50" cy="125" r="11" style="--d:0.4s"/>' +
      '<text x="50" y="129" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="5.5" font-weight="600">MGNTO</text>' +
      '<circle class="pbrd-node" cx="230" cy="125" r="11" style="--d:0.5s"/>' +
      '<text x="230" y="129" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="600">SAP</text>' +
      '<circle class="pbrd-node" cx="140" cy="20" r="11" style="--d:0.35s"/>' +
      '<text x="140" y="24" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="600">POS</text>' +
      '<circle class="pbrd-node" cx="140" cy="145" r="11" style="--d:0.45s"/>' +
      '<text x="140" y="149" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="600">ERP</text>' +
      '<!-- Flowing particles -->' +
      '<circle class="pbrd-particle" r="2" style="--d:0s"><animateMotion dur="2s" repeatCount="indefinite" path="M140,80 L50,35"/></circle>' +
      '<circle class="pbrd-particle" r="2" style="--d:0.5s"><animateMotion dur="2.2s" repeatCount="indefinite" path="M140,80 L230,35"/></circle>' +
      '<circle class="pbrd-particle" r="2" style="--d:1s"><animateMotion dur="1.8s" repeatCount="indefinite" path="M140,80 L50,125"/></circle>' +
      '<circle class="pbrd-particle" r="2" style="--d:1.5s"><animateMotion dur="2.5s" repeatCount="indefinite" path="M140,80 L230,125"/></circle>' +
    '</svg>' +
  '</div>';

  /* ─── Card 4: Loyalty — Circular progress + metrics ─── */
  var vizLoyalty = '<div class="pbrd-viz pbrd-viz-loyalty">' +
    '<div class="pbrd-loyalty-ring-wrap">' +
      '<svg class="pbrd-loyalty-ring" viewBox="0 0 100 100">' +
        '<circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.06)" stroke-width="4" fill="none"/>' +
        '<circle class="pbrd-ring-fill" cx="50" cy="50" r="42" stroke="rgba(120,180,255,0.6)" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="264" transform="rotate(-90 50 50)"/>' +
      '</svg>' +
      '<div class="pbrd-loyalty-value">94<span>%</span></div>' +
      '<div class="pbrd-loyalty-sub">Retention</div>' +
    '</div>' +
    '<div class="pbrd-loyalty-metrics">' +
      '<div class="pbrd-loyalty-metric" style="--d:0.4s"><span class="pbrd-metric-num">4.8</span><span class="pbrd-metric-label">Avg. Rating</span><div class="pbrd-stars">\u2605\u2605\u2605\u2605\u2605</div></div>' +
      '<div class="pbrd-loyalty-metric" style="--d:0.6s"><span class="pbrd-metric-num">3.2x</span><span class="pbrd-metric-label">Repeat Rate</span></div>' +
    '</div>' +
  '</div>';

  var visuals = [vizConversion, vizPricing, vizSecurity, vizIntegrations, vizLoyalty];

  function init() {
    var cards = document.querySelectorAll(".card-1_element");
    if (!cards.length) return;

    cards.forEach(function (card, idx) {
      // Replace image area with custom visual
      if (visuals[idx]) {
        var imgWrap = card.querySelector(".card-1_gradient-bg");
        if (imgWrap) {
          // Hide the original image but keep the bg decoratives
          var origImg = imgWrap.querySelector(".u-image-wrapper");
          if (origImg) origImg.style.display = "none";

          // Inject custom visual
          var vizDiv = document.createElement("div");
          vizDiv.className = "pbrd-viz-container";
          vizDiv.innerHTML = visuals[idx];
          imgWrap.appendChild(vizDiv);
        }
      }

      // Add cursor spotlight
      var spot = document.createElement("div");
      spot.className = "pbrd-spotlight";
      card.appendChild(spot);
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        spot.style.left = (e.clientX - r.left) + "px";
        spot.style.top = (e.clientY - r.top) + "px";
      });
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
