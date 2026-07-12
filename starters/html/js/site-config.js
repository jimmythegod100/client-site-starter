/**
 * Site configuration — edit this file for each new client.
 * Everything else pulls from here.
 */
window.SITE_CONFIG = {
  brand: {
    name: 'Harbor & Co.',
    shortName: 'Harbor',
    tagline: 'Local service you can trust.',
    email: 'hello@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, Your City, ST 12345',
    siteUrl: 'https://yourusername.github.io/client-site-starter/'
  },
  hero: {
    headline: 'Quality work, clear communication, fair prices.',
    subhead: 'We help homeowners and small businesses get things done right the first time.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=675&fit=crop',
    ctaPrimary: { label: 'Get a free quote', href: 'contact.html' },
    ctaSecondary: { label: 'Our services', href: 'services.html' }
  },
  about: {
    headline: 'About us',
    intro: 'We are a small local team focused on honest work and long-term relationships.',
    body: [
      'Founded in 2018, we started with one simple idea: treat every job like it is our own home.',
      'Today we serve clients across the region with the same hands-on approach — no call centers, no runaround.'
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop'
  },
  services: [
    {
      title: 'Consultation',
      description: 'We listen first, then recommend a plan that fits your budget and timeline.'
    },
    {
      title: 'Core service',
      description: 'Reliable delivery with clear updates at every step.'
    },
    {
      title: 'Maintenance',
      description: 'Ongoing support so small issues never become big headaches.'
    }
  ],
  contact: {
    formAction: 'https://formsubmit.co/hello@example.com',
    thanksPage: 'thanks.html',
    hours: 'Mon–Fri 8am–6pm, Sat by appointment'
  },
  seo: {
    description: 'Harbor & Co. — trusted local service for homes and small businesses.',
    ogImage: ''
  }
};
