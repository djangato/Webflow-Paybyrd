/* Paybyrd Webflow Overrides — Utilities */
/* Helper functions */

/* FOUC prevention: mark page as ready after overrides are applied.
   Requires this in Webflow <head> custom code:
   <style>.pbrd-loading section>*{opacity:0;transition:opacity .3s ease}.pbrd-ready section>*{opacity:1}</style>
   <script>document.documentElement.classList.add('pbrd-loading');setTimeout(function(){document.documentElement.classList.replace('pbrd-loading','pbrd-ready')},3000);</script>
*/
function pbrdReady() {
  document.documentElement.classList.replace('pbrd-loading', 'pbrd-ready');
}

/* ── Navbar: inject Sign Up button on all pages ── */
(function() {
  "use strict";
  function addSignUp() {
    /* Find nav buttons by href (most reliable — text may be rewritten).
       Scope to the nav area to avoid picking up footer/body links. */
    var nav = document.querySelector(".nav_component, nav[role='banner'], header");
    if (!nav) nav = document;

    var loginBtn = null;
    var contactBtns = [];
    nav.querySelectorAll("a").forEach(function(a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      var txt = (a.textContent || "").trim().toLowerCase();
      /* Login — by backoffice/beta URL or text */
      if (!loginBtn && (href.indexOf("backoffice.paybyrd") !== -1 || href.indexOf("beta.paybyrd") !== -1 || txt === "login" || txt === "log in")) {
        loginBtn = a;
      }
      /* Contact / Get in Touch — by /contact href or text */
      if (href === "/contact" || href.indexOf("/contact") !== -1 || txt === "contact" || txt === "get in touch") {
        contactBtns.push(a);
      }
    });

    /* Hide ALL Contact / Get in Touch buttons in the nav + their wrapper divs */
    contactBtns.forEach(function(btn) {
      /* Hide the button itself and its button wrapper parent (btn_wrap, div.btn, etc) */
      var wrap = btn.closest("[class*='btn']") || btn.parentElement;
      if (wrap && wrap !== nav) wrap.style.setProperty("display", "none", "important");
      btn.style.setProperty("display", "none", "important");
    });

    if (!loginBtn) return;

    /* Don't add twice */
    if (document.getElementById("pbrd-nav-signup")) return;

    /* Create Sign Up button */
    var signUp = document.createElement("a");
    signUp.id = "pbrd-nav-signup";
    signUp.href = "https://beta.paybyrd.com";
    signUp.textContent = "Sign Up Free";
    signUp.className = "pbrd-nav-signup";
    signUp.setAttribute("target", "_blank");

    /* Insert after the login wrapper (so it appears outside the login's wrapper div) */
    var loginWrap = loginBtn.closest("[class*='btn']") || loginBtn;
    loginWrap.insertAdjacentElement("afterend", signUp);
  }

  if (document.readyState === "complete") {
    addSignUp();
  } else {
    window.addEventListener("load", addSignUp);
  }
})();
