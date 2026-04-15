/* Paybyrd — Testimonials Section (Staggered Masonry + Scroll Animations) */
(function () {
  "use strict";
  var path = window.location.pathname;
  if (path !== "/" && path !== "" && path !== "/index" && path !== "/index.html") return;

  var LOGOS = "https://cdn.prod.website-files.com/69d9242bbde99c4b80e41aeb/";
  var BASE = "https://djangato.github.io/Webflow-Paybyrd/assets/customers/";

  var testimonials = [
    {
      name: "Jo\u00E3o Frias",
      title: "Head of Payments, TAP Air Portugal",
      logo: LOGOS + "69d9242bbde99c4b80e41dcc_tap-logo.svg",
      quote: "Paybyrd gave us what no other provider could \u2014 a single integration handling 20+ payment methods across 90 markets, with approval rates that moved the needle on revenue. We\u2019re talking millions recovered from transactions that would have been declined elsewhere."
    },
    {
      name: "Carlos Rodrigues",
      title: "CFO, Vila Gal\u00E9",
      logo: LOGOS + "69d9242bbde99c4b80e41dce_vila-gale.svg",
      quote: "Managing payments across 40+ properties in four countries used to require a team just to reconcile. Paybyrd consolidated everything into one dashboard \u2014 my finance team can close the books in hours, not days."
    },
    {
      name: "Rita Faria",
      title: "CEO, KuantoKusta",
      logo: LOGOS + "69d9242bbde99c4b80e41dcd_kuanto-logo.svg",
      quote: "Cart abandonment was our biggest leak. After implementing Paybyrd\u2019s checkout with Klarna and local methods like MBWay, we saw conversion jump meaningfully. The right payment method at the right moment makes all the difference."
    },
    {
      name: "Nelson Silva",
      title: "General Manager, Rede Expressos",
      logo: LOGOS + "69d9242bbde99c4b80e41dd3_rede%20expresso.png",
      quote: "Integrating Paybyrd into our ticketing platform was remarkably smooth. Online, at the counter, on mobile \u2014 every channel now runs through one system. Our passengers don\u2019t think about payments anymore. That\u2019s exactly how it should be."
    },
    {
      name: "Filipa Mu\u00F1oz de Oliveira",
      title: "CEO, Wi\u00F1k",
      logo: LOGOS + "69d9242bbde99c4b80e41dd1_WINK.svg",
      quote: "We needed a payment partner who understood retail as well as we do. Paybyrd\u2019s real-time analytics showed us patterns we\u2019d been blind to \u2014 which stores convert, which customers return, and why. It\u2019s changed how we make decisions."
    },
    {
      name: "Victor Jardim",
      title: "General Manager, Kabuki",
      logo: LOGOS + "69d9242bbde99c4b80e41dcb_kabuki.svg",
      quote: "In a restaurant, speed is everything. Since switching to Paybyrd\u2019s terminals, our table turnover has improved and checkout complaints have dropped to near zero. The system just works \u2014 every single service."
    },
    {
      name: "Paulo Figueiredo",
      title: "COO, Onyria Resorts",
      logo: BASE + "onyria-logo.svg",
      quote: "Our guests expect a seamless experience from check-in to checkout. Paybyrd delivers exactly that \u2014 whether it\u2019s at the spa, the golf course, or the restaurant. The technology disappears, and only the experience remains."
    },
    {
      name: "Dr. Pl\u00EDnio Leal",
      title: "CEO, Andr\u00E9 \u00D3ticas",
      logo: BASE + "andreoticas-logo.png",
      quote: "For a premium retail brand, every touchpoint matters \u2014 including payment. Paybyrd gave us terminals that match our store experience and analytics that help us understand our customers better than ever before."
    }
  ];

  function buildCard(t) {
    return '<div class="pbrd-testimonial-card">' +
      '<div class="pbrd-testimonial-quote-mark">\u201C</div>' +
      '<p class="pbrd-testimonial-quote">' + t.quote + '</p>' +
      '<div class="pbrd-testimonial-divider"></div>' +
      '<div class="pbrd-testimonial-attribution">' +
        '<div class="pbrd-testimonial-person">' +
          '<p class="pbrd-testimonial-name">' + t.name + '</p>' +
          '<p class="pbrd-testimonial-title">' + t.title + '</p>' +
        '</div>' +
        '<img class="pbrd-testimonial-logo" src="' + t.logo + '" alt="' + t.title.split(", ").pop() + '" loading="lazy">' +
      '</div>' +
    '</div>';
  }

  function buildSection() {
    var section = document.createElement("section");
    section.className = "pbrd-testimonials";

    /* Split into 2 columns for masonry stagger */
    var left = [];
    var right = [];
    for (var i = 0; i < testimonials.length; i++) {
      if (i % 2 === 0) left.push(testimonials[i]);
      else right.push(testimonials[i]);
    }

    section.innerHTML =
      '<div class="pbrd-testimonials-header">' +
        '<h2>Payments that fit.<br>Partners that grow.</h2>' +
        '<p>Don\u2019t take our word for it. Here\u2019s what the people behind the brands have to say.</p>' +
      '</div>' +
      '<div class="pbrd-testimonials-grid">' +
        '<div class="pbrd-testimonials-col">' + left.map(buildCard).join("") + '</div>' +
        '<div class="pbrd-testimonials-col">' + right.map(buildCard).join("") + '</div>' +
      '</div>';

    return section;
  }

  /* ─── Scroll-triggered reveal ─── */
  function observeCards(section) {
    var cards = section.querySelectorAll(".pbrd-testimonial-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (c) { c.classList.add("pbrd-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          /* Stagger the animation based on card position */
          var card = entry.target;
          var idx = Array.prototype.indexOf.call(cards, card);
          setTimeout(function () {
            card.classList.add("pbrd-visible");
          }, idx * 100);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    cards.forEach(function (c) { observer.observe(c); });
  }

  function init() {
    var slider = document.querySelector('[data-slider="component"]');
    if (!slider) return;

    var target = slider.closest("section") || slider.closest(".u-section") || slider.parentElement;
    if (!target) return;

    var section = buildSection();
    target.replaceWith(section);

    /* Kick off scroll animations */
    observeCards(section);
    pbrdReady();
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
