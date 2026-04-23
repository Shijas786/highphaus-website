'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block space-y-6">
        {/* Image Container - Stripe Style (Clean & Crisp) */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-hp-maroon/5 border border-hp-white/5 transition-colors duration-500 group-hover:border-hp-maroon/20">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-hp-maroon">
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-hp-white/20" />
            <span className="text-[10px] font-medium text-hp-beige/40">
              {post.date}
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold text-hp-white leading-snug group-hover:text-hp-maroon transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-sm lg:text-base text-hp-beige/60 line-clamp-2 leading-relaxed">
            {post.description}
          </p>

          <div className="pt-4 flex items-center gap-3">
             <div className="w-6 h-6 rounded-full bg-hp-maroon/20 border border-hp-maroon/10 flex items-center justify-center overflow-hidden">
                <Image src={post.author.avatar} alt={post.author.name} width={24} height={24} className="opacity-80" />
             </div>
             <span className="text-[11px] font-bold text-hp-white/60 tracking-wider">
               {post.author.name}
             </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
