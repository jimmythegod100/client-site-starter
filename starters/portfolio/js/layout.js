/**
 * Portfolio layout — nav, sections, contact form from SITE_CONFIG.
 */
(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const c = cfg.client;

  document.title = document.title.replace('{{NAME}}', c.name);

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = cfg.seo?.description || c.pitch;

  const logo = document.querySelector('[data-logo]');
  if (logo) logo.textContent = cfg.client.initials;

  const heroEyebrow = document.querySelector('[data-hero-eyebrow]');
  if (heroEyebrow) heroEyebrow.textContent = cfg.hero.eyebrow;

  const heroHeadline = document.querySelector('[data-hero-headline]');
  if (heroHeadline) heroHeadline.textContent = cfg.hero.headline;

  const heroSub = document.querySelector('[data-hero-sub]');
  if (heroSub) heroSub.textContent = cfg.hero.subhead;

  const heroImg = document.querySelector('[data-hero-img]');
  if (heroImg) {
    heroImg.src = cfg.hero.image;
    heroImg.alt = c.name + ' at work';
  }

  const aboutEl = document.querySelector('[data-about]');
  if (aboutEl && c.about) {
    aboutEl.innerHTML = c.about.map((p) => `<p>${p}</p>`).join('');
  }

  const priceEl = document.querySelector('[data-price-range]');
  if (priceEl) priceEl.textContent = c.priceRange;

  const workEl = document.querySelector('[data-work-grid]');
  if (workEl && cfg.work) {
    workEl.innerHTML = cfg.work.map((w) => `
      <article class="card">
        <span class="tag">${w.tag}</span>
        <h3>${w.title}</h3>
        <p>${w.description}</p>
      </article>`).join('');
  }

  const servicesEl = document.querySelector('[data-services-grid]');
  if (servicesEl && cfg.services) {
    servicesEl.innerHTML = cfg.services.map((s) => `
      <article class="card">
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </article>`).join('');
  }

  const form = document.querySelector('[data-contact-form]');
  if (form && cfg.contact) {
    form.action = cfg.contact.formAction;
    const next = form.querySelector('[name="_next"]');
    if (next) {
      const base = c.siteUrl.replace(/\/$/, '');
      next.value = `${base}/${cfg.contact.thanksPage}`;
    }
    const subj = form.querySelector('[name="_subject"]');
    if (subj) subj.value = c.formSubject;
  }

  const emailEl = document.querySelector('[data-email]');
  if (emailEl) {
    emailEl.href = `mailto:${c.email}`;
    emailEl.textContent = c.email;
  }

  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav-links]');
  toggle?.addEventListener('click', () => nav?.classList.toggle('open'));

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const footerName = document.querySelector('[data-footer-name]');
  if (footerName) footerName.textContent = c.name;
})();
