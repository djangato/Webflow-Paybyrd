# Lessons Learned

## CSS & Styling
- **Always set explicit backgrounds on injected sections.** Webflow can re-publish and change parent section themes (dark→light), making white text invisible. Never rely on parent background color — always set `background` on our injected `.pbrd-` sections. (2026-04-11)
- **Don't change icon rendering approach without visual testing.** Switching from colored-bg + white-text icons to white-bg + colored-text broke the visual hierarchy and looked bad. Changes to visual components need to be verified visually before pushing. (2026-04-11)

## Git & Deployment
- **`git revert` can cause encoding issues.** When reverting commits that touch files with Unicode characters (em-dashes, box-drawing chars), verify the revert didn't corrupt encoding. Use `cat -v` or hex dumps to check. (2026-04-11)
- **Always verify CDN serves the correct file after push.** Compare `content-length` from CDN headers against local `wc -c` to confirm GitHub Pages deployed the right version. (2026-04-11)
- **Version bumps in Webflow are required after every push.** The `?v=N` parameter must be incremented in Webflow custom code after every `git push` for changes to take effect. Remind user every time. (2026-04-11)

- **`align-items: center` silently offsets positioned elements.** When using JS to set `marginTop` for alignment, `align-items: center` on the flex container adds invisible vertical offset. Use `flex-start` when JS handles positioning. (2026-04-11)
- **Query visible DOM elements, not just the first match.** `document.querySelector` returns the first DOM match regardless of visibility. When multiple instances exist (e.g. one per fieldset), find the visible parent first, then query within it. (2026-04-11)
- **Webflow uses `<legend>` for step titles, not headings.** Form step titles are `<legend>` elements inside `<fieldset>`, not `h1/h2/h3`. Always include `legend` in heading selectors. (2026-04-11)

## Debugging
- **Check the actual DOM, not just the HTML source.** GSAP/ScrollTrigger can transform elements at runtime. Use `agent-browser eval` to check the live DOM state, not just `curl` the HTML. (2026-04-11)
- **White text on white background = invisible, not missing.** When elements appear "broken" or "missing", check if the text/content is actually there but invisible due to color contrast issues. User selecting text revealed the content was present. (2026-04-11)
- **Use agent-browser for visual verification.** Don't spend 20 minutes analyzing code when a 30-second screenshot would reveal the problem instantly. Visual bugs need visual debugging. (2026-04-11)

## Build Process
- **Always rebuild BOTH CSS and JS dist files** after changes to source files. Concatenate ALL source files — not just the one you edited. (2026-04-11)
- **NEVER `cat` a single source file into dist.** `cat css/ecommerce.css > dist/paybyrd-overrides.css` wipes every other page's styles. Always concatenate all source files. This broke the entire site on 2026-04-12 — hero, layout, everything. (2026-04-12)
- **Build command reference:**
  ```bash
  # CSS — all source files in order
  cat css/layout.css css/typography.css css/colors.css css/components.css css/homepage.css css/hero-enhancements.css css/cta-color.css css/bento.css css/showcase-visuals.css css/testimonials.css css/customers.css css/mid-cta.css css/book-demo.css css/book-demo-visuals.css css/omnichannel.css css/ecommerce.css css/payment-methods.css css/pos.css css/airlines.css css/hospitality.css css/retail.css > dist/paybyrd-overrides.css

  # JS — all source files in order
  cat js/utils.js js/interactions.js js/cta-rewrites.js js/mid-cta.js js/hero-enhancements.js js/book-demo.js js/bento.js js/calculator.js js/homepage.js js/testimonials.js js/customers.js js/book-demo-visuals.js js/omnichannel.js js/ecommerce.js js/pos.js js/payment-methods.js js/airlines.js js/hospitality.js js/retail.js > dist/paybyrd-overrides.js
  ```
- **When adding a new source file**, add it to BOTH the source directory AND the build command above. (2026-04-12)

## Webflow Padding
- **Setting padding on `<section>` alone is NOT enough.** Webflow's inner wrapper divs (containers, w-containers, generic divs) carry their own padding/margin. When reducing section spacing, ALWAYS also collapse the Webflow children's padding/margin with `Array.prototype.forEach.call(section.children, ...)` setting `padding-top/bottom` and `margin-top/bottom` to `0 !important`. Exclude our own injected elements by checking classList. This has been a recurring issue across multiple sections. (2026-04-14)

- **Hero sections: NEVER hide ALL section children.** Webflow's `u-section-spacer` divs provide the top padding that clears the fixed navbar. Hiding them with `display:none` pushes the hero content under the nav. Instead, only hide the content wrapper (`u-content-wrapper` / `u-container`) and images — keep spacers intact. Use `heading.closest(".u-content-wrapper")` to target just the text/image content. This is how hospitality and airlines hero sections work. (2026-04-15)
- **CSS shorthand `padding` overrides inline `padding-top`.** If a CSS class has `padding: 0 24px`, it resets all four sides — so `el.style.setProperty("padding-top", "140px")` gets overridden. Either use longhand properties in CSS or put the full padding in the shorthand. (2026-04-15)

## Theme Awareness
- **Check the parent section's background before styling injected content.** The e-commerce page uses a dark theme — writing light-theme colors (#111 text, #F9FAFB backgrounds, #E5E7EB borders) makes content invisible. Always match the existing section's color scheme. (2026-04-12)
