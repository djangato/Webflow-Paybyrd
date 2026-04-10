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

  /* ─── Card 3: Business Intelligence — Heatmap + Trend Line ─── */
  // Generate heatmap cells (7 cols x 4 rows — days of week)
  var heatCells = '';
  var heatData = [
    [0.1,0.3,0.4,0.5,0.6,0.8,0.3],
    [0.2,0.5,0.7,0.8,0.9,0.7,0.2],
    [0.15,0.4,0.6,0.9,1.0,0.6,0.15],
    [0.1,0.3,0.5,0.7,0.8,0.5,0.1]
  ];
  var heatLabelsTop = ['M','T','W','T','F','S','S'];
  var heatLabelsLeft = ['06','12','18','00'];
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 7; c++) {
      var op = heatData[r][c];
      var delay = (r * 7 + c) * 0.02;
      heatCells += '<div class="pbrd-heat-cell" style="--op:' + op + ';--d:' + delay + 's"></div>';
    }
  }

  var vizBI = '<div class="pbrd-viz pbrd-viz-bi">' +
    '<div class="pbrd-bi-left">' +
      '<div class="pbrd-bi-kpi" style="--d:0.2s">' +
        '<span class="pbrd-bi-number">\u20AC142</span>' +
        '<span class="pbrd-bi-label">Avg. Ticket</span>' +
      '</div>' +
      '<div class="pbrd-bi-kpi" style="--d:0.4s">' +
        '<span class="pbrd-bi-number">847</span>' +
        '<span class="pbrd-bi-label">Recurring Shoppers</span>' +
      '</div>' +
      '<div class="pbrd-bi-sparkline" style="--d:0.6s">' +
        '<svg viewBox="0 0 120 32" fill="none">' +
          '<path class="pbrd-spark-line" d="M0 28 C10 26, 15 24, 20 22 S30 16, 40 18 S55 12, 65 10 S80 8, 90 5 S105 3, 120 2" stroke="rgba(120,180,255,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
          '<path d="M0 28 C10 26, 15 24, 20 22 S30 16, 40 18 S55 12, 65 10 S80 8, 90 5 S105 3, 120 2 V32 H0Z" fill="url(#pbrd-spark-grad)" opacity="0.3"/>' +
          '<defs><linearGradient id="pbrd-spark-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(120,180,255,0.4)"/><stop offset="100%" stop-color="rgba(120,180,255,0)"/></linearGradient></defs>' +
        '</svg>' +
        '<span class="pbrd-spark-label">12-week trend</span>' +
      '</div>' +
    '</div>' +
    '<div class="pbrd-bi-right">' +
      '<div class="pbrd-heatmap-label">Store Activity</div>' +
      '<div class="pbrd-heatmap-days">' + heatLabelsTop.map(function(d) { return '<span>' + d + '</span>'; }).join('') + '</div>' +
      '<div class="pbrd-heatmap-body">' +
        '<div class="pbrd-heatmap-hours">' + heatLabelsLeft.map(function(h) { return '<span>' + h + '</span>'; }).join('') + '</div>' +
        '<div class="pbrd-heatmap-grid">' + heatCells + '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  /* ─── Card 4: Loyalty — Elegant arc + single metric ─── */
  var vizLoyalty = '<div class="pbrd-viz pbrd-viz-loyalty2">' +
    '<div class="pbrd-loy-arc-wrap">' +
      '<svg class="pbrd-loy-arc" viewBox="0 0 200 120">' +
        '<!-- Track -->' +
        '<path d="M20 110 A80 80 0 0 1 180 110" stroke="rgba(255,255,255,0.04)" stroke-width="6" fill="none" stroke-linecap="round"/>' +
        '<!-- Fill -->' +
        '<path class="pbrd-loy-arc-fill" d="M20 110 A80 80 0 0 1 180 110" stroke="url(#pbrd-arc-gradient)" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="252" stroke-dashoffset="252"/>' +
        '<!-- Glow dot at end -->' +
        '<circle class="pbrd-loy-dot" cx="180" cy="110" r="4" fill="rgba(120,180,255,0.8)" opacity="0"/>' +
        '<defs>' +
          '<linearGradient id="pbrd-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%" stop-color="rgba(255,255,255,0.1)"/>' +
            '<stop offset="100%" stop-color="rgba(120,180,255,0.7)"/>' +
          '</linearGradient>' +
        '</defs>' +
      '</svg>' +
      '<div class="pbrd-loy-center">' +
        '<div class="pbrd-loy-big">94</div>' +
        '<div class="pbrd-loy-unit">NPS</div>' +
      '</div>' +
    '</div>' +
    '<div class="pbrd-loy-footer">' +
      '<div class="pbrd-loy-stat" style="--d:0.6s"><span class="pbrd-loy-stat-val">3.2\u00D7</span><span class="pbrd-loy-stat-lbl">Repeat purchase rate</span></div>' +
      '<div class="pbrd-loy-divider"></div>' +
      '<div class="pbrd-loy-stat" style="--d:0.8s"><span class="pbrd-loy-stat-val">68%</span><span class="pbrd-loy-stat-lbl">Return within 30 days</span></div>' +
    '</div>' +
  '</div>';

  var visuals = [vizConversion, vizPricing, vizSecurity, vizBI, vizLoyalty];

  // Text overrides for cards (index → { tag, heading, desc })
  var textOverrides = {
    3: {
      tag: "Business Intelligence",
      heading: "Know your customers before they walk in",
      desc: "Recurring shoppers, average tickets, and store heatmaps \u2014 insights that turn data into revenue."
    },
    4: {
      tag: "Loyalty",
      heading: "Customers who come back, spend more",
      desc: "Track retention, repeat rates, and lifetime value across every channel."
    }
  };

  function init() {
    var cards = document.querySelectorAll(".card-1_element");
    if (!cards.length) return;

    cards.forEach(function (card, idx) {
      // Replace image area with custom visual
      if (visuals[idx]) {
        var imgWrap = card.querySelector(".card-1_gradient-bg");
        if (imgWrap) {
          var origImg = imgWrap.querySelector(".u-image-wrapper");
          if (origImg) origImg.style.display = "none";

          var vizDiv = document.createElement("div");
          vizDiv.className = "pbrd-viz-container";
          vizDiv.innerHTML = visuals[idx];
          imgWrap.appendChild(vizDiv);
        }
      }

      // Override text content if needed
      if (textOverrides[idx]) {
        var ov = textOverrides[idx];
        var tag = card.querySelector(".tag_wrap-2");
        if (tag) tag.textContent = ov.tag;
        var h3 = card.querySelector(".card-1_content h3");
        if (h3) h3.textContent = ov.heading;
        var p = card.querySelector(".card-1_content .u-color-faded p");
        if (p) p.textContent = ov.desc;
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
