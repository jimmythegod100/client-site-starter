/**
 * Site configuration — edit for each portfolio client.
 */
window.SITE_CONFIG = {
  client: {
    name: 'Alex Rivera',
    title: 'Freelance Web Designer',
    initials: 'AR',
    email: 'hello@example.com',
    siteUrl: 'https://yourusername.github.io/client-portfolio/',
    formSubject: 'Portfolio inquiry — Alex Rivera',
    pitch: 'Clean, mobile-friendly websites for small businesses — honest pricing, clear communication.',
    about: [
      'I help local businesses look professional online without agency prices.',
      'I work in Wix and static HTML depending on what fits the client. Every project starts with a simple brief and ends with a site you can actually use.'
    ],
    priceRange: '$150–$400'
  },
  hero: {
    eyebrow: 'Available for new projects',
    headline: 'Websites that look pro — without the agency bill',
    subhead: 'I build simple, fast sites for freelancers and small businesses. You get clear updates and a site that works on phones.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    ctaPrimary: { label: 'Get a quote', href: '#contact' },
    ctaSecondary: { label: 'See examples', href: '#work' }
  },
  work: [
    {
      title: 'Style A — Local service',
      description: 'Concept layout for a plumber or handyman. Clean hero, three services, contact form.',
      tag: 'Concept'
    },
    {
      title: 'Style B — Creative portfolio',
      description: 'Concept one-pager for a photographer or designer. Big images, minimal text.',
      tag: 'Concept'
    },
    {
      title: 'Style C — Simple shop',
      description: 'Concept café or bakery page. Hours, menu teaser, map placeholder.',
      tag: 'Concept'
    }
  ],
  services: [
    { title: 'Starter site', description: 'One-page or small multi-page site on GitHub Pages or Wix.' },
    { title: 'Brand basics', description: 'Logo guidance, colors, and social link setup.' },
    { title: 'Updates', description: 'Small text and image changes after launch (quoted separately).' }
  ],
  contact: {
    formAction: 'https://formsubmit.co/hello@example.com',
    thanksPage: 'thanks.html'
  },
  integrations: {
    calendlyUrl: '',
    social: {
      instagram: '',
      linkedin: '',
      github: ''
    },
    payments: {
      stripeLink: '',
      paypalLink: '',
      venmoLink: ''
    }
  },
  seo: {
    description: 'Alex Rivera — freelance web designer for small businesses. Simple sites, honest pricing.'
  }
};
