/* Paybyrd — Savings Calculator (pricing page only) */
(function () {
  "use strict";
  if (!window.location.pathname.includes("/pricing")) return;

  /* ═══ Competitor Pricing Data ═══ */
  var competitors = {
    stripe: {
      name: "Stripe",
      online: { cardPct: 1.50, cardFixed: 0.25, apmPct: 1.50, apmFixed: 0.25, walletSurcharge: 0 },
      cp: { cardPct: 1.40, cardFixed: 0.10 }
    },
    mollie: {
      name: "Mollie",
      online: { cardPct: 1.80, cardFixed: 0.25, apmPct: 0, apmFixed: 0.32, walletSurcharge: 0 },
      cp: null
    },
    adyen: {
      name: "Adyen",
      online: { cardPct: 1.50, cardFixed: 0.12, apmPct: 0, apmFixed: 0.34, walletSurcharge: 0 },
      cp: { cardPct: 1.50, cardFixed: 0.12 }
    },
    paynl: {
      name: "Pay.nl",
      online: { cardPct: 1.50, cardFixed: 0.15, apmPct: 0, apmFixed: 0.19, walletSurcharge: 0 },
      cp: { cardPct: 1.75, cardFixed: 0.10 }
    }
  };

  var paybyrd = {
    online: { cardPct: 1.25, cardFixed: 0.08, apmPct: 0, apmFixed: 0.20 },
    cp: { debitPct: 0.50, creditPct: 0.60, cardFixed: 0 }
  };

  /* Defaults */
  var AVG_TXN = 50;
  var CARD_SPLIT = 0.75;  /* 75% cards, 15% APMs, 10% wallets (wallets = card rate) */
  var APM_SPLIT = 0.15;
  var WALLET_SPLIT = 0.10;
  var CP_SPLIT = 0.30;    /* when "both": 70% online, 30% CP */
  var CP_DEBIT_SPLIT = 0.60; /* 60% debit, 40% credit for CP */

  var selectedProvider = "stripe";
  var monthlyVolume = 100000;
  var channelMode = "online"; /* "online" or "both" */

  /* ═══ Calculation Engine ═══ */
  function calcCost(rates, volume, isCP) {
    var numTxns = volume / AVG_TXN;
    if (isCP) {
      /* Card Present: all cards, no APMs */
      return volume * (rates.cardPct / 100) + numTxns * (rates.cardFixed || 0);
    }
    /* Online */
    var cardVol = volume * (CARD_SPLIT + WALLET_SPLIT); /* wallets use card rate */
    var apmVol = volume * APM_SPLIT;
    var cardTxns = cardVol / AVG_TXN;
    var apmTxns = apmVol / AVG_TXN;
    var cardCost = cardVol * (rates.cardPct / 100) + cardTxns * rates.cardFixed;
    var apmCost = apmVol * (rates.apmPct / 100) + apmTxns * rates.apmFixed;
    return cardCost + apmCost;
  }

  function calcPaybyrdCP(volume) {
    var numTxns = volume / AVG_TXN;
    var debitVol = volume * CP_DEBIT_SPLIT;
    var creditVol = volume * (1 - CP_DEBIT_SPLIT);
    return debitVol * (paybyrd.cp.debitPct / 100) + creditVol * (paybyrd.cp.creditPct / 100);
  }

  function calculate() {
    var comp = competitors[selectedProvider];
    var compCost, pbCost;

    if (channelMode === "online") {
      compCost = calcCost(comp.online, monthlyVolume, false);
      pbCost = calcCost(paybyrd.online, monthlyVolume, false);
    } else if (channelMode === "cp") {
      if (comp.cp) {
        compCost = calcCost(comp.cp, monthlyVolume, true);
      } else {
        compCost = calcCost(comp.online, monthlyVolume, true);
      }
      pbCost = calcPaybyrdCP(monthlyVolume);
    } else {
      var onlineVol = monthlyVolume * (1 - CP_SPLIT);
      var cpVol = monthlyVolume * CP_SPLIT;
      compCost = calcCost(comp.online, onlineVol, false);
      if (comp.cp) {
        compCost += calcCost(comp.cp, cpVol, true);
      } else {
        compCost += calcCost(comp.online, cpVol, false);
      }
      pbCost = calcCost(paybyrd.online, onlineVol, false) + calcPaybyrdCP(cpVol);
    }

    return {
      compMonthly: compCost,
      pbMonthly: pbCost,
      savingsMonthly: compCost - pbCost,
      savingsAnnual: (compCost - pbCost) * 12,
      compName: comp.name,
      savingsPct: compCost > 0 ? ((compCost - pbCost) / compCost * 100) : 0
    };
  }

  /* ═══ Format helpers ═══ */
  function fmtEur(n) {
    return "\u20AC" + Math.round(n).toLocaleString("en");
  }
  function fmtVol(n) {
    if (n >= 1000000) return "\u20AC" + (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return "\u20AC" + Math.round(n / 1000) + "K";
    return "\u20AC" + n;
  }

  /* ═══ Update UI ═══ */
  function updateResults() {
    var r = calculate();
    var savingsEl = document.getElementById("pbrd-calc-savings");
    var compNameEl = document.getElementById("pbrd-calc-comp-name");
    var costThemEl = document.getElementById("pbrd-calc-cost-them");
    var costUsEl = document.getElementById("pbrd-calc-cost-us");
    var barThemEl = document.getElementById("pbrd-calc-bar-them");
    var barUsEl = document.getElementById("pbrd-calc-bar-us");
    var breakdownEl = document.getElementById("pbrd-calc-breakdown");
    var savePctEl = document.getElementById("pbrd-calc-save-pct");

    if (savingsEl) savingsEl.textContent = fmtEur(r.savingsAnnual);
    if (compNameEl) compNameEl.textContent = r.compName;
    if (costThemEl) costThemEl.textContent = fmtEur(r.compMonthly) + "/mo";
    if (costUsEl) costUsEl.textContent = fmtEur(r.pbMonthly) + "/mo";
    if (savePctEl) savePctEl.textContent = Math.round(r.savingsPct) + "% less";

    /* Animate bars */
    var maxCost = Math.max(r.compMonthly, r.pbMonthly, 1);
    if (barThemEl) barThemEl.style.width = Math.round(r.compMonthly / maxCost * 100) + "%";
    if (barUsEl) barUsEl.style.width = Math.round(r.pbMonthly / maxCost * 100) + "%";

    /* Breakdown */
    if (breakdownEl) {
      var perTxnComp = r.compMonthly / (monthlyVolume / AVG_TXN);
      var perTxnPb = r.pbMonthly / (monthlyVolume / AVG_TXN);
      breakdownEl.innerHTML =
        '<div class="pbrd-calc-bd-row">' +
          '<span class="pbrd-calc-bd-label">Cost per transaction</span>' +
          '<span class="pbrd-calc-bd-them">' + r.compName + ': \u20AC' + perTxnComp.toFixed(2) + '</span>' +
          '<span class="pbrd-calc-bd-us">Paybyrd: \u20AC' + perTxnPb.toFixed(2) + '</span>' +
        '</div>' +
        '<div class="pbrd-calc-bd-row">' +
          '<span class="pbrd-calc-bd-label">Monthly transactions</span>' +
          '<span class="pbrd-calc-bd-val">' + Math.round(monthlyVolume / AVG_TXN).toLocaleString("en") + '</span>' +
        '</div>' +
        '<div class="pbrd-calc-bd-row">' +
          '<span class="pbrd-calc-bd-label">Avg. transaction</span>' +
          '<span class="pbrd-calc-bd-val">\u20AC' + AVG_TXN + '</span>' +
        '</div>';
    }
  }

  /* ═══ Build Calculator ═══ */
  function init() {
    /* Find the "Why settle" section */
    var section = document.querySelector(".w-variant-a4eabb01-8ed6-63d0-157e-0a7b56aedaa1");
    if (!section) {
      /* Fallback: search all sections for the heading text */
      document.querySelectorAll("section").forEach(function(s) {
        if (!section && s.textContent.toLowerCase().indexOf("why settle") !== -1) section = s;
      });
    }
    if (!section) return;
    console.log("[Paybyrd] Calculator: found section", section);

    /* Hide Webflow children */
    Array.prototype.forEach.call(section.children, function (child) {
      child.style.setProperty("display", "none", "important");
    });
    section.style.setProperty("padding", "80px 0", "important");

    /* Build calculator */
    var wrap = document.createElement("div");
    wrap.className = "pbrd-calc-wrap";

    wrap.innerHTML =
      '<div class="pbrd-calc-header">' +
        '<span class="pbrd-calc-label">SAVINGS CALCULATOR</span>' +
        '<h2 class="pbrd-calc-h2">How much are you overpaying<br>for payments?</h2>' +
        '<p class="pbrd-calc-sub">Select your current provider, enter your volume, and see exactly how much you\u2019d save with Paybyrd.</p>' +
      '</div>' +

      '<div class="pbrd-calc-body">' +

        /* ── Left: Inputs ── */
        '<div class="pbrd-calc-inputs">' +

          '<div class="pbrd-calc-field">' +
            '<label class="pbrd-calc-field-label">Current provider</label>' +
            '<div class="pbrd-calc-select-wrap">' +
              '<select class="pbrd-calc-select" id="pbrd-calc-provider-select">' +
                Object.keys(competitors).map(function(key) {
                  var c = competitors[key];
                  return '<option value="' + key + '"' + (key === "stripe" ? ' selected' : '') + '>' + c.name + '</option>';
                }).join("") +
              '</select>' +
              '<svg class="pbrd-calc-select-chevron" viewBox="0 0 16 16" width="14" height="14"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</div>' +
          '</div>' +

          '<div class="pbrd-calc-field">' +
            '<label class="pbrd-calc-field-label">Monthly payment volume</label>' +
            '<div class="pbrd-calc-input-wrap">' +
              '<span class="pbrd-calc-currency">\u20AC</span>' +
              '<input type="text" class="pbrd-calc-input" id="pbrd-calc-vol-input" value="100,000">' +
            '</div>' +
            '<input type="range" class="pbrd-calc-slider" id="pbrd-calc-slider" min="5000" max="2000000" value="100000" step="5000">' +
            '<div class="pbrd-calc-range-labels"><span>\u20AC5K</span><span>\u20AC2M</span></div>' +
          '</div>' +

          '<div class="pbrd-calc-field">' +
            '<label class="pbrd-calc-field-label">Payment channels</label>' +
            '<div class="pbrd-calc-channels" id="pbrd-calc-channels">' +
              '<button class="pbrd-calc-ch pbrd-calc-ch--active" data-ch="online">Online</button>' +
              '<button class="pbrd-calc-ch" data-ch="cp">Card Present</button>' +
              '<button class="pbrd-calc-ch" data-ch="both">Both</button>' +
            '</div>' +
            '<div class="pbrd-calc-ch-note" id="pbrd-calc-ch-note" style="display:none">' +
              '<span>Assumed split: 70% online, 30% in-store</span>' +
            '</div>' +
          '</div>' +

        '</div>' +

        /* ── Right: Results ── */
        '<div class="pbrd-calc-results">' +

          '<div class="pbrd-calc-savings-hero">' +
            '<div class="pbrd-calc-save-label">Annual savings</div>' +
            '<div class="pbrd-calc-save-amount" id="pbrd-calc-savings">\u20AC0</div>' +
            '<div class="pbrd-calc-save-pct" id="pbrd-calc-save-pct">0% less</div>' +
          '</div>' +

          '<div class="pbrd-calc-bars">' +
            '<div class="pbrd-calc-bar-row">' +
              '<span class="pbrd-calc-bar-name" id="pbrd-calc-comp-name">Mollie</span>' +
              '<div class="pbrd-calc-bar-track"><div class="pbrd-calc-bar pbrd-calc-bar--them" id="pbrd-calc-bar-them"></div></div>' +
              '<span class="pbrd-calc-bar-val" id="pbrd-calc-cost-them">\u20AC0/mo</span>' +
            '</div>' +
            '<div class="pbrd-calc-bar-row">' +
              '<span class="pbrd-calc-bar-name">Paybyrd</span>' +
              '<div class="pbrd-calc-bar-track"><div class="pbrd-calc-bar pbrd-calc-bar--us" id="pbrd-calc-bar-us"></div></div>' +
              '<span class="pbrd-calc-bar-val pbrd-calc-bar-val--us" id="pbrd-calc-cost-us">\u20AC0/mo</span>' +
            '</div>' +
          '</div>' +

          '<div class="pbrd-calc-breakdown" id="pbrd-calc-breakdown"></div>' +

          '<a href="/book-demo" class="pbrd-calc-cta">Switch to Paybyrd \u2192</a>' +
          '<p class="pbrd-calc-disclaimer">Based on blended EEA card rates, \u20AC50 avg. transaction. Actual savings depend on card mix, geography, and volume. Paybyrd rates: cards 1.25% + \u20AC0.08, APMs from \u20AC0.20, CP from 0.50%.</p>' +

        '</div>' +

      '</div>';

    section.appendChild(wrap);

    /* ═══ Event Handlers ═══ */

    /* Provider dropdown */
    var provSelect = document.getElementById("pbrd-calc-provider-select");
    if (provSelect) {
      provSelect.addEventListener("change", function () {
        selectedProvider = provSelect.value;
        var comp = competitors[selectedProvider];
        var chNote = document.getElementById("pbrd-calc-ch-note");
        var cpBtn = wrap.querySelector('[data-ch="cp"]');
        var bothBtn = wrap.querySelector('[data-ch="both"]');

        if (!comp.cp) {
          /* Competitor has no CP — disable CP/Both buttons, reset if needed */
          if (cpBtn) { cpBtn.style.opacity = "0.35"; cpBtn.style.pointerEvents = "none"; }
          if (bothBtn) { bothBtn.style.opacity = "0.35"; bothBtn.style.pointerEvents = "none"; }
          if (channelMode === "both" || channelMode === "cp") {
            channelMode = "online";
            wrap.querySelectorAll(".pbrd-calc-ch").forEach(function (b) { b.classList.remove("pbrd-calc-ch--active"); });
            wrap.querySelector('[data-ch="online"]').classList.add("pbrd-calc-ch--active");
            if (chNote) chNote.style.display = "none";
          }
        } else {
          /* Competitor has CP — re-enable buttons, preserve current channel mode */
          if (cpBtn) { cpBtn.style.opacity = ""; cpBtn.style.pointerEvents = ""; }
          if (bothBtn) { bothBtn.style.opacity = ""; bothBtn.style.pointerEvents = ""; }
        }
        updateResults();
      });
    }

    /* Volume slider */
    var slider = document.getElementById("pbrd-calc-slider");
    var volInput = document.getElementById("pbrd-calc-vol-input");

    slider.addEventListener("input", function () {
      monthlyVolume = parseInt(slider.value);
      volInput.value = monthlyVolume.toLocaleString("en");
      updateResults();
    });

    volInput.addEventListener("input", function () {
      var raw = volInput.value.replace(/[^0-9]/g, "");
      var val = parseInt(raw) || 5000;
      if (val > 10000000) val = 10000000;
      monthlyVolume = val;
      slider.value = Math.min(val, 2000000);
      updateResults();
    });

    volInput.addEventListener("blur", function () {
      volInput.value = monthlyVolume.toLocaleString("en");
    });

    /* Channel toggle */
    wrap.querySelectorAll(".pbrd-calc-ch").forEach(function (btn) {
      btn.addEventListener("click", function () {
        wrap.querySelectorAll(".pbrd-calc-ch").forEach(function (b) { b.classList.remove("pbrd-calc-ch--active"); });
        btn.classList.add("pbrd-calc-ch--active");
        channelMode = btn.getAttribute("data-ch");
        var chNote = document.getElementById("pbrd-calc-ch-note");
        if (chNote) chNote.style.display = channelMode === "both" ? "" : "none";
        updateResults();
      });
    });

    /* Initial calculation */
    updateResults();
    pbrdReady();
  }

  /* Run after Webflow + Swiper have initialized */
  function tryInit() {
    if (document.querySelector(".card-12_wrap") || document.querySelector(".w-variant-a4eabb01-8ed6-63d0-157e-0a7b56aedaa1")) {
      init();
    } else {
      setTimeout(tryInit, 200);
    }
  }
  if (document.readyState === "complete") {
    setTimeout(tryInit, 100);
  } else {
    window.addEventListener("load", function() { setTimeout(tryInit, 100); });
  }
})();
