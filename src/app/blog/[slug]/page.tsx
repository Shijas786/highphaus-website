import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog'
import { notFound } from 'next/navigation'
import BlogContent from '@/components/BlogContent'
import Navbar from '@/components/Navbar'
import '../blog.css'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3)

  if (!post) {
    notFound()
  }

  return (
    <main className="ms-blog-theme min-h-screen bg-white pb-40">
      <Navbar theme="dark" />
      <BlogContent post={post} relatedPosts={relatedPosts} />
    </main>
  )
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}
