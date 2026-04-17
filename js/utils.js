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
    /* Find "Log in" and "Get in Touch" in the nav */
    var loginBtn = null;
    var gitBtn = null;
    document.querySelectorAll("a").forEach(function(a) {
      var txt = (a.textContent || "").trim().toLowerCase();
      if (txt === "log in" && !loginBtn) loginBtn = a;
      if (txt === "get in touch" && !gitBtn) gitBtn = a;
    });
    if (!loginBtn && !gitBtn) return;

    /* Don't add twice */
    if (document.getElementById("pbrd-nav-signup")) return;

    /* Create Sign Up button */
    var signUp = document.createElement("a");
    signUp.id = "pbrd-nav-signup";
    signUp.href = "https://beta.paybyrd.com";
    signUp.textContent = "Sign Up Free";
    signUp.className = "pbrd-nav-signup";
    signUp.setAttribute("target", "_blank");

    /* Insert between Log in and Get in Touch */
    if (loginBtn) {
      loginBtn.insertAdjacentElement("afterend", signUp);
    } else if (gitBtn) {
      gitBtn.insertAdjacentElement("beforebegin", signUp);
    }
  }

  if (document.readyState === "complete") {
    addSignUp();
  } else {
    window.addEventListener("load", addSignUp);
  }
})();
