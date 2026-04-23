export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'architectural-web-development',
    title: 'Architectural Web Development: Building for Scale',
    description: 'Why high-performance engineering is the foundation of every successful digital brand.',
    date: 'April 22, 2026',
    category: 'Engineering',
    image: '/images/blog-web-arch.png',
    author: {
      name: 'HighPhaus Team',
      role: 'Lead Engineers',
      avatar: '/images/HIGHP.png'
    },
    content: `
      <p>Web development in 2026 isn't just about code; it's about engineering a digital experience that converts. At HighPhaus, we treat every pixel like a structural component.</p>
      <h2>The Performance Core</h2>
      <p>Speed is a feature. We build on modern frameworks like Next.js to ensure lightning-fast load times that satisfy both users and search engines.</p>
      <h2>Scalable Architecture</h2>
      <p>Our codebases are built to grow. Whether you're serving 100 or 1,000,000 users, our infrastructure remains stable and responsive.</p>
    `
  },
  {
    slug: 'brand-infrastructure-science',
    title: 'Brand Infrastructure: The Science of Identity',
    description: 'Moving beyond logos to create deep-rooted brand equity through structural positioning.',
    date: 'April 20, 2026',
    category: 'Branding',
    image: '/images/blog-brand-arch.png',
    author: {
      name: 'HighPhaus Team',
      role: 'Brand Architects',
      avatar: '/images/HIGHP.png'
    },
    content: `
      <p>A brand isn't a logo; it's a feeling backed by a system. We build brand infrastructure that creates lasting authority in competitive markets.</p>
      <h2>Positioning as Moat</h2>
      <p>We help you find the "empty space" in your industry and build a brand that owns it completely.</p>
      <h2>Visual Ecosystems</h2>
      <p>Every touchpoint should reinforce your core identity. We create comprehensive design systems that ensure total brand consistency.</p>
    `
  },
  {
    slug: 'structural-seo-engineering',
    title: 'Structural SEO: Engineering Organic Dominance',
    description: 'How to build an organic search system that compounds authority and predictably drives traffic.',
    date: 'April 18, 2026',
    category: 'SEO',
    image: '/images/blog-seo-arch.png',
    author: {
      name: 'HighPhaus Team',
      role: 'SEO Strategists',
      avatar: '/images/HIGHP.png'
    },
    content: `
      <p>SEO is no longer about keywords; it's about authority and structural integrity. We engineer search systems that dominate the SERPs.</p>
      <h2>Authority Compounding</h2>
      <p>We focus on high-intent topics that build your brand's topical authority over time, creating a compound effect for your traffic.</p>
      <h2>Technical Excellence</h2>
      <p>From schema markup to Core Web Vitals, we handle the complex technical layers that give your content the best chance to rank.</p>
    `
  },
  {
    slug: 'the-growth-infrastructure-blueprint',
    title: 'The Growth Infrastructure Blueprint',
    description: 'How to build a scalable marketing system that predictably generates high-intent leads.',
    date: 'April 15, 2026',
    category: 'Systems',
    image: '/images/blog-ads.png',
    author: {
      name: 'HighPhaus Team',
      role: 'Growth Architects',
      avatar: '/images/HIGHP.png'
    },
    content: `
      <p>In the modern digital landscape, scaling isn't just about spending more on ads. It's about building a robust infrastructure.</p>
      <h2>Phase 1: Precision Targeting</h2>
      <p>We start by identifying the exact segments of your audience that represent the highest lifetime value.</p>
    `
  },
  {
    slug: 'attention-architecture-in-2026',
    title: 'Attention Architecture in 2026',
    description: 'Why content is the new oil, and how to refine it for maximum brand authority.',
    date: 'April 10, 2026',
    category: 'Content',
    image: '/images/blog-seo.png',
    author: {
      name: 'HighPhaus Team',
      role: 'Creative Directors',
      avatar: '/images/HIGHP.png'
    },
    content: `
      <p>Attention is the scarcest resource in the world today. To capture it, you need more than just content.</p>
    `
  },
  {
    slug: 'scaling-with-structural-integrity',
    title: 'Scaling with Structural Integrity',
    description: 'The difference between random growth and engineered expansion.',
    date: 'April 05, 2026',
    category: 'Strategy',
    image: '/images/blog-dev.png',
    author: {
      name: 'HighPhaus Team',
      role: 'Founding Partners',
      avatar: '/images/HIGHP.png'
    },
    content: `
      <p>Scaling a brand requires structural integrity. If your foundations are weak, growth will lead to collapse.</p>
    `
  }
];
