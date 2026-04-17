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
    /* Find Login button by href (most reliable — text may be rewritten).
       Scope to the nav area to avoid picking up footer/body links. */
    var nav = document.querySelector(".nav_component, nav[role='banner'], header");
    if (!nav) nav = document;

    var loginBtn = null;
    nav.querySelectorAll("a").forEach(function(a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      var txt = (a.textContent || "").trim().toLowerCase();
      if (!loginBtn && (href.indexOf("backoffice.paybyrd") !== -1 || href.indexOf("beta.paybyrd") !== -1 || txt === "login" || txt === "log in")) {
        loginBtn = a;
      }
    });

    /* Hide navbar "Get in Touch / Contact" button.
       The button uses a clickable_wrap overlay pattern linking to /book-demo.
       Walk up from the clickable_wrap to hide the visible button element. */
    nav.querySelectorAll(".clickable_wrap").forEach(function(w) {
      var inner = w.querySelector("a[href*='/book-demo'], a[href*='/contact']");
      if (!inner) return;
      /* Hide the wrapper and walk up one level to hide the visible button */
      w.style.setProperty("display", "none", "important");
      var parent = w.parentElement;
      if (parent && parent !== nav) parent.style.setProperty("display", "none", "important");
    });
    /* Fallback: any direct contact link inside nav */
    nav.querySelectorAll("a[href='/contact']").forEach(function(a) {
      a.style.setProperty("display", "none", "important");
      var p = a.parentElement;
      if (p && p !== nav) p.style.setProperty("display", "none", "important");
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
