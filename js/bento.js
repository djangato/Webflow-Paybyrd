/* Paybyrd — Bento Grid Spotlight Effect */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  function init() {
    var cards = document.querySelectorAll(".card-1_element");
    if (!cards.length) return;

    cards.forEach(function (card) {
      // Create spotlight element
      var spot = document.createElement("div");
      spot.className = "pbrd-spotlight";
      card.appendChild(spot);

      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        spot.style.left = (e.clientX - rect.left) + "px";
        spot.style.top = (e.clientY - rect.top) + "px";
      });
    });
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
