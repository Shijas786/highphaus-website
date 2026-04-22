import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import Magnetic from '@/components/Magnetic'

export const metadata: Metadata = {
  title: 'Blog | HighPhaus Insights',
  description: 'The latest news and technical insights from HighPhaus.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-hp-black pt-48 pb-64">
      <div className="container">
        {/* Stripe-style Header */}
        <header className="max-w-4xl mb-32">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-hp-white mb-6">
            Insights from <span className="text-hp-maroon">HighPhaus</span>
          </h1>
          <p className="text-xl text-hp-white/50 leading-relaxed max-w-2xl">
            Technical narratives on growth architecture, technical SEO, and high-performance digital strategy.
          </p>
        </header>

        {/* Stripe-style Grid (2 columns for balance) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Stripe-style Subscription Area */}
        <section className="mt-48 py-24 border-t border-hp-white/10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-hp-white mb-6">
              Subscribe to the HighPhaus Journal
            </h2>
            <p className="text-lg text-hp-white/50 mb-10">
              Get our latest articles delivered to your inbox. No spam, only architectural insights.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="flex-1 bg-hp-maroon/5 border border-hp-white/10 rounded-lg px-6 py-4 text-sm font-mono tracking-widest text-hp-white focus:border-hp-maroon outline-none transition-all"
              />
              <Magnetic>
                <button className="bg-hp-white text-hp-black px-10 py-4 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-hp-maroon hover:text-hp-white transition-all whitespace-nowrap">
                  Join Journal
                </button>
              </Magnetic>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}







