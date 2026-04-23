'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'

export default function StripeBlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="stripe-post-row group"
    >
      {/* Column 1: Category & Date (130px) */}
      <div className="z-10">
        <p className="stripe-eyebrow mb-2">
          {post.category}
        </p>
        <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest">
          {post.date}
        </p>
      </div>

      {/* Column 2: Title & Excerpt (400px) */}
      <div className="z-10">
        <Link href={`/blog/${post.slug}`} className="block group mb-4">
          <h3 className="stripe-title-sm text-black group-hover:text-hp-maroon transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="stripe-excerpt mb-6">
          {post.description}
        </p>
        <Link href={`/blog/${post.slug}`} className="stripe-link">
          Read Intel
        </Link>
      </div>

      {/* Column 3: Thumbnail/Image (Remaining) */}
      <div className="flex justify-end z-10">
        <div className="relative w-full max-w-[240px] aspect-[16/10] overflow-hidden rounded-lg border border-black/5 shadow-xl bg-gray-50">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        </div>
      </div>
    </motion.div>
  )
}
