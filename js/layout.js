/**
 * Shared header, footer, and page content from SITE_CONFIG.
 */
(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const page = document.body.dataset.page || 'home';

  function setMeta() {
    const desc = cfg.seo?.description || cfg.brand.tagline;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
    document.title = document.title.replace('{{BRAND}}', cfg.brand.name);
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
        <a class="logo" href="index.html">${cfg.brand.shortName}<span>&</span> Co.</a>
        <button class="nav-toggle" type="button" aria-label="Open menu" data-nav-toggle>☰</button>
        <nav>
          <ul class="nav-links" data-nav-links>
            ${links.map((l) => `<li><a href="${l.href}" class="${page === l.id ? 'active' : ''}">${l.label}</a></li>`).join('')}
          </ul>
        </nav>
      </div>`;

    const toggle = header.querySelector('[data-nav-toggle]');
    const nav = header.querySelector('[data-nav-links]');
    toggle?.addEventListener('click', () => nav.classList.toggle('open'));
  }

  function renderFooter() {
    const footer = document.querySelector('[data-site-footer]');
    if (!footer) return;

    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container footer-inner">
        <div class="footer-brand">${cfg.brand.name}</div>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <p class="footer-copy">© ${year} ${cfg.brand.name}. All rights reserved.</p>
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
        <img class="hero-image" src="${cfg.hero.image}" alt="${cfg.brand.name} team at work" width="900" height="675" loading="eager">
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
        <img src="${cfg.about.image}" alt="About ${cfg.brand.name}" style="border-radius: var(--radius); box-shadow: var(--shadow);" width="800" height="600" loading="lazy">
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
        <p><strong>Email:</strong> <a href="mailto:${cfg.brand.email}">${cfg.brand.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${cfg.brand.phone.replace(/\D/g, '')}">${cfg.brand.phone}</a></p>
        <p><strong>Address:</strong> ${cfg.brand.address}</p>
        <p><strong>Hours:</strong> ${cfg.contact.hours}</p>`;
    }

    if (form) {
      form.action = cfg.contact.formAction;
      const nextInput = form.querySelector('[name="_next"]');
      if (nextInput) {
        const base = cfg.brand.siteUrl.replace(/\/$/, '');
        nextInput.value = `${base}/${cfg.contact.thanksPage}`;
      }
      const subject = form.querySelector('[name="_subject"]');
      if (subject) subject.value = `New inquiry — ${cfg.brand.name}`;
    }
  }

  setMeta();
  renderHeader();
  renderFooter();
  fillHero();
  fillServicesPreview();
  fillAbout();
  fillServicesPage();
  fillContact();
})();
