/**
 * Shared header, footer, SEO meta, and page content from SITE_CONFIG.
 */
(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const page = document.body.dataset.page || 'home';
  const brand = cfg.brand;

  function upsertMeta(attr, key, value) {
    if (!value) return;
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  function upsertLink(rel, href) {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
  }

  function setMeta() {
    const desc = cfg.seo?.description || brand.tagline;
    const titleBase = document.title.replace(/\{\{BRAND\}\}/g, brand.name);
    document.title = titleBase;

    upsertMeta('name', 'description', desc);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', titleBase);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', brand.siteUrl);
    if (cfg.seo?.ogImage) {
      upsertMeta('property', 'og:image', cfg.seo.ogImage);
    } else if (cfg.hero?.image) {
      upsertMeta('property', 'og:image', cfg.hero.image);
    }
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', titleBase);
    upsertMeta('name', 'twitter:description', desc);

    if (brand.siteUrl) {
      const base = brand.siteUrl.replace(/\/$/, '');
      const path = page === 'home' || page === '404' ? '/' : `/${page}.html`;
      upsertLink('canonical', base + (path === '/' ? '/' : path));
    }

    // Favicon (SVG placeholder ships with starter)
    upsertLink('icon', 'favicon.svg');

    // JSON-LD LocalBusiness
    const existing = document.getElementById('site-jsonld');
    if (existing) existing.remove();
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: brand.name,
      description: desc,
      url: brand.siteUrl,
      email: brand.email,
      telephone: brand.phone,
      address: brand.address,
      image: cfg.seo?.ogImage || cfg.hero?.image || undefined
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'site-jsonld';
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
  }

  function ensureSkipLink() {
    if (document.querySelector('.skip-link')) return;
    const a = document.createElement('a');
    a.className = 'skip-link';
    a.href = '#main';
    a.textContent = 'Skip to content';
    document.body.prepend(a);
    const main = document.querySelector('main');
    if (main && !main.id) main.id = 'main';
  }

  function logoLabel() {
    if (brand.logoText) return brand.logoText;
    if (brand.shortName) return brand.shortName;
    return brand.name;
  }

  function renderHeader() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;

    const links = [
      { href: 'index.html', label: 'Home', id: 'home' },
      { href: 'about.html', label: 'About', id: 'about' },
      { href: 'services.html', label: 'Services', id: 'services' },
      { href: 'contact.html', label: 'Contact', id: 'contact' }
    ];

    header.innerHTML = `
      <div class="container header-inner">
        <a class="logo" href="index.html">${logoLabel()}</a>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>☰</button>
        <nav id="site-nav" aria-label="Primary">
          <ul class="nav-links" data-nav-links>
            ${links.map((l) => `<li><a href="${l.href}" class="${page === l.id ? 'active' : ''}" ${page === l.id ? 'aria-current="page"' : ''}>${l.label}</a></li>`).join('')}
          </ul>
        </nav>
      </div>`;

    const toggle = header.querySelector('[data-nav-toggle]');
    const nav = header.querySelector('[data-nav-links]');
    toggle?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  function renderFooter() {
    const footer = document.querySelector('[data-site-footer]');
    if (!footer) return;

    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container footer-inner">
        <div class="footer-brand">${brand.name}</div>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="privacy.html">Privacy</a></li>
        </ul>
        <p class="footer-copy">© ${year} ${brand.name}. All rights reserved.</p>
      </div>`;
  }

  function fillHero() {
    const el = document.querySelector('[data-hero]');
    if (!el || !cfg.hero) return;

    el.innerHTML = `
      <div class="container hero-grid">
        <div>
          <h1>${cfg.hero.headline}</h1>
          <p class="lead">${cfg.hero.subhead}</p>
          <a class="btn btn-primary" href="${cfg.hero.ctaPrimary.href}">${cfg.hero.ctaPrimary.label}</a>
          <a class="btn btn-outline" href="${cfg.hero.ctaSecondary.href}">${cfg.hero.ctaSecondary.label}</a>
        </div>
        <img class="hero-image" src="${cfg.hero.image}" alt="${brand.name} — ${cfg.hero.headline}" width="900" height="675" loading="eager" decoding="async">
      </div>`;
  }

  function fillServicesPreview() {
    const el = document.querySelector('[data-services-preview]');
    if (!el || !cfg.services) return;

    el.innerHTML = cfg.services.map((s) => `
      <article class="card">
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </article>`).join('');
  }

  function fillAbout() {
    const el = document.querySelector('[data-about-content]');
    if (!el || !cfg.about) return;

    el.innerHTML = `
      <div class="split">
        <div class="content-block">
          <p>${cfg.about.intro}</p>
          ${cfg.about.body.map((p) => `<p>${p}</p>`).join('')}
        </div>
        <img src="${cfg.about.image}" alt="About ${brand.name}" style="border-radius: var(--radius); box-shadow: var(--shadow);" width="800" height="600" loading="lazy" decoding="async">
      </div>`;
  }

  function fillServicesPage() {
    const el = document.querySelector('[data-services-list]');
    if (!el || !cfg.services) return;

    el.innerHTML = cfg.services.map((s) => `
      <article class="card">
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <p style="margin-top:1rem;"><a href="contact.html">Request this service →</a></p>
      </article>`).join('');
  }

  function fillContact() {
    const form = document.querySelector('[data-contact-form]');
    const info = document.querySelector('[data-contact-info]');
    if (!cfg.contact) return;

    if (info) {
      info.innerHTML = `
        <h2>Reach us</h2>
        <p><strong>Email:</strong> <a href="mailto:${brand.email}">${brand.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${brand.phone.replace(/\D/g, '')}">${brand.phone}</a></p>
        <p><strong>Address:</strong> ${brand.address}</p>
        <p><strong>Hours:</strong> ${cfg.contact.hours}</p>`;
    }

    if (form) {
      form.action = cfg.contact.formAction;
      const nextInput = form.querySelector('[name="_next"]');
      if (nextInput) {
        const base = brand.siteUrl.replace(/\/$/, '');
        nextInput.value = `${base}/${cfg.contact.thanksPage}`;
      }
      const subject = form.querySelector('[name="_subject"]');
      if (subject) subject.value = `New inquiry — ${brand.name}`;
    }
  }

  function fillPrivacy() {
    const el = document.querySelector('[data-privacy-body]');
    if (!el) return;
    el.innerHTML = `
      <p>${brand.name} (“we”) use the contact form to respond to your inquiry. We do not sell your information.</p>
      <p>Form submissions are delivered by FormSubmit to <a href="mailto:${brand.email}">${brand.email}</a>.</p>
      <p>Questions: email us at the address above. This page is a starter template — adjust for your jurisdiction if needed.</p>
      <p><em>Last updated: ${new Date().toISOString().slice(0, 10)}</em></p>`;
  }

  ensureSkipLink();
  setMeta();
  renderHeader();
  renderFooter();
  fillHero();
  fillServicesPreview();
  fillAbout();
  fillServicesPage();
  fillContact();
  fillPrivacy();
})();
