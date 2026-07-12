/**
 * Optional integrations — Calendly, social, payments.
 * Empty strings stay hidden.
 */
(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg?.integrations) return;

  const { calendlyUrl, social, payments } = cfg.integrations;

  function setHref(id, url, label) {
    const el = document.getElementById(id);
    if (!el || !url) return;
    el.hidden = false;
    el.href = url;
    if (label) el.textContent = label;
  }

  if (calendlyUrl) {
    const book = document.getElementById('book');
    const navBook = document.getElementById('nav-book');
    const frame = document.getElementById('calendly-frame');
    if (book) book.hidden = false;
    if (navBook) navBook.hidden = false;
    if (frame) frame.src = calendlyUrl;
  }

  const socialMap = [
    ['social-instagram', social?.instagram, 'Instagram'],
    ['social-linkedin', social?.linkedin, 'LinkedIn'],
    ['social-github', social?.github, 'GitHub']
  ];
  socialMap.forEach(([id, url, label]) => setHref(id, url, label));

  const payRow = document.getElementById('payment-buttons');
  const payLinks = [
    ['pay-stripe', payments?.stripeLink, 'Pay with Stripe'],
    ['pay-paypal', payments?.paypalLink, 'PayPal'],
    ['pay-venmo', payments?.venmoLink, 'Venmo']
  ].filter(([, url]) => url);

  if (payRow && payLinks.length) {
    payRow.hidden = false;
    payLinks.forEach(([id, url, label]) => {
      const a = document.getElementById(id);
      if (a) {
        a.hidden = false;
        a.href = url;
        a.textContent = label;
      }
    });
  }
})();
