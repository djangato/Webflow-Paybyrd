/* Paybyrd — Bento Grid: Image Swap + Spotlight Effect */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var CDN = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41ae9/";

  // Map: card index → new product screenshot
  var imageSwaps = [
    // Card 0: Conversion Rates → Platform dashboard
    CDN + "69d9242bbde99c4b80e41cae_Frame%201707479734.png",
    // Card 1: Pricing → Payment methods
    CDN + "69d9242bbde99c4b80e41c72_slider-2_wrap.webp",
    // Card 2: Security → Mobile analytics
    CDN + "69d9242bbde99c4b80e41cad_Website%20Feedback%20Figma.png",
    // Card 3: Integrations → keep original (already shows integration logos)
    null,
    // Card 4: Loyalty → Dashboard with metrics
    CDN + "69d9242bbde99c4b80e41cb1_New%20dashboard%20image.png"
  ];

  function init() {
    var cards = document.querySelectorAll(".card-1_element");
    if (!cards.length) return;

    cards.forEach(function (card, idx) {
      // Swap image if we have a replacement
      if (imageSwaps[idx]) {
        var img = card.querySelector(".card-1_gradient-bg .u-image");
        if (img) {
          img.src = imageSwaps[idx];
          img.srcset = "";  // Clear srcset so browser uses our src
          img.style.objectFit = "contain";
          img.style.objectPosition = "center";
          img.style.padding = "16px";
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
