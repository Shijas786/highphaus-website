import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/lib/blog'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | HighPhaus Journal`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <main className="min-h-screen bg-hp-black pt-48 pb-32">
      <article className="container max-w-3xl">
        {/* Navigation */}
        <nav className="mb-24 flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase opacity-40">
          <Link href="/blog" className="hover:text-hp-maroon transition-colors">Journal</Link>
          <span className="text-hp-maroon">/</span>
          <span>{post.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-hp-maroon font-mono text-[10px] tracking-widest uppercase">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-hp-maroon/30" />
            <span className="text-hp-white/40 font-mono text-[10px] tracking-widest uppercase">{post.readingTime}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.1] mb-12">
            {post.title}
          </h1>
          <p className="text-xl text-hp-white/60 leading-relaxed italic border-l border-hp-maroon pl-8">
            {post.excerpt}
          </p>
        </header>

        {/* Content */}
        <div 
          className="prose prose-invert prose-hp max-w-none 
            prose-headings:uppercase prose-headings:font-bold prose-headings:tracking-tighter prose-headings:text-hp-white
            prose-h2:text-3xl prose-h2:mt-24 prose-h2:mb-8
            prose-h3:text-xl prose-h3:mt-16 prose-h3:mb-6
            prose-p:text-hp-white/70 prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-12
            prose-strong:text-hp-white
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-12
            prose-li:text-hp-white/70 prose-li:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Minimal Footer */}
        <footer className="mt-48 pt-16 border-t border-hp-maroon/10">
          <div className="flex items-center justify-between">
            <Link href="/blog" className="text-[10px] font-mono tracking-widest uppercase hover:text-hp-maroon transition-all">
              ← Return to Journal
            </Link>
            <div className="flex items-center gap-6 text-hp-white/40 text-[10px] font-mono">
              <span>Author: {post.author}</span>
            </div>
          </div>
        </footer>
      </article>
    </main>
  )
}


