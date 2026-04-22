'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/blog'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block space-y-6">
        {/* Stripe-style Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-hp-maroon/5">
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-hp-black/10 transition-opacity duration-300 group-hover:opacity-0" />
        </div>
        
        {/* Stripe-style Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-hp-maroon">
              {post.category}
            </span>
            <span className="text-hp-white/20">•</span>
            <span className="text-[11px] font-medium text-hp-white/40 uppercase tracking-wider">
              {post.date}
            </span>
          </div>
          
          <h3 className="text-2xl lg:text-2xl font-bold leading-tight tracking-tight text-hp-white group-hover:text-hp-maroon transition-colors duration-300">
            {post.title}
          </h3>
          
          <p className="text-sm text-hp-white/60 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="pt-2 flex items-center gap-2 text-hp-maroon font-bold text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
            Read article <span>→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}







