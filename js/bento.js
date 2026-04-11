/* Paybyrd — Bento Grid: Fintech Visuals + Spotlight */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ─── Card 0: Conversion Rates — Bold approval chart ─── */
  var vizConversion =
    '<div class="pbrd-viz pbrd-viz-conversion">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both">' +
        '<div class="pbrd-bv-label">Approval Rate</div>' +
        '<div class="pbrd-bv-hero-row">' +
          '<span class="pbrd-bv-big">98.2<span class="pbrd-bv-unit">%</span></span>' +
          '<span class="pbrd-bv-trend-up">+12.4%</span>' +
        '</div>' +
        '<div class="pbrd-bv-chart">' +
          '<div class="pbrd-bv-bar" style="--h:35%;--d:0.1s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:52%;--d:0.15s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:45%;--d:0.2s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:68%;--d:0.25s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:60%;--d:0.3s"></div>' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-accent" style="--h:90%;--d:0.35s"></div>' +
          '<div class="pbrd-bv-bar" style="--h:72%;--d:0.4s"></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 1: Pricing — Rate display ─── */
  var vizPricing =
    '<div class="pbrd-viz pbrd-viz-pricing">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both">' +
        '<div class="pbrd-bv-label">Transaction Fee</div>' +
        '<div class="pbrd-bv-big" style="margin:4px 0">1.50<span class="pbrd-bv-unit">%</span></div>' +
        '<div class="pbrd-bv-sublabel">+ \u20AC0.15 per transaction</div>' +
        '<div class="pbrd-bv-divider"></div>' +
        '<div class="pbrd-bv-row">' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">\u20AC0</span><span class="pbrd-bv-mini-lbl">Setup</span></div>' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">\u20AC0</span><span class="pbrd-bv-mini-lbl">Monthly</span></div>' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">T+1</span><span class="pbrd-bv-mini-lbl">Payout</span></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 2: Security — Shield with badges ─── */
  var vizSecurity =
    '<div class="pbrd-viz pbrd-viz-security">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;text-align:center">' +
        '<svg class="pbrd-bv-shield" viewBox="0 0 60 72" fill="none" style="width:48px;height:58px;margin:0 auto 12px">' +
          '<path d="M30 3L6 15v21c0 16.5 10.5 28.5 24 33 13.5-4.5 24-16.5 24-33V15L30 3z" stroke="rgba(120,255,180,0.4)" stroke-width="1.5" fill="rgba(120,255,180,0.03)"/>' +
          '<path class="pbrd-bv-check" d="M21 36l6 6 12-12" stroke="rgba(120,255,180,0.8)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
        '<div class="pbrd-bv-pills">' +
          '<span class="pbrd-bv-pill" style="--d:0.2s">PCI DSS</span>' +
          '<span class="pbrd-bv-pill" style="--d:0.3s">3DS2</span>' +
          '<span class="pbrd-bv-pill" style="--d:0.4s">Tokens</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 3: Business Intelligence — Heatmap + KPIs ─── */
  var heatCells = '';
  var heatData = [
    [0.1,0.3,0.4,0.5,0.6,0.8,0.3],
    [0.2,0.5,0.7,0.8,0.9,0.7,0.2],
    [0.15,0.4,0.6,0.9,1.0,0.6,0.15],
    [0.1,0.3,0.5,0.7,0.8,0.5,0.1]
  ];
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 7; c++) {
      heatCells += '<div class="pbrd-heat-cell" style="--op:' + heatData[r][c] + ';--d:' + (r*7+c)*0.02 + 's"></div>';
    }
  }

  var vizBI =
    '<div class="pbrd-viz pbrd-viz-bi">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;flex:1">' +
        '<div style="display:flex;gap:16px;align-items:flex-start">' +
          '<div style="flex:1">' +
            '<div class="pbrd-bv-label">Recurring Shoppers</div>' +
            '<div class="pbrd-bv-big" style="margin:4px 0;font-size:1.75rem">847</div>' +
            '<div class="pbrd-bv-sublabel">\u20AC142 avg. ticket</div>' +
            '<div style="margin-top:12px">' +
              '<div class="pbrd-bv-label">12-Week Trend</div>' +
              '<svg viewBox="0 0 120 28" style="width:100%;height:28px;margin-top:4px"><path d="M0 24 C10 22, 15 20, 20 18 S30 14, 40 16 S55 10, 65 8 S80 6, 90 4 S105 2, 120 1" stroke="rgba(120,180,255,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-dasharray="200" stroke-dashoffset="200" style="animation:pbrd-line-draw 1.5s 0.5s ease forwards"/><path d="M0 24 C10 22, 15 20, 20 18 S30 14, 40 16 S55 10, 65 8 S80 6, 90 4 S105 2, 120 1 V28 H0Z" fill="url(#pbrd-bv-spark)" opacity="0.3"/><defs><linearGradient id="pbrd-bv-spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(120,180,255,0.4)"/><stop offset="100%" stop-color="rgba(120,180,255,0)"/></linearGradient></defs></svg>' +
            '</div>' +
          '</div>' +
          '<div style="flex-shrink:0">' +
            '<div class="pbrd-bv-label" style="margin-bottom:6px">Activity</div>' +
            '<div class="pbrd-bv-heatgrid-sm">' + heatCells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 4: Loyalty — NPS arc + retention ─── */
  var vizLoyalty =
    '<div class="pbrd-viz pbrd-viz-loyalty2">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;flex:1">' +
        '<div style="display:flex;gap:20px;align-items:center">' +
          '<div style="flex-shrink:0;position:relative;width:90px;height:90px">' +
            '<svg viewBox="0 0 40 40" style="width:100%;height:100%"><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2.5"/><circle cx="20" cy="20" r="17" fill="none" stroke="url(#pbrd-bv-ring-g)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="107" stroke-dashoffset="107" transform="rotate(-90 20 20)" style="animation:pbrd-bv-ring 1.2s 0.4s ease forwards"/><defs><linearGradient id="pbrd-bv-ring-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="rgba(255,255,255,0.15)"/><stop offset="100%" stop-color="rgba(120,180,255,0.7)"/></linearGradient></defs></svg>' +
            '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><span style="font-size:1.25rem;font-weight:300;color:#fff;letter-spacing:-0.03em">94</span><span style="font-size:0.4375rem;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.08em">NPS</span></div>' +
          '</div>' +
          '<div style="flex:1">' +
            '<div class="pbrd-bv-label">Customer Loyalty</div>' +
            '<div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">' +
              '<div class="pbrd-bv-loyalty-row" style="animation:pbrd-fade-in 0.4s 0.3s both"><span class="pbrd-bv-loyalty-val">3.2\u00D7</span><span class="pbrd-bv-loyalty-lbl">Repeat purchase rate</span></div>' +
              '<div class="pbrd-bv-loyalty-row" style="animation:pbrd-fade-in 0.4s 0.45s both"><span class="pbrd-bv-loyalty-val">68%</span><span class="pbrd-bv-loyalty-lbl">Return within 30 days</span></div>' +
              '<div class="pbrd-bv-loyalty-row" style="animation:pbrd-fade-in 0.4s 0.6s both"><span class="pbrd-bv-loyalty-val">\u20AC218</span><span class="pbrd-bv-loyalty-lbl">Lifetime avg. spend</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var visuals = [vizConversion, vizPricing, vizSecurity, vizBI, vizLoyalty];

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

      if (textOverrides[idx]) {
        var ov = textOverrides[idx];
        var tag = card.querySelector(".tag_wrap-2");
        if (tag) tag.textContent = ov.tag;
        var h3 = card.querySelector(".card-1_content h3");
        if (h3) h3.textContent = ov.heading;
        var p = card.querySelector(".card-1_content .u-color-faded p");
        if (p) p.textContent = ov.desc;
      }

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
