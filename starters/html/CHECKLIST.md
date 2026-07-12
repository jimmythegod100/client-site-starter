# Launch Checklist

Use this before you tell the client the site is live. Check each box.

---

## Content & design

- [ ] Business name, phone, email, address are correct everywhere
- [ ] Hero headline matches what client approved in brief
- [ ] About page text is accurate (no placeholder lorem ipsum)
- [ ] All services listed with correct descriptions
- [ ] Client photos replace stock/placeholder images
- [ ] Logo uploaded and displays correctly (if provided)
- [ ] Brand colors match client request (`css/brand.css`)

---

## Pages & links

- [ ] Home page loads
- [ ] About page loads
- [ ] Services page loads
- [ ] Contact page loads
- [ ] Thank-you page loads after form submit
- [ ] All nav links work
- [ ] No broken images (check browser console)
- [ ] Footer copyright year is current

---

## Contact form

- [ ] FormSubmit email set to client's real inbox
- [ ] Test submission sent successfully
- [ ] Client clicked FormSubmit activation email (first time only)
- [ ] Redirect lands on thank-you page
- [ ] Client received test message in inbox (check spam)

---

## Mobile & browsers

- [ ] Looks good on phone (portrait)
- [ ] Looks good on tablet or narrow window
- [ ] Menu button works on mobile
- [ ] Text is readable without zooming
- [ ] Quick check in Chrome and Safari

---

## SEO basics

- [ ] Page titles make sense (not "{{BRAND}}" literally)
- [ ] Meta description filled in (`site-config.js` → `seo.description`)
- [ ] `siteUrl` in `site-config.js` matches the live URL
- [ ] `robots.txt` + `sitemap.xml` updated with live base URL
- [ ] Favicon shows in the browser tab (`favicon.svg` or replace with PNG)
- [ ] Privacy page linked in footer
- [ ] After go-live: run `~/.organized/bin/seo-do https://YOUR-LIVE-URL` and fix high issues
- [ ] Google Search Console submitted (optional, post-launch)

---

## Hosting & domain

- [ ] Site pushed to GitHub / hosting provider
- [ ] GitHub Pages (or Netlify) enabled and building
- [ ] Custom domain connected (if applicable)
- [ ] DNS propagated — site loads at final URL
- [ ] HTTPS works (padlock in browser)

---

## Handoff to client

- [ ] Sent client the live URL
- [ ] Explained how contact form emails work
- [ ] Documented how to request future edits
- [ ] Invoice / final payment (if applicable)
- [ ] Archived copy of `CLIENT-BRIEF.md` and final `site-config.js`

---

## Optional extras

- [ ] Google Business Profile linked
- [ ] Analytics added (Plausible, GA4, etc.)
- [ ] Social links in footer
- [ ] Calendly or booking link
- [ ] Privacy policy page (if collecting form data in EU/CA)

---

**Launched on:** _______________  
**Live URL:** _______________  
**Notes:**
