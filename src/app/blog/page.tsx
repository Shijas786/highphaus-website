'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { BLOG_POSTS } from '@/lib/blog'
import Image from 'next/image'
import Link from 'next/link'
import './blog.css'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Engineering', 'Branding', 'SEO', 'Systems', 'Strategy']
  
  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory)

  const featuredPost = BLOG_POSTS[0]
  const gridPosts = filteredPosts.filter(p => p.slug !== featuredPost.slug)

  return (
    <main className="ms-blog-theme min-h-screen bg-white pb-40">
      <Navbar theme="dark" />

      {/* Spacer for fixed Navbar */}
      <div className="h-[60px]" />

      {/* Premium Cinematic Header */}
      <header className="minimal-header">
        <div className="ms-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="coord-tag">Coord // 001.22.55.HUB</div>
            <h1 className="minimal-title">Growth <br/> <span className="text-hp-maroon">Architecture</span></h1>
            <p className="text-hp-gray max-w-xl font-medium tracking-tight text-lg uppercase">
               Engineering high-performance digital ecosystems. <br/> 
               Strategic Intelligence for the next generation of founders.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="ms-container mb-24">
         <div className="flex flex-wrap gap-8 md:gap-12 border-b border-gray-100 pb-8">
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-300 relative group ${
                  activeCategory === cat ? 'text-hp-maroon' : 'text-gray-400 hover:text-black'
                }`}
              >
                {cat}
                <motion.div 
                  className={`absolute -bottom-[33px] left-0 right-0 h-[2px] bg-hp-maroon ${activeCategory === cat ? 'opacity-100' : 'opacity-0'}`}
                  layoutId="activeCategory"
                />
              </button>
            ))}
         </div>
      </div>

      <div className="ms-container">
        {/* Featured Post Spotlight */}
        {activeCategory === 'All' && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="featured-spotlight"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="group grid lg:grid-cols-2 gap-16 items-center">
              <div className="featured-image-large relative">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <span className="coord-tag">Featured Intel</span>
                   <span className="w-12 h-[1px] bg-hp-maroon opacity-30" />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black leading-[1] tracking-tighter uppercase group-hover:text-hp-maroon transition-colors duration-500">
                  {featuredPost.title}
                </h2>
                <p className="text-xl text-hp-gray font-medium leading-relaxed">
                  {featuredPost.description}
                </p>
                <div className="pt-4">
                  <span className="ms-link">Establish Link</span>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* Regular Post Grid */}
        <div className="blog-grid">
          <AnimatePresence mode="popLayout">
            {gridPosts.map((post, index) => (
              <motion.article 
                key={post.slug} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="post-card group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="post-image relative mb-8">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-hp-maroon">{post.category}</span>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{post.date}</span>
                    </div>
                    <h3 className="post-title">
                      {post.title}
                    </h3>
                    <p className="post-excerpt">
                      {post.description}
                    </p>
                    <div className="pt-4">
                      <span className="ms-link !text-[10px]">Open Briefing</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
