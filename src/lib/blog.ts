export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readingTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Why SEO is Critical for Your Brand's Growth in 2024",
    slug: "seo-critical-growth-2024",
    excerpt: "Discover why organic search remains the most powerful growth engine and how to master it.",
    content: `
      <p>In the rapidly evolving digital landscape, SEO remains the cornerstone of sustainable growth. While paid advertising offers immediate visibility, organic search builds long-term authority and trust.</p>
      <h3>The Power of Intent</h3>
      <p>Search engines are unique because they capture intent. When someone searches for a service, they are actively looking for a solution. Being there at that moment is priceless.</p>
      <h3>Technical Excellence</h3>
      <p>At HighPhaus, we believe SEO isn't just about keywords; it's about technical performance, user experience, and high-quality content that actually solves problems.</p>
    `,
    date: "2024-04-15",
    author: "HighPhaus Strategy",
    category: "Marketing",
    image: "/images/blog-seo.png",
    readingTime: "5 min read"
  },
  {
    title: "The Shift to High-Performance Web Design",
    slug: "high-performance-web-design",
    excerpt: "Speed is no longer a luxury—it's a requirement. Learn how we build websites that convert.",
    content: `
      <p>Modern users expect websites to be instantaneous. A delay of even a second can lead to a significant drop in conversion rates.</p>
      <h3>Beyond Aesthetics</h3>
      <p>A beautiful website that loads slowly is a failed website. High performance means optimizing every asset, script, and interaction.</p>
      <h3>Frameworks That Matter</h3>
      <p>Using technologies like Next.js allows us to deliver server-side rendered content that is both fast and SEO-friendly out of the box.</p>
    `,
    date: "2024-04-10",
    author: "HighPhaus Tech",
    category: "Development",
    image: "/images/blog-dev.png",
    readingTime: "4 min read"
  },
  {
    title: "Maximizing ROI with Data-Driven Paid Ads",
    slug: "maximizing-roi-paid-ads",
    excerpt: "Stop wasting budget on broad targets. Learn the precision approach to performance marketing.",
    content: `
      <p>Paid advertising is an auction of attention. To win, you need more than just a big budget; you need data-driven precision.</p>
      <h3>Targeting the Right Audience</h3>
      <p>We use advanced telemetry and audience segmentation to ensure your ads are seen by those most likely to convert.</p>
      <h3>Creative Testing</h3>
      <p>The best ads are born from rigorous A/B testing. We iterate on creative assets until we find the highest performing combination.</p>
    `,
    date: "2024-04-05",
    author: "HighPhaus Performance",
    category: "Paid Media",
    image: "/images/blog-ads.png",
    readingTime: "6 min read"
  }
];
