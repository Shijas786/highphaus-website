'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import Navbar from '@/components/Navbar'

interface BlogContentProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogContent({ post, relatedPosts }: BlogContentProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Reading Progress Indicator */}
      <motion.div className="reading-progress" style={{ scaleX }} />

      {/* Spacer for fixed Navbar */}
      <div className="h-[60px]" />

      <header className="article-header">
        <div className="ms-container">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="space-y-12"
           >
              <Link href="/blog" className="ms-link !text-xs">
                 Back to Intel Hub
              </Link>
              
              <div className="space-y-6">
                 <div className="flex items-center justify-center gap-6">
                    <span className="coord-tag">Subject // {post.category}</span>
                    <span className="w-12 h-[1px] bg-hp-maroon opacity-20" />
                    <span className="coord-tag">Coord // 00{Math.floor(Math.random() * 90)}.55.BRIEF</span>
                 </div>
                 <h1 className="article-title uppercase tracking-tighter">
                    {post.title}
                 </h1>
              </div>

              <div className="flex items-center justify-center gap-6">
                 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-hp-border p-1 shadow-xl">
                    <Image src={post.author.avatar} alt={post.author.name} width={64} height={64} className="rounded-full" />
                 </div>
                 <div className="text-left">
                    <p className="text-[16px] font-black uppercase tracking-widest">{post.author.name}</p>
                    <p className="text-[11px] text-hp-maroon uppercase font-bold tracking-[0.2em]">{post.author.role}</p>
                 </div>
              </div>
           </motion.div>
        </div>
      </header>

      <div className="ms-container">
        <motion.div 
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="article-image relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] bg-hp-black"
        >
           <Image src={post.image} alt={post.title} fill className="object-cover opacity-90" priority />
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-24">
           <article className="prose prose-zinc prose-2xl max-w-none 
             prose-headings:text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:mb-12
             prose-p:text-hp-gray prose-p:leading-relaxed prose-p:font-medium prose-p:mb-12
             prose-blockquote:border-l-4 prose-blockquote:border-hp-maroon prose-blockquote:bg-hp-border/30 prose-blockquote:py-10 prose-blockquote:px-12 prose-blockquote:rounded-r-2xl
             prose-a:text-hp-maroon hover:prose-a:text-black transition-all duration-300">
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
           </article>

           <aside className="hidden lg:block space-y-16">
              <div className="sticky top-40 space-y-12">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Strategic Metadata</h4>
                    <div className="space-y-2">
                       <p className="text-[11px] text-hp-gray font-bold uppercase tracking-widest">Released // {post.date}</p>
                       <p className="text-[11px] text-hp-gray font-bold uppercase tracking-widest">Class // {post.category}</p>
                       <p className="text-[11px] text-hp-gray font-bold uppercase tracking-widest">Access // Unrestricted</p>
                    </div>
                 </div>

                 <div className="bg-hp-black p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-hp-maroon/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 space-y-4">
                       <h4 className="text-xl font-black text-white uppercase tracking-tighter">System Engineering</h4>
                       <p className="text-[11px] text-white/50 leading-relaxed font-medium">Ready to architect your digital future? Establish a strategic link with our engineers.</p>
                       <Link href="/#contact" className="block w-full bg-white text-black font-black py-3 rounded text-center hover:bg-hp-beige transition-colors uppercase text-[10px] tracking-[0.3em]">
                          Establish Link
                       </Link>
                    </div>
                 </div>
              </div>
           </aside>
        </div>

        {/* Related Briefings Section */}
        <div className="mt-40 pt-20 border-t border-gray-100">
           <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-hp-maroon mb-16">Related Intelligence</h3>
           <div className="grid md:grid-cols-3 gap-12">
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group space-y-6">
                   <div className="aspect-video relative overflow-hidden rounded-xl bg-hp-border">
                      <Image 
                        src={p.image} 
                        alt={p.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                   </div>
                   <div className="space-y-2">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{p.date}</p>
                      <h4 className="text-lg font-black leading-tight uppercase group-hover:text-hp-maroon transition-colors">{p.title}</h4>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </>
  )
}
