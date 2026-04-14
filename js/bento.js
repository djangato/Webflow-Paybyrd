/* Paybyrd — Bento Grid: Live Fintech Visuals */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  /* ─── Card 0: Conversion — Live approval monitor ─── */
  var vizConversion =
    '<div class="pbrd-viz pbrd-viz-conversion">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both">' +
        '<div class="pbrd-bv-label">Approval Rate · Live</div>' +
        '<div class="pbrd-bv-hero-row">' +
          '<span class="pbrd-bv-big"><span id="pbrd-bv-rate">98.2</span><span class="pbrd-bv-unit">%</span></span>' +
          '<span class="pbrd-bv-trend-up">+12.4%</span>' +
        '</div>' +
        '<div class="pbrd-bv-chart">' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-live" style="--h:35%;--hmin:28%;--hmax:42%;--dur:2.8s;--d:0.1s"></div>' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-live" style="--h:52%;--hmin:44%;--hmax:60%;--dur:3.2s;--d:0.15s"></div>' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-live" style="--h:45%;--hmin:38%;--hmax:55%;--dur:2.5s;--d:0.2s"></div>' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-live" style="--h:68%;--hmin:58%;--hmax:78%;--dur:3.5s;--d:0.25s"></div>' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-live" style="--h:60%;--hmin:50%;--hmax:70%;--dur:2.9s;--d:0.3s"></div>' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-accent pbrd-bv-bar-live" style="--h:90%;--hmin:82%;--hmax:95%;--dur:3.1s;--d:0.35s"></div>' +
          '<div class="pbrd-bv-bar pbrd-bv-bar-live" style="--h:72%;--hmin:62%;--hmax:80%;--dur:2.7s;--d:0.4s"></div>' +
        '</div>' +
        '<div class="pbrd-bv-live-row">' +
          '<span class="pbrd-bv-live-dot"></span>' +
          '<span class="pbrd-bv-live-count"><span id="pbrd-bv-txn">1,247</span> transactions/hr</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 1: Pricing — Competitor comparison ─── */
  var vizPricing =
    '<div class="pbrd-viz pbrd-viz-pricing">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both">' +
        '<div class="pbrd-bv-label">Transaction Fee</div>' +
        '<div class="pbrd-bv-big" style="margin:4px 0">1.50<span class="pbrd-bv-unit">%</span></div>' +
        '<div class="pbrd-bv-sublabel">+ \u20AC0.15 per transaction</div>' +
        '<div class="pbrd-bv-divider"></div>' +
        '<div class="pbrd-bv-compare">' +
          '<div class="pbrd-bv-comp-row"><span class="pbrd-bv-comp-name">Competitor A</span><div class="pbrd-bv-comp-bar-wrap"><div class="pbrd-bv-comp-bar pbrd-bv-comp-them" style="--w:85%"></div></div><span class="pbrd-bv-comp-val">2.9%</span></div>' +
          '<div class="pbrd-bv-comp-row"><span class="pbrd-bv-comp-name">Competitor B</span><div class="pbrd-bv-comp-bar-wrap"><div class="pbrd-bv-comp-bar pbrd-bv-comp-them" style="--w:72%"></div></div><span class="pbrd-bv-comp-val">2.5%</span></div>' +
          '<div class="pbrd-bv-comp-row"><span class="pbrd-bv-comp-name">Paybyrd</span><div class="pbrd-bv-comp-bar-wrap"><div class="pbrd-bv-comp-bar pbrd-bv-comp-us" style="--w:44%"></div></div><span class="pbrd-bv-comp-val pbrd-bv-comp-save">1.5%</span></div>' +
        '</div>' +
        '<div class="pbrd-bv-row" style="margin-top:10px">' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">\u20AC0</span><span class="pbrd-bv-mini-lbl">Setup</span></div>' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">\u20AC0</span><span class="pbrd-bv-mini-lbl">Monthly</span></div>' +
          '<div class="pbrd-bv-mini"><span class="pbrd-bv-mini-val">T+1</span><span class="pbrd-bv-mini-lbl">Payout</span></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 2: Security — Live threat scanner ─── */
  var vizSecurity =
    '<div class="pbrd-viz pbrd-viz-security">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;text-align:center">' +
        '<div class="pbrd-bv-shield-wrap">' +
          '<svg class="pbrd-bv-shield" viewBox="0 0 60 72" fill="none" style="width:48px;height:58px">' +
            '<path d="M30 3L6 15v21c0 16.5 10.5 28.5 24 33 13.5-4.5 24-16.5 24-33V15L30 3z" stroke="rgba(120,255,180,0.4)" stroke-width="1.5" fill="rgba(120,255,180,0.03)"/>' +
            '<path class="pbrd-bv-check" d="M21 36l6 6 12-12" stroke="rgba(120,255,180,0.8)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
          '<div class="pbrd-bv-scan-ring"></div>' +
        '</div>' +
        '<div class="pbrd-bv-feed" id="pbrd-bv-feed"></div>' +
        '<div class="pbrd-bv-pills">' +
          '<span class="pbrd-bv-pill" style="--d:0.2s">PCI DSS</span>' +
          '<span class="pbrd-bv-pill" style="--d:0.3s">3DS2</span>' +
          '<span class="pbrd-bv-pill" style="--d:0.4s">Tokens</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 3: Business Intelligence — Live heatmap ─── */
  var heatCells = '';
  var heatData = [
    [0.1,0.3,0.4,0.5,0.6,0.8,0.3],
    [0.2,0.5,0.7,0.8,0.9,0.7,0.2],
    [0.15,0.4,0.6,0.9,1.0,0.6,0.15],
    [0.1,0.3,0.5,0.7,0.8,0.5,0.1]
  ];
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 7; c++) {
      var dur = (2 + ((r * 7 + c * 3) % 5)).toFixed(1);
      var begin = ((r * 3 + c * 2) % 7 * 0.3).toFixed(1);
      heatCells += '<div class="pbrd-heat-cell pbrd-heat-cell-live" style="--op:' + heatData[r][c] + ';--d:' + (r*7+c)*0.02 + 's;--dur:' + dur + 's;--begin:' + begin + 's"></div>';
    }
  }

  var vizBI =
    '<div class="pbrd-viz pbrd-viz-bi">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;flex:1">' +
        '<div style="display:flex;gap:16px;align-items:flex-start">' +
          '<div style="flex:1">' +
            '<div class="pbrd-bv-label">Recurring Shoppers · Live</div>' +
            '<div class="pbrd-bv-hero-row"><span class="pbrd-bv-big" style="font-size:1.75rem" id="pbrd-bv-shoppers">847</span><span class="pbrd-bv-trend-up" style="font-size:0.625rem">+23</span></div>' +
            '<div class="pbrd-bv-sublabel">\u20AC<span id="pbrd-bv-avg">142</span> avg. ticket</div>' +
            '<div style="margin-top:12px">' +
              '<div class="pbrd-bv-label">12-Week Trend</div>' +
              '<svg viewBox="0 0 120 28" style="width:100%;height:28px;margin-top:4px"><path class="pbrd-bv-sparkline" d="M0 24 C10 22, 15 20, 20 18 S30 14, 40 16 S55 10, 65 8 S80 6, 90 4 S105 2, 120 1" stroke="rgba(120,180,255,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-dasharray="200" stroke-dashoffset="200" style="animation:pbrd-line-draw 1.5s 0.5s ease forwards"/><path d="M0 24 C10 22, 15 20, 20 18 S30 14, 40 16 S55 10, 65 8 S80 6, 90 4 S105 2, 120 1 V28 H0Z" fill="url(#pbrd-bv-spark)" opacity="0.3"/><defs><linearGradient id="pbrd-bv-spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(120,180,255,0.4)"/><stop offset="100%" stop-color="rgba(120,180,255,0)"/></linearGradient></defs></svg>' +
            '</div>' +
          '</div>' +
          '<div style="flex-shrink:0">' +
            '<div class="pbrd-bv-label" style="margin-bottom:6px">Activity</div>' +
            '<div class="pbrd-bv-heatgrid-sm">' + heatCells + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ─── Card 4: Loyalty — Pulsing NPS ─── */
  var vizLoyalty =
    '<div class="pbrd-viz pbrd-viz-loyalty2">' +
      '<div class="pbrd-bv-card" style="animation:pbrd-dv-slide-up 0.5s ease both;flex:1">' +
        '<div style="display:flex;gap:20px;align-items:center">' +
          '<div style="flex-shrink:0;position:relative;width:90px;height:90px" class="pbrd-bv-ring-wrap">' +
            '<svg viewBox="0 0 40 40" style="width:100%;height:100%"><circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2.5"/><circle class="pbrd-bv-ring-fill" cx="20" cy="20" r="17" fill="none" stroke="url(#pbrd-bv-ring-g)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="107" stroke-dashoffset="107" transform="rotate(-90 20 20)" style="animation:pbrd-bv-ring 1.2s 0.4s ease forwards"/><defs><linearGradient id="pbrd-bv-ring-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="rgba(255,255,255,0.15)"/><stop offset="100%" stop-color="rgba(120,180,255,0.7)"/></linearGradient></defs></svg>' +
            '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><span style="font-size:1.25rem;font-weight:300;color:#fff;letter-spacing:-0.03em" id="pbrd-bv-nps">94</span><span style="font-size:0.4375rem;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.08em">NPS</span></div>' +
          '</div>' +
          '<div style="flex:1">' +
            '<div class="pbrd-bv-label">Customer Loyalty · Live</div>' +
            '<div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">' +
              '<div class="pbrd-bv-loyalty-row" style="animation:pbrd-fade-in 0.4s 0.3s both"><span class="pbrd-bv-loyalty-val" id="pbrd-bv-repeat">3.2</span><span class="pbrd-bv-loyalty-unit">\u00D7</span><span class="pbrd-bv-loyalty-lbl">Repeat purchase rate</span></div>' +
              '<div class="pbrd-bv-loyalty-row" style="animation:pbrd-fade-in 0.4s 0.45s both"><span class="pbrd-bv-loyalty-val">68<span class="pbrd-bv-loyalty-unit">%</span></span><span class="pbrd-bv-loyalty-lbl">Return within 30 days</span></div>' +
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

  /* ═══ Security feed data ═══ */
  var feedTxns = [
    { card: "VISA \u2022\u20224582", amount: "\u20AC342", ok: true },
    { card: "MC \u2022\u20221209", amount: "\u20AC89", ok: true },
    { card: "AMEX \u2022\u20227744", amount: "\u20AC2,100", ok: false },
    { card: "VISA \u2022\u20223301", amount: "\u20AC195", ok: true },
    { card: "MC \u2022\u20229876", amount: "\u20AC67", ok: true },
    { card: "CB \u2022\u20225511", amount: "\u20AC1,450", ok: true },
    { card: "VISA \u2022\u20220033", amount: "\u20AC6,780", ok: false },
    { card: "JCB \u2022\u20224433", amount: "\u20AC312", ok: true }
  ];

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

    /* ═══ Start live animations ═══ */
    startLive();
  }

  function startLive() {
    /* Approval rate ticker */
    var rateEl = document.getElementById("pbrd-bv-rate");
    if (rateEl) {
      setInterval(function() {
        var v = 97.6 + Math.random() * 1.2;
        rateEl.textContent = v.toFixed(1);
      }, 2500);
    }

    /* Transaction counter */
    var txnEl = document.getElementById("pbrd-bv-txn");
    if (txnEl) {
      var txnCount = 1247;
      setInterval(function() {
        txnCount += Math.floor(Math.random() * 8) + 1;
        txnEl.textContent = txnCount.toLocaleString();
      }, 1800);
    }

    /* Shoppers counter */
    var shopEl = document.getElementById("pbrd-bv-shoppers");
    if (shopEl) {
      var shopCount = 847;
      setInterval(function() {
        shopCount += Math.floor(Math.random() * 3);
        shopEl.textContent = shopCount.toLocaleString();
      }, 4000);
    }

    /* Security feed */
    var feedEl = document.getElementById("pbrd-bv-feed");
    var feedIdx = 0;
    function addFeedItem() {
      if (!feedEl) return;
      var txn = feedTxns[feedIdx % feedTxns.length];
      feedIdx++;
      var item = document.createElement("div");
      item.className = "pbrd-bv-feed-item" + (txn.ok ? "" : " pbrd-bv-feed-blocked");
      item.style.opacity = "0";
      item.innerHTML = '<span class="pbrd-bv-feed-icon">' + (txn.ok ? "\u2713" : "\u2716") + '</span>' +
        '<span class="pbrd-bv-feed-card">' + txn.card + '</span>' +
        '<span class="pbrd-bv-feed-amt">' + txn.amount + '</span>';
      if (feedEl.children.length >= 3) {
        var old = feedEl.lastChild;
        old.style.opacity = "0";
        setTimeout(function() { if (old.parentNode) old.parentNode.removeChild(old); }, 300);
      }
      feedEl.insertBefore(item, feedEl.firstChild);
      setTimeout(function() { item.style.opacity = "1"; }, 50);
      setTimeout(addFeedItem, txn.ok ? 2200 : 3500);
    }
    if (feedEl) setTimeout(addFeedItem, 1000);
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
